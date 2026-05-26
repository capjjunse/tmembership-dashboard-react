import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const TREND_DATA = {
  collected_at: "2026.05.26 11:00",
  period: { start: "2026-02-23", end: "2026-05-25" },
  labels: ["2/23","3/02","3/09","3/16","3/23","3/30","4/06","4/13","4/20","4/27","5/04","5/11","5/18","5/25"],
  skt:  [3.9,4.1,3.3,3.0,2.9,3.3,3.5,3.0,2.7,3.0,2.8,2.7,2.5,0.2],
  kt:   [5.7,5.0,5.8,5.6,5.4,5.9,3.9,6.8,4.5,5.4,4.3,5.3,4.1,0.5],
  lgu:  [1.2,0.8,21.1,100,42.3,4.6,30.1,18.4,31.5,1.1,28.4,24.9,23.1,1.6],
};

export default function Trend() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: TREND_DATA.labels,
        datasets: [
          {
            label: 'SKT',
            data: TREND_DATA.skt,
            borderColor: '#5B0F8A',
            backgroundColor: 'rgba(91,15,138,.08)',
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.35,
            fill: false,
          },
          {
            label: 'KT',
            data: TREND_DATA.kt,
            borderColor: '#c41a1a',
            backgroundColor: 'rgba(196,26,26,.08)',
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.35,
            fill: false,
          },
          {
            label: 'LGU+',
            data: TREND_DATA.lgu,
            borderColor: '#b5006a',
            backgroundColor: 'rgba(181,0,106,.08)',
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.35,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: 'rgba(0,0,0,.05)' },
            ticks: { font: { size: 11 }, color: '#9494b8' },
          },
          y: {
            grid: { color: 'rgba(0,0,0,.05)' },
            ticks: { font: { size: 11 }, color: '#9494b8' },
            beginAtZero: true,
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="sec" id="tr">
      <div className="sh">
        <span className="st">📈 검색어 트렌드</span>
        
      </div>
      <div className="tch">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="tinfo">
        <div className="tleg">
          <div className="tli"><div className="tld" style={{ background: '#5B0F8A' }}></div>SKT (T멤버십 외)</div>
          <div className="tli"><div className="tld" style={{ background: '#c41a1a' }}></div>KT (KT멤버십 외)</div>
          <div className="tli"><div className="tld" style={{ background: '#b5006a' }}></div>LGU+ (U+멤버십 외)</div>
        </div>
        <div className="tnote">
          출처: 네이버 DataLab API · {TREND_DATA.collected_at} 수집<br />
          검색량 지수 (100 = 기간 내 최고값)
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <div style={{ fontSize: '11px', color: 'var(--tx2)', fontWeight: 700, marginBottom: '6px' }}>수집 키워드</div>
        <div className="kwchips">
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>T멤버십</span>
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>T데이</span>
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>0week</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>KT멤버십</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>달달혜택</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>KT고객보답</span>
          <span className="kchip" style={{ background: 'var(--lgu-bg)', color: 'var(--lgu-t)' }}>U+멤버십</span>
          <span className="kchip" style={{ background: 'var(--lgu-bg)', color: 'var(--lgu-t)' }}>유플투쁠</span>
          <span className="kchip" style={{ background: 'var(--lgu-bg)', color: 'var(--lgu-t)' }}>유플러스멤버십</span>
        </div>
      </div>
    </div>
  );
}
