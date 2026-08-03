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
        <span className="ss">최근 4주 · 에펨코리아·루리웹·아카라이브·뽐뿌·네이버카페·네이버블로그 (<span className="upd">2026.07.30 갱신</span>)</span>

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
              <div className="rbs rp" style={{ width: '14%' }}>긍정 14%</div>
              <div className="rbs rn" style={{ width: '86%' }}>부정 86%</div>
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
            <span className="srcbadge">뽐뿌</span>
            <span className="srcbadge act">네이버카페</span>
            <span className="srcbadge">네이버블로그</span>
          </div>
          <KwTabs tabs={SKT_TABS} active={sktKw} setActive={setSktKw} />
          {sktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx"><span className="upd">T멤버십 영화 예매가 안돼요 — "조조 아니고 1만7천원 이하 아니고 청소년도 아님" / 댓글: "7월달꺼 써버린거아님? 한달에 한번 무료인데" / "1년에 6회임" / "특별관은 나도 안되서 걍 제값다 주고봄"</span></div><div className="rsrc"><span className="upd">2026.07.30</span> · <a href="https://www.fmkorea.com/10148363088" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx"><span className="upd">[T멤버십] 티데이 29일 혜택 둘러보기 — "점점... 쓸만한게 없네요" (꿀 통)</span></div><div className="rsrc"><span className="upd">2026.07.29</span> · <a href="https://cafe.naver.com/postmore/83692" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx"><span className="upd">[T멤버십] T데이 할리스커피 50%, 롤링파스타 5천원 할인 (7/29) — "롤링파스타 할인가가 정가같네요 양이 좀 적습니다" / "양 많이 작죠 소식자 식단일정도 양 줄이고 가격 저렴한척"</span></div><div className="rsrc"><span className="upd">2026.07.29</span> · <a href="https://bbs.ruliweb.com/market/board/1020/read/105967" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">SKT T멤버십데이예요!!! — "아 도넛 먹고싶네요...아직 사무실...ㅠㅜ" / "VIP는 셱셱버거 40% 네요!! 꼭 써야지!!" (베나자)</div><div className="rsrc">2026.07.22 · <a href="http://cafe.naver.com/mindy7857/5315696" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">[T멤버십] T데이 처갓집 6천원 할인 (7/6~10) — "처갓집은 만원은 할인 해야 그냥저냥 먹을만함" / "처갓집 닭다리 10개에서 8개로 줄었음" / "처갓집 할인없으면 양념 25000 하던데 선넘음"</div><div className="rsrc">2026.07.06 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105388" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T멤버십 Young week 투썸플레이스 40% 할인 (7/6~10, 만13~34세) — "에잇!!나이 먹어서 안되네요ㅜㅜ" / "ㅋㅋㅋ 좋다말았네요" / "나이 제한을 왜 두는거에요~~~~~"</div><div className="rsrc">2026.07.08 · <a href="https://cafe.naver.com/mindy7857/5289021" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">VIP픽 골랐는데 우주패스 무료쿠폰 사라짐 — "우주패스도 이젠 공짜로 못쓰네요" / "받을거 없어요😤" / "9900원 받다가 4900원 받으려니 체감 넘 크다"</div><div className="rsrc">2026.08.01 · <a href="https://m.cafe.naver.com/wjdrkrjqn/187113" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx"><span className="upd">뒤늦게 안 T멤버십 VIP 영화혜택에 아쉬움 — 댓글: "vip 혜택 개좋은데 난 우주패스로 유튭프리미엄+세븐일레븐 30%할인" "청년요금제로 CGV 50%할인도 매달 사용"</span></div><div className="rsrc"><span className="upd">2026.08.02</span> · <a href="https://www.fmkorea.com/10161822462" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">VIP픽 혜택 다 쓰고 표준 요금제로 이탈 — "네이버페이 5만원 받고 VIP픽 혜택도 사용해서 더이상 유지할 필요 없을것같은데 표준으로 내리셨나요?"</div><div className="rsrc"><span className="upd">2026.08.01</span> · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=phone&no=3930160" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '19%' }}>긍정 19%</div>
              <div className="rbs rn" style={{ width: '57%' }}>부정 57%</div>
              <div className="rbs ru" style={{ width: '24%' }}>중립 24%</div>
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
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx"><span className="upd">문화의날+KT 멤버십 쓰니까 스파이더맨을 5천원에 볼 수 있네... — 댓글: "KT멤버십에 롯시 한달에 한번 겅짜 아님?" / "2인 티켓잡으니까 만원밖에 안들던데"</span></div><div className="rsrc"><span className="upd">2026.07.29</span> · <a href="https://www.fmkorea.com/10145470108" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">이번달 KT 달달 초이스는 너무 실망..... — "이번달은 진짜..... 너무 실망이에요~" / 남편: "통신사에서 치킨 할인쿠폰 또 안주냐?" / "고객보답은 7월1차 베라 잘 이용했고 2차 쓰기 위해 파바 가야겠네요"</div><div className="rsrc">2026.07.19 · <a href="http://cafe.naver.com/mindy7857/5309017" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 달달혜택이 너무 줄었네요 이제 이용 안할 것 같네요 — "지난 달까지는 괜찮았는데 이번 달부터 쓸게 없네요" / "3사 중에 제일 부실하더라구요 ㅠ" / "kt 고객보답 하면서 이벤트가 더 줄어든거 같아요 ㅠㅠ" (네영카)</div><div className="rsrc">2026.07.16 · <a href="http://cafe.naver.com/movie02/1392707" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 7월 달달 초이스 (7/15~31) — "이번엔 초이스 혜택만 있는데 그것도 반토막인게 역대급 씁쓸혜택이네" / "안달달~~~ 혜택"</div><div className="rsrc">2026.07.15 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105650" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT 달달혜택 — "달달이 아니라 덜덜이네요" / "엄청 쪼그라들었네요 돈떨어졌나" / "영화 혜택도 없어졌네요 ㅠ" / "월초 혜택이 더 나았다는..;;;"</div><div className="rsrc">2026.07.15 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=546025" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">이번달 kt 달달혜택 쓰레기네 — "쓸게없구만" / 댓글: "메가커피 1천원 할인 2장 있어서 개꿀이던데 난ㅋㅋ" / "파파존슨 반값 해줘"</div><div className="rsrc">2026.07.15 · <a href="https://www.fmkorea.com/10086859879" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">KT달달혜택 왜이럼 완전 똥이 되어부렸네 — "영화 예매권 없다니"</div><div className="rsrc">2026.07.15 · <a href="https://arca.live/b/breaking/176910463" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT이신분 100프로 당첨!! 달달혜택 월 2회로 바뀌었나봐요 — "1차는 7월2~14일, 저는 자담치킨 7천원할인쿠폰ㅎㅎ 아이는 빽다방 아아 무료쿠폰주네요!! 호텔숙박권도 있고 다이소도 있고 영화관람권도 있고 100프로 당첨이니 꼭 해보세요" (다낭보물창고)</div><div className="rsrc">2026.07.13 · <a href="http://cafe.naver.com/grownman/1133067" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT 달달혜택 멤버십 취향 뽑기 100% 당첨 (7월) — "다이소 3천원 받았네요" / "아씨 빽다방 먼데 ㅋㅋㅋㅋㅋ" / "다이소 핵이득" / "하씨 빽다방 ㅡㅠ"</div><div className="rsrc">2026.07.07 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105431" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 달달혜택 자담치킨 7000원 할인으로 주문 — "KT 달달혜택 배달의 민족 자담치킨 7000원 할인혜택 있어요~ 그래서 어제 혜택받아 주문하니.." (베나자)</div><div className="rsrc">2026.07.04 · <a href="http://cafe.naver.com/mindy7857/5279624" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt 달달혜택 7월 1차 — "kt역시 빼ㄱ다방이네... 영화 관람권 뜨긴하나...." / 댓글: "배민이 좋아보인다." / "빽다방만 뜨는거같은데"</div><div className="rsrc">2026.07.02 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75792158" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">Kt달달혜택으로 오랜만에 파파존스나 먹으려했는데 — "이번에 랜덤이라 가족꺼까지 3개돌렸는데 자담만 3개떴네 ㅠ" (파파존스 원했으나 자담만 당첨)</div><div className="rsrc">2026.07.02 · <a href="https://www.fmkorea.com/10031697782" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">케이티 달달혜택 7월 — "전 빽다방" "우왕 다이소~~~" "저두 빽다방ㅎ" (댓글 다수 긍정, 쏘핫 플레이그라운드)</div><div className="rsrc">2026.07.02 · <a href="http://cafe.naver.com/purplega5nt/9880" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT멤버십 100% 달달혜택 뽑기 — "자담이 제일 쓸데없는 것 같음 ㅠㅠ" / "다이소 3000 잘 받았습니다" / "파파존스 50퍼 감사합니다" / "자담치킨 홍보 이벤트인가..." (조회 15,513)</div><div className="rsrc">2026.07.02 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=545637" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT 달달혜택 — 7개 시도 중 6개 빽다방 / "빽다 2개 쓸데없는 피자쿠폰 2개" / "지금은 모조리 해체중입니다" (1월까진 17회선, 현재 전부 해지 중)</div><div className="rsrc">2026.07.02 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=phone&no=3925673" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '50%' }}>긍정 50%</div>
              <div className="rbs rn" style={{ width: '50%' }}>부정 50%</div>
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
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">통신사 물놀이 혜택 완전 대박이네요!!! — "왜 내가 쓰는 유플러스는 조용하지 싶어서 살짝 서운할 뻔했는데, 열심히 유플투쁠 페이지를 뒤져보니 다행히 유플러스도 7월 15일 수요일에 오션월드 혜택!" (베나자)</div><div className="rsrc">2026.07.06 · <a href="http://cafe.naver.com/mindy7857/5283728" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
