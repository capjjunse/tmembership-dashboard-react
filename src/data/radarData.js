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
    strength: 'low',
    sources: ['DataLab', '뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 15,
    negScore: 850,
    headline: [
      '결제 2주 연속 반등 · 정점 대비 76%',
      '1500만 리워드 쿠폰 · 충성고객 복귀',
      '극우 구매 운동 이중리스크 지속',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT 미운영 · 불매 진정세 but 극우 구매 운동 이중리스크',
    links: [
      { label: '결제 2주 연속 반등 (파이낸셜뉴스)', url: 'https://www.fnnews.com/news/202606101449405726' },
      { label: '스타벅스 불매 진정세 · 충성고객 돌아올까 (헤럴드경제)', url: 'https://biz.heraldcorp.com/article/10772459' },
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
    news7d: 8,
    negScore: 246,
    headline: [
      '이물질 논란 반복 · 위생불감증 지적',
      '매출착시·오너 배당 772억 재무 우려',
      '차액가맹금 323명 소송 · 가격 인상',
    ],
    impact: '3사 미운영 · 이물질·재무 건전성·차액가맹금 복합 리스크',
    links: [
      { label: '이물질 논란 반복 위생관리 지적 (뉴스드림)', url: 'http://www.newsdream.kr/news/articleView.html?idxno=83229' },
      { label: '매출 6469억 착시·오너 배당잔치 (뉴스스페이스)', url: 'https://www.newsspace.kr/news/article.html?no=13451' },
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
    news7d: 8,
    negScore: 150,
    headline: [
      'PH코리아 6.1 출범 · 매출 40% 성장',
      '반값다 피자헛 7월 앱 전용 개편',
      '재계약 78개 매장 간판 무상 지원',
    ],
    impact: 'SKT·KT·LGU+ 3사 상시 운영 중 · PH코리아 재출발 안착 중',
    links: [
      { label: 'PH코리아 공식 출범 (뉴스핌)', url: 'https://www.newspim.com/news/view/20260601001155' },
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
    news7d: 25,
    negScore: 850,
    headline: [
      '영화인연대 정산금 보호 촉구 · 7.8',
      '합병 결렬 · 영화업계 연쇄 피해 우려',
      '회생채권 분류 · 중소 배급사 타격',
    ],
    impact: 'SKT·KT 상시 운영 중 · 회생절차·정산금 위기 · 계약 유지 여부 모니터링',
    links: [
      { label: '영화계 정산채권 보호 촉구 (파이낸셜뉴스)', url: 'https://www.fnnews.com/news/202607080818389170' },
      { label: '영화인연대 정산금 보호 요구 (이데일리)', url: 'https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=03522726645512552' },
      { label: '롯데시네마·메가박스 합병 최종 결렬 (이투데이)', url: 'https://www.etoday.co.kr/news/view/2599276' },
    ],
  },
];
