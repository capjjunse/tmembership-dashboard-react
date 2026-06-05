// 제휴사 이슈 레이더 데이터 — AIInsight.jsx 섹션 4 + Overview.jsx 이슈 카드 공유
// membership: 'partner'=현재 제휴 | 'candidate'=잠재 후보 | 'watchlist'=관심
// direction:  'neg'=부정 | 'pos'=긍정 | 'neu'=중립
// strength:   'strong'=강(긴급) | 'mid'=중(주목) | 'low'=약(모니터링)
export const trendSignals = [
  {
    brand: '스타벅스',
    membership: 'partner',
    telcos: [
      { id: 'kt',  label: 'KT',   prog: '상시',  benefit: '[전 등급] 사이즈업' },
      { id: 'lgu', label: 'LGU+', prog: 'VIP콕', benefit: '[VVIP] 아메리카노 1잔 무료 / [VIP] 더블 사이즈업 무료' },
    ],
    strength: 'strong',
    sources: ['DataLab', '뉴스'],
    direction: 'neg',
    dlSpike: 2.18,
    news7d: 55,
    negScore: 945,
    headline: [
      '6.1~14 선불충전금 전액 환불 접수 진행 중 · 환불 4,276억 규모 · 탱크데이 불매 지속',
      '불매 실효 지속 — 주간 결제액 321억→236억(84.7억↓, 26.3% 감소) · 앱 신규 설치 23.6%↓',
      '협력업체 발주 끊기고 매출 타격 확산 (5.29 뉴시스) · 환불 첫날 매장 평온, 온라인 불매 지속',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT Tday 6월 미운영 · 환불 접수 중(~6.14) · 주간 결제액 80억↓ 지속',
    links: [
      { label: '결제액 주간 80억↓ · 321억→236억 감소', url: 'https://imnews.imbc.com/replay/2026/nwdesk/article/6825701_37004.html' },
      { label: '6.1~14 선불충전금 4,276억 전액 환불 접수 중', url: 'https://imnews.imbc.com/replay/2026/nwdesk/article/6826848_37004.html' },
    ],
  },
  {
    brand: '메가커피',
    membership: 'partner',
    telcos: [{ id: 'kt', label: 'KT', prog: '달달혜택 (6월 미공개)', benefit: '커피 쿠폰 증정' }],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 20,
    negScore: 246,
    headline: [
      '6.19~ 할메가커피·왕할메가커피 등 3종 200원 가격 인상 · FD커피 원가 상승 이유 (6.4 파이낸셜뉴스)',
      '가맹점주 323명 차액가맹금 소송 진행 중 · 추가 소송 준비 중 · 공정위 과징금 23억(4월)',
      '스타벅스 환불 이후 반사이익 기대 — 6월 방문자 증가 추세 확인 중',
    ],
    impact: 'KT 달달혜택 6월 미공개 · 스타벅스 반사이익 6월 지속 확인 · 차액가맹금 소송·추가 소송 리스크 지속',
    links: [
      { label: '점주 323명 차액가맹금 소송 · 추가 소송 준비 중', url: 'https://biz.heraldcorp.com/article/10658005' },
      { label: '스타벅스 환불에 메가커피 반사이익 기대', url: 'https://zdnet.co.kr/view/?no=20260528164428' },
    ],
  },
  {
    brand: '이마트24',
    membership: 'partner',
    telcos: [{ id: 'lgu', label: 'LGU+', prog: '투쁠데이 (6월 미공개)', benefit: '할인·증정 쿠폰' }],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 5,
    negScore: 242,
    headline: [
      '6월 상반기 직접 이슈 없음 · 마곡프리미엄점 오픈 (8년 만의 리뉴얼 모델 첫 공개)',
      '이마트24 영업손실 179억 지속 · 로열티 전환 순차 적용 중 (~6.30) · 내실화 추진',
      '신세계 계열 낙수효과 약화 지속 — 스타벅스 불매 이후 연동 수혜 없음 확인',
    ],
    impact: 'LGU+ 투쁠데이 6월 미공개 · 신세계 계열 낙수효과 약화 확인 — 직접 제휴 노출 위험도 낮음',
    links: [
      { label: '신세계 계열 5·18 불매 확산', url: 'https://www.fnnews.com/news/202605240839526936' },
    ],
  },
  {
    brand: '설빙',
    membership: 'candidate',
    telcos: [],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'pos',
    dlSpike: null,
    news7d: 17,
    negScore: 0,
    headline: [
      '수박듬뿍화채설빙·과일흠뻑화채설빙 등 여름 신메뉴 4종 출시 (5.28~) · SNS 확산 중',
      '아이스디저트 여름 성수기 수요 급등 · DataLab 1.40 전월比 급상승 · 블로그 74만',
    ],
    impact: '여름 성수기 수요 급등 · 아이스디저트 카테고리 주목',
    links: [
      { label: '케이크 빙수·배달 공략 강화', url: 'https://www.mt.co.kr/living/2026/04/13/2026041323111089032' },
    ],
  },
];
