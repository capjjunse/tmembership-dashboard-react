// 자동 업데이트 S11에서 매 실행마다 갱신
export const UPDATE_DATE = '2026.10.05';
export const updateItems = [
  // ↓ .upd span이 존재하는 섹션만 포함. 없는 섹션은 제외.
  { section: '#mo', label: '월간혜택', desc: 'KT 달달혜택 10월 공개 — 피자·테마파크·문화 3트랙 (에버랜드·서울랜드·뮤지컬 헬스키친 등)' },
  { section: '#sn', label: '고객반응', desc: 'SKT 영위크·T데이 반응(10.05 최신) · KT 달달혜택 만족/불만 혼재 · LGU+ 유플투쁠 호평 — 16건 NEW' },
  { section: '#ai-nontelecom', label: '비통신 비교', desc: '외식·카페 T멤버십 우위 — 배달의민족(파리바게뜨) VIP Pick 10월 반영' },
  { section: '#ai-radar', label: '이슈 레이더', desc: '스타벅스·메가커피·메가박스·BHC치킨 — 4건 갱신' },
  { section: '#ov', label: '핵심동향', desc: '고객반응 비율 갱신 — SKT 긍정 69%·31%, LGU+ 긍정 64%·부정 27%·중립 9%' },
];
