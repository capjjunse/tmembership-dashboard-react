export default function Overview() {
  return (
    <div className="sec" id="ov">
      <div className="sh">
        <span className="st">📊 이달의 핵심 동향</span>
        <span className="upd-badge upd-1m">↻ 주 갱신</span>
      </div>
      <div className="ovg">

        <div className="ovrow">
          <div className="oc cs">
            <div className="ol"><span className="cb bs">SKT</span></div>
            <div className="ov">VIP Pick 구조 개편 예고</div>
            <div className="od">
              <span>T우주패스 8월 1일 쿠폰 분리 적용</span>
              <span>커뮤니티 부정 반응 감지 중</span>
            </div>
            <div className="octabs">
              <a href="#hs" className="octab">변경이력</a>
              <a href="#vp" className="octab">VIP혜택</a>
              <a href="#sn" className="octab octab-warn">⚠ 고객반응</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">VIP Pick T우주패스 — 9,900원 쿠폰 폐지, 4,900원+5,000원 2종 분리{' '}<span className="ovb ovb-chg">8월 1일 적용</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">루덴시아 신규 제휴 (주중 50%, 주말 35%) / 무탄 종료{' '}<span className="ovb ovb-end">5월 31일 종료</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--skt)' }}></div>
              <div className="tt">매드포갈릭 할인율 하향 (V/G 20%→15%, S 10%→5%){' '}<span className="ovb ovb-chg">6월 1일 적용</span></div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc ck">
            <div className="ol"><span className="cb bk">KT</span></div>
            <div className="ov">5월 달달혜택 밀도 최상</div>
            <div className="od">
              <span>신규 브랜드 + 고객보답 2차 동시 운영</span>
              <span>이달 3사 중 혜택 구성 가장 풍부</span>
            </div>
            <div className="octabs">
              <a href="#mo" className="octab">월별혜택</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">CGV 상시 이용횟수 월3회→일1회 확대{' '}<span className="ovb ovb-chg">5월 1일 적용</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">달달혜택 패밀리컬렉션 (5.15~) / 달달초이스 국민학교떡볶이 신규{' '}<span className="ovb ovb-new">5월 15일 신규</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--kt)' }}></div>
              <div className="tt">고객보답 2차 (5.18~31) — 투썸플레이스 50% 또는 배달의민족×노랑통닭 8,000원{' '}<span className="ovb ovb-new">5월 18일 신규</span></div>
            </div>
          </div>
        </div>

        <div className="ovrow">
          <div className="oc cl">
            <div className="ol"><span className="cb bl">LGU+</span></div>
            <div className="ov">6월 제휴 변동 선제 공개</div>
            <div className="od">
              <span>신규 제휴 + 굿웨어몰 종료 예정</span>
              <span>상시 혜택 6월 업데이트 예정</span>
            </div>
            <div className="octabs">
              <a href="#hs" className="octab">변경이력</a>
              <a href="#rg" className="octab">상시혜택</a>
            </div>
          </div>
          <div className="ovchanges">
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">굿웨어몰 10% 할인 종료 예정{' '}<span className="ovb ovb-end">6월 30일 종료</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">밀크T 네이버페이 월 할인한도 3만원→2만원{' '}<span className="ovb ovb-chg">5월 1일 적용</span></div>
            </div>
            <div className="ti">
              <div className="tdot" style={{ background: 'var(--lgu)' }}></div>
              <div className="tt">26년 6월 신규 제휴사 + 일부 제휴사 혜택 종료 예정{' '}<span className="ovb ovb-new">5월 11일 신규</span></div>
            </div>
          </div>
        </div>

        <div className="ovkey">
          <div className="ovkey-lbl">🔑 이번달 놓치면 안될 것</div>
          <div className="ovki-grid">
            <a href="#sn" className="ovki ovki-neg">
              <div className="ovki-cat">🚨 고객반응</div>
              <div className="ovki-title">SKT VIP PICK 부정 여론 집중 · KT 고객보답 긍정 쏠림</div>
              <div className="ovki-body">뽐뿌 인기글(조회 15,247) "갈수록 혜택 줄이네" 확산 · KT 메가커피 2잔 루리웹 조회 44,751로 3사 중 반응 극명</div>
              <div className="ovki-go">고객반응 보기 →</div>
            </a>
            <a href="#tr" className="ovki ovki-trend">
              <div className="ovki-cat">📈 검색어 트렌드</div>
              <div className="ovki-title">KT 멤버십 검색량 4월 2주차 급등</div>
              <div className="ovki-body">KT 지수 3.9→6.8 (74%↑) — 달달혜택·고객보답 동시 시작 효과. SKT는 5월 초 2.7로 연중 최저 수준</div>
              <div className="ovki-go">트렌드 보기 →</div>
            </a>
            <a href="#ai" className="ovki ovki-warn">
              <div className="ovki-cat">🤖 AI 인사이트</div>
              <div className="ovki-title">SKT 월간혜택 열위 — 공차·피자헛 선점 + 컬리 미참여</div>
              <div className="ovki-body">공차·피자헛 LGU+에 1주 이상 선점됨. 컬리는 KT·LGU+ 동시 운영, SKT 없음. 배달·주유 카테고리 상시 공백</div>
              <div className="ovki-go">AI 인사이트 보기 →</div>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
