#!/usr/bin/env python3
"""
T멤버십 카테고리 뉴스 수집

넓게 긁어서 Claude CLI로 4개 카테고리 분류 + 가중치 필터:
  [B] 여러 쿼리에서 중복 등장한 기사 → cross_query 가중치
  [A] Claude가 priority(1~3) 점수 부여
  → 카테고리별 상위 10건만 저장

실행: python3 category_news.py
결과: category_news.json (dashboard-react/ 루트)
"""

import os
import subprocess
import requests
import json
import re
import time
import unicodedata
from datetime import datetime, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path
from collections import defaultdict

OUTPUT_FILE  = Path(__file__).parent.parent / "category_news.json"
NAVER_ID     = "kWZuYiDh4bePpyvvJ1Fx"
NAVER_SECRET = "We38EQBjzj"
TOP_N        = 10  # 카테고리별 최종 저장 건수

BROAD_QUERIES = [
    '멤버십 혜택',
    '구독 서비스',
    '마케팅 논란',
    '플랫폼 경쟁',
    '소비 트렌드',
    '배달 시장',
    '이커머스 전략',
    '소비자 할인',
    'AI 쇼핑',
    '브랜드 제휴',
    '불매운동',
    '앱 마케팅',
]


SEASONAL_PROMPT = """\
오늘은 {today}이다.
T멤버십(SKT 통신사 멤버십) 전략팀이 이번 주 국내 마케팅·소비·이벤트 동향을 파악하기 위해
네이버 뉴스 검색에 추가할 시즈널 키워드를 제안해라.

조건:
- 국내 소비자 마케팅에 직접 연결되는 시즌·이벤트·스포츠·절기 관련 키워드
- 2~4어절, 한국어, 뉴스 검색에 실제로 등장할 표현
- 중복·유사어 없이 6개만
- JSON 배열로만 응답 (앞뒤 설명 없이)

예시 (참고용):
["야구 마케팅", "KBO 스폰서십", "월드컵 프로모션", "여름 할인", "휴가 이벤트", "뮤직페스티벌 제휴"]
"""


def _claude(prompt: str, max_tokens_hint: str = '') -> str:
    """Claude Code CLI로 프롬프트 실행 후 stdout 반환"""
    result = subprocess.run(
        ['claude', '-p', prompt, '--model', 'claude-haiku-4-5-20251001'],
        capture_output=True, text=True, timeout=120,
    )
    return result.stdout.strip()


def get_seasonal_queries() -> list[str]:
    """Claude Haiku가 오늘 날짜 기준으로 시즈널 키워드를 동적 생성"""
    today_str = datetime.today().strftime('%Y년 %m월 %d일')
    prompt = SEASONAL_PROMPT.format(today=today_str)
    try:
        raw = _claude(prompt)
        raw = re.sub(r'^```json\s*', '', raw)
        raw = re.sub(r'\s*```$', '', raw)
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return [str(q) for q in parsed if q]
    except Exception as e:
        print(f'  ⚠️  시즈널 키워드 생성 실패 (기본 쿼리만 사용): {e}')
    return []

CATEGORY_LABELS = {
    'risk':      '🚨 제휴사 리스크',
    'battle':    '⚔️  마케팅 경쟁',
    'benchmark': '💡 혜택 벤치마킹',
    'trend':     '🔮 소비 트렌드',
}

