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
    dlSpike: null,
    news7d: 20,
    negScore: 870,
    headline: [
      '배재고 청룡기 응원가 논란 재점화',
      '결제 직전주比 +0.1% · 첫주比 5.9%↓',
      '극우 구매 운동 이중리스크 지속',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT 미운영 · 배재고 청룡기 논란으로 불매 재점화 리스크',
    links: [
      { label: '배재고 논란에 여론 추이 주목 (다음뉴스)', url: 'https://v.daum.net/v/20260702161500305' },
      { label: '결제 2주 연속 반등 (파이낸셜뉴스)', url: 'https://www.fnnews.com/news/202606101449405726' },
    ],
  },
  {
    brand: '메가커피',
    membership: 'partner',
    telcos: [
      { id: 'kt', label: 'KT', prog: '달달초이스 7월', benefit: '[전 등급] 아이스아메리카노 1천원 할인 (2매)' },
    ],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 25,
    negScore: 260,
    headline: [
      '할메가커피 200원 인상 · 2,300원 단행',
      '칠성사이다 동반 인상 · 업계 도미노',
      '매출 5.6배·배당 100% 재무 리스크',
    ],
    impact: 'KT 달달초이스 7월 운영 중 · SKT·LGU+ 미운영 · 가격 인상·재무 건전성 복합 리스크',
    links: [
      { label: '메가커피·칠성사이다 가격 인상 (MBC뉴스)', url: 'https://imnews.imbc.com/replay/2026/nwtoday/article/6832436_37012.html' },
      { label: '매출 5.6배·배당 100% 재무 리스크 (자본시장뉴스)', url: 'https://www.jabon.co.kr/news/articleView.html?idxno=3621' },
    ],
  },
  {
    brand: '피자헛',
    membership: 'partner',
    telcos: [
      { id: 'skt', label: 'SKT', prog: '상시', benefit: '[VIP] 30% 할인 · [G·S] 20% 할인' },
      { id: 'kt',  label: 'KT',  prog: '상시', benefit: '[전 등급] 15% 할인' },
      { id: 'lgu', label: 'LGU+', prog: '상시', benefit: '[전 등급] 15% 할인 (최대 3만원)' },
    ],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neu',
    dlSpike: null,
    news7d: 8,
    negScore: 150,
    headline: [
      'PH코리아 브랜드 전면 개편 진행 중',
      '수퍼슈프림 등 오리지널 메뉴 라인 부활',
      '78개 매장 간판 무상 지원 · 재건 추진',
    ],
    impact: 'SKT·KT·LGU+ 3사 상시 운영 중 · PH코리아 재출발 안착 중',
    links: [
      { label: 'PH코리아 공식 출범 (뉴스핌)', url: 'https://www.newspim.com/news/view/20260601001155' },
      { label: '피자헛 재건 초대 대표 김정은 취임 (뉴스핌)', url: 'https://www.newspim.com/news/view/20260527000117' },
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
    news7d: 30,
    negScore: 870,
    headline: [
      '문체부 영화계 지원 논의 착수',
      '위탁상영관 위기 · 회생채권 분류',
      '영화인연대 정산채권 보호 촉구',
    ],
    impact: 'SKT·KT 상시 운영 중 · 회생절차·정산금 위기 · 계약 유지 여부 모니터링',
    links: [
      { label: '영화계 정산채권 보호 촉구 (파이낸셜뉴스)', url: 'https://www.fnnews.com/news/202607080818389170' },
      { label: '문체부 영화계 지원 논의 (이데일리)', url: 'https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=05628486645513208' },
      { label: '롯데시네마·메가박스 합병 최종 결렬 (이투데이)', url: 'https://www.etoday.co.kr/news/view/2599276' },
    ],
  },
  {
    brand: '60계치킨',
    membership: 'candidate',
    telcos: [],
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 30,
    negScore: 280,
    headline: [
      '닭근위 튀김 논란 · 7.5 사과문 게재',
      '60마리 새기름 콘셉트 신뢰도 타격',
      '치킨 3만원 시대 · 가격 부담 가중',
    ],
    impact: '3사 미제휴 · 닭근위 품질 논란으로 브랜드 이미지 타격, 제휴 타이밍 재검토 필요',
    links: [
      { label: "'닭근위 튀김' 논란 사과 (시애틀엔)", url: 'https://www.seattlen.com/focus/15519' },
    ],
  },
];
