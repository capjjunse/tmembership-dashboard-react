export default function Overview() {
  return (
    <div className="sec" id="ov">
      <div className="sh">
        <span className="st">📊 이달의 핵심 동향</span>
        <span className="upd-badge upd-1m">↻ 주 갱신</span>
      </div>
      <div className="og">
        <div className="oc cs">
          <div className="ol"><span className="cb bs">SKT</span></div>
          <div className="ov">VIP Pick T우주패스 혜택 변경 예고</div>
          <div className="od">
            <span>8월 1일부터 9,900원 쿠폰 폐지</span>
            <span>4,900원+5,000원 2종으로 분리 적용</span>
          </div>
        </div>
        <div className="oc ck">
          <div className="ol"><span className="cb bk">KT</span></div>
          <div className="ov">가정의달 패밀리 혜택</div>
          <div className="od">
            <span>패밀리박스 쿠폰팩 + 퀴즈 이벤트</span>
            <span>달달혜택 패밀리컬렉션 (5.15~)</span>
          </div>
        </div>
        <div className="oc cl">
          <div className="ol"><span className="cb bl">LGU+</span></div>
          <div className="ov">6월 신규 제휴사 &amp; 유플투쁠 2주년</div>
          <div className="od">
            <span>26년 6월 신규 제휴사 안내 (05.11 공지)</span>
            <span>5.28 장기고객 CGV·뮤지컬·윌라</span>
          </div>
        </div>
        <div className="oc cg">
          <div className="ol" style={{ fontSize: '11px', color: 'var(--tx3)' }}>5월 이벤트</div>
          <div className="ov" style={{ fontSize: '13px' }}>고향사랑기부제</div>
          <div className="od">
            <span>위기브 10만원 기부시 14만5천원 혜택</span>
            <span>5.6~6.30 진행</span>
          </div>
        </div>
      </div>
      <div className="tl">
        <div className="ti">
          <div className="tdot" style={{ background: 'var(--skt)' }}></div>
          <div className="tt">
            <span className="cb bs">SKT</span> VIP Pick T우주패스 변경 — 9,900원 쿠폰 폐지, 4,900원+5,000원 2종 분리{' '}
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '20px', background: '#fff7e6', color: '#b35c00', border: '0.5px solid #f5c060' }}>8월 1일 적용</span>
          </div>
        </div>
        <div className="ti">
          <div className="tdot" style={{ background: 'var(--skt)' }}></div>
          <div className="tt">
            <span className="cb bs">SKT</span> 루덴시아 신규 제휴 (주중 50%, 주말 35%, 4.24~) / 무탄 종료{' '}
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '20px', background: '#fef2f2', color: '#b91c1c', border: '0.5px solid #fca5a5' }}>5.31 종료</span>
          </div>
        </div>
        <div className="ti">
          <div className="tdot" style={{ background: 'var(--skt)' }}></div>
          <div className="tt">
            <span className="cb bs">SKT</span> 매드포갈릭 할인율 하향 (V/G 20%→15%, S 10%→5%){' '}
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '20px', background: '#fff7e6', color: '#b35c00', border: '0.5px solid #f5c060' }}>6월 1일 적용</span>
          </div>
        </div>
        <div className="ti">
          <div className="tdot" style={{ background: 'var(--kt)' }}></div>
          <div className="tt">
            <span className="cb bk">KT</span> 달달혜택 패밀리컬렉션 (5.15~) + 패밀리박스 가정의달 쿠폰팩
          </div>
        </div>
        <div className="ti">
          <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
          <div className="tt">
            <span className="cb bl">LGU+</span> 26년 6월 신규 제휴사 + 일부 제휴사 혜택 종료 예정 (05.11 공지)
          </div>
        </div>
      </div>
    </div>
  );
}
