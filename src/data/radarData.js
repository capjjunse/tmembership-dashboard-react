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
    news7d: 45,
    negScore: 945,
    headline: [
      '6.22 전국 2,160개점 오후 3시 조기 영업 종료 · 전 직원 역사 교육',
      '결제액 3주 만에 반등 (+12.8%) · 선불충전금 환불 6.14 종료',
      '불매 진정세 · 역사교육 후 여론 회복 추이 주목',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT Tday 6월 미운영 · 환불 종료 후 이미지 회복 조치 중',
    links: [
      { label: '전국 2,160개 매장 오후 3시 조기 영업 종료 (SBS)', url: 'https://news.sbs.co.kr/news/endPage.do?news_id=N1008622514' },
      { label: '결제액 3주 만에 반등 · 탱크데이 후 회복 조짐 (헤럴드경제)', url: 'https://biz.heraldcorp.com/article/10768337' },
      { label: '불매 진정세에도 여전히 한산 · 충성고객 돌아올까 (헤럴드경제 6.23)', url: 'https://biz.heraldcorp.com/article/10772459' },
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
    news7d: 10,
    negScore: 246,
    headline: [
      '점주 323명 차액가맹금 소송 · 공정위 과징금 23억 리스크',
      '할메가커피 3종 가격 인상 · 대표 메뉴 2,100→2,300원',
      '스타벅스 불매 진정 → 반사이익 효과 약화 예상',
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
    direction: 'neu',
    dlSpike: null,
    news7d: 6,
    negScore: 100,
    headline: [
      '6.12 월드컵 광화문 인근 매출 최대 59% 증가',
      '6월 OK캐쉬백 출범 · 포인트 5% 적립 이벤트',
      '경영주 로열티 전환 6.30까지 · 분배율 71% 개선형',
    ],
    impact: 'LGU+ 투쁠데이 6월 미공개 · 월드컵 특수 수혜 · 신규 부정 이슈 없음',
    links: [
      { label: '월드컵 광화문 인근 매출 최대 59% 증가 (인사이트)', url: 'https://www.insight.co.kr/news/558447' },
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
    news7d: 22,
    negScore: 380,
    headline: [
      '6.16 청산형 회생계획 인가 · 기존 법인 소멸 → PH코리아 전환',
      '차액가맹금 215억 반환 확정 · 가맹점주 소송 후속 처리 중',
      '글로벌 피자헛 4조원 매각 · 3분기 마무리 예정',
    ],
    impact: 'SKT·KT·LGU+ 3사 상시 운영 중 · PH코리아 체제전환 후 제휴 지속성 모니터링 필요',
    links: [
      { label: '청산형 회생계획 최종 인가 — 기존법인 소멸 (네이트뉴스 6.17)', url: 'https://news.nate.com/view/20260617n04315' },
      { label: 'PH코리아 초대 대표 김정은 내정 (뉴스핌 5.27)', url: 'https://www.newspim.com/news/view/20260527000117' },
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
    news7d: 55,
    negScore: 850,
    headline: [
      '6.23 서울회생법원 대표자 심문기일 진행',
      '6.14 기업회생 신청 · 5년 연속 영업적자',
      '롯데시네마 합병 사실상 무산 · 중앙그룹 유동성 위기',
    ],
    impact: 'SKT·KT 상시 운영 중 · 기업회생 이후 제휴 계약 유지 여부 즉시 모니터링 필요',
    links: [
      { label: '메가박스중앙 6.14 기업회생 신청 (미디어오늘)', url: 'https://www.mediatoday.co.kr/news/articleView.html?idxno=335178' },
      { label: '롯데시네마 합병 기존안 무산 수순 (뉴데일리 6.15)', url: 'https://biz.newdaily.co.kr/site/data/html/2026/06/15/2026061500096.html' },
      { label: '콘텐트리중앙 주권거래 정지 · 메가박스 동반 회생신청 (머니투데이 6.15)', url: 'https://www.mt.co.kr/stock/2026/06/15/2026061508302623507' },
    ],
  },
];
