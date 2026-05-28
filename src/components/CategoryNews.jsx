import { useState } from 'react';
import data from '../../category_news.json';

const SIGNAL_CONFIG = {
  1: { label: '모니터링', cls: 'cn-sig-1' },
  2: { label: '주목',     cls: 'cn-sig-2' },
  3: { label: '긴급 대응', cls: 'cn-sig-3' },
};

const CAT_CONFIG = {
  risk:      { label: '제휴사 리스크', emoji: '🚨', accent: '#f87171', badgeCls: 'cn-cat-risk' },
  battle:    { label: '마케팅 경쟁',   emoji: '⚔️',  accent: '#60a5fa', badgeCls: 'cn-cat-battle' },
  benchmark: { label: '혜택 벤치마킹', emoji: '💡',  accent: '#4ade80', badgeCls: 'cn-cat-benchmark' },
  trend:     { label: '소비 트렌드',   emoji: '🔮',  accent: '#c084fc', badgeCls: 'cn-cat-trend' },
};

const CAT_ORDER = ['risk', 'battle', 'benchmark', 'trend'];

function decode(s) {
  return s
    .replace(/&quot;/g, '"').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'");
}

function buildGroups() {
  if (data.topic_groups?.length) return data.topic_groups;
  // topic_groups 없을 때 categories에서 직접 빌드 (폴백)
  const groups = [];
  for (const cat of CAT_ORDER) {
    const articles = data.categories?.[cat] ?? [];
    const order = [];
    const map = new Map();
    for (const a of articles) {
      const key = a.topic || decode(a.title).replace(/\[[^\]]*\]/g, '').trim().slice(0, 16);
      if (!map.has(key)) { order.push(key); map.set(key, []); }
      map.get(key).push(a);
    }
    for (const t of order) {
      const arts = map.get(t);
      groups.push({ category: cat, topic: t, insight: arts[0]?.insight ?? '', articles: arts });
    }
  }
  return groups;
}

const MAX_VISIBLE = 3;

export function CategoryNewsContent({ excludeBrands = [] }) {
  const [expanded, setExpanded] = useState({});
  const raw = buildGroups();
  const groups = excludeBrands.length > 0
    ? raw.filter(g => !excludeBrands.some(b => g.topic.includes(b)))
    : raw;
  const toggle = (k) => setExpanded(p => ({ ...p, [k]: !p[k] }));

  return groups.length === 0 ? (
    <p className="cn-empty">조건을 충족하는 기사가 없습니다. 다음 수집 시 갱신됩니다.</p>
  ) : (
    <div className="cn-grid">
      {groups.map(({ category, topic, insight, articles, signal_strength = 1, max_velocity = 0 }) => {
        const cfg       = CAT_CONFIG[category] ?? CAT_CONFIG.risk;
        const expandKey = `${category}:${topic}`;
        const isExp     = expanded[expandKey];
        const visible   = isExp ? articles : articles.slice(0, MAX_VISIBLE);
        const isTrending = max_velocity > 10;
        const isRising   = !isTrending && max_velocity > 5;

        return (
          <div key={expandKey} className="cn-card" style={{ '--cn-accent': cfg.accent }}>
            <div className="cn-card-top">
              <div className="cn-card-header-row">
                <span className={`cn-cat-badge ${cfg.badgeCls}`}>
                  {cfg.emoji} {cfg.label}
                </span>
                <div className="cn-signal-row">
                  {isTrending && <span className="cn-badge cn-trending">📈 급등</span>}
                  {isRising   && <span className="cn-badge cn-rising">↑ 상승</span>}
                  <span className={`cn-signal-badge ${SIGNAL_CONFIG[signal_strength]?.cls ?? 'cn-sig-1'}`}>
                    {SIGNAL_CONFIG[signal_strength]?.label ?? '모니터링'}
                  </span>
                </div>
              </div>
              <div className="cn-topic-row">
                <span className="cn-topic">{topic}</span>
                <div className="cn-badges">
                  <span className="cn-badge cn-num">관련 기사 {articles.length}건</span>
                </div>
              </div>
              {insight && <p className="cn-insight">{insight}</p>}
            </div>

            <ul className="cn-list">
              {visible.map((a, i) => (
                <li key={i}>
                  <a href={a.link} target="_blank" rel="noreferrer">
                    {decode(a.title)}
                  </a>
                  <span className="cn-date">{a.pub_date}</span>
                </li>
              ))}
            </ul>

            {articles.length > MAX_VISIBLE && (
              <button className="cn-toggle" onClick={() => toggle(expandKey)}>
                {isExp ? '접기 ↑' : `+${articles.length - MAX_VISIBLE}건 더보기`}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function CategoryNews() {
  return (
    <div className="sec" id="cn">
      <div className="sh">
        <span className="st">📡 마켓 시그널</span>
        <span className="ss">{data.generated_at} 기준 · 총 {data.total_top}건</span>
      </div>
      <CategoryNewsContent />
    </div>
  );
}
