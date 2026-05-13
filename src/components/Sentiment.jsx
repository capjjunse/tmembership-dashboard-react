import { useState } from 'react';

export default function Sentiment() {
  const [carrier, setCarrier] = useState('skt');
  const [sktKw, setSktKw] = useState('kw1');
  const [ktKw, setKtKw] = useState('kw1');

  return (
    <div className="sec" id="sn">
      <div className="sh">
        <span className="st">💬 고객 반응</span>
        <span className="ss">최근 4주 · 에펨코리아 기반</span>
        <span className="upd-badge upd-3m">↻ 주간 MCP</span>
      </div>
      <div className="tr2">
        <button className={`ctab${carrier === 'skt' ? ' cs' : ''}`} onClick={() => setCarrier('skt')}>SKT</button>
        <button className={`ctab${carrier === 'kt' ? ' ck' : ''}`} onClick={() => setCarrier('kt')}>KT</button>
        <button className={`ctab${carrier === 'lgu' ? ' cl' : ''}`} onClick={() => setCarrier('lgu')}>LGU+</button>
      </div>

      {carrier === 'skt' && (
        <div>
          <div className="rbw" style={{ marginTop: '12px' }}>
            <div className="rbl">멤버십 혜택 관련 전반적 반응 비율</div>
            <div className="rb">
              <div className="rbs rp" style={{ width: '55%' }}>긍정 55%</div>
              <div className="rbs rn" style={{ width: '30%' }}>부정 30%</div>
              <div className="rbs ru" style={{ width: '15%' }}>중립 15%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs"><span className="srcbadge act">에펨코리아</span></div>
          <div className="tr2" style={{ marginBottom: '12px' }}>
            <button className={`kw${sktKw === 'kw1' ? ' on' : ''}`} onClick={() => setSktKw('kw1')}>#T멤버십 T day</button>
            <button className={`kw${sktKw === 'kw2' ? ' on' : ''}`} onClick={() => setSktKw('kw2')}>#0week 혜택</button>
            <button className={`kw${sktKw === 'kw3' ? ' on' : ''}`} onClick={() => setSktKw('kw3')}>#VIP Pick</button>
          </div>
          {sktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">버거킹 13~15일 T멤버십 와퍼 55% 할인 공유 — "갈 일 없어도 가야겠는걸"</div><div className="rsrc">2026.05.12 · <a href="https://www.fmkorea.com/9816271602" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">T day 스벅 아이스 아메리카노 추첨 참여 — "전 꽝이네요ㅋㅋ"</div><div className="rsrc">2026.05.04 · <a href="https://www.fmkorea.com/9784172789" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">SKT 0week 메가커피 쿠폰 공유 — "님 덕에 공짜쌀먹" "ㄱㅅㄱㅅ!"</div><div className="rsrc">2026.05.06 · <a href="https://www.fmkorea.com/9792056294" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">skt 0데이 이벤트 링크 — "이거말곤 별로임"</div><div className="rsrc">2026.05.04 · <a href="https://www.fmkorea.com/9770273964" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {sktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneu">중립</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">VIP Pick T우주패스 이용법 공유 — "알뜰폰 쓰는데 커피가 더 부럽네" "와 개꿀팁 ㄱㅅ"</div><div className="rsrc">2026.04.15 · <a href="https://www.fmkorea.com/9712143053" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}

      {carrier === 'kt' && (
        <div>
          <div className="rbw" style={{ marginTop: '12px' }}>
            <div className="rbl">멤버십 혜택 관련 전반적 반응 비율</div>
            <div className="rb">
              <div className="rbs rp" style={{ width: '40%' }}>긍정 40%</div>
              <div className="rbs rn" style={{ width: '45%' }}>부정 45%</div>
              <div className="rbs ru" style={{ width: '15%' }}>중립 15%</div>
            </div>
            <div className="rleg">
              <div className="rli"><div className="rld" style={{ background: 'var(--pos)' }}></div>긍정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neg)' }}></div>부정</div>
              <div className="rli"><div className="rld" style={{ background: 'var(--neu)' }}></div>중립</div>
            </div>
          </div>
          <div className="srcs"><span className="srcbadge act">에펨코리아</span></div>
          <div className="tr2" style={{ marginBottom: '12px' }}>
            <button className={`kw${ktKw === 'kw1' ? ' on' : ''}`} onClick={() => setKtKw('kw1')}>#KT멤버십 고객감사</button>
            <button className={`kw${ktKw === 'kw2' ? ' on' : ''}`} onClick={() => setKtKw('kw2')}>#KT멤버십 티켓팅</button>
            <button className={`kw${ktKw === 'kw3' ? ' on' : ''}`} onClick={() => setKtKw('kw3')}>#KT멤버십 보답프로그램</button>
          </div>
          {ktKw === 'kw1' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">5월 KT 고객감사 메가커피 2잔 무료 — "U플러스는 고객감사 안하나ㅡ.ㅡ"</div><div className="rsrc">2026.05.08 · <a href="https://www.fmkorea.com/9800753363" target="_blank" rel="noreferrer">원문 보기</a></div></div>
              <div className="rc"><div className="rct"><span className="rbg rpos">긍정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">5월 KT멤버십 커피2잔 — "쭈차뿔라 공짜 2잔?!"</div><div className="rsrc">2026.05.07 · <a href="https://www.fmkorea.com/9795918182" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw2' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT멤버십 롤파크 티켓구매 — "카드결제 됐는데 품절, 매크로 아니냐" "올해부턴 걍 불가능이다"</div><div className="rsrc">2026.05.01 · <a href="https://www.fmkorea.com/9772989347" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
          {ktKw === 'kw3' && (
            <div>
              <div className="rc"><div className="rct"><span className="rbg rneg">부정</span><span className="rtag tsrc">에펨코리아</span></div><div className="rtx">KT멤버십 5월 1차 보답프로그램 — "보답이 짜다.." "VVIP 혜택 축소, 베라 레디팩 1개" "그래도 kt는 하기라도 하지"</div><div className="rsrc">2026.05.01 · <a href="https://www.fmkorea.com/9772119625" target="_blank" rel="noreferrer">원문 보기</a></div></div>
            </div>
          )}
        </div>
      )}

      {carrier === 'lgu' && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--tx2)', fontSize: '12px', lineHeight: 2 }}>
          최근 4주 이내 수집된 반응이 없습니다.<br />
          <span style={{ fontSize: '11px', color: 'var(--tx3)' }}>(검색어: 유플투쁠, 투쁠데이, 장기고객데이, U+멤버십 등 전 키워드 소진)</span>
        </div>
      )}
    </div>
  );
}
