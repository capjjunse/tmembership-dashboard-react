#!/usr/bin/env python3
"""
T멤버십 신규 제휴 브랜드 발굴 스크립트

Phase 1: Naver Blog 검색으로 최근 언급 급증 브랜드 후보 발굴
Phase 2: Naver DataLab 트렌드 스코어링 (상승세 판별)
Phase 3: Kakao Local 매장수 검증 (프랜차이즈 규모 확인)
Phase 4: 종합 스코어 산출 → 상위 15개 추천

실행: python3 brand_discover.py
결과: brand_candidates.json 저장
"""

import requests
import json
import time
import re
from datetime import datetime, timedelta
from collections import Counter, defaultdict
from pathlib import Path

# ── API 자격증명 ────────────────────────────────────────────
NAVER_ID     = "kWZuYiDh4bePpyvvJ1Fx"
NAVER_SECRET = "We38EQBjzj"
KAKAO_KEY    = "65f53db09fbd252c0d4ca3e557d6b619"
OUTPUT_FILE       = Path(__file__).parent.parent / "brand_candidates.json"
HISTORY_FILE      = Path(__file__).parent.parent / "brand_history.json"
# ───────────────────────────────────────────────────────────

# 현재 SKT 멤버십 제휴 브랜드 (추천 제외)
SKT_CURRENT = {
    "버거킹", "뚜레쥬르", "공차", "이니스프리", "던킨", "배스킨라빈스",
    "피자헛", "쉐이크쉑", "파스쿠찌", "파리바게뜨", "CGV", "노브랜드버거",
    "루덴시아", "매드포갈릭", "백미당", "하프클럽", "톤28", "백억커피",
}

# KT / LGU+ 현재 운영 브랜드 (매월 수동 갱신)
KT_CURRENT = {
    "할리스", "폴바셋", "쉐이크쉑", "도미노피자", "파리바게뜨", "롯데마트",
    "컬리", "GS SHOP", "크록스", "롯데렌터카", "국민학교떡볶이", "투썸플레이스",
    "배달의민족", "노랑통닭", "CGV", "팀홀튼", "메가커피",
}
LGU_CURRENT = {
    "공차", "아쿠아플라넷", "피자헛", "이삭토스트", "배스킨라빈스", "CGV",
    "다이소", "스타벅스", "파리바게뜨", "컬리", "하프클럽", "밀리의서재",
    "교보문고", "카카오페이지", "쿠팡이츠", "GS25", "이마트24",
}

# ── 히스토리 로딩 ─────────────────────────────────────────────

def load_history() -> dict:
    """brand_history.json 로드 (없으면 빈 dict)"""
    if HISTORY_FILE.exists():
        with open(HISTORY_FILE, encoding="utf-8") as f:
            return json.load(f).get("brands", {})
    return {}

def skt_history_label(brand: str, history: dict) -> str:
    """
    SKT 제휴 히스토리 → 한 줄 요약
    예) 'T-day 🟢현재' / 'T-day ⚫2026.03 (2개월 공백)' / '❌ 미참여'
    """
    data = history.get(brand, {})
    parts = []
    prog_labels = {"tday": "T-day", "vip_pick": "VIP Pick", "0day": "0day", "club": "클럽"}
    for prog, label in prog_labels.items():
        d = data.get(prog)
        if not d:
            continue
        if d["active"]:
            parts.append(f"{label} 🟢현재")
        else:
            last = d.get("last")
            if not last:
                continue
            # 공백 개월 계산 (last는 항상 과거 날짜)
            y1, m1 = int(last[:4]), int(last[5:])
            now = datetime.today()
            gap = (now.year - y1) * 12 + (now.month - m1)
            parts.append(f"{label} ⚫{last} ({gap}개월 공백)")
    return " / ".join(parts) if parts else "❌ 미참여"

def competitor_label(brand: str) -> str:
    """KT / LGU+ 현재 운영 여부"""
    kt  = "🟢" if brand in KT_CURRENT  else "❌"
    lgu = "🟢" if brand in LGU_CURRENT else "❌"
    return f"KT {kt}  LGU+ {lgu}"

