import { useState } from 'react';

const SKT_TABS = [
  { id: 'kw1', label: 'T 멤버십 전반', hasData: true  },
  { id: 'kw2', label: 'T day',          hasData: true  },
  { id: 'kw5', label: '해피아워',        hasData: false },
  { id: 'kw3', label: 'Young week·0day', hasData: true  },
  { id: 'kw4', label: 'VIP PICK',       hasData: true  },
];

const KT_TABS = [
  { id: 'kw1', label: 'KT 멤버십 전반',   hasData: true },
  { id: 'kw2', label: '달달혜택',          hasData: true },
  { id: 'kw3', label: '고객보답프로그램',  hasData: true },
];

const LGU_TABS = [
  { id: 'kw1', label: 'U+ 멤버십 전반', hasData: false },
  { id: 'kw2', label: '유플투쁠',        hasData: true  },
  { id: 'kw4', label: 'VIP 콕',          hasData: false },
];

function firstActive(tabs) {
  return tabs.find(t => t.hasData)?.id ?? tabs[0].id;
}

function KwTabs({ tabs, active, setActive }) {
  const visible = tabs.filter(t => t.hasData);
  if (!visible.length) return null;
  return (
    <div className="tr2" style={{ marginBottom: '12px' }}>
      {visible.map(t => (
        <button key={t.id} className={`kw${active === t.id ? ' on' : ''}`} onClick={() => setActive(t.id)}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

export default function Sentiment() {
  const [carrier, setCarrier] = useState('skt');
  const [sktKw, setSktKw] = useState(firstActive(SKT_TABS));
  const [ktKw,  setKtKw]  = useState(firstActive(KT_TABS));
  const [lguKw, setLguKw] = useState(firstActive(LGU_TABS));

  return (
    <div className="sec" id="sn">
      <div className="sh">
        <span className="st">💬 고객 반응</span>
        <span className="ss">최근 4주 · 에펨코리아·루리웹·아카라이브·뽐뿌·네이버카페·네이버블로그 (<span className="upd">2026.08.06 갱신</span>)</span>

      </div>
      <div className="tr2">
        <button className={`ctab${carrier === 'skt' ? ' cs' : ''}`} onClick={() => setCarrier('skt')}>SKT</button>
        <button className={`ctab${carrier === 'kt'  ? ' ck' : ''}`} onClick={() => setCarrier('kt')}>KT</button>
        <button className={`ctab${carrier === 'lgu' ? ' cl' : ''}`} onClick={() => setCarrier('lgu')}>LGU+</button>
      </div>

      {/* ── SKT ── */}
      {carrier === 'skt' && (
        <div>
          <div className="rbw" style={{ marginTop: '12px' }}>
            <div className="rbl">멤버십 혜택 관련 전반적 반응 비율</div>
            <div className="rb">
              <div className="rbs rp" style={{ width: '38%' }}>긍정 38%</div>
              <div className="rbs rn" style={{ width: '62%' }}>부정 62%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge act">에펨코리아</span>
            <span className="srcbadge act">루리웹</span>
            <span className="srcbadge">아카라이브</span>
            <span className="srcbadge act">뽐뿌</span>
            <span className="srcbadge act">네이버카페</span>
            <span className="srcbadge">네이버블로그</span>
          </div>
          <KwTabs tabs={SKT_TABS} active={sktKw} setActive={setSktKw} />
          {sktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx"><span className="upd">skt 장기고객 혜택 어이가 없어서 말문이 막히네 — "밤11시-새벽5시까지 오라는건데 생색 졸라 냄" / 댓글: "뭐라도 해주긴하네ㅋㅋ" / "낮에 빌리면 비싸자너" / "ㅋㅋㅋㅋㅋㅋ 그냥 잘랍니다"</span></div><div className="rsrc"><span className="upd">2026.08.04</span> · <a href="https://www.fmkorea.com/10169950810" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">T멤버십 영화 예매가 안돼요 — "조조 아니고 1만7천원 이하 아니고 청소년도 아님" / 댓글: "7월달꺼 써버린거아님? 한달에 한번 무료인데" / "1년에 6회임" / "특별관은 나도 안되서 걍 제값다 주고봄"</div><div className="rsrc">2026.07.30 · <a href="https://www.fmkorea.com/10148363088" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">[T멤버십] 티데이 29일 혜택 둘러보기 — "점점... 쓸만한게 없네요" (꿀 통)</div><div className="rsrc">2026.07.29 · <a href="https://cafe.naver.com/postmore/83692" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">[T멤버십] T데이 할리스커피 50%, 롤링파스타 5천원 할인 (7/29) — "롤링파스타 할인가가 정가같네요 양이 좀 적습니다" / "양 많이 작죠 소식자 식단일정도 양 줄이고 가격 저렴한척"</div><div className="rsrc">2026.07.29 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105967" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">SKT T멤버십데이예요!!! — "아 도넛 먹고싶네요...아직 사무실...ㅠㅜ" / "VIP는 셱셱버거 40% 네요!! 꼭 써야지!!" (베나자)</div><div className="rsrc">2026.07.22 · <a href="http://cafe.naver.com/mindy7857/5315696" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T멤버십 Young week 투썸플레이스 40% 할인 (7/6~10, 만13~34세) — "에잇!!나이 먹어서 안되네요ㅜㅜ" / "ㅋㅋㅋ 좋다말았네요" / "나이 제한을 왜 두는거에요~~~~~"</div><div className="rsrc">2026.07.08 · <a href="https://cafe.naver.com/mindy7857/5289021" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx"><span className="upd">skt vip픽 쿠폰으로 롯데마트 제타 구입했어요 — "vip픽 횟수차감 없이 쿠폰 줘서 롯데마트 제타 주문했어요!"</span></div><div className="rsrc"><span className="upd">2026.08.05</span> · <a href="https://m.cafe.naver.com/wjdrkrjqn/188484" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">메가커피 자주가시면 우주패스추천 — "sk t멤버십 브아피 할인 월 4번한도로 제한된 후로는 우주패스쓰는데 넘좋네요. vip픽으로 우주패스쿠폰받고 11번가 우주패스고르고요. 11번가포인트3천받고 (4만이상5천쿠폰도줌) 메가커피 월 3만할인받아요"</div><div className="rsrc">2026.08.05 · <a href="https://m.cafe.naver.com/wjdrkrjqn/188333" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">롯데마트 제타 50% 쿠폰 정보 공유 중 VIP픽 언급 — "이거 말고도 VIP픽에 차감 안되는 할인쿠폰도 있어요^^ 오늘 SKT쿠폰 쓸만한 거 제법 줘서 좋네요^^" / 댓글: "오 혜택 좋은데요?ㅎㅎ 바로 들어가봐야겠어요" "요즘 롯마가 열일 하네요"</div><div className="rsrc">2026.08.03 · <a href="https://m.cafe.naver.com/pusanmom/4263884" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">뒤늦게 안 T멤버십 VIP 영화혜택에 아쉬움 — 댓글: "vip 혜택 개좋은데 난 우주패스로 유튭프리미엄+세븐일레븐 30%할인" "청년요금제로 CGV 50%할인도 매달 사용"</div><div className="rsrc">2026.08.02 · <a href="https://www.fmkorea.com/10161822462" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">VIP픽 골랐는데 우주패스 무료쿠폰 사라짐 — "우주패스도 이젠 공짜로 못쓰네요" / "받을거 없어요😤" / "9900원 받다가 4900원 받으려니 체감 넘 크다"</div><div className="rsrc">2026.08.01 · <a href="https://m.cafe.naver.com/wjdrkrjqn/187113" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">VIP픽 혜택 다 쓰고 표준 요금제로 이탈 — "네이버페이 5만원 받고 VIP픽 혜택도 사용해서 더이상 유지할 필요 없을것같은데 표준으로 내리셨나요?"</div><div className="rsrc">2026.08.01 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=phone&no=3930160" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">티멤 너무 구려졌네 — "유튜브 프리미엄 조금 싸게 쓸수있는 유일한 수단이였는데 3개월 날먹 날려버렸네" / T 멤버십 VIP PICK T우주패스 혜택 8월 1일부터 변경 / 댓글: "뭐 잘쓰고잇으면 없애고 또 골라서 쓰면 없애고ㅋㅋㅋ" "후추 아주 질나쁜녀석들.."</div><div className="rsrc">2026.07.09 · <a href="https://www.fmkorea.com/10063144867" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}

      {/* ── KT ── */}
      {carrier === 'kt' && (
        <div>
          <div className="rbw" style={{ marginTop: '12px' }}>
            <div className="rbl">멤버십 혜택 관련 전반적 반응 비율</div>
            <div className="rb">
              <div className="rbs rp" style={{ width: '15%' }}>긍정 15%</div>
              <div className="rbs rn" style={{ width: '60%' }}>부정 60%</div>
              <div className="rbs ru" style={{ width: '25%' }}>중립 25%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge act">에펨코리아</span>
            <span className="srcbadge act">루리웹</span>
            <span className="srcbadge act">아카라이브</span>
            <span className="srcbadge act">뽐뿌</span>
            <span className="srcbadge act">네이버카페</span>
            <span className="srcbadge">네이버블로그</span>
          </div>
          <KwTabs tabs={KT_TABS} active={ktKw} setActive={setKtKw} />
          {ktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx"><span className="upd">밤켈 쿨트백3종 주문 — "kt멤버십앱에서 5천 쿠폰받아 38880원 / 주문한지 5분도 안됐는데 상품준비중이에요ㅋ / 얼른 들고 직관가고 싶어요" / 댓글: "전 벌써 2개구입" / "가격 넘 좋아요" / "매진전에 바로 주문 넣었습니다 감사합니다"</span></div><div className="rsrc"><span className="upd">2026.08.06</span> · <a href="https://cafe.naver.com/ncsoftbaseball/296948" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">문화의날+KT 멤버십 쓰니까 스파이더맨을 5천원에 볼 수 있네... — 댓글: "KT멤버십에 롯시 한달에 한번 겅짜 아님?" / "2인 티켓잡으니까 만원밖에 안들던데"</div><div className="rsrc">2026.07.29 · <a href="https://www.fmkorea.com/10145470108" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx"><span className="upd">kt 8월 달달혜택 1차 — "쇼핑라운지 살게 없고... 나머지 둘 다 멀고..."</span></div><div className="rsrc"><span className="upd">2026.08.05</span> · <a href="https://bbs.ruliweb.com/community/board/300143/read/76210674" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx"><span className="upd">KT 멤버쉽 8월 달달혜택 1차(~8/17) — "달달혜택 맛탱이 가는거 제대로 느껴졌었는데 이제 이것마저도 두번 쪼개서 하는거야...?" / "떡너프 ㄷㄷ" / "사실상 공차말곤 쓸게 없네"</span></div><div className="rsrc"><span className="upd">2026.08.03</span> · <a href="https://arca.live/b/breaking/178813538" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 케멤페 1차 달달혜택 (8/3~17) — "달달하긴 무슨 개뿔...." / "쇼핑라운지는 이제 끝났네요 최소주문 금액이면 저기서 안사죠" / "고객감사(?)도 끝났겠다 이제 알뜰폰 메뚜기로.." / "달달 이제 처참하네요."</div><div className="rsrc">2026.08.03 · <a href="https://bbs.ruliweb.com/market/board/1020/read/106094" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT멤버십페스타 (공차50%, GS바로주유3천원쿠폰) — "쇼핑라운지같은경우는 3만원이상구매시 5천원 할인쿠폰이라서 의미가 없습니다" / "헐 쇼핑라운지 최소주문금액이라니 이거마저 개악됐네ㅜ" / "gs잘받았습니다" / "주유 쿠폰 받았어요. 감사합니다!!" (긍부정 혼재)</div><div className="rsrc">2026.08.03 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=546573" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">이번달 KT 달달 초이스는 너무 실망..... — "이번달은 진짜..... 너무 실망이에요~" / 남편: "통신사에서 치킨 할인쿠폰 또 안주냐?" / "고객보답은 7월1차 베라 잘 이용했고 2차 쓰기 위해 파바 가야겠네요"</div><div className="rsrc">2026.07.19 · <a href="http://cafe.naver.com/mindy7857/5309017" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 달달혜택이 너무 줄었네요 이제 이용 안할 것 같네요 — "지난 달까지는 괜찮았는데 이번 달부터 쓸게 없네요" / "3사 중에 제일 부실하더라구요 ㅠ" / "kt 고객보답 하면서 이벤트가 더 줄어든거 같아요 ㅠㅠ" (네영카)</div><div className="rsrc">2026.07.16 · <a href="http://cafe.naver.com/movie02/1392707" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 7월 달달 초이스 (7/15~31) — "이번엔 초이스 혜택만 있는데 그것도 반토막인게 역대급 씁쓸혜택이네" / "안달달~~~ 혜택"</div><div className="rsrc">2026.07.15 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105650" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT 달달혜택 — "달달이 아니라 덜덜이네요" / "엄청 쪼그라들었네요 돈떨어졌나" / "영화 혜택도 없어졌네요 ㅠ" / "월초 혜택이 더 나았다는..;;;"</div><div className="rsrc">2026.07.15 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=546025" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">이번달 kt 달달혜택 쓰레기네 — "쓸게없구만" / 댓글: "메가커피 1천원 할인 2장 있어서 개꿀이던데 난ㅋㅋ" / "파파존슨 반값 해줘"</div><div className="rsrc">2026.07.15 · <a href="https://www.fmkorea.com/10086859879" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">KT달달혜택 왜이럼 완전 똥이 되어부렸네 — "영화 예매권 없다니"</div><div className="rsrc">2026.07.15 · <a href="https://arca.live/b/breaking/176910463" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT이신분 100프로 당첨!! 달달혜택 월 2회로 바뀌었나봐요 — "1차는 7월2~14일, 저는 자담치킨 7천원할인쿠폰ㅎㅎ 아이는 빽다방 아아 무료쿠폰주네요!! 호텔숙박권도 있고 다이소도 있고 영화관람권도 있고 100프로 당첨이니 꼭 해보세요" (다낭보물창고)</div><div className="rsrc">2026.07.13 · <a href="http://cafe.naver.com/grownman/1133067" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT 달달혜택 멤버십 취향 뽑기 100% 당첨 (7월) — "다이소 3천원 받았네요" / "아씨 빽다방 먼데 ㅋㅋㅋㅋㅋ" / "다이소 핵이득" / "하씨 빽다방 ㅡㅠ"</div><div className="rsrc">2026.07.07 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75792158" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 장기고객 마지막 혜택 올려봐요 — "파리바게뜨 최대 50% 할인인데 1만원 이상 구매시 5천원 할인이라 별로 큰 혜택은 아닌 듯" / "갈수록 혜택이 메리트가 없어진다" / 댓글: "전 어제 빵 몇개사고 5천원 할인 받았어요^^" "저희도 샌드위치랑 꽈배기사고 50퍼 받았어요" (로물콘)</div><div className="rsrc">2026.07.21 · <a href="http://cafe.naver.com/romul/309073" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt 마지막 고객보답 쇼핑라운지 5천원 할인권 받았는데 살게 없네 — "콜라밖에 없는건가..ㅡ" / 댓글: "안 미안한 자사몰 쿠폰" / "지금 콜라 다 마시면 콜라 주문해야지..."</div><div className="rsrc">2026.07.19 · <a href="https://bbs.ruliweb.com/community/board/300143/read/76003850" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">kt마지막 보상혜택 파바 50%받았어용 — "이제 보상혜택도 없네용 아쉽스.. 담달 달달혜택이나 기다려야겠어용" / 댓글: "가끔씩 빵살때 할인없으면 아쉬워요..ㅠㅠ" (겟꿀)</div><div className="rsrc">2026.07.18 · <a href="http://cafe.naver.com/dpdtydzzz/14081" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 고객 보답 7월 2차 파리바게뜨 50% 할인 (7/16~31, 프로그램 마지막) — "마지막을 짜증나는 파리로 장식하네" / "2연타석으로 SPC네 우띠.." / "7월로서 고객보답 프로그램과 100기가 제공 등의 혜택이 종료됩니다"</div><div className="rsrc">2026.07.16 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105656" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">[Kt멤버십] 7월 고객보답 2차 (7/16~31) — "이젠 안 미안한가보네 그래서 이번이 마지막이다ㅏㅏㅏ" / "파리바게트 먹고 알뜰폰 요금제로 간다잇!!!" / 댓글: 알뜰폰 이탈 의사 다수</div><div className="rsrc">2026.07.15 · <a href="https://www.fmkorea.com/10086307679" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT 마지막 고객보답 (내일부터) — 댓글: "파바 50으로 마무리하겠네요" / "그동안 잘썼어~~" / "7월 소액결제 5천 할인이나 띄워주라~~"</div><div className="rsrc">2026.07.15 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=546032" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}

      {/* ── LGU+ ── */}
      {carrier === 'lgu' && (
        <div>
          <div className="rbw" style={{ marginTop: '12px' }}>
            <div className="rbl">멤버십 혜택 관련 전반적 반응 비율</div>
            <div className="rb">
              <div className="rbs rp" style={{ width: '33%' }}>긍정 33%</div>
              <div className="rbs rn" style={{ width: '67%' }}>부정 67%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge act">뽐뿌</span>
            <span className="srcbadge act">네이버카페</span>
          </div>
          <KwTabs tabs={LGU_TABS} active={lguKw} setActive={setLguKw} />
          {lguKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">오늘의 유플투쁠♡ — "장기고객데이라~ 저랑 신랑 모두 해당~♡ 다이소 받고 윌라도 받아야겠어요~" (배라맘)</div><div className="rsrc">2026.07.23 · <a href="http://cafe.naver.com/chch6534/1304839" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">오늘의 유플투쁠♡♡ — "쓸거는 그닥 없지만 받아는 놔야쥬 ㅋㅋㅋㅋ" (배라맘)</div><div className="rsrc">2026.07.21 · <a href="http://cafe.naver.com/chch6534/1304346" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">LG유플 해지방어 후기 — "유플투쁠 같은 부가서비스들이 타사에 비해 열악해서(쓸만한건 선착순이고 엄청 짜침) 주변 타사 유저들이 부럽고 불만이라"</div><div className="rsrc">2026.07.13 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=freeboard&no=10034631" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
