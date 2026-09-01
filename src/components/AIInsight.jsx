import { useEffect, useRef } from 'react';
import cnData from '../../category_news.json';
import { CategoryNewsContent } from './CategoryNews';
import { trendSignals } from '../data/radarData';

// 뉴스 수집 기간(7일) 표시용 — dateStr: 'YYYY.MM.DD' 또는 'YYYY.MM.DD HH:MM'
function news7dPeriod(dateStr) {
  const [y, m, d] = dateStr.split(' ')[0].split('.').map(Number);
  const end   = new Date(y, m - 1, d);
  const start = new Date(y, m - 1, d - 6);
  const fmt = (dt) => `${dt.getMonth() + 1}.${String(dt.getDate()).padStart(2, '0')}`;
  return `${fmt(start)}~${fmt(end)}`;
}

// 섹션 4 — 제휴사 이슈 레이더 스캔 기준일 (업데이트 시 변경)
const RADAR_SCANNED = '2026.09.02';

// 섹션 4 — 제휴사 이슈 레이더 데이터는 src/data/radarData.js에서 관리

const trStrength = { strong: '🔴 강', mid: '🟡 중', low: '🟢 약' };
const trDir = { neg: { label: '부정', cls: 'trd-neg' }, pos: { label: '긍정', cls: 'trd-pos' }, neu: { label: '중립', cls: 'trd-neu' } };
const trMem = { partner: '현재 제휴', candidate: '잠재 후보', watchlist: '관심 브랜드' };
const trMemCls = { partner: 'trm-partner', candidate: 'trm-candidate', watchlist: 'trm-watch' };

const compGroups = [
  {
    id: 'skt-kt',
    label: 'SKT ↔ KT',
    desc: 'LGU+ 미운영 · 양자 대결',
    rows: [], // 2026.09 KT 달달혜택 미공개 (9월 15일경 공개 예정)
  },
  {
    id: 'skt-lgu',
    label: 'SKT ↔ LGU+',
    desc: 'KT 미참여 · SKT Tday·Young week × LGU+ 투쁠데이',
    rows: [
      {
        brand: '공차',
        updated: true,
        skt: { lines: [{ grade: 'V', b: '음료 6종 50% 할인 (최대 6천원)' }], date: 'T day · 9.2' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '최대 50% 할인 (1만원 이상 구매 시, 최대 5천원)' }], date: '투쁠 3차 · 9.14' },
        v: 'neut',
        basis: { skt: 'V등급 50% 최대 6천원', lgu: '선착순 50% 최대 5천원', gap: '동급 — VIP제한 vs 개방' },
        note: { skt: '9.2', lgu: '9.14' },
      },
      {
        brand: '백억커피',
        updated: true,
        skt: { lines: [{ grade: '전 등급', b: '아메리카노+팝콘 무료 (정가 1,900원)' }], date: 'Young week · 9.7~9.11' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '아메리카노+팝콘 무료' }], date: '투쁠 4차 · 9.15' },
        v: 'neut',
        basis: { skt: '아메리카노+팝콘 무료', lgu: '아메리카노+팝콘 무료', gap: '동급 — 동일 혜택' },
        note: { skt: '9.7~9.11', lgu: '9.15' },
      },
      {
        brand: 'NOL티켓',
        updated: true,
        skt: { lines: [{ grade: '전 등급', b: '뮤지컬 겨울왕국 15% 할인 (R/S/A석)' }, { grade: '전 등급', b: '성률기획전 여름을담은우리 40% 할인' }], date: 'Young week · 9.7~9.11' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '전시 특별전 35% 할인 (1인 4매)' }, { grade: '장기고객', b: '겨울왕국 20% 할인 (최대 4매)' }], date: '컬쳐데이 · 9.14~9.18 / 장기고객데이 · 9.24' },
        v: 'neut',
        basis: { skt: '겨울왕국 15%·성률기획전 40%', lgu: '전시 35%·겨울왕국 장기 20%', gap: '콘텐츠 상이·혼재' },
        note: { skt: '9.7~9.11', lgu: '9.14~9.24' },
      },
      {
        brand: '노브랜드',
        updated: true,
        skt: { lines: [{ grade: '전 등급', b: '4만원 이상 20% 할인 (최대 1만원)' }], date: 'T day · 9.2' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '유부우동 무료증정' }], date: '투쁠 6차 · 9.17' },
        v: 'good',
        basis: { skt: '4만원↑ 20% 할인 최대 1만원', lgu: '유부우동 단품 무료증정', gap: 'SKT 구매할인 범용성↑' },
        note: { skt: '9.2', lgu: '9.17' },
      },
      {
        brand: '이마트24',
        updated: true,
        skt: { lines: [{ grade: '전 등급', b: '삼각김밥 50% 할인 (7종 택1)' }], date: 'Young week · 9.7~9.11' },
        kt: null,
        lgu: { lines: [{ grade: '장기고객', b: '최대 3천원 할인 (1만원 이상 구매 시)' }], date: '장기고객데이 · 9.24' },
        v: 'neut',
        basis: { skt: '삼각김밥 50% (7종 택1)', lgu: '장기고객 3천원 할인', gap: '단품 vs 구매범위' },
        note: { skt: '9.7~9.11', lgu: '9.24' },
      },
    ],
  },
  {
    id: 'kt-lgu',
    label: 'KT ↔ LGU+',
    desc: 'SKT 미참여 · KT 달달혜택 × LGU+ 투쁠데이',
    rows: [], // 2026.09 KT 달달혜택 미공개
  },
  {
    id: 'three',
    label: '3사 공통',
    desc: '동일 브랜드 3사 동시 운영',
    rows: [], // 2026.09 KT 달달혜택 미공개로 3사 비교 불가
  },
];