# 고정 후보 풀 (카테고리별) — 매주 갱신 가능
SEED_BRANDS = [
    # 커피/음료
    "메가커피", "컴포즈커피", "빽다방", "더벤티", "매머드커피",
    "테일러커피", "소소한커피", "카페봄봄", "빈브라더스",
    # 버거/패스트푸드
    "맥도날드", "KFC", "롯데리아", "모스버거", "노모어피자", "고피자",
    # 치킨
    "굽네치킨", "BHC치킨", "처갓집양념치킨", "깐부치킨", "훌랄라",
    "나만의치킨", "맥시칸치킨", "60계치킨", "페리카나",
    # 분식
    "엽기떡볶이", "죠스떡볶이", "청년다방", "떡볶이의신", "걸작떡볶이치킨",
    # 한식/기타
    "바르닭", "한신포차", "봉구스밥버거", "맛쟁이돼지", "팔각도",
    "국밥이야기", "미정국수0410", "밥이보약",
    # 디저트
    "설빙", "달콤커피", "요거프레소", "모찌모찌도쿄",
    # 신흥 트렌드
    "노랑통닭", "후추통", "굽고",
]

# 중복 제거
SEED_BRANDS = list(dict.fromkeys(SEED_BRANDS))


# ── Phase 1: Naver Blog 검색 기반 신규 발굴 ─────────────────

DISCOVERY_QUERIES = [
    "신규 오픈 프랜차이즈 2026",
    "요즘 뜨는 음식점 브랜드",
    "새로 생긴 카페 체인",
    "급성장 외식 브랜드",
    "프랜차이즈 창업 인기",
]

def search_blog(query: str, display: int = 100) -> list[dict]:
    """Naver Blog 검색 API — 최신순 반환"""
    url = "https://openapi.naver.com/v1/search/blog.json"
    headers = {
        "X-Naver-Client-Id":     NAVER_ID,
        "X-Naver-Client-Secret": NAVER_SECRET,
    }
    params = {"query": query, "display": display, "sort": "date"}
    r = requests.get(url, headers=headers, params=params, timeout=10)
    r.raise_for_status()
    return r.json().get("items", [])


def extract_brand_candidates(items: list[dict]) -> list[str]:
    """블로그 제목/본문에서 브랜드 후보명 추출 (2~5자 한글 고유명사 패턴)"""
    text_all = " ".join(
        item.get("title", "") + " " + item.get("description", "")
        for item in items
    )
    # HTML 태그 제거
    text_all = re.sub(r"<[^>]+>", " ", text_all)

    # 한글 2~5자 단어 추출 (자음·모음 단독 제외)
    words = re.findall(r"[가-힣]{2,5}", text_all)

    # 노이즈 필터 (일반 명사)
    STOPWORDS = {
        # 동사/형용사/부사
        "특히", "있는", "가장", "이상", "있습니다", "합니다", "됩니다",
        "하는", "이번", "지금", "정말", "너무", "매우", "모두", "매장",
        "때문", "경우", "관련", "통해", "위해", "대한", "가능", "제공",
        "운영", "진행", "시작", "종료", "확인", "선택", "이용", "사용",
        # 일반 명사
        "신규", "오픈", "카페", "음식", "브랜드", "프랜차이즈",
        "창업", "가맹", "인기", "추천", "방문", "후기", "맛집", "할인",
        "혜택", "이벤트", "쿠폰", "특가", "음료", "배달", "포장",
        "치킨", "피자", "버거", "분식", "한식", "중식", "일식",
        "코리아", "대한민국", "서울", "수도권", "전국", "지역", "상권",
        "고객", "서비스", "결제", "포인트", "적립", "홍보", "광고",
        "아이스", "커피", "음료수", "케이크", "디저트", "매뉴", "메뉴",
        "국내", "최근", "현재", "올해", "작년", "주요", "다양",
    }
    candidates = [w for w in words if w not in STOPWORDS and len(w) >= 2]

    # 빈도 상위 30개 반환
    counter = Counter(candidates)
    return [brand for brand, _ in counter.most_common(30)]


