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
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">방콕·나트랑·괌 현지 혜택부터 브랜드 위크까지, 8월 T 멤버십 한눈에 보기</span></div>
            <div className="nsum">8월 글로벌 여행 바캉스 프로모션으로 방콕(공항 픽업·마하나콘 스카이워크 최대 50% 할인), 나트랑(패스트트랙·공항 픽업 반값·루나 스파 최대 30% 할인), 괌(스트롤 택시 15% 할인·아이홉·호놀룰루 커피 무료) 등 현지 혜택 제공. T day 2주차 뚜레쥬르 300원/천원 할인, 3주차 도미노피자 50%, 4주차 11번가 최대 50% 할인. Young Week 문화 공연 할인, 신규 제휴사 샐러디 10% 할인 추가.</div>
            <div className="nmeta">2026-08-02 · <a href="https://news.sktelecom.com/228744" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">SKT, 1000만 러너 사로잡을 신규 제품·혜택 선보인다</span></div>
            <div className="nsum">러닝 고객 대상으로 가민 포러너 70·265 스마트워치와 샥즈 오픈런 프로2 골전도 이어폰 신규 도입. 스마트기기 할부금 할인 혜택(월 최대 2만 4천원 할인) 대상에 포함. 9월 19일 '2026 무한도전 Run in 경주' 마라톤 이벤트 메인 스폰서로 갤럭시 Z 폴더블8 구매 고객 대상 참가권 추첨(2천명). 장기 '런메이트' 프로그램으로 러닝 관련 상품·혜택 지속 확대 예정.</div>
            <div className="nmeta">2026-08-02 · <a href="https://news.sktelecom.com/228778" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">SKT, 8~9월 고객 혜택 확대 — 에어 요금제 첫 달 70% 포인트·영화 반값·멤버십 혜택</span></div>
            <div className="nsum">에어 요금제 신규 가입 시 월정액 70% 수준의 포인트 혜택 제공(8월 1~31일). 만 34세 이하 고객 대상 CGV 영화 관람권 50% 할인을 월 1장에서 월 2장으로 확대. 8~9월 T멤버십 매주 Big 3 제휴사 50% 이상 할인, 여행 및 로밍 혜택 강화.</div>
            <div className="nmeta">2026-07-30 · <a href="https://news.sktelecom.com/228562" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">SKT, 휴가철 로밍·멤버십 혜택 꽉 채웠다</span></div>
            <div className="nsum">여름 휴가철을 맞아 T 로밍 프로모션과 T 멤버십 혜택을 강화하여 운영. 해외여행 시 로밍 특가와 함께 국내 T멤버십 혜택(0 week, 제휴사 할인 등)을 동시에 제공.</div>
            <div className="nmeta">2026-07-13 · <a href="https://news.sktelecom.com/227702" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">T 멤버십으로 즐기는 특별한 여름, 7월 혜택 총정리</span></div>
            <div className="nsum">여름휴가 시즌 맞아 SUMMER LUCKY WEEK(7월 13~17일) 5성급 호텔 숙박권 응모 이벤트, Young Week 브랜드 개편, 신규 제휴사 3곳 합류, 서울랜드 본인 50%·동반 40% 할인. 토이콘 서울 2026 관람권 30% 할인.</div>
            <div className="nmeta">2026-07-01 · <a href="https://news.sktelecom.com/227258" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">여름방학을 더 가볍고 알차게, 대학생을 위한 SKT 혜택 모아보기</span></div>
            <div className="nsum">T멤버십이 여름방학 대학생 고객 지원 콘텐츠 발행. 식음료·카페(T 우주 구독 할인), 해외여행(34세 이하 로밍 특가), 자기계발(Class101·어학 플랫폼), 문화(0 week 뮤지컬·전시 할인) 4가지 카테고리로 일상 지출 관리·학습 지원 혜택 강화.</div>
            <div className="nmeta">2026-06-17 · <a href="https://news.sktelecom.com/226659" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">SKT T멤버십, 대학생 목소리 담은 맞춤 혜택 선보인다 — 6월 시험기간 0 week 운영, 메가MGC·바나프레소·투썸플레이스 할인</span></div>
            <div className="nsum">T멤버십이 대학생 고객 제안 아이디어를 반영해 6월 시험기간용 혜택 강화. 2주차(6.8~12) '0 week' 특별 운영으로 메가MGC커피 50% 할인, 바나프레소·투썸플레이스·배스킨라빈스 할인 쿠폰 제공. 경희대·광운대·서울시립대·성균관대·세종대 등 서울 대학가 방문으로 오프라인 커피 무료 제공.</div>
            <div className="nmeta">2026-06-07 · <a href="https://news.sktelecom.com/226090" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">6월 T멤버십 — 프로야구 Lucky Week·시험 기간 혜택까지 풍성</span></div>
            <div className="nsum">T day 1주차(6.8~6.12) '프로야구 Lucky Week' 신설, 티빙 구독자 고척돔 직관 응모·요기요×호식이두마리치킨 VIP 8천원/Gold·Silver 6천원 할인, 루메나 무선선풍기 응모. 후지필름 6.15 신규 제휴(포토북 40%·사진인화 20%) 예고.</div>
            <div className="nmeta">2026-06-01 · <a href="https://news.sktelecom.com/225691" target="_blank" rel="noreferrer">SKT 뉴스룸</a></div>
          </div>
        </div>
      )}

      {tab === 'kt' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">KT, 8월 멤버십 혜택 확대 — 포케올데이 신규 제휴·뮤지컬 헬스키친·유미의 세포들 최대 45% 할인</span></div>
            <div className="nsum">KT 멤버십 페스타로 신규 제휴 포케올데이 10% 할인(9,900원 이상, 최대 3만원, 일 1회), 패스트캠퍼스 AICE 과정 30% 특별 할인. 뮤지컬 헬스키친 최대 40%, 유미의 세포들 최대 45%, 슬립노모어 서울 최대 40% 할인, 전시 아기상어 비밀 초대장 50% 할인. 9월 1일부터 VVIP·VIP 고객 지니TV VOD 1만원 이용권, 도미노피자 방문 포장 시 3만원 이상 결제하면 2만원 할인.</div>
            <div className="nmeta">2026-08-03 · <a href="https://www.ddaily.co.kr/page/view/2026080310224623198" target="_blank" rel="noreferrer">디지털데일리</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">KT, 여름 휴가철 고객 혜택 확대 — 케.멤.페 공항라운지·캐리비안 베이·롯데렌터카 50~60% 할인</span></div>
            <div className="nsum">8월 3~31일 케이티 멤버십 페스타 기간 공항라운지 1만원 할인, 캐리비안 베이 본인·동반 50% 할인, 롯데렌터카 60% 할인, 아고다 국내 10%·해외 12% 할인, GS칼텍스 3천원 할인(3만원 이상 주유 시). 달달혜택으로 배스킨라빈스 30%, 공차 50%, 쇼핑라운지 5천원 할인. 뮤지컬·전시·영화 문화혜택도 강화.</div>
            <div className="nmeta">2026-07-30 · <a href="https://corp.kt.com/html/promote/news/report_detail.html?rows=10&page=1&searchWord=%EB%A9%A4%EB%B2%84%EC%8B%AD&datNo=19251" target="_blank" rel="noreferrer">KT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">KT멤버십, 국가서비스대상 수상 기념 고객 참여형 이벤트 진행</span></div>
            <div className="nsum">KT가 2026 국가서비스대상 통신 멤버십 부문 대상 수상을 기념해 고객 참여형 이벤트를 진행합니다. 7월 2일~14일 KT멤버십 앱 내 취향 밸런스 게임으로 다이소 금액권·외식 할인 쿠폰 증정, 추첨 시 프리미엄 숙박권도 제공. 7월 1~15일 고객 보답 프로그램으로 배스킨라빈스 50%, 쇼핑라운지 5천원 할인 중 선택. 달달혜택은 폴바셋·크리스탈 제이드·VIPS·도미노피자·메가MGC커피 등 일상 활용도 높은 브랜드 구성.</div>
            <div className="nmeta">2026-06-30 · <a href="https://corp.kt.com/html/promote/news/report_detail.html?rows=10&page=1&searchWord=%EB%A9%A4%EB%B2%84%EC%8B%AD&datNo=19198" target="_blank" rel="noreferrer">KT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">KT, 장기고객 문화혜택 확대, 뮤지컬 그날들 1천200명 초청</span></div>
            <div className="nsum">KT 장기 고객(모바일·인터넷·TV 합산 5년 이상)을 위한 뮤지컬 '그날들' 7월 25일 공연 1,200명 초청 이벤트. 엄기준·윤시윤 출연 작품. 네컷 스티커 촬영·SNS 이벤트 병행. KT 위즈파크 '캠핑존 초대드림'도 운영 — 야구장 내 캐핑과 경기 관람 동시 즐기기.</div>
            <div className="nmeta">2026-06-19 · <a href="https://corp.kt.com/html/promote/news/report_detail.html?rows=10&page=1&datNo=19184" target="_blank" rel="noreferrer">KT 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">KT, 월드컵 시즌 맞아 6월 멤버십 강화 — GS25 컵라면/던킨 50%, 쇼핑·문화 최대 50% 할인</span></div>
            <div className="nsum">KT멤버십이 2026 FIFA 월드컵 시즌을 맞아 6월 16~30일 고객보답 프로그램 강화. GS25 컵라면·디저트 50%(최대 1,900원) 또는 던킨 전 품목 50%(최대 6,000원) 중 선택. 달달혜택은 VIPS 채끝스테이크 무료, 배민·노모어피자 최대 1만원 할인, 공차·버거킹 50%, 롯데시네마 영화표 제공. 문화혜택으로 뮤지컬·전시 최대 50% 할인.</div>
            <div className="nmeta">2026-06-15 · <a href="https://www.etoday.co.kr/news/view/2593577" target="_blank" rel="noreferrer">이투데이</a></div>
          </div>
        </div>
      )}

      {tab === 'lgu' && (
        <div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle"><span className="upd">뜨거운 여름을 제대로 즐기는 8월을 위한 유플투쁬 혜택</span></span></div>
            <div className="nsum"><span className="upd">8월 식음료 혜택: 배스킨라빈스 패밀리 최대 9천원 할인(8/11), 피자헛 프리미엄 피자 최대 55% 할인·파스타 증정(8/11), 공차 1만원 이상 구매 시 최대 50% 할인(8/13), 매드포갈릭 최대 2만5천원 할인/8만원 이상 주문(8/13), 배달의민족×명랑핫도그 1만8천원 이상 주문 시 최대 8,500원 할인(8/17). 문화·여가·쇼핑 혜택으로 더 즐거운 여름 제공.</span></div>
            <div className="nmeta">2026-08-05 · <a href="https://news.lguplus.com/22563" target="_blank" rel="noreferrer">LGU+ 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">유플투쁬 8월 제휴사 최대 규모 52개 확대, 테마파크·외식·쇼핑 혜택 강화</span></div>
            <div className="nsum">LG유플러스가 '유플투쁬'의 8월 제휴사를 올해 최대 규모인 52개로 확대. 여름 바캉스 시즌 맞춰 오션월드 50% 할인, 부산 롯데월드 40% 할인, 서울랜드 55% 할인, 아쿠아필드 40% 할인, 뽀로로파크 66% 할인 등 테마파크 혜택 추가. 장기고객 1,500명 대상 '레고랜드 워터풀 파티' 8월 8~9일 개최.</div>
            <div className="nmeta">2026-08-04 · <a href="https://www.industrynews.co.kr/news/articleView.html?idxno=68139" target="_blank" rel="noreferrer">인더스트리뉴스</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">U+ 장기고객을 위한 레고랜드 워터풀 파티 & U+119 메모리얼런</span></div>
            <div className="nsum">LGU+ 멤버십 VVIP 이상·10년 이상 장기고객 대상 특별 초청 이벤트. 8월 8~9일 레고랜드 코리아 리조트에서 워터풀 파티 개최(1,500명 참가). 장기고객 우대 전략 지속 강화.</div>
            <div className="nmeta">2026-07-10 · <a href="https://news.lguplus.com/22285" target="_blank" rel="noreferrer">LGU+ 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">휴가부터 시원한 일상까지, 7월을 위한 유플투쁬 혜택</span></div>
            <div className="nsum">본격적인 여름 휴가 시즌을 맞아 유플투쁬이 다양한 혜택을 준비했습니다. 공차 50% 할인, 피자헛 55% 할인, 투썸플레이스 아메리카노 무료, 배달의민족×KFC 8,500원 할인, 배스킨라빈스 패밀리 9천원 할인, 이마트24 5천원 할인, 매드포갈릭 2만5천원 할인, CU 불닭볶음면 1,200원 할인 등 식음료 혜택과 카카오페이지·카카오웹툰 캐시 증정, 씨네Q 영화표, 신라인터넷면세점 쿠폰 등 문화·쇼핑 혜택도 운영합니다.</div>
            <div className="nmeta">2026-07-01 · <a href="https://news.lguplus.com/22202" target="_blank" rel="noreferrer">LGU+ 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb신규">신규</span><span className="ntitle">응원과 혜택을 한 번에, 6월을 위한 유플투쁬 혜택</span></div>
            <div className="nsum">6월 한 달간 식음료, 문화/여가, 쇼핑 분야에서 다양한 혜택. 피자헛 프리미엄 피자 55% 할인(6/19), 아웃백 최대 25% 할인(6/16), 배스킨라빈스 패밀리 사이즈 최대 9천원 할인(6/15), CGV 유플투쁬세트 무료(6/18), 서울랜드 파크이용권 55% 할인(6/19), 컬리 5천원 할인(6/15), 다이소 최대 2천원 금액권(6/23) 등. U+one 앱 유플투쁬 타임 오전 11시 선착순.</div>
            <div className="nmeta">2026-06-02 · <a href="https://news.lguplus.com/21954" target="_blank" rel="noreferrer">LGU+ 뉴스룸</a></div>
          </div>
          <div className="nc">
            <div className="nct"><span className="nb nb이슈">이슈</span><span className="ntitle">'탱크데이'에 거리 두는 통신사들…6월 유플투쁬에서 스타벅스 별 리워드 이벤트 중단</span></div>
            <div className="nsum">스타벅스 탱크데이 논란 이후 LGU+ 유플투쁬이 5월까지 운영한 스타벅스 별 리워드 이벤트를 6월부터 중단. 투썸플레이스·공차 등 다른 음료 혜택은 유지. SKT·KT도 초기화면 노출·로고 삭제 등 스타벅스 연계를 축소.</div>
            <div className="nmeta">2026-06-01 · <a href="https://www.newspim.com/news/view/20260601001109" target="_blank" rel="noreferrer">뉴스핌</a></div>
          </div>
        </div>
      )}
    </div>
  );
}
