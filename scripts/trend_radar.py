#!/usr/bin/env python3
"""
T멤버십 트렌드 레이더

두 가지 스캔 방식 병행:
  [A] 브랜드 우선 스캔 — 기존 제휴사·후보 목록 기반, DataLab+뉴스 급등 감지
  [B] 토픽 우선 스캔  — 멤버십·구독 키워드로 뉴스 수집 → 브랜드 역발견
                        목록에 없던 신규 마케팅 플랫폼도 포착 가능

실행: python3 trend_radar.py
결과: brand_trends.json (dashboard-react/ 루트)
"""

import requests
import json
import re
import time
from datetime import datetime, timedelta
from email.utils import parsedate_to_datetime
from pathlib import Path
from collections import defaultdict

OUTPUT_FILE  = Path(__file__).parent.parent / "brand_trends.json"
NAVER_ID     = "kWZuYiDh4bePpyvvJ1Fx"
NAVER_SECRET = "We38EQBjzj"

# ── 모니터링 대상 브랜드 풀 ───────────────────────────────────
# 현재 3사 제휴사 (partner)
CURRENT_PARTNERS = {
    # SKT
    '버거킹', '뚜레쥬르', '공차', '이니스프리', '던킨', '배스킨라빈스',
    '피자헛', '쉐이크쉑', '파스쿠찌', '파리바게뜨', 'CGV', '루덴시아',
    '매드포갈릭', '하프클럽', '톤28', '백억커피', '후지필름', '청소연구소',
    '폴바셋', '잠바주스', '스피드메이트', 'G car', 'JAJU', '꾸까',
    '롯데면세점', 'GS SHOP', '에이스바이옴', '퍼블로그', 'TMAP 렌터카',
    # KT
    '할리스', '도미노피자', '팀홀튼', '롯데마트', '컬리', 'KFC',
    '메가커피', '크록스', '투썸플레이스', '노랑통닭', '폴바셋',
    # LGU+
    '스타벅스', '다이소', '밀리의서재', '교보문고', '아쿠아플라넷',
    '이삭토스트', '쿠팡이츠', 'GS25', '이마트24', '모던하우스',
    '유니스터디', '밀크T',
}

# 잠재 제휴 후보 (candidate) — 제휴 가능성 있는 소비재 브랜드
CANDIDATES = {
    # 커피·음료
    '컴포즈커피', '빽다방', '더벤티', '매머드커피', '메가커피',
    # 치킨
    '굽네치킨', 'BHC치킨', '60계치킨', '깐부치킨', '페리카나',
    # 버거·패스트푸드
    '맥도날드', '롯데리아', '맘스터치', '모스버거',
    # 분식·한식
    '엽기떡볶이', '청년다방', '죠스떡볶이', '국밥이야기',
    # 디저트
    '설빙', '배라', '나뚜루',
    # 쇼핑·뷰티
    '올리브영', '무신사', '지그재그', '에이블리',
    # 배달·이커머스
    '배달의민족', '요기요', '마켓컬리', '오늘의집',
    # 엔터·문화
    '롯데시네마', '메가박스', '예스24', '인터파크',
    # 여행·교통
    '야놀자', '여기어때', '카카오T',
}

# 관심 브랜드 (watchlist) — 업계 영향력 있는 대형 브랜드
WATCHLIST = {
    '스타벅스코리아', '맥도날드코리아', '이마트', '롯데백화점', '현대백화점',
    '카카오페이', '네이버페이', '토스', '쿠팡', '네이버쇼핑',
    '카카오모빌리티', '쏘카',
}

ALL_BRANDS = list(CURRENT_PARTNERS | CANDIDATES | WATCHLIST)

# 현재 제휴 통신사 매핑 {브랜드: [(telco_id, prog_label)]}
TELCO_MAP: dict[str, list[tuple[str, str]]] = defaultdict(list)
for b in ('버거킹','뚜레쥬르','공차','이니스프리','던킨','배스킨라빈스',
          '피자헛','쉐이크쉑','파스쿠찌','파리바게뜨','CGV','루덴시아',
          '매드포갈릭','하프클럽','톤28','백억커피','후지필름','청소연구소'):
    TELCO_MAP[b].append(('skt', 'T멤버십'))