def discover_from_blog() -> list[str]:
    """블로그 검색 → 신규 브랜드 후보 발굴"""
    print("\n[Phase 1] Naver Blog 기반 신규 브랜드 발굴...")
    all_candidates = []
    for query in DISCOVERY_QUERIES:
        try:
            items = search_blog(query, display=50)
            candidates = extract_brand_candidates(items)
            all_candidates.extend(candidates)
            print(f"  '{query}' → {len(candidates)}개 후보")
            time.sleep(0.2)
        except Exception as e:
            print(f"  '{query}' 실패: {e}")

    # 중복 제거 + 시드 풀에 없는 것만 → 신규 발굴 후보
    counter = Counter(all_candidates)
    seed_set = set(SEED_BRANDS)
    new_brands = [b for b, cnt in counter.most_common(20)
                  if b not in seed_set and b not in SKT_CURRENT and cnt >= 3]
    print(f"  → 신규 발굴 후보 {len(new_brands)}개: {new_brands[:10]}")
    return new_brands


# ── Phase 2: Naver DataLab 트렌드 스코어링 ──────────────────

def fetch_datalab_trends(brands: list[str]) -> dict[str, float]:
    """
    DataLab에서 브랜드별 최근 4주 평균 / 전체 평균 = 트렌드 스코어
    - > 1.3 : 상승세  / 1.0~1.3 : 유지 / < 1.0 : 하락
    - 최초 데이터가 최근 4주 이내 → 'emerging' 플래그
    """
    end   = datetime.today()
    start = end - timedelta(days=90)

    url = "https://openapi.naver.com/v1/datalab/search"
    headers = {
        "X-Naver-Client-Id":     NAVER_ID,
        "X-Naver-Client-Secret": NAVER_SECRET,
        "Content-Type":          "application/json",
    }

    scores = {}
    # DataLab: 최대 5그룹/요청 → 5개씩 배치
    for i in range(0, len(brands), 5):
        batch = brands[i:i+5]
        body = {
            "startDate": start.strftime("%Y-%m-%d"),
            "endDate":   end.strftime("%Y-%m-%d"),
            "timeUnit":  "week",
            "keywordGroups": [
                {"groupName": b, "keywords": [b]}
                for b in batch
            ],
        }
        try:
            r = requests.post(url, headers=headers,
                              data=json.dumps(body), timeout=10)
            r.raise_for_status()
            results = r.json().get("results", [])
            for res in results:
                name   = res["title"]
                ratios = [d["ratio"] for d in res["data"] if d["ratio"] > 0]
                if not ratios:
                    scores[name] = {"trend": 0.0, "max": 0, "emerging": False}
                    continue
                all_avg    = sum(ratios) / len(ratios)
                recent_4w  = ratios[-4:] if len(ratios) >= 4 else ratios
                recent_avg = sum(recent_4w) / len(recent_4w)
                trend_score = recent_avg / all_avg if all_avg > 0 else 1.0

                # 데이터가 최근 4주 이내에만 존재 → 신규 급부상
                nonzero_weeks = [i for i, v in enumerate(
                    [d["ratio"] for d in res["data"]]) if v > 0]
                total_weeks = len(res["data"])
                emerging = (min(nonzero_weeks) > total_weeks * 0.6) if nonzero_weeks else False

                scores[name] = {
                    "trend":    round(trend_score, 2),
                    "max":      int(max(ratios)),
                    "recent":   round(recent_avg, 1),
                    "emerging": emerging,
                }
        except Exception as e:
            print(f"  DataLab 배치 실패 ({batch}): {e}")
        time.sleep(0.3)

    return scores


# ── Phase 3: Kakao Local 매장수 조회 ─────────────────────────

def get_store_count(brand: str) -> int:
    """Kakao Local API — 브랜드명 검색 매장수"""
    url = "https://dapi.kakao.com/v2/local/search/keyword.json"
    headers = {"Authorization": f"KakaoAK {KAKAO_KEY}"}
    params  = {"query": brand, "size": 1, "page": 1}
    try:
        r = requests.get(url, headers=headers, params=params, timeout=5)
        r.raise_for_status()
        return r.json()["meta"]["total_count"]
    except Exception:
        return 0


