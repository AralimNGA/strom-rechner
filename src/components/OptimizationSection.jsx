import { Target, TrendingDown, Clock, AlertCircle } from 'lucide-react';
import { fmtMoney, fmtKwh } from '../utils/calculations.js';
import { getCountry } from '../data/countries.js';

const PRIORITY_COLORS = {
  HOCH: { bg: 'var(--accent-soft)', border: 'var(--accent)', text: 'var(--accent)' },
  MITTEL: { bg: 'var(--warning-soft)', border: 'var(--warning)', text: 'var(--warning)' },
  NIEDRIG: { bg: 'var(--surface-2)', border: 'var(--border-strong)', text: 'var(--text-dim)' },
};

export default function OptimizationSection({ items, countryId }) {
  const country = getCountry(countryId);
  const totalSavings = items.reduce((sum, i) => sum + i.moneySaved, 0);
  const totalKwhSaved = items.reduce((sum, i) => sum + (i.kwhSaved || 0), 0);

  return (
    <section id="section-plan" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">11</span>
        <h2 className="section-title">OPTIMIERUNGS-PLAN</h2>
        <div style={{ flex: 1 }}></div>
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-dimmer)', letterSpacing: '0.15em' }}
        >
          {items.length} EMPFEHLUNGEN
        </span>
      </div>

      {/* Hero: Total Potential */}
      {items.length > 0 && (
        <div
          className="card"
          style={{
            padding: 20,
            marginBottom: 16,
            background: 'var(--success-bg)',
            borderColor: 'var(--accent-bright)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <Target size={32} color="var(--accent-bright)" />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--accent-bright)',
                letterSpacing: '0.15em',
                marginBottom: 4,
              }}
            >
              GESAMT-POTENTIAL WENN ALLE MASSNAHMEN UMGESETZT
            </div>
            <div className="display" style={{ fontSize: 24, color: 'var(--text)' }}>
              −{fmtMoney(totalSavings, country)} {country.currencySymbol}/Jahr
              {totalKwhSaved > 0 && (
                <span style={{ fontSize: 14, color: 'var(--text-dim)', marginLeft: 12 }}>
                  · {fmtKwh(totalKwhSaved)} kWh
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div
          className="card"
          style={{
            padding: 24,
            textAlign: 'center',
            borderStyle: 'dashed',
            color: 'var(--text-dim)',
          }}
        >
          <Target size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
            DEIN HAUSHALT IST BEREITS GUT OPTIMIERT
          </div>
          <div style={{ fontSize: 11, marginTop: 8 }}>
            Keine grossen Hebel mehr offen — Respekt!
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item) => {
          const colors = PRIORITY_COLORS[item.priority] || PRIORITY_COLORS.NIEDRIG;
          return (
            <div
              key={item.id}
              className="card"
              style={{
                padding: 16,
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: 16,
                alignItems: 'center',
              }}
            >
              {/* Icon + Priority */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  minWidth: 60,
                }}
              >
                <div style={{ fontSize: 32 }}>{item.icon}</div>
                <div
                  className="mono"
                  style={{
                    fontSize: 8,
                    padding: '2px 6px',
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.priority}
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="display" style={{ fontSize: 18, color: 'var(--text)', marginBottom: 4 }}>
                  {item.title}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 10, color: 'var(--text-dimmer)', marginBottom: 4 }}
                >
                  {item.current}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                  → {item.action}
                </div>
                {item.investment > 0 && (
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--text-dimmer)',
                      marginTop: 6,
                      display: 'flex',
                      gap: 12,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>
                      💰 Investition: {fmtMoney(item.investment, country)} {country.currencySymbol}
                    </span>
                    {item.payback > 0 && item.payback !== Infinity && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={10} /> Amortisation: {item.payback.toFixed(1)} Jahre
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Savings */}
              <div style={{ textAlign: 'right', minWidth: 130 }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 9,
                    color: 'var(--text-dimmer)',
                    letterSpacing: '0.15em',
                    marginBottom: 4,
                  }}
                >
                  ERSPARNIS/JAHR
                </div>
                <div
                  className="display"
                  style={{
                    fontSize: 24,
                    color: 'var(--accent-bright)',
                    lineHeight: 1,
                  }}
                >
                  −{fmtMoney(item.moneySaved, country)}
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
                  {country.currencySymbol}
                </div>
                {item.kwhSaved > 0 && (
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--text-dimmer)',
                      marginTop: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <TrendingDown size={10} /> {fmtKwh(item.kwhSaved)} kWh
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {items.length > 0 && (
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--text-dimmer)',
            marginTop: 12,
            padding: 10,
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <AlertCircle size={12} />
          Berechnungen sind Schätzungen basierend auf Durchschnittswerten für{' '}
          {country.flag} {country.name}. Reale Einsparungen variieren je nach
          Nutzungsverhalten und Anlagengrösse.
        </div>
      )}
    </section>
  );
}