CLASSIFY_PROMPT = """\
당신은 T멤버십(SKT 통신사 멤버십) 전략팀의 뉴스 분석 어시스턴트입니다.
아래 뉴스 기사 제목들을 T멤버십 전략팀 관점에서 분류하고 중요도를 평가해주세요.

카테고리 정의:
- risk:      통신사 제휴 브랜드(스타벅스·맥도날드·CGV·배스킨라빈스·버거킹 등) 관련
             논란·불매·규제·과징금·주가·카드제휴 종료 등 → T멤버십 제휴 재검토 트리거
             ※ 한 사건(예: 스타벅스 탱크데이)의 모든 파생 기사(주가·카드사·불매)는 전부 risk
- battle:    통신사 멤버십·구독팩 경쟁, 배달·이커머스·OTT 플랫폼 간 경쟁 구도 변화
             (쿠팡 vs 배민 무료배달, 네이버 슈퍼앱, 통신사 OTT 구독팩 등)
             ⚠️ 제외: 이미 risk로 분류되는 제휴사(스타벅스 등) 관련 파급 기사는 battle 아닌 risk
- benchmark: 국내 소비자 대상 B2C 할인·쿠폰·포인트·구독 패키지·로열티 혜택 사례
             → T멤버십 제휴 기획 시 직접 참고 가능한 국내 브랜드 혜택 구조
             ✅ 포함: 야구·월드컵·여름·추석 등 시즌 이벤트 활용 브랜드 프로모션·제휴 캠페인
               (이는 T멤버십 시즈널 기획 참고용 benchmark임)
             ⚠️ 반드시 skip: 소상공인·가맹점 수수료 인하, 플랫폼 수수료 분쟁 (B2B 이슈),
             해외 브랜드·해외 시장, 항공·해운, 농업·어업·임업, 금융투자, 건설·부동산
- trend:     국내 모바일·이커머스·배달·AI 소비자 행동 변화 및 거시 소비 트렌드
             → T멤버십 고객 타겟팅·채널 전략에 영향을 주는 흐름
             ✅ 포함: 시즌·이벤트 기간 소비 패턴 변화(야구 시즌 외식 증가, 월드컵 시청 트렌드 등)
             ⚠️ 반드시 skip: 해외 시장·기업 동향, 농협·농업·수산, 금융투자, 부동산·건설,
             정치·선거, 스포츠 경기 결과·선수 관련(마케팅·소비 트렌드 아닌 것), 제조업 생산
- skip:      위 카테고리에 해당하지 않는 기사

priority 기준 (skip이면 1 고정):
- 3: 긴급 행동 — 지금 T멤버십이 대응 안 하면 손해가 생기는 이슈
     (제휴사 논란 확산·불매, 경쟁사 공격적 혜택 출시, 고객 이탈 유발 이벤트)
- 2: 단기 검토 — 1~2주 내 전략 검토 필요, 경쟁 우위에 영향
     (경쟁사 서비스 변화, 소비 트렌드 전환 신호, 벤치마킹 가능한 혜택 사례)
- 1: 참고 — 장기 흐름 모니터링, 즉각 행동 불필요

규칙:
- 반드시 JSON 배열로만 응답 (앞뒤 설명 절대 없이)
- reason은 T멤버십 담당자 관점에서 한 줄 (30자 이내)
- 형식: [{"id": 0, "category": "risk", "priority": 3, "reason": "..."}, ...]

기사 목록:
"""

# [F] 전 카테고리 공통 — 통신사 멤버십 직접 혜택 기사 제외 (S06 뉴스 스크랩과 중복)
TELECOM_NOISE: list[str] = [
    'T멤버십', 'T day', 'T데이', 'T-day',
    'KT멤버십', '달달혜택', '달달초이스', '달달스페셜',
    '유플투쁠', 'U+멤버십', 'VIP콕',
]

# [F] 제목 키워드 기반 카테고리별 노이즈 제거
NOISE_TITLE: dict[str, list[str]] = {
    'benchmark': [
        '인도 ', '인도의', '인도시', '인도에',   # 인도(국가), 인도네시아와 구분
        '미국', '중국', '일본', '유럽', '영국', '동남아', '해외', '글로벌',
        '메리어트', '힐튼', '하얏트',             # 해외 호텔 체인
        '항공', '해운',
    ],
    'trend': [
        '농협', '농업', '수산', '임업',
        '부동산', '건설',
        '정치', '선거',
    ],
}


def _naver_headers():
    return {
        'X-Naver-Client-Id': NAVER_ID,
        'X-Naver-Client-Secret': NAVER_SECRET,
    }


def fetch_datalab_scores() -> dict[str, dict]:
    """[D] BROAD_QUERIES별 최근 7일 검색량 트렌드 점수 + 상승 기울기(velocity)"""
    end_date   = datetime.today().strftime('%Y-%m-%d')
    start_date = (datetime.today() - timedelta(days=7)).strftime('%Y-%m-%d')
    headers    = {**_naver_headers(), 'Content-Type': 'application/json'}
    scores: dict[str, dict] = {}

    for i in range(0, len(BROAD_QUERIES), 5):
        batch = BROAD_QUERIES[i:i + 5]
        body = {
            'startDate':     start_date,
            'endDate':       end_date,
            'timeUnit':      'date',
            'keywordGroups': [{'groupName': q, 'keywords': [q]} for q in batch],
        }
        try:
            r = requests.post(
                'https://openapi.naver.com/v1/datalab/search',
                headers=headers, json=body, timeout=10,
            )
            r.raise_for_status()
            for item in r.json().get('results', []):
                data = item.get('data', [])
                if data:
                    ratios   = [d['ratio'] for d in data]
                    score    = round(sum(ratios) / len(ratios), 1)
                    # velocity: 최근 3일 평균 - 이전 4일 평균 (양수=급등)
                    recent   = ratios[-3:] if len(ratios) >= 3 else ratios
                    prior    = ratios[:-3] if len(ratios) > 3 else [ratios[0]]
                    velocity = round(
                        sum(recent) / len(recent) - sum(prior) / len(prior), 1
                    )
                    scores[item['title']] = {'score': score, 'velocity': velocity}
        except Exception as e:
            print(f'  DataLab 오류: {e}')
        time.sleep(0.3)

    return scores


