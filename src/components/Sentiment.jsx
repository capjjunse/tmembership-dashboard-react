import { useState } from 'react';

const SKT_TABS = [
  { id: 'kw1', label: 'T 멤버십 전반', hasData: false },
  { id: 'kw2', label: 'T day',          hasData: true  },
  { id: 'kw5', label: '해피아워',        hasData: false },
  { id: 'kw3', label: 'Young week·0day', hasData: false },
  { id: 'kw4', label: 'VIP PICK',       hasData: true  },
];

const KT_TABS = [
  { id: 'kw1', label: 'KT 멤버십 전반',   hasData: false },
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
        <span className="ss">최근 4주 · 에펨코리아·루리웹·아카라이브·뽐뿌·네이버카페·네이버블로그 (<span className="upd">2026.07.07 갱신</span>)</span>

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
              <div className="rbs rp" style={{ width: '23%' }}>긍정 23%</div>
              <div className="rbs rn" style={{ width: '77%' }}>부정 77%</div>
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
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx"><span className="upd">[T멤버십] T데이 처갓집양념치킨 6천원 할인 (7/6~10) — "처갓집은 만원은 할인 해야 그냥저냥 먹을만함" / "처갓집 닭다리 10개에서 8개로 줄었음" / "처갓집 할인없으면 양념 25000 하던데 선넘음"</span></div><div className="rsrc"><span className="upd">2026.07.06</span> · <a href="https://bbs.ruliweb.com/market/board/1020/read/105388" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">[T멤버십] T데이, 더벤티 아메리카노·피자헛 포장 50% 할인 외 (7/1) — "뭐가 없네 ㅜ" (댓글 다수) "그나마 땡기는 아웃백은 제일 싼 스테이크가 5만원..."</div><div className="rsrc">2026.07.01 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105260" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T데이 혜택 누려요~~~ — "벤티 다운 받으면 7월3일까지라 좋아요^^" (배라맘)</div><div className="rsrc">2026.07.01 · <a href="http://cafe.naver.com/chch6534/1299337" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이 역전우동 냉모밀 3500원 (6/24) — "역전우동 그냥 딱 저가격이 맞는 맛임.." "역전우동도 점바점이 너무 심해서 걍 안먹고맘" "역전에 없음 역전우동.." (댓글 다수 맛·지점 불만)</div><div className="rsrc">2026.06.24 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105068" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이는 매장도 별로 없는 다운타우너 쿠폰을 왜케 자주 주지 — "이거 하나 먹자고 롯백 광복점까지 가는건 에바쎄바야" / "스울에 많으니까 그런거 아녀? t데이 혜택 보면 거의 서울에 있는 브랸드들로 되 있드만" "지방민은 서러워용 ;ㅁ;"</div><div className="rsrc">2026.06.24 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75687308" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">t데이 쉑쉑버거 40프로 쿠폰 구해요ㅠㅠ — "어제 다운못받앗어요ㅠㅠ 도와주실분 계실까요오오" (맘이베베)</div><div className="rsrc">2026.06.18 · <a href="http://cafe.naver.com/skybluezw4rh/14676690" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T데이 혜택 받아요~~~ — "폴바셋도 쿠폰 사용기한이 길면 좋겠어요...^^ 짐 당첨되었어요^^ T day 럭키찬스" (배라맘)</div><div className="rsrc">2026.06.17 · <a href="http://cafe.naver.com/chch6534/1296195" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이 이제 한번 더 급나누기 들어가네 — "이제는 빞 등급한테 40% 주고 나머지는 20%면 간에 기별도 안가겠다" (비추력 12,699)</div><div className="rsrc">2026.06.17 · <a href="https://bbs.ruliweb.com/etcs/board/300143/read/75598238" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">[T멤버십] T데이, 도미노피자 포장 50% 할인 외 (6/17) — "우리동네 도미노는 너무 맛없는데다 창렬임" / 지역별 품질 편차 불만 다수</div><div className="rsrc">2026.06.17 · <a href="https://bbs.ruliweb.com/etcs/board/1020/read/104866" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">T데이라서 호식이 두마리 치킨 쓰려고 했더니 — "요기요에 들어온 호식이가 없네 쓰읍"</div><div className="rsrc">2026.06.12 · <a href="https://www.fmkorea.com/9947549236" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">요번주 T데이는 좀 아쉽네요... — "요번주 T데이는 좀 아쉽네요..." (배라맘)</div><div className="rsrc">2026.06.10 · <a href="http://cafe.naver.com/chch6534/1294448" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이 크리스탈제이드 쿠폰 사용 — "슼에서 쿠폰 안줬음 나도 안갔을듯"</div><div className="rsrc">2026.06.09 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75502607" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">skt 요금제 너프만 처먹네... — "멤버십 vip 혜택도 슬금슬금 줄여서 우주패스 할인도 이제 거진 못 쓰게 만들어놓고" 넷플릭스 혜택도 할인으로 변경 / 댓글: "진짜 개악도 이런 개악이 없음"</div><div className="rsrc">2026.06.24 · <a href="https://www.fmkorea.com/9994157807" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '25%' }}>긍정 25%</div>
              <div className="rbs rn" style={{ width: '69%' }}>부정 69%</div>
              <div className="rbs ru" style={{ width: '6%' }}>중립 6%</div>
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
          <KwTabs tabs={KT_TABS} active={ktKw} setActive={setKtKw} />
          {ktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx"><span className="upd">KT 달달혜택 자담치킨 7000원 할인으로 주문 — "KT 달달혜택 배달의 민족 자담치킨 7000원 할인혜택 있어요~ 그래서 어제 혜택받아 주문하니.." (베나자)</span></div><div className="rsrc"><span className="upd">2026.07.04</span> · <a href="http://cafe.naver.com/mindy7857/5279624" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx"><span className="upd">kt 달달혜택 7월 1차 — "kt역시 빼ㄱ다방이네... 영화 관람권 뜨긴하나...." / 댓글: "배민이 좋아보인다." / "빽다방만 뜨는거같은데"</span></div><div className="rsrc"><span className="upd">2026.07.02</span> · <a href="https://bbs.ruliweb.com/community/board/300143/read/75792158" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx"><span className="upd">Kt달달혜택으로 오랜만에 파파존스나 먹으려했는데 — "이번에 랜덤이라 가족꺼까지 3개돌렸는데 자담만 3개떴네 ㅠ" (파파존스 원했으나 자담만 당첨)</span></div><div className="rsrc"><span className="upd">2026.07.02</span> · <a href="https://www.fmkorea.com/10031697782" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">케이티 달달혜택 7월 — "전 빽다방" "우왕 다이소~~~" "저두 빽다방ㅎ" (댓글 다수 긍정, 쏘핫 플레이그라운드)</div><div className="rsrc">2026.07.02 · <a href="http://cafe.naver.com/purplega5nt/9880" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">달달혜택 — "kt달달혜택 버거킹 할인하네욥 저는 와퍼주니어 남편은 와퍼ㅋㅋ 딱이에요" (탕정신도시맘)</div><div className="rsrc">2026.06.16 · <a href="http://cafe.naver.com/tjnewtownmom/62687" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 6월 달달초이스 (버거킹·빕스·더벤티·롯데시네마·던킨 등, 6/16~30) — "이번달엔 다행히 롯데시네마 안빠졌네" vs "빕스 샐러드바 진짜 맛없던데" "버거킹 원래 가격이 얼마인지 써놓아야지"</div><div className="rsrc">2026.06.15 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104825" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 고객보답 7월 1차 (배스킨 50% 할인 외, 7/1~15) — "얼마 전 한 네이버페이 50% 할인보다도 적네 ㅋㅋ" "50% 해 놓고 최대 5000원 ㅋㅋㅋ 티빙도 겁나 털린 놈들이 뻔뻔" "고객 보답은 개지랄" "보답이 짜다"</div><div className="rsrc">2026.07.01 · <a href="https://bbs.ruliweb.com/market/board/1020/read/105236" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT멤버십 고객보답 1차 (7월) — "7월 1일부터 가능, 나름 반응좋았던 쇼핑 라운지 떳넹" / "라운지 천원 너프먹었구먼 ㅜㅜ" / "기대 안하긴 했지만 받을게 점점 없어지노" / "베라 50퍼 매달 하는거잖음 그냥 보여주기 식"</div><div className="rsrc">2026.06.30 · <a href="https://www.fmkorea.com/10022937250" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT 고객보답 7월 1차 — "쇼핑라운지 천원을 더 깎네;;;;;" (조회 2,811)</div><div className="rsrc">2026.06.30 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=545498" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT고객보답 올리브영 모바일상품권 발행처 아시는분 계신가요..? — "올영 3천원권 픽업주문 후 취소되어버리고 유효기간 만료. 이제 좋은 마음 안가지려고요"</div><div className="rsrc">2026.06.19 · <a href="http://cafe.naver.com/postmore/77614" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 고객보답 프로그램 6월 2차는..좀.... — "제 기준엔 던킨이 너무 멀구요.. GS편의점 50%품목도 딱!! 정해주다보니 이걸 써? 버려? 그런고민이 든단말이죵~" (줌마렐라)</div><div className="rsrc">2026.06.16 · <a href="http://cafe.naver.com/gimhaezumma/2787046" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT멤버십 고객 보답 프로그램 6월 2차 — "6월 2차 혜택도 역시 의미가 없네요;;" (셰에라자드)</div><div className="rsrc">2026.06.16 · <a href="http://cafe.naver.com/schezade/296612" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 고객보답 6월 2차 (던킨 50%·GS25 컵라면/모찌 50%, 6/16~30) — "컵라면? 모찌롤? 옘병을 하고있네 이게 고객보답이야 재고정리야" "개인정보 탈탈 털리고...혜택까지 1500원짜리 컵라면 반값" (조회 23,151)</div><div className="rsrc">2026.06.15 · <a href="https://bbs.ruliweb.com/etcs/board/1020/read/104822" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt 고객보답? 6월 2차 목록 떴네 — "흠..." (작성자) "던킨 죽었어 ㅋㅋㅋ" (댓글)</div><div className="rsrc">2026.06.15 · <a href="https://bbs.ruliweb.com/etcs/board/300143/read/75573494" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT 고객보답 6월 2차.. — "GS25는 차라리 하질 말지. 저게 뭔지...." / 댓글: "gs 컵라면은 어떤 새끼가 생각해낸 건지 가관이네 ㅋㅋㅋ" "컵라면 2개 주는 걸로 착각 할뻔 했네요" (조회 13,784)</div><div className="rsrc">2026.06.15 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=545012" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 고객보답 쿠폰 감사합니다 (배라맘)</div><div className="rsrc">2026.06.10 · <a href="http://cafe.naver.com/chch6534/1294375" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '56%' }}>긍정 56%</div>
              <div className="rbs rn" style={{ width: '44%' }}>부정 44%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge act">네이버카페</span>
          </div>
          <KwTabs tabs={LGU_TABS} active={lguKw} setActive={setLguKw} />
          {lguKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx"><span className="upd">통신사 물놀이 혜택 완전 대박이네요!!! — "왜 내가 쓰는 유플러스는 조용하지 싶어서 살짝 서운할 뻔했는데, 열심히 유플투쁠 페이지를 뒤져보니 다행히 유플러스도 7월 15일 수요일에 오션월드 혜택!" (베나자)</span></div><div className="rsrc"><span className="upd">2026.07.06</span> · <a href="http://cafe.naver.com/mindy7857/5283728" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">1💚 7월 유플투쁠 — "요즘 너무 빨리 소진이라... 11시 정각에 들어가도 못하기도 하고 혜택은 줄고...에라이~~~" / 댓글: "진짜 혜택이 많이 줄은거 같아요ㅠㅠ" "그리고 땡하고 하려고 해도 금방 마감이고요" (위드앤육아)</div><div className="rsrc">2026.07.01 · <a href="http://cafe.naver.com/happyvirus1986/625504" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">7월 유플투쁠 혜택입니다 — "통신사 혜택들이 점점 적어지는거 같아요 20년을 한 통신사를 쓴 저에게 필요한 혜택도 많지 않고 짜요 ㅋㅋ" / 댓글: "갈수록 그래요... 예전엔 영화 500원 봤는데" "저도 한20년인데 혜택은 딱히.." (대구맘 365)</div><div className="rsrc">2026.07.01 · <a href="http://cafe.naver.com/dgmom365/7334941" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플투쁠 노브랜드는 수량이 적은건지ㅜ — "1분인데 마감이네요ㅜㅜ 아이가 요즘 냉모밀에 빠져들어 오예~했는데.. 이런이런 수량좀 늘려줘라 유플!!" (핫딜맘 놀이터)</div><div className="rsrc">2026.06.18 · <a href="http://cafe.naver.com/hotdealplayground/515513" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">오늘의 유플투쁠~ — "노브랜드도 받고 cgv도 받고 11시 고고씽" (배라맘)</div><div className="rsrc">2026.06.18 · <a href="http://cafe.naver.com/chch6534/1296274" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">18일자 유플투쁠 11시입니다 — "오늘은 받을게 많네요~ 모두 성공하세요^^" (검단신도시맘)</div><div className="rsrc">2026.06.18 · <a href="http://cafe.naver.com/gdnewcity1144/350857" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">오늘의 유플투쁠~♡ — "받을게 없는게 함정" (배라맘)</div><div className="rsrc">2026.06.17 · <a href="http://cafe.naver.com/chch6534/1295998" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">오늘의 유플투쁠♡ 아웃백♡♡♡25%쿠폰 (배라맘)</div><div className="rsrc">2026.06.16 · <a href="http://cafe.naver.com/chch6534/1295700" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플투쁠 카카오페이지 받기 완료♡ (배라맘)</div><div className="rsrc">2026.06.11 · <a href="http://cafe.naver.com/chch6534/1294547" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
