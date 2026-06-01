// 제휴사 이슈 레이더 데이터 — AIInsight.jsx 섹션 4 + Overview.jsx 이슈 카드 공유
// membership: 'partner'=현재 제휴 | 'candidate'=잠재 후보 | 'watchlist'=관심
// direction:  'neg'=부정 | 'pos'=긍정 | 'neu'=중립
// strength:   'strong'=강(긴급) | 'mid'=중(주목) | 'low'=약(모니터링)
export const trendSignals = [
  {
    brand: '스타벅스',
    membership: 'partner',
    telcos: [
      { id: 'skt', label: 'SKT', prog: 'Tday 5월 (종료)', benefit: '추첨 아메리카노 1잔' },
      { id: 'kt', label: 'KT', prog: '상시', benefit: '음료 무료 사이즈업' },
      { id: 'lgu', label: 'LGU+', prog: 'VIP콕', benefit: 'VIP 음료 무료 1잔' },
    ],
    strength: 'strong',
    sources: ['DataLab', '뉴스'],
    direction: 'neg',
    dlSpike: 2.18,
    news7d: 87,
    negScore: 945,
    headline: [
      '5·18 「탱크데이」 역사 폄훼 논란 → 손정현 대표 해임(5.19) · 정부 부처 이용 금지 확산',
      '5.27 기준 매출 84.7억↓(26.3% 감소) · 앱 신규 설치 23.6%↓ — 불매 실효 수치로 확인',
      '5.26 정용진 회장 대국민 사과 · 6.1~14 선불충전금 조건없이 전액 환불 발표 — 이슈 수습 시도 중',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT Tday 5월 종료 · 불매·매출급감 현실화, 6월 환불 이탈 가속화 우려',
    links: [
      { label: '일주일새 매출 84.7억↓ 26.3% 감소', url: 'https://www.fnnews.com/news/202605271455511416' },
      { label: '6.1~14 선불충전금 전액 환불 발표', url: 'https://www.news1.kr/industry/distribution/6177896' },
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
    news7d: 18,
    negScore: 246,
    headline: [
      '가맹점주 323명 부당이익 반환 소송(1월) · 공정위 과징금 23억(4월) — 소송 진행 중',
      '창업자 2세 경영 승계 논란 병행 — 지배구조 리스크 지속',
      '스타벅스 불매 반사이익 기대감 → 투썸·메가커피 언급 증가 (5.28~)',
    ],
    impact: 'KT 달달혜택 6월 미공개 · 소송·과징금 이슈 진행 중 · 스타벅스 반사이익 가능성 모니터링',
    links: [
      { label: '점주들 부당이익 반환 소송', url: 'https://biz.heraldcorp.com/article/10658005' },
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
    news7d: 12,
    negScore: 242,
    headline: [
      '스타벅스 5·18 불매 논란 → 신세계 계열 동반 언급 (5월 중순)',
      '이마트24 자체 직접 이슈 없음 — 신세계 계열 낙수효과 국한',
      '5.29 기준 신세계 불매 검색량 감소세 — 직접 영향 약화 중',
    ],
    impact: 'LGU+ 투쁠데이 6월 미공개 · 신세계 계열 낙수효과 약화 중 — 직접 제휴 노출 위험도 낮음',
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
      '5.28 여름 신메뉴 4종 출시 — 수박화채·과일화채·밀크팥메론·요거치즈메론 설빙',
      '벌집꿀수박·벌집꿀메론 신규 라인 추가 → 프리미엄·제철 라인업 강화',
      'SKT·KT·LGU+ 3사 모두 미제휴 — 여름 성수기 수요 급등 시점 선점 기회',
    ],
    impact: '3사 모두 미제휴 · 여름 시즌 수요 급등 중 — 선점 제휴 검토 타이밍',
    links: [
      { label: '케이크 빙수·배달 공략 강화', url: 'https://www.mt.co.kr/living/2026/04/13/2026041323111089032' },
    ],
  },
];
