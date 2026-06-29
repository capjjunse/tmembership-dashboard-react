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
const RADAR_SCANNED = '2026.06.25';

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
    rows: [], // 7월 KT 달달혜택 미공개
  },
  {
    id: 'skt-lgu',
    label: 'SKT ↔ LGU+',
    desc: 'KT 미참여 · SKT 월간 혜택 × LGU+ 투쁠데이',
    rows: [], // 7월 LGU+ 유플투쁠 미공개
  },
  {
    id: 'kt-lgu',
    label: 'KT ↔ LGU+',
    desc: 'SKT 미참여 · KT 달달혜택 × LGU+ 투쁠데이',
    rows: [], // 7월 KT·LGU+ 모두 미공개
  },
  {
    id: 'three',
    label: '3사 공통',
    desc: '동일 브랜드 3사 동시 운영',
    rows: [], // 7월 KT·LGU+ 미공개로 비교 불가
  },
];

// nb: 네이버플러스 메인, 동일 카테고리 해당 시 쿠팡·배민 합류 / tm: T멤버십
// 올리브영·무신사·현대카드는 특화 버티컬 → #8 비통신 현황 섹션에서만 다룸
const alCats = [
  // ── T멤버십 우위 ──
  {
    icon: '🚗', cat: '카셰어링·렌터카', v: 'good',
    nb: [{ platform: '네이버플러스', items: [
      { partner: '쏘카', deadline: '~26.06.30', rows: [{ grade: null, desc: '50% 할인 (네이버예약 경유)' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'SK렌터카', deadline: '상시', rows: [{ grade: '전 등급', desc: '제주 최대 85% 할인, 내륙 최대 60% 할인' }] },
      { partner: 'G car', deadline: 'VIP PICK · 6월', rows: [{ grade: 'V', desc: '대여료 60%+보험료 5% 할인 (2시간 이상)' }] },
      { partner: 'TMAP 렌터카', deadline: 'VIP PLUS · 6월', rows: [{ grade: 'V', desc: '10,000원 할인 쿠폰 (5만원 이상 결제 시)' }] },
    ]}],
    reasons: ['T멤버십: SK렌터카 상시 + G car VIP PICK 60% · TMAP 렌터카 PLUS까지 렌터카 3종 커버', '네이버플러스: 쏘카 50% 기간한정 (~26.06.30) · 경유 조건 있음'],
  },
  {
    icon: '🍽', cat: '외식·카페', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'Tday', deadline: '월간', rows: [{ grade: null, desc: 'Week혜택(6.1~6.5): 매드포갈릭 30%(VIP 50%)·이디야커피 빙수 50%·크리스탈제이드 40%·백미당 1+1·사보텐 30% 등 / 0 week(6.8~6.12): 메가MGC커피 50%·투썸플레이스 40%·바나프레소 50% / T day 2주차(6.17): 쉐이크쉑 VIP 40%/G·S 20%·폴바셋 시그니처 커피 4종 50%·도미노피자 50% / T day 3주차(6.24): 뚜레쥬르 300원/P·다운타우너 버거세트 35%·역전우동 냉모밀 3,500원' }] },
      { partner: '아웃백, VIPS', deadline: '상시', rows: [{ grade: 'V, G', desc: '15% 할인' }] },
      { partner: '도미노, 피자헛', deadline: '상시', rows: [{ grade: 'V', desc: '30% 할인' }] },
      { partner: '공차, 폴바셋', deadline: '상시', rows: [{ grade: '전 등급', desc: '10% 할인' }] },
      { partner: 'VIP PICK · 6월', deadline: '월 1회 선택', rows: [{ grade: 'V', desc: '파스쿠찌 40%(최대 7,000원) / 쉐이크쉑 바닐라쉐이크 2,000원 / 피자헛 크래프티드세트 10,000원 또는 파스타 무료 중 택1' }] },
      { partner: '고반식당', deadline: 'VIP PLUS · 6월', rows: [{ grade: 'V', desc: '10,000원 할인 (5만원 이상 구매 시)' }] },
    ]}],
    reasons: ['T멤버십: 상시 10~30% + 매주 카페·외식 Tday 집중 (이디야커피·매드포갈릭·투썸·메가MGC커피·도미노피자 등 최대 50%) + VIP PICK 파스쿠찌·쉐이크쉑·피자헛 운영', '비통신 멤버십: 외식 브랜드 직접 제휴 없음'],
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
    ]}],
    reasons: ['T멤버십: 에버랜드·롯데월드 본인 40%+동반 30% 상시 2종 운영', '비통신 멤버십: 테마파크 제휴 없음'],
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
      { partner: '요기요', deadline: 'T day 1주차 · 6.8~6.12', rows: [
        { grade: '전 등급', desc: '×호식이두마리치킨 6,000원 할인 (VIP 8,000원, 18,000원 이상 주문 시)' },
      ]},
    ]}],
    reasons: ['요기요·쿠팡이츠·배민 3종 모두 상시 무료배달 커버', 'T멤버십: 배달 상시 제휴 없음 · T day 1주차(6.8~6.12) 요기요×호식이두마리치킨 6천원 한정 혜택'],
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
      { partner: '11번가', deadline: 'VIP PICK · 6월', rows: [{ grade: 'V', desc: '5,000원 할인 쿠폰 (2만원 이상 구매 시)' }] },
    ]}],
    reasons: ['T멤버십 11번가 11% > 비통신 5% — 혜택 수준은 T멤버십 우위', '비통신: 네이버쇼핑 전반 + 쿠팡 커버리지 우위 — 플랫폼 다양성에서 앞섬'],
  },
  // ── 유사 수준 ──
  {
    icon: '🏪', cat: '편의점', v: 'neut',
    nb: [{ platform: '네이버플러스', items: [
      { partner: 'CU', deadline: '~26.12.31', rows: [{ grade: null, desc: '5% 즉시할인 + 5% Npay 적립 (일 1회, 각 5천원 한도)' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'CU', deadline: '상시', rows: [{ grade: 'V, G', desc: '10% 할인' }, { grade: 'S', desc: '5% 할인' }] },
      { partner: '세븐일레븐', deadline: '상시', rows: [{ grade: 'V, G', desc: '10% 할인' }, { grade: 'S', desc: '5% 할인' }] },
    ]}],
    reasons: ['네이버플러스: CU 5%+5% 최대 10% 효과 (~26.12.31)', 'T멤버십: CU V·G 10% 동급 + 세븐일레븐 추가 운영'],
  },
  {
    icon: '🎬', cat: '영화관', v: 'neut',
    nb: [{ platform: '네이버플러스', items: [
      { partner: '롯데시네마', deadline: '월 4회 · ~26.12.31', rows: [{ grade: null, desc: '최대 5천원 + 콤보 3천원 할인' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'CGV', deadline: '상시', rows: [
        { grade: 'V', desc: '무료 연3회, 1+1 연9회, 특별관 12회' },
        { grade: '전 등급', desc: '4천원 할인' },
      ]},
      { partner: 'CGV', deadline: '6.1~6.5 · Week혜택 / 6.24~6.28 · T day 3주차', rows: [
        { grade: '전 등급', desc: '8,500원 예매 + 매점쿠폰 (더블콤보 3천원·팝콘M 1천원)' },
      ]},
    ]}],
    reasons: ['네이버플러스: 롯데시네마 커버 (월 4회)', 'T멤버십: CGV 상시 4천원 + 6.1~6.5·6.24~6.28 8,500원+매점쿠폰 (2회) · VIP 무료연3회/1+1연9회'],
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
      { partner: '이마트에브리데이', deadline: 'T day 2주차 · 6.17', rows: [
        { grade: '전 등급', desc: '4만원 이상 구매 시 20% 할인 (최대 1만원)' },
      ]},
    ]}],
    reasons: ['네이버플러스·쿠팡 로켓프레시: 온라인 마트·신선식품 배송 커버', 'T멤버십: 이마트 오프라인 3~7% 적립 + 이마트에브리데이 T day(6.17) 20% 할인 → 온/오프 채널 혼재'],
  },
];

