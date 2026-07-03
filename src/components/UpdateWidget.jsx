import { useState, useEffect, useRef } from 'react';

const MIN_LEN = 10;   // 통신사 코드·날짜만 있는 자잘한 .upd 조각은 제외
const MAX_PER_SEC = 5; // 섹션당 너무 세분화된 목록(예: 월별혜택 브랜드별 li)이 위젯을 뒤덮지 않도록 제한

function scanUpdates() {
  const sections = Array.from(document.querySelectorAll('.sec[id]'));
  const groups = sections.map(sec => {
    const titleEl = sec.querySelector('.sh .st');
    const rawLabel = titleEl ? titleEl.textContent.trim() : sec.id;
    // 앞의 이모지 제거
    const label = rawLabel.replace(/^\S+\s+/, '');

    const updEls = Array.from(sec.querySelectorAll('.upd'))
      // 다른 .upd 안에 중첩된 .upd는 제외 (중복 텍스트 방지)
      .filter(el => !el.parentElement.closest('.upd'));

    const seen = new Set();
    const all = [];
    updEls.forEach(el => {
      const t = el.textContent.replace(/\s+/g, ' ').trim();
      if (t.length >= MIN_LEN && !seen.has(t)) {
        seen.add(t);
        all.push(t);
      }
    });

    // 긴(=정보량 많은) 항목 우선으로 상위 N개만 노출, 나머지는 개수로 요약
    const sorted = [...all].sort((a, b) => b.length - a.length);
    const descs = sorted.slice(0, MAX_PER_SEC);
    const hiddenCount = all.length - descs.length;

    return { id: sec.id, label, descs, hiddenCount, total: all.length };
  }).filter(g => g.total > 0);

  return groups;
}

export default function UpdateWidget() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // 대시보드 전체가 그려진 뒤 실제 DOM의 .upd(빨간 강조) 내용을 스캔
  useEffect(() => {
    setGroups(scanUpdates());
  }, []);

  const totalCount = groups.reduce((s, g) => s + g.total, 0);

  return (
    <div className="upd-widget" ref={panelRef}>
      {open && (
        <div className="upd-panel">
          <div className="upd-panel-hd">
            <span>📋 강조 표시된 변경 내용</span>
          </div>
          <div className="upd-panel-body">
            {groups.length === 0 ? (
              <div className="upd-empty">현재 강조 표시(빨간색)된 변경 내용이 없습니다.</div>
            ) : groups.map(({ id, label, descs, hiddenCount }) => (
              <a
                key={id}
                href={`#${id}`}
                className="upd-item"
                onClick={() => setOpen(false)}
              >
                <span className="upd-item-sec">{label}</span>
                <ul className="upd-item-descs">
                  {descs.map((d, i) => <li key={i}>{d}</li>)}
                  {hiddenCount > 0 && <li className="upd-item-more">+{hiddenCount}건 더</li>}
                </ul>
              </a>
            ))}
          </div>
        </div>
      )}
      <button className="upd-btn" onClick={() => setOpen(v => !v)}>
        <span className="upd-icon">🔔</span>
        {totalCount > 0 && (
          <span className="upd-badge">{totalCount}</span>
        )}
      </button>
    </div>
  );
}
