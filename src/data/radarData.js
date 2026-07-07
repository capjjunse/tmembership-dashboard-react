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
    news7d: 10,
    negScore: 900,
    headline: [
      '극우 구매 운동 · 브랜드 이미지 이중 리스크',
      '결제액 반등 지속 · 불매 진정세 7주 경과',
      '충성고객 복귀 중 · 극우 낙인 리스크 지속',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT 미운영 · 극우 구매 운동 이중 리스크',
    links: [
      { label: '스타벅스 사태 언제 잦아들까 (Daum)', url: 'https://v.daum.net/v/20260528153705977' },
      { label: '스타벅스 불매 진정세 · 충성고객 돌아올까 (헤럴드경제)', url: 'https://biz.heraldcorp.com/article/10773500' },
    ],
  },
  {
    brand: '메가커피',
    membership: 'partner',
    telcos: [],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 5,
    negScore: 246,
    headline: [
      '메뉴 200원 인상 · 물가 동조 인상 지속',
      '점주 323명 차액가맹금 소송 · 공정위 23억 리스크',
      '스타벅스 결제 반등 · 반사이익 약화 지속',
    ],
    impact: '3사 미운영 · 가격 인상·차액가맹금 소송·공정위 리스크 지속',
    links: [
      { label: '점주 323명 차액가맹금 소송 · 추가 소송 준비 중', url: 'https://biz.heraldcorp.com/article/10658005' },
      { label: '메가커피·칠성사이다 값 오른다 (MBC 뉴스)', url: 'https://imnews.imbc.com/replay/2026/nwdesk/article/6832348_37004.html' },
    ],
  },
  {
    brand: '피자헛',
    membership: 'partner',
    telcos: [
      { id: 'skt', label: 'SKT', prog: '상시', benefit: '[VIP] 30% 할인 · [G·S] 20% 할인' },
      { id: 'kt',  label: 'KT',  prog: '상시', benefit: '[VVIP·VIP] 20% 할인 · [Gold/일반] 15% 할인' },
      { id: 'lgu', label: 'LGU+', prog: '상시', benefit: '[전 등급] 15% 할인 (최대 3만원)' },
    ],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neu',
    dlSpike: null,
    news7d: 10,
    negScore: 200,
    headline: [
      '5월 매출 40% 성장 · PH코리아 재출발 청신호',
      '새 로고 공개 · 재계약 78개 매장 간판 무상 지원',
      '점주 상생 비용 분담 논란 · 차액가맹금 이슈 지속',
    ],
    impact: 'SKT·KT·LGU+ 3사 상시 운영 중 · PH코리아 재출발 매출 반등 확인',
    links: [
      { label: '피자헛 재계약 매장 간판 무상 지원 (이투데이)', url: 'https://www.etoday.co.kr/news/view/2596222' },
      { label: '피자헛 새 로고 공개 (헤럴드경제)', url: 'https://biz.heraldcorp.com/article/10785333' },
    ],
  },
  {
    brand: '메가박스',
    membership: 'partner',
    telcos: [
      { id: 'skt', label: 'SKT', prog: '상시', benefit: '[전 등급] 최대 4,000원 할인 (11,000원 이상 예매 시)' },
      { id: 'kt',  label: 'KT',  prog: '상시', benefit: '[전 등급] 최대 6,000원 할인 (동반 4인)' },
    ],
    strength: 'strong',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 35,
    negScore: 850,
    headline: [
      '6.30 합병 최종 결렬 · 롯데시네마 MOU 해제',
      '카카오·토스페이 결제 중단 · 네이버만 유지',
      '배급사 정산금 회생채권화 · 영화계 초비상',
    ],
    impact: 'SKT·KT 상시 운영 중 · 합병 무산·결제 중단 · 7월 계약 유지 여부 모니터링',
    links: [
      { label: '롯데시네마·메가박스 합병 최종 결렬 (이투데이)', url: 'https://www.etoday.co.kr/news/view/2599276' },
      { label: '카카오·토스페이 결제 중단 (파이낸셜뉴스)', url: 'https://www.fnnews.com/news/202606191123223877' },
      { label: '배급사 정산금 회생채권화 · 영화계 초비상 (일간스포츠)', url: 'https://isplus.com/article/view/isp202606230114' },
    ],
  },
];
