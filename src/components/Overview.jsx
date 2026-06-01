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

    return (
      <a href="#ai" className="ovki ovki-urgent">
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
        <div className="ovki-go">이슈 레이더 보기 →</div>
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

  return (
    <a href="#ai" className="ovki ovki-radar">
      <div className="ovki-cat">🔍 이슈 레이더 · 마켓 시그널</div>
      <div className="ovki-title">{title}</div>
      <ul className="ovki-list">
        {items.length > 0
          ? items.map((item, i) => <li key={i}>{item}</li>)
          : <li>이번 주 주목 이슈 없음 · 정기 모니터링 유지</li>
        }
      </ul>
      <div className="ovki-go">이슈 레이더 보기 →</div>
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

        <div className="ovrow">
          <div className="oc cs">
            <div className="ol"><span className="cb bs">SKT</span></div>
            <div className="ov">매주 T day로 기습 고할인 — 타이밍 맞추면 최강 혜택</div>
            <div className="od">
              <span>후지필름 포토북 신규(6/15) · 농협맛선·도그메이트 6/30 종료 예정</span>
              <span>매드포갈릭 6/1 하향 · 청소연구소 에어컨 시즌할인(최대 1만원) 추가</span>
              <span>T우주패스 유튜브 프리미엄 라이트(월 7,900원) 출시 · VIP PICK 8월 개편 예고</span>
            </div>
            <div className="octabs">
              <a href="#hs" className="octab">변경이력</a>
              <a href="#vp" className="octab">VIP혜택</a>
              <a href="#sn" className="octab octab-warn">⚠ 고객반응</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">
                <div className="tt-top">후지필름 신규 제휴<span className="ovb ovb-new">6월 15일 신규</span></div>
                <div className="tt-sub">포토북 40% · 사진인화 20% · 액세서리 10% · 무료배송권</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">
                <div className="tt-top">농협맛선 · 도그메이트 제휴 종료<span className="ovb ovb-end">6월 30일 종료</span></div>
                <div className="tt-sub">종료 후 T멤버십 혜택에서 제외</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">
                <div className="tt-top">청소연구소 에어컨 시즌 할인 추가<span className="ovb ovb-chg">6월 1일 적용</span></div>
                <div className="tt-sub">에어컨 청소 7% 할인 · 최대 1만원 절약</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc ck">
            <div className="ol"><span className="cb bk">KT</span></div>
            <div className="ov">달마다 달달혜택 공개 + 깜짝 고객보답 — 이벤트 시즌에 혜택 밀도 최고조</div>
            <div className="od">
              <span>달달혜택 패밀리컬렉션(5.15~) + 고객보답 2차(5.18~31) 동시 운영</span>
              <span>3사 중 5월 혜택 밀도 최상 — 5월 31일 종료</span>
              <span>매드포갈릭 6월 1일부터 하향 — 기존 전 등급 20% → VVIP/VIP/골드 15% · 일반/화이트/실버 5%</span>
            </div>
            <div className="octabs">
              <a href="#mo" className="octab">월별혜택</a>
              <a href="#hs" className="octab">변경이력</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">매드포갈릭 할인율 하향<span className="ovb ovb-chg">6월 1일 예정</span></div>
                <div className="tt-sub">전 등급 20% → VVIP/VIP/골드 15% · 일반/화이트/실버 5%</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">달달혜택 패밀리컬렉션 신규<span className="ovb ovb-new">5월 15일 신규</span></div>
                <div className="tt-sub">달달초이스 국민학교떡볶이 포함 운영</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">고객보답 2차 이벤트<span className="ovb ovb-new">5월 18일 신규</span></div>
                <div className="tt-sub">투썸플레이스 50% 또는 배민 × 노랑통닭 8,000원</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc cl">
            <div className="ol"><span className="cb bl">LGU+</span></div>
            <div className="ov">제휴처 지속 확장 · 일상 할인 밀도 집중형</div>
            <div className="od">
              <span>6월 1일 신규 — 모던하우스 · 유니스터디 · 위피 · B1불스원카케어</span>
              <span>굿웨어몰 10% 할인 6월 30일 종료 예정</span>
              <span>밀크T 네이버페이 월 할인한도 3만원 → 2만원(5월 1일 적용)</span>
            </div>
            <div className="octabs">
              <a href="#hs" className="octab">변경이력</a>
              <a href="#rg" className="octab">상시혜택</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">신규 제휴 4개 추가<span className="ovb ovb-new">6월 1일 신규</span></div>
                <div className="tt-sub">모던하우스 · 유니스터디 · 위피 · B1불스원카케어</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">굿웨어몰 10% 할인 종료<span className="ovb ovb-end">6월 30일 종료</span></div>
                <div className="tt-sub">종료 후 LGU+ 멤버십 할인 혜택에서 제외</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">밀크T 네이버페이 한도 축소<span className="ovb ovb-chg">5월 1일 적용</span></div>
                <div className="tt-sub">월 최대 할인 3만원 → 2만원으로 변경</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🔑 이번달 놓치면 안될 것</div>
          <div className="ovki-grid">
            <a href="#sn" className="ovki ovki-trend">
              <div className="ovki-cat">✅ 고객반응</div>
              <div className="ovki-title">SKT·KT 전반 긍정 우세 · 5월 들어 신규 부정 반응 잠잠</div>
              <ul className="ovki-list">
                <li>T day 5/27 — 쉐이크쉑 1+1·파스쿠찌·백억커피 긍정 다수 · 루리웹 "별거 없구먼" 소수 혼재</li>
                <li>VIP PICK — 4/30 쿠폰 폐지·우주패스 불만 이후 5월 들어 신규 부정 게시물 없음</li>
                <li>KT 고객보답 — 투썸·노랑통닭 2차 긍정 압도 · 루리웹 조회 44,751</li>
              </ul>
              <div className="ovki-go">고객반응 보기 →</div>
            </a>
            <a href="#tr" className="ovki ovki-trend">
              <div className="ovki-cat">📈 검색어 트렌드</div>
              <div className="ovki-title">SKT 연초 대비 절반 이하로 하락 · KT 달달혜택 종료 주 급락</div>
              <ul className="ovki-list">
                <li>SKT — 연초 대비 절반 이하로 하락, 5/25주 연중 최저 갱신 · 6월 T day 라인업 공개로 반등 여부 주목</li>
                <li>KT — 달달혜택 운영 중 최고 4.1 → 종료 직전 주 반토막 · 이벤트 없으면 관심도 낮음 패턴 재확인</li>
              </ul>
              <div className="ovki-go">트렌드 보기 →</div>
            </a>
            <a href="#ai" className="ovki ovki-warn">
              <div className="ovki-cat">🤖 AI 인사이트 — 경쟁 매트릭스</div>
              <div className="ovki-title">6월 KT·LGU+ 월간 혜택 미공개 — 경쟁 비교 대기 중</div>
              <ul className="ovki-list">
                <li>KT 달달혜택·LGU+ 투쁠데이 6월 라인업 아직 미공개</li>
                <li>공개 후 3사 겹치는 브랜드·할인율 경쟁 비교 자동 업데이트 예정</li>
              </ul>
              <div className="ovki-go">AI 인사이트 보기 →</div>
            </a>
            <IssueRadarCard />
          </div>
        </div>

      </div>
    </div>
  );
}