for b in ('폴바셋','잠바주스','스피드메이트','G car','JAJU','꾸까',
          '롯데면세점','GS SHOP','에이스바이옴','퍼블로그','TMAP 렌터카'):
    TELCO_MAP[b].append(('skt', 'VIP Pick'))
for b in ('할리스','도미노피자','팀홀튼','롯데마트','컬리','KFC',
          '메가커피','크록스','투썸플레이스','노랑통닭','폴바셋','매드포갈릭'):
    TELCO_MAP[b].append(('kt', '달달혜택'))
for b in ('스타벅스','다이소','밀리의서재','교보문고','아쿠아플라넷',
          '이삭토스트','쿠팡이츠','GS25','이마트24','모던하우스','유니스터디',
          '밀크T','공차','피자헛','배스킨라빈스','파리바게뜨','CGV','하프클럽'):
    TELCO_MAP[b].append(('lgu', 'U+멤버십'))

# ── 감성 키워드 ───────────────────────────────────────────────
NEG_KW = {
    '불매':9, '논란':6, '비판':5, '갑질':8, '사과':6, '피해':5,
    '식중독':9, '위생':5, '리콜':8, '고소':8, '적발':8, '사태':6,
    '불만':4, '항의':4, '환불':3, '폐점':4, '철수':4, '가격인상':5,
    '횡령':9, '배임':9, '적자':3, '부진':3,
}
POS_KW = {
    '인기':4, '성장':4, '호평':5, '신규':2, '오픈':2, '확장':3,
    '흑자':4, '매출':3, '히트':4,
}

TELCO_LABEL = {'skt': 'SKT', 'kt': 'KT', 'lgu': 'LGU+'}

# ── [B] 토픽 우선 스캔 설정 ──────────────────────────────────

# 멤버십·마케팅 관련 토픽 키워드 — 이 키워드로 뉴스 수집 후 브랜드 역발견
TOPIC_KEYWORDS = [
    '멤버십 출시', '멤버십 개편', '멤버십 혜택 강화',
    '구독 서비스 출시', '구독 혜택', '제휴 확대',
    '마케팅 협업', '쿠폰 제공 이벤트', '무료배달 멤버십',
    '포인트 적립 혜택', '월정액 구독',
]

# 브랜드명 추출 패턴 — 멤버십·구독 키워드 앞에 붙은 명사 포착
# 예: "쿠팡 멤버십" → "쿠팡", "토스프라임 출시" → "토스프라임"
MEMBERSHIP_PATTERNS = [
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*멤버십',
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*구독',
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*클럽',
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*패스',
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*프라임',
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*플러스',
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*혜택\s*강화',
    r'([가-힣a-zA-Z0-9&·]{2,10})\s*제휴\s*확대',
]

# F3 블랙리스트 — 고유명사 오인식·비브랜드 단어
TOPIC_BLOCKLIST = {
    # 직함·역할
    '대표', '대표이사', '관계자', '담당자', '기자', '소비자', '고객', '사용자',
    '이용자', '직원', '임원', '경영진',
    # 기관·단체
    '정부', '국회', '공정위', '금융위', '방통위', '서울시', '경찰', '검찰',
    '한국', '국내', '글로벌', '해외',
    # 너무 일반적인 명사
    '업계', '시장', '플랫폼', '서비스', '브랜드', '업체', '회사', '기업',
    '사업', '제품', '상품', '콘텐츠', '앱', '어플',
    # 멤버십 관련 일반어 (패턴 오추출 방지)
    '구독', '멤버십', '혜택', '할인', '쿠폰', '포인트', '적립', '무료',
    '유료', '월간', '연간', '프리미엄', '기본', '스탠다드', '라이트',
    # 수식어·동사성 명사
    '신규', '출시', '개편', '강화', '확대', '제공', '운영', '도입',
    '확인', '발표', '공개', '진행', '시작', '종료',
    # 실행 결과 기반 추가 — 일반명사
    '생활', '통합', '월정액', '기반', '가전', '전용', '우주', '맞춤형',
    '자사', '대상', '역시', '다양한', '하이', '분석', '결합', '단독',
    '자체', '실속형', '교육', '투어', '플러스', '와우',
    # 카테고리어
    'OTT', 'AI',
    # 기타 노이즈
    '개인', '정품', '입주민',
    # 단어 단편·수식어 (2차 실행 결과)
    '텔레콤', '요기', '다양', '쇼핑', '네이버', '마이홈',
    '이번', '기존', '인상', '환불', '프로모션', '통해', '있는', '앞세운',
    'LG유',  # "LG유플러스"에서 오추출 — 전체 표기는 WATCHLIST에 추가
    # 통신사 자체 (제휴 브랜드 아님)
    'SKT', 'KT', 'SK텔레콤', 'LG유플러스',
    # 기타 무관 노이즈
    'BEV', '부메랑', '프렌들리',
}

