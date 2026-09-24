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
  { id: 'kw3', label: '고객보답프로그램',  hasData: false },
];

const LGU_TABS = [
  { id: 'kw1', label: 'U+ 멤버십 전반', hasData: false },
  { id: 'kw2', label: '유플투쁠',        hasData: true  },
  { id: 'kw4', label: 'VIP 콕',          hasData: true  },
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
        <span className="ss">최근 4주 · 에펨코리아·루리웹·아카라이브·뽐뿌·네이버카페·네이버블로그·디시인사이드·더쿠 (2026.09.24 갱신)</span>

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
              <div className="rbs rp" style={{ width: '73%' }}>긍정 73%</div>
              <div className="rbs rn" style={{ width: '27%' }}>부정 27%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge">에펨코리아</span>
            <span className="srcbadge act">루리웹</span>
            <span className="srcbadge">아카라이브</span>
            <span className="srcbadge act">뽐뿌</span>
            <span className="srcbadge act">네이버카페</span>
            <span className="srcbadge act">네이버블로그</span>
            <span className="srcbadge act">디시인사이드</span>
            <span className="srcbadge act">더쿠</span>
          </div>
          <KwTabs tabs={SKT_TABS} active={sktKw} setActive={setSktKw} />
          {sktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">시발 처음으로 T멤버십을 멤버십답게 써봄 — "밀키스제로 한개 꽁으로 먹었다 개꿀" (스텔라이브 갤)</div><div className="rsrc">2026.09.23 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=stellive&no=7637975" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T멤버십 개병신같은 거 씨발 — "할인해서 예매하려니까 계속 네트워크 오류 쳐뜨네" (오리지널 티켓 갤)</div><div className="rsrc">2026.09.22 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=oticket&no=2971540" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">에버랜드 와일드 사바나 익스페디션 추천해요~ — "지난주 수요일에 티멤버십 에버랜드 할인" / 댓글: "티멤버쉽 할인 좋으네요.아이가 정말 기억에 남겠어요" (부산경남맘스홀릭)</div><div className="rsrc">2026.09.17 · <a href="https://cafe.naver.com/ungsangjang/875968" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">집앞 세븐에 스톰 29개 있음 / t멤버쉽 할인받아 오늘 20개 21000원 — 댓글: "T멤버십 할인 얼마되는디?" (포켓몬카드 갤)</div><div className="rsrc">2026.09.15 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=pokemoncollection&no=70511" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">성시경 비빔밥 도시락 — T멤버십 + 농협카드 결제시 25%할인으로 3200원에 구매ㅋㄷ (편의점 갤)</div><div className="rsrc">2026.09.02</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">야심한 밤에 SKT 쓰는놈들 스라(스카이라이너) 50%할인 받아라 — "인당 최대 8매 구매 가능" / 댓글: "아 가격좋은데..." / "버스보다 싸고 빠른데" (러브라이브 선샤인 갤)</div><div className="rsrc">2026.09.02 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=sunshine&no=6652729" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T멤버쉽 10퍼 할인 1만원 제한 걸린거 짜치넹 — "10퍼 나름 쏠쏠했는데" (컴투스프로야구 갤)</div><div className="rsrc">2026.08.27</div></div>
            </div>
          )}
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">롯시는 할인방법이 없나.. — "t멤버십에도 빠지고 노리카드도 안되고 레지던트 정가박치기 ㄹㅇ이냐" (오리지널 티켓 갤)</div><div className="rsrc">2026.09.20 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=oticket&no=2963388" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">배스킨라빈스 SKT T데이 티멤버쉽으로 40% 할인 후기 — 댓글: "수요일 T데이 40% 할인은 정말 꿀 같은 혜택이죠" / "SK는 제휴할인이 너무 빵빵한것같아요!!"</div><div className="rsrc">2026.09.16 · <a href="https://blog.naver.com/ssagazi2008/224414035180" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">버거리 SKT T데이 할인! 산본학원가점 첫 방문 솔직 후기 — 댓글: "SKT T데이 덕분에 처음 알게 된 수제버거인데 기대 이상으로 너무 맛있었겠어요!"</div><div className="rsrc">2026.09.16 · <a href="https://blog.naver.com/olguri00/224413882566" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">배라 T데이 혜택 누리려 갔다가... — "파인트 T데이 40%할인 혜택 고했어요^^, 더 많이 쓰고 왔네요^^" (배라맘)</div><div className="rsrc">2026.09.16 · <a href="https://cafe.naver.com/chch6534/1317788" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">또 돌아온 T데이 — VIP 던킨 50% 할인 이용 / 댓글: "반값이면 살만한걸요 좋네요" / "저렴할때 잘 사셨네요" (구리 남양주맘)</div><div className="rsrc">2026.09.16 · <a href="https://cafe.naver.com/momingrnyj/1974698" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">이번 T데이는 지난주보다 낫네 — 던킨, 뚜레쥬르, 배라 할인 이거 괜찮은데?? / 댓글: "배라 어흐", "파인트 냠냠" (오리지널 티켓 갤)</div><div className="rsrc">2026.09.14 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=oticket&no=2938024" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT TDAY쿠폰으로 롯데리아 사각핫크팩 할인후기 — "티데이할인으로 가성비좋게 푸짐하게 즐겨본 롯데리아 사각핫크팩 후기 포스팅"</div><div className="rsrc">2026.09.08 · <a href="https://blog.naver.com/teddyvillage/224404167899" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T멤버십 찬스를 썼다지만 쌩가격 3.9는 너무 비싸다 진심 (오리지널 티켓 갤)</div><div className="rsrc">2026.09.08 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=oticket&no=2919212" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">t데이 사각핫크팻은 양심이가 나가 뒤졌나ㅋㅋ (롯데리아 갤)</div><div className="rsrc">2026.09.07 · <a href="https://gall.dcinside.com/board/view/?id=lotteria&no=74173" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">대전 빕스 현대아울렛점 후기 — "이번에는 T멤버십으로 30% 할인을 받을 수 있었는데 VIP 등급은 40%까지 할인된다고 하더라구요"</div><div className="rsrc">2026.09.07 · <a href="https://blog.naver.com/kimsh632/224404058401" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">와 t맴버십 이제 던킨 공차 쿠폰 다 VIP만 주네 — 오케이 이제 진짜 알뜰폰으로 갈게요 / 댓글: "집중이 아니라 한 단계씩 내려치기 한거더라" (판타지 갤)</div><div className="rsrc">2026.09.02 · <a href="https://gall.dcinside.com/board/view/?id=fantasy_new2&no=9881221" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">통신사 SKT 쓰면 T멤버십 가서 백억커피 쿠폰 받으셈 — 마시면서 영화관 가는중 (편의점 갤)</div><div className="rsrc">2026.09.07 · <a href="https://gall.dcinside.com/board/view/?id=cs_new1&no=9014619" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T day 영위크 즉시당첨 응모했는데 꽝 — "저도 꽝..ㅠ 2개나..ㅠ" / "와 나이 때문에 탈락 ㅋㅋㅋㅋ 하" (정가거부)</div><div className="rsrc">2026.09.07 · <a href="https://cafe.naver.com/wjdrkrjqn" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT 영위크 9월 혜택 — "무료: 백억커피 할인: 할리스, 응급실떡볶이, 노브랜드버거 등 택1 없이 모든 혜택 이용 가능하니 일단 쿠폰 받아놓으세요"</div><div className="rsrc">2026.09.07 · <a href="https://blog.naver.com/zerocostlife/224403588583" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">9월 SKT 도미노피자 50% 할인 | 영위크(YOUNG WEEK) 방문포장 반값 꿀팁 정리</div><div className="rsrc">2026.09.07 · <a href="https://blog.naver.com/igeojeogeo/224403409187" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw5' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT 9월 백미당 해피아워 50% 할인 — 백미당 아브뉴프랑 판교점 직접 사용 후기</div><div className="rsrc">2026.09.14 · <a href="https://blog.naver.com/znzn-_-/224411004332" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT T멤버십 VIP 혜택, 백미당 검은콩라떼 50% 할인받는 꿀팁!</div><div className="rsrc">2026.09.11 · <a href="https://blog.naver.com/cy4788/224408232457" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">백미당 T멤버십 1+1 & VIP 해피아워 후기 — 댓글: "T멤버십 1+1에 해피아워 정보까지 잘 알아갑니다" / "T멤버십 1+1 행사 이용하신 거 완전 꿀팁이네요"</div><div className="rsrc">2026.09.10 · <a href="https://blog.naver.com/potato_daily01/224407454894" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">쉐이크쉑 대구신세계점 T멤버십 해피아워 후기 — "어제 SKT T Day 쉐이크쉑 매장 행사로 오랫만에 쉐이크쉑 버거를 먹었습니다"</div><div className="rsrc">2026.08.27 · <a href="https://blog.naver.com/vic69/224391868271" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">뿌링클치킨 16000원에 먹는법 발견함 — "t맴버십 어플깔고 vip등급이면 4000원 할인에 + bhc어플깔면 어플할인1000원 중복되고 다합쳐서 5000원할인 21000원짜린데 16000원에 먹을수있음" (미국 주식 갤)</div><div className="rsrc">2026.09.20 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=stockus&no=17796570" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT T멤버십 9월 VIP픽 혜택 · 폴 바셋 대구 감삼DT점 VIP PICK 이용후기</div><div className="rsrc">2026.09.15 · <a href="https://blog.naver.com/ych11133/224412074546" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">3000명 위해 한밤중 롯데월드…SKT 장기고객의 특별한 밤 — 댓글: "응모를 안했네 ㅠㅠ" / "니들이 내 정보 털어가도 그냥 skt에 있었는데 ㅠ 개쎔" (잇싸갤)</div><div className="rsrc">2026.09.15 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=itssaexodus&no=222858" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">T우주패스 GPT프로 x20 공짜 같은거 안나오나.. — 댓글: "프리미엄 통신사에서 그런걸 왜 함" / "1%할인쿠폰(vip전용)" (판타지 갤)</div><div className="rsrc">2026.09.15 · <a href="https://gall.dcinside.com/board/view/?id=fantasy_new2&no=9934674" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">아메리카노 4잔 구매했어요~^^ — T멤버십 VIP 20프로 할인 1600원도 적용</div><div className="rsrc">2026.09.10 · <a href="https://cafe.naver.com/wjdrkrjqn/201797" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">더쿠</span></div><div className="rtx">티멤 폴바셋 VVIP 전용으로 바뀐거 지금 봤다 — "너무하네 아예 암것도 안주다니" (덬딜)</div><div className="rsrc">2026.09.09 · <a href="https://theqoo.net/theqdeal/4339868457" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT VIP만 온더고 12종 도시락 19000원에 쇼핑 — "T 멤버십 9월 아워홈몰 VIP PICK PLUS 혜택, vip pick쿠폰 받고 복사해두세요"</div><div className="rsrc">2026.09.06 · <a href="https://blog.naver.com/youla8/224402550239" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT 롯데면세점 VIP Pick 스페셜쿠폰 발급·실사용 후기 — "발급 방법부터 실제 사용 후기, 그나마 활용도를 높이는 팁까지 직접 써봤습니다"</div><div className="rsrc">2026.09.03 · <a href="https://blog.naver.com/pumpanda/224399161353" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">비싸다는 새끼들아 우주패스 쓰라고 T멤버쉽쓰라고 카드혜택쓰라고 병신들아 호구새끼아니노 (편의점 갤)</div><div className="rsrc">2026.09.01</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">올!영 픽업주문 존나 좋다 진짜 T우주패스 올 영 쿠폰 쓰고 CJONE 적립에 금액권까지 쓰고 자체할인이랑 할쿠 먹여서 거의 40% 가격에삿는데.. (빌보드 갤)</div><div className="rsrc">2026.08.31</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">SKT VIP PLUS 5천원 할인 있음 — "t 멤버십 어플에서 vip plus 혜택으로 있음. 매잘 vip 혜택 횟수 차감에서 제외라 skt 쓰면 이거 고려해보셈 30% 할인에 최대 5천원임" (카론유니버스W)</div><div className="rsrc">2026.08.27</div></div>
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
              <div className="rbs rp" style={{ width: '64%' }}>긍정 64%</div>
              <div className="rbs rn" style={{ width: '36%' }}>부정 36%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge">에펨코리아</span>
            <span className="srcbadge act">루리웹</span>
            <span className="srcbadge">아카라이브</span>
            <span className="srcbadge">뽐뿌</span>
            <span className="srcbadge act">네이버카페</span>
            <span className="srcbadge act">네이버블로그</span>
            <span className="srcbadge act">디시인사이드</span>
            <span className="srcbadge act">더쿠</span>
          </div>
          <KwTabs tabs={KT_TABS} active={ktKw} setActive={setKtKw} />
          {ktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">KT = 통녹안냄, 멤버십 혜택 너프시킴 — 댓글: "이젠 해외망 광랜 메리트도 스크한테 물타기당했는데 여기서 가족할인까지 너프시키면 알뜰로 간다" (아이패드 갤)</div><div className="rsrc">2026.09.22 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=ipad1&no=1075645" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt 멤버쉽 할리스 세트 ㅁㅌㅊ? — "커피2+휘낭시에2 혼지 다먹는다" / 댓글: "한달에한번이다" (미국 주식 갤)</div><div className="rsrc">2026.09.18 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=stockus&no=17782071" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">Kt 통신사쓰면 kt멤버십으로 예매하셈 — "Vip이상부터는 한달에 한번은 롯시 영화 14000원할인해줌" (마도카마기카 갤)</div><div className="rsrc">2026.09.17 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=madomagi&no=150721" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">와 파파존스 처음먹어보는데 감동했다 — "kt 멤버쉽에 파파존스 있길래 수퍼파파스랑 올미트 시켜봤는데 걍 좆되노 이게 피자지 씨발 ㅋㅋ 올미트 이거는 신이만든 피자 아니냐?" (피자 갤)</div><div className="rsrc">2026.09.15 · <a href="https://gall.dcinside.com/board/view/?id=pizza&no=269467" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">통신사 멤버십 무료표 옛날엔 회사 안가리고 하지 않았나 — "그땐 kt로 cgv도 많이 썼는데" (오리지널 티켓 갤)</div><div className="rsrc">2026.09.09</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt멤버십 vvip 혜택 대체 어따써야됨? — "도미노피자 쓰레기 된 이후론 ㄹㅇ 쓸대가없는데" (메이플스토리 갤)</div><div className="rsrc">2026.09.08</div></div>
            </div>
          )}
          {ktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt요즘 돈이 궁항? — "콘페도 망하긴 했는데 달달혜택도 예전보다 너프라 좀 그럼" (명조 갤)</div><div className="rsrc">2026.09.23 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=wutheringwaves&no=2899862" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">밀리의서재 1개월 사용권 — "달달혜택으로 받았는데 쓸일이 없네 팔리지도 않아 ㅋㅋ" (알뜰폰 갤)</div><div className="rsrc">2026.09.22 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=mvnogallery&no=499610" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 멤버십 9월 달달 혜택 버거킹 불고기와퍼+롱치킨버거 2인팩 50% 할인 — 댓글: "와 50프로 혜택으로 만원도 안되는 가격에 완전 혜자네요~~ 당장 달려가고픈데 KT가 아니라 아숩네용" / "오 KT 버거킹 할인이 50프로나 되다니!!!! 장기고객이시면 이런 혜택은 무조건 누려야죠 ㅋㅋ"</div><div className="rsrc">2026.09.18 · <a href="https://blog.naver.com/trdsklois/224415965970" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">버거킹 애플파이로얄 후기, 맥날 애플파이와 비교 (KT 달달혜택) — 댓글: "KT 달달혜택으로 와퍼세트 할인받는 꿀팁까지 알차게 얻어 가요!"</div><div className="rsrc">2026.09.16 · <a href="https://blog.naver.com/sarang2ga/224414204800" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">[버거킹 반값] 9월 KT 달달혜택 - 불고기와퍼+롱치킨버거 2인팩 9,550원에 먹기</div><div className="rsrc">2026.09.14 · <a href="https://blog.naver.com/earlvantea/224411153284" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">형들 bhc 뭐가 맛있음? — kt 멤버쉽 줘서 먹을라카는데... 맛초킹 나옴 ㄱㅅㄱㅅ (국내게임방송 갤)</div><div className="rsrc">2026.09.13 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=rnrsorpdlaqkdthd&no=810942" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">커링클 9천원에 먹어보네 — kt달달혜택 소액지결제하면 3천원 할인하는걸로 8700원 나왔다 (치킨 갤)</div><div className="rsrc">2026.09.12 · <a href="https://gall.dcinside.com/board/view/?id=chicken&no=2386192" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt 장기고객 10년차 쓰고있었는데 개호구잡히는거였네 ㅅㅂ — "달달혜택 치킨 8천원할인이나 받아먹고 그랬는데 알뜰폰 쓰니까 그냥 연간 80만원 세이브되네" (알뜰폰 갤)</div><div className="rsrc">2026.09.10</div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">kt 달달혜택 너프 엄청됐네 (오티 갤)</div><div className="rsrc">2026.09.07 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=oticket&no=2917653" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 달달혜택 버거킹 불고기와퍼 2인세트 후기! — "픽업해서 푸짐하게 즐긴 한 끼, 요즘 통신사 혜택을 잘 챙기면 외식도 부담없어요"</div><div className="rsrc">2026.09.06 · <a href="https://blog.naver.com/tlsqhtjs20/224402740266" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 9월 달달혜택 버거킹 불고기와퍼+롱치킨버거 2인팩 50% 할인된 금액으로 — "월초에 뭐가있을지 기대가 되더라고요 ㅎㅎ"</div><div className="rsrc">2026.09.04 · <a href="https://blog.naver.com/hi_off/224401236296" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT달달혜택으로 다이소(롯데마트) 쇼핑했네요 — 롯데마트 내 다이소에서 달달혜택 5천원권 3장 사용 / 댓글: "오 롯데마트 다이소에서도 사용되는가보네요 저도 오늘가는데 감사합니다" / "아하 다이소를 이용하는 방법이 있었네요! 정보 감사합니다~"</div><div className="rsrc">2026.09.05 · <a href="https://cafe.naver.com/postmore/92602" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 달달혜택 좋아요~~~ — BHC 달달혜택 수령 / 댓글: "kt 부럽.. sk 반성하자 ㅜㅜ"</div><div className="rsrc">2026.09.04 · <a href="https://cafe.naver.com/chch6534/1315245" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">혹시 kt쓰는 위붕이중에 롯마에서 술쇼핑할사람 — Kt 달달혜택에 5처넌 쿠폰 있으니까 알뜰한 술구매 ㄱㄱ (위스키 갤)</div><div className="rsrc">2026.09.02</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">달달혜택 쿠폰받아라 — 롯데마트 기프티콘 5천원 받았다 딱 5000원짜리사도 되고 돈보태서 목살이나 사서 구워먹을 생각이다 (아싸! 갤)</div><div className="rsrc">2026.09.02 · <a href="https://gall.dcinside.com/mgallery/board/view/?id=assagall&no=20706" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">Kt 달달혜택 빠르게 쓰고 온 후기 — 치킨 한마리에 소주 두병 저녁해결 / 댓글: "오 저도 치킨사러갑니다!! 대박쓰" / "그나마 젤 나은 달달이에요" (꿀통)</div><div className="rsrc">2026.09.01 · <a href="https://cafe.naver.com/postmore/91644" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">더쿠</span></div><div className="rtx">kt 달달 롯데마트 5천원 있다 케멤페 달달 혜택 선착순 7만명이라 빡세지는 않은데 어느새 끝나더라고 (덬딜)</div><div className="rsrc">2026.09.01 · <a href="https://theqoo.net/theqdeal/4331651479" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">디시인사이드</span></div><div className="rtx">도미노 kt 달달혜택 이제 끝남?? (피자 갤)</div><div className="rsrc">2026.08.30</div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">kt 달달혜택 뚜레쥬르 쿠폰 받은거 이제야 생각났어요 내일 간식으로 먹을 빵 구매해야 겠어요 쿠폰받으신분들 내일까지니 잊지마세요~" / 댓글: "밀리의서재놓쳐서ㅋ" / "감삼당~!" / "빵을 줄여야 해서.. (다음주에 케이크 2개 예약한 녀석)" (정가거부)</div><div className="rsrc">2026.08.30 · <a href="https://m.cafe.naver.com/wjdrkrjqn/198209" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw3' && (
            <div>
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
              <div className="rbs rp" style={{ width: '71%' }}>긍정 71%</div>
              <div className="rbs rn" style={{ width: '29%' }}>부정 29%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge act">네이버카페</span>
            <span className="srcbadge act">네이버블로그</span>
            <span className="srcbadge act">디시인사이드</span>
          </div>
          <KwTabs tabs={LGU_TABS} active={lguKw} setActive={setLguKw} />
          {lguKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플투쁠 노브랜드 수량이.. — "10초컷도 안나는건 첨봤습니다" / 댓글: "정시들어간사람은 최소한 받게 해줘야지 참 ㅡㅡ" / "막차였나보네요 ㅜㅜ" (정가거부)</div><div className="rsrc">2026.09.17 · <a href="https://cafe.naver.com/wjdrkrjqn/203755" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">9/14 월요일 LG U+ 공차 50% 할인 (슬기로운 곰마을)</div><div className="rsrc">2026.09.14 · <a href="https://cafe.naver.com/samplegong9/165549" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">유플투쁠 유니스터디 공짜라길래 써본 솔직한 후기 — "이게 정말 실화인가 싶어 눈을 비비고 다시 봤죠"</div><div className="rsrc">2026.09.06 · <a href="https://blog.naver.com/benefitbuff/224402425069" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">LG U+ 유플투쁠 VVIP 매드포갈릭 25,000원 할인 쿠폰! 실사용 후기 — "VVIP & 10년 이상 고객 대상, 직접 써봤어요"</div><div className="rsrc">2026.09.04 · <a href="https://blog.naver.com/rldnsdl123/224396473646" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">9월 유플투쁠~~ 혜택이 점점...😢😢 (배라맘)</div><div className="rsrc">2026.09.01 · <a href="https://cafe.naver.com/chch6534/1314420" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">정가거부 하는날 - 다이소 유플투쁠에서 받은 다이소 깊콘 2,000원짜리 사용하고 옴~ 실지출 0원</div><div className="rsrc">2026.08.31 · <a href="https://cafe.naver.com/wjdrkrjqn/198602" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {lguKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">U+ VIP콕 잊지말고 쓰세요. 요번 콕은 스벅으로 당첨입니다. 설악 쏘라노점에서 텀블러에 그득이 담아 시원하게 바깥양반과 츄릅^^ (배라맘)</div><div className="rsrc">2026.08.29 · <a href="https://cafe.naver.com/chch6534/1313854" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
