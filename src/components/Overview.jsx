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

        <div className="ovrow">
          <div className="oc cs">
            <div className="ol"><span className="cb bs">SKT</span></div>
            <div className="ov"><span className="upd">럭키위크 T day 전 일정 공개 — Week·0week·1~3주차 완료 · 3주차(6.24) 뚜레쥬르·다운타우너·역전우동·CGV 식음 집중</span></div>
            <div className="od">
              <div className="od-item">
                <a href="#sn" className="octab">고객반응</a>
                <span className="od-txt"><span className="upd">T day 전반 긍정 55% 우세 · VIP PICK 중립·부정 혼재(3건) · 해피아워 긍정 우세</span></span>
              </div>
              <div className="od-item">
                <a href="#vp" className="octab">VIP혜택</a>
                <span className="od-txt">T우주패스 8월 구조 개편 예고 — 9,900원 쿠폰 폐지·분리</span>
              </div>
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt"><span className="upd">럭키위크 T day 전 일정 공개 — 3주차(6.24) 뚜레쥬르·다운타우너·역전우동·CGV 식음 4종 확정</span></span>
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
            <div className="ov"><span className="upd">달달혜택 전 일정 공개·고객보답 3차(VIPS 무료) 운영 중 — 검색량 6/15주 9.3 반등 · 보답 2차(컵라면) 강한 부정 반응 지속</span></div>
            <div className="od">
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt"><span className="upd">달달초이스 6종(버거킹·공차·VIPS 등) + 달달스페셜 5종 운영 중 · 롯데시네마 선착순 종료</span></span>
              </div>
              <div className="od-item">
                <a href="#hs" className="octab">변경이력</a>
                <span className="od-txt">5.29 변경 4건 — 라그릴리아 신규·온누리몰 쿠폰 추가·AICE 축소·클럽디오아시스 7/1 종료</span>
              </div>
              <div className="od-item">
                <a href="#sn" className="octab">고객반응</a>
                <span className="od-txt"><span className="upd">6월 2차 고객보답(던킨·GS25 컵라면) — 루리웹 '고객보답이야 재고정리야' 강한 부정 (조회 23,151)</span></span>
              </div>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">고객보답 3차 이벤트<span className="ovb ovb-new">6월 16일 신규</span></div>
                <div className="tt-sub">VIPS 채끝스테이크 무료 등 8종 (6.16~30)</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">라그릴리아 신규 제휴<span className="ovb ovb-new">5월 29일 신규</span></div>
                <div className="tt-sub">등급별 5~10% 할인 (6.1~)</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">
                <div className="tt-top">온누리몰 10% 할인쿠폰 추가<span className="ovb ovb-chg">5월 29일 변경</span></div>
                <div className="tt-sub">6.1~12.31 전 등급 이용 가능</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc cl">
            <div className="ol"><span className="cb bl">LGU+</span></div>
            <div className="ov"><span className="upd">FIFA 매치데이 3·4탄 완료 — 6.25 장기고객데이(파리바게뜨·윌라·NOL빌리 엘리어트) 남음</span></div>
            <div className="od">
              <div className="od-item">
                <a href="#mo" className="octab">월별혜택</a>
                <span className="od-txt"><span className="upd">FIFA 매치데이 3·4탄 완료 — 6.25 장기고객데이(파리바게뜨·윌라·NOL빌리 엘리어트) 남음</span></span>
              </div>
              <div className="od-item">
                <a href="#rg" className="octab">상시혜택</a>
                <span className="od-txt">신규 4개 추가 · 굿웨어몰 6/30 종료로 순증 확인 필요</span>
              </div>
              <div className="od-item">
                <a href="#hs" className="octab">변경이력</a>
                <span className="od-txt">우리동네 멤버십 3지점 6.17 종료 · 7월 신규 8개(프린트베이커리 등) 예고 · 포텔리어 구독권 1개월→2주 축소</span>
              </div>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">우리동네 멤버십 3지점 제휴 종료<span className="ovb ovb-end">6월 11일 종료</span></div>
                <div className="tt-sub">하얀풍차·아비앙또 다대점·니드카페 안산점 (6.17 종료)</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">7월 신규 제휴 8개 예고<span className="ovb ovb-new">6월 9일 신규</span></div>
                <div className="tt-sub">프린트베이커리·수공당 등 8개 브랜드 7.1~</div>
              </div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">
                <div className="tt-top">포텔리어 구독권 혜택 축소<span className="ovb ovb-chg">6월 9일 변경</span></div>
                <div className="tt-sub">무료 1개월 → 무료 2주 (7.1 적용)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🔑 이번달 놓치면 안될 것</div>
          <div className="ovki-grid">
            <a href="#sn" className="ovki ovki-pos">
              <div className="ovki-cat">💬 고객반응 <span className="ovki-skt ovki-skt-pos">SKT 호재</span></div>
              <div className="ovki-title">SKT T day 긍정 우세 · KT 고객보답 2차(컵라면·모찌) 강한 부정 (조회 23,151)</div>
              <ul className="ovki-list">
                <li><span className="upd">SKT T day 전반 긍정 55% 우세 · 3주차(6.24) 뚜레쥬르·다운타우너·역전우동·CGV 진행</span></li>
                <li>KT 고객보답 2차(6.16~30) GS25 컵라면·모찌 50% — 루리웹 '컵라면이 고객보답이야 재고정리야' 강한 부정 (조회 23,151)</li>
                <li><span className="upd">LGU+ 유플투쁠 70% 긍정 · 3·4차 완료 · 6.25 장기고객데이 남음</span></li>
              </ul>
              <div className="ovki-go">고객반응 보기 →</div>
            </a>
            <a href="#tr" className="ovki ovki-warn">
              <div className="ovki-cat">📈 검색어 트렌드 <span className="ovki-skt ovki-skt-mix">혼재</span></div>
              <div className="ovki-title"><span className="upd">SKT 6/15주 5.9 소폭 반등 · KT 9.3 반등 — KT 달달혜택 공개 후 관심 회복</span></div>
              <ul className="ovki-list">
                <li><span className="upd">SKT — 6/08 5.7에서 6/15 5.9로 소폭 반등(+0.2) · 연중 저점권 유지 · 3주차 반응 추이 주목</span></li>
                <li><span className="upd">KT — 6/08 7.5에서 6/15 9.3으로 +1.8 반등 · 달달혜택 6.15 공개 효과 확인</span></li>
              </ul>
              <div className="ovki-go">트렌드 보기 →</div>
            </a>
            <a href="#ai-matrix" className="ovki ovki-mix">
              <div className="ovki-cat">🤖 AI 인사이트 — 경쟁 매트릭스 <span className="ovki-skt ovki-skt-mix">혼재</span></div>
              <div className="ovki-title">CGV 우위 · 공차·그리팅·아모레몰 SKT 없음 — KT 달달혜택+고객보답 운영으로 KT↔LGU+ 경쟁 3종</div>
              <ul className="ovki-list">
                <li><span className="upd">CGV — SKT Week(6.1~6.5)+3주차(6.24~6.28) 2회 운영 vs LGU+ 투쁠3차 스낵세트 1회 → SKT 우위</span></li>
                <li>공차·그리팅 — KT·LGU+ 각각 동일 조건 운영 · SKT 미제휴 확인</li>
                <li>아모레몰 — KT 달달스페셜 5천원 할인 vs LGU+ 구독권+포인트 · SKT 미제휴</li>
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