# 한국어 조사·어미 — 추출된 후보 끝에서 제거
# 주의: 단독 '이'는 제외 — "네이버페이" → "네이버페" 로 잘못 잘릴 수 있음
_KO_PARTICLES = (
    '이며', '이고', '이다', '하는', '하며', '하고', '한', '된', '된다',
    '에서', '으로', '에게', '에게는', '까지', '부터', '이라', '이란',
    '은', '는', '가', '을', '를', '의', '와', '과', '도',
)


# ── Naver API 헬퍼 ────────────────────────────────────────────

def _headers():
    return {
        'X-Naver-Client-Id': NAVER_ID,
        'X-Naver-Client-Secret': NAVER_SECRET,
    }


def fetch_datalab(brands: list[str]) -> dict[str, dict]:
    """DataLab 검색어 트렌드 — 12주 데이터 → spike ratio 계산"""
    end   = datetime.today()
    start = end - timedelta(weeks=12)
    url   = 'https://openapi.naver.com/v1/datalab/search'
    scores = {}

    for i in range(0, len(brands), 5):
        batch = brands[i:i+5]
        body = {
            'startDate':     start.strftime('%Y-%m-%d'),
            'endDate':       end.strftime('%Y-%m-%d'),
            'timeUnit':      'week',
            'keywordGroups': [{'groupName': b, 'keywords': [b]} for b in batch],
        }
        try:
            r = requests.post(url, headers={**_headers(), 'Content-Type': 'application/json'},
                              data=json.dumps(body), timeout=10)
            r.raise_for_status()
            for res in r.json().get('results', []):
                ratios = [d['ratio'] for d in res['data'] if d['ratio'] > 0]
                if len(ratios) < 4:
                    continue
                recent = ratios[-3:]        # 최근 3주
                baseline = ratios[:-3]      # 이전 9주
                baseline_avg = sum(baseline) / len(baseline) if baseline else 1
                recent_avg   = sum(recent)  / len(recent)
                spike = round(recent_avg / baseline_avg, 2) if baseline_avg > 0 else 1.0
                scores[res['title']] = {
                    'spike': spike,
                    'recent_avg': round(recent_avg, 1),
                    'max': int(max(ratios)),
                }
        except Exception as e:
            print(f'    DataLab 배치 실패 {batch}: {e}')
        time.sleep(0.3)

    return scores


def fetch_news_spike(brand: str) -> dict:
    """뉴스 버즈 급등 — 최근 7일 vs 이전 21일 평균 비교"""
    url = 'https://openapi.naver.com/v1/search/news.json'
    params = {'query': brand, 'display': 100, 'sort': 'date'}
    now = datetime.today()
    cutoff_7d  = now - timedelta(days=7)
    cutoff_28d = now - timedelta(days=28)

    recent_7d = prior_21d = 0
    titles_recent = []
    neg_score = pos_score = 0

    try:
        r = requests.get(url, headers=_headers(), params=params, timeout=8)
        r.raise_for_status()
        for it in r.json().get('items', []):
            pub = it.get('pubDate', '')
            title = re.sub(r'<[^>]+>', '', it.get('title', ''))
            desc  = re.sub(r'<[^>]+>', '', it.get('description', ''))
            text  = (title + ' ' + desc).lower()
            try:
                dt = parsedate_to_datetime(pub).replace(tzinfo=None)
            except Exception:
                continue
            if dt >= cutoff_7d:
                recent_7d += 1
                titles_recent.append(title[:60])
                for kw, pts in NEG_KW.items():
                    if kw in text: neg_score += pts
                for kw, pts in POS_KW.items():
                    if kw in text: pos_score += pts
            elif dt >= cutoff_28d:
                prior_21d += 1
    except Exception as e:
        print(f'    뉴스 검색 실패 {brand}: {e}')
        return {}

    # 이전 21일 뉴스가 너무 적으면 spike 비교 불가 → None 처리
    if prior_21d < 3:
        news_spike = None
    else:
        baseline_rate = prior_21d / 3
        news_spike = round(recent_7d / baseline_rate, 2)

    direction = 'neg' if neg_score > pos_score * 1.5 else ('pos' if pos_score > neg_score * 1.5 else 'neu')

    return {
        'recent_7d':    recent_7d,
        'prior_21d':    prior_21d,
        'spike':        news_spike,
        'neg_score':    neg_score,
        'pos_score':    pos_score,
        'direction':    direction,
        'sample_titles': titles_recent[:3],
    }


