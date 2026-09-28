function G({ t }) {
  const parts = t.split(/ · (?=\[)/);
  if (parts.length === 1) return t;
  return <>{parts.map((p, i) => <span key={i}>{i > 0 && <br/>}{p}</span>)}</>;
}

export default function RegularBenefits() {
  return (
    <div className="sec" id="rg">
      <div className="sh">
        <span className="st">🎫 상시 혜택 비교</span>

      </div>

      <div className="cl2">🎬 영화관</div>
      <div className="tbl-wrap"><table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>CGV</td><td><G t="[전 등급] 최대 4,000원 할인 (11,000원 이상 예매 시)"/></td><td><G t="[전 등급] 최대 5,000원 할인 (동반 4인)"/></td><td>[전 등급] 2D영화 최대 5,000원 할인</td></tr>
          <tr><td>메가박스</td><td><G t="[전 등급] 최대 4,000원 할인 (11,000원 이상 예매 시)"/></td><td><G t="[전 등급] 최대 6,000원 할인 (동반 4인)"/></td><td className="na">미제공</td></tr>
          <tr><td>롯데시네마</td><td className="na">미제공</td><td><G t="[전 등급] 최대 5,000원 할인"/></td><td className="na">미제공</td></tr>
        </tbody>
      </table></div>

      <div className="cl2">🥐 베이커리</div>
      <div className="tbl-wrap"><table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>파리바게뜨</td><td><G t="[VIP/Gold] 모바일 100원·플라스틱 50원 할인 · [Silver] 50원 할인"/></td><td><G t="[VVIP/VIP/골드] 100원 할인 · [일반] 50원 할인"/></td><td><G t="[VVIP/VIP] 100원 할인 · [우수] 50원 할인"/></td></tr>
          <tr><td>뚜레쥬르</td><td><G t="[VIP/Gold] 150원 할인 · [Silver] 50원 할인"/></td><td><G t="[VVIP/VIP/골드] 150원 할인 · [일반] 100원 할인"/></td><td><G t="[VVIP] 150원 할인 · [VIP] 100원 할인 · [우수] 50원 할인"/></td></tr>
        </tbody>
      </table></div>

      <div className="cl2">🎢 테마파크</div>
      <div className="tbl-wrap"><table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>에버랜드</td><td><G t="[전 등급] 본인 40%·동반 3인 30% 할인"/></td><td><G t="[전 등급] 본인 40%·동반 3인 20% 할인"/></td><td className="na">미제공</td></tr>
          <tr><td>롯데월드 어드벤처</td><td><G t="[VIP/Gold] 본인 40%·동반 3인 30% 할인 · [Silver] 본인 40%·동반 3인 20% 할인"/></td><td>[전 등급] 본인 40%·동반 3인 30% 할인</td><td>[전 등급] 부산점 본인 25%·동반 3인 10% 할인<br/>[전 등급] 아쿠아리움 30% 할인 (동반 3인까지)<br/>[전 등급] 아이스링크 50% 할인 (동반 1인까지)</td></tr>
        </tbody>
      </table></div>

      <div className="cl2">🍽️ 패밀리레스토랑</div>
      <div className="tbl-wrap"><table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>매드포갈릭</td><td><G t="[VIP/Gold] 15% 할인 (최대 15,000원) · [Silver] 5% 할인 (최대 5,000원)"/></td><td><G t="[VVIP/VIP/골드] 15% 할인 (주문 10만원 한도) · [일반] 5% 할인 (주문 10만원 한도)"/></td><td><G t="[VVIP/VIP] 15% 할인 · [우수] 5% 할인"/></td></tr>
          <tr><td>아웃백</td><td>[VIP/Gold] 15% 할인 (월 4회, 일 최대 2만원)<br/>[Silver] 5% 할인 (월 4회, 일 최대 1만원)</td><td><G t="[VVIP/VIP/골드] 15% 할인 · [일반] 5% 할인"/></td><td className="na">미제공</td></tr>
          <tr><td>VIPS</td><td><G t="[VIP/Gold] 15% 할인 · [Silver] 5% 할인"/></td><td><G t="[VVIP/VIP] 15% 할인 · [Gold/일반] 5% 할인"/></td><td><G t="[VVIP/VIP] 15% 할인 · [우수] 5% 할인"/></td></tr>
        </tbody>
      </table></div>

      <div className="cl2">🍕 피자</div>
      <div className="tbl-wrap"><table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>도미노</td><td><G t="[VIP] 30% 할인 · [Gold/Silver] 20% 할인"/></td><td><G t="[VVIP/VIP] 20% 할인 · [Gold/일반] 15% 할인"/></td><td><G t="[VVIP/VIP] 20% 할인 (최대 4만원) · [우수] 15% 할인 (최대 3만원)"/></td></tr>
          <tr><td>피자헛</td><td><G t="[VIP] 30% 할인 · [Gold/Silver] 20% 할인"/></td><td><G t="[전 등급] 15% 할인"/></td><td><G t="[전 등급] 15% 할인 (최대 3만원)"/></td></tr>
        </tbody>
      </table></div>

      <div className="cl2">☕ 카페·디저트</div>
      <div className="tbl-wrap"><table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          <tr><td>배스킨라빈스</td><td><G t="[VIP] 싱글레귤러 50% 할인 · [Gold/Silver] 30% 할인"/></td><td className="na">미제공</td><td><G t="[전 등급] 쿼터 4,000원 할인"/></td></tr>
          {/* ⛔⛔⛔ 이 행 절대 .upd 금지 (2026.09.10·09.14 반복 위반, 사용자 직접 지적) — "월 1회" 문구를 이유 없이 지우거나 되살리는 걸 변경으로 표시하지 말 것. 실제 %·금액·횟수가 안 바뀌면 그냥 조용히 유지. 근거: update_rules.txt 규칙 13 */}
          <tr><td>스타벅스</td><td className="na">미제공</td><td><G t="[전 등급] 음료 사이즈업 월 1회"/></td><td className="na">미제공</td></tr>
        </tbody>
      </table></div>

      <div className="cl2">🏪 편의점</div>
      <div className="tbl-wrap"><table className="ct">
        <thead>
          <tr>
            <th>제휴처</th>
            <th className="th-skt"><span className="cb bs">SKT</span></th>
            <th className="th-kt"><span className="cb bk">KT</span></th>
            <th className="th-lgu"><span className="cb bl">LGU+</span></th>
          </tr>
        </thead>
        <tbody>
          {/* ⛔⛔⛔ 이 행 절대 .upd 금지 (2026.09.10·09.14 반복 위반 — 벌써 여러 번째, 사용자 직접 지적) — "신선식품"="프레시 푸드"="FF"는 전부 같은 GS25 상품 카테고리를 가리키는 동의어다. SKT 공식 API 필드가 "프레시 푸드"라고 나와도 이건 실제 혜택 변경이 아니다. 문구를 API 원문에 맞추는 건 괜찮지만 .upd는 절대 붙이지 말 것 — "API 공식 명칭 교정"이라는 이유로도 예외 없음. "(일1회, 최대 2만원)" 한도도 이유 없이 지우지 말 것. 근거: update_rules.txt 규칙 13 */}
          <tr><td>GS25</td><td>[전 등급] 매주 화요일 프레시 푸드 1,000원당 200원 할인 (일1회, 최대 2만원)</td><td>[VVIP/VIP/골드] 100원 할인<br/>[일반] 50원 할인</td><td><G t="[VVIP/VIP] 100원 할인 · [우수] 50원 할인"/></td></tr>
          <tr><td>CU</td><td><G t="[VIP/Gold] 100원 할인 · [Silver] 50원 할인"/></td><td>[전 등급] 아침 간편식류 1,000원당 200원 할인</td><td className="na">미제공</td></tr>
          <tr><td>세븐일레븐</td><td><G t="[VIP/Gold] 100원 할인 · [Silver] 50원 할인"/></td><td className="na">미제공</td><td className="na">미제공</td></tr>
        </tbody>
      </table></div>
    </div>
  );
}