def fetch_broad_news(dl_scores: dict[str, dict]) -> list[dict]:
    """
    [B] 광범위 키워드로 최근 7일 기사 수집 (sort=sim: 관련도/인기도순).
    같은 기사가 여러 쿼리에서 등장하면 합산 → cross_query_count 가중치
    DataLab 검색량 점수도 기사별로 반영 → datalab_score
    """
    url = 'https://openapi.naver.com/v1/search/news.json'
    now = datetime.today()
    cutoff = now - timedelta(days=7)

    seen: dict[str, dict] = {}  # prefix → article

    for query in BROAD_QUERIES:
        params = {'query': query, 'display': 100, 'sort': 'sim'}  # ← sim + 100건
        try:
            r = requests.get(url, headers=_naver_headers(), params=params, timeout=8)
            r.raise_for_status()
            for it in r.json().get('items', []):
                title = re.sub(r'<[^>]+>', '', it.get('title', ''))
                if len(title) < 10:
                    continue

                try:
                    dt = parsedate_to_datetime(it.get('pubDate', '')).replace(tzinfo=None)
                    if dt < cutoff:
                        continue
                    pub_date = dt.strftime('%Y.%m.%d')
                except Exception:
                    pub_date = ''

                prefix   = unicodedata.normalize('NFKC', title)[:18]
                dl_data  = dl_scores.get(query, {})
                dls      = dl_data.get('score', 0.0)
                dlv      = dl_data.get('velocity', 0.0)
                if prefix in seen:
                    if query not in seen[prefix]['queries']:
                        seen[prefix]['queries'].append(query)
                    # 가장 높은 DataLab 점수 기준으로 velocity도 함께 갱신
                    if dls > seen[prefix].get('datalab_score', 0):
                        seen[prefix]['datalab_score']    = dls
                        seen[prefix]['datalab_velocity'] = dlv
                else:
                    desc = re.sub(r'<[^>]+>', '', it.get('description', ''))
                    link = it.get('originallink') or it.get('link', '')
                    seen[prefix] = {
                        'title':            title,
                        'desc':             desc[:150],
                        'link':             link,
                        'pub_date':         pub_date,
                        'queries':          [query],
                        'datalab_score':    dls,
                        'datalab_velocity': dlv,
                    }
        except Exception as e:
            print(f'  뉴스 수집 실패 [{query}]: {e}')
        time.sleep(0.2)

    articles = list(seen.values())
    # cross_query_count 계산
    for a in articles:
        a['cross_query_count'] = len(a['queries'])

    # [B] 사전 정렬: 여러 쿼리에서 등장한 기사 우선 (Claude 분류 순서에 영향)
    articles.sort(key=lambda x: -x['cross_query_count'])
    return articles


def classify_with_claude(articles: list[dict]) -> list[dict]:
    """[A] Claude Haiku로 25개씩 배치 분류 + priority 점수"""
    results: list[dict] = []
    batch_size = 25

    for start in range(0, len(articles), batch_size):
        batch = articles[start:start + batch_size]
        titles_text = '\n'.join(f'{i}. {a["title"]}' for i, a in enumerate(batch))
        prompt = CLASSIFY_PROMPT + titles_text

        print(f'  Claude 분류 중... ({start + 1}~{start + len(batch)}/{len(articles)})')
        try:
            raw = _claude(prompt)
            raw = re.sub(r'^```json\s*', '', raw)
            raw = re.sub(r'\s*```$', '', raw)

            parsed = json.loads(raw)
            for item in parsed:
                idx = start + item['id']
                if idx < len(articles):
                    results.append({
                        **articles[idx],
                        'category': item.get('category', 'skip'),
                        'priority': int(item.get('priority', 1)),
                        'reason':   item.get('reason', ''),
                    })
        except json.JSONDecodeError as e:
            print(f'    JSON 파싱 실패: {e}\n    원문: {raw[:200]}')
            for a in batch:
                results.append({**a, 'category': 'skip', 'priority': 1, 'reason': '분류 실패'})
        except Exception as e:
            print(f'    Claude 호출 실패: {e}')
            for a in batch:
                results.append({**a, 'category': 'skip', 'priority': 1, 'reason': '분류 실패'})

        time.sleep(0.5)

    return results