# ── [B] 토픽 우선 스캔 함수 ──────────────────────────────────

def fetch_topic_news(topic_keywords: list[str]) -> dict[str, dict]:
    """
    토픽 키워드로 뉴스 수집 → 브랜드 역발견
    필터 적용 순서: F4(중복제거) → F2(근접등장) → F3(블랙리스트) → F1(최소기사수)
    Returns: {brand: {article_count, topics, sample_titles}}
    """
    url = 'https://openapi.naver.com/v1/search/news.json'

    # {brand: {topics: set, titles: list, article_count: int}}
    brand_data: dict[str, dict] = defaultdict(
        lambda: {'topics': set(), 'titles': [], 'article_count': 0}
    )

    for topic in topic_keywords:
        params = {'query': topic, 'display': 100, 'sort': 'date'}
        try:
            r = requests.get(url, headers=_headers(), params=params, timeout=8)
            r.raise_for_status()
            items = r.json().get('items', [])
        except Exception as e:
            print(f'    토픽 뉴스 실패 [{topic}]: {e}')
            time.sleep(0.2)
            continue

        # F4: 중복 제거 — 제목 앞 15자 동일하면 같은 기사로 간주
        seen_prefixes: set[str] = set()
        deduped = []
        for it in items:
            title = re.sub(r'<[^>]+>', '', it.get('title', ''))
            prefix = title[:15]
            if prefix not in seen_prefixes:
                seen_prefixes.add(prefix)
                desc = re.sub(r'<[^>]+>', '', it.get('description', ''))
                deduped.append((title, desc))

        for title, desc in deduped:
            # F2: 제목 + description 앞 200자만 사용 (근접 등장)
            search_text = title + ' ' + desc[:200]

            # 브랜드 후보 추출: 멤버십 패턴 매칭
            candidates: set[str] = set()
            for pattern in MEMBERSHIP_PATTERNS:
                for m in re.finditer(pattern, search_text):
                    candidates.add(m.group(1).strip())

            # 기존 ALL_BRANDS도 등장 여부 체크 (패턴 미포착 보완)
            for b in ALL_BRANDS:
                if b in search_text:
                    candidates.add(b)

            # 후처리 1: · 기호로 연결된 복합어 분리 ("유튜브·티빙" → 각각)
            expanded: set[str] = set()
            for c in candidates:
                parts = re.split(r'[·&]', c)
                expanded.update(p.strip() for p in parts if p.strip())
            candidates = expanded

            # 후처리 2: 한국어 조사·어미 제거 ("쿠팡의" → "쿠팡")
            stripped: set[str] = set()
            for c in candidates:
                word = c
                for particle in _KO_PARTICLES:
                    if word.endswith(particle) and len(word) - len(particle) >= 2:
                        word = word[: -len(particle)]
                        break
                stripped.add(word)
            candidates = stripped

            # 후처리 3: 숫자로 시작하거나 날짜·기간 형태 제거
            candidates = {c for c in candidates if not re.match(r'^\d', c)}

            # F3: 블랙리스트 + 2글자 미만 제거
            valid = {
                c for c in candidates
                if c not in TOPIC_BLOCKLIST and len(c) >= 2
            }

            for brand in valid:
                brand_data[brand]['topics'].add(topic)
                brand_data[brand]['article_count'] += 1
                if len(brand_data[brand]['titles']) < 3:
                    brand_data[brand]['titles'].append(title[:60])

        time.sleep(0.2)

    # F1: 최소 기사 수 3건 이상만 통과
    return {b: d for b, d in brand_data.items() if d['article_count'] >= 3}


