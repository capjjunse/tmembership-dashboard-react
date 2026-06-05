import { useState } from 'react';

export default function News() {
  const [tab, setTab] = useState('skt');

  return (
    <div className="sec" id="nw">
      <div className="sh">
        <span className="st">📰 뉴스 스크랩</span>
        
      </div>
      <div className="tr2" style={{ marginBottom: '14px' }}>
        <button className={`ntab${tab === 'skt' ? ' as' : ''}`} onClick={() => setTab('skt')}>SKT</button>
        <button className={`ntab${tab === 'kt' ? ' ak' : ''}`} onClick={() => setTab('kt')}>KT</button>
        <button className={`ntab${tab === 'lgu' ? ' al' : ''}`} onClick={() => setTab('lgu')}>LGU+</button>
      </div>

      {tab === 'skt' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">6월 T멤버십 — 프로야구 Lucky Week·시험 기간 혜택까지 풍성</span></div>
            <div className="nsum">T day 1주차(6.8~6.12) '프로야구 Lucky Week' 신설, 티빙 구독자 고척돔 직관 응모·요기요×호식이두마리치킨 VIP 8천원/Gold·Silver 6천원 할인, 루메나 무선선풍기 응모. 후지필름 6.15 신규 제휴(포토북 40%·사진인화 20%) 예고.</div>
            <div className="nmeta">2026-06-01 · <a href="https://news.sktelecom.com/225691" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">"6월 첫 주말엔 매드포갈릭 반값" — T day 0 week VIP 50%·Gold/Silver 30% 쿠폰</span></div>
            <div className="nsum">매드포갈릭이 SKT T day 0 week(6.1~6.5) 연계로 VIP 최대 5만원 50% 할인, Gold·Silver 최대 3만원 30% 할인 쿠폰 제공. 쿠폰 다운로드 6.1~6.5, 사용 기한 6.7. 자체 할인 쿠폰과 중복 사용 가능.</div>
            <div className="nmeta">2026-05-28 · <a href="https://www.etoday.co.kr/news/view/2588705" target="_blank" rel="noreferrer">이투데이</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">SKT T우주에 '유튜브 프리미엄 라이트' 월 7,900원 출시 — 광고 제거·배경재생 지원</span></div>
            <div className="nsum">T우주 구독 플랫폼에 유튜브 프리미엄 라이트 추가. 유튜브 광고 제거·배경재생 지원, 오프라인 저장 및 유튜브 뮤직은 미포함. VIP Pick T우주패스 연계 활용 가능.</div>
            <div className="nmeta">2026-05-26 · <a href="https://news.sktelecom.com/225239" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">SKT 'T 장기고객 숲캉스 데이' 성료 — 10년 이상 장기고객 1,800명 초청, 최대 863:1 경쟁률</span></div>
            <div className="nsum">T멤버십 앱 응모로 진행. 에버랜드 단독 대관 체험 이벤트. 파인 다이닝·놀이공원·뮤지컬 등 장기고객 전용 초청 이벤트 지속 예정으로, SKT 장기고객 우대 전략 강화 기조 확인.</div>
            <div className="nmeta">2026-05-19 · <a href="https://news.sktelecom.com/225016" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
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
        </div>
      )}

      {tab === 'kt' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">KT 6월 멤버십 혜택 강화 — 바캉스 테마 달달혜택 6.17 공개 예정</span></div>
            <div className="nsum">6월 달달혜택 '바캉스' 테마로 6.17~6.30 운영 예정. 달달초이스·달달스페셜·달달찬스 3종 구성, 여름 휴가철 여행·외식·쇼핑 브랜드 참여. 영화관 할인 강화(롯데시네마·메가박스 추가 1천원) 병행.</div>
            <div className="nmeta">2026-06-01 · <a href="https://corp.kt.com/html/promote/news/report_detail.html?datNo=18377" target="_blank" rel="noreferrer">KT 보도자료</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">KT 멤버십 5월 고객보답 2차 — 투썸플레이스 50%·배민×노랑통닭 8천원 (5.18~31)</span></div>
            <div className="nsum">KT멤버십 5월 고객보답 2차로 투썸플레이스 전 메뉴 50%(최대 5천원) 또는 배달의민족×노랑통닭 8천원 할인(16천원 이상) 중 택1. 5.18~31 전 등급 이용 가능.</div>
            <div className="nmeta">2026-05-15 · <a href="https://biz.heraldcorp.com/article/10738436" target="_blank" rel="noreferrer">헤럴드경제</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">국민학교 떡볶이, KT 달달혜택 달달초이스 첫 참여 (5.15~31)</span></div>
            <div className="nsum">분식 브랜드 국민학교 떡볶이가 KT멤버십 달달초이스에 첫 합류. 5.15~31 쿠폰 다운로드 후 공식 사이트 등록으로 혜택 제공. "KT멤버십 고객에게 더 실질적인 혜택을" 목표.</div>
            <div className="nmeta">2026-05-15 · <a href="https://www.mt.co.kr/stock/2026/05/15/2026051508142888359" target="_blank" rel="noreferrer">머니투데이</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">KT, 가정의 달 맞이 5월 멤버십 혜택 공개 — 쉐이크쉑·달달혜택·고객보답 동시 운영</span></div>
            <div className="nsum">5월 달달혜택으로 롯데마트 제타 50%, 할리스·폴바셋 50%, 쉐이크쉑·도미노·파리바게뜨 할인 제공. 투썸플레이스 50% 또는 배민×노랑통닭 8천원 고객보답 2차 병행으로 3사 중 5월 혜택 밀도 최상.</div>
            <div className="nmeta">2026-05-15 · <a href="https://www.newspim.com/news/view/20260515001139" target="_blank" rel="noreferrer">뉴스핌</a></div>
          </div>
        </div>
      )}

      {tab === 'lgu' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">응원과 혜택을 한 번에, 6월을 위한 유플투쁬 혜택</span></div>
            <div className="nsum">6월 한 달간 식음료, 문화/여가, 쇼핑 분야에서 다양한 혜택. 피자헛 프리미엄 피자 55% 할인(6/19), 아웃백 최대 25% 할인(6/16), 배스킨라빈스 패밀리 사이즈 최대 9천원 할인(6/15), CGV 유플투쁬세트 무료(6/18), 서울랜드 파크이용권 55% 할인(6/19), 컬리 5천원 할인(6/15), 다이소 최대 2천원 금액권(6/23) 등. U+one 앱 유플투쁬 타임 오전 11시 선착순.</div>
            <div className="nmeta">2026-06-02 · <a href="https://news.lguplus.com/21954" target="_blank" rel="noreferrer">LGU+ 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">'탱크데이'에 거리 두는 통신사들…6월 유플투쁠에서 스타벅스 별 리워드 이벤트 중단</span></div>
            <div className="nsum">스타벅스 탱크데이 논란 이후 LGU+ 유플투쁠이 5월까지 운영한 스타벅스 별 리워드 이벤트를 6월부터 중단. 투썸플레이스·공차 등 다른 음료 혜택은 유지. SKT·KT도 초기화면 노출·로고 삭제 등 스타벅스 연계를 축소.</div>
            <div className="nmeta">2026-06-01 · <a href="https://www.newspim.com/news/view/20260601001109" target="_blank" rel="noreferrer">뉴스핌</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">LGU+ 장기고객 대상 '레고랜드 RUN' 체험형 행사 성황 — VIP 이상·5년이상 4천명 초청</span></div>
            <div className="nsum">강원도 춘천 레고랜드 코리아에서 멤버십 VIP 이상 5년 이상 장기고객 4천명 대상 참여형 프로그램 진행. 가정의 달 맞아 가족 콘텐츠 구성. 장기고객 대상 체험형 행사 연속 개최로 우대 전략 지속 강화.</div>
            <div className="nmeta">2026-05-18 · <a href="https://news.lguplus.com/21847" target="_blank" rel="noreferrer">LGU+ 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">5월 유플투쁠 혜택 공개 — 공차·배스킨·이마트24·컬리·다이소 등 생활밀착형 라인업</span></div>
            <div className="nsum">투쁠데이·스페셜데이·장기고객데이 3종 체계로 매달 특정일 오전 11시 선착순 혜택 운영. 5월은 공차·배스킨라빈스·이마트24·컬리·다이소 등 외식·쇼핑 브랜드 집중 편성. 5.28 장기고객데이는 CGV·NOL티켓·윌라 문화혜택 제공.</div>
            <div className="nmeta">2026-05-07 · <a href="https://news.lguplus.com/21804" target="_blank" rel="noreferrer">LGU+ 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">LGU+, 가정의달 5월 야외활동 중심 멤버십 혜택 강화 — 테마파크·외식·문화</span></div>
            <div className="nsum">서울랜드·롯데월드·레고랜드 추첨 응모, 피자헛 55%·청기와타운 육회 무료 등 외식 혜택, LG아트센터·CGV PEAKERS 클라이밍 등 문화 혜택 병행.</div>
            <div className="nmeta">2026-05-07 · <a href="https://www.fnnews.com/news/202505070910590134" target="_blank" rel="noreferrer">파이낸셜뉴스</a></div>
          </div>
        </div>
      )}
    </div>
  );
}
