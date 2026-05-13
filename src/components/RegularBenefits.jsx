export default function RegularBenefits() {
  return (
    <div className="sec" id="rg">
      <div className="sh">
        <span className="st">🎫 상시 혜택 비교</span>
        <span className="upd-badge upd-chg">⚡ 변경 시 업데이트</span>
      </div>

      <div className="cl2">🎬 영화관</div>
      <table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CGV</td><td>전 고객 최대 4,000원 할인 (11,000원↑)</td><td>전 등급 최대 5,000원 할인 (동반 3인, 월3회)</td><td>VVIP/VIP만 2D영화 최대 4,000원 할인</td></tr>
          <tr><td>메가박스</td><td>전 고객 최대 4,000원 할인</td><td>전 등급 최대 5,000원 할인</td><td className="wt">2026.01.01 종료</td></tr>
          <tr><td>롯데시네마</td><td className="wt">2026.02.01 종료</td><td>전 등급 최대 5,000원 할인</td><td className="na">미제공</td></tr>
        </tbody>
      </table>

      <div className="cl2">🥐 베이커리</div>
      <table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>파리바게뜨</td><td>VIP/Gold: 모바일 100원·플라스틱 50원 · Silver: 50원</td><td>VVIP/VIP/골드: 100원 · 일반: 50원</td><td>VVIP/VIP: 100원 · 이외: 50원</td></tr>
          <tr><td>뚜레쥬르</td><td>VIP/Gold: 150원 · Silver: 50원</td><td>VVIP/VIP/골드: 150원 · 일반: 100원</td><td>VVIP: 150원 · VIP: 100원 · 우수: 50원</td></tr>
        </tbody>
      </table>

      <div className="cl2">🍽️ 패밀리레스토랑</div>
      <table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>루덴시아 <span style={{ fontSize: '10px', color: 'var(--pos)', fontWeight: 700 }}>NEW</span></td>
            <td className="ht2">주중 50% · 주말 35% (2026.04.24 신규)</td>
            <td className="na">미제공</td>
            <td className="na">미제공</td>
          </tr>
          <tr><td>아웃백</td><td>VIP/Gold: 15% · Silver: 5%</td><td>VVIP/VIP/골드: 15% · 화이트/일반: 5%</td><td className="na">미제공</td></tr>
          <tr><td>VIPS</td><td>VIP/Gold: 15% · Silver: 5%</td><td>VVIP/VIP: 15% · Gold/일반: 5%</td><td>VIP: 15% · 우수: 5%</td></tr>
        </tbody>
      </table>

      <div className="cl2">🍕 피자</div>
      <table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>도미노</td><td>VIP: 30% · Gold/Silver: 20%</td><td>VVIP/VIP: 20% · Gold/일반: 15%</td><td className="na">미제공</td></tr>
          <tr><td>피자헛</td><td>VIP: 30% · Gold/Silver: 20%</td><td>전 등급: 15%</td><td>전 등급: 15%</td></tr>
        </tbody>
      </table>

      <div className="cl2">☕ 카페·디저트</div>
      <table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>배스킨라빈스</td><td>VIP: 싱글레귤러 50% · G/S: 30%</td><td className="na">미제공</td><td>쿼터 4,000원 할인</td></tr>
          <tr><td>스타벅스</td><td className="na">미제공</td><td className="na">미제공</td><td className="na">미제공</td></tr>
        </tbody>
      </table>

      <div className="cl2">🏪 편의점</div>
      <table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>GS25</td><td>전 등급: 매주 화요일 FF 200원</td><td>VVIP/VIP/골드: 100원 · 실버/일반: 50원 (일 최대 2만원)</td><td>VVIP/VIP: 100원 · 우수: 50원 (일 최대 2만원, 월 10만원)</td></tr>
          <tr><td>CU</td><td>VIP/Gold: 100원 · Silver: 50원</td><td>오전5~9시 간편식 200원 (일 1회, 월 2만원 한도)</td><td className="na">미제공</td></tr>
          <tr><td>세븐일레븐</td><td>VIP/Gold: 100원 · Silver: 50원</td><td className="na">미제공</td><td className="na">미제공</td></tr>
        </tbody>
      </table>
    </div>
  );
}