def score_topic_brands(topic_brands: dict, dl_scores: dict) -> list[dict]:
    """
    F5(교차 키워드 보정) + F6(DataLab 교차검증) 적용 → 점수 기반 정렬
    """
    results = []
    for brand, data in topic_brands.items():
        topic_count   = len(data['topics'])
        article_count = data['article_count']

        # F5: 여러 토픽 키워드에서 동시 등장 → 신호 강도 ↑
        # (토픽 1개=0점, 2개=+3점, 3개+=+6점...)
        cross_bonus = (topic_count - 1) * 3

        # F6: DataLab 교차검증 — 기존 스코어 재활용
        dl        = dl_scores.get(brand, {})
        dl_spike  = dl.get('spike')
        dl_verified = dl_spike is not None and dl_spike >= 1.0

        score = article_count + cross_bonus
        if dl_verified:
            score += 5  # DataLab에서도 잡히면 신뢰도 UP

        strength = 'strong' if score >= 15 else ('mid' if score >= 7 else 'low')
        is_new   = brand not in set(ALL_BRANDS)  # 기존 목록에 없던 신규 발견

        results.append({
            'brand':         brand,
            'article_count': article_count,
            'topic_count':   topic_count,
            'topics':        sorted(data['topics']),
            'dl_spike':      dl_spike,
            'dl_verified':   dl_verified,
            'score':         score,
            'strength':      strength,
            'sample_titles': data['titles'],
            'membership':    membership_status(brand),
            'is_new':        is_new,
        })

    results.sort(key=lambda x: -x['score'])
    return results


# ── 신호 강도 분류 ────────────────────────────────────────────

def classify_signal(dl_spike: float | None, news_spike: float | None, news_7d: int) -> tuple[str, list[str]]:
    """(strength, sources) — strength: 'strong'|'mid'|'weak'"""
    sources = []
    pts = 0
    if dl_spike and dl_spike >= 1.5:
        sources.append('DataLab')
        pts += 3 if dl_spike >= 2.0 else 1
    if news_spike and news_spike >= 1.8 and news_7d >= 5:
        sources.append('뉴스')
        pts += 3 if news_7d >= 15 else 1
    strength = 'strong' if pts >= 4 else ('mid' if pts >= 2 else 'weak')
    return strength, sources


def membership_status(brand: str) -> str:
    if brand in CURRENT_PARTNERS:
        return 'partner'
    if brand in CANDIDATES:
        return 'candidate'
    return 'watchlist'


# ── Main ─────────────────────────────────────────────────────

