// no state needed — all sections always visible

const compRows = [
  {
    brand: '공차',
    skt: { lines: [{ grade: '전 등급', b: '50% 할인/적립' }], date: '5.13 · T day 1주차' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '최대 50% 할인 (1만원 이상, 최대 5천원)' }], date: '5.12 · 투쁠데이' },
    v: 'warn', note: 'LGU+ 하루 먼저 · 동일 혜택',
  },
  {
    brand: '피자헛',
    skt: { lines: [{ grade: '전 등급', b: '방문 포장 50% 할인/적립 (최대 22,500원)' }], date: '5.20 · T day 2주차' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '프리미엄피자 55% 할인 + 파스타 증정' }], date: '5.14 · 투쁠데이' },
    v: 'warn', note: 'LGU+ 1주 먼저 + 5%p 높음',
  },
  {
    brand: '배스킨라빈스',
    skt: { lines: [{ grade: '전 등급', b: '파인트 40% 할인/적립 (9,800원→5,880원)' }], date: '5.20 · T day 2주차' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '패밀리 사이즈 최대 9천원 할인' }], date: '5.20 · 투쁠데이+스페셜데이' },
    v: 'neut', note: '같은 날 동시 운영',
  },
  {
    brand: 'CGV',
    skt: { lines: [{ grade: '전 등급', b: '8,500원 예매+매점 쿠폰 2종' }], date: '5.4~5.8 · 0 week / 5.13 · T day 1주차 / 5.20 · T day 2주차' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '유플투쁠세트 (팝콘M+음료M) 무료' }], date: '5.20 · 투쁠데이' },
    v: 'good', note: 'SKT 3회 운영 vs LGU+ 1회',
  },
  {
    brand: '파리바게뜨',
    skt: { lines: [{ grade: '전 등급', b: '1,000원당 200원/P 할인/적립' }], date: '5.4~5.8 · 0 week' },
    kt: { lines: [{ grade: '달달혜택', b: '할인' }], date: '5.15~31 · 달달혜택' },
    lgu: { lines: [{ grade: '선착순', b: '최대 6천원 할인 (2만원 이상)' }], date: '5.19 · 스페셜데이' },
    v: 'neut', note: '기간 분산 · 성격 다름',
  },
  {
    brand: '컬리',
    skt: null,
    kt: { lines: [{ grade: '달달혜택', b: '할인' }], date: '5.15~31 · 달달혜택' },
    lgu: { lines: [{ grade: '선착순', b: '5천원 할인 (4만원 이상)' }], date: '5.19 · 스페셜데이' },
    v: 'miss', note: 'SKT 미운영',
  },
  {
    brand: '하프클럽',
    skt: { lines: [{ grade: '전 등급', b: '장바구니 20%+온리하프 35%' }], date: '5.4~5.8 · 0 week' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '30% 할인쿠폰+온리하프 35% 중복쿠폰 증정' }], date: '5.19 · 스페셜데이' },
    v: 'neut', note: '기간 분산 · 직접 경쟁 없음',
  },
];

