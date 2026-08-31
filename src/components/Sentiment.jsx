import { useState } from 'react';

const SKT_TABS = [
  { id: 'kw1', label: 'T 멤버십 전반', hasData: true  },
  { id: 'kw2', label: 'T day',          hasData: true  },
  { id: 'kw5', label: '해피아워',        hasData: true  },
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
        <span className="ss">최근 4주 · 에펨코리아·루리웹·아카라이브·뽐뿌·네이버카페·네이버블로그·디시인사이드·더쿠 (<span className="upd">2026.08.31 갱신</span>)</span>

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
              <div className="rbs rp" style={{ width: '47%' }}><span className="upd">긍정 47%</span></div>
              <div className="rbs rn" style={{ width: '44%' }}><span className="upd">부정 44%</span></div>
              <div className="rbs ru" style={{ width: '9%' }}>중립 9%</div>
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
            <span className="srcbadge act">디시인사이드</span>
            <span className="srcbadge act">더쿠</span>
          </div>
          <KwTabs tabs={SKT_TABS} active={sktKw} setActive={setSktKw} />
          {sktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T멤버쉽 10퍼 할인 1만원 제한 걸린거 짜치넹 — "10퍼 나름 쏠쏠했는데" (컴투스프로야구 갤)</div><div className="rsrc">2026.08.27</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">더쿠</span></div><div className="rtx">파바 슈퍼쏠 결제 전에 티멤할인 되나?? — "중복할인 안된대~" (덬딜)</div><div className="rsrc">2026.08.26</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">11번가 t멤버십 7000원할인 성풍 적용안된다 — "생필품이라는데 아쉽게도 성풍은 해당안됨 뭐 물티슈 콜라 두유 이런건 되더라 근데 가격이 엄청 메리트있어보이진 않았음...함정인듯" / 댓글: "시발 성풍이 생필품이라고" / "헬스인에게 프로틴이 생필품아니면뭐냐...." (헬스보충제 갤)</div><div className="rsrc">2026.08.24</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">점심 아웃백이 존나 가성비같음 — "나올때 t멤버십으로 할인받으면 43000원됨 이거 존나 가성비 아니냐" (원금회복 갤)</div><div className="rsrc">2026.08.22</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">올해부터 t멤버십 혜택 존나 줄어서 빡치네 — "작년하반기에 개인정보유출 민심 되돌리려고 ㅈㄴ뿌렸다 이거지?" (LGBT 갤)</div><div className="rsrc">2026.08.19</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">skt 장기고객 혜택 어이가 없어서 말문이 막히네 — "밤11시-새벽5시까지 오라는건데 생색 졸라 냄" / 댓글: "뭐라도 해주긴하네ㅋㅋ" / "낮에 빌리면 비싸자너" / "ㅋㅋㅋㅋㅋㅋ 그냥 잘랍니다"</div><div className="rsrc">2026.08.04 · <a href="https://www.fmkorea.com/10169950810" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">T멤버십 영화 예매가 안돼요 — "조조 아니고 1만7천원 이하 아니고 청소년도 아님" / 댓글: "7월달꺼 써버린거아님? 한달에 한번 무료인데" / "1년에 6회임" / "특별관은 나도 안되서 걍 제값다 주고봄"</div><div className="rsrc">2026.07.30 · <a href="https://www.fmkorea.com/10148363088" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">T멤버십 영화예약 병신을 만들어놨네 (명조 갤)</div><div className="rsrc">2026.07.29</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T멤버십 아이디어스 살게 없네요... — "판매 물품 종류도 별로 없고, 가격대가 높아서 쿠폰 쓰기 애매하네요" / 댓글: "쿠폰 중복도 안되고 비싸고 걍 버릴까 생각중"</div><div className="rsrc">2026.08.16 · <a href="https://cafe.naver.com/wjdrkrjqn/193699" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">새우튀김 맛있삼 — "통신사 sk면 t멤버십 쿠폰 받아서 장보삼" (제타 갤)</div><div className="rsrc">2026.08.07</div></div>
            </div>
          )}
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T 멤버십 출석하다 찾은 던킨 자이언트 버킷! — "SKT T day(티데이) 혜택을 살펴보다가 알게 되었는데, 진작 일찍 알았으면 매장에 가보는건데 너무 아쉬워요" / "T멤버십 이용하시는 분들은 티데이 혜택 저처럼 기간 놓치지 마시고 꼭 챙기셔요!" / 댓글: 24개 호응 (부산경남맘스홀릭)</div><div className="rsrc">2026.08.26</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">오늘 커피 반값에 먹었어요 — "sk멤버십 t데이라서 자이언트버킷 커피 50프로 할인받아서 ᆢᆢ아이스 카라멜 마끼야또 먹었는데 맛있당ᆢ" / 댓글: "엇! 이런게 있었군요~" (컬처블룸)</div><div className="rsrc">2026.08.26</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">센아맥도 매크로 있나보네 — "T멤버십 할인 2천원...매크로가 바로 먹어버리네" / 댓글: "어차피 취소 사유로 실제 사용자분들한테 돌아간다" / "그런거 없음 그냥 증발" (오리지널 티켓 갤)</div><div className="rsrc">2026.08.25</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T데이 브랜드 위크 행사 중 — "8월 24~28일 티멤버십 기준 11번가 브랜드 위크. 매일유업 아몬드브리즈·무가당 두유 대용량 가격이 좋네요! 사실 분은 달리세요." / 댓글: "저 두유 저것만 마시는데 많지도 않아서 혼자 마시기도 딱이네요&gt;&lt; 감사합니당!!!" (정가거부)</div><div className="rsrc">2026.08.25 · <a href="https://m.cafe.naver.com/wjdrkrjqn/196738" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">브랜드 위크 혜택으로 도미노 피자 T데이 50%할인 받았어요!! — "무진장 슈림프 스테이크는 50%할인받아서 주문하고" (부산경남맘스홀릭)</div><div className="rsrc">2026.08.22 · <a href="https://cafe.naver.com/ungsangjang/869045" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">도미노 T멤버십 50퍼 포장할인 되나?? — "되면 개씹씹혜자콜라보 되는건데" (명조 갤)</div><div className="rsrc">2026.08.21</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">아트하우스 진 t멤버십에서 결제하면 못받아? — "아트하우스 클럽은 가입했는데 Cgv 앱 내에서 결제 한 건만 되나. . ?" (오리지널 티켓 갤)</div><div className="rsrc">2026.08.20</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">[T멤버십] 이번주 T데이 혜택 (8/19) — "아니 이럴수가 애브리데이 배송안하는 지점이네" / "투썸 VIP만 이구나"</div><div className="rsrc">2026.08.19 · <a href="https://bbs.ruliweb.com/market/board/1020/read/106465" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">오늘은 첼센느 피자 먹는 날 — "T멤버쉽 50% 할인 멤버쉽 아닌 사람은 40% 할인 최근 3개월 주문한적 없으면 콜라 공짜" (첼시 갤)</div><div className="rsrc">2026.08.18</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">t멤버십 도미노 50퍼 개꿀 ㅅㅅ — "방문포장이라서 아쉽긴해도"</div><div className="rsrc">2026.08.17</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">슼통쓰는 욕조견들 멸망 ㅋㅋㅋ — "t멤버십 방문포장 50퍼있다 딱 콜라보 시작 21일이랑 걸침 ㄱㄱ혓" (니케 갤)</div><div className="rsrc">2026.08.17</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">브랜드 위크-뚜레쥬르 30% 할인 + 슈피겐 코드 오류 혼재 — "뚜레쥬르도 이번주 30% 할인입니다." / "슈피겐 코드등록 에러떠서 고객센터 전화하니 전부 그렇다고 하네요 ㅋㅋ 담당자 똥줄탈듯.." / "방금 문자와서 쿠폰 등록하니 등록 되네요! 강화유리 무료 느낌으로 접근하시죠"</div><div className="rsrc">2026.08.12 · <a href="https://bbs.ruliweb.com/etcs/board/1020/read/106303" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">더쿠</span></div><div className="rtx">티데이덕에 제타 진짜 싸게 산듯 — "라면 중복할인에 티데이할인까지 받으니 할인금액만 거의 18000원 / 너무 기분조타ㅋㅋㅋ" (덬딜)</div><div className="rsrc">2026.08.08 · <a href="https://theqoo.net/theqdeal/4306147533" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">더벤티 T 데이 쿠폰 썼어요!! — "너무 맛있게 잘먹었어요" (덕양구맘)</div><div className="rsrc">2026.08.07 · <a href="https://m.cafe.naver.com/gongganforum/279966" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T멤버십 17일부터 도미노 브랜드위크네ㅋㅋ — "개꿀ㅋㅋ" (명조 갤)</div><div className="rsrc">2026.08.07</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T멤버십 T데이 이거 상술인듯 (빌보드 갤)</div><div className="rsrc">2026.08.07</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">t데이로 땅스부대찌개 사러갔는데 지도앱에서 영업중이라 갔더니 문닫혀있음 — "앞으로 불매할꺼임" (오리지널티켓 갤)</div><div className="rsrc">2026.08.07</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">SKT t데이 쿠폰 디카페인 되네요 — "벤티에서 디카페인도 되네요. 천원할인 받고 2천원 결제했어요" / 댓글: "저거 금액권 되나요?" "안 됩니다. 전용메뉴만 되게 막아놨어요. 아메리카노 옵션 변경만 돼요"</div><div className="rsrc">2026.08.05 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=546649" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">[T멤버십] 티데이 29일 혜택 둘러보기 — "점점... 쓸만한게 없네요" (꿀 통)</div><div className="rsrc">2026.07.29 · <a href="https://cafe.naver.com/postmore/83692" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">[T멤버십] T데이 할리스커피 50%, 롤링파스타 5천원 할인 (7/29) — "롤링파스타 할인가가 정가같네요 양이 좀 적습니다" / "양 많이 작죠 소식자 식단일정도 양 줄이고 가격 저렴한척"</div><div className="rsrc">2026.07.29 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105967" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">t멤버쉽 싹다 털었네요. — 팀홀튼 0week 쿠폰 등 활용, 무지개 떡볶이세트 사용 (정가거부)</div><div className="rsrc">2026.08.07 · <a href="https://m.cafe.naver.com/wjdrkrjqn/189285" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">Skt 영크크 ㄱㄱ (커피 갤러리) — "지방러는 웁니다..." / 댓글: "아~ 이게 SK가 아니라서 못받네~" "그나마 던킨말고 쓸게없넹" "내가 다시는 SK쓰나봐라"</div><div className="rsrc">2026.08.03 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=coffee&no=664109" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">skt 이번달은 0week 없나 (핫딜 후기 채널, 댓글 3)</div><div className="rsrc">2026.08.02</div></div>
            </div>
          )}
          {sktKw === 'kw5' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">가끔 오는 쉑쉑병...SKT VIP는 T해피아워 5천원할인 월5회,1일1회(좀 치사) — 해피아워 혜택 실제 사용 후 아쉬움 혼재 (뉴스사사)</div><div className="rsrc">2026.08.09 · <a href="https://m.cafe.naver.com/loyaltylife/349162" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">SKT VIP PLUS 5천원 할인 있음 — "t 멤버십 어플에서 vip plus 혜택으로 있음. 매잘 vip 혜택 횟수 차감에서 제외라 skt 쓰면 이거 고려해보셈 30% 할인에 최대 5천원임" (카론유니버스W)</div><div className="rsrc">2026.08.27</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T우주패스 쓰레기네 — "1개월 1번 구독하던 걸 1만원에 해야 되는데 유튜브 프리미엄 라이트 쌩 가격이 8500원인데 우주패스 할인보면 7900원이고 이상한 거 껴서 1만원 받아 처먹는 게 유튜브가 비싸진 게 아니라 편의점&카페가 비싸진 거" (판타지 갤)</div><div className="rsrc">2026.08.10</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">뱅크시 SKT VIP PICK — "두 명이라면 SKT VIP 혜택이 괜찮네요 / 2인 1+1되어 23,000원입니다 / 영화나 볼까하고 보다보니 뱅크시도 있어서 공유드려요~" / 댓글: "보고 왔는데 아주 일반적인 사진만 많고 해서 저는 그닥이더라구요 참고 하세요"</div><div className="rsrc">2026.08.16 · <a href="https://cafe.naver.com/loyaltylife/350402" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">skt vip 롯데마트 제타 구입했어요 — "횟수 차감 없는 skt vip 픽으로 받은 쿠폰이에요. 최대 5천원까진데 살게 없어서 요렇게 마무리! 요즘 롯데마트 열일하네요ㅎㅎ" (정가거부)</div><div className="rsrc">2026.08.09 · <a href="https://m.cafe.naver.com/wjdrkrjqn/190268" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">skt vip픽 쿠폰으로 롯데마트 제타 구입했어요 — "vip픽 횟수차감 없이 쿠폰 줘서 롯데마트 제타 주문했어요!"</div><div className="rsrc">2026.08.05 · <a href="https://m.cafe.naver.com/wjdrkrjqn/188484" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">메가커피 자주가시면 우주패스추천 — "sk t멤버십 브아피 할인 월 4번한도로 제한된 후로는 우주패스쓰는데 넘좋네요. vip픽으로 우주패스쿠폰받고 11번가 우주패스고르고요. 11번가포인트3천받고 (4만이상5천쿠폰도줌) 메가커피 월 3만할인받아요"</div><div className="rsrc">2026.08.05 · <a href="https://m.cafe.naver.com/wjdrkrjqn/188333" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">롯데마트 제타 50% 쿠폰 정보 공유 중 VIP픽 언급 — "이거 말고도 VIP픽에 차감 안되는 할인쿠폰도 있어요^^ 오늘 SKT쿠폰 쓸만한 거 제법 줘서 좋네요^^" / 댓글: "오 혜택 좋은데요?ㅎㅎ 바로 들어가봐야겠어요" "요즘 롯마가 열일 하네요"</div><div className="rsrc">2026.08.03 · <a href="https://m.cafe.naver.com/pusanmom/4263884" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">뒤늦게 안 T멤버십 VIP 영화혜택에 아쉬움 — 댓글: "vip 혜택 개좋은데 난 우주패스로 유튭프리미엄+세븐일레븐 30%할인" "청년요금제로 CGV 50%할인도 매달 사용"</div><div className="rsrc">2026.08.02 · <a href="https://www.fmkorea.com/10161822462" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">VIP픽 골랐는데 우주패스 무료쿠폰 사라짐 — "우주패스도 이젠 공짜로 못쓰네요" / "받을거 없어요😤" / "9900원 받다가 4900원 받으려니 체감 넘 크다"</div><div className="rsrc">2026.08.01 · <a href="https://m.cafe.naver.com/wjdrkrjqn/187113" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">VIP픽 혜택 다 쓰고 표준 요금제로 이탈 — "네이버페이 5만원 받고 VIP픽 혜택도 사용해서 더이상 유지할 필요 없을것같은데 표준으로 내리셨나요?"</div><div className="rsrc">2026.08.01 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=phone&no=3930160" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '30%' }}><span className="upd">긍정 30%</span></div>
              <div className="rbs rn" style={{ width: '62%' }}><span className="upd">부정 62%</span></div>
              <div className="rbs ru" style={{ width: '8%' }}>중립 8%</div>
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
            <span className="srcbadge act">디시인사이드</span>
            <span className="srcbadge act">더쿠</span>
          </div>
          <KwTabs tabs={KT_TABS} active={ktKw} setActive={setKtKw} />
          {ktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">윱프리미엄 인도우회 막히고 지니 kt멤버쉽으로 무료라 써봤거든 이거 쓰는 사람들 ㄹㅇ 존경함 (여자아이돌 컨텐츠 갤)</div><div className="rsrc">2026.08.17</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">스파이더맨, 오디세이 5500원으로 간편하게 감상 — "KT VIP 멤버쉽으로 영화관 갈 때마다 진짜 잘 쓰고 있음" (갤럭시 갤)</div><div className="rsrc">2026.08.16</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt멤버십에서 영화티켓 쌀먹 가능하노 ㄷㄷ — "내꺼 골드 등급이라 등급 높음 부모님꺼 써야지 개꿀" (오리지널티켓 갤)</div><div className="rsrc">2026.08.08</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt멤버십 할인으로 3만 할인받고 도미노 포테이토 먹을거임 (니케 갤)</div><div className="rsrc">2026.08.07</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">KT요고61 가입했는데 왜 멤버쉽VIP안됨??? 사기당ㅎㅆ노!! (알뜰폰 갤)</div><div className="rsrc">2026.08.07</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">밤켈 쿨트백3종 주문 — "kt멤버십앱에서 5천 쿠폰받아 38880원 / 주문한지 5분도 안됐는데 상품준비중이에요ㅋ / 얼른 들고 직관가고 싶어요" / 댓글: "전 벌써 2개구입" / "가격 넘 좋아요" / "매진전에 바로 주문 넣었습니다 감사합니다"</div><div className="rsrc">2026.08.06 · <a href="https://cafe.naver.com/ncsoftbaseball/296948" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">t구독,kt멤버쉽이 다 죽은 지금 롯시 어케봄 (오리지널 티켓 갤)</div><div className="rsrc">2026.08.04</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">문화의날+KT 멤버십 쓰니까 스파이더맨을 5천원에 볼 수 있네... — 댓글: "KT멤버십에 롯시 한달에 한번 겅짜 아님?" / "2인 티켓잡으니까 만원밖에 안들던데"</div><div className="rsrc">2026.07.29 · <a href="https://www.fmkorea.com/10145470108" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx"><span className="upd">kt 달달혜택 뚜레쥬르 쿠폰 받은거 이제야 생각났어요 내일 간식으로 먹을 빵 구매해야 겠어요 쿠폰받으신분들 내일까지니 잊지마세요~" / 댓글: "밀리의서재놓쳐서ㅋ" / "감삼당~!" / "빵을 줄여야 해서.. (다음주에 케이크 2개 예약한 녀석)" (정가거부)</span></div><div className="rsrc"><span className="upd">2026.08.30 · <a href="https://m.cafe.naver.com/wjdrkrjqn/198209" target="_blank" rel="noreferrer">원문 보기</a></span></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">뚜레쥬르는 뭐가 맛있지... kt달달혜택 왜 파바가 아니냐고 (과자빵 갤)</div><div className="rsrc">2026.08.25</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT달달혜택으로 뚜레쥬르에서 — "만원이상이면 4천원 할인해줘서 빵사왔어요 냉동보관후 30초 데워서 먹으면 넘 맛있기에 ㅎㅎ" (더먹자 맛집)</div><div className="rsrc">2026.08.22 · <a href="https://cafe.naver.com/themukja/1694204" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt요즘 쌀먹 심하네 — "달달혜택도 구려졌고 콘페도 구데기라 애매하네" (명조 갤)</div><div className="rsrc">2026.08.21</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">달달혜택 이젠 쓸것도 없네 (오리지널 티켓 갤)</div><div className="rsrc">2026.08.20</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">콱본진 달달혜택 밀리 1개월떴노 ㄷㄷ — "간만에 전자책 독서나 해야지 뚜레빵도 좋아해서 고민하다가 밀리감" (알뜰폰 갤)</div><div className="rsrc">2026.08.20</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">kt 달달혜택 점점 혜택이적어지는것같아요 — "쓰고싶은게없네유 ㅠ" / 댓글: "ㅇㅈ 혜택찾는것도 꽁꽁숨겨두고.." / "여름이라 혜택이 상했음... 앞전에는 선택지나 많았지 이제는 3개밖에 선택지 안주고..." (●디젤매니아●)</div><div className="rsrc">2026.08.20 · <a href="https://cafe.naver.com/dieselmania/47386852" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 달달혜택으로 빵4000원 할인받았어요 — "길건너 뚜레쥬르에 가니 만원이상 달달혜택 4000있어서 갓나온빵을 사왔어요" (야매의밥상)</div><div className="rsrc">2026.08.20 · <a href="https://cafe.naver.com/yamaeyoriking/85761" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT달달혜택 밀리의서재 당근에 팔았어요 — "쇼핑라운지 3만이상 5천이고 뚜쥬는 빵을 잘 안먹고 해서 밀리의서재로 선택, 당근에 장당 4,800원에 팔았어요😁" / 댓글: "오 좋네요 ㅎ" / "이미 팔았지용 ㅎㅆ" (꿀통)</div><div className="rsrc">2026.08.20 · <a href="https://cafe.naver.com/postmore/88604" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt 달달혜택 정말 많이 줄었군... — "쇼핑 라운지는 단일 상품 3만원 이상 써야 쓸 수 있다캄. 거기 물건도 없는데.. 밀리의 서재는 머냐.. 뚜레쥬르가 그나마 낫네.." / 댓글: "달달 혜택인데 혜택이 없군"</div><div className="rsrc">2026.08.19 · <a href="https://bbs.ruliweb.com/community/board/300143/read/76360135" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">Kt 달달혜택으로 밀리의서재로 1권부터 보는데 왜 재밌노 (메이플스토리 갤)</div><div className="rsrc">2026.08.19</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt멤버십 보상 달달혜택 밀리1개월 공짜네 당근ㄱㄱ — "당근에 ㅈㄴ 많더라 싸게 1장 나도샀어" (알뜰폰 갤)</div><div className="rsrc">2026.08.19</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">원스토어 달달혜택없어짐? — "ㄱ- 페이백때쓸 쿠폰이 하나도없는데 이러면 망했다" (블루 아카이브 갤)</div><div className="rsrc">2026.08.18</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT 케멤페 2차 달달혜택 (8/18~31) — "달달????? 약했니?" / "어느새부터 달달은 안달아" / "쇼핑라운지 3만원 이상 살것도 별로 없더만" / "설마 이게 다인가..?"</div><div className="rsrc">2026.08.18</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">달달혜택 이대로 쓰레기만 퍼주는건가 — "쇼핑라운지 쌀먹 개꿀이었는데 3만이상으로 조건변경 뚜레쥬르는 만원이상이라 그나마 낫긴한데.... 뭐 누를만한게 없네"</div><div className="rsrc">2026.08.18</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">달달혜택 확인 했다가 허탈 — "kt 달달혜택 확인해보는데 달달은 무슨 쓰다써 ㅋㅋㅋ" / "왜 달달혜택 글에 반응이 없나 했더니 쓰디 쓴 혜택이라 없었군요" (핫딜맘 놀이터)</div><div className="rsrc">2026.08.18 · <a href="https://cafe.naver.com/hotdealplayground/528044" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">더쿠</span></div><div className="rtx">KT 달달 — "씁쓸혜택 이제 페이지 꾸밀힘도 없나보군.." / "라운지 저거 3만 이상 5천 할인이래서 할게 없더라" (덬딜)</div><div className="rsrc">2026.08.18 · <a href="https://theqoo.net/theqdeal/4317063518" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">달달혜택 재앙이네 — "공차빼곤 건질게 없네 쇼핑라운지도 조건 3만이상으로 변경됨"</div><div className="rsrc">2026.08.17</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">kt 달달혜택으로 공차 — "오늘 kt 달달혜택 공차 사용했어요! 시원하고 달달하네요ㅎㅎ" (파주운정맘)</div><div className="rsrc">2026.08.16 · <a href="https://cafe.naver.com/usem/2577330" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt 롯시 달달혜택 없어진건가 / 7천원 쿠폰 좋았는데.. (오리지널 티켓 갤)</div><div className="rsrc">2026.08.13</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt달달혜택 왜이래? / 너프 개씨게 먹었노 (치킨 갤)</div><div className="rsrc">2026.08.12</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">KT 달달혜택 한달에 두번 하나보네 — "딱히 이거다 싶은건 없지만 주말에 공차나 다녀와야겠어요" (휴대폰 갤)</div><div className="rsrc">2026.08.05</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt 8월 달달혜택 1차 — "쇼핑라운지 살게 없고... 나머지 둘 다 멀고..."</div><div className="rsrc">2026.08.05 · <a href="https://bbs.ruliweb.com/community/board/300143/read/76210674" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">본진kt 달달혜택 오픈 / 구림 쇼핑라운지는 3만 이상 5천 할인 (알뜰폰 갤)</div><div className="rsrc">2026.08.03</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">케이티 달달혜택은오와리다</div><div className="rsrc">2026.08.03</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">KT 멤버쉽 8월 달달혜택 1차(~8/17) — "달달혜택 맛탱이 가는거 제대로 느껴졌었는데 이제 이것마저도 두번 쪼개서 하는거야...?" / "떡너프 ㄷㄷ" / "사실상 공차말곤 쓸게 없네"</div><div className="rsrc">2026.08.03 · <a href="https://arca.live/b/breaking/178813538" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 케멤페 1차 달달혜택 (8/3~17) — "달달하긴 무슨 개뿔...." / "쇼핑라운지는 이제 끝났네요 최소주문 금액이면 저기서 안사죠" / "고객감사(?)도 끝났겠다 이제 알뜰폰 메뚜기로.." / "달달 이제 처참하네요."</div><div className="rsrc">2026.08.03 · <a href="https://bbs.ruliweb.com/market/board/1020/read/106094" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT멤버십페스타 (공차50%, GS바로주유3천원쿠폰) — "쇼핑라운지같은경우는 3만원이상구매시 5천원 할인쿠폰이라서 의미가 없습니다" / "헐 쇼핑라운지 최소주문금액이라니 이거마저 개악됐네ㅜ" / "gs잘받았습니다" / "주유 쿠폰 받았어요. 감사합니다!!" (긍부정 혼재)</div><div className="rsrc">2026.08.03 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=546573" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">kt에서 고객보답으로 티빙 디즈니 끝났는데 알아서 또 3개월 정기권 구독중이라는데 이거뭐죠? — "돈나가는거 맘대로 신청된건가요?" / 댓글: "신청날짜 기준이에요~" (달콤한 청라맘스)</div><div className="rsrc">2026.08.01 · <a href="https://cafe.naver.com/chengnamomlife/2336371" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rn" style={{ width: '100%' }}>부정 100%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge">네이버카페</span>
            <span className="srcbadge act">디시인사이드</span>
          </div>
          <KwTabs tabs={LGU_TABS} active={lguKw} setActive={setLguKw} />
          {lguKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">왜 아무도 유플투쁠 팝콘 챙기라고 말 안해주냐 — "지나버렸노" (오리지널 티켓 갤)</div><div className="rsrc">2026.08.23</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">유플투쁠 40퍼 밖이 못받노 ㄲㅂ — "도미노 50퍼는 등급이 안돼서 못받네" (명조 갤)</div><div className="rsrc">2026.08.21</div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
