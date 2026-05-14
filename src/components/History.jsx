export default function History() {
  return (
    <div className="sec" id="hs">
      <div className="sh">
        <span className="st">📋 혜택 변경 이력</span>
        <span className="upd-badge upd-chg">⚡ 변경 즉시 갱신</span>
      </div>
      <table className="ht">
        <thead>
          <tr>
            <th>날짜</th>
            <th>통신사</th>
            <th>프로그램</th>
            <th>내용</th>
            <th>유형</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2026.05.12</td>
            <td><span className="cb bl">LGU+</span></td>
            <td>U+멤버십 상시</td>
            <td>VIPS 상시 할인율 확인 (VIP 15%, 우수 5%) / 도미노 상시 미제공 확인</td>
            <td><span className="tb t신규">확인</span></td>
          </tr>
          <tr>
            <td>2026.05.11</td>
            <td><span className="cb bl">LGU+</span></td>
            <td>U+멤버십 상시</td>
            <td>굿웨어몰 10% 할인 종료 예정 (2026.06.30)</td>
            <td><span className="tb t종료">종료</span></td>
          </tr>
          <tr>
            <td>2026.05.11</td>
            <td><span className="cb bl">LGU+</span></td>
            <td>U+멤버십 상시</td>
            <td>26년 6월 신규 제휴사 추가 + 일부 제휴사 혜택 종료 예정</td>
            <td><span className="tb t신규">신규</span></td>
          </tr>
          <tr>
            <td>2026.04.30</td>
            <td><span className="cb bs">SKT</span></td>
            <td>VIP Pick</td>
            <td>T우주패스 9,900원 쿠폰 → 4,900원+5,000원 2종 분리 (8월 1일 적용)</td>
            <td><span className="tb t변경">변경</span></td>
          </tr>
          <tr>
            <td>2026.04.27</td>
            <td><span className="cb bs">SKT</span></td>
            <td>T멤버십 상시</td>
            <td>루덴시아 신규 제휴 — 주중 50%, 주말 35% (4.24~)</td>
            <td><span className="tb t신규">신규</span></td>
          </tr>
          <tr>
            <td>2026.04.27</td>
            <td><span className="cb bs">SKT</span></td>
            <td>T멤버십 상시</td>
            <td>매드포갈릭 할인율 하향 — V/G 20%→15%, S 10%→5% (6.1 적용)</td>
            <td><span className="tb t변경">변경</span></td>
          </tr>
          <tr>
            <td>2026.04.27</td>
            <td><span className="cb bs">SKT</span></td>
            <td>T멤버십 상시</td>
            <td>무탄 제휴 종료 (5.31)</td>
            <td><span className="tb t종료">종료</span></td>
          </tr>
          <tr>
            <td>2026.04.16</td>
            <td><span className="cb bl">LGU+</span></td>
            <td>U+멤버십 상시</td>
            <td>밀크T 네이버페이 월 할인한도 3만원→2만원 (2026.05.01 적용)</td>
            <td><span className="tb t변경">변경</span></td>
          </tr>
          <tr>
            <td>2026.02.01</td>
            <td><span className="cb bs">SKT</span></td>
            <td>T멤버십 상시</td>
            <td>롯데시네마 상시 제휴 종료 → CGV·메가박스 2관 체제 전환</td>
            <td><span className="tb t종료">종료</span></td>
          </tr>
          <tr>
            <td>2026.01.01</td>
            <td><span className="cb bl">LGU+</span></td>
            <td>U+멤버십 상시</td>
            <td>메가박스 상시 제휴 종료 → CGV 단관 체제 전환</td>
            <td><span className="tb t종료">종료</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