def get_store_counts_batch(brands: list[str]) -> dict[str, int]:
    """매장수 일괄 조회"""
    counts = {}
    for brand in brands:
        counts[brand] = get_store_count(brand)
        time.sleep(0.1)
    return counts


# ── Phase 4: 블로그 + 카페 + 뉴스 언급 횟수 ─────────────────

def _naver_search_total(endpoint: str, brand: str) -> tuple[int, list[dict]]:
    """Naver Search API — (total_count, items) 반환"""
    headers = {"X-Naver-Client-Id": NAVER_ID, "X-Naver-Client-Secret": NAVER_SECRET}
    r = requests.get(f"https://openapi.naver.com/v1/search/{endpoint}",
                     headers=headers,
                     params={"query": brand, "display": 100, "sort": "date"},
                     timeout=5)
    r.raise_for_status()
    data  = r.json()
    total = data.get("total", len(data.get("items", [])))
    return total, data.get("items", [])


def get_mentions(brand: str, days: int = 30) -> dict:
    """
    블로그: 총 발행 건수(total_count) — 많을수록 인지도 높음
    카페:   총 건수(total_count) — date 없음
    뉴스:   최근 N일 건수 — 가중치 2배 (정식 보도 = 강한 신호)
    """
    from email.utils import parsedate_to_datetime

    blog = cafe = news = 0
    try:
        blog, _ = _naver_search_total("blog.json", brand)
    except Exception:
        pass
    try:
        cafe, _ = _naver_search_total("cafearticle.json", brand)
    except Exception:
        pass
    try:
        cutoff = datetime.today() - timedelta(days=days)
        _, items = _naver_search_total("news.json", brand)
        news = sum(
            1 for it in items
            if it.get("pubDate") and
               parsedate_to_datetime(it["pubDate"]).replace(tzinfo=None) >= cutoff
        )
    except Exception:
        pass

    return {"blog": blog, "cafe": cafe, "news": news, "total": blog + cafe + news * 2}


# ── Phase 5: 종합 스코어 산출 ────────────────────────────────

import math as _math

def composite_score(trend: dict, store_count: int, mentions: int) -> float:
    """
    종합 스코어 (100점 만점) — 신흥 브랜드 발굴 특화
    - 트렌드 상승폭   45% : trend > 1.2 = 상위권, emerging 보너스
    - 매장 규모 적정성 35% : 30~500개 sweet spot (너무 작으면 제휴 불가, 포화 브랜드 감점)
    - 언급 신선도     20% : 로그 스케일 bell — 1만~10만 건이 최고점
                           (0 = 너무 무명, 수백만 = 이미 포화 → 감점)
    """
    import math
    t = trend.get("trend", 1.0)
    e = 15 if trend.get("emerging") else 0

    # 트렌드 점수 (0~45)
    trend_pts = min(45, max(0, (t - 0.8) / 0.7 * 45))

    # 매장수 점수 (0~35) — 30~500개 구간 최고점
    if store_count < 10:
        store_pts = 0
    elif store_count <= 30:
        store_pts = store_count / 30 * 15
    elif store_count <= 500:
        store_pts = 15 + (store_count - 30) / 470 * 20
    elif store_count <= 1000:
        store_pts = 35 - (store_count - 500) / 500 * 15
    else:
        store_pts = max(0, 20 - (store_count - 1000) / 2000 * 20)

    # 언급 신선도 점수 (0~20) — log bell curve, 피크 50,000건
    if mentions <= 0:
        mention_pts = 0
    else:
        log_m    = math.log10(mentions)          # 0~7+
        log_peak = math.log10(50_000)            # ≈ 4.7
        mention_pts = max(0, 20 - abs(log_m - log_peak) * 7)

    return round(trend_pts + store_pts + mention_pts + e, 1)


# ── Main ─────────────────────────────────────────────────────

