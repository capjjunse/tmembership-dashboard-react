export default function NonTelecom() {
  const cards = [
    {
      title: '네이버플러스 멤버십',
      grad: 'linear-gradient(135deg,#03c75a,#02a84c)',
      tag: '구독형 · 월 4,900원',
      tagStyle: { background: '#e6f9ee', color: '#1a7f3c' },
      link: 'https://nid.naver.com/membership/join?m=brochure#family',
      benefits: [
        '네이버페이 포인트 최대 5% 적립 (월 20만원까지)',
        'N배송 1만원 이상 주문 무료배송',
        '디지털 콘텐츠 이용권 1개 선택 (넷플릭스·티빙 등)',
        '웹툰·시리즈 쿠키 10개/월 무료',
        'MYBOX 80GB 추가 제공',
        '패밀리 최대 3명 초대 (5% 적립 동일 적용)',
      ],
      edge: '쇼핑 적립(5%)·콘텐츠 이용권·무료배송을 단일 구독으로 — 네이버 생태계 전체가 멤버십 혜택. 2026 하반기 무제한 무료배송 도입 시 커머스 구독 시장 판도 변화 예고',
    },
    {
      title: '쿠팡 로켓와우',
      grad: 'linear-gradient(135deg,#ff6b00,#ff9500)',
      tag: '구독형 · 월 7,890원',
      tagStyle: { background: '#fff3e6', color: '#cc5500' },
      link: 'https://www.coupang.com/np/campaigns/rocketwow',
      benefits: [
        '로켓배송 무료 (금액·거리 무관)',
        '쿠팡이츠 무제한 무료배달',
        '로켓프레시 당일·새벽배송 무료',
        '쿠팡플레이 무료 이용',
        '로켓배송 상품 무료 반품',
        '와우 전용 할인가 제공',
      ],
      edge: '쇼핑·배달·신선식품·OTT를 월정액 하나로 — 개별 서비스 합산 대비 압도적 가성비. 로켓배송 익일 보장은 타 멤버십이 대체 불가한 물류 인프라 경쟁 우위',
    },
    {
      title: '배민클럽',
      grad: 'linear-gradient(135deg,#46b0fa,#1b87f6)',
      tag: '구독형 · 월 3,990원',
      tagStyle: { background: '#e8f4fe', color: '#1560bd' },
      link: 'https://www.baemin.com/',
      benefits: [
        '알뜰배달 입점 가게 배달팁 무료 (거리·금액 무관)',
        '1인분 소량 주문도 배달팁 0원',
        '매주 추가 쿠폰·할인 제공',
        '유튜브 프리미엄 번들 옵션 (월 13,900원)',
        '신규 가입 프로모션 월 1,990원',
      ],
      edge: '거리·금액·브랜드 조건 없이 배달팁 상시 무료 — 다른 어떤 멤버십도 이 조건의 상시 배달무료 미제공. 배달 전문 구독 최저가(월 3,990원)로 락인 효과 극대화',
    },
    {
      title: '올리브영 멤버스',
      grad: 'linear-gradient(135deg,#00c73c,#009e30)',
      tag: '무료 가입 · 구매실적 등급제',
      tagStyle: { background: '#e6f9ee', color: '#007a25' },
      link: 'https://www.oliveyoung.co.kr/store/main/getMembership.do',
      benefits: [
        '5단계 등급: BABY → PINK → GREEN → BLACK → GOLD',
        'CJ ONE 포인트 적립 (PINK/BABY 0.5%, GREEN 이상 1.0%)',
        '올리브 데이 등급별 쿠폰 (매월 25일 지급)',
        '리디 포인트 1,000원 (매주 금요일 선착순)',
        '청연·탈잉 최대 10% 쿠폰',
        'GOLD·BLACK 전용 라운지 이용권 + 무료 포장',
      ],
      edge: '전국 1,300개+ 오프라인 매장 연동 등급 혜택 — 온·오프라인 동일 등급 적용은 타 멤버십 완전 부재. GOLD 라운지·무료 포장 등 실물 뷰티 체험은 디지털 멤버십으로 대체 불가',
    },
    {
      title: '무신사',
      grad: 'linear-gradient(135deg,#1a1a1a,#3a3a3a)',
      tag: '무료 가입 · 구매실적 등급제',
      tagStyle: { background: '#f0f0f0', color: '#1a1a1a' },
      link: 'https://www.musinsa.com/onboarding/benefit',
      benefits: [
        '구매실적 기반 1~9레벨 등급 (9레벨 VVIP 신설)',
        '등급별 장바구니 쿠폰 월 1회 (최대 5%, 다품목 적용)',
        '관심 브랜드 쿠폰 최대 40%',
        '관심 상품 쿠폰 최대 30%',
        '출석체크·무퀴즈 랜덤 혜택 일 적립',
        '친구 초대 적립금 5,000원',
      ],
      edge: '관심 브랜드·상품 연동 맞춤 쿠폰 자동 발급(최대 40%) — 범용 멤버십에는 없는 패션 버티컬 한정 혜택. 3,000+ 브랜드 단독 입점으로 타 플랫폼 대체 불가',
    },
    {
      title: '현대카드 MEMBERSHIP',
      grad: 'linear-gradient(135deg,#1a1a2e,#16213e)',
      tag: '카드 연계형',
      tagStyle: { background: '#e8e8f0', color: '#1a1a2e' },
      link: 'https://www.hyundaicard.com/',
      benefits: [
        'The Pink · The Black · The Purple 3등급',
        '공항 라운지 무료 이용 (KAL 포함)',
        '특급 호텔 할인 및 무료 조식',
        '골프 그린피 할인',
        '전용 공연·전시 초청',
        '전담 컨시어지 서비스',
      ],
      edge: '공항 라운지·특급 호텔·골프 등 프리미엄 오프라인 실물 혜택 — 통신사·커머스 멤버십과 완전 차별화된 영역. 디지털로 대체 불가한 고가 생활 혜택을 카드 한 장으로 제공',
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
              <div className="ntb-top">
                <span className="nttag" style={c.tagStyle}>{c.tag}</span>
                <a className="ntlink" href={c.link} target="_blank" rel="noreferrer">공식 페이지 →</a>
              </div>
              <ul className="ntlist">
                {c.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="ntwatch">
                <span className="ntlbl">강점</span>
                <span className="ntval">{c.edge}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