def _post_filter(classified: list[dict]) -> list[dict]:
    """[F] 노이즈 제거 — 통신사 멤버십 직접 혜택 기사(전 카테고리) + 카테고리별 노이즈"""
    result = []
    for a in classified:
        cat   = a.get('category', 'skip')
        title = a['title']
        # 전 카테고리: 통신사 멤버십 혜택 기사 제외 (S06과 중복)
        if cat != 'skip' and any(kw in title for kw in TELECOM_NOISE):
            continue
        # 카테고리별 노이즈
        noisy = NOISE_TITLE.get(cat, [])
        if noisy and any(kw in title for kw in noisy):
            continue
        result.append(a)
    return result


def top_n_per_category(classified: list[dict], n: int = TOP_N) -> dict[str, list]:
    """
    [A+B] 최종 점수 = priority×10 + cross_query_count
    카테고리별 상위 n건 반환.
    benchmark·trend는 cross_query_count >= 3 추가 조건 (노이즈 차단 강화)
    """
    # 카테고리별 cross-query 최소 요구값
    MIN_CROSS: dict[str, int] = {
        'risk':      1,  # 제휴사 리스크는 단일 쿼리도 허용
        'battle':    1,  # 경쟁 구도도 단일 허용
        'benchmark': 2,  # DataLab 점수로 품질 보완 → 2로 완화
        'trend':     2,  # 동일
    }

    by_cat: dict[str, list] = defaultdict(list)
    for a in classified:
        cat = a.get('category', 'skip')
        if cat == 'skip':
            continue
        cq = a.get('cross_query_count', 1)
        # [B] 카테고리별 cross-query 최소값 미달이면 제외
        if cq < MIN_CROSS.get(cat, 1):
            continue
        # [A+B+D+V] 최종 점수: priority×10 + cross_query + DataLab 점수 + 상승 기울기
        dl    = a.get('datalab_score', 0.0)
        dlv   = a.get('datalab_velocity', 0.0)
        score = a.get('priority', 1) * 10 + cq + round(dl * 0.05) + round(max(dlv, 0) * 0.1)
        by_cat[cat].append({**a, 'final_score': score})

    result = {}
    for cat, items in by_cat.items():
        items.sort(key=lambda x: -x['final_score'])
        result[cat] = items[:n]
    return result


TOPIC_PROMPT = """\
당신은 T멤버십 전략팀 뉴스 큐레이터입니다.
아래 기사 목록을 읽고 각 기사의 '토픽 키워드'와 'T멤버십 관점 시사점'을 부여하세요.

[토픽 키워드 — 가장 중요한 규칙]
같은 사건·이슈에서 파생된 기사는 각도가 달라도 반드시 동일 키워드를 부여하세요.
  예) "쿠팡이츠 무료배달 확대", "배달앱 치킨게임", "쿠팡이츠 배달비 논란", "배민 쿠팡 경쟁"
      → 모두 "배달앱 무료배달 경쟁"으로 통일
  예) "스타벅스 불매 확산", "스벅 탱크데이 법적분쟁", "스타벅스 제휴카드 리스크"
      → 모두 "스타벅스 탱크데이 사태"로 통일
  예) "SKT 구독팩 출시", "KT 티빙 구독팩", "통신사 OTT 경쟁"
      → 모두 "통신사 구독팩 경쟁"으로 통일

추가 규칙:
- 2~5어절, 브랜드명+핵심사안 조합 권장
- 한 단어 금지
- 기사 수가 많아도 토픽 종류는 최소화 (보통 2~4개면 충분)

[시사점(insight)]
- T멤버십 전략팀이 즉시 활용할 수 있는 핵심 함의 1~2문장 (60자 이내)
- 같은 토픽의 기사는 반드시 동일 insight 부여

반드시 JSON 배열로만 응답 (앞뒤 설명 없이)
형식: [{"id": 0, "topic": "배달앱 무료배달 경쟁", "insight": "무료배달 경쟁 격화 — T멤버십 배달 쿠폰 차별화 전략 재검토 필요"}, ...]

기사 목록:
"""


