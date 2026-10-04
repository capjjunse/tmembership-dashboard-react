// 자동 업데이트 S11에서 매 실행마다 갱신
export const UPDATE_DATE = '2026.10.05';
export const updateItems = [
  // ↓ .upd span이 존재하는 섹션만 포함. 없는 섹션은 제외.
  { section: '#mo', label: '월간혜택', desc: 'KT 달달혜택 10월 공개 — 피자·테마파크·문화 3트랙 (에버랜드·서울랜드·뮤지컬 헬스키친 등)' },
  { section: '#vp', label: 'VIP 혜택', desc: 'SKT VIP Pick 카페 — 폴바셋·잠바주스 → 배달의민족(파리바게뜨) 1만원 할인으로 교체' },
  { section: '#nw', label: '뉴스', desc: 'SKT AI 기반 10월 T멤버십 구성 기사 · LGU+ 10월 유플투쁠 기사 신규' },
  { section: '#sn', label: '고객반응', desc: 'SKT VIP픽 10월 긍정 반응(10.01) · KT 달달혜택 부정 3건(10.01) 신규 — 8건 NEW' },
  { section: '#ai-matrix', label: '경쟁 매트릭스', desc: 'SKT↔LGU+ 백미당·투썸플레이스 10월 Week혜택 vs 투쁠데이 비교 신규' },
  { section: '#ai-nontelecom', label: '비통신 비교', desc: '외식·카페 · 카셰어링·렌터카 T멤버십 우위 카테고리 갱신 (VIP Pick 10월 반영)' },
  { section: '#ai-recommend', label: '신규 제휴 추천', desc: 'BHC치킨(DataLab 1.32·세무조사 리스크) · 엽기떡볶이 · 봉구스밥버거 10월 신규 추천' },
  { section: '#ov', label: '핵심동향', desc: 'KT 달달혜택 10월 공개 반영 · 3사 매트릭스 현황 최신화 (skt-lgu 2종 동급)' },
];
