export default function VipBenefits() {
  return (
    <div className="sec" id="vp">
      <div className="sh">
        <span className="st">👑 VIP 특화 혜택</span>
        
      </div>
      <div className="tbl-wrap"><table className="vt">
        <thead>
          <tr>
            <th>구분</th>
            <th className="th-skt"><span className="cb bs">SKT</span> VIP Pick</th>
            <th className="th-kt"><span className="cb bk">KT</span> VIP·VVIP 초이스</th>
            <th className="th-lgu"><span className="cb bl">LGU+</span> VIP콕</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>제공 주기</td>
            <td>
              월 1회 PICK + 별도 PLUS<br />
              <a href="https://sktmembership.tworld.co.kr/mps/pc-bff/program/vippick.do" target="_blank" rel="noreferrer" className="vlink">VIP Pick →</a>
            </td>
            <td>
              VIP: 연 최대 6회<br />
              VVIP: 연 최대 12회<br />
              <a href="https://membership.kt.com/mmbr/choice.do" target="_blank" rel="noreferrer" className="vlink">초이스 →</a>
            </td>
            <td>
              월 1회 (연 12회)<br />
              <a href="https://www.lguplus.com/benefit-membership" target="_blank" rel="noreferrer" className="vlink">VIP콕 →</a>
            </td>
          </tr>
          <tr>
            <td>영화</td>
            <td>CGV 무료관람 연3회 /<br />1+1 연9회 택1</td>
            <td>롯데시네마 영화 무료<br />(VIP·VVIP 초이스)</td>
            <td>CGV 무료 연3회 / 1+1 연9회</td>
          </tr>
          <tr>
            <td>OTT·구독</td>
            <td>
              T우주패스 4,900원(쇼핑·편의점·카페) + 5,000원(올리브영·스벅·이마트24) 2종
            </td>
            <td>
              VVIP 전용:<br />
              VIPS 스테이크 무료(2인 샐러드바 이용시)<br />
              도미노 3만원 할인(방문, 4만원 결제조건)
            </td>
            <td>
              유독<br />
              4,000원 할인
            </td>
          </tr>
          <tr>
            <td>생일</td>
            <td className="na">미제공</td>
            <td>VVIP: 꾸까·스벅케이크·롯시 생일당월 택1<br />VIP: 미제공</td>
            <td className="na">미제공</td>
          </tr>
        </tbody>
      </table></div>
    </div>
  );
}
