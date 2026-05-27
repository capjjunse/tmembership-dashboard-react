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
            <div className="ov">6월 제휴 변동 3건 동시 공시</div>
            <div className="od">
              <span>후지필름 신규·청소연구소 변경·농협맛선·도그메이트 종료 예고</span>
              <span>VIP Pick T우주패스 8월 개편 예고 진행 중 / 커뮤니티 부정 반응 지속</span>
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
              <div className="tt">후지필름 신규 제휴 — 포토북 40%·사진인화 20%·액세서리 10%·무료배송권{' '}<span className="ovb ovb-new">6월 15일 신규</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">농협맛선·도그메이트 제휴 종료 예정{' '}<span className="ovb ovb-end">6월 30일 종료</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">청소연구소 에어컨 청소 7% 할인 시즌 혜택 추가 (최대 1만원){' '}<span className="ovb ovb-chg">6월 1일 적용</span></div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc ck">
            <div className="ol"><span className="cb bk">KT</span></div>
            <div className="ov">5월 달달혜택 성황 · 6월 매드포갈릭 축소 예고</div>
            <div className="od">
              <span>고객보답 2차 동시 운영으로 이달 혜택 풍부</span>
              <span>6월부터 매드포갈릭 전 등급 20% → 등급별 15%·5%로 하향 예정</span>
            </div>
            <div className="octabs">
              <a href="#mo" className="octab">월별혜택</a>
              <a href="#hs" className="octab">변경이력</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">매드포갈릭 할인율 하향 — 전 등급 20% → VVIP/VIP/골드 15% · 일반/화이트/실버 5%{' '}<span className="ovb ovb-chg">6월 1일 예정</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">달달혜택 패밀리컬렉션 (5.15~) / 달달초이스 국민학교떡볶이 신규{' '}<span className="ovb ovb-new">5월 15일 신규</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">고객보답 2차 (5.18~31) — 투썸플레이스 50% 또는 배달의민족×노랑통닭 8,000원{' '}<span className="ovb ovb-new">5월 18일 신규</span></div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc cl">
            <div className="ol"><span className="cb bl">LGU+</span></div>
            <div className="ov">6월 제휴 변동 선제 공개</div>
            <div className="od">
              <span>신규 제휴 + 굿웨어몰 종료 예정</span>
              <span>상시 혜택 6월 업데이트 예정</span>
            </div>
            <div className="octabs">
              <a href="#hs" className="octab">변경이력</a>
              <a href="#rg" className="octab">상시혜택</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">굿웨어몰 10% 할인 종료 예정{' '}<span className="ovb ovb-end">6월 30일 종료</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">밀크T 네이버페이 월 할인한도 3만원→2만원{' '}<span className="ovb ovb-chg">5월 1일 적용</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">6월 신규 4개 — 모던하우스·유니스터디·위피·B1불스원카케어{' '}<span className="ovb ovb-new">6월 1일 신규</span></div>
            </div>
          </div>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🔑 이번달 놓치면 안될 것</div>
          <div className="ovki-grid">
            <a href="#sn" className="ovki ovki-neg">
              <div className="ovki-cat">🚨 고객반응</div>
              <div className="ovki-title">T day 5/27 '별거 없다' 부정 · KT 고객보답 긍정 유지</div>
              <ul className="ovki-list">
                <li>T day 5/27 — 루리웹 조회 15,651 "요번엔 별거 없구먼" 부정 / VIP PICK 혜택 축소 불만 지속</li>
                <li>KT 고객보답 — 루리웹 조회 44,751 긍정 · 2차 투썸·노랑통닭도 호응 이어짐</li>
              </ul>
              <div className="ovki-go">고객반응 보기 →</div>
            </a>
            <a href="#tr" className="ovki ovki-trend">
              <div className="ovki-cat">📈 검색어 트렌드</div>
              <div className="ovki-title">5/25주 갱신 — SKT 0.6 · KT 1.0 (잠정)</div>
              <ul className="ovki-list">
                <li>SKT 5/25 잠정 0.6 (전주比 +140%) · 5/18 최종 2.5 연중 최저점</li>
                <li>KT 5/25 잠정 1.0 / 5/18 최종 4.1 — 달달혜택 종료 후 집계 중</li>
              </ul>
              <div className="ovki-go">트렌드 보기 →</div>
            </a>
            <a href="#ai" className="ovki ovki-warn">
              <div className="ovki-cat">🤖 AI 인사이트 — 경쟁 매트릭스</div>
              <div className="ovki-title">SKT 열위 브랜드 3건 확인</div>
              <ul className="ovki-list">
                <li>공차 — LGU+ 하루 먼저, 동일 혜택 (SKT 열위)</li>
                <li>피자헛 — LGU+ 1주 먼저 + 5%p 높음 (SKT 열위)</li>
                <li>컬리 — KT·LGU+ 동시 운영, SKT 없음</li>
              </ul>
              <div className="ovki-go">AI 인사이트 보기 →</div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