const alVdLabel = { warn: 'T멤버십 열위', good: 'T멤버십 우위', neut: '유사 수준' };

const recs = [
  {
    rank: 1,
    brand: '깐부치킨',
    tag: '매장 168개 · DataLab 📈1.53',
    reason: <span className="upd">6.7 젠슨 황·최태원 재회동으로 버즈 2차 급등 중. 글로벌 주목도 상승한 이 시점이 SKT 제휴 협상 진입 최적기.</span>,
    reach: [
      { label: '매장 규모', text: '전국 168개 · 치킨 카테고리 빠른 성장 중인 브랜드' },
      { label: '검색 버즈', text: <span className="upd">DataLab 📈1.53 상승 · 6.7 재방문 이슈로 2차 버즈 급등 · 블로그 6만+ · 카페 1만+ · 뉴스 75건+</span> },
      { label: '제휴 포인트', text: <span className="upd">SKT 미참여 — 버즈 2차 피크 구간에서 계약 체결 시 최대 홍보 효과 기대</span> },
    ],
    trend: 'DataLab 1.53 · 블로그 6만+ · 카페 1만+ · 뉴스 75건+',
    hot: true,
    skt: [],
    kt:  null,
    lgu: null,
  },
  {
    rank: 2,
    brand: '청년다방',
    tag: '매장 269개 · DataLab 📈1.24',
    reason: 'DataLab 1.24 상승세 유지로 분식 카테고리 검색 버즈 상위권. 저단가 고빈도 구조로 월간 혜택 건수 채우기 가장 유리한 브랜드. SKT 미참여 — 선점 기회.',
    reach: [
      { label: '매장 규모', text: '전국 269개 · 분식 카테고리 빠른 확장 중인 성장형 브랜드' },
      { label: '검색 버즈', text: 'DataLab 📈1.24 상승세 · 블로그 22만 · 카페 9만 · 뉴스 100건' },
      { label: '제휴 포인트', text: '저단가(5천~1만원대) 고빈도 방문 구조 → 월간 혜택 건수 누적에 유리' },
    ],
    trend: 'DataLab 1.24 · 블로그 22만 · 카페 9만 · 뉴스 100건',
    hot: true,
    skt: [],
    kt:  null,
    lgu: null,
  },
  {
    rank: 3,
    brand: '설빙',
    tag: '매장 598개 · DataLab ↗1.15',
    reason: '여름 성수기 본격 돌입 · 아이스디저트 카테고리 1위. Tday 3개월 이상 공백 중 — 계약 지연 시 여름 피크 시즌 전체를 놓칠 수 있음.',
    reach: [
      { label: '매장 규모', text: '전국 598개 · 아이스디저트 카테고리 1위' },
      { label: '검색 버즈', text: 'DataLab ↗1.15 상승세 · 블로그 74만 · 카페 26만 · 뉴스 88건 — 여름 성수기 진입으로 버즈 상승 예상' },
      { label: '제휴 포인트', text: '2026.03 이후 Tday 공백 3개월 이상 지속 · 여름 시즌 선점을 위한 조속한 재계약 필요' },
    ],
    trend: 'DataLab 1.15 · 블로그 74만 · 카페 26만 · 뉴스 88건',
    hot: false,
    skt: [
      { prog: 'Tday', active: false, last: '2026.03', gap: '3개월 공백' },
    ],
    kt:  null,
    lgu: null,
  },
];

