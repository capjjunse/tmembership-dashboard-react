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
      <a href="#ai-radar" className="ovki ovki-urgent">
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
    <a href="#ai-radar" className="ovki ovki-radar">
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
            <div className="ov">럭키위크 테마 0 week 완료 · T day 1주차(6.8~) 공개 대기 — 검색량 2.2 연속 하락세</div>
            <div className="od">
              <div className="od-item">
                <a href="#sn" className="octab">고객반응</a>
                <span className="od-txt">T day 긍정 69% 우세 · VIP PICK 반응 미수집</span>
              </div>
              <div className="od-item">
                <a href="#vp" className="octab">VIP혜택</a>
                <span className="od-txt">T우주패스 8월 구조 개편 예고 — 9,900원 쿠폰 폐지·분리</span>
              </div>
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt">럭키위크 T day — 0 week 완료(6.1~6.5) · 1주차 요기요×호식이두마리치킨(6.8~) · 2~3주차 미공개</span>
              </div>
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
            <div className="ov">6월 달달혜택 미공개 · 6/01주 검색량 2.7 급락 — 이벤트 부재 시 관심 저하 패턴 반복</div>
            <div className="od">
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt">6월 달달혜택 미발표 — 15일경 공개 예정</span>
              </div>
              <div className="od-item">
                <a href="#hs" className="octab">변경이력</a>
                <span className="od-txt">매드포갈릭 6/1 하향 — 전 등급 상시 할인율 약화</span>
              </div>
              <div className="od-item">
                <a href="#sn" className="octab">고객반응</a>
                <span className="od-txt">6월 1차 고객보답(올리브영 3천원) — 루리웹·에펨코리아 부정 반응 다수 (조회 최다 6,115)</span>
              </div>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">달달초이스 국민학교떡볶이 신규<span className="ovb ovb-new">5월 15일 신규</span></div>
                <div className="tt-sub">달달혜택 달달초이스 신규 참여 (5.15~31)</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">고객보답 2차 이벤트<span className="ovb ovb-new">5월 15일 신규</span></div>
                <div className="tt-sub">투썸플레이스 50% / 배달의민족×노랑통닭 8,000원 할인 (5.18~31)</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">매드포갈릭 할인율 하향<span className="ovb ovb-chg">6월 1일 적용</span></div>
                <div className="tt-sub">전 등급 20% → VVIP/VIP/골드 15% · 일반/화이트/실버 5%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc cl">
            <div className="ol"><span className="cb bl">LGU+</span></div>
            <div className="ov">FIFA 월드컵 매치데이 3탄 — 경기 주간마다 응원 음식·레저 집중, 6/15 컬처 특화</div>
            <div className="od">
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt">6월 전체 공개 — 투쁠데이 9~23일 · 장기고객데이 25일 운영</span>
              </div>
              <div className="od-item">
                <a href="#rg" className="octab">상시혜택</a>
                <span className="od-txt">신규 4개 추가 · 굿웨어몰 6/30 종료로 순증 확인 필요</span>
              </div>
              <div className="od-item">
                <a href="#hs" className="octab">변경이력</a>
                <span className="od-txt">등급 상향 주기 7/1 변경 — 가입 시점별 승급 일정 달라짐 주의</span>
              </div>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">등급 상향 주기 변경<span className="ovb ovb-chg">7월 1일 적용</span></div>
                <div className="tt-sub">월 2~15일 가입 → 익월 1일 / 16~말일 가입 → 익월 16일 승급</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">우리동네 멤버십 제휴 일시 중단<span className="ovb ovb-chg">5월 20일 변경</span></div>
                <div className="tt-sub">일부 지점 제휴 서비스 일시 중단 — 재개 일정 미정</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">굿웨어몰 10% 할인 종료<span className="ovb ovb-end">6월 30일 종료</span></div>
                <div className="tt-sub">종료 후 LGU+ 멤버십 할인 혜택에서 제외</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🔑 이번달 놓치면 안될 것</div>
          <div className="ovki-grid">
            <a href="#sn" className="ovki ovki-pos">
              <div className="ovki-cat">💬 고객반응 <span className="ovki-skt ovki-skt-pos">SKT 호재</span></div>
              <div className="ovki-title">6월 초 — SKT 0week·LGU+ 투쁠 긍정, KT 고객보답 부정 혼재</div>
              <ul className="ovki-list">
                <li>SKT 0week(6.1~) — 6월 매드포갈릭·크리스탈제이드 0week 총정리 블로그 긍정·중립 다수</li>
                <li>KT 6월 1차 고객보답(올리브영 3천원) — 루리웹·에펨코리아 부정 반응 다수 (최다 조회 6,115)</li>
                <li>LGU+ 유플투쁠 6월 — 카카오웹툰·웅진플레이도시 라인업 블로그 긍정 확인</li>
              </ul>
              <div className="ovki-go">고객반응 보기 →</div>
            </a>
            <a href="#tr" className="ovki ovki-neg">
              <div className="ovki-cat">📈 검색어 트렌드 <span className="ovki-skt ovki-skt-neg">SKT 악재</span></div>
              <div className="ovki-title">SKT 6/01주 2.2 · KT 2.7 — 두 통신사 동반 하락, SKT 연속 하락세</div>
              <ul className="ovki-list">
                <li>SKT — 5/25주 2.7→6/01주 2.2 하락세 지속 · 0week 개막에도 반등 미확인</li>
                <li>KT — 5/25주 4.2→6/01주 2.7 급락, 달달혜택 미공개 이벤트 의존 구조 재확인</li>
              </ul>
              <div className="ovki-go">트렌드 보기 →</div>
            </a>
            <a href="#ai-matrix" className="ovki ovki-mix">
              <div className="ovki-cat">🤖 AI 인사이트 — 경쟁 매트릭스 <span className="ovki-skt ovki-skt-mix">혼재</span></div>
              <div className="ovki-title">CGV T day 우위 · 파리바게뜨·스피드메이트 비교 불가 — KT 미공개 비교 보류</div>
              <ul className="ovki-list">
                <li>CGV — SKT 0 week 예매 8,500원+스낵쿠폰 2종이 LGU+ 투쁠데이 스낵세트 단독보다 우위</li>
                <li>파리바게뜨·스피드메이트 — 할인 단위 불일치로 직접 비교 불가 (SKT vs LGU+)</li>
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