// nb: 네이버플러스 메인, 동일 카테고리 해당 시 쿠팡·배민 합류 / tm: T멤버십
// 올리브영·무신사·현대카드는 특화 버티컬 → #8 비통신 현황 섹션에서만 다룸
const alCats = [
  // ── T멤버십 우위 ──
  {
    icon: '🍽', cat: '외식·카페', v: 'good',
    updated: true,
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: '아웃백', deadline: '상시', rows: [{ grade: 'V, G', desc: '15% 할인 (월 4회, 일 최대 2만원)' }, { grade: 'S', desc: '5% 할인 (월 4회, 일 최대 1만원)' }] },
      { partner: 'VIPS', deadline: '상시', rows: [{ grade: 'V, G', desc: '15% 할인' }, { grade: 'S', desc: '5% 할인' }] },
      { partner: '도미노, 피자헛', deadline: '상시', rows: [{ grade: 'V', desc: '30% 할인' }, { grade: 'G, S', desc: '20% 할인' }] },
    ]}],
    reasons: ['T멤버십: 상시 15~30% (아웃백·VIPS·도미노·피자헛)', '비통신 멤버십: 외식 브랜드 직접 제휴 없음'],
  },
  {
    icon: '🎡', cat: '테마파크', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: '에버랜드', deadline: '상시', rows: [
        { grade: '전 등급', desc: '본인 40% 할인, 동반 3인 30% 할인' },
      ]},
      { partner: '롯데월드어드벤처', deadline: '상시', rows: [
        { grade: 'V, G', desc: '본인 40% 할인, 동반 3인 30% 할인' },
        { grade: 'S', desc: '본인 40% 할인, 동반 3인 20% 할인' },
      ]},
    ]}],
    reasons: ['T멤버십: 에버랜드·롯데월드 상시 40%+동반 30%', '비통신 멤버십: 테마파크 제휴 없음'],
  },
  // ── T멤버십 열위 ──
  {
    icon: '⛽', cat: '주유', v: 'warn',
    nb: [{ platform: '네이버플러스', items: [
      { partner: 'GS칼텍스', deadline: '월 최대 5,000P · 상시', rows: [{ grade: null, desc: 'L당 100원 Npay 적립' }] },
    ]}],
    tm: null,
    reasons: ['네이버플러스: GS칼텍스 전국 L당 100원 Npay 적립 상시 운영', 'T멤버십: 주유 제휴 없음'],
  },
  {
    icon: '🛵', cat: '배달', v: 'warn',
    nb: [
      { platform: '네이버플러스', items: [
        { partner: '요기요 (요기패스X)', deadline: '상시', rows: [
          { grade: null, desc: '15,000원 이상 무료배달' },
          { grade: null, desc: '포장 5% 할인' },
        ]},
      ]},
      { platform: '쿠팡 로켓와우', items: [
        { partner: '쿠팡이츠', deadline: '상시', rows: [{ grade: null, desc: '무제한 무료배달 (금액·거리 무관)' }] },
      ]},
      { platform: '배민클럽', items: [
        { partner: '배달의민족', deadline: '상시', rows: [
          { grade: null, desc: '알뜰배달 입점 가게 배달팁 무료' },
          { grade: null, desc: '1인분 소량 주문도 배달팁 0원' },
        ]},
      ]},
    ],
    tm: null,
    reasons: ['요기요·쿠팡이츠·배민 3종 모두 상시 무료배달 커버', 'T멤버십: 배달 상시 제휴 없음'],
  },
  {
    icon: '🛍', cat: '이커머스', v: 'neut',
    nb: [
      { platform: '네이버플러스', items: [
        { partner: '네이버쇼핑', deadline: '월 20만원까지', rows: [{ grade: null, desc: '최대 5% Npay 포인트 적립' }] },
      ]},
      { platform: '쿠팡 로켓와우', items: [
        { partner: '쿠팡', deadline: '상시', rows: [
          { grade: null, desc: '로켓배송 무료 (금액·거리 무관)' },
          { grade: null, desc: '와우 전용 할인가 제공' },
        ]},
      ]},
    ],
    tm: [{ platform: 'T멤버십', items: [
      { partner: '11번가', deadline: '상시', rows: [{ grade: null, desc: '최대 11% 적립/할인' }] },
    ]}],
    reasons: ['T멤버십: 11번가 11% — 비통신 대비 혜택 수준 우위', '네이버플러스+쿠팡: 네이버쇼핑 전반 + 쿠팡 커버리지 우위 — 다양성에서 앞섬'],
  },
  // ── 유사 수준 ──
  {
    icon: '🏪', cat: '편의점', v: 'neut',
    nb: [{ platform: '네이버플러스', items: [
      { partner: 'CU', deadline: '~26.12.31', rows: [{ grade: null, desc: '5% 즉시할인 + 5% Npay 적립 (일 1회, 각 5천원 한도)' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'GS25', deadline: '상시 (매주 화)', rows: [{ grade: '전 등급', desc: '신선식품 1,000원당 200원 할인 (일1회, 최대 2만원)' }] },
      { partner: 'CU', deadline: '상시', rows: [{ grade: 'V, G', desc: '100원 할인' }, { grade: 'S', desc: '50원 할인' }] },
      { partner: '세븐일레븐', deadline: '상시', rows: [{ grade: 'V, G', desc: '100원 할인' }, { grade: 'S', desc: '50원 할인' }] },
      { partner: 'CU', deadline: 'Young week · 9.7~9.11', rows: [{ grade: '전 등급', desc: '빵 50% 할인 (6종 택1)' }] },
      { partner: '이마트24', deadline: 'Young week · 9.7~9.11', rows: [{ grade: '전 등급', desc: '삼각김밥 50% 할인 (7종 택1)' }] },
    ]}],
    reasons: ['네이버플러스: CU 5%+5% 최대 10% 효과 (~26.12.31)', 'T멤버십 Young week: CU 빵·이마트24 각 50% (9.7~9.11)', 'T멤버십: GS25 화요일 신선식품 200원 상시 · CU·세븐 100원 상시'],
  },
  {
    icon: '🎬', cat: '영화관', v: 'neut',
    nb: [{ platform: '네이버플러스', items: [
      { partner: '롯데시네마', deadline: '월 4회 · ~26.12.31', rows: [{ grade: null, desc: '최대 5천원 + 콤보 3천원 할인' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'CGV', deadline: '상시', rows: [
        { grade: 'V', desc: '무료관람 연3회 / 1+1 연9회 택1' },
        { grade: '전 등급', desc: '4,000원 할인 (11,000원 이상 예매 시)' },
      ]},
    ]}],
    reasons: ['네이버플러스: 롯데시네마 커버 (월 4회)', 'T멤버십: CGV 4천원 상시 + VIP 무료연3회/1+1연9회'],
  },
  {
    icon: '🏬', cat: '마트·신선', v: 'neut',
    nb: [
      { platform: '네이버플러스', items: [
        { partner: '롯데마트', deadline: '상시', rows: [{ grade: null, desc: '신상 5% 할인 + 무료배송' }] },
        { partner: '컬리', deadline: '상시', rows: [{ grade: null, desc: '2만원 이상 무료배송' }] },
      ]},
      { platform: '쿠팡 로켓와우', items: [
        { partner: '로켓프레시', deadline: '상시', rows: [{ grade: null, desc: '당일·새벽배송 무료' }] },
      ]},
    ],
    tm: [{ platform: 'T멤버십', items: [
      { partner: '이마트', deadline: '상시', rows: [
        { grade: 'V', desc: '짝수월 7%, 홀수월 3% 적립' },
        { grade: 'G, S', desc: '3% 적립' },
      ]},
      { partner: '노브랜드', deadline: 'T day · 9.2', rows: [
        { grade: '전 등급', desc: '4만원 이상 20% 할인 (최대 1만원)' },
      ]},
    ]}],
    reasons: ['네이버플러스·쿠팡 로켓프레시: 온라인 마트·신선식품 배송 커버', 'T멤버십: 이마트 V 7%(짝)/3% · T day 노브랜드 20% 할인'],
  },
  {
    icon: '🚗', cat: '카셰어링·렌터카', v: 'neut',
    nb: [{ platform: '네이버플러스', items: [
      { partner: '쏘카', deadline: '상시', rows: [{ grade: null, desc: '시간대 요금 50% 할인' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'SK렌터카', deadline: '상시', rows: [{ grade: '전 등급', desc: '제주 최대 85% 할인, 내륙 최대 60% 할인' }] },
    ]}],
    reasons: ['T멤버십: SK렌터카 상시 제주 최대 85%·내륙 최대 60% 할인 운영', '네이버플러스: 쏘카 50% 할인 상시 운영 (카셰어링)'],
  },
];

const alVdLabel = { warn: 'T멤버십 열위', good: 'T멤버십 우위', neut: '유사 수준' };

export const recs = [
  {
    rank: 1,
    brand: '설빙',
    updated: false,
    tag: '매장 606개 · DataLab →1.01',
    reason: '아이스디저트 카테고리 1위 · 전국 606개. 태국·미국 해외 확장 가속. Tday 6개월 공백. 7월 위생 재논란 — 브랜드 신뢰 모니터링 국면.',
    reach: [
      { label: '매장 규모', text: '전국 606개 · 아이스디저트 카테고리 1위' },
      { label: '검색 버즈', text: 'DataLab →1.01 · 블로그 21만 · 카페 9만 · 뉴스 100건 — 여름 시즌·해외 확장 버즈' },
      { label: '제휴 포인트', text: '태국·미국 해외 확장 지속 · Tday 공백 6개월 · 7월 위생 재논란 — 브랜드 신뢰 회복 모니터링' },
    ],
    trend: 'DataLab 1.01 · 블로그 21만 · 카페 9만 · 뉴스 100건',
    hot: true,
    skt: [
      { prog: 'Tday', active: false, last: '2026.03', gap: '6개월 공백' },
    ],
    kt:  null,
    lgu: null,
  },
  {
    rank: 2,
    brand: '노모어피자',
    tag: '매장 215개 · DataLab 📈1.18',
    reason: '저단가 피자 포지션으로 피자헛·도미노와 차별화. 전지현 광고 모델 발탁·레이먼킴 콜라보로 브랜드 인지도 확장 중. SKT 미참여 상태.',
    reach: [
      { label: '매장 규모', text: '전국 215개 · 피자 카테고리 저단가 포지션 (피자헛·도미노 대비 접근성 우위)' },
      { label: '검색 버즈', text: 'DataLab 📈1.18 · 블로그 4.7만 · 뉴스 54건 — 전지현 모델·레이먼킴 신메뉴 콜라보 버즈' },
      { label: '제휴 포인트', text: 'SKT 미참여 · 저단가 피자 세분 시장 공백 — 가짜치즈 논란·영업적자 이력, 브랜드 신뢰도 모니터링 필요' },
    ],
    trend: 'DataLab 1.18 · 블로그 4.7만 · 뉴스 54건',
    hot: true,
    skt: [],
    kt:  null,
    lgu: null,
  },
  {
    rank: 3,
    brand: '60계치킨',
    tag: '매장 627개 · DataLab →0.91',
    reason: '치킨 카테고리 중견 브랜드 · 전국 627개. 크크크치킨 2년 연속 네이버 검색 1위 · 배민 픽업 전용 메뉴 출시로 배달 플랫폼 시너지 확인. SKT·KT·LGU+ 3사 모두 미참여.',
    reach: [
      { label: '매장 규모', text: '전국 627개 · 치킨 카테고리 중견 브랜드 (양념·후라이드 균형 라인업)' },
      { label: '검색 버즈', text: 'DataLab →0.91 · 블로그 4만 · 뉴스 74건 — 배민 픽업 메뉴 출시·히트상품 수상 버즈' },
      { label: '제휴 포인트', text: 'SKT 미참여 · 치킨 카테고리 상시 공백 — 철사 혼입 소송(2026.04) 진행 중 · 신뢰도 모니터링' },
    ],
    trend: 'DataLab 0.91 · 블로그 4만 · 뉴스 74건',
    hot: false,
    skt: [],
    kt:  null,
    lgu: null,
  },
];

const verdictIcon  = { warn: '⚠', good: '✅', neut: '↔', miss: '✕' };
// SKT가 포함된 그룹(skt-kt, skt-lgu): SKT 기준 판정
const verdictLabelSkt   = { warn: 'SKT 열위', good: 'SKT 우위', neut: '동급 경쟁', miss: 'SKT 없음' };
// 타사간 비교(kt-lgu, SKT 미참여): 그룹 첫 번째 통신사(KT) 기준 판정
const verdictLabelOther = { warn: 'U+ 우위', good: 'KT 우위', neut: '동급 경쟁', miss: 'U+ 없음' };
const carrierName = { skt: 'SKT', kt: 'KT', lgu: 'LGU+' };

function renderBenefitSide(groups, showPlatform = true) {
  if (!groups) return null;
  return groups.map((g, gi) => (
    <div key={gi} className="alc-group">
      {showPlatform && <div className="alc-platform">{g.platform}</div>}
      {g.items.map((item, ii) => (
        <div key={ii} className="alc-pblock">
          {(item.partner || item.deadline) && (
            <div className="alc-partner-row">
              {item.partner && <span className="alc-partner">{item.partner}</span>}
              {item.deadline && <span className="alc-dl">({item.deadline})</span>}
            </div>
          )}
          {item.rows.map((row, ri) => (
            <div key={ri} className="alc-row">
              {row.grade && <span className="alc-grade">[{row.grade}]</span>}
              <span className="alc-bdesc">{row.desc}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ));
}

function renderCarrier(data, colorClass) {
  if (!data) return <span className="comp-none">—</span>;
  return (
    <div className="comp-cell">
      {data.lines.map((line, i) => (
        <div key={i} className="comp-line">
          <span className="comp-grade">[{line.grade}]</span>
          <span className={`comp-benefit ${colorClass}`}>{line.b}</span>
        </div>
      ))}
      <div className="comp-date">{data.date}</div>
    </div>
  );
}

export default function AIInsight() {
  const trGridRef = useRef(null);
  useEffect(() => {
    const g = trGridRef.current;
    if (!g) return;
    const equalize = (sel) => {
      const els = g.querySelectorAll(sel);
      if (!els.length) return;
      els.forEach(el => { el.style.minHeight = ''; });
      const maxH = Math.max(...Array.from(els).map(el => el.offsetHeight));
      els.forEach(el => { el.style.minHeight = maxH + 'px'; });
    };
    equalize('.tr-card');
    equalize('.tr-foot');
  }, []);

  return (
    <div className="sec" id="ai">
      <div className="sh">
        <span className="st">🤖 AI 인사이트</span>
        <span className="ss">2026년 <span className="upd">9월</span> 기준</span>
        
      </div>

      {/* 섹션 1 — 3사 경쟁 매트릭스 */}
      <div className="ai-sec" id="ai-matrix">
        <div className="ai-sec-hdr">
          <span className="ai-sec-title">3사 경쟁 매트릭스</span>
          <span className="ai-sec-desc">월간 혜택 겹치는 브랜드 · SKT 경쟁 포지션 판정</span>
        </div>
        <div className="comp-wrap">
          <table className="comp-table">
            <thead>
              <tr>
                <th className="comp-th comp-th-brand">브랜드</th>
                <th className="comp-th comp-th-skt">SKT</th>
                <th className="comp-th comp-th-kt">KT</th>
                <th className="comp-th comp-th-lgu">LGU+</th>
                <th className="comp-th comp-th-vd">판정</th>
              </tr>
            </thead>
            <tbody>
              {compGroups.flatMap((g) => [
                <tr key={`grp-${g.id}`} className="comp-group-tr">
                  <td colSpan={4} className="comp-group-td">
                    <span className="comp-group-label">{g.label}</span>
                    <span className="comp-group-desc">{g.desc}</span>
                  </td>
                  <td className="comp-group-td comp-vd-td"></td>
                </tr>,
                ...(g.rows.length === 0
                  ? [<tr key={`${g.id}-empty`} className="comp-tr"><td colSpan={5} className="comp-empty">이번달 해당 없음</td></tr>]
                  : (() => {
                    const [k1, k2] = g.id.split('-'); // 그룹에 실제 참여하는 두 통신사 키
                    const label = g.id === 'kt-lgu' ? verdictLabelOther : verdictLabelSkt;
                    return g.rows.map((r) => (
                      <tr key={r.brand} className="comp-tr">
                        <td className="comp-td comp-brand">{r.updated ? <span className="upd">{r.brand}</span> : r.brand}</td>
                        <td className="comp-td comp-td-skt">{renderCarrier(r.skt, 'cb-skt')}</td>
                        <td className="comp-td comp-td-kt">{renderCarrier(r.kt, 'cb-kt')}</td>
                        <td className="comp-td comp-td-lgu">{renderCarrier(r.lgu, 'cb-lgu')}</td>
                        <td className="comp-td comp-vd-td">
                          {g.id === 'kt-lgu' && <div className="cvd-tag">(타사간 비교)</div>}
                          <span className={`comp-vd-badge cvb-${r.v}`}>{verdictIcon[r.v]} {label[r.v]}</span>
                          {r.basis && (
                            <div className="cvd-basis">
                              <div className="cvd-line">{carrierName[k1]} : {r.basis[k1]}</div>
                              <div className="cvd-line">{carrierName[k2]} : {r.basis[k2]}</div>
                              <div className="cvd-gap">→ {r.basis.gap}</div>
                            </div>
                          )}
                          <div className="cvd-note">
                            <div className="cvd-line">{carrierName[k1]} : {r.note[k1]}</div>
                            <div className="cvd-line">{carrierName[k2]} : {r.note[k2]}</div>
                          </div>
                        </td>
                      </tr>
                    ));
                  })()
                ),
              ])}
            </tbody>
          </table>
          <div className="comp-footer"><span className="upd">SKT: Tday/Young week · KT: 달달혜택 · LGU+: 투쁠데이 기준 (2026년 9월 · SKT Day1(9.2)+Young week(9.7~9.11)·LGU+ 투쁠 1~7차+컬쳐데이 공개 · KT 미공개 — 15일경 공개 후 업데이트 예정)</span></div>
        </div>
      </div>

      {/* 섹션 2 — 비통신 비교 */}
      <div className="ai-sec" id="ai-nontelecom">
        <div className="ai-sec-hdr">
          <span className="ai-sec-title">비통신 비교</span>
          <span className="ai-sec-desc">월간·상시·특화 전범위 · 카테고리별 T멤버십 vs 비통신</span>
        </div>
        <div className="alc-grid">
          {alCats.map((c) => (
            <div key={c.cat} className={`alc alc-${c.v}`}>
              <div className="alc-hdr">
                <span className="alc-icon">{c.icon}</span>
                <span className="alc-cat">{c.updated ? <span className="upd">{c.cat}</span> : c.cat}</span>
              </div>
              <div className="alc-body">
                <div className={`alc-col${c.v === 'warn' ? ' alc-col-hi-nb' : ''}`}>
                  <div className="alc-col-hdr alc-nb-hdr">비통신</div>
                  {renderBenefitSide(c.nb, true)}
                </div>
                <div className={`alc-col${c.v === 'good' ? ' alc-col-hi-tm' : ''}`}>
                  <div className="alc-col-hdr alc-tm-hdr">T멤버십</div>
                  {renderBenefitSide(c.tm, false)}
                </div>
              </div>
              <div className="alc-vd-bar">
                {c.reasons.map((r, i) => (
                  <div key={i} className="alc-reason">{i + 1}) {r}</div>
                ))}
                <div className={`alc-vc alc-vc-${c.v}`}>→ {alVdLabel[c.v]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 3 — 신규 제휴 추천 */}
      <div className="ai-sec" id="ai-recommend">
        <div className="ai-sec-hdr">
          <span className="ai-sec-title">신규 제휴 추천</span>
          <span className="ai-sec-desc">뜨는 브랜드 × 3사 미운영 교차 분석 · Top 3</span>
        </div>
        {recs.map((r) => (
          <div key={r.rank} className="rec-card">
            <div className="rec-hdr">
              <div className={`rec-rank${r.hot ? ' rr-hot' : ''}`}>{r.rank}</div>
              <div className="rec-brand">{r.updated ? <span className="upd">{r.brand}</span> : r.brand}</div>
              <div className="rec-tag">{r.tag}</div>
            </div>
            <div className="rec-reason">{r.reason}</div>
            <div className="rec-reach">
              {r.reach.map((item, i) => (
                <div key={i} className="rec-reach-row">
                  <span className="rec-reach-lbl">{item.label}</span>
                  <span className="rec-reach-txt">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="rec-meta">
              <span className="rec-trend-lbl">데이터</span> {r.trend}
            </div>
            <div className="rec-hist">
              <span className="rec-hist-lbl">SKT</span>
              {r.skt.length === 0 ? (
                <span className="rpb rpb-none">제휴 이력 없음</span>
              ) : (
                r.skt.map((s, i) => (
                  <span key={i} className={`rpb ${s.active ? 'rpb-active' : 'rpb-past'}`}>
                    {s.active ? '🟢' : '⚫'} {s.prog}{!s.active && s.last ? ` · ${s.last}` : ''}{s.gap ? ` (${s.gap})` : ''}
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 섹션 4 — 제휴사 이슈 레이더 */}
      <div className="ai-sec" id="ai-radar">
        <div className="ai-sec-hdr">
          <span className="ai-sec-title">🔍 제휴사 이슈 레이더</span>
          <span className="ai-sec-desc">제휴 브랜드 이슈 모니터링 · 뉴스 {news7dPeriod(RADAR_SCANNED)}</span>
        </div>
        <div className="tr-grid" ref={trGridRef}>
          {trendSignals.map((s, i) => (
            <div key={i} className={`tr-card tr-card-${s.direction} tr-str-${s.strength}`}>
              {/* 헤더: 브랜드명 + 방향/강도 — 색상으로 즉시 인지 */}
              <div className="tr-sig-hdr">
                <span className={s.updated ? 'tr-brand upd' : 'tr-brand'}>{s.brand}{s.updated && ' 🆕'}</span>
                <div className="tr-sig-meta">
                  <span className="tr-sev">{trStrength[s.strength]}</span>
                  <span className={`tr-dir ${trDir[s.direction].cls}`}>{trDir[s.direction].label}</span>
                </div>
              </div>
              {/* 바디: 이슈 내용 */}
              <div className="tr-body">
                <div className="tr-headline">
                  {Array.isArray(s.headline)
                    ? s.headline.map((b, bi) => (
                        <div key={bi} className="tr-bullet">
                          <span className="tr-bnum">{bi + 1}</span>
                          <span className="tr-btxt">{b}</span>
                        </div>
                      ))
                    : s.headline}
                </div>
                <div className="tr-nums">
                  {s.dlSpike && <span className="tr-num-item"><span className="tr-num-badge">DataLab</span><span className="tr-num-val"> ×{s.dlSpike}</span></span>}
                  <span className="tr-num-item"><span className="tr-num-badge">뉴스</span><span className="tr-num-val"> {s.news7d}건</span></span>
                </div>
                {s.links?.length > 0 && (
                  <div className="tr-links">
                    {s.links.map((l, j) => (
                      <a key={j} href={l.url} target="_blank" rel="noreferrer" className="tr-link">↗ {l.label}</a>
                    ))}
                  </div>
                )}
              </div>
              {/* 푸터: 3사 제휴 현황 + 영향 */}
              <div className="tr-foot">
                <div className="tr-telco-grid">
                  {[{id:'skt',lbl:'SKT'},{id:'kt',lbl:'KT'},{id:'lgu',lbl:'U+'}].map(({id,lbl}) => {
                    const t = s.telcos.find(t => t.id === id);
                    return (
                      <div key={id} className={`tr-tc tr-tc-${t ? id : 'none'}`}>
                        <span className="tr-tc-hdr">{lbl}</span>
                        <span className="tr-tc-val">{t ? t.prog : '—'}</span>
                        {t?.benefit && <span className="tr-tc-benefit">{t.benefit}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="tr-footer"><span className="upd">2026.09.02</span> 스캔 · 매주 배치 자동 업데이트</div>
      </div>

      {/* 섹션 5 — 마켓 시그널 */}
      <div className="ai-sec" id="ai-market">
        <div className="ai-sec-hdr">
          <span className="ai-sec-title">📡 마켓 시그널</span>
          <span className="ai-sec-desc">경쟁·소비 동향 · 뉴스 {news7dPeriod(cnData.generated_at)}</span>
        </div>
        <CategoryNewsContent excludeBrands={trendSignals.map(s => s.brand)} />
      </div>
    </div>
  );
}
