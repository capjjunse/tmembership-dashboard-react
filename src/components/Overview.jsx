import { trendSignals } from '../data/radarData';
import cnData from '../../category_news.json';

// 긴급·주목 신호를 분류해 카드 내용을 동적으로 결정
function IssueRadarCard() {
  const topics = cnData.topic_groups || [];
  const radarBrands = trendSignals.map(s => s.brand);

  // 제휴사 레이더: strong + neg = 긴급 대응
  const urgentS = trendSignals.filter(s => s.strength === 'strong' && s.direction === 'neg');
  const notableS = trendSignals.filter(s => s.strength === 'mid' && s.direction === 'neg');

  // 마켓 시그널: signal_strength=3이면서 레이더에 없는 브랜드만 (중복 제거)
  const urgentM = topics.filter(
    g => g.signal_strength === 3 && !radarBrands.some(b => g.topic.includes(b))
  );
  const notableM = topics.filter(
    g => g.signal_strength === 2 && ['risk', 'battle'].includes(g.category) &&
    !radarBrands.some(b => g.topic.includes(b))
  ).slice(0, 2);

  const isUrgent = urgentS.length > 0 || urgentM.length > 0;

  if (isUrgent) {
    const titleBrands = [
      ...urgentS.map(s => s.brand),
      ...urgentM.map(m => m.topic.split(' ').slice(0, 2).join(' ')),
    ].slice(0, 2).join(' · ');
    // 제휴사 이슈가 있으면 레이더, 마켓 시그널만 긴급이면 마켓으로
    const href = urgentS.length > 0 ? '#ai-radar' : '#ai-market';
    const goText = urgentS.length > 0 ? '이슈 레이더 보기 →' : '마켓 시그널 보기 →';

    return (
      <a href={href} className="ovki ovki-urgent">
        <div className="ovki-cat">🚨 긴급 대응 필요</div>
        <div className="ovki-title">{titleBrands} — 즉각 검토 필요</div>
        {urgentS.map((s, i) => (
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
        {urgentM.map((m, i) => (
          <div key={i} className="ovki-urgent-blk">
            <div className="ovki-urgent-hdr">
              <span className="ovki-urgent-brand">{m.topic}</span>
              <span className="ovki-ubadge ovki-ubadge-neg">마켓 긴급</span>
            </div>
            <div className="ovki-urgent-hl">
              {m.insight.length > 55 ? m.insight.slice(0, 55) + '…' : m.insight}
            </div>
          </div>
        ))}
        <div className="ovki-go">{goText}</div>
      </a>
    );
  }

  // 긴급 없음 — 주목(mid+neg) + 마켓 notable 요약
  const items = [
    ...notableS.map(s => `${s.brand} — ${s.headline[0].length > 40 ? s.headline[0].slice(0, 40) + '…' : s.headline[0]}`),
    ...notableM.map(m => `${m.topic} — ${m.insight.length > 38 ? m.insight.slice(0, 38) + '…' : m.insight}`),
  ].slice(0, 3);

  const titleParts = [
    ...notableS.slice(0, 2).map(s => s.brand),
    ...(notableS.length === 0 ? notableM.slice(0, 1).map(m => m.topic.split(' ').slice(0, 2).join(' ')) : []),
  ];
  const title = titleParts.length > 0 ? `${titleParts.join(' · ')} 모니터링 중` : '현재 주목 이슈 없음';
  // 제휴사 주목 이슈 있으면 레이더, 마켓 시그널만 있으면 마켓으로
  const href = notableS.length > 0 ? '#ai-radar' : (notableM.length > 0 ? '#ai-market' : '#ai-radar');
  const goText = notableS.length > 0 ? '이슈 레이더 보기 →' : (notableM.length > 0 ? '마켓 시그널 보기 →' : '이슈 레이더 보기 →');

  return (
    <a href={href} className="ovki ovki-radar">
      <div className="ovki-cat">🔍 이슈 레이더 · 마켓 시그널</div>
      <div className="ovki-title">{title}</div>
      <ul className="ovki-list">
        {items.length > 0
          ? items.map((item, i) => <li key={i}>{item}</li>)
          : <li>이번 주 주목 이슈 없음 · 정기 모니터링 유지</li>
        }
      </ul>
      <div className="ovki-go">{goText}</div>
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
            <div className="ovg2-item">VIP Pick 현행 유지 — T우주패스 연3회 운영 중</div>
            <div className="ovg2-item">신규 3개 — 오붓·플래시백·해커스 (7.1~)</div>
          </a>
          <a href="#mo" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-on">진행중</em>T day 1주차(7.1) 아웃백·더벤티·피자헛</div>
            <div className="ovg2-item"><em className="tg tg-new">오픈</em>Young week(7.6~) 뚜레쥬르·투썸·GS25 등 7종</div>
          </a>
          <a href="#hs" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-end">종료</em>원마운트 워터파크 6.25 제휴 종료</div>
            <div className="ovg2-item"><em className="tg tg-new">신규</em><span className="upd">오붓·플래시백·해커스 신규 제휴 (7.1~)</span></div>
          </a>
          <a href="#sn" className="ovg2-card cs">
            <div className="ovg2-item"><em className="tg tg-neg">부정</em><span className="upd">전반 부정 53% · 긍정 35% — 부정 우세</span></div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em><span className="upd">T day 7/1 "뭐가 없네" 불만 다수</span></div>
          </a>

          <div className="ovg2-lbl"><span className="cb bk">KT</span></div>
          <a href="#rg" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-chg">VIP변경</em>CGV 동반할인 3인 → 4인으로 확대</div>
            <div className="ovg2-item"><em className="tg tg-new">VIP신규</em><span className="upd">VVIP 신규 생일 꾸까·스벅케이크·롯시 택1 (VIP 미제공)</span></div>
          </a>
          <a href="#mo" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-on">미발표</em>7월 달달혜택 미발표 — 15일경 공개 예정</div>
          </a>
          <a href="#hs" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-chg">변경</em><span className="upd">오토오아시스 부가정비 4종 추가 (7.1~)</span></div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em><span className="upd">MOVV 인천공항이동 편도 추가 (7.1~)</span></div>
          </a>
          <a href="#sn" className="ovg2-card ck">
            <div className="ovg2-item"><em className="tg tg-neg">부정</em>올리브영 쿠폰 만료 항의</div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em><span className="upd">7월 보답 1차 '쇼핑라운지 너프' 강한 불만</span></div>
          </a>

          <div className="ovg2-lbl"><span className="cb bl">LGU+</span></div>
          <a href="#rg" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">상시신규</em>7월 신규 8개 — 프린트베이커리 등 (7.1~)</div>
            <div className="ovg2-item"><em className="tg tg-new">VIP신규</em><span className="upd">VIP콕 유독 4,000원 할인 (7.1~)</span></div>
          </a>
          <a href="#mo" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-on">진행중</em><span className="upd">투쁠데이 7.7~7.21 공개 — 공차·피자헛·CGV 등</span></div>
            <div className="ovg2-item"><em className="tg tg-on">진행중</em><span className="upd">유플투쁠_컬처 7.13~17 · 장기고객데이 7.23</span></div>
          </a>
          <a href="#hs" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-new">신규</em><span className="upd">7월 신규 8개 — 프린트베이커리 등 (7.1~)</span></div>
            <div className="ovg2-item"><em className="tg tg-chg">변경</em><span className="upd">포텔리어 구독권 무료 2주로 축소 (7.1 적용)</span></div>
          </a>
          <a href="#sn" className="ovg2-card cl">
            <div className="ovg2-item"><em className="tg tg-mix">혼재</em><span className="upd">유플투쁠 긍정·부정 50:50 혼재</span></div>
            <div className="ovg2-item"><em className="tg tg-neg">부정</em><span className="upd">7월 투쁠 "혜택 줄어" 감소 불만 (7.1)</span></div>
          </a>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🤖 AI가 픽한 이달의 핵심</div>
          <div className="ovki-grid">
            <a href="#ai-matrix" className="ovki ovki-mix">
              <div className="ovki-cat">📊 3사 경쟁 매트릭스</div>
              <div className="ovki-title"><span className="upd">KT 미공개 · SKT↔LGU+ 4종 비교 완료</span></div>
              <ul className="ovki-list">
                <li><span className="upd">SKT 투썸·오뚜기몰 우위 · 피자헛은 LGU+ 5%p 앞섬</span></li>
                <li><span className="upd">KT 달달혜택 미공개 — 공개 후 3사 비교 업데이트</span></li>
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
