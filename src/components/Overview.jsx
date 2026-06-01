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
            <div className="ov">매주 T day로 기습 고할인 — 타이밍 맞추면 최강 혜택</div>
            <div className="od">
              <div className="od-item">
                <a href="#sn" className="octab octab-warn">⚠ 고객반응</a>
                <span className="od-txt">VIP PICK 8월 개편 관련 부정 반응 식별 중</span>
              </div>
              <div className="od-item">
                <a href="#vp" className="octab">VIP혜택</a>
                <span className="od-txt">T우주패스 8월 구조 개편 예고 — 9,900원 쿠폰 폐지·분리</span>
              </div>
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt">6월 T day 1주차 Lucky Week 공개 · 2~3주차 미공개</span>
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
            <div className="ov">달마다 달달혜택 공개 + 깜짝 고객보답 — 이벤트 시즌에 혜택 밀도 최고조</div>
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
                <span className="od-txt">6월 1차 고객보답(올리브영 3천원권, 6/1~15) — 커뮤니티 부정 반응 다수</span>
              </div>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">매드포갈릭 할인율 하향<span className="ovb ovb-chg">6월 1일 적용</span></div>
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
                <div className="tt-top">고객보답 6월 1차 시작<span className="ovb ovb-new">6월 1일 신규</span></div>
                <div className="tt-sub">올리브영 3천원권 또는 쇼핑라운지 6천원 할인 택1 (6/1~15)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc cl">
            <div className="ol"><span className="cb bl">LGU+</span></div>
            <div className="ov">제휴처 지속 확장 · 일상 할인 밀도 집중형</div>
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
                <span className="od-txt">밀크T 네이버페이 한도 5/1 이미 축소 — 체감 혜택 감소</span>
              </div>
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
            <a href="#sn" className="ovki ovki-warn">
              <div className="ovki-cat">💬 고객반응</div>
              <div className="ovki-title">6월 전환 — SKT 0week 긍정·KT 1차 고객보답 부정 혼재</div>
              <ul className="ovki-list">
                <li>SKT 0week(6.1~) — 6월 매드포갈릭·크리스탈제이드 0week 총정리 블로그 긍정·중립 다수</li>
                <li>KT 6월 1차 고객보답(올리브영 3천원) — 루리웹 "완전 조졌네" 부정 반응 다수 (조회 6,115)</li>
                <li>LGU+ 유플투쁠 6월 — 카카오웹툰·웅진플레이도시 라인업 블로그 긍정 확인</li>
              </ul>
              <div className="ovki-go">고객반응 보기 →</div>
            </a>
            <a href="#tr" className="ovki ovki-trend">
              <div className="ovki-cat">📈 검색어 트렌드</div>
              <div className="ovki-title">SKT 5/25주 2.7 기간 내 최저 · LGU+ 5월말 8.7로 급락</div>
              <ul className="ovki-list">
                <li>SKT — 5주 연속 하락, 5/25주 2.7 기간 내 최저 기록 · 6월 0week 시작으로 반등 여부 주목</li>
                <li>KT — 4.0→4.2 소폭 회복 중 · 달달혜택 부재 시 저점, 이벤트 의존 구조 재확인</li>
              </ul>
              <div className="ovki-go">트렌드 보기 →</div>
            </a>
            <a href="#ai-recommend" className="ovki ovki-trend">
              <div className="ovki-cat">🤖 AI 인사이트 — 신규 제휴 추천</div>
              <div className="ovki-title">설빙·청년다방 여름 성수기 진입 — 3사 미제휴, SKT 선점 타이밍</div>
              <ul className="ovki-list">
                <li>설빙 6종 여름 신메뉴 출시(5.28) · 6월 성수기 직진 · 3사 모두 미제휴 — SKT 단독 선점 가능</li>
                <li>청년다방 검색량 6개월 연속 상승 · 저단가 고빈도 방문 구조로 멤버십 활용 적합</li>
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
