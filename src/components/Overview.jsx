import { trendSignals } from '../data/radarData';
import { recs } from './AIInsight';

// 긴급·주목 신호를 분류해 카드 내용을 동적으로 결정
// ⛔ 마켓 시그널(category_news.json)은 이 카드에 절대 포함하지 않는다 — 제휴사 이슈 레이더 · 신규 제휴 추천만 소스로 사용
function IssueRadarCard() {
  // 제휴사 레이더: strong + neg = 긴급 대응
  const urgentS = trendSignals.filter(s => s.strength === 'strong' && s.direction === 'neg');
  const notableS = trendSignals.filter(s => s.strength === 'mid' && s.direction === 'neg');

  const isUrgent = urgentS.length > 0;

  if (isUrgent) {
    const titleBrands = urgentS.map(s => s.brand).slice(0, 2).join(' · ');

    const MAX_URGENT_BLOCKS = 3;
    const visibleBlocks = urgentS.slice(0, MAX_URGENT_BLOCKS);
    const hiddenCount = urgentS.length - visibleBlocks.length;

    return (
      <a href="#ai-radar" className="ovki ovki-urgent">
        <div className="ovki-cat">🚨 긴급 대응 필요</div>
        <div className="ovki-title">{titleBrands} — 즉각 검토 필요</div>
        {visibleBlocks.map((s, i) => (
          <div key={i} className="ovki-urgent-blk">
            <div className="ovki-urgent-hdr">
              <span className="ovki-urgent-brand">{s.brand}</span>
              <span className="ovki-ubadge ovki-ubadge-neg">강 · 부정</span>
              {s.telcos.length > 0 && (
                <span className="ovki-ubadge ovki-ubadge-telco">
                  {s.telcos.map(t => t.label).join('·')} 제휴 중
                </span>
              )}
            </div>
            <div className="ovki-urgent-hl">{s.headline[0]}</div>
          </div>
        ))}
        {hiddenCount > 0 && <div className="ovki-urgent-more">+{hiddenCount}건 더 있음</div>}
        <div className="ovki-go">이슈 레이더 보기 →</div>
      </a>
    );
  }

  // 긴급 없음 — 주목(mid+neg) 있으면 레이더, 없으면 신규 제휴 추천으로 대체
  if (notableS.length > 0) {
    const items = notableS
      .map(s => `${s.brand} — ${s.headline[0].length > 40 ? s.headline[0].slice(0, 40) + '…' : s.headline[0]}`)
      .slice(0, 3);
    const title = `${notableS.slice(0, 3).map(s => s.brand).join(' · ')} 모니터링 중`;

    return (
      <a href="#ai-radar" className="ovki ovki-radar">
        <div className="ovki-cat">🔍 이슈 레이더</div>
        <div className="ovki-title">{title}</div>
        <ul className="ovki-list">
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div className="ovki-go">이슈 레이더 보기 →</div>
      </a>
    );
  }

  // 이슈 레이더에 주목할 항목 없음 — 신규 제휴 추천 상위 항목으로 대체
  const topRecs = recs.slice(0, 3);
  const title = topRecs.length > 0 ? `${topRecs.slice(0, 3).map(r => r.brand).join(' · ')} 신규 추천` : '현재 주목 이슈 없음';

  return (
    <a href="#ai-recommend" className="ovki ovki-radar">
      <div className="ovki-cat">🆕 신규 제휴 추천</div>
      <div className="ovki-title">{title}</div>
      <ul className="ovki-list">
        {topRecs.length > 0
          ? topRecs.map((r, i) => <li key={i}>{r.brand} — {r.tag}</li>)
          : <li>이번 주 주목 이슈 없음 · 정기 모니터링 유지</li>
        }
      </ul>
      <div className="ovki-go">신규 제휴 추천 보기 →</div>
    </a>
  );
}

