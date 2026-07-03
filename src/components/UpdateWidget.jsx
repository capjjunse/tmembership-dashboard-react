import { useState, useEffect, useRef } from 'react';
import { UPDATE_DATE, updateItems } from '../data/updateLog';

export default function UpdateWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const grouped = updateItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = { label: item.label, descs: [] };
    acc[item.section].descs.push(item.desc);
    return acc;
  }, {});

  return (
    <div className="upd-widget" ref={panelRef}>
      {open && (
        <div className="upd-panel">
          <div className="upd-panel-hd">
            <span>📋 업데이트 내역</span>
            <span className="upd-panel-date">{UPDATE_DATE}</span>
          </div>
          <div className="upd-panel-body">
            {Object.entries(grouped).map(([section, { label, descs }]) => (
              <a
                key={section}
                href={section}
                className="upd-item"
                onClick={() => setOpen(false)}
              >
                <span className="upd-item-sec">{label}</span>
                <ul className="upd-item-descs">
                  {descs.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </a>
            ))}
          </div>
        </div>
      )}
      <button className="upd-btn" onClick={() => setOpen(v => !v)}>
        <span className="upd-icon">🔔</span>
        {updateItems.length > 0 && (
          <span className="upd-badge">{updateItems.length}</span>
        )}
      </button>
    </div>
  );
}