def assign_topics(top: dict[str, list]) -> tuple[dict[str, list], list[dict]]:
    """[C] Claude Haiku로 카테고리별 top 기사에 topic/insight 부여 + topic_groups 빌드"""
    CAT_ORDER = ['trend', 'risk', 'battle', 'benchmark']  # trend 먼저 — 마지막일 때 토큰 부족 현상 방지
    result: dict[str, list] = {}
    topic_groups: list[dict] = []

    for cat in CAT_ORDER:
        items = top.get(cat, [])
        if not items:
            result[cat] = items
            continue

        titles_text = '\n'.join(f'{i}. {a["title"]}' for i, a in enumerate(items))
        prompt = TOPIC_PROMPT + titles_text

        parsed = None
        for attempt in range(2):  # 최대 2회 시도
            try:
                raw = _claude(prompt)
                # JSON 블록 추출 — 코드펜스 안팎 모두 처리
                m = re.search(r'\[.*\]', raw, re.DOTALL)
                raw = m.group(0) if m else raw
                parsed = json.loads(raw)
                break  # 성공
            except Exception as e:
                print(f'    토픽 부여 실패 [{cat}] 시도 {attempt + 1}/2: {e}')
                if attempt == 0:
                    time.sleep(1)

        if parsed:
            topic_map   = {item['id']: item.get('topic', '') for item in parsed}
            insight_map = {item['id']: item.get('insight', '') for item in parsed}
            result[cat] = [
                {**a, 'topic': topic_map.get(i, ''), 'insight': insight_map.get(i, '')}
                for i, a in enumerate(items)
            ]
        else:
            print(f'    토픽 부여 최종 실패 [{cat}] — topic 공백으로 저장')
            result[cat] = [{**a, 'topic': '', 'insight': ''} for a in items]

        time.sleep(0.3)

        # 동일 topic끼리 묶어 topic_groups 생성
        seen_topics: list[str] = []
        groups_map: dict[str, list] = {}
        for a in result[cat]:
            t = a.get('topic') or a['title'][:16]
            if t not in groups_map:
                seen_topics.append(t)
                groups_map[t] = []
            groups_map[t].append(a)

        for t in seen_topics:
            arts     = groups_map[t]
            if len(arts) < 2:
                continue
            insight  = next((a.get('insight', '') for a in arts if a.get('insight')), '')
            max_cq   = max(a.get('cross_query_count', 1) for a in arts)
            max_vel  = max(a.get('datalab_velocity', 0.0) for a in arts)
            urgent   = any(a.get('priority', 1) == 3 for a in arts)
            # signal_strength: 카테고리 성격 + 확산도(기사 수·검색량) 조합
            # 긴급 대응(3): risk+P3 / 또는 유사 기사 5건 이상이면 카테고리 무관하게 긴급
            #   → 여러 매체가 같은 이슈를 5건 이상 보도 = 이미 충분히 확산된 이슈
            # 주목(2):     battle+P3, risk P2, 검색량 급상승, cross_query 3회 이상
            # 모니터링(1): 장기 흐름 참고용
            if cat == 'risk' and urgent:
                strength = 3
            elif cat == 'risk' or (cat == 'battle' and urgent):
                strength = 2
            elif max_cq >= 3 or max_vel > 10:
                strength = 2
            else:
                strength = 1
            topic_groups.append({
                'category':       cat,
                'topic':          t,
                'insight':        insight,
                'signal_strength': min(strength, 3),
                'max_velocity':   round(max_vel, 1),
                'articles': [
                    {
                        'title':             a['title'],
                        'link':              a['link'],
                        'pub_date':          a['pub_date'],
                        'priority':          a['priority'],
                        'cross_query_count': a['cross_query_count'],
                        'datalab_velocity':  round(a.get('datalab_velocity', 0.0), 1),
                    }
                    for a in arts
                ],
            })

    return result, topic_groups


