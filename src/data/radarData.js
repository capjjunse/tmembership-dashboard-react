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
    strength: 'mid',
    sources: ['DataLab', '뉴스'],
    direction: 'neg',
    dlSpike: 2.18,
    news7d: 35,
    negScore: 945,
    headline: [
      '6.1~7 주간 결제금액 242억 (+12.8%) — 탱크데이 후 첫 반등 · 논란 전 321억 대비 79억 미달 (헤럴드경제)',
      '선물하기↑·결제액↓ 엇갈린 신호 · 불매 잦아드는 중 vs 지속 (6.5 ZDNet)',
      '6.1~14 선불충전금 전액 환불 접수 중 · 환불 종료 후 6월 말~7월 초가 여론 분수령',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT Tday 6월 미운영 · 환불 접수 중(~6.14) · 결제액 반등 조짐',
    links: [
      { label: '결제액 3주 만에 반등 · 탱크데이 후 최고', url: 'https://biz.heraldcorp.com/article/10768337' },
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
      '가맹점주 323명 차액가맹금 소송 진행 중 · 추가 소송 준비 · 공정위 과징금 23억(4월) 리스크 지속',
      '할메가커피 3종 가격 인상 발표 (6.4 EBN·KPI뉴스) — 깜깜이 인상·가격 꼼수 보도',
      '스타벅스 환불 마무리 후 반사이익 여부 모니터링 중',
    ],
    impact: 'KT 달달혜택 6월 미공개 · 가격 인상 발표·차액가맹금 소송·공정위 리스크 지속',
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
    news7d: 6,
    negScore: 242,
    headline: [
      '로열티 전환 효과 가시화 — 점포당 月 63만원 수익 증가 · 상생 성과 공식 발표 (6월 헤럴드경제 등)',
      '성수점 플래그십 오픈 (6.5~7.2) · 영업손실 지속 · 내실화 추진 중',
      '신세계 계열 낙수효과 약화 지속 — 스타벅스 불매 이후 연동 수혜 없음',
    ],
    impact: 'LGU+ 투쁠데이 6월 미공개 · 로열티 전환 내실화 진행 중 · 신규 이슈 없음',
    links: [
      { label: '신세계 계열 5·18 불매 확산', url: 'https://www.fnnews.com/news/202605240839526936' },
    ],
  },
  {
    brand: '깐부치킨',
    membership: 'candidate',
    telcos: [],
    strength: 'strong',
    sources: ['뉴스'],
    direction: 'pos',
    dlSpike: null,
    news7d: 50,
    negScore: 0,
    headline: [
      '젠슨 황·최태원 SK회장 6.7 깐부치킨 삼성점 재회동 · 치킨 시민·취재진 증정 (뉴시스·서울신문)',
      '재고 부족·직영 14곳 영업 중단 발생 · 전국 매장 수요 폭증',
      '2025년 매출 330억(+14%) · 영업이익 54억(+9.1%) 실적 성장 지속',
    ],
    impact: '3사 미제휴 · 젠슨 황 재방문으로 브랜드 인지도 정점 — 제휴 계약 타이밍 최적',
    links: [
      { label: '젠슨 황·최태원 깐부회동 재연 (6.7)', url: 'https://www.mt.co.kr/industry/2026/06/07/2026060718525916145' },
      { label: '깐부치킨 젠슨 효과 재고 부족·직영 14곳 영업 중단', url: 'https://www.msn.com/ko-kr/news/other/%EA%B9%90%EB%B6%80%EC%B9%98%ED%82%A8-%EC%A0%A0%EC%8A%A8-%ED%9A%A8%EA%B3%BC%EB%A1%9C-%EC%9E%AC%EA%B3%A0-%EB%B6%80%EC%A1%B1%EC%A7%81%EC%98%81-14%EA%B3%B3-%EC%98%81%EC%97%85-%EC%A4%91%EB%8B%A8-ytn-%EC%82%AC%EC%9D%B4%EC%96%B8%EC%8A%A4/vi-AA1PPF2Y' },
    ],
  },
  {
    brand: '피자헛',
    membership: 'partner',
    telcos: [
      { id: 'skt', label: 'SKT', prog: '상시', benefit: '[VIP] 30% 할인 · [G·S] 20% 할인' },
      { id: 'kt',  label: 'KT',  prog: '상시', benefit: '[VVIP·VIP] 20% 할인 · [G·일반] 15% 할인' },
      { id: 'lgu', label: 'LGU+', prog: '상시', benefit: '[전 등급] 15% 할인 (최대 3만원)' },
    ],
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 40,
    negScore: 380,
    headline: [
      '6.1 PH코리아 공식 출범 — 회생절차 마무리 · 윈터골드·케이클라비스 합작법인으로 운영 주체 전환',
      '차액가맹금 215억 반환 판결 확정(1.16 대법원) · 기존 가맹점주 소송 후속 처리 진행 중',
      '비효율 점포 정리·신규 출점 재정비 추진 — "다시 1위 간다" 선언 (뉴스1·헤럴드경제)',
    ],
    impact: 'SKT·KT·LGU+ 3사 상시 운영 중 · PH코리아 체제전환 후 제휴 지속성 모니터링 필요',
    links: [
      { label: 'PH코리아 공식 출범 — 회생 마무리 새 출발', url: 'https://www.newspim.com/news/view/20260601001155' },
      { label: '한국피자헛 6월부터 새출발 — 과거 위상 찾을까', url: 'https://inews24.com/view/1972597' },
    ],
  },
];
