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
          {/* ⛔ SKT 상시·VIP 카드 — GS25 "프레시 푸드"·스타벅스 "사이즈업"을 절대 변경 항목으로 다시 넣지 말 것 (2026.09.28, 반복 위반). RegularBenefits.jsx의 해당 행 인라인 주석·update_rules.txt 규칙 13 참고 — 둘 다 동의어일 뿐 실제 변경 아님 */}
          <a href="#rg" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>아웃백 할인 한도 하향 (VIP/Gold 월 4회·최대 2만원)</div>
          </a>
          <a href="#mo" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-on">오픈</em><span className="upd">Week 혜택 (10.5~10.9) 공개 — 15종 식음·뷰티·레저</span></div>
          </a>
          <a href="#hs" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-new">신규</em><span className="upd">SK나이츠 신규 제휴 예정 (10.19)</span></div>
            <div className="ovg2-item"><em className="tg tg-end">종료</em>루덴시아 제휴 종료 (9.30)</div>
          </a>
          <a href="#sn" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-pos">긍정</em>긍정 69%·부정 31%</div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>VIP PICK 활용도 부족 — T우주 구독 대체 반응 (9.25)</div>
          </a>

          <div className="ovg2-lbl"><span className="cb bk">KT</span></div>
          {/* ⛔ KT VIP 카드 — 스타벅스 "사이즈업으로 변경" 절대 다시 넣지 말 것 (2026.09.28, 반복 위반). RegularBenefits.jsx 스타벅스 행 인라인 주석·update_rules.txt 규칙 13 참고 — "월 1회" 표기 그대로면 변경 아님 */}
          <a href="#vp" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-new">VIP신규</em>지니TV VOD 1만원 이용권 신설 (VVIP·VIP초이스, 9월~)</div>
            <div className="ovg2-item"><em className="tg tg-chg">VIP변경</em>VVIP초이스 도미노 2만원 할인 (3만원↑ 포장주문)</div>
          </a>
          <a href="#mo" className="ovg2-card ck">
            <div className="ovg2-item"><span className="upd">달달혜택 10월 미공개 — 15일경 공개 예정</span></div>
          </a>
          <a href="#hs" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>신세계면세점 온라인 혜택 명칭 변경 (10.1~)</div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>롯데면세점 VVIP/VIP→GOLD 등급 적용 (10.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>달달혜택 "kt요즘 돈이 궁항? 너프라 좀 그럼" (9.23)</div>
            <div className="ovg2-item"><em className="tg tg-pos">긍정</em>달달혜택 롯데슈퍼·마트 "가족 4명 다 kt 4계정 받아서" (9.28)</div>
          </a>

          <div className="ovg2-lbl"><span className="cb bl">LGU+</span></div>
          <a href="#vp" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">신규</em>롯데월드 아쿠아리움·아이스링크 할인 추가</div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>CGV 2D영화 최대 5,000원 할인</div>
            <div className="ovg2-item"><em className="tg tg-chg">VIP변경</em>유독 4천원 할인 (최소 구매 금액 없음)</div>
          </a>
          <a href="#mo" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-on">오픈</em><span className="upd">투쁠 1~8차 (10.13~27) 공개 — 39종 식음·생활·레저</span></div>
            <div className="ovg2-item"><em className="tg tg-on">오픈</em><span className="upd">컬쳐데이 (10.19~23) — NOL티켓·빛의벙커·시어터</span></div>
          </a>
          <a href="#hs" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">신규</em>도그마루 신규 제휴 예정 (10.14)</div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em>신세계면세점 온라인 혜택 축소 예정 (10.1~)</div>
          </a>
          <a href="#sn" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-pos">긍정</em>긍정 60%·부정 30%·중립 10%</div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>유플투쁠 완무꿀통 "이것도 이제 끝이구나" 알뜰폰 이탈 신호 (9.29)</div>
          </a>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🤖 AI가 픽한 이달의 핵심</div>
          <div className="ovki-grid">
            <a href="#ai-matrix" className="ovki ovki-mix">
              <div className="ovki-cat">📊 3사 경쟁 매트릭스</div>
              <div className="ovki-title">SKT↔LGU+ 13종 비교 · 노브랜드·아워홈몰·CGV 우위</div>
              <ul className="ovki-list">
                <li>T day·Young week × 투쁠 13종 비교 — 3종 우위 · 피자헛 열위</li>
                <li>KT 달달혜택 — SKT·KT·LGU+ 겹침 없음</li>
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
