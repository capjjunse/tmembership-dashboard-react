import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

const TREND_DATA = {
  collected_at: "2026.08.25 11:00",
  period: { start: "2026-05-25", end: "2026-08-24" },
  labels: ["5/25","6/01","6/08","6/15","6/22","6/29","7/06","7/13","7/20","7/27","8/03","8/10","8/17","8/24"],
  skt:  [8.1,9.4,8.2,8.5,7.3,8.6,8.6,8.2,7.9,10.5,13.4,10.7,9.4,1.3],
  kt:   [12.7,12.3,10.7,13.3,9.0,13.3,9.6,15.7,13.9,19.6,15.9,16.1,15.0,1.6],
  lgu:  [26.3,3.9,100,93.4,49.4,6.5,82.0,82.6,11.8,3.4,84.3,56.1,86.0,3.6],
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
          출처: 네이버 DataLab API · <span className="upd">{TREND_DATA.collected_at}</span> 수집<br />
          검색량 지수 (100 = 기간 내 최고값)
        </div>
      </div>
      <div style={{ marginTop: '12px' }}>
        <div style={{ fontSize: '11px', color: 'var(--tx2)', fontWeight: 700, marginBottom: '6px' }}>수집 키워드</div>
        <div className="kwchips">
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>T 멤버십</span>
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>T day</span>
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>Young week</span>
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>클럽T</span>
          <span className="kchip" style={{ background: 'var(--skt-bg)', color: 'var(--skt-t)' }}>VIP PICK</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>KT멤버십</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>달달혜택</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>달달초이스</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>VIP 초이스</span>
          <span className="kchip" style={{ background: 'var(--kt-bg)', color: 'var(--kt-t)' }}>VVIP 초이스</span>
          <span className="kchip" style={{ background: 'var(--lgu-bg)', color: 'var(--lgu-t)' }}>U+멤버십</span>
          <span className="kchip" style={{ background: 'var(--lgu-bg)', color: 'var(--lgu-t)' }}>유플투쁠</span>
          <span className="kchip" style={{ background: 'var(--lgu-bg)', color: 'var(--lgu-t)' }}>VIP콕</span>
        </div>
      </div>
    </div>
  );
}
