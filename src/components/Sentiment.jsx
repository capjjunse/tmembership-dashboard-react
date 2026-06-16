import { useState } from 'react';

const SKT_TABS = [
  { id: 'kw1', label: 'T 멤버십 전반', hasData: false },
  { id: 'kw2', label: 'T day',          hasData: true  },
  { id: 'kw5', label: '해피아워',        hasData: true  },
  { id: 'kw3', label: '0week·0day',     hasData: true  },
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
        <span className="ss">최근 4주 · 에펨코리아·루리웹·아카라이브·뽐뿌·네이버카페·네이버블로그 (<span className="upd">2026.06.16 갱신</span>)</span>

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
              <div className="rbs rp" style={{ width: '68%' }}>긍정 68%</div>
              <div className="rbs rn" style={{ width: '13%' }}>부정 13%</div>
              <div className="rbs ru" style={{ width: '19%' }}>중립 19%</div>
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
            <span className="srcbadge act">네이버블로그</span>
          </div>
          <KwTabs tabs={SKT_TABS} active={sktKw} setActive={setSktKw} />
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">요번주 T데이는 좀 아쉽네요... — "요번주 T데이는 좀 아쉽네요..." (배라맘)</div><div className="rsrc">2026.06.10 · <a href="http://cafe.naver.com/chch6534/1294448" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이 크리스탈제이드 쿠폰 사용 — "슼에서 쿠폰 안줬음 나도 안갔을듯"</div><div className="rsrc">2026.06.09 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75502607" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T데이 이케아 3만원 할인 + 멤버십 무료커피 활용 (꿀 통)</div><div className="rsrc">2026.06.07 · <a href="http://cafe.naver.com/postmore/75418" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">T데이 이디야 컵빙수 50% 할인 — "이디야 멤버스에 쿠폰 등록해야 사용되네요.. 멤버스 가입유도인 것 같긴한데..ㅋㅋ"</div><div className="rsrc">2026.06.04 · <a href="https://www.fmkorea.com/9910956875" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">이디야를 가셔야 합니다 feat. t데이빙수 — T멤버십 쿠폰 2개 계정 활용 후기 "이건 첨알앗네요 ㅋㅋ" "저도 4계정으로 짝맞춰서 2개 겟했어요^^" (꿀 통, 댓글 53)</div><div className="rsrc">2026.06.03 · <a href="http://cafe.naver.com/postmore/74896" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T데이 메드포갈릭 이용 — "이번주 T데이로 메드포갈릭 이용해봤어요. T멤버십 VIP라 50프로니 혜자네요" (가디언스맘)</div><div className="rsrc">2026.06.03 · <a href="http://cafe.naver.com/kmslegend/58389" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">T멤버십 이디야 컵빙수 50%할인 — "이디야 컵빙수 맛있어요~~ 팥젤빙,망고빙 추천요ㅎ 티데이 50프로 할인해서 3가지맛 먹어봤는데요" (전주에 사는 사람들)</div><div className="rsrc">2026.06.03 · <a href="http://cafe.naver.com/gunsanletsgo/76315" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">요번주 T데이 넘 좋아요~ — "요번주 T데이 넘 좋아요^^ 이거말고 혜택이 더 있어요~~~" (배라맘)</div><div className="rsrc">2026.06.01 · <a href="http://cafe.naver.com/chch6534/1292440" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T멤버십 T데이, 이디야 컵빙수 50% 할인 외 (6/1~5) — "오 이케아!! 때마침 가려했는데!" (조회 다수)</div><div className="rsrc">2026.06.01 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104474" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">T데이 엔진오일 할인 행사해요 — "[T day] 스피드메이트 국산차 엔진오일 50% 할인+와이퍼 무료 교체, 결국 35,000원 할인에 와이퍼 무료임"</div><div className="rsrc">2026.06.01 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=car&no=970369" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">쉑쉑버거가 엄청 작았군요ㅎㅎ — "T데이 30% 쿠폰 받은거 사용해서 먹었는데..원래 이렇게 작았나요?^^;; 배가 안차네요ㅋㅋ"</div><div className="rsrc">2026.05.30 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=freeboard&no=9955639" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">T데이 진짜 맛없내,, — "맛없어서 눔나함 커피 나가고 부기만 남음" (이디야 컵빙수 나눔 글)</div><div className="rsrc">2026.05.27 · <a href="https://arca.live/b/breaking/171907157" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T멤버십 이번주 T데이 혜택 (5/27) — "요번엔 별거 없구먼" (조회 15,651)</div><div className="rsrc">2026.05.27 · <a href="https://bbs.ruliweb.com/pc/board/1020/read/104359" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">&lt;내돈내산&gt; 쉐이크쉑 쉑버거 1+1 T데이 후기 — "VIP는 버거 1+1 혜택이라 쉬림프쉑도 먹어봤어요"</div><div className="rsrc">2026.05.27 · <a href="https://blog.naver.com/yu_pingu/224298031540" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">T DAY 5월 27일 혜택 총정리 — 쉐이크쉑·뚜레쥬르·파스쿠찌·백억커피·CGV 한눈에 정리</div><div className="rsrc">2026.05.26 · <a href="https://blog.naver.com/dkdpdldhdn93/224294954907" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">SKT T데이 5월 27일 혜택 후기 — "쉐이크쉑 버거 30% 할인, VIP 고객님은 버거 1+1이에요" / 뚜레쥬르·파스쿠찌·백억커피 동시 운영</div><div className="rsrc">2026.05.25 · <a href="https://blog.naver.com/heejk1125/224295691706" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">5월 마지막 T데이 총정리 — "쉐이크쉡 1+1·뚜레쥬르 할인·파스쿠찌 40%·백억커피 100원" (#알뜰지출 정리글)</div><div className="rsrc">2026.05.25 · <a href="https://blog.naver.com/191130_/224294429402" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">SKT T데이·VIP 혜택 던킨 50% 할인 — "먼치킨 팩이랑 도넛 구입했습니다!" (컬처블룸)</div><div className="rsrc">2026.05.21 · <a href="http://cafe.naver.com/culturebloom/3226583" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">T day VIP 고객 던킨 반값 내돈내산 — "GOLD/SILVER 30% + VIP 고객 50% 할인, 직접 써봤어요"</div><div className="rsrc">2026.05.20 · <a href="https://blog.naver.com/kmkmj99/224291365697" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이 피자헛 포장 50% 할인 (5/20) — "덕분에 오랜만에 피자헛 주문했어요" (조회 33,372) / "요즘 할인율 줄이고 VIP만 챙겨주는 꼬라지 괘씸"</div><div className="rsrc">2026.05.20 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104230" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">T데이 베라 파인트 40% — "ㄱㄱ"</div><div className="rsrc">2026.05.20 · <a href="https://www.fmkorea.com/9849725169" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">5/20 T데이 던킨·베스킨·피자헛·톤28 할인 — "피자헛 50% 할인 받아서 점심에 피자 먹을려구요" (스펙업 카페)</div><div className="rsrc">2026.05.20 · <a href="http://cafe.naver.com/specup/7821251" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">5/20 T데이 혜택 공유 — "T데이 혜택 좋아요~~~" / "오늘 T할인 영화 배라 등등 꼭 챙기세요오~‼️" (지역 맘카페 다수)</div><div className="rsrc">2026.05.20 · <a href="http://cafe.naver.com/chch6534/1289804" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">T day 5/20 라인업 — VIP only 혜택 별도 안내 / 해피아워(파스쿠찌), CGV, 피자헛 VIP 전용 혜택 상세 정리</div><div className="rsrc">2026.05.19 · <a href="https://blog.naver.com/mijilim96/224289693952" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">[SKT] 2026 6월 T데이, 0week 혜택 총정리 — 매드포갈릭·이케아·파리바게뜨·크리스탈제이드·이디야·백미당·스피드메이트·CGV 라인업</div><div className="rsrc">2026.06.01 · <a href="https://blog.naver.com/deulb/224302157036" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">6월 T멤버십 0week 일정 총정리 — VIP 고객 전용 혜택 별도 안내, 0 week 브랜드별 할인 조건 정리</div><div className="rsrc">2026.06.01 · <a href="https://blog.naver.com/haha9661/224302347544" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">skt vip 우주패스 또 바뀌네 — 너프됐다는 지적 vs 개꿀이라는 반응 혼재</div><div className="rsrc">2026.05.28 · <a href="https://www.fmkorea.com/9882482767" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">난 SKT 혜택 알차게 뽑아먹고 있긴 함 — VIP 혜택 전반적 만족, 구체적 감정 유보</div><div className="rsrc">2026.05.28 · <a href="https://www.fmkorea.com/9882411653" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw5' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">쉑쉑버거 T멤버십 해피아워 — "T멤버십 매직 바코드 치킨 버거 세일해서 3,700원에 먹을 수 있었어요"</div><div className="rsrc">2026.06.07 · <a href="https://blog.naver.com/ru__by/224308743459" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">금요일 쉑쉑 포장 후기 — "대박 유용한 SKT T멤버십 해피아워 할인 꿀팁!"</div><div className="rsrc">2026.06.06 · <a href="https://blog.naver.com/kplove27/224307373698" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">쉐이크쉑 수지점 SKT 해피아워 — "VIP 고객 대상 해피아워 2~5시에 버거 2종에 대해 5천원 할인"</div><div className="rsrc">2026.06.04 · <a href="https://blog.naver.com/jin37_/224305910064" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">5월 SKT T멤버십 VIP 전용 해피아워 & 0 week — "파스쿠찌에서 오후 2시~5시 방문 시 쥐라또 1+1 혜택 받을 수 있어요"</div><div className="rsrc">2026.05.19 · <a href="https://blog.naver.com/psnm_gojan/224290370410" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">T멤버십 해피아워 파스쿠찌 쥐라또 1+1 — VIP 전용, 매일 오후 2~5시 방문 시 1+1 (5/4~5/31) / "결제 전에 해피아워 혜택이라고 말하고 이용하시면 됩니다"</div><div className="rsrc">2026.05.15 · <a href="https://blog.naver.com/ldb1118/224286072077" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '54%' }}><span className="upd">긍정 54%</span></div>
              <div className="rbs rn" style={{ width: '31%' }}><span className="upd">부정 31%</span></div>
              <div className="rbs ru" style={{ width: '15%' }}><span className="upd">중립 15%</span></div>
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
            <span className="srcbadge act">네이버블로그</span>
          </div>
          <KwTabs tabs={KT_TABS} active={ktKw} setActive={setKtKw} />
          {ktKw === 'kw1' && (
            <div></div>
          )}
          {ktKw === 'kw2' && (
            <div>
              <span className="upd"><div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 6월 달달초이스 (버거킹·빕스·더벤티·롯데시네마·던킨 등, 6/16~30) — "이번달엔 다행히 롯데시네마 안빠졌네" vs "빕스 샐러드바 진짜 맛없던데" "버거킹 원래 가격이 얼마인지 써놓아야지"</div><div className="rsrc">2026.06.15 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104825" target="_blank" rel="noreferrer">원문 보기</a></div></div></span>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 달달혜택 국민학교떡볶이 최대 60% 할인 — "달달초이스 신규 참여 브랜드, 5월 15~31일 이용 가능" 후기 긍정</div><div className="rsrc">2026.05.24 · <a href="https://blog.naver.com/kimtolnuna/224294989272" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt달달혜택 파리바게뜨 할인쿠폰 소진 — "어제부터였는데 선착할게 없으니깐 파빠 벌써 종료.. 하루밖에 안 됐잖아 ㅠ" "방금 샀는데 다 떨어졌구나"</div><div className="rsrc">2026.05.16 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75202922" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT 멤버십 토이스토리 5 시사회 응모 — "5월 달달혜택 최상단에서 응모가능" "시사회 정보 감사합니당"</div><div className="rsrc">2026.05.16 · <a href="https://www.fmkorea.com/9832474723" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">달달혜택 할리스 받았는데 동네 매장 없어졌다고? — "씊이네"</div><div className="rsrc">2026.05.16 · <a href="https://www.fmkorea.com/9832849366" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">Kt달달혜택 팀홀튼 개꿀인데??? — "아이스 딥라떼 저서 5천원이라 천원 결재하면 팥빙수 먹을수잇음ㅋㅋ 메뉴 변경 가능해서 개꿀임"</div><div className="rsrc">2026.05.16 · <a href="https://arca.live/b/breaking/170839379" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">5월 KT 달달혜택 팀홀튼 아이스 딥라떼 선착순 3만명 무료 — "이번 달은 좀 달달하네요" "도미노 50%도 생겼어요" / "팀홀튼 받았는데 매장이 없당 흑흑 바까줘"</div><div className="rsrc">2026.05.15 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104137" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw3' && (
            <div>
              <span className="upd"><div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 고객보답 6월 2차 (던킨 50%·GS25 컵라면/모찌 50%, 6/16~30) — "컵라면? 모찌롤? 옘병을 하고있네 이게 고객보답이야 재고정리야" "개인정보 탈탈 털리고...혜택까지 1500원짜리 컵라면 반값" (조회 23,151)</div><div className="rsrc">2026.06.15 · <a href="https://bbs.ruliweb.com/etcs/board/1020/read/104822" target="_blank" rel="noreferrer">원문 보기</a></div></div></span>
              <span className="upd"><div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt 고객보답? 6월 2차 목록 떴네 — "흠..." (작성자) "던킨 죽었어 ㅋㅋㅋ" (댓글)</div><div className="rsrc">2026.06.15 · <a href="https://bbs.ruliweb.com/etcs/board/300143/read/75573494" target="_blank" rel="noreferrer">원문 보기</a></div></div></span>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 고객보답 쿠폰 감사합니다 (배라맘)</div><div className="rsrc">2026.06.10 · <a href="http://cafe.naver.com/chch6534/1294375" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 고객보답 올리브영 이케아 방문시 함께 활용 (꿀 통)</div><div className="rsrc">2026.06.07 · <a href="http://cafe.naver.com/postmore/75418" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT고객보답 올영 3천원 선물 계획 — "바로 꿀릭"</div><div className="rsrc">2026.06.05 · <a href="https://www.fmkorea.com/9915186691" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">kt 고객 보답 올리브영 3천원권으로 릴리바이레드 워터틴트 구입 — "상큼 달달 좋았어요"</div><div className="rsrc">2026.06.06 · <a href="https://blog.naver.com/ddu_baeng/224308037333" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT멤버십 고객 보답 프로그램 6월 1차 — "올리브영 3천원 모바일 상품권이 그나마 괜찮은 거 같은데... 사용 기한이나 다운로드 기한 동일하네요;;; 6월 15일까지" (셰에라자드)</div><div className="rsrc">2026.06.02 · <a href="http://cafe.naver.com/schezade/295502" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">[Kt멤버십] 6월 고객보답(1차) — "조또 쓸모없는 케이티" "저 정도면 그냥 마케팅 아니냐?" "3천원이면 화장솜이나 가능한건가"</div><div className="rsrc">2026.05.30 · <a href="https://www.fmkorea.com/9889962492" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 고객보답 6월 1차 (올리브영 3천원권·쇼핑라운지 6천원 택1, 6/1~15) — "완전 조졌네" "이게 혜택인가 쇼핑라운지 장사지" 부정 반응 다수 (조회 6,115)</div><div className="rsrc">2026.05.30 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104452" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">KT 고객보답 6월1차 (올리브영 3천원권) — "오 올영 좋네요 ㅎㅎ" / "오랜만에 또 괜찮은거 나왔네요 올리브영 바로 가야겠어요" / "가족계정 5개 몰아 써야겠네요"</div><div className="rsrc">2026.05.29 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=544494" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT 고객보답 6월 1차 — "둘 다 이용 안 하는 곳이라 또 고를 게 없네..." "올리브영에서 음료나 과자 사던지" "아 이런게 있었지 디플말곤 쓰지도 않게된"</div><div className="rsrc">2026.05.29 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75363481" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">오 KT고객보답 이벤트 티빙 3개월 또주네 ㅋㅋ — "개꿀 ㅋㅋ" / "한삼식 3개월씩 나눠준다해서 ㅋㅋ"</div><div className="rsrc">2026.05.28 · <a href="https://www.fmkorea.com/9880980134" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 고객보답 2차 투썸 50% 사용후기 — "케이크·음료 반값으로 즐겼어요" (투썸 방문 후기)</div><div className="rsrc">2026.05.28 · <a href="https://blog.naver.com/suntrit/224298546315" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 고객보답 8,000원으로 노랑통닭 후기 — "배달민족 8천원 할인 쿠폰으로 노랑통닭 시켜먹었어요"</div><div className="rsrc">2026.05.27 · <a href="https://blog.naver.com/sabin0719/224298320639" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 고객보답 노랑통닭 마늘치킨 후기 — "KT 개인정보 유출 보상 쿠폰으로 노랑통닭 3종 치킨 시켰다" 긍정 평가</div><div className="rsrc">2026.05.25 · <a href="https://blog.naver.com/byeol_arii/224295613535" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">KT 고객보답 투썸 방문 일상 — "엄마랑 KT 고객 보답 프로그램 쿠폰 쓰러 왔다, 투썸에서 케이크·음료 반값"</div><div className="rsrc">2026.05.25 · <a href="https://blog.naver.com/92yebinee/224295720090" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">[KT멤버십] 고객보답 5월 2차(노랑통닭 8천원권/투썸 50%할인)(5/18~31) — 긍정·부정 반응 혼재 (조회 95,125)</div><div className="rsrc">2026.05.20 · <a href="https://bbs.ruliweb.com/etcs/board/1020/read/104246" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt 고객보답 5월 2차 혜택 — "둘 다 이용을 안 해서 고를게 없네.." "이번건 좀 별로네" "50프로라면서 최대 5천원 할인 조금 짜긴 하네.."</div><div className="rsrc">2026.05.18 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75221584" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT멤버십 5월 고객보답 2차 (투썸50%/배민×노랑통닭) 공유 — "오랜만에 노통 함 조져야겠네" "메가커피 오늘 먹어야겠네 2잔 아메리카노 공짜!!"</div><div className="rsrc">2026.05.15 · <a href="https://www.fmkorea.com/9827869002" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '88%' }}><span className="upd">긍정 88%</span></div>
              <div className="rbs ru" style={{ width: '12%' }}><span className="upd">중립 12%</span></div>
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
          </div>
          <KwTabs tabs={LGU_TABS} active={lguKw} setActive={setLguKw} />
          {lguKw === 'kw2' && (
            <div>
              <span className="upd"><div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">오늘의 유플투쁠♡ 아웃백♡♡♡25%쿠폰 (배라맘)</div><div className="rsrc">2026.06.16 · <a href="http://cafe.naver.com/chch6534/1295700" target="_blank" rel="noreferrer">원문 보기</a></div></div></span>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플투쁠 카카오페이지 받기 완료♡ (배라맘)</div><div className="rsrc">2026.06.11 · <a href="http://cafe.naver.com/chch6534/1294547" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">6월 유플투쁠 아웃백있어요♡♡ — "뭐 별거 없네 하고 에잇했더니 아웃백이 있네요~ 저거 받음 털러 가봐야겠어요♡♡" (배라맘 카페)</div><div className="rsrc">2026.06.01 · <a href="http://cafe.naver.com/chch6534/1292429" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플투쁠 6월예고) 아웃백이 돌아왔어요 — "머선일입니까아 16일에 앗백이 뙇! 유플 VVIP분들 소리질러엇!!!!!!! 내눈엔 앗백만 보임ㅋㅋ" (맘이베베)</div><div className="rsrc">2026.06.01 · <a href="http://cafe.naver.com/skybluezw4rh/14630554" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">26년 6월 유플투쁠 혜택 정리 — 6.9 카카오웹툰·아모레몰·웅진플레이도시 워터파크 등 날짜·브랜드별 라인업 공개</div><div className="rsrc">2026.06.01 · <a href="https://blog.naver.com/chloe7513/224302356530" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">2026 유플러스 장기고객 혜택 정리 — 스타벅스·배민 할인까지. 매월 마지막 주 목요일 장기고객데이 운영 (네사모 카페)</div><div className="rsrc">2026.05.20 · <a href="http://cafe.naver.com/uccplus/2388682" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">5월 21일 유플투쁠데이! VVIP·10년 이상 장기고객 다이소 금액권 2천원 전원 지급 (퀴즈정답 공유)</div><div className="rsrc">2026.05.19 · <a href="http://cafe.naver.com/bluegray2vo9q/23095" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {lguKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버블로그</span></div><div className="rtx">VIP콕 배스킨라빈스 무료교환 혜택 정리 — "유플멤버십 VIP콕 혜택으로 배스킨라빈스에서 무료 교환 가능한 메뉴" 상세 안내</div><div className="rsrc">2026.05.25 · <a href="https://blog.naver.com/amazing_0070/224295711582" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
