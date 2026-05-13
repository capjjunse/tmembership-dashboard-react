import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'ov', label: '개요' },
  { id: 'rg', label: '상시 혜택' },
  { id: 'mo', label: '월별 혜택' },
  { id: 'vp', label: 'VIP 특화' },
  { id: 'hs', label: '변경 이력' },
  { id: 'nw', label: '뉴스' },
  { id: 'sn', label: '고객 반응' },
  { id: 'tr', label: '검색 트렌드' },
  { id: 'nt', label: '비통신 멤버십' },
  { id: 'ai', label: 'AI 인사이트' },
];

export default function Nav() {
  const [active, setActive] = useState('ov');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <div className="nav-wrap">
      <nav className="nav">
        {SECTIONS.map(({ id, label }) => (
          <a key={id} className={active === id ? 'on' : ''} onClick={() => go(id)}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
