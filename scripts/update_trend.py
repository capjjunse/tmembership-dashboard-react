#!/usr/bin/env python3
"""
T멤버십 대시보드 — 네이버 DataLab 검색어 트렌드 수집 스크립트
매주 월요일 오전 9시 launchd로 자동 실행

실행: python3 update_trend.py
결과: ~/Documents/tmembership/trend_data.json 저장
      완료 후 Claude.ai 브라우저 자동 오픈
"""

import requests
import json
import os
from datetime import datetime, timedelta
from pathlib import Path

# ── 설정 ──────────────────────────────────────────────
CLIENT_ID     = "kWZuYiDh4bePpyvvJ1Fx"
CLIENT_SECRET = "We38EQBjzj"

# 결과 저장 폴더 (없으면 자동 생성)
OUTPUT_DIR  = Path(__file__).parent.parent / "src" / "components"
OUTPUT_FILE = Path(__file__).parent.parent / "trend_data.json"
# ──────────────────────────────────────────────────────


def fetch_datalab():
    """네이버 DataLab API 호출 → 최근 3개월 주간 데이터 반환"""
    end   = datetime.today()
    start = end - timedelta(days=90)

    url = "https://openapi.naver.com/v1/datalab/search"
    headers = {
        "X-Naver-Client-Id":     CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
        "Content-Type":          "application/json"
    }
    
    body = {
    "startDate": start.strftime("%Y-%m-%d"),
    "endDate":   end.strftime("%Y-%m-%d"),
    "timeUnit":  "week",
    "keywordGroups": [
        {
            "groupName": "SKT",
            "keywords": [
                # 브랜드
                "T멤버십", "T 멤버십", "t멤버십",
             
                # 이벤트
                "T데이", "T day", "티데이",
                "0week", "0위크",
                
                # 등급/혜택
                "VIP pick"
                               
            ]
        },
        {
            "groupName": "KT",
            "keywords": [
                # 브랜드
                "KT멤버십", "KT 멤버십", "kt멤버십",
                               
                # 이벤트
                "달달혜택", "KT 달달혜택",
                               
                # 등급/혜택
                "VIP 초이스"
            ]
        },
        {
            "groupName": "LGU+",
            "keywords": [
                # 브랜드
                "U+멤버십", "유플러스 멤버십"
                                
                # 이벤트
                "유플투쁠", "유플 투쁠",
                
                # 등급/혜택
                "VIP 콕"
                
            ]
        }
    ]
}

    resp = requests.post(url, headers=headers, data=json.dumps(body), timeout=10)
    resp.raise_for_status()
    return resp.json()


def parse_chart_data(raw):
    """DataLab 응답 → Chart.js용 labels/skt/kt/lgu 배열로 변환"""
    results = raw.get("results", [])

    # 레이블은 첫 번째 그룹 기준
    labels = [item["period"] for item in results[0]["data"]]

    # 날짜를 MM/DD 형식으로 변환 (예: "2026-01-20" → "1/20")
    def fmt(date_str):
        d = datetime.strptime(date_str, "%Y-%m-%d")
        return f"{d.month}/{d.day:02d}"

    labels_fmt = [fmt(l) for l in labels]
    skt = [round(item["ratio"], 1) for item in results[0]["data"]]
    kt  = [round(item["ratio"], 1) for item in results[1]["data"]]
    lgu = [round(item["ratio"], 1) for item in results[2]["data"]]

    return {
        "collected_at": datetime.now().strftime("%Y.%m.%d %H:%M"),
        "period": {
            "start": labels[0],
            "end":   labels[-1]
        },
        "labels": labels_fmt,
        "skt":    skt,
        "kt":     kt,
        "lgu":    lgu
    }


def save_json(data):
    """JSON 파일로 저장"""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ 저장 완료: {OUTPUT_FILE}")


def main():
    print(f"[{datetime.now().strftime('%Y.%m.%d %H:%M')}] T멤버십 트렌드 수집 시작...")

    try:
        print("📡 네이버 DataLab API 호출 중...")
        raw  = fetch_datalab()
        data = parse_chart_data(raw)
        save_json(data)

        # 수집 결과 미리보기
        print(f"\n📊 수집 결과 미리보기:")
        print(f"  기간: {data['period']['start']} ~ {data['period']['end']}")
        print(f"  주간 수: {len(data['labels'])}주")
        print(f"  SKT  최고: {max(data['skt'])}")
        print(f"  KT   최고: {max(data['kt'])}")
        print(f"  LGU+ 최고: {max(data['lgu'])}")

    except requests.exceptions.RequestException as e:
        print(f"❌ API 호출 실패: {e}")
        raise
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        raise


if __name__ == "__main__":
    main()
