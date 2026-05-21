import { useState } from 'react';

const SKT_TABS = [
  { id: 'kw1', label: 'T 멤버십 전반', hasData: false },
  { id: 'kw2', label: 'T day',          hasData: true  },
  { id: 'kw3', label: '0week·0day',     hasData: true  },
  { id: 'kw4', label: 'VIP PICK',       hasData: true  },
];

const KT_TABS = [
  { id: 'kw1', label: 'KT 멤버십 전반',   hasData: true },
  { id: 'kw2', label: '달달혜택',          hasData: true },
  { id: 'kw3', label: '고객보답프로그램',  hasData: true },
];

const LGU_TABS = [
  { id: 'kw1', label: 'U+ 멤버십 전반',       hasData: false },
  { id: 'kw2', label: '유플투쁠',              hasData: true  },
  { id: 'kw3', label: '스페셜데이·장기고객데이', hasData: true  },
  { id: 'kw4', label: 'VIP 콕',               hasData: true  },
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
  const [ktKw,  setKtKw]  = useState('kw3');
  const [lguKw, setLguKw] = useState(firstActive(LGU_TABS));

  return (
    <div className="sec" id="sn">
      <div className="sh">
        <span className="st">💬 고객 반응</span>
        <span className="ss">최근 4주 · 에펨코리아·루리웹·아카라이브·뽐뿌·네이버카페 (2026.05.21 갱신)</span>
        <span className="upd-badge upd-3m">↻ 주간 MCP</span>
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
              <div className="rbs rp" style={{ width: '45%' }}>긍정 45%</div>
              <div className="rbs rn" style={{ width: '40%' }}>부정 40%</div>
              <div className="rbs ru" style={{ width: '15%' }}>중립 15%</div>
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
          </div>
          <KwTabs tabs={SKT_TABS} active={sktKw} setActive={setSktKw} />
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">버거킹 13~15일 T멤버십 와퍼 55% 할인 공유 — "갈 일 없어도 가야겠는걸"</div><div className="rsrc">2026.05.12 · <a href="https://www.fmkorea.com/9816271602" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이 와퍼 4400원·공차 50% 할인 — "오늘 간만에 와퍼 하나 먹어야겠네요" (조회 21,553)</div><div className="rsrc">2026.05.13 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104070" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">SKT T데이·VIP 혜택 던킨 50% 할인 — "먼치킨 팩이랑 도넛 구입했습니다!" (컬처블룸)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">T day 스벅 아이스 아메리카노 추첨 참여 — "전 꽝이네요ㅋㅋ"</div><div className="rsrc">2026.05.04 · <a href="https://www.fmkorea.com/9784172789" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">아카라이브</span></div><div className="rtx">T멤버십 와퍼 할인 날짜 착각 — "이거 이번주 수요일부터였구나 / 내 세상이 무너졌어.."</div><div className="rsrc">2026.05.10 · <a href="https://arca.live/b/breaking" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">SKT 0week 메가커피 쿠폰 공유 — "님 덕에 공짜쌀먹" "ㄱㅅㄱㅅ!"</div><div className="rsrc">2026.05.06 · <a href="https://www.fmkorea.com/9792056294" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">SKT 0week 홍콩반점 짜장면 3,900원 / 투썸 조각케익 40% 할인 — "서두르세요~" (모모폰 카페)</div><div className="rsrc">2026.05.08 · <a href="https://cafe.naver.com" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">T데이 노브랜드버거 세트 구입 시 콤보 증정 이벤트 — "진짜 별거 없네" "T데이는 치킨 하나 보고 갔는데 이젠 치킨도 없네" (5/4~8)</div><div className="rsrc">2026.05.04 · <a href="https://bbs.ruliweb.com/news/board/1020/read/103869" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">SKT 0데이 이벤트 링크 — "이거말곤 별로임"</div><div className="rsrc">2026.05.04 · <a href="https://www.fmkorea.com/9770273964" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">SKT VIP Pick으로 CGV 1인 8,000원 예매 — "skt vip pick 혜택으로 2D 영화 가능합니다" (짠돌이카페)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com/engmstudy" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">개좆슼 VIP 혜택 또 칼질 — "우주패스 12회에서 3회로 줄이고 이젠 없애네" "요금제 비싼거 팔아먹으면서 VIP 혜택도 줄이네 아" "프라임플러스 낮춰야되나 ㅋㅋ 이젠 쓰레기네"</div><div className="rsrc">2026.04.30 · <a href="https://www.fmkorea.com/9769581756" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">11번가 아마존 6월 종료로 T우주패스 혜택 변경 — "우주패스 개악된 이후 거의 안써먹음" "달러 미쳐서 해외직구 가성비 꽝"</div><div className="rsrc">2026.04.30 · <a href="https://bbs.ruliweb.com/etcs/board/300010/read/2288393" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">뽐뿌</span></div><div className="rtx">VIP픽 9900원 쿠폰 폐지 반응 — "갈수록 혜택을 줄이네" "좀 괜찮다 싶은 혜택은 다 사라지네요" "메가커피 할인도 없애더니.." (조회 15,247 · 인기글)</div><div className="rsrc">2026.04.30 · <a href="https://www.ppomppu.co.kr/zboard/view.php?id=money&no=543529" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rp" style={{ width: '45%' }}>긍정 45%</div>
              <div className="rbs rn" style={{ width: '40%' }}>부정 40%</div>
              <div className="rbs ru" style={{ width: '15%' }}>중립 15%</div>
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
          </div>
          <KwTabs tabs={KT_TABS} active={ktKw} setActive={setKtKw} />
          {ktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT멤버십 롤파크 티켓구매 — "카드결제 됐는데 품절, 매크로 아니냐" "올해부턴 걍 불가능이다"</div><div className="rsrc">2026.05.01 · <a href="https://www.fmkorea.com/9772989347" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">KT 달달혜택 투썸 50% — "커피랑 케이크 먹고 있는데 행복하네요 50프로 잘썼어영" (핫딜맘 놀이터)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com/hotdealplayground" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">5월 KT 달달혜택 팀홀튼 아이스 딥라떼 선착순 3만명 무료 — "이번 달은 좀 달달하네요" "도미노 50%도 생겼어요" / "팀홀튼 받았는데 매장이 없당 흑흑 바까줘"</div><div className="rsrc">2026.05.15 · <a href="https://bbs.ruliweb.com/market/board/1020/read/104137" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">kt달달혜택 파리바게뜨 할인쿠폰 소진 — "어제부터였는데 선택할게 없으니깐 파빠 벌써 종료.. 하루밖에 안 됐잖아 ㅠ" "방금 샀는데 다 떨어졌구나"</div><div className="rsrc">2026.05.16 · <a href="https://bbs.ruliweb.com/community/board/300143/read/75202922" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT 멤버십 토이스토리 5 시사회 응모 — "5월 달달혜택 최상단에서 응모가능" "시사회 정보 감사합니당"</div><div className="rsrc">2026.05.16 · <a href="https://www.fmkorea.com/9832474723" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">도미노를 꾸준히 시키는 이유 — "15일부터 KT 달달혜택 도미노피자라서 반값입니다"</div><div className="rsrc">2026.05.13 · <a href="https://www.fmkorea.com/9821160936" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">달달혜택 할리스 받았는데 동네 매장 없어졌다고? — "씊이네"</div><div className="rsrc">2026.05.16 · <a href="https://www.fmkorea.com/9832849366" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT멤버십 5월 고객보답 2차 (투썸50%/배민×노랑통닭) 공유 — "오랜만에 노통 함 조져야겠네" "메가커피 오늘 먹어야겠네 2잔 아메리카노 공짜!!"</div><div className="rsrc">2026.05.15 · <a href="https://www.fmkorea.com/9827869002" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">5월 KT 고객감사 메가커피 2잔 무료 — "U플러스는 고객감사 안하나ㅡ.ㅡ"</div><div className="rsrc">2026.05.08 · <a href="https://www.fmkorea.com/9800753363" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">5월 KT멤버십 커피2잔 — "쭈차뿔라 공짜 2잔?!"</div><div className="rsrc">2026.05.07 · <a href="https://www.fmkorea.com/9795918182" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">루리웹</span></div><div className="rtx">KT멤버십 고객보답 5월 1차 — "이번에는 그래도... 메가커피가 돌아왔네요" (조회 44,751)</div><div className="rsrc">2026.05.01 · <a href="https://bbs.ruliweb.com/market/board/1020/read/103822" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT멤버십 5월 1차 보답프로그램 — "보답이 짜다.." "VVIP 혜택 축소, 베라 레디팩 1개" "그래도 kt는 하기라도 하지"</div><div className="rsrc">2026.05.01 · <a href="https://www.fmkorea.com/9772119625" target="_blank" rel="noreferrer">원문 보기</a></div></div>
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
              <div className="rbs rn" style={{ width: '30%' }}>부정 30%</div>
              <div className="rbs ru" style={{ width: '20%' }}>중립 20%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs">
            <span className="srcbadge">에펨코리아</span>
            <span className="srcbadge">루리웹</span>
            <span className="srcbadge">아카라이브</span>
            <span className="srcbadge">뽐뿌</span>
            <span className="srcbadge act">네이버카페</span>
          </div>
          <KwTabs tabs={LGU_TABS} active={lguKw} setActive={setLguKw} />
          {lguKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플투쁠 롯데백화점몰 쿠폰 적용 안됨 — "적용되는게 읎어욬ㅋㅋ 어떤거 사시나요 쿠폰 버려야하나봐여" (핫딜맘 놀이터)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com/hotdealplayground/510522" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플투쁠 6월 신청 ~5/25까지 — 쇼핑·식음료·문화 혜택 소개 (BOOST US)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com/boostus" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {lguKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">5월 21일 유플투쁠데이! VVIP·10년↑ 장기고객 다이소 금액권 2천원 전원 지급 (퀴즈정답 공유)</div><div className="rsrc">2026.05.21 · <a href="https://cafe.naver.com" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">2026 유플러스 장기고객 혜택 정리 — 스타벅스·배민 할인까지. 매월 마지막 주 목요일 장기고객데이 운영 (네사모 카페)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
            </div>
          )}
          {lguKw === 'kw4' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플 VIP콕 쿠폰 덕에 0원 지출 — "유플 VIP콕 쿠폰 덕에 0원 지출 있었습니다. (4,900원 절약)" (월급쟁이 재테크)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플러스 VIP콕으로 스타벅스 — "언니가 VIP콕으로 스벅 쏴줬다" (겟꿀 카페)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">네이버카페</span></div><div className="rtx">유플러스 장기고객 VIP콕 혜택 정리 — "강력 VIP콕 혜택 (스타벅스, 영화 1+1, OTT 할인 등) 유독 4,000원 추가 할인" (네사모 카페)</div><div className="rsrc">2026.05 · <a href="https://cafe.naver.com" target="_blank" rel="noreferrer">네이버 카페</a></div></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
