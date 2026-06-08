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
    news7d: 45,
    negScore: 945,
    headline: [
      '불매 잦아드는 신호 vs 지속 — 선물하기↑·결제액↓ 엇갈린 신호 (6.5 ZDNet) · 환불 6.14 마무리',
      '5월 결제액 1211억 (4월比 107억↓) — 논란 2주만에 감소 규모 재확인 (6.4 뉴시스)',
      '6.1~14 선불충전금 전액 환불 진행 중 · 카드깡 후기 등장 우려 · 탱크데이 불매 계속',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT Tday 6월 미운영 · 환불 접수 중(~6.14) · 결제액 107억↓ 확인',
    links: [
      { label: '결제액 주간 80억↓ · 321억→236억 감소', url: 'https://imnews.imbc.com/replay/2026/nwdesk/article/6825701_37004.html' },
      { label: '6.1~14 선불충전금 4,276억 전액 환불 접수 중', url: 'https://imnews.imbc.com/replay/2026/nwdesk/article/6826848_37004.html' },
    ],
  },
  {
    brand: '메가커피',
    membership: 'partner',
    telcos: [{ id: 'kt', label: 'KT', prog: '달달혜택 (6월 미공개)', benefit: '커피 쿠폰 증정' }],
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 25,
    negScore: 246,
    headline: [
      '6.19~ 할메가커피 3종 200원 가격 인상 · 깜깜이 인상·가격 꼼수 단독 보도 (6.4 EBN·KPI뉴스·파이낸셜뉴스)',
      '가맹점주 323명 차액가맹금 소송 진행 중 · 추가 소송 준비 중 · 공정위 과징금 23억(4월)',
      '스타벅스 환불 이후 반사이익 기대 — 6월 방문자 증가 추세 확인 중',
    ],
    impact: 'KT 달달혜택 6월 미공개 · 가격 인상 부정 이슈 추가 · 차액가맹금 소송·공정위 리스크 지속',
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
    news7d: 8,
    negScore: 242,
    headline: [
      '로열티 전환 효과 가시화 — 점포당 月 63만원 수익 증가 · 상생 성과 공식 발표 (6월 헤럴드경제 등)',
      '성수점 플래그십 오픈 (6.5~7.2) · 영업손실 지속 · 내실화 추진 중',
      '신세계 계열 낙수효과 약화 지속 — 스타벅스 불매 이후 연동 수혜 없음',
    ],
    impact: 'LGU+ 투쁠데이 6월 미공개 · 로열티 전환 효과 확인 — 내실화 진행 중',
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
      '수박듬뿍화채설빙·과일흠뻑화채설빙 등 여름 신메뉴 4종 출시 (5.28~) · SNS 확산 지속',
      '아이스디저트 여름 성수기 수요 급등 · DataLab 1.51로 급상승 · 블로그 74만 · 카페 26만',
    ],
    impact: '여름 성수기 수요 급등 · DataLab 1.51 급상승 · 아이스디저트 카테고리 주목',
    links: [
      { label: '케이크 빙수·배달 공략 강화', url: 'https://www.mt.co.kr/living/2026/04/13/2026041323111089032' },
    ],
  },
  {
    brand: '깐부치킨',
    membership: 'candidate',
    telcos: [],
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'pos',
    dlSpike: null,
    news7d: 30,
    negScore: 0,
    headline: [
      '젠슨 황 재방한 기대감 확산 — 외식업계 깐부치킨 브랜드 효과 재주목 (6.2 다음뉴스·네이트뉴스)',
      '2025년 매출 330억(전년比 14%↑) · 영업이익 54억(9.1%↑) 실적 성장 지속',
      '젠슨 효과 재고 부족·직영 14곳 영업 중단 이력 · DataLab 1.36 급상승',
    ],
    impact: '3사 미제휴 · 젠슨 황 효과로 브랜드 인지도 급상승 → 제휴 계약 타이밍 주목',
    links: [
      { label: '젠슨 황 재방한 — 제2의 깐부치킨 어디냐', url: 'https://v.daum.net/v/4MYrijrNjh' },
    ],
  },
];
