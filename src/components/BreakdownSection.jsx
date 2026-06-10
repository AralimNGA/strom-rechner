import { Flame } from 'lucide-react';
import { fmtKwh } from '../utils/calculations.js';

export default function BreakdownSection({ breakdown, totalKwh, topConsumers }) {
  const items = Object.entries(breakdown)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a);

  return (
    <section id="section-breakdown" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">10</span>
        <h2 className="section-title">AUFSCHLÜSSELUNG</h2>
      </div>

      {/* Kategorien-Aufteilung */}
      <div
        className="mono"
        style={{
          fontSize: 10,
          color: 'var(--text-dim)',
          letterSpacing: '0.15em',
          marginBottom: 8,
        }}
      >
        NACH KATEGORIEN
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {items.map(([name, kwh]) => {
          const pct = totalKwh > 0 ? (kwh / totalKwh) * 100 : 0;
          return (
            <div key={name} className="card" style={{ padding: 14 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}
              >
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span
                    className="display"
                    style={{ fontSize: 18, color: 'var(--accent-bright)' }}
                  >
                    {fmtKwh(kwh)}
                  </span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                    kWh · {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div style={{ height: 4, background: 'var(--border)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: 'var(--accent)',
                    transition: 'width 0.4s ease',
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stromfresser Top-5 */}
      {topConsumers && topConsumers.length > 0 && (
        <>
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
            <Flame size={12} color="var(--accent)" /> STROMFRESSER · TOP 5
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {topConsumers.map((item, idx) => {
              const pct = totalKwh > 0 ? (item.kwh / totalKwh) * 100 : 0;
              const rankColor =
                idx === 0
                  ? '#ff0040'
                  : idx === 1
                  ? '#ff6600'
                  : idx === 2
                  ? '#ffaa00'
                  : 'var(--accent-bright)';
              return (
                <div
                  key={item.id}
                  className="card"
                  style={{
                    padding: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    borderLeft: `3px solid ${rankColor}`,
                  }}
                >
                  <div
                    className="display"
                    style={{
                      fontSize: 24,
                      color: rankColor,
                      lineHeight: 1,
                      minWidth: 32,
                      textAlign: 'center',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: 22 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        color: 'var(--text)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      className="mono"
                      style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 2 }}
                    >
                      {item.category}
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: 'var(--border)',
                        overflow: 'hidden',
                        marginTop: 6,
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: rankColor,
                          transition: 'width 0.4s ease',
                        }}
                      ></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: 80 }}>
                    <div className="display" style={{ fontSize: 18, color: rankColor, lineHeight: 1 }}>
                      {fmtKwh(item.kwh)}
                    </div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--text-dimmer)', marginTop: 2 }}>
                      kWh · {pct.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