def main():
    print(f"[{datetime.now().strftime('%Y.%m.%d %H:%M')}] 브랜드 발굴 스캔 시작")

    # Phase 1: 블로그 기반 신규 발굴
    blog_discovered = discover_from_blog()

    # 최종 후보 = 시드 + 블로그 발굴 (SKT 현재 제휴 제외)
    candidates = [b for b in SEED_BRANDS if b not in SKT_CURRENT]
    candidates += [b for b in blog_discovered if b not in candidates]
    print(f"\n총 후보: {len(candidates)}개")

    # Phase 2: DataLab 트렌드
    print("\n[Phase 2] Naver DataLab 트렌드 스코어링...")
    trends = fetch_datalab_trends(candidates)
    print(f"  → {len(trends)}개 스코어 수집")

    # Phase 3: 매장수
    print("\n[Phase 3] Kakao Local 매장수 조회...")
    store_counts = get_store_counts_batch(candidates)
    hits = {k: v for k, v in store_counts.items() if v >= 10}
    print(f"  → 매장 10개↑: {len(hits)}개")

    # Phase 4: 블로그 + 카페 + 뉴스 언급
    print("\n[Phase 4] 최근 30일 블로그·카페·뉴스 언급...")
    mentions = {}
    for brand in candidates:
        mentions[brand] = get_mentions(brand, days=30)
        time.sleep(0.2)
    top_mentions = sorted(mentions.items(), key=lambda x: -x[1]["total"])[:5]
    print(f"  → 상위 언급: {[(b, m['blog'], m['cafe'], m['news']) for b, m in top_mentions]}")

    # Phase 5: 종합 스코어 + 히스토리 조회
    print("\n[Phase 5] 종합 스코어 산출 + 히스토리 로딩...")
    history = load_history()
    scored = []
    for brand in candidates:
        t  = trends.get(brand, {"trend": 1.0, "emerging": False, "max": 0})
        sc = store_counts.get(brand, 0)
        mn = mentions.get(brand, {}).get("total", 0)
        score = composite_score(t, sc, mn)

        tag = []
        if t.get("emerging"):       tag.append("🆕급부상")
        if t.get("trend", 1) > 1.3: tag.append("📈상승")

        m_detail = mentions.get(brand, {})
        scored.append({
            "brand":          brand,
            "score":          score,
            "trend":          t.get("trend", 0),
            "store_count":    sc,
            "blog_30d":       m_detail.get("blog", 0),
            "cafe_total":     m_detail.get("cafe", 0),
            "news_30d":       m_detail.get("news", 0),
            "mentions_total": mn,
            "emerging":       t.get("emerging", False),
            "tags":           tag,
            "skt_history":    skt_history_label(brand, history),
            "competitor":     competitor_label(brand),
        })

    scored.sort(key=lambda x: -x["score"])
    top15 = scored[:15]

    # 카드 형식 출력
    LINE = "━" * 56
    print(f"\n{'='*56}")
    print(f"  🔍 신규 제휴 추천 TOP 15   ({datetime.now().strftime('%Y.%m.%d')})")
    print(f"{'='*56}")
    for i, b in enumerate(top15, 1):
        tags_str = " ".join(b["tags"]) if b["tags"] else ""
        trend_arrow = "📈" if b["trend"] >= 1.2 else ("↗" if b["trend"] >= 1.05 else "→")
        print(f"\n{LINE}")
        print(f" {i:2}위  {b['brand']}  ·  {b['score']:.1f}점  {tags_str}")
        print(f"     매장 {b['store_count']}개  |  트렌드 {trend_arrow}{b['trend']:.2f}  |  "
              f"블로그 {b['blog_30d']//10000}만  카페 {b['cafe_total']//10000}만  뉴스 {b['news_30d']}건")
        print(f"     SKT  {b['skt_history']}")
        print(f"     {b['competitor']}")
    print(LINE)

    # 저장
    output = {
        "generated_at": datetime.now().strftime("%Y.%m.%d %H:%M"),
        "total_scanned": len(candidates),
        "top15": top15,
        "blog_discovered": blog_discovered[:10],
    }
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\n✅ 결과 저장: {OUTPUT_FILE}")

    return top15


if __name__ == "__main__":
    main()
