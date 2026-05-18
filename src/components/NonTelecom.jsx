export default function NonTelecom() {
  const cards = [
    {
      title: '네이버플러스 멤버십',
      grad: 'linear-gradient(135deg,#03c75a,#02a84c)',
      tag: '구독형 · 월 4,900원',
      tagStyle: { background: '#e6f9ee', color: '#1a7f3c' },
      core: '네이버쇼핑 최대 5% 적립, 네이버페이 결제 시 추가 혜택',
      watch: '2026 하반기 무제한 무료배송 도입 예고 — 쿠팡(월 7,890원) 대비 4,900원으로 배송 경쟁 격화. T멤버십 소상공인 영역 잠식 경계 필요',
    },
    {
      title: '쿠팡 로켓와우',
      grad: 'linear-gradient(135deg,#ff6b00,#ff9500)',
      tag: '구독형 · 월 7,890원',
      tagStyle: { background: '#fff3e6', color: '#cc5500' },
      core: '로켓배송 무료, 로켓프레시, 쿠팡이츠 무료배달',
      watch: '쿠팡이츠 배달 번들 강화로 외식·생활 전방위 커버. 구독료 인상 후에도 회원 수 증가세 유지',
    },
    {
      title: '현대카드 MEMBERSHIP',
      grad: 'linear-gradient(135deg,#1a1a2e,#16213e)',
      tag: '카드 연계형',
      tagStyle: { background: '#e8e8f0', color: '#1a1a2e' },
      core: 'The Pink·Black·Purple 등급별 공항라운지, 호텔·골프 혜택',
      watch: '프리미엄 라이프스타일 타깃. 통신사 멤버십과 상호보완적 포지션',
    },
    {
      title: '당근 로컬 커머스',
      grad: 'linear-gradient(135deg,#ff6f0f,#ff9500)',
      tag: '무료 플랫폼',
      tagStyle: { background: '#fff0e6', color: '#cc5500' },
      core: '동네 소상공인 쿠폰북, 동네걷기 리워드',
      watch: 'MAU 2천만 플랫폼이 오프라인 일상 혜택 침투 중. T멤버십 소상공인 가맹점 영역 직접 경쟁',
    },
    {
      title: '카카오페이·토스 리워드',
      grad: 'linear-gradient(135deg,#3a1cba,#6c3fff)',
      tag: '금융 연계형',
      tagStyle: { background: '#ede6ff', color: '#4a00cc' },
      core: '결제 시 포인트 적립, 출석 리워드, 제휴 할인',
      watch: '금융 플랫폼 기반 일상 혜택 확장. 간편결제 확산으로 접점 증가',
    },
    {
      title: '올리브영·무신사 멤버십',
      grad: 'linear-gradient(135deg,#00c73c,#009e30)',
      tag: '버티컬 커머스형',
      tagStyle: { background: '#e6f9ee', color: '#007a25' },
      core: '올리브영: 등급별 적립·쿠폰 / 무신사: 무신사포인트 적립',
      watch: '뷰티·패션 버티컬에서 MZ세대 록인. 통신사 멤버십의 해당 카테고리 접점 잠식',
    },
  ];

  return (
    <div className="sec" id="nt">
      <div className="sh">
        <span className="st">🏪 비통신 멤버십 동향</span>
        <span className="upd-badge upd-1m">↻ 월 갱신</span>
      </div>
      <div className="ntg">
        {cards.map((c) => (
          <div className="ntc" key={c.title}>
            <div className="nth" style={{ background: c.grad, color: '#fff' }}>{c.title}</div>
            <div className="ntb">
              <span className="nttag" style={c.tagStyle}>{c.tag}</span>
              <div className="ntrow">
                <span className="ntlbl">핵심</span>
                <span className="ntval">{c.core}</span>
              </div>
              <div className="ntrow">
                <span className="ntlbl">주목</span>
                <span className="ntval">{c.watch}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
