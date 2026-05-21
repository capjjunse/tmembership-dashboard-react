#!/usr/bin/env python3
"""
SKT T멤버십 브랜드 제휴 히스토리 수집 스크립트

4개 Google Sheets에서 브랜드별 제휴 이력을 수집:
- VIP Pick  : 현황 시트          (행 per 항목, 2023~2026)
- T-day     : 실적_RAW(22~)     (브랜드 × 월 행렬 형식)
- 0day      : 현황 시트          (행 per 항목)
- 클럽       : 실적_RAW(클럽)    (행 per 항목)

실행: python3 fetch_brand_history.py
결과: brand_history.json 저장
"""

import requests
import csv
import io
import json
import re
from datetime import datetime
from pathlib import Path

OUTPUT_FILE = Path(__file__).parent.parent / "brand_history.json"

SHEET_BASE = "https://docs.google.com/spreadsheets/d/{id}/gviz/tq?tqx=out:csv&sheet={sheet}"

SOURCES = [
    {
        "program": "vip_pick",
        "label":   "VIP Pick",
        "id":      "1n6pOC1lUvHnV-PsYk-kM7gyFTC4VW5Un6EoeKPzq2Eg",
        "sheet":   "현황",
        "format":  "tall",
        "col_brand":  2,
        "col_date":   1,
        "col_status": 7,
        "skip_rows":  1,
        "status_ok":  {"확정", "기존", "신규", "참여희망"},
        "status_end": {"drop", "Drop", "종료"},
    },
    {
        "program": "tday",
        "label":   "T-day",
        "id":      "1LfVQOngvfRfPri1F6FNSMdE9qAw5T7fOMJ5irVT9lkI",
        "sheet":   "실적_RAW(22~)",
        "format":  "wide",
        "col_brand":       0,
        "month_col_start": 4,
        "skip_rows":       2,
    },
    {
        "program": "0day",
        "label":   "0day",
        "id":      "1glWU9UeXmnLOgQp4WwnQ4ORJqt2okxrnMVfkN3CqqQo",
        "sheet":   "현황",
        "format":  "tall",
        "col_brand":  2,
        "col_date":   0,
        "col_status": None,
        "skip_rows":  2,
        "status_ok":  set(),
        "status_end": set(),
    },
    {
        "program": "club",
        "label":   "클럽",
        "id":      "1kmG9rHzAdPAQZG8j3t-cYzpNtXh9MaGxuQeIfxVpiW4",
        "sheet":   "실적_RAW(클럽)",
        "format":  "tall",
        "col_brand":  3,
        "col_date":   0,
        "col_status": 7,
        "skip_rows":  1,
        "status_ok":  {"확정"},
        "status_end": {"drop", "Drop", "종료"},
    },
]


# ── CSV 가져오기 ────────────────────────────────────────────────

def fetch_csv(sheet_id: str, sheet_name: str) -> list[list[str]]:
    from urllib.parse import quote
    url = SHEET_BASE.format(id=sheet_id, sheet=quote(sheet_name))
    r = requests.get(url, timeout=15)
    r.raise_for_status()
    reader = csv.reader(io.StringIO(r.text))
    return list(reader)


# ── 날짜 파싱 ─────────────────────────────────────────────────

def parse_ym(text: str) -> str | None:
    """'26년 01월', '2026.01', '26년 1월' → 'YYYY.MM' 또는 None"""
    text = text.strip()
    m = re.match(r"(\d{2})년\s*(\d{1,2})월", text)
    if m:
        return f"20{m.group(1)}.{int(m.group(2)):02d}"
    m = re.match(r"(\d{4})[.\-/](\d{1,2})", text)
    if m:
        return f"{m.group(1)}.{int(m.group(2)):02d}"
    return None


# ── 가로 행렬(T-day) 파서 ─────────────────────────────────────

def parse_wide(rows: list, cfg: dict) -> dict[str, list[str]]:
    """
    구조:
      행 0 : 월 헤더  ("연도 참여 월","","","","23년 01월","02월",...)
      행 1 : 건수 집계 행 — 스킵
      행 2+: 브랜드명, ..., O/blank per month
    """
    header_row = rows[0]
    # 월 헤더 목록 구성
    months = []
    cur_year = None
    for cell in header_row[cfg["month_col_start"]:]:
        cell = cell.strip()
        m = re.match(r"(\d{2})년\s*(\d{1,2})월", cell)
        if m:
            cur_year = int("20" + m.group(1))
            months.append(f"{cur_year}.{int(m.group(2)):02d}")
        elif re.match(r"\d{1,2}월", cell) and cur_year:
            month_num = int(re.match(r"(\d{1,2})월", cell).group(1))
            months.append(f"{cur_year}.{month_num:02d}")
        else:
            months.append(None)

    result: dict[str, list[str]] = {}
    for row in rows[cfg["skip_rows"]:]:
        if not row or not row[0].strip():
            continue
        brand = row[cfg["col_brand"]].strip()
        if not brand or brand in ("제휴사명", "연도 참여 월"):
            continue
        participated = []
        for i, ym in enumerate(months):
            if ym is None:
                continue
            col_idx = cfg["month_col_start"] + i
            if col_idx < len(row) and row[col_idx].strip().upper() in ("O", "O", "●", "Y"):
                participated.append(ym)
        if participated:
            if brand not in result:
                result[brand] = []
            result[brand] = sorted(set(result[brand] + participated))
    return result


