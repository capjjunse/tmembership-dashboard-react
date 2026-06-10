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
            <div className="ov">0week 진행 중(6.8~6.12) · 1~3주차 라인업 전 공개 — 해피아워·T day 긍정 우세로 6월 혜택 풀가동</div>
            <div className="od">
              <div className="od-item">
                <a href="#sn" className="octab">고객반응</a>
                <span className="od-txt">T day 긍정 74% 우세 · 해피아워(쉑쉑) 6월 긍정 · VIP PICK 반응 미수집</span>
              </div>
              <div className="od-item">
                <a href="#vp" className="octab">VIP혜택</a>
                <span className="od-txt">T우주패스 8월 구조 개편 예고 — 9,900원 쿠폰 폐지·분리</span>
              </div>
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt">럭키위크 T day — 0 week + 1~3주차 전 공개 · 2주차 쉐이크쉑·도미노피자, 3주차 역전우동·CGV 등 외식·레저 중심</span>
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
            <div className="ov">6월 달달혜택 미공개 · 6/01주 4.0 소폭 하락 — 달달혜택 공개 전 이벤트 공백 지속</div>
            <div className="od">
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt">6월 달달혜택 미발표 — 바캉스 테마 6.17 공개 예정</span>
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

        <div className="ovrow">
          <div className="oc">
            <div className="ol"><span className="cb">AI분석</span></div>
            <div className="ov">비통신 우위 3개(카셰어링·외식카페·테마파크) · 설빙·청년다방·깐부치킨 제휴 후보 — 배달·주유 공백, 이슈 5개 모니터링</div>
            <div className="od">
              <div className="od-item">
                <a href="#nt" className="octab">비통신멤버십</a>
                <span className="od-txt"><span className="upd">구독형 3종(네이버플러스 4,900원·로켓와우 7,890원·배민클럽 3,990원) · 등급제 2종(올리브영·무신사) · 카드연계 1종(현대카드) — 6개 트래킹</span></span>
              </div>
              <div className="od-item">
                <a href="#ai-nontelecom" className="octab">비통신비교</a>
                <span className="od-txt"><span className="upd">T멤버십 우위 3개(카셰어링·외식카페·테마파크) · 열위 2개(주유·배달) · 유사 4개 — 배달·주유 공백 지속</span></span>
              </div>
              <div className="od-item">
                <a href="#ai-recommend" className="octab">신규제휴추천</a>
                <span className="od-txt"><span className="upd">설빙 DataLab 1.51(Tday 3개월 공백) · 청년다방 1.58(분식 버즈 1위) · 깐부치킨 1.36(젠슨황 효과) — SKT 3종 모두 미참여</span></span>
              </div>
              <div className="od-item">
                <a href="#ai-radar" className="octab">이슈레이더</a>
                <span className="od-txt"><span className="upd">깐부치킨 강·긍정(젠슨황 재방문) · 스타벅스·피자헛 중·부정 · 메가커피·이마트24 약·부정 — 5개 모니터링</span></span>
              </div>
              <div className="od-item">
                <a href="#ai-market" className="octab">마켓시그널</a>
                <span className="od-txt"><span className="upd">경쟁·소비 동향 뉴스 시그널 — 제휴사 제외 카테고리별 자동 집계 · 시그널 강도별 표시</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🔑 이번달 놓치면 안될 것</div>
          <div className="ovki-grid">
            <a href="#sn" className="ovki ovki-pos">
              <div className="ovki-cat">💬 고객반응 <span className="ovki-skt ovki-skt-pos">SKT 호재</span></div>
              <div className="ovki-title">6월 초 — SKT 0week·해피아워 진행 중, LGU+ 투쁠 긍정, KT 고객보답 부정 혼재</div>
              <ul className="ovki-list">
                <li>SKT 0week(6.8~12) + 해피아워(쉑쉑) — T day·0week·해피아워 긍정 74% 우세</li>
                <li>KT 6월 1차 고객보답(올리브영 3천원) — 루리웹·에펨코리아 부정 반응 다수 (최다 조회 6,115)</li>
                <li>LGU+ 유플투쁠 6월 — 카카오웹툰·웅진플레이도시 라인업 블로그 긍정 확인</li>
              </ul>
              <div className="ovki-go">고객반응 보기 →</div>
            </a>
            <a href="#tr" className="ovki ovki-warn">
              <div className="ovki-cat">📈 검색어 트렌드 <span className="ovki-skt ovki-skt-mix">혼재</span></div>
              <div className="ovki-title">SKT 6/01주 3.1 반등 · KT 4.0 소폭 하락 — SKT 0week 개막 후 관심 소폭 회복</div>
              <ul className="ovki-list">
                <li>SKT — 5/25주 2.7→6/01주 3.1 반등 · 0week 개막 효과로 관심 소폭 회복</li>
                <li>KT — 5/25주 4.2→6/01주 4.0 소폭 하락 · 달달혜택 미공개 이벤트 의존 구조 확인</li>
              </ul>
              <div className="ovki-go">트렌드 보기 →</div>
            </a>
            <a href="#ai-matrix" className="ovki ovki-mix">
              <div className="ovki-cat">🤖 AI 인사이트 — 경쟁 매트릭스 <span className="ovki-skt ovki-skt-mix">혼재</span></div>
              <div className="ovki-title">CGV 우위 1건 · 투썸·배스킨 등 5종 유사·비교불가 — SKT↔LGU+ 6종 비교, KT 미공개</div>
              <ul className="ovki-list">
                <li>CGV — SKT 0 week 8,500원+매점쿠폰 2종이 LGU+ 스낵세트 단독보다 우위</li>
                <li>파리바게뜨·스피드메이트·배스킨라빈스·투썸 4종 — 혜택 단위·구성 상이로 직접 비교 불가</li>
                <li>NOL티켓 — LGU+ 빌리엘리어트 40% vs SKT 35%·키크니 추가 포함 → 유사 판정</li>
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
