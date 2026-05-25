// no state needed — all sections always visible

const compGroups = [
  {
    id: 'skt-kt',
    label: 'SKT ↔ KT',
    desc: 'LGU+ 미운영 · 양자 대결',
    rows: [
      {
        brand: '쉐이크쉑',
        skt: { lines: [{ grade: '전 등급', b: '쉑버거 30% 할인 · VIP 1+1' }], date: '5.27~5.31 · T day 3주차' },
        kt: { lines: [{ grade: '전 등급', b: '프라이+소다(S) 무료 (1만원↑)' }], date: '5.15~31 · 달달혜택' },
        lgu: null,
        v: 'good', basis: 'SKT VIP 쉑버거 1+1 vs KT 사이드 무료', note: 'SKT VIP는 버거 1+1, KT는 전 등급 프라이+소다 증정',
      },
    ],
  },
  {
    id: 'skt-lgu',
    label: 'SKT ↔ LGU+',
    desc: 'KT 미운영 · 양자 대결',
    rows: [
      {
        brand: '공차',
        skt: { lines: [{ grade: '전 등급', b: '50% 할인/적립' }], date: '5.13 · T day 1주차' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '최대 50% 할인 (1만원 이상, 최대 5천원)' }], date: '5.12 · 투쁠데이' },
        v: 'neut', basis: '동일 할인율', note: 'LGU+ 하루 먼저',
      },
      {
        brand: '피자헛',
        skt: { lines: [{ grade: '전 등급', b: '방문 포장 50% 할인/적립 (최대 22,500원)' }], date: '5.20 · T day 2주차' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '프리미엄피자 55% 할인 + 파스타 증정' }], date: '5.14 · 투쁠데이' },
        v: 'warn', basis: 'LGU+ 5%p↑ + 파스타 증정', note: 'LGU+ 1주 먼저',
      },
      {
        brand: '배스킨라빈스',
        skt: { lines: [{ grade: '전 등급', b: '파인트 40% 할인/적립 (9,800원→5,880원)' }], date: '5.20 · T day 2주차' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '패밀리 사이즈 최대 9천원 할인' }], date: '5.20 · 투쁠데이+스페셜데이' },
        v: 'neut', basis: '상품 티어 상이', note: '같은 날 동시 운영',
      },
      {
        brand: 'CGV',
        skt: { lines: [{ grade: '전 등급', b: '8,500원 예매+매점 쿠폰 2종' }], date: '5.4~5.8 · 0 week / 5.13 · T day 1주차 / 5.20 · T day 2주차' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '유플투쁠세트 (팝콘M+음료M) 무료' }], date: '5.20 · 투쁠데이' },
        v: 'good', basis: 'SKT 예매권+스낵 vs LGU+ 스낵만', note: 'SKT 3회 vs LGU+ 1회',
      },
      {
        brand: '하프클럽',
        skt: { lines: [{ grade: '전 등급', b: '장바구니 20%+온리하프 35%' }], date: '5.4~5.8 · 0 week' },
        kt: null,
        lgu: { lines: [{ grade: '선착순', b: '30% 할인쿠폰+온리하프 35% 중복쿠폰 증정' }], date: '5.19 · 스페셜데이' },
        v: 'warn', basis: 'LGU+ 10%p↑', note: '기간 분산 · 직접 경쟁 없음',
      },
    ],
  },
  {
    id: 'kt-lgu',
    label: 'KT ↔ LGU+',
    desc: 'SKT 미참여 · KT·LGU+ 경쟁',
    rows: [
      {
        brand: '컬리',
        skt: null,
        kt: { lines: [{ grade: '전 등급', b: '5천원 할인 (4만원 이상)' }], date: '5.15~31 · 달달스페셜' },
        lgu: { lines: [{ grade: '선착순', b: '5천원 할인 (4만원 이상)' }], date: '5.19 · 스페셜데이' },
        v: 'miss', basis: 'SKT 미운영', note: 'KT 2주간 vs LGU+ 1일',
      },
    ],
  },
  {
    id: 'three',
    label: '3사 공통',
    desc: '동일 브랜드 3사 동시 운영',
    rows: [
      {
        brand: '파리바게뜨',
        skt: { lines: [{ grade: '전 등급', b: '1,000원당 200원/P 할인/적립' }], date: '5.4~5.8 · 0 week' },
        kt: { lines: [{ grade: '전 등급', b: '4천원 할인 (1만원 이상) · 선착순 소진' }], date: '5.15~31 · 달달초이스' },
        lgu: { lines: [{ grade: '선착순', b: '최대 6천원 할인 (2만원 이상)' }], date: '5.19 · 스페셜데이' },
        v: 'neut', basis: '3사 구조 상이', note: 'KT 달달초이스 쿠폰 선착순 소진 · SKT 0week / LGU+ 스페셜데이',
      },
    ],
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
      { partner: 'G car', deadline: 'VIP PICK · 5월', rows: [{ grade: 'V', desc: '대여료 60%+보험료 5% 할인 (2시간 이상)' }] },
      { partner: 'TMAP 렌터카', deadline: 'VIP PLUS · 5월', rows: [{ grade: 'V', desc: '10,000원 할인 쿠폰' }] },
    ]}],
    reasons: ['T멤버십: SK렌터카 상시 + G car VIP PICK 60% · TMAP 렌터카 PLUS까지 렌터카 3종 커버', '네이버플러스: 쏘카 50% 기간한정 (~26.06.30) · 경유 조건 있음'],
  },
  {
    icon: '🍽', cat: '외식·카페', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'T-day', deadline: '월간', rows: [{ grade: null, desc: '버거킹 40~55%, 공차 50%, 피자헛 50% 등 다수 브랜드' }] },
      { partner: '아웃백, VIPS', deadline: '상시', rows: [{ grade: 'V, G', desc: '15% 할인' }] },
      { partner: '도미노, 피자헛', deadline: '상시', rows: [{ grade: 'V', desc: '30% 할인' }] },
      { partner: '공차, 폴바셋', deadline: '상시', rows: [{ grade: '전 등급', desc: '10% 할인' }] },
      { partner: 'VIP PICK · 5월', deadline: '월 1회 선택', rows: [{ grade: 'V', desc: '폴 바셋·잠바주스 50% / 피자헛 세트 10,000원 중 택1' }] },
      { partner: '고반식당', deadline: 'VIP PLUS · 5월', rows: [{ grade: 'V', desc: '10,000원 할인 (5만원 이상)' }] },
    ]}],
    reasons: ['T멤버십: 상시 10~30% + T-day 최대 55% + VIP PICK 카페·외식 50% 다수 운영', '비통신 멤버십: 외식 브랜드 직접 제휴 없음'],
  },
  {
    icon: '🎡', cat: '테마파크', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: '롯데월드어드벤처', deadline: '상시', rows: [
        { grade: 'V', desc: '본인 40% 할인, 동반 3인 30% 할인' },
        { grade: 'G, S', desc: '본인 40% 할인, 동반 3인 20% 할인' },
      ]},
    ]}],
    reasons: ['T멤버십: 롯데월드 종합이용권 본인 40%+동반 할인 상시 운영', '비통신 멤버십: 테마파크 제휴 없음'],
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
    reasons: ['요기요·쿠팡이츠·배민 3종 모두 상시 무료배달 커버', 'T멤버십: 배달 상시 제휴 없음 (T-day 월간 1~2회에 그침)'],
  },
  {
    icon: '🛍', cat: '이커머스', v: 'warn',
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
      { partner: 'GS SHOP', deadline: 'VIP PICK · 5월', rows: [{ grade: 'V', desc: '30% 할인 최대 10,000원' }] },
    ]}],
    reasons: ['네이버플러스 5% 적립 + 쿠팡 로켓배송 무료 — 이커머스 전반 커버', 'T멤버십: 11번가 11% + VIP PICK GS SHOP 30% (SK 생태계·제휴처 한정)'],
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
    ]}],
    reasons: ['네이버플러스: 롯데시네마 커버', 'T멤버십: CGV 커버 (롯데시네마 2026.02 종료) → CGV·롯데 채널 분리'],
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
    ]}],
    reasons: ['네이버플러스·쿠팡 로켓프레시: 온라인 마트·신선식품 배송 커버', 'T멤버십: 이마트 오프라인 3~7% 적립 → 온/오프 채널 분리'],
  },
];