# ── 세로 행 per 항목 파서 ──────────────────────────────────────

def parse_tall(rows: list, cfg: dict) -> dict[str, list[str]]:
    """각 행이 제휴사 + 날짜 + 상태를 갖는 형식"""
    result: dict[str, list[str]] = {}
    for row in rows[cfg["skip_rows"]:]:
        if len(row) <= max(cfg["col_brand"], cfg["col_date"]):
            continue
        brand = row[cfg["col_brand"]].strip()
        date  = row[cfg["col_date"]].strip()
        if not brand or not date:
            continue

        # 상태 필터 (Drop 등 제외)
        if cfg.get("col_status") is not None and cfg["col_status"] < len(row):
            status = row[cfg["col_status"]].strip()
            if status.lower() in {s.lower() for s in cfg.get("status_end", set())}:
                continue

        ym = parse_ym(date)
        if not ym:
            continue
        if brand not in result:
            result[brand] = []
        if ym not in result[brand]:
            result[brand].append(ym)

    # 날짜 정렬
    for brand in result:
        result[brand] = sorted(result[brand])
    return result


# ── 현재 운영 여부 판단 ────────────────────────────────────────

def is_active(months: list[str]) -> bool:
    if not months:
        return False
    today = datetime.today().strftime("%Y.%m")
    last  = max(months)
    # 이번 달 또는 지난달이면 현재 운영으로 판단
    y_last, m_last = int(last[:4]), int(last[5:])
    y_now,  m_now  = int(today[:4]), int(today[5:])
    diff = (y_now - y_last) * 12 + (m_now - m_last)
    return diff <= 1


# ── Main ──────────────────────────────────────────────────────

def main():
    print(f"[{datetime.now().strftime('%Y.%m.%d %H:%M')}] 브랜드 히스토리 수집 시작")

    all_programs: dict[str, dict[str, list[str]]] = {}

    for cfg in SOURCES:
        print(f"\n  [{cfg['label']}] {cfg['sheet']} 시트 로딩...")
        try:
            rows = fetch_csv(cfg["id"], cfg["sheet"])
            print(f"    → {len(rows)}행 로드")

            if cfg["format"] == "wide":
                data = parse_wide(rows, cfg)
            else:
                data = parse_tall(rows, cfg)

            print(f"    → {len(data)}개 브랜드 추출")
            all_programs[cfg["program"]] = data

        except Exception as e:
            print(f"    ❌ 실패: {e}")
            all_programs[cfg["program"]] = {}

    # 브랜드별로 역인덱스 구성
    brand_set: set[str] = set()
    for prog_data in all_programs.values():
        brand_set.update(prog_data.keys())

    brands: dict = {}
    for brand in sorted(brand_set):
        entry = {}
        for prog, prog_data in all_programs.items():
            months = prog_data.get(brand, [])
            if months:
                entry[prog] = {
                    "months": months,
                    "last":   max(months),
                    "active": is_active(months),
                }
            else:
                entry[prog] = None
        brands[brand] = entry

    output = {
        "generated_at": datetime.now().strftime("%Y.%m.%d %H:%M"),
        "brand_count":  len(brands),
        "brands":       brands,
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 저장 완료: {OUTPUT_FILE}")
    print(f"   총 브랜드: {len(brands)}개")

    # 샘플 출력
    sample_brands = ["설빙", "CGV", "피자헛", "공차", "배스킨라빈스", "메가커피"]
    print("\n[샘플 확인]")
    for b in sample_brands:
        if b in brands:
            progs = {k: v for k, v in brands[b].items() if v}
            if progs:
                for prog, d in progs.items():
                    status = "🟢현재" if d["active"] else f"⚫마지막 {d['last']}"
                    print(f"  {b:<10} {prog:<10} {status}  ({len(d['months'])}회)")


if __name__ == "__main__":
    main()