def main():
    today = datetime.today()
    print(f"[{today.strftime('%Y.%m.%d %H:%M')}] 카테고리 뉴스 수집 시작\n")

    # 시즈널 키워드 주입 (Claude Haiku가 오늘 날짜 기준으로 동적 생성)
    global BROAD_QUERIES
    print('  📅 시즈널 키워드 생성 중...')
    seasonal = get_seasonal_queries()
    if seasonal:
        BROAD_QUERIES = BROAD_QUERIES + seasonal
        print(f"  → 추가됨: {', '.join(seasonal)}")
    else:
        print('  → 시즈널 키워드 없음 (기본 쿼리로 진행)')

    # Step 1: [D] DataLab 검색량 트렌드 조회
    print(f"[Step 1] DataLab 검색량 트렌드 조회 ({len(BROAD_QUERIES)}개 키워드)...")
    dl_scores = fetch_datalab_scores()
    if dl_scores:
        top5 = sorted(dl_scores.items(), key=lambda x: -x[1]['score'])[:5]
        top5_str = ', '.join(
            f"{k}({v['score']:.0f}, Δ{v['velocity']:+.0f})" for k, v in top5
        )
        print(f'  → 트렌딩 Top5: {top5_str}')
    else:
        print('  → DataLab 점수 없음 (오류 또는 데이터 없음)')

    # Step 2: [B] 뉴스 수집 + cross-query 가중치
    print(f"\n[Step 2] 뉴스 수집 ({len(BROAD_QUERIES)}개 키워드 × 50건, sort=sim)...")
    articles = fetch_broad_news(dl_scores)
    multi = sum(1 for a in articles if a['cross_query_count'] >= 2)
    print(f"  → {len(articles)}개 수집 (중복 쿼리 등장: {multi}건)\n")

    # Step 3: [A] Claude 분류 + priority
    print('[Step 3] Claude CLI 분류 + priority 채점 중...')
    classified = classify_with_claude(articles)

    # Step 4: [F] 제목 키워드 노이즈 제거 → [A+B+D] 점수 기반 상위 10건 추출
    print(f'\n[Step 4] 노이즈 필터링 + 카테고리별 상위 {TOP_N}건 추출 중...')
    filtered = _post_filter(classified)
    removed = len(classified) - len(filtered)
    print(f'  → 제목 키워드 필터: {removed}건 제거 ({len(filtered)}건 남음)')
    top = top_n_per_category(filtered, TOP_N)

    # Step 5: [C] Claude 토픽 키워드 + 시사점 부여
    print('\n[Step 5] Claude 토픽 키워드 부여 중...')
    top, topic_groups = assign_topics(top)
    for cat, label in CATEGORY_LABELS.items():
        items = top.get(cat, [])
        topics = set(a.get('topic', '') for a in items if a.get('topic'))
        print(f'  {label}: {len(topics)}개 토픽 — {", ".join(sorted(topics))}')

    # 결과 출력
    skip_count  = sum(1 for a in classified if a.get('category') == 'skip')
    total_valid = sum(1 for a in classified if a.get('category') != 'skip')
    total_top   = sum(len(v) for v in top.values())
    print(f"\n{'='*56}")
    print(f"  수집 {len(articles)}건 → 유효 {total_valid}건 → 최종 {total_top}건")
    print(f"{'='*56}")
    for cat, label in CATEGORY_LABELS.items():
        items = top.get(cat, [])
        print(f"\n{label} ({len(items)}건)")
        for a in items:
            cq  = a['cross_query_count']
            pri = a['priority']
            cq_tag  = f' [쿼리×{cq}]' if cq >= 2 else ''
            pri_tag = f' [P{pri}]'
            print(f"  · {a['title'][:50]}{pri_tag}{cq_tag}")

    # JSON 저장
    output = {
        'generated_at':    today.strftime('%Y.%m.%d %H:%M'),
        'total_collected': len(articles),
        'total_valid':     total_valid,
        'total_skipped':   skip_count,
        'total_top':       total_top,
        'topic_groups':    topic_groups,
        'categories': {
            cat: [
                {
                    'title':             a['title'],
                    'topic':             a.get('topic', ''),
                    'insight':           a.get('insight', ''),
                    'desc':              a['desc'],
                    'link':              a['link'],
                    'pub_date':          a['pub_date'],
                    'reason':            a['reason'],
                    'priority':          a['priority'],
                    'cross_query_count': a['cross_query_count'],
                    'datalab_score':     round(a.get('datalab_score', 0.0), 1),
                    'datalab_velocity':  round(a.get('datalab_velocity', 0.0), 1),
                    'queries':           a['queries'],
                }
                for a in items
            ]
            for cat, items in top.items()
        },
    }

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\n✅ 저장 완료: {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