// nb: 비통신 6개 카드(공식 홈페이지 확인 기준) / tm: T멤버십
// 포맷: "제휴처 (기한)" 한 줄 → "[등급] 혜택내용" 행 반복
const alCats = [
  // ── T멤버십 우위 ──
  {
    icon: '🚗', cat: '카셰어링·렌터카', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'SK렌터카', deadline: '상시', rows: [{ grade: '전 등급', desc: '제주 최대 85% 할인, 내륙 최대 60% 할인' }] },
    ]}],
    reasons: ['T멤버십: SK렌터카 제주 85%, 내륙 60% 전 등급 상시 운영', '비통신 6종: 렌터카·카셰어링 제휴 없음'],
  },
  {
    icon: '🍽', cat: '외식·카페', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'T-day', deadline: '월간', rows: [{ grade: null, desc: '버거킹 40~55%, 공차 50%, 피자헛 50% 등 다수 브랜드' }] },
      { partner: '아웃백, VIPS', deadline: '상시', rows: [{ grade: 'V, G', desc: '15% 할인' }] },
      { partner: '도미노, 피자헛', deadline: '상시', rows: [{ grade: 'V', desc: '30% 할인' }] },
      { partner: '공차, 폴바셋', deadline: '상시', rows: [{ grade: '전 등급', desc: '10% 할인' }] },
    ]}],
    reasons: ['T멤버십: 외식 브랜드 상시 10~30% + T-day 최대 50~55% 다수 운영', '비통신 6종: 외식 브랜드 직접 제휴 없음'],
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
    reasons: ['T멤버십: 롯데월드 종합이용권 본인 40%+동반 할인 상시 운영', '비통신 6종: 테마파크 제휴 없음'],
  },
  {
    icon: '🏪', cat: '편의점', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'CU', deadline: '상시', rows: [{ grade: 'V, G', desc: '10% 할인' }, { grade: 'S', desc: '5% 할인' }] },
      { partner: '세븐일레븐', deadline: '상시', rows: [{ grade: 'V, G', desc: '10% 할인' }, { grade: 'S', desc: '5% 할인' }] },
    ]}],
    reasons: ['T멤버십: CU·세븐일레븐 V·G 10% 상시 운영', '비통신 6종: 편의점 직접 제휴 없음'],
  },
  {
    icon: '🎬', cat: '영화관', v: 'good',
    nb: null,
    tm: [{ platform: 'T멤버십', items: [
      { partner: 'CGV', deadline: '상시', rows: [
        { grade: 'V', desc: '무료 연3회, 1+1 연9회, 특별관 12회' },
        { grade: '전 등급', desc: '4천원 할인' },
      ]},
    ]}],
    reasons: ['T멤버십: CGV V 무료·1+1·전 등급 4천원 상시 운영', '비통신 6종: 영화관 직접 제휴 없음'],
  },
  // ── T멤버십 열위 ──
  {
    icon: '🛵', cat: '배달', v: 'warn',
    nb: [
      { platform: '쿠팡 로켓와우 (월 7,890원)', items: [
        { partner: '쿠팡이츠', deadline: '상시', rows: [
          { grade: null, desc: '무제한 무료배달 (금액·거리 무관)' },
        ]},
      ]},
      { platform: '배민클럽 (월 3,990원)', items: [
        { partner: '배달의민족', deadline: '상시', rows: [
          { grade: null, desc: '알뜰배달 입점 가게 배달팁 무료' },
          { grade: null, desc: '1인분 소량 주문도 배달팁 0원' },
        ]},
      ]},
    ],
    tm: null,
    reasons: ['쿠팡이츠 무제한 + 배민 알뜰배달 무료 — 국내 배달 2강 모두 비통신이 커버', 'T멤버십: 배달 상시 제휴 없음 (T-day 월간 1~2회에 그침)'],
  },
  {
    icon: '🛍', cat: '이커머스', v: 'warn',
    nb: [
      { platform: '네이버플러스 (월 4,900원)', items: [
        { partner: '네이버쇼핑', deadline: '월 20만원까지', rows: [{ grade: null, desc: '최대 5% Npay 포인트 적립' }] },
      ]},
      { platform: '쿠팡 로켓와우 (월 7,890원)', items: [
        { partner: '쿠팡', deadline: '상시', rows: [
          { grade: null, desc: '로켓배송 무료 (금액·거리 무관)' },
          { grade: null, desc: '와우 전용 할인가 제공' },
        ]},
      ]},
    ],
    tm: [{ platform: 'T멤버십', items: [
      { partner: '11번가', deadline: '상시', rows: [{ grade: null, desc: '최대 11% 적립/할인' }] },
    ]}],
    reasons: ['쿠팡 로켓와우: 로켓배송 무료 + 와우 전용가 — 물류 기반 이커머스 압도', 'T멤버십: 11번가 최대 11% 적립 (SK그룹 플랫폼 한정)'],
  },
  {
    icon: '📺', cat: 'OTT·콘텐츠', v: 'warn',
    nb: [
      { platform: '네이버플러스 (월 4,900원)', items: [
        { partner: '넷플릭스·티빙 등 선택', deadline: '월정액 포함', rows: [{ grade: null, desc: '디지털 콘텐츠 이용권 1개 선택 제공' }] },
        { partner: '웹툰·시리즈', deadline: '월정액 포함', rows: [{ grade: null, desc: '쿠키 10개/월 무료' }] },
      ]},
      { platform: '쿠팡 로켓와우 (월 7,890원)', items: [
        { partner: '쿠팡플레이', deadline: '상시', rows: [{ grade: null, desc: 'OTT 무료 이용' }] },
      ]},
      { platform: '배민클럽', items: [
        { partner: '유튜브 프리미엄', deadline: '번들 옵션', rows: [{ grade: null, desc: '월 13,900원 번들 구독 가능' }] },
      ]},
    ],
    tm: null,
    reasons: ['비통신 3종: 넷플릭스·티빙·쿠팡플레이·유튜브 프리미엄 모두 커버', 'T멤버십: OTT 상시 제휴 없음'],
  },
  {
    icon: '👗', cat: '패션', v: 'warn',
    nb: [{ platform: '무신사 (무료 가입)', items: [
      { partner: '무신사', deadline: '상시', rows: [
        { grade: null, desc: '관심 브랜드 쿠폰 최대 40%' },
        { grade: null, desc: '관심 상품 쿠폰 최대 30%' },
        { grade: null, desc: '등급별 장바구니 쿠폰 월 1회 (최대 5%)' },
      ]},
    ]}],
    tm: null,
    reasons: ['무신사: 관심 브랜드·상품 맞춤 쿠폰 자동 발급 최대 40% — 패션 버티컬 압도', 'T멤버십: 패션 카테고리 상시 제휴 없음'],
  },
  {
    icon: '💄', cat: '뷰티·H&B', v: 'warn',
    nb: [{ platform: '올리브영 멤버스 (무료 가입)', items: [
      { partner: '올리브영', deadline: '상시', rows: [
        { grade: null, desc: '올리브 데이 등급별 쿠폰 (매월 25일)' },
        { grade: null, desc: 'CJ ONE 포인트 최대 1.0% 적립' },
        { grade: 'GOLD·BLACK', desc: '전용 라운지 + 무료 포장' },
      ]},
    ]}],
    tm: null,
    reasons: ['올리브영: H&B 1위 플랫폼 등급 쿠폰·적립 + 오프라인 라운지', 'T멤버십: 뷰티·H&B 카테고리 상시 제휴 없음'],
  },
  {
    icon: '✈️', cat: '프리미엄 라이프', v: 'warn',
    nb: [{ platform: '현대카드 MEMBERSHIP (카드 연계형)', items: [
      { partner: '공항 라운지 (KAL 포함)', deadline: '상시', rows: [{ grade: null, desc: '무료 이용' }] },
      { partner: '특급 호텔', deadline: '상시', rows: [{ grade: null, desc: '할인 및 무료 조식' }] },
      { partner: '골프장', deadline: '상시', rows: [{ grade: null, desc: '그린피 할인' }] },
    ]}],
    tm: null,
    reasons: ['현대카드: 공항 라운지·특급 호텔·골프 실물 혜택 — 프리미엄 오프라인 커버', 'T멤버십: 프리미엄 라이프 카테고리 직접 제휴 없음'],
  },
  // ── 유사 수준 ──
  {
    icon: '🏬', cat: '마트·신선', v: 'neut',
    nb: [{ platform: '쿠팡 로켓와우 (월 7,890원)', items: [
      { partner: '로켓프레시', deadline: '상시', rows: [{ grade: null, desc: '당일·새벽배송 무료' }] },
    ]}],
    tm: [{ platform: 'T멤버십', items: [
      { partner: '이마트', deadline: '상시', rows: [
        { grade: 'V', desc: '짝수월 7%, 홀수월 3% 적립' },
        { grade: 'G, S', desc: '3% 적립' },
      ]},
    ]}],
    reasons: ['쿠팡 로켓프레시: 당일·새벽 무료배송 — 온라인 신선식품 우위', 'T멤버십: 이마트 오프라인 3~7% 적립 — 오프라인 구매 우위'],
  },
];