export default function Overview() {
  return (
    <div className="sec" id="ov">
      <div className="sh">
        <span className="st">📊 이달의 핵심 동향</span>

      </div>
      <div className="ovg">

        <div className="ovg2">
          <div></div>
          <div className="ovg2-hdr">상시 · VIP</div>
          <div className="ovg2-hdr">월별혜택</div>
          <div className="ovg2-hdr">변경이력</div>
          <div className="ovg2-hdr">고객반응</div>

          <div className="ovg2-lbl"><span className="cb bs">SKT</span></div>
          <a href="#rg" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>아웃백 할인 한도 하향 (VIP/Gold 월 4회·최대 2만원)</div>
          </a>
          <a href="#mo" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-on">오픈</em><span className="upd">Week 혜택 오픈 (9.7~9.11, VIPS·에버랜드 등 20종)</span></div>
            <div className="ovg2-item"><em className="tg tg-on">오픈</em>Young week 오픈 (9.7~9.11, 백억커피·할리스 등 11종)</div>
          </a>
          <a href="#hs" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em><span className="upd">SK렌터카·빌리카·롯데렌터카 제주 할인율 85%→60% (9.16~)</span></div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>아웃백 할인 횟수·한도 조정 (9.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-pos">긍정</em><span className="upd">긍정 58%·부정 32%·중립 10%</span></div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>T day "던킨·공차 VIP만 주네 — 알뜰폰 갈게요" 불만 (9.2)</div>
          </a>

          <div className="ovg2-lbl"><span className="cb bk">KT</span></div>
          <a href="#rg" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>롯데월드 혜택 개편 (본인 40%·동반 3인 30% 할인)</div>
            <div className="ovg2-item"><em className="tg tg-chg">VIP변경</em>VVIP초이스 도미노 2만원 할인 (3만원↑ 포장주문)</div>
          </a>
          <a href="#mo" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-on">진행중</em><span className="upd">달달혜택 (9.1~9.30, 쇼핑라운지·롯데마트·bhc·버거킹 4종)</span></div>
            <div className="ovg2-item"><em className="tg tg-on">진행중</em><span className="upd">문화혜택 (9.1~, 뮤지컬 2종·전시 2종 최대 50%)</span></div>
          </a>
          <a href="#hs" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>도미노피자 변경 예정 (9.1~)</div>
            <div className="ovg2-item"><em className="tg tg-new">신규</em>지니TV 신규 제휴 예정 (9.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>달달 롯데마트 5천원 "어느새 끝나더라고" 선착순 소진 아쉬움 (9.1)</div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>쇼핑라운지 3만원 조건·"쓸만한 게 없다" 불만 반복</div>
          </a>

          <div className="ovg2-lbl"><span className="cb bl">LGU+</span></div>
          <a href="#rg" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">신규</em>롯데월드 아쿠아리움·아이스링크 할인 추가</div>
          </a>
          <a href="#mo" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-on">오픈</em>유플투쁠 8차 전체 공개 (9.8~9.22, 40+브랜드)</div>
            <div className="ovg2-item"><em className="tg tg-on">오픈</em>컬쳐데이 (9.14~9.18) · 유쓰·장기고객데이 (9.20·9.24)</div>
          </a>
          <a href="#hs" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">신규</em>9월 신규 6개 예정 (9.1~, 달콤커피·달콤.N 포함)</div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>파고다토쿨 혜택 변경 (8.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>부정 100%</div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>9월 유플투쁠 "혜택이 점점..." 실망 반응 (9.1)</div>
          </a>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🤖 AI가 픽한 이달의 핵심</div>
          <div className="ovki-grid">
            <a href="#ai-matrix" className="ovki ovki-mix">
              <div className="ovki-cat">📊 3사 경쟁 매트릭스</div>
              <div className="ovki-title"><span className="upd">KT 달달 공개 · SKT↔LGU+ 5종 비교</span></div>
              <ul className="ovki-list">
                <li>T day·Young week × 투쁠 5종 비교 — 노브랜드 SKT 우위</li>
                <li><span className="upd">KT 달달혜택 공개 — SKT·KT·LGU+ 겹침 없음</span></li>
              </ul>
              <div className="ovki-go">경쟁 매트릭스 보기 →</div>
            </a>
            <IssueRadarCard />
          </div>
        </div>

      </div>
    </div>
  );
}
