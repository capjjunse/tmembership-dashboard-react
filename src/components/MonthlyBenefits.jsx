export default function MonthlyBenefits() {
  return (
    <div className="sec" id="mo">
      <div className="sh">
        <span className="st">🎁 이달의 월별 혜택</span>
        <span className="ss">2026년 5월</span>
        <span className="upd-badge upd-chg">⚡ 주별 확인</span>
      </div>
      <div className="m3">
        <div className="mc">
          <div className="mch ms">
            <span>SKT — T day + 0 week</span>
            <a href="https://sktmembership.tworld.co.kr/mps/pc-bff/program/tday.do" target="_blank" rel="noreferrer" className="mlink">T day →</a>
          </div>
          <div className="mcb">
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: 'var(--skt)' }}></span>T day — 2주차 (5.13~5.15)</div>
              <ul className="mblist">
                <li>버거킹 와퍼 단품 40% 할인 (VIP 55%)</li>
                <li>뚜레쥬르 1,000원당 300원/P 할인·적립</li>
                <li>공차 인기음료 6종(L) 50% 할인·적립</li>
                <li>이니스프리 5,000원 추가 할인 + 뷰티포인트 2,000P</li>
              </ul>
            </div>
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: '#9944ff' }}></span>VIP Only 찬스 (5.13~15) — VIP 전용</div>
              <ul className="mblist">
                <li>버거킹 와퍼 단품 55% 할인</li>
              </ul>
            </div>
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: '#ff6600' }}></span>5월 이벤트</div>
              <ul className="mblist">
                <li>루덴시아 신규 제휴 (주중 50%, 주말 35%)</li>
                <li>투루카 카셰어링 65% (5.4~5.31)</li>
                <li>고향사랑기부제 위기브 (5.6~6.30)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mc">
          <div className="mch mk">
            <span>KT — 달달혜택</span>
            <a href="https://membership.kt.com/discount/benefit/DaldalBenefit.do" target="_blank" rel="noreferrer" className="mlink">달달혜택 →</a>
          </div>
          <div className="mcb">
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: 'var(--kt)' }}></span>달달초이스 (택1) — 5.15~말일</div>
              <ul className="mblist">
                <li>롯데마트 모바일 금액권 6천원</li>
                <li>파스쿠찌 홀케이크 1만원 할인 (3.1만원↑)</li>
                <li style={{ color: 'var(--tx3)', fontSize: '10px' }}>※ 전체 라인업 5.15 이후 공개</li>
              </ul>
            </div>
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: '#ff4444' }}></span>달달스페셜 — 패밀리컬렉션 (5.15~)</div>
              <ul className="mblist">
                <li>빕스 40% (15~21일) / 명륜진사갈비 5,000원</li>
                <li>더플레이스 40% (15~25일) / 쉐이크쉑 1+1</li>
                <li>롯데면세점·아고다·그리팅·원스토어</li>
                <li>스타벅스 무료음료</li>
              </ul>
            </div>
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: '#bb0000' }}></span>달달찬스 · Y혜택</div>
              <ul className="mblist">
                <li>블루보틀 커피 당첨 이벤트 (5.4~5.31)</li>
                <li>Y혜택: 스타벅스 사이즈업 쿠폰</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mc">
          <div className="mch ml">
            <span>LGU+ — 유플투쁠</span>
            <a href="https://www.lguplus.com/benefit-plus" target="_blank" rel="noreferrer" className="mlink">유플투쁠 →</a>
          </div>
          <div className="mcb">
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: 'var(--lgu)' }}></span>투쁠데이 — 오전 11시 선착순</div>
              <ul className="mblist">
                <li>5.12 공차 50% / 카카오웹툰 / 아쿠아플라넷 40%</li>
                <li>5.14 피자헛 55% / 배민×이삭토스트 / 씨네Q</li>
                <li>5.20 배스킨·CGV / 5.21 다이소·쿠팡이츠×GS25</li>
                <li>5.22 이마트24·매드포갈릭·스파크랜드·서울랜드</li>
              </ul>
            </div>
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: '#dd44aa' }}></span>스페셜데이 — 전 등급</div>
              <ul className="mblist">
                <li>5.18 스타벅스·카카오페이지·그리팅·교보문고</li>
                <li>5.19 파리바게뜨·컬리·하프클럽</li>
                <li>5.20 배스킨·CGV·스타벅스·밀리의서재</li>
              </ul>
            </div>
            <div className="mblk">
              <div className="mbtit"><span className="mbdot" style={{ background: '#ff55cc' }}></span>장기고객데이 — 5년 이상 VIP · 5.28(목)</div>
              <ul className="mblist">
                <li>CGV 관람권 / NOL티켓 / 윌라 1개월 무료</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
