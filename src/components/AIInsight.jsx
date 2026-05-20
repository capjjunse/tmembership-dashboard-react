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

const alCats = [
  {
    icon: '⛽', cat: '주유', v: 'warn',
    nb: ['네이버플러스 GS칼텍스 L당 100원 Npay 적립', '월 최대 5,000P · 전국 상시 (2026.04 신규)'],
    tm: null,
  },
  {
    icon: '🏪', cat: '편의점', v: 'neut',
    nb: ['네이버플러스 CU 5% 즉시할인 + 5% Npay 적립', '(일 1회, 각 5천원 한도) ~26.12.31'],
    tm: ['CU VIP·G 10% / S 5% 상시', '세븐일레븐 VIP·G 10% / S 5% 상시'],
  },
  {
    icon: '🎬', cat: '영화관', v: 'neut',
    nb: ['네이버플러스 롯데시네마 최대 5천원 + 콤보 3천원 · 월 4회 ~26.12.31'],
    tm: ['CGV VIP: 무료 연3회 · 1+1 연9회 · 특별관 12회', 'CGV 전 등급: 4천원 할인 상시', '롯데시네마: 2026.02 종료 (채널 분리)'],
  },
  {
    icon: '🛵', cat: '배달', v: 'warn',
    nb: ['네이버플러스 요기패스X 15,000원 이상 무료배달', '포장 5% 할인 · 상시'],
    tm: null,
  },
  {
    icon: '🚗', cat: '카셰어링', v: 'good',
    nb: ['네이버플러스 쏘카 50% (네이버예약 경유) ~26.06.30'],
    tm: ['SK렌터카 제주 최대 85% / 내륙 최대 60%', '전 등급 · 상시'],
  },
  {
    icon: '🍽', cat: '외식·카페', v: 'good',
    nb: ['[토스뱅크] 버거킹·투썸·메가커피 등 월 3브랜드 선택 10%', '네이버플러스 외식 상시 제휴 없음'],
    tm: ['T-day (월간): 버거킹 40%~55% · 공차 50% · 피자헛 50% 등', '상시: 아웃백·VIPS VIP·G 15% / 도미노·피자헛 VIP 30%', '상시: 메가커피 VIP 20% · G·S 10% / 공차·폴바셋 전 등급 10%'],
  },
];

const alVdIcon  = { warn: '⚠', good: '✅', neut: '↔' };
const alVdLabel = { warn: '비통신 앞섬', good: 'T멤버십 우위', neut: '유사 수준' };

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
                <span className={`alc-vd alc-vd-${c.v}`}>{alVdIcon[c.v]} {alVdLabel[c.v]}</span>
              </div>
              <div className="alc-body">
                <div className={`alc-col${c.v === 'warn' ? ' alc-col-hi-nb' : ''}`}>
                  <div className="alc-col-hdr alc-nb-hdr">비통신</div>
                  {c.nb ? c.nb.map((it, i) => <div key={i} className="alc-item">{it}</div>) : <span className="alc-none">—</span>}
                </div>
                <div className={`alc-col${c.v === 'good' ? ' alc-col-hi-tm' : ''}`}>
                  <div className="alc-col-hdr alc-tm-hdr">T멤버십</div>
                  {c.tm ? c.tm.map((it, i) => <div key={i} className="alc-item">{it}</div>) : <span className="alc-none">—</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="alc-footer">출처: 네이버플러스 멤버십 공식(nid.naver.com/membership/join) · T멤버십 공식(sktmembership.tworld.co.kr) 직접 확인</div>
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
