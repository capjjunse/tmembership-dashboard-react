export default function Overview() {
  return (
    <div className="sec" id="ov">
      <div className="sh">
        <span className="st">📊 이달의 핵심 동향</span>
        <span className="upd-badge upd-1m">↻ 주 갱신</span>
      </div>
      <div className="ovg">

        <div className="ovrow">
          <div className="oc cs">
            <div className="ol"><span className="cb bs">SKT</span></div>
            <div className="ov">VIP Pick T우주패스 혜택 변경 예고</div>
            <div className="od">
              <span>9,900원 쿠폰 폐지</span>
              <span>4,900원+5,000원 2종으로 분리</span>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">VIP Pick T우주패스 — 9,900원 쿠폰 폐지, 4,900원+5,000원 2종 분리{' '}<span className="ovb ovb-chg">8월 1일 적용</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">루덴시아 신규 제휴 (주중 50%, 주말 35%) / 무탄 종료{' '}<span className="ovb ovb-end">5월 31일 종료</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">매드포갈릭 할인율 하향 (V/G 20%→15%, S 10%→5%){' '}<span className="ovb ovb-chg">6월 1일 적용</span></div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc ck">
            <div className="ol"><span className="cb bk">KT</span></div>
            <div className="ov">5월 달달혜택 + 고객보답 2차</div>
            <div className="od">
              <span>달달초이스 국민학교떡볶이 신규 (5.15~31)</span>
              <span>고객보답 2차: 투썸 50% / 배민×노랑통닭 8천원</span>
            </div>
          </div>
          <div className="ovchanges">
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
            <div className="ov">6월 신규 제휴사 &amp; 혜택 변동</div>
            <div className="od">
              <span>26년 6월 신규 제휴사 안내 (5.11 공지)</span>
              <span>굿웨어몰 10% 할인 종료 예정 (6.30)</span>
              <span>밀크T 네이버페이 한도 3만→2만원 (5.1~)</span>
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
              <div className="tt">26년 6월 신규 제휴사 + 일부 제휴사 혜택 종료 예정{' '}<span className="ovb ovb-new">5월 11일 신규</span></div>
            </div>
          </div>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🔑 이번달 놓치면 안될 것</div>
          <div className="ovkey-title">SKT VIP Pick T우주패스 — 8월 1일 혜택 구조 변경</div>
          <div className="ovkey-body">9,900원 단일 쿠폰이 폐지되고 4,900원+5,000원 2종으로 분리 적용. VIP 고객은 현행 쿠폰 사용 방식 미리 확인 권장.</div>
        </div>

      </div>
    </div>
  );
}
