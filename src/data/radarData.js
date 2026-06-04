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
    news7d: 70,
    negScore: 945,
    headline: [
      '6.1~14 선불충전금 전액 환불 접수 중 · 주간 결제액 321억→236억(80억↓) · 카카오톡 선물하기 1위→5위 밖',
      '불매 실효 지속 — 매출 84.7억↓(26.3% 감소) · 앱 신규 설치 23.6%↓ 수치로 확인됨',
      '협력업체 발주 끊기고 매출 타격 확산 (5.29 뉴시스) · 환불 4,276억 규모 이탈',
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
    news7d: 15,
    negScore: 246,
    headline: [
      '가맹점주 323명 차액가맹금 소송 진행 중 · 추가 소송 준비 중 · 공정위 과징금 23억(4월)',
      '스타벅스 선불충전금 환불로 투썸·메가커피 반사이익 기대 — 6월 방문자 증가 추세',
      '전국 4,200호점 돌파 · KT 달달혜택 6월 미공개 — 반사이익 실현 시 제휴 강화 여부 주목',
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
    news7d: 8,
    negScore: 242,
    headline: [
      '신세계 계열 불매 검색량 감소세 지속 · 이마트24 직접 이슈 없음',
      '이마트24 영업손실 179억 지속 · 로열티 전환·내실화 추진 중 (2026년 상반기)',
      '스타벅스 불매 이후 신세계 계열 연동효과 약화 확인 — 직접 제휴 리스크 낮음',
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
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'pos',
    dlSpike: null,
    news7d: 22,
    negScore: 0,
    headline: [
      '6월 여름 성수기 본격 진입 · 수박화채·메론빙수 SNS 확산 중 · 성수기 특가 진행',
      '여름 신메뉴 라인업(수박화채·과일화채·밀크팥메론 등) 출시 · DataLab 트렌드 1.28 상승',
      '3사 모두 미제휴 · SKT VIP Pick 2026.07 계약 예정 — 여름 성수기 직전 제휴 임박',
    ],
    impact: '3사 모두 미제휴 · 여름 성수기 수요 급등 · SKT VIP Pick 7월 예정 — 시즌 제휴 연계 타이밍',
    links: [
      { label: '케이크 빙수·배달 공략 강화', url: 'https://www.mt.co.kr/living/2026/04/13/2026041323111089032' },
    ],
  },
];
