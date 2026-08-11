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
    const title = `${notableS.slice(0, 2).map(s => s.brand).join(' · ')} 모니터링 중`;

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
  const title = topRecs.length > 0 ? `${topRecs.slice(0, 2).map(r => r.brand).join(' · ')} 신규 추천` : '현재 주목 이슈 없음';

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
          <a href="#vp" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-chg">VIP변경</em>T우주패스 4,900원+5,000원 분리 (8.1~)</div>
          </a>
          <a href="#mo" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-new">오픈</em>T day Day2 오픈 (8.12, 4종)</div>
          </a>
          <a href="#hs" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-new">신규</em>샐러디 신규 제휴 (8.3~)</div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>T우주패스 VIP PICK 분리 (8.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-mix">혼재</em><span className="upd">긍정 46%·부정 46%·중립 8%</span></div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>VIP픽 혜택 소진 후 표준 요금제 이탈 반응</div>
          </a>

          <div className="ovg2-lbl"><span className="cb bk">KT</span></div>
          <a href="#vp" className="ovg2-card ck">
            <div className="ovg2-item">특이 변동 없음</div>
          </a>
          <a href="#mo" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-new">오픈</em>달달혜택 1차 오픈 (8.3~8.17, 3종 택1)</div>
            <div className="ovg2-item"><em className="tg tg-on">진행중</em>시즌혜택 5종 진행중 (8.3~8.31)</div>
          </a>
          <a href="#hs" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-new">신규</em>패스트캠퍼스 신규 제휴 (8.1~)</div>
            <div className="ovg2-item"><em className="tg tg-new">신규</em>포케올데이 신규 제휴 (8.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>달달 8월 1차 '달달하긴 무슨 개뿔·처참하네요' 불만</div>
            <div className="ovg2-item"><em className="tg tg-mix">혼재</em>KT멤버십페스타 쇼핑라운지 개악 불만·GS주유 긍정 혼재</div>
          </a>

          <div className="ovg2-lbl"><span className="cb bl">LGU+</span></div>
          <a href="#rg" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">신규</em>롯데월드 아쿠아리움·아이스링크 할인 추가</div>
            <div className="ovg2-item"><em className="tg tg-chg">VIP변경</em>VIP콕 분기별 택1 구조 추가</div>
          </a>
          <a href="#mo" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">오픈</em>유플투쁠 1차 오픈 (8.11~8.13, 12종)</div>
            <div className="ovg2-item"><em className="tg tg-new">오픈</em>유플투쁠 2차 오픈 (8.17~8.21, 27종)</div>
          </a>
          <a href="#hs" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>파고다토쿨 혜택 변경 (8.1~)</div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>파고다원 혜택 변경 (8.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>부정 67%·긍정 33%</div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>투쁠 "혜택 줄어" 감소 불만</div>
          </a>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🤖 AI가 픽한 이달의 핵심</div>
          <div className="ovki-grid">
            <a href="#ai-matrix" className="ovki ovki-mix">
              <div className="ovki-cat">📊 3사 경쟁 매트릭스</div>
              <div className="ovki-title"><span className="upd">CGV 우위 · 캐리비안베이·백억커피 열위</span></div>
              <ul className="ovki-list">
                <li>캐리비안베이: KT 동반1인 포함 50% vs SKT 종일권+자켓 — KT 우위</li>
                <li>CGV: SKT 8,500원+쿠폰2종 vs LGU+ 콘세션무료 — SKT 우위</li>
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