const alVdLabel = { warn: 'T멤버십 열위', good: 'T멤버십 우위', neut: '유사 수준' };

const recs = [
  {
    rank: 1,
    brand: '이디야커피',
    tag: '전국 3,500개+ · 3사 모두 미운영',
    reason: '저가 커피 시장 매장 수 1위급. 메가커피·컴포즈·빽다방 대비 30~40대 직장인 이용 비중 높아 통신사 주 고객층과 일치. 3사 모두 미제휴 상태로 단독 입점 효과 기대.',
    trend: '2026 상반기 가맹점 매출 성장세, 도심 역세권 출점 지속',
    status: 'SKT · KT · LGU+ 모두 미운영',
    hot: true,
  },
  {
    rank: 2,
    brand: '다이소',
    tag: 'LGU+ 1회성 외 미운영',
    reason: '가성비 소비 트렌드의 핵심. 전국 1,600개+ 매장, 주 1회 이상 방문층 두텁고 MZ-중장년 모두 이용. LGU+가 투쁠데이 1회 운영에 그쳐 선점 여지 있음.',
    trend: '연매출 4조 돌파, 2026 외국인 관광객 필수 코스 선정',
    status: 'SKT · KT 미운영 / LGU+ 투쁠데이 1회만',
    hot: true,
  },
  {
    rank: 3,
    brand: '무신사',
    tag: '패션 버티컬 1위 · 3사 모두 미운영',
    reason: '패션 버티컬 앱 MAU 1,500만 이상, MZ 필수 앱 지위. 3사 모두 패션 카테고리 공백. 포인트 적립 제휴 구조로 도입 시 MZ 고객 이탈 방어 효과 기대.',
    trend: '2026 상반기 글로벌 진출 + 입점 브랜드 7,000개↑',
    status: 'SKT · KT · LGU+ 모두 미운영',
    hot: false,
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
        <span className="upd-badge upd-1m">↻ 월 갱신</span>
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
              {compRows.map((r) => (
                <tr key={r.brand} className="comp-tr">
                  <td className="comp-td comp-brand">{r.brand}</td>
                  <td className="comp-td">{renderCarrier(r.skt, 'cb-skt')}</td>
                  <td className="comp-td">
                    {r.kt
                      ? renderCarrier(r.kt, 'cb-kt')
                      : <span className="comp-none comp-unk">미확인 *</span>}
                  </td>
                  <td className="comp-td">{renderCarrier(r.lgu, 'cb-lgu')}</td>
                  <td className="comp-td comp-vd-td">
                    <span className={`comp-vd-badge cvb-${r.v}`}>{verdictIcon[r.v]} {verdictLabel[r.v]}</span>
                    <div className="cvd-note">{r.note}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="comp-footer">* KT 공식 사이트 접근 차단 — 달달초이스 상세 미확인</div>
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
            <div className="rec-meta">
              <span className="rec-trend-lbl">트렌드</span> {r.trend}
            </div>
            <div className="rec-status">{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
