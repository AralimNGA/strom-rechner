import { useState } from 'react';
import { TrendingUp, AlertCircle, Globe, MapPin } from 'lucide-react';
import { PRICE_HISTORY_CH, PRICE_EVENTS, getPriceStats } from '../data/priceHistory.js';

/**
 * Strompreis-Historie 2010-2025
 * Zeigt globale & nationale Ereignisse die den lokalen Strompreis beeinflusst haben.
 * VA-Bezug: globale Herausforderungen (Krisen, Krieg) → lokale Wirkung (Stromrechnung)
 */
export default function PriceHistorySection({ totalKwh, countryId }) {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const stats = getPriceStats();

  // Chart-Geometrie
  const chartW = 720;
  const chartH = 280;
  const padL = 50;
  const padR = 20;
  const padT = 30;
  const padB = 50;
  const innerW = chartW - padL - padR;
  const innerH = chartH - padT - padB;

  const minRappen = 15;
  const maxRappen = 35;

  const xScale = (year) => {
    const minY = PRICE_HISTORY_CH[0].year;
    const maxY = PRICE_HISTORY_CH[PRICE_HISTORY_CH.length - 1].year;
    return padL + ((year - minY) / (maxY - minY)) * innerW;
  };
  const yScale = (rappen) =>
    padT + innerH - ((rappen - minRappen) / (maxRappen - minRappen)) * innerH;

  // Linien-Pfad
  const linePath = PRICE_HISTORY_CH.map(
    (p, i) => `${i === 0 ? 'M' : 'L'}${xScale(p.year)},${yScale(p.rappen)}`,
  ).join(' ');
  const areaPath = `${linePath} L${xScale(
    PRICE_HISTORY_CH[PRICE_HISTORY_CH.length - 1].year,
  )},${yScale(minRappen)} L${xScale(PRICE_HISTORY_CH[0].year)},${yScale(minRappen)} Z`;

  // Hochrechnung: was würde dein heutiger Verbrauch mit den damaligen Preisen kosten?
  const costThen = countryId === 'ch' ? (totalKwh * stats.first.rappen) / 100 : 0;
  const costNow = countryId === 'ch' ? (totalKwh * stats.last.rappen) / 100 : 0;

  return (
    <section id="section-history" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">14</span>
        <h2 className="section-title">STROMPREIS-HISTORIE 2010—2025</h2>
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'var(--text-dim)',
          marginBottom: 12,
          lineHeight: 1.5,
        }}
      >
        Wie globale Krisen die lokale Stromrechnung verändert haben — am Beispiel Schweiz.
        Daten: ElCom Tarifübersicht 2010–2025, BFE Elektrizitätsstatistik.
      </div>

      {/* Stats-Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div className="card" style={{ padding: 10 }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
            TIEFSTSTAND
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--success)' }}>
            {stats.min.rappen} Rp.
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
            {stats.min.year}
          </div>
        </div>
        <div className="card" style={{ padding: 10 }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
            HÖCHSTSTAND
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--danger)' }}>
            {stats.max.rappen} Rp.
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
            {stats.max.year}
          </div>
        </div>
        <div className="card" style={{ padding: 10 }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
            Ø VOR-KRISE (2010—2021)
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{stats.avgPreCrisis} Rp.</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
            12-Jahres-Mittel
          </div>
        </div>
        <div className="card" style={{ padding: 10 }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
            Ø NACH-KRISE (2022—2025)
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--warning)' }}>
            {stats.avgPostCrisis} Rp.
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--warning)' }}>
            +{stats.crisisPctChange}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          style={{ width: '100%', height: 'auto', maxHeight: 400 }}
        >
          {/* Y-Gridlines */}
          {[15, 20, 25, 30, 35].map((rp) => (
            <g key={rp}>
              <line
                x1={padL}
                x2={padL + innerW}
                y1={yScale(rp)}
                y2={yScale(rp)}
                stroke="var(--border)"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
              <text
                x={padL - 8}
                y={yScale(rp) + 4}
                fontSize="10"
                fill="var(--text-dim)"
                textAnchor="end"
                fontFamily="ui-monospace,monospace"
              >
                {rp}
              </text>
            </g>
          ))}

          {/* X-Achse Jahre */}
          {PRICE_HISTORY_CH.filter((_, i) => i % 2 === 0).map((p) => (
            <text
              key={p.year}
              x={xScale(p.year)}
              y={chartH - padB + 18}
              fontSize="10"
              fill="var(--text-dim)"
              textAnchor="middle"
              fontFamily="ui-monospace,monospace"
            >
              {p.year}
            </text>
          ))}

          {/* Area */}
          <path d={areaPath} fill="var(--accent-bright-soft)" opacity="0.4" />
          {/* Line */}
          <path d={linePath} fill="none" stroke="var(--accent-bright)" strokeWidth="2.5" />

          {/* Datenpunkte */}
          {PRICE_HISTORY_CH.map((p) => (
            <circle
              key={p.year}
              cx={xScale(p.year)}
              cy={yScale(p.rappen)}
              r="3"
              fill="var(--accent-bright)"
              stroke="var(--bg)"
              strokeWidth="1.5"
            >
              <title>{`${p.year}: ${p.rappen} Rp./kWh — ${p.source}`}</title>
            </circle>
          ))}

          {/* Event-Marker */}
          {PRICE_EVENTS.map((ev) => {
            const x = xScale(ev.year);
            const yPoint = yScale(
              PRICE_HISTORY_CH.find((p) => p.year === ev.year)?.rappen || 25,
            );
            const color =
              ev.impact === 'high' ? '#ff0040' : ev.impact === 'medium' ? '#ffaa00' : '#888';
            return (
              <g
                key={ev.year + ev.short}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredEvent(ev)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => setHoveredEvent(ev === hoveredEvent ? null : ev)}
              >
                <line
                  x1={x}
                  x2={x}
                  y1={padT}
                  y2={chartH - padB}
                  stroke={color}
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />
                <circle cx={x} cy={padT - 8} r="6" fill={color} stroke="var(--bg)" strokeWidth="1.5" />
                <text
                  x={x}
                  y={padT - 5}
                  fontSize="9"
                  fontWeight="700"
                  fill="white"
                  textAnchor="middle"
                  fontFamily="ui-monospace,monospace"
                  style={{ pointerEvents: 'none' }}
                >
                  {ev.type === 'global' ? '🌍' : '🇨🇭'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Event-Detail wenn gehovert */}
      {hoveredEvent && (
        <div
          className="card"
          style={{
            padding: 14,
            marginBottom: 16,
            borderColor:
              hoveredEvent.impact === 'high'
                ? 'var(--danger)'
                : hoveredEvent.impact === 'medium'
                ? 'var(--warning)'
                : 'var(--text-dim)',
            borderLeftWidth: 4,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            {hoveredEvent.type === 'global' ? <Globe size={14} /> : <MapPin size={14} />}
            <span
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-dim)',
                letterSpacing: '0.12em',
              }}
            >
              {hoveredEvent.year} · {hoveredEvent.type === 'global' ? 'GLOBAL' : 'NATIONAL'} · IMPACT {hoveredEvent.impact.toUpperCase()}
            </span>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>
            {hoveredEvent.title}
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-dim)', marginBottom: 8 }}>
            {hoveredEvent.description}
          </div>
          <div
            className="mono"
            style={{ fontSize: 10, color: 'var(--text-dimmer)', fontStyle: 'italic' }}
          >
            Quelle: {hoveredEvent.source}
          </div>
        </div>
      )}

      {/* Hochrechnung — was kostet dein Verbrauch heute vs. 2010 */}
      {countryId === 'ch' && (
        <div
          className="card"
          style={{
            padding: 16,
            marginBottom: 16,
            background: 'var(--accent-bright-soft)',
            borderColor: 'var(--accent-bright)',
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--accent-bright)',
              letterSpacing: '0.15em',
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <TrendingUp size={12} /> WAS WÜRDE DEIN HEUTIGER VERBRAUCH FRÜHER GEKOSTET HABEN?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                2010 ({stats.first.rappen} Rp./kWh)
              </div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                CHF {Math.round(costThen).toLocaleString('de-CH')}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                HEUTE ({stats.last.rappen} Rp./kWh)
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent-bright)' }}>
                CHF {Math.round(costNow).toLocaleString('de-CH')}
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
                MEHRKOSTEN
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--warning)' }}>
                +CHF {Math.round(costNow - costThen).toLocaleString('de-CH')}
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--warning)' }}>
                +{(((costNow - costThen) / costThen) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event-Liste als Klick-Liste */}
      <div>
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <AlertCircle size={12} /> EREIGNISSE & EINFLÜSSE — KLICKEN FÜR DETAILS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
          {PRICE_EVENTS.map((ev) => (
            <button
              key={ev.year + ev.short}
              onClick={() => setHoveredEvent(ev === hoveredEvent ? null : ev)}
              className="card"
              style={{
                padding: 10,
                textAlign: 'left',
                cursor: 'pointer',
                background: ev === hoveredEvent ? 'var(--accent-bright-soft)' : 'var(--surface)',
                borderColor: ev === hoveredEvent ? 'var(--accent-bright)' : 'var(--border)',
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 9,
                  color:
                    ev.impact === 'high'
                      ? 'var(--danger)'
                      : ev.impact === 'medium'
                      ? 'var(--warning)'
                      : 'var(--text-dim)',
                  letterSpacing: '0.12em',
                  marginBottom: 4,
                }}
              >
                {ev.year} · {ev.type === 'global' ? '🌍 GLOBAL' : '🇨🇭 NATIONAL'}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{ev.short}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