const alVdLabel = { warn: 'T멤버십 열위', good: 'T멤버십 우위', neut: '유사 수준' };

const recs = [
  {
    rank: 1,
    brand: '설빙',
    tag: '매장 596개 · DataLab 📈1.22',
    reason: '5월 내내 검색량 상승 중. 여름 시즌 직전 T-day 재계약 타이밍 — KT·LGU+ 모두 미운영으로 단독 선점 가능.',
    reach: [
      { label: '매장 규모', text: '전국 596개 · 아이스디저트 카테고리 1위' },
      { label: '검색 버즈', text: '전월比 +22% 급증 · 블로그 74만은 공차(72만)·메가커피(68만) 동급' },
      { label: '제휴 포인트', text: '여름 성수기(5~8월) 직전 계약 → KT·LGU+ 미운영 상태에서 선점 가능' },
    ],
    trend: 'DataLab 1.22 · 블로그 74만 · 카페 25만 · 뉴스 28건',
    hot: true,
    skt: [
      { prog: 'VIP Pick', active: true,  last: null,      gap: null },
      { prog: 'T-day',    active: false, last: '2026.03', gap: '2개월 공백' },
    ],
    kt:  null,
    lgu: null,
  },
  {
    rank: 2,
    brand: '청년다방',
    tag: '매장 273개 · DataLab ↗1.14',
    reason: '4월부터 꾸준히 상승 중. 저가 분식 카테고리로 방문 빈도 높음. 3사 모두 미참여 — 선점 기회.',
    reach: [
      { label: '매장 규모', text: '전국 273개 · 분식 카테고리 빠른 확장 중인 성장형 브랜드' },
      { label: '검색 버즈', text: '6개월 연속 상승 (DataLab 1.14) · 뉴스 88건 = 경쟁사 대비 2~3배 언론 노출' },
      { label: '제휴 포인트', text: '저단가(5천~1만원대) 고빈도 방문 구조 → 월간 혜택 건수 누적에 유리' },
    ],
    trend: 'DataLab 1.14 · 블로그 22만 · 뉴스 88건',
    hot: true,
    skt: [],
    kt:  null,
    lgu: null,
  },
  {
    rank: 3,
    brand: '60계치킨',
    tag: '매장 628개 · 3사 미운영',
    reason: '전국 628개 매장 보유로 안정적 제휴 규모. 카페 언급 15만으로 실사용자 버즈 높은 편. 3사 모두 미참여.',
    reach: [
      { label: '매장 규모', text: '전국 628개 · 치킨 카테고리 3위권 전국망' },
      { label: '검색 버즈', text: '보합세(0.99)지만 카페 15만 = 블로그보다 실구매 후기 비중이 높아 충성 팬덤 탄탄' },
      { label: '제휴 포인트', text: '중가 치킨(1.5~2만원대) 상시 제휴 공백 → 안정적 모객 기대' },
    ],
    trend: '트렌드 0.99 · 블로그 10만 · 카페 15만 · 뉴스 34건',
    hot: false,
    skt: [],
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
  return (
    <div className="sec" id="ai">
      <div className="sh">
        <span className="st">🤖 AI 인사이트</span>
        <span className="ss">2026년 5월 기준</span>
        
      </div>

      {/* 섹션 1 — 3사 경쟁 매트릭스 */}
      <div className="ai-sec">
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
          <div className="comp-footer">SKT: T-day/T week · KT: 달달혜택·고객보답 · LGU+: 투쁠데이·스페셜데이 기준 (2026년 5월)</div>
        </div>
      </div>

      {/* 섹션 2 — 비통신 비교 */}
      <div className="ai-sec">
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
      <div className="ai-sec">
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
            {(r.kt !== null || r.lgu !== null) && (
              <div className="rec-comp-row">
                {r.kt  !== null && <span className="rcomp-badge rcomp-kt">KT 🟢 현재 운영</span>}
                {r.lgu !== null && <span className="rcomp-badge rcomp-lgu">LGU+ 🟢 현재 운영</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