const verdictIcon  = { warn: '⚠', good: '✅', neut: '↔', miss: '✕' };
const verdictLabel = { warn: 'SKT 열위', good: 'SKT 우위', neut: '동급 경쟁', miss: 'SKT 없음' };

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
        <span className="ss"><span className="upd">2026년 7월 기준</span></span>
        
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
                  : g.rows.map((r) => (
                    <tr key={r.brand} className="comp-tr">
                      <td className="comp-td comp-brand">{r.brand}</td>
                      <td className="comp-td comp-td-skt">{renderCarrier(r.skt, 'cb-skt')}</td>
                      <td className="comp-td comp-td-kt">{renderCarrier(r.kt, 'cb-kt')}</td>
                      <td className="comp-td comp-td-lgu">{renderCarrier(r.lgu, 'cb-lgu')}</td>
                      <td className="comp-td comp-vd-td">
                        <span className={`comp-vd-badge cvb-${r.v}`}>{verdictIcon[r.v]} {verdictLabel[r.v]}</span>
                        {r.basis && <div className="cvd-basis">{r.basis}</div>}
                        <div className="cvd-note">{r.note}</div>
                      </td>
                    </tr>
                  ))
                ),
              ])}
            </tbody>
          </table>
          <div className="comp-footer"><span className="upd">SKT: Tday/T week · KT: 달달혜택·고객보답 · LGU+: 투쁠데이·스페셜데이 기준 (2026년 7월 · KT 달달혜택·LGU+ 유플투쁠 미공개 — 공개 후 업데이트 예정)</span></div>
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
                <span className="tr-brand">{s.brand}</span>
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
        <div className="tr-footer"><span className="upd">2026.06.25</span> 스캔 · 매주 배치 자동 업데이트</div>
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
