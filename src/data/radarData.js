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
    news7d: 12,
    negScore: 945,
    headline: [
      '6.22 전국 2,160개점 오후 3시 조기 영업 종료 · 전 직원 역사 교육',
      '결제액 3주 만에 반등 (+12.8%) · 환불 6.14 종료 후 회복세',
      '6주째 불매 진정세 · 충성고객 복귀 여부 주목 · 7월 초 1차 분수령',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT Tday 7월 미운영 · 환불 종료 후 이미지 회복 조치 중',
    links: [
      { label: '전국 2,160개 매장 오후 3시 조기 영업 종료 (SBS)', url: 'https://news.sbs.co.kr/news/endPage.do?news_id=N1008622514' },
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
    news7d: 6,
    negScore: 246,
    headline: [
      '대표 메뉴 2,100→2,300원 인상 · 칠성사이다 등 물가 동조 인상',
      '점주 323명 차액가맹금 소송 · 공정위 과징금 23억 리스크',
      '스타벅스 결제 반등 · 메가커피 반사이익 약화 진행',
    ],
    impact: 'KT 달달혜택 7월 미공개 · 가격 인상·차액가맹금 소송·공정위 리스크 지속',
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
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 12,
    negScore: 380,
    headline: [
      '6.16 글로벌 4조원 매각 확정 · 얌브랜드→롱레인지캐피털',
      '6.1 PH코리아 공식 출범 · 김정은 초대 대표 "다시 1위 간다"',
      '차액가맹금 215억 반환 확정 · 가맹점주 소송 후속 처리 중',
    ],
    impact: 'SKT·KT·LGU+ 3사 상시 운영 중 · PH코리아 체제전환 후 제휴 지속성 모니터링 필요',
    links: [
      { label: 'PH코리아 공식 출범 · "다시 1위 간다" (뉴스핌 6.1)', url: 'https://www.newspim.com/news/view/20260601001155' },
      { label: '글로벌 피자헛 4조원 매각 확정 (한국경제 6.17)', url: 'https://www.hankyung.com/article/2026061706397' },
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
    news7d: 40,
    negScore: 850,
    headline: [
      'PG사 결제 중단 · 배급사 정산금 회생채권화 · 7월 핵심 리스크',
      '6.14 기업회생 신청 · 5년 연속 영업적자',
      '롯데시네마 합병 사실상 무산 · 중앙그룹 유동성 위기',
    ],
    impact: 'SKT·KT 상시 운영 중 · 기업회생 이후 제휴 계약 유지 여부 즉시 모니터링 필요',
    links: [
      { label: '메가박스중앙 6.14 기업회생 신청 (미디어오늘)', url: 'https://www.mediatoday.co.kr/news/articleView.html?idxno=335178' },
      { label: '배급사 정산금 회생채권화 · 영화계 초비상 (일간스포츠 6.23)', url: 'https://isplus.com/article/view/isp202606230114' },
      { label: '메가박스 진짜 위기는 7월에 온다 (무코)', url: 'https://muko.kr/movietalk/20328763' },
    ],
  },
  {
    brand: '깐부치킨',
    membership: 'candidate',
    telcos: [],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'pos',
    dlSpike: null,
    news7d: 10,
    negScore: 0,
    headline: [
      '6.7 젠슨 황·최태원, 깐부치킨 삼성점 재방문 — 테이블 코팅 작업 진행',
      '주요 언론 동시 보도 · 6월 치킨 브랜드평판 8위 상위권 진입',
      '버즈 진정세 진입 · 이슈 지속 효과 여부 모니터링 중',
    ],
    impact: 'SKT·KT·LGU+ 3사 미제휴 · 글로벌 버즈 진정세, 제휴 협상 시 홍보 효과 기대 가능',
    links: [
      { label: '젠슨 황·최태원 깐부치킨 재방문 (이데일리 6.7)', url: 'https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=01541606645479424' },
      { label: '"물 들어올 때 노 젓는다" 테이블 코팅 작업 (네이트뉴스 6.9)', url: 'https://news.nate.com/view/20260609n13229' },
    ],
  },
];