def main():
    today = datetime.today()
    print(f"[{today.strftime('%Y.%m.%d %H:%M')}] 트렌드 레이더 스캔 시작")
    print(f"  모니터링 브랜드: {len(ALL_BRANDS)}개\n")

    # Phase 1: DataLab 일괄 조회
    print("[Phase 1] Naver DataLab 검색 트렌드...")
    dl_scores = fetch_datalab(ALL_BRANDS)
    print(f"  → {len(dl_scores)}개 스코어 수집")

    # Phase 2: 뉴스 버즈 개별 조회
    print("\n[Phase 2] Naver 뉴스 버즈 스캔...")
    news_scores: dict[str, dict] = {}
    for i, brand in enumerate(ALL_BRANDS, 1):
        result = fetch_news_spike(brand)
        news_scores[brand] = result
        if result.get('spike') and result['spike'] >= 1.8 and result.get('recent_7d', 0) >= 5:
            icon = '🔴' if result.get('direction') == 'neg' else '📈'
            print(f"  [{i:03d}] {brand:<12} {icon} 뉴스 {result['recent_7d']}건 · 스파이크 {result['spike']:.1f}x")
        time.sleep(0.15)

    # Phase 2.5: 토픽 우선 스캔 (마케팅 플랫폼 역발견)
    print("\n[Phase 2.5] 토픽 키워드 스캔...")
    print(f"  토픽 키워드 {len(TOPIC_KEYWORDS)}개 × 뉴스 100건")
    topic_raw    = fetch_topic_news(TOPIC_KEYWORDS)
    topic_signals = score_topic_brands(topic_raw, dl_scores)
    new_count    = sum(1 for s in topic_signals if s['is_new'])
    print(f"  → 후보 {len(topic_signals)}개 발견 (기존 목록 외 신규: {new_count}개)")
    for s in topic_signals[:10]:  # 상위 10개만 출력
        new_tag = ' ★신규' if s['is_new'] else ''
        print(f"    [{s['score']:3d}점] {s['brand']:<12} "
              f"기사 {s['article_count']}건 · 토픽 {s['topic_count']}개{new_tag}")

    # Phase 3: 신호 종합
    print("\n[Phase 3] 신호 종합 중...")
    signals = []
    for brand in ALL_BRANDS:
        dl  = dl_scores.get(brand, {})
        nws = news_scores.get(brand, {})

        dl_spike   = dl.get('spike')
        news_spike = nws.get('spike')
        news_7d    = nws.get('recent_7d', 0)

        # 최소 기준: DataLab 1.4+ 또는 뉴스 spike 1.8+(비교 가능) + 뉴스 절대량 10건 이상
        has_dl_spike   = dl_spike and dl_spike >= 1.4
        has_news_spike = news_spike and news_spike >= 1.8 and news_7d >= 10
        has_news_abs   = news_7d >= 20  # spike 미계산이어도 절대량 충분하면 포함
        if not (has_dl_spike or has_news_spike or has_news_abs):
            continue

        strength, sources = classify_signal(dl_spike, news_spike, news_7d)
        if not sources:
            continue

        status = membership_status(brand)
        telcos = [
            {'id': tid, 'label': TELCO_LABEL[tid], 'prog': prog}
            for tid, prog in TELCO_MAP.get(brand, [])
        ]
        # 중복 통신사 제거
        seen = set()
        telcos_dedup = []
        for t in telcos:
            key = (t['id'], t['prog'])
            if key not in seen:
                seen.add(key)
                telcos_dedup.append(t)

        direction = nws.get('direction', 'neu')

        signals.append({
            'brand':         brand,
            'strength':      strength,
            'sources':       sources,
            'dl_spike':      dl_spike,
            'dl_recent_avg': dl.get('recent_avg'),
            'news_spike':    news_spike,
            'news_7d':       news_7d,
            'direction':     direction,
            'neg_score':     nws.get('neg_score', 0),
            'pos_score':     nws.get('pos_score', 0),
            'sample_titles': nws.get('sample_titles', []),
            'membership':    status,
            'telcos':        telcos_dedup,
        })

    # 정렬: partner > candidate > watchlist, 강도 내림차순
    status_order = {'partner': 0, 'candidate': 1, 'watchlist': 2}
    strength_order = {'strong': 0, 'mid': 1, 'weak': 2}
    signals.sort(key=lambda x: (status_order[x['membership']], strength_order[x['strength']], -x['news_7d']))

    # 결과 출력
    print(f"\n{'='*56}")
    print(f"  📡 트렌드 레이더 — {today.strftime('%Y.%m.%d')}  ({len(signals)}개 신호)")
    print(f"{'='*56}")
    for s in signals:
        icons = {'partner': '🔗', 'candidate': '💡', 'watchlist': '👁'}
        sev   = {'strong': '🔴', 'mid': '🟡', 'weak': '🟢'}
        dir_  = {'neg': '↘부정', 'pos': '↗긍정', 'neu': '→중립'}
        src   = '+'.join(s['sources'])
        tc    = '+'.join(t['label'] for t in s['telcos']) if s['telcos'] else '미제휴'
        print(f"  {sev.get(s['strength'],'○')} {icons[s['membership']]} {s['brand']:<12} "
              f"[{src}] {dir_.get(s['direction'],'')} | {tc} | 뉴스 {s['news_7d']}건")

    # 토픽 스캔 결과 출력
    print(f"\n{'='*56}")
    print(f"  🔍 토픽 스캔 — {len(topic_signals)}개 브랜드 ({new_count}개 신규 발견)")
    print(f"{'='*56}")
    for s in topic_signals:
        new_tag = ' ★신규' if s['is_new'] else ''
        dl_tag  = f" · DL×{s['dl_spike']:.2f}" if s['dl_spike'] else ''
        print(f"  [{s['score']:3d}점] {s['brand']:<12} "
              f"기사 {s['article_count']}건 · 토픽 {s['topic_count']}개{dl_tag}{new_tag}")

    output = {
        'generated_at':    today.strftime('%Y.%m.%d %H:%M'),
        'monitored_count': len(ALL_BRANDS),
        'signal_count':    len(signals),
        'signals':         signals,
        # 토픽 우선 스캔 결과 — 마케팅 플랫폼 역발견
        'topic_signal_count': len(topic_signals),
        'topic_signals':      topic_signals,
    }
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\n✅ 저장 완료: {OUTPUT_FILE}")


if __name__ == '__main__':
    main()
