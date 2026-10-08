// 자동 업데이트 S11에서 매 실행마다 갱신
export const UPDATE_DATE = '2026.10.08';
export const updateItems = [
  // ↓ .upd span이 존재하는 섹션만 포함. 없는 섹션은 제외.
  { section: '#mo', label: '월간혜택', desc: 'Young week(10.5~9) 13종 · Day 1(10.12~16) AI Week 12종 공개' },
  { section: '#sn', label: '고객반응', desc: 'SKT 렌터카·T데이, KT 이마트24 중복할인, LGU+ 이마트24 신규 반응 5건 추가' },
  { section: '#ai-matrix', label: '경쟁 매트릭스', desc: '10월 매트릭스 갱신 · SKT↔LGU+ 2종 동급, SKT×KT 겹치는 브랜드 없음' },
  { section: '#ai-radar', label: '이슈 레이더', desc: '스타벅스·메가커피·메가박스·GS25·매머드커피·BHC치킨 이슈 갱신 (6종)' },
  { section: '#ai-market', label: '마켓 시그널', desc: '영화 암살자들 불매운동·플랫폼 멤버십 경쟁 등 신규 토픽 5개 등장' },
  { section: '#ov', label: '핵심동향', desc: 'SKT Day 1 AI Week · 경쟁 매트릭스 KT 비교 + 고객반응 비율(SKT 69%·LGU+ 64%) 갱신' },
];
