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
const RADAR_SCANNED = '2026.08.05';

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
    rows: [
      {
        brand: '캐리비안베이',
        skt: { lines: [{ grade: '전 등급', b: '종일권 + 자켓 50% 할인 (~8.30)' }], date: 'T day · 8.3~8.7' },
        kt: { lines: [{ grade: '전 등급', b: '본인 + 동반 1인 50% 할인' }], date: '시즌혜택 · 8.3~8.31' },
        lgu: null,
        v: 'warn',
        basis: { skt: '종일권+자켓 50%', kt: '본인+동반1인 50%', gap: 'KT 동반 1인 포함 범위 우위' },
        note: { skt: '8.3~8.7', kt: '8.3~8.31' },
      },
    ],
  },
  {
    id: 'skt-lgu',
    label: 'SKT ↔ LGU+',
    desc: 'KT 미참여 · SKT Tday·Young week × LGU+ 투쁠데이',
    rows: [
      {
        brand: '백미당',
        skt: { lines: [{ grade: '전 등급', b: '아이스크림 1+1' }], date: 'T day · 8.3~8.7' },
        lgu: { lines: [{ grade: '선착순', b: '아이스크림 40% 할인 + 미니 아이스크림 컵 증정' }], date: '유플투쁠 2차 · 8.19' },
        kt: null,
        v: 'neut',
        basis: { skt: '1+1', lgu: '40% 할인+컵 증정', gap: '형태 상이·동급' },
        note: { skt: '8.3~8.7', lgu: '8.19' },
      },
      {
        brand: 'CGV',
        skt: { lines: [{ grade: '전 등급', b: '8,500원 예매 + 매점 쿠폰 2종' }], date: 'T day · 8.3~8.7' },
        lgu: { lines: [{ grade: '선착순', b: '유플투쁠세트(팝콘M+음료M) 무료' }], date: '유플투쁠 2차 · 8.19' },
        kt: null,
        v: 'good',
        basis: { skt: '티켓할인+콘세션2종', lgu: '콘세션만 무료', gap: 'SKT 티켓할인 추가' },
        note: { skt: '8.3~8.7', lgu: '8.19' },
      },
    ],
  },
  {
    id: 'kt-lgu',
    label: 'KT ↔ LGU+',
    desc: 'SKT 미참여 · KT 달달혜택 × LGU+ 투쁠데이',
    rows: [
      {
        brand: '배스킨라빈스',
        kt: { lines: [{ grade: '전 등급', b: '레디팩 30% 할인' }], date: '달달혜택 1차 · 8.3~8.17' },
        lgu: { lines: [{ grade: '선착순', b: '패밀리 최대 9천원 할인' }], date: <span className="upd">유플투쁠 1차 · 8.11</span> },
        skt: null,
        v: 'neut',
        basis: { kt: '레디팩 30% 할인', lgu: '패밀리 최대9천원 할인', gap: '단위 상이·비교불가' },
        note: { kt: '8.3~8.17', lgu: <span className="upd">8.11</span> },
      },
      {
        brand: '공차',
        kt: { lines: [{ grade: '전 등급', b: '음료 6종 50% 할인' }], date: '달달혜택 1차 · 8.3~8.17' },
        lgu: { lines: [{ grade: '선착순', b: '최대 50% 할인 (1만원 이상 구매 시, 최대 5천원)' }], date: <span className="upd">유플투쁠 1차 · 8.13</span> },
        skt: null,
        v: 'neut',
        basis: { kt: '음료 6종 50% 할인', lgu: '최대 50% 할인(상한 5천원)', gap: 'LGU 5천원 상한' },
        note: { kt: '8.3~8.17', lgu: <span className="upd">8.13</span> },
      },
      {
        brand: '롯데렌터카 G car',
        kt: { lines: [{ grade: '전 등급', b: 'G car 대여료 60% 할인' }], date: '시즌혜택 · 8.3~8.31' },
        lgu: { lines: [{ grade: '선착순', b: 'G car 대여료 60% 할인 (1.5만원 구매 시)' }], date: '유플투쁠 2차 · 8.19' },
        skt: null,
        v: 'neut',
        basis: { kt: '60% 할인', lgu: '60% 할인(조건부)', gap: '동일 60%·조건 상이' },
        note: { kt: '8.3~8.31', lgu: '8.19' },
      },
    ],
  },
  {
    id: 'three',
    label: '3사 공통',
    desc: '동일 브랜드 3사 동시 운영',
    rows: [], // 2026.08 3사 겹치는 브랜드 없음 (SKT·KT·LGU+ 각자 다른 브랜드 라인업)
  },
];

