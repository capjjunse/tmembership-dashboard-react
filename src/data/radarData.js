// 제휴사 이슈 레이더 데이터 — AIInsight.jsx 섹션 4 + Overview.jsx 이슈 카드 공유
// membership: 'partner'=현재 제휴 | 'candidate'=잠재 후보 | 'watchlist'=관심
// direction:  'neg'=부정 | 'pos'=긍정 | 'neu'=중립
// strength:   'strong'=강(긴급) | 'mid'=중(주목) | 'low'=약(모니터링)
export const trendSignals = [
  {
    brand: '스타벅스',
    membership: 'partner',
    telcos: [
      { id: 'kt', label: 'KT', prog: '상시', benefit: '음료 무료 사이즈업' },
      { id: 'skt', label: 'SKT', prog: 'Tday 5월', benefit: '추첨 아메리카노 1잔' },
      { id: 'lgu', label: 'LGU+', prog: 'VIP콕', benefit: 'VIP 음료 무료 1잔' },
    ],
    strength: 'strong',
    sources: ['DataLab', '뉴스'],
    direction: 'neg',
    dlSpike: 2.18,
    news7d: 100,
    negScore: 945,
    headline: [
      '5·18 기념일 「탱크데이」 마케팅 진행 → SNS서 역사 폄훼 논란으로 확산',
      '불매운동 캠페인 시작 — 일주일새 뉴스 100건↑·DataLab 검색 2.18배 급등',
      '여야 국회 공방·정부 포상 취소 검토 → 지방선거 최대 이슈로 번짐',
    ],
    impact: 'KT 상시·SKT Tday 5월·LGU+ VIP콕 3사 모두 운영 중 · 불매운동 지속 시 혜택 활용률 저하 가능',
    links: [
      { label: '5·18 폄훼 논란·포상 취소 검토', url: 'https://www.fnnews.com/news/202605240839526936' },
      { label: '여야 공방·선거 최대 변수', url: 'https://imnews.imbc.com/replay/2026/nwdesk/article/6825095_37004.html' },
    ],
  },
  {
    brand: '메가커피',
    membership: 'partner',
    telcos: [{ id: 'kt', label: 'KT', prog: '달달혜택 5월', benefit: '커피 쿠폰 증정' }],
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 100,
    negScore: 246,
    headline: [
      '가맹점주들 부당이익 반환 소송 제기 — 본사 수익 독식 구조 공론화',
      '공정거래위원회 과징금 22억 부과 → 가맹사업법 위반 공식 확인',
      '창업자 2세 경영 승계 논란 병행 — 지배구조 리스크 동시 부각',
    ],
    impact: 'KT 달달혜택 월간 운영 중 — 이슈 기간 운영 중복 시 모니터링 필요',
    links: [
      { label: '점주들 부당이익 반환 소송', url: 'https://biz.heraldcorp.com/article/10658005' },
      { label: '본사만 돈잔치·점주 뿔났다', url: 'https://www.hankyung.com/article/202604229149g' },
    ],
  },
  {
    brand: '이마트24',
    membership: 'partner',
    telcos: [{ id: 'lgu', label: 'LGU+', prog: '투쁠데이 5월', benefit: '할인·증정 쿠폰' }],
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 100,
    negScore: 242,
    headline: [
      '스타벅스 5·18 불매 논란 → 신세계 계열 전체 동반 언급 급증',
      '이마트24 자체 직접 이슈는 없음 — 계열사 이미지 낙수효과',
      'LGU+ 투쁠데이 5월 운영 중 — 제휴 노출과 논란 연관 여부 모니터링 필요',
    ],
    impact: 'LGU+ 투쁠데이 5월 운영 중 · 스타벅스 논란 연관 노출 — 직접 이슈 여부 별도 확인 권장',
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
      '여름 빙수 신메뉴 4종 출시 — 케이크 빙수 등 프리미엄 라인 강화',
      '배달 채널 집중 공략 → 반경 외 신규 수요층 확보 중',
      'SKT·KT·LGU+ 3사 모두 미제휴 — 여름 성수기 전 선점 타이밍',
    ],
    impact: '3사 모두 미제휴 · 여름 시즌 수요 급등 중 — 선점 제휴 검토 타이밍',
    links: [
      { label: '케이크 빙수·배달 공략 강화', url: 'https://www.mt.co.kr/living/2026/04/13/2026041323111089032' },
    ],
  },
];
