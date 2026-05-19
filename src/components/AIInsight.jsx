import { useState } from 'react';

const compRows = [
  {
    brand: '공차',
    skt: { lines: [{ grade: '전 등급', b: '50% 할인' }], date: '5.13 · T day 1주차' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '50% 할인' }], date: '5.12 · 투쁠데이' },
    v: 'warn', note: 'LGU+ 하루 먼저 · 동일 혜택',
  },
  {
    brand: '피자헛',
    skt: { lines: [{ grade: '전 등급', b: '방문포장 50% 할인' }], date: '5.20 · T day 2주차' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '55% 할인' }], date: '5.14 · 투쁠데이' },
    v: 'warn', note: 'LGU+ 1주 먼저 + 5%p 높음',
  },
  {
    brand: '배스킨라빈스',
    skt: { lines: [{ grade: '전 등급', b: '파인트 40% 할인' }], date: '5.20 · T day 2주차' },
    kt: null,
    lgu: {
      lines: [
        { grade: '선착순', b: '패밀리 사이즈 최대 9천원 할인' },
        { grade: '전 등급', b: '스페셜데이 할인' },
      ],
      date: '5.20 · 투쁠+스페셜데이',
    },
    v: 'neut', note: '같은 날 동시 운영',
  },
  {
    brand: 'CGV',
    skt: { lines: [{ grade: '전 등급', b: '8,500원 예매+매점 쿠폰' }], date: '0week · 1주차 · 2주차 (3회)' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '유플투쁠세트 (팝콘M+음료M) 무료' }], date: '5.20 · 투쁠데이 (1회)' },
    v: 'good', note: 'SKT 3회 운영 vs LGU+ 1회',
  },
  {
    brand: '파리바게뜨',
    skt: { lines: [{ grade: '전 등급', b: '200원/P 적립' }], date: '5.4~5.8 · 0 week' },
    kt: { lines: [{ grade: '달달혜택', b: '할인' }], date: '5.15~31 · 달달혜택' },
    lgu: { lines: [{ grade: '선착순', b: '최대 6천원 할인 (2만원↑)' }], date: '5.19 · 스페셜데이' },
    v: 'neut', note: '기간 분산 · 성격 다름',
  },
  {
    brand: '컬리',
    skt: null,
    kt: { lines: [{ grade: '달달혜택', b: '할인' }], date: '5.15~31 · 달달혜택' },
    lgu: { lines: [{ grade: '전 등급', b: '할인' }], date: '5.19 · 스페셜데이' },
    v: 'miss', note: 'SKT 미운영',
  },
  {
    brand: '하프클럽',
    skt: { lines: [{ grade: '전 등급', b: '장바구니 20%+온리하프 35%' }], date: '5.4~5.8 · 0 week' },
    kt: null,
    lgu: { lines: [{ grade: '선착순', b: '30%+온리하프 35% (4만원↑)' }], date: '5.19 · 스페셜데이' },
    v: 'neut', note: '기간 분산 · 직접 경쟁 없음',
  },
];

const alerts = [
  {
    level: 'warn',
    platform: '네이버플러스',
    title: '편의점 — 네이버플러스 GS25 최대 20% 상시, 통신 3사 없음',
    them: 'GS25 즉시할인 10% + 네이버페이 10% 적립 상시 · CU 최대 10% 상시',
    us: '통신 3사 T-day · 월간 혜택에 GS25 · CU 포함 없음',
    verdict: '일상 최접점 편의점에서 비통신에 지속 밀림 — 편의점 제휴 검토 필요',
  },
  {
    level: 'warn',
    platform: '네이버플러스',
    title: '영화관 — 롯데시네마 40% 상시, SKT 종료 후 공백 점령',
    them: '롯데시네마 2D 최대 40% 할인 + 무료콤보 상시',
    us: 'SKT 2026.02 롯데시네마 종료. CGV · 메가박스만 운영 중',
    verdict: '롯데시네마 이용층 이탈 채널로 네이버플러스 활용 중',
  },
  {
    level: 'ok',
    platform: '토스뱅크',
    title: '버거킹 · 투썸 · 메가커피 — 토스 10% vs T-day 40~55%',
    them: '월 3개 브랜드 선택 10% 캐시백 (버거킹 · 투썸 · 메가커피 포함)',
    us: 'SKT T-day 버거킹 와퍼 40% / VIP 55% — 규모 차이로 차별화 유효',
    verdict: '큰 폭 단발 할인은 여전히 통신사 강점 — 현행 유지',
  },
  {
    level: 'watch',
    platform: '네이버플러스',
    title: '배달 — 요기요 배달비 무료 상시, 통신사 상시 혜택 없음',
    them: '요기패스X 연계 배달비 무료 (15,000원↑ 상시)',
    us: 'KT 달달혜택 배민×노랑통닭 일시 운영에 그침 · 상시 배달 혜택 없음',
    verdict: '배달 카테고리 상시 혜택 공백 지속 — 추가 검토 요',
  },
];

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
  const [tab, setTab] = useState('comp');

  return (
    <div className="sec" id="ai">
      <div className="sh">
        <span className="st">🤖 AI 인사이트</span>
        <span className="ss">2026년 5월 기준</span>
        <span className="upd-badge upd-1m">↻ 월 갱신</span>
      </div>

      <div className="ai-tabs">
        <button className={`aitab${tab === 'comp' ? ' at-on' : ''}`} onClick={() => setTab('comp')}>3사 경쟁 매트릭스</button>
        <button className={`aitab${tab === 'alert' ? ' at-on' : ''}`} onClick={() => setTab('alert')}>비통신 알람</button>
        <button className={`aitab${tab === 'rec' ? ' at-on' : ''}`} onClick={() => setTab('rec')}>신규 제휴 추천</button>
      </div>

      {tab === 'comp' && (
        <div>
          <div className="ai-sub">이번달 월간 혜택에서 겹치는 브랜드 비교 — <strong>SKT 경쟁 포지션 판정</strong></div>
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
      )}

      {tab === 'alert' && (
        <div>
          <div className="ai-sub">네이버플러스 · 토스뱅크와 겹치는 영역 — <strong>통신사 차별화 현황</strong></div>
          {alerts.map((a, i) => (
            <div key={i} className={`alert-card ac-${a.level}`}>
              <div className="alert-top">
                <span className={`alert-platform-badge apb-${a.level}`}>{a.platform}</span>
                {a.level === 'warn' && <span className="alert-lvl-badge alb-warn">⚠ 주의</span>}
                {a.level === 'ok' && <span className="alert-lvl-badge alb-ok">✅ 강점</span>}
                {a.level === 'watch' && <span className="alert-lvl-badge alb-watch">👀 모니터링</span>}
              </div>
              <div className="alert-title">{a.title}</div>
              <div className="alert-rows">
                <div className="alert-row"><span className="alert-lbl">비통신</span><span className="alert-val">{a.them}</span></div>
                <div className="alert-row"><span className="alert-lbl">통신사</span><span className="alert-val">{a.us}</span></div>
              </div>
              <div className={`alert-verdict av-${a.level}`}>{a.verdict}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'rec' && (
        <div>
          <div className="ai-sub">뜨는 브랜드 × 3사 미운영 교차 분석 — <strong>제휴 추천 Top 3</strong></div>
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
      )}
    </div>
  );
}