// nb: 네이버플러스 메인, 동일 카테고리 해당 시 쿠팡·배민 합류 / tm: T멤버십
// 올리브영·무신사·현대카드는 특화 버티컬 → #8 비통신 현황 섹션에서만 다룸
const alCats = [
  // ── T멤버십 우위 ──
  {
    icon: '🚗', cat: '카셰어링·렌터카', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'SK렌터카', deadline: '상시', rows: [{ grade: '전 등급', desc: '제주 최대 85% 할인, 내륙 최대 60% 할인' }] },
    ]}],
    reasons: ['T멤버십: SK렌터카 상시 제주 최대 85%·내륙 최대 60% 할인 운영', '네이버플러스: 쏘카 혜택 6.30 종료 · 8월 카셰어링 제휴 없음'],
  },
  {
    icon: '🍽', cat: '외식·카페', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: '아웃백, VIPS', deadline: '상시', rows: [{ grade: 'V, G', desc: '15% 할인' }, { grade: 'S', desc: '5% 할인' }] },
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
        { grade: 'V', desc: '본인 40% 할인, 동반 3인 30% 할인' },
        { grade: 'G, S', desc: '본인 40% 할인, 동반 3인 20% 할인' },
      ]},
      { partner: '캐리비안베이', deadline: 'T day · 8.3~8.7', rows: [
        { grade: '전 등급', desc: '종일권 + 자켓 50% 할인 (~8.30)' },
      ]},
    ]}],
    reasons: ['T멤버십: 에버랜드·롯데월드 상시 40%+동반 30% · T day 캐리비안베이 종일권+자켓 50%', '비통신 멤버십: 테마파크 제휴 없음'],
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
    tm: [{ platform: 'T멤버십', items: [
      { partner: '요기요×네네치킨', deadline: 'T day · 8.3~8.7', rows: [
        { grade: 'VIP', desc: '8천원 할인 (1.8만원 이상 주문 시)' },
        { grade: '전 등급', desc: '6천원 할인 (1.8만원 이상 주문 시)' },
      ]},
    ]}],
    reasons: ['요기요·쿠팡이츠·배민 3종 모두 상시 무료배달 커버', 'T멤버십: 배달 상시 제휴 없음 · T day 요기요 6~8천원 할인'],
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
    ]}],
    reasons: ['네이버플러스: CU 5%+5% 최대 10% 효과 (~26.12.31)', 'T멤버십: GS25 화요일 신선식품 200원 상시 · CU·세븐 100원 상시'],
  },
  {
    icon: '🎬', cat: '영화관', v: 'neut',
    nb: [{ platform: '네이버플러스', items: [
      { partner: '롯데시네마', deadline: '월 4회 · ~26.12.31', rows: [{ grade: null, desc: '최대 5천원 + 콤보 3천원 할인' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'CGV', deadline: '상시', rows: [
        { grade: 'V', desc: '무료관람 연3회 / 1+1 연9회 택1' },
        { grade: '전 등급', desc: '4천원 할인' },
      ]},
      { partner: 'CGV', deadline: 'T day · 8.3~8.7', rows: [
        { grade: '전 등급', desc: '8,500원 예매 + 매점 쿠폰 2종' },
      ]},
    ]}],
    reasons: ['네이버플러스: 롯데시네마 커버 (월 4회)', 'T멤버십: CGV 4천원 상시+VIP연3회/1+1연9회 · T day 8,500원+쿠폰'],
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
      { partner: '롯데마트제타', deadline: 'T day · 8.3~8.7', rows: [
        { grade: '전 등급', desc: '50% 할인 (최대 8천원)' },
      ]},
    ]}],
    reasons: ['네이버플러스·쿠팡 로켓프레시: 온라인 마트·신선식품 배송 커버', 'T멤버십: 이마트 V 7%(짝수월)/3% 적립 · T day 롯데마트제타 50%'],
  },
];

const alVdLabel = { warn: 'T멤버십 열위', good: 'T멤버십 우위', neut: '유사 수준' };

export const recs = [
  {
    rank: 1,
    brand: '설빙',
    tag: '매장 606개 · DataLab ↗1.27',
    reason: '아이스디저트 카테고리 1위 · 전국 606개. Tday 5개월 공백 지속. 7.20 위생 논란 공식 사과 완료 — 전 매장 특별점검 후 진정세, 브랜드 회복 추이 모니터링 중.',
    reach: [
      { label: '매장 규모', text: '전국 606개 · 아이스디저트 카테고리 1위' },
      { label: '검색 버즈', text: 'DataLab ↗1.27 · 블로그 74만 · 카페 23만 · 뉴스 100건 — 위생 논란 이후 부정 버즈 포함' },
      { label: '제휴 포인트', text: '2026.03 이후 Tday 공백 5개월 · 위생 논란 공식 사과 완료(7.20) · 브랜드 회복 추이 모니터링 중' },
    ],
    trend: 'DataLab 1.27 · 블로그 74만 · 카페 23만 · 뉴스 100건',
    hot: true,
    skt: [
      { prog: 'Tday', active: false, last: '2026.03', gap: '5개월 공백' },
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
    brand: '맥시칸치킨',
    tag: '매장 564개 · DataLab 1.04',
    reason: '양념치킨 원조 · 전국 564개. 3사 모두 미참여 · 치킨 카테고리 상시 제휴 공백 지속.',
    reach: [
      { label: '매장 규모', text: '전국 564개 · 치킨 카테고리 중견 브랜드 (양념치킨 원조)' },
      { label: '검색 버즈', text: 'DataLab 1.04 · 뉴스 37건' },
      { label: '제휴 포인트', text: 'SKT 미참여 · 치킨 카테고리 상시 제휴 공백 — 중가 치킨 세분 시장 진입 기회' },
    ],
    trend: 'DataLab 1.04 · 뉴스 37건',
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
        <span className="ss"><span className="upd">2026년 8월 기준</span></span>
        
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
                        <td className="comp-td comp-brand">{r.brand}</td>
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
          <div className="comp-footer">SKT: Tday/T week · KT: 달달혜택 · LGU+: 투쁠데이·스페셜데이 기준 (<span className="upd">2026년 8월 · Week(8.3~8.7) 기준 · 총6건 · SKT Day2~4·KT달달2차 미공개</span>)</div>
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
                <span className="alc-cat">{c.cat}</span>
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
              <div className="rec-brand">{r.brand}</div>
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
        <div className="tr-footer"><span className="upd">2026.08.05</span> 스캔 · 매주 배치 자동 업데이트</div>
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
