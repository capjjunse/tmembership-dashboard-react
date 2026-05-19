import { useState } from 'react';

export default function News() {
  const [tab, setTab] = useState('skt');

  return (
    <div className="sec" id="nw">
      <div className="sh">
        <span className="st">📰 뉴스 스크랩</span>
        <span className="upd-badge upd-3m">↻ 주간 갱신</span>
      </div>
      <div className="tr2" style={{ marginBottom: '14px' }}>
        <button className={`ntab${tab === 'skt' ? ' as' : ''}`} onClick={() => setTab('skt')}>SKT</button>
        <button className={`ntab${tab === 'kt' ? ' ak' : ''}`} onClick={() => setTab('kt')}>KT</button>
        <button className={`ntab${tab === 'lgu' ? ' al' : ''}`} onClick={() => setTab('lgu')}>LGU+</button>
      </div>

      {tab === 'skt' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">5월 T멤버십 혜택 총정리 — 루덴시아·더벤티 신규, 가정의달 테마파크 특별전, VIP Pick 혜택</span></div>
            <div className="nsum">5월 신규 제휴사로 루덴시아·더벤티 추가. 투루카 65% 할인, 고향사랑기부제 이벤트 포함. 가정의달 맞아 가족 혜택 강화.</div>
            <div className="nmeta">2026-05-01 · <a href="https://news.sktelecom.com/224466" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">SKT T멤버십 새단장 — 0 week 확대·VIP 찬스·VIP only 신설</span></div>
            <div className="nsum">0 day를 0 week로 확대해 5일간 이용 가능. T day에 VIP 전용 찬스·only 신설. 갤럭시 S26 개통 고객 맞춤 클럽 갤럭시 S26 운영.</div>
            <div className="nmeta">2026-04-01 · <a href="https://news.sktelecom.com/223425" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">SKT·KT·LGU+ 갤럭시 S26 사전예약 혜택 경쟁</span></div>
            <div className="nsum">3사가 갤럭시 S26 사전예약 기간 멤버십 혜택 강화. SKT는 클럽 갤럭시 S26 패키지 선보이며 체험형 마케팅 전략 구사.</div>
            <div className="nmeta">2026-02-26 · <a href="https://www.thelec.kr/news/articleView.html?idxno=52782" target="_blank" rel="noreferrer">디일렉</a></div>
          </div>
        </div>
      )}

      {tab === 'kt' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">KT 멤버십 5월 고객보답 2차 — 투썸플레이스 50%·배민×노랑통닭 8천원 (5.18~31)</span></div>
            <div className="nsum">KT멤버십 5월 고객보답 2차로 투썸플레이스 전 메뉴 50%(최대 5천원) 또는 배달의민족×노랑통닭 8천원 할인(16천원↑) 중 택1. 5.18~31 전 등급 이용 가능.</div>
            <div className="nmeta">2026-05-15 · <a href="https://biz.heraldcorp.com/article/10738436" target="_blank" rel="noreferrer">헤럴드경제</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">국민학교 떡볶이, KT 달달혜택 달달초이스 첫 참여 (5.15~31)</span></div>
            <div className="nsum">분식 브랜드 국민학교 떡볶이가 KT멤버십 달달초이스에 첫 합류. 5.15~31 쿠폰 다운로드 후 공식 사이트 등록으로 혜택 제공. "KT멤버십 고객에게 더 실질적인 혜택을" 목표.</div>
            <div className="nmeta">2026-05-15 · <a href="https://www.mt.co.kr/stock/2026/05/15/2026051508142888359" target="_blank" rel="noreferrer">머니투데이</a></div>
          </div>
        </div>
      )}

      {tab === 'lgu' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">LGU+, 가정의달 5월 야외활동 중심 멤버십 혜택 강화 — 테마파크·외식·문화</span></div>
            <div className="nsum">서울랜드·롯데월드·레고랜드 추첨 응모, 피자헛 55%·청기와타운 육회 무료 등 외식 혜택, LG아트센터·CGV PEAKERS 클라이밍 등 문화 혜택 병행.</div>
            <div className="nmeta">2026-05-07 · <a href="https://www.fnnews.com/news/202505070910590134" target="_blank" rel="noreferrer">파이낸셜뉴스</a></div>
          </div>
        </div>
      )}
    </div>
  );
}
