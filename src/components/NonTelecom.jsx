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
      edge: '적립·배송·콘텐츠 4,900원 올인원 멤버십',
      edgeDetails: [
        '적립·배송·콘텐츠·클라우드 구독 하나로 해결',
        '패밀리 3명 동일 5%, 가족 단위 락인',
        'N배송·적립·콘텐츠를 하나로, 쿠팡보다 저가',
      ],
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
      edge: '배송·배달·신선·OTT 하나로 묶은 번들',
      edgeDetails: [
        '로켓배송 물류 인프라 타사 복제 불가',
        '쿠팡이츠 무제한 무료배달 커버',
        '새벽배송까지 포함한 유일 멤버십',
      ],
    },
    {
      title: '배민클럽',
      grad: 'linear-gradient(135deg,#46b0fa,#1b87f6)',
      tag: '구독형 · 월 3,990원, 신규 1,990원',
      tagStyle: { background: '#e8f4fe', color: '#1560bd' },
      link: 'https://www.baemin.com/',
      benefits: [
        '알뜰배달 입점 가게 배달팁 무료 (거리·금액 무관)',
        '1인분 소량 주문도 배달팁 0원',
        '매주 추가 쿠폰·할인 제공',
        '유튜브 프리미엄 번들 옵션 (월 13,900원)',
        '신규 가입 프로모션 월 1,990원',
      ],
      edge: '배달팁 조건 없이 상시 무료, 업계 유일',
      edgeDetails: [
        '타사는 조건 필수, 배민클럽은 조건 없음',
        '1인분도 배달팁 0원, 1인가구 최적',
        '배달 전문 최저가, 배달팁으로 구독료 회수',
      ],
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
        '청연 최대 10%·탈잉 최대 2만원 쿠폰',
        'GOLD·BLACK 전용 라운지 이용권 + 무료 포장',
      ],
      edge: '1,300개+ 매장 온·오프 통합 등급',
      edgeDetails: [
        '구매실적 합산 등급, 채널 구분 없음',
        'GOLD·BLACK 라운지·포장은 대체 불가',
        'H&B 단독 브랜드·신제품 선접근',
      ],
    },
    {
      title: '무신사',
      grad: 'linear-gradient(135deg,#1a1a1a,#3a3a3a)',
      tag: '무료 가입 · 구매실적 등급제',
      tagStyle: { background: '#f0f0f0', color: '#1a1a1a' },
      link: 'https://www.musinsa.com/onboarding/benefit',
      benefits: [
        '구매실적 기반 1~9레벨 등급 (9레벨 VVIP 신설)',
        '아즈니섬 무료 커피 쿠폰 (매월 2장)',
        '관심 브랜드 쿠폰 최대 40%',
        '관심 상품 쿠폰 최대 30%',
        '출석체크·무퀴즈 랜덤 혜택 일 적립',
        '친구 초대 적립금 5,000원',
      ],
      edge: '맞춤 쿠폰 자동 발급, 패션 최대 40% 할인',
      edgeDetails: [
        '관심 브랜드·상품 맞춤 쿠폰 자동 발급',
        '3,000+ 브랜드 단독입점, 타사 불가',
        '9레벨 VVIP 신설, 충성고객 최상위 혜택',
      ],
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
      edge: '공항·호텔·골프 등 대체불가 프리미엄 혜택',
      edgeDetails: [
        '공항 라운지·호텔 조식 타사 미제공',
        '24시간 전담 컨시어지 지원',
        '구독료 없이 실적만으로 등급 산정',
      ],
    },
  ];

  return (
    <div className="sec" id="nt">
      <div className="sh">
        <span className="st">🏪 비통신 멤버십 동향</span>
        
      </div>
      <div className="ntg">
        {cards.map((c) => (
          <div className="ntc" key={c.title}>
            <div className="nth" style={{ background: c.grad, color: '#fff' }}>{c.title}</div>
            <div className="ntb">
              <div className="ntb-top">
                <span className="nttag" style={c.tagStyle}>
                  {c.title === '배민클럽' && c.tag.includes('신규') ? (
                    <>
                      {c.tag.split(', ')[0]}, {c.tag.split(', ')[1]}
                    </>
                  ) : (
                    c.tag
                  )}
                </span>
                <a className="ntlink" href={c.link} target="_blank" rel="noreferrer">공식 페이지 →</a>
              </div>
              <ul className="ntlist">
                {c.benefits.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
              <div className="ntwatch">
                <div className="ntedge-top">
                  <span className="ntlbl">강점</span>
                  <span className="ntval">[{c.edge}]</span>
                </div>
                <ul className="ntedge">
                  {c.edgeDetails.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
