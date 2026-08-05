// 제휴사 이슈 레이더 데이터 — AIInsight.jsx 섹션 4 + Overview.jsx 이슈 카드 공유
// membership: 'partner'=현재 제휴 | 'candidate'=잠재 후보 | 'watchlist'=관심
// direction:  'neg'=부정 | 'pos'=긍정 | 'neu'=중립
// strength:   'strong'=강(긴급) | 'mid'=중(주목) | 'low'=약(모니터링)
// updated:    이번 실행에서 신규 진입했거나 headline/strength/direction이 바뀐 항목만 true — 위젯·카드 빨간 표시(.upd)에 사용. 매 실행 시작 시 전부 false로 초기화 후, 변경분만 true로 마크.
export const trendSignals = [
  {
    brand: '스타벅스',
    membership: 'partner',
    updated: true,
    telcos: [
      { id: 'kt',  label: 'KT',   prog: '상시',  benefit: '[전 등급] 사이즈업' },
      { id: 'lgu', label: 'LGU+', prog: 'VIP콕', benefit: '[VVIP] 아메리카노 1잔 무료 / [VIP] 더블 사이즈업 무료' },
    ],
    strength: 'mid',
    sources: ['DataLab', '뉴스'],
    direction: 'pos',
    dlSpike: null,
    news7d: 8,
    negScore: 870,
    headline: [
      '독립유공자 특별 기부 · 앱설치 회복',
      '신뢰 회복 국면 · 27주년 캠페인',
      '결제액 -24% → 회복세 전환',
    ],
    impact: 'KT 상시·LGU+ VIP콕 운영 중 · SKT 미운영 · 독립유공자 기부·앱설치 회복세 — 신뢰 회복 국면 진입',
    links: [
      { label: '신뢰 되찾기 나선다 (한국금융신문)', url: 'https://www.fntimes.com/html/view.php?ud=202607291117153685b5b890e35c_18' },
      { label: '커피 앰배서더 2026 선발 (신세계뉴스룸)', url: 'https://www.shinsegaegroupnewsroom.com/starbucks-coffee-ambassador-2026-award/' },
    ],
  },
  {
    brand: '메가커피',
    membership: 'watchlist',
    updated: true,
    telcos: [],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neu',
    dlSpike: null,
    news7d: 8,
    negScore: 260,
    headline: [
      '브랜드평판 1위 유지 · 부정이슈 잠잠',
      '가격 인상 후 소비자 반응 안정화',
      '공정위 과징금 23억 처분 완료',
    ],
    impact: '3사 미운영 · 가격 인상 이후 부정 이슈 소강 — 브랜드 평판 1위 유지, 재제휴 모니터링',
    links: [
      { label: '메가커피·칠성사이다 가격 인상 (MBC뉴스)', url: 'https://imnews.imbc.com/replay/2026/nwtoday/article/6832436_37012.html' },
      { label: '커피전문점 브랜드평판 1위 (네이트뉴스)', url: 'https://m.news.nate.com/view/20260605n13850' },
    ],
  },
  {
    brand: '피자헛',
    membership: 'partner',
    updated: false,
    telcos: [
      { id: 'skt', label: 'SKT', prog: '상시', benefit: '[VIP] 30% 할인 · [G·S] 20% 할인' },
      { id: 'kt',  label: 'KT',  prog: '상시', benefit: '[전 등급] 15% 할인' },
      { id: 'lgu', label: 'LGU+', prog: '상시', benefit: '[전 등급] 15% 할인 (최대 3만원)' },
    ],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'pos',
    dlSpike: null,
    news7d: 3,
    negScore: 80,
    headline: [
      'PH코리아 동일매장 매출 20%↑ 성장세',
      '수퍼슈프림 등 오리지널 메뉴 라인 부활',
      '78개 매장 간판 무상 지원 · 재건 추진',
    ],
    impact: 'SKT·KT·LGU+ 3사 상시 운영 중 · PH코리아 출범 후 매출 회복세, 재건 안착 중',
    links: [
      { label: 'PH코리아 공식 출범 (뉴스핌)', url: 'https://www.newspim.com/news/view/20260601001155' },
      { label: '피자헛 재건 초대 대표 김정은 취임 (뉴스핌)', url: 'https://www.newspim.com/news/view/20260527000117' },
    ],
  },
  {
    brand: '메가박스',
    membership: 'partner',
    updated: true,
    telcos: [
      { id: 'skt', label: 'SKT', prog: '상시', benefit: '[전 등급] 최대 4,000원 할인 (11,000원 이상 예매 시)' },
      { id: 'kt',  label: 'KT',  prog: '상시', benefit: '[전 등급] 최대 6,000원 할인 (동반 4인)' },
    ],
    strength: 'mid',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 15,
    negScore: 870,
    headline: [
      '채권신고 8.5~9.1 개시 · 배급금 150억',
      '관리인 현 대표 간주 · 정상 운영',
      '돌비시네마 8월 라인업 · 영업 지속',
    ],
    impact: 'SKT·KT 상시 운영 중 · 채권 신고기간(8.5~9.1) 진행 중 · 배급대금 미지급 150억 — 회생계획안 12.1까지 제출',
    links: [
      { label: '채권신고 지원 영진위 안내 (씨네플레이)', url: 'https://www.cineplay.co.kr/ko-kr/articles/28939' },
      { label: '문체부 영화계 지원 논의 (이데일리)', url: 'https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=05628486645513208' },
      { label: '회생절차 개시결정 (디지털투데이)', url: 'https://www.digitaltoday.co.kr/news/articleView.html?idxno=682917' },
    ],
  },
  {
    brand: '설빙',
    membership: 'watchlist',
    updated: false,
    telcos: [],
    strength: 'low',
    sources: ['뉴스'],
    direction: 'neg',
    dlSpike: null,
    news7d: 5,
    negScore: 580,
    headline: [
      '장갑 그대로 배수구 청소→빙수 제조 영상',
      '공식 사과 · 전 매장 특별점검 발표 (7.20)',
      '행주 장갑 빙수 토핑 · 후폭풍 진정세',
    ],
    impact: '3사 미제휴 · 위생 논란 공식 사과(7.20) 후 전 매장 특별점검 완료, 진정세 — 제휴 재개 보류',
    links: [
      { label: '빙수 만들던 장갑으로 배수구 청소 (파이낸셜뉴스)', url: 'https://www.fnnews.com/news/202607200627262588' },
      { label: '공식 사과·전 매장 특별점검 (뉴스핌)', url: 'https://www.newspim.com/news/view/20260720001064' },
      { label: '걸레 만진 장갑 빙수 토핑 후폭풍 지속 (헤럴드경제)', url: 'https://biz.heraldcorp.com/article/10815942' },
    ],
  },
];
