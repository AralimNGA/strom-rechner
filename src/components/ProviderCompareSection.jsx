import { Trophy, ArrowRight } from 'lucide-react';
import { fmtMoney, fmtRp } from '../utils/calculations.js';
import { getCountry } from '../data/countries.js';

/**
 * Vergleicht alle Provider im aktuellen Land:
 * - Monatskosten bei aktuellem Verbrauch
 * - Jahreskosten
 * - Cheapest highlighted
 * - Differenz zum aktuell gewählten
 */
export default function ProviderCompareSection({
  providers,
  selectedProvider,
  setSelectedProvider,
  totalKwh,
  countryId,
}) {
  const country = getCountry(countryId);
  const ranked = [...providers].sort((a, b) => a.currentPrice - b.currentPrice);
  const cheapest = ranked[0];
  const current = providers.find((p) => p.id === selectedProvider);

  const calcCosts = (provider) => {
    const yearly = (totalKwh * provider.currentPrice) / 100;
    return {
      yearly,
      monthly: yearly / 12,
    };
  };

  return (
    <section id="section-compare" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">08</span>
        <h2 className="section-title">ANBIETER-VERGLEICH</h2>
        <div style={{ flex: 1 }}></div>
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-dimmer)', letterSpacing: '0.15em' }}
        >
          DEINE KOSTEN BEI {totalKwh.toLocaleString(country.locale)} kWh/J
        </span>
      </div>

      {/* Hero Banner: Cheapest Provider */}
      {cheapest && current && cheapest.id !== current.id && (
        <div
          className="card"
          style={{
            padding: 20,
            background: 'var(--success-bg)',
            borderColor: 'var(--accent-bright)',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <Trophy size={32} color="var(--accent-bright)" />
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
              GÜNSTIGSTER ANBIETER GERADE JETZT
            </div>
            <div className="display" style={{ fontSize: 24, color: 'var(--text)' }}>
              {cheapest.name} · {fmtRp(cheapest.currentPrice)} {country.subUnit}/kWh
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
              ERSPARNIS/JAHR vs. AKTUELL ({current.name})
            </div>
            <div className="display" style={{ fontSize: 28, color: 'var(--accent-bright)' }}>
              −{fmtMoney(calcCosts(current).yearly - calcCosts(cheapest).yearly, country)}{' '}
              {country.currencySymbol}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ranked.map((p, i) => {
          const isActive = selectedProvider === p.id;
          const isCheapest = i === 0;
          const costs = calcCosts(p);
          const diffYearly = costs.yearly - calcCosts(current).yearly;

          return (
            <div
              key={p.id}
              className="card"
              style={{
                padding: 16,
                background: isActive ? 'var(--accent-soft)' : 'var(--surface)',
                borderColor: isCheapest
                  ? 'var(--accent-bright)'
                  : isActive
                  ? 'var(--accent)'
                  : 'var(--border)',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto auto auto',
                gap: 16,
                alignItems: 'center',
              }}
            >
              {/* Rank */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isCheapest ? 'var(--accent-bright)' : 'var(--surface-2)',
                  color: isCheapest ? 'var(--bg)' : 'var(--text-dim)',
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 18,
                }}
              >
                {i + 1}
              </div>

              {/* Provider Name */}
              <div>
                <div className="display" style={{ fontSize: 18, color: 'var(--text)' }}>
                  {p.name}
                  {isActive && (
                    <span
                      className="mono"
                      style={{
                        fontSize: 9,
                        color: 'var(--accent)',
                        marginLeft: 8,
                        padding: '2px 6px',
                        background: 'var(--accent-soft)',
                        border: '1px solid var(--accent)',
                      }}
                    >
                      AKTUELL
                    </span>
                  )}
                  {isCheapest && (
                    <span
                      className="mono"
                      style={{
                        fontSize: 9,
                        color: 'var(--bg)',
                        marginLeft: 8,
                        padding: '2px 6px',
                        background: 'var(--accent-bright)',
                      }}
                    >
                      ★ GÜNSTIGSTER
                    </span>
                  )}
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>
                  {p.region}
                </div>
              </div>

              {/* Price per kWh */}
              <div style={{ textAlign: 'right' }}>
                <div className="display" style={{ fontSize: 18, color: 'var(--accent-bright)' }}>
                  {fmtRp(p.currentPrice)} {country.subUnit}
                </div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--text-dimmer)' }}>
                  /kWh
                </div>
              </div>

              {/* Monthly */}
              <div style={{ textAlign: 'right', minWidth: 110 }}>
                <div className="display" style={{ fontSize: 22, color: 'var(--text)' }}>
                  {fmtMoney(costs.monthly, country)}
                </div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--text-dimmer)' }}>
                  {country.currencySymbol}/Monat
                </div>
                {!isActive && diffYearly !== 0 && (
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: diffYearly < 0 ? 'var(--accent-bright)' : 'var(--accent)',
                      marginTop: 2,
                    }}
                  >
                    {diffYearly < 0 ? '−' : '+'}
                    {fmtMoney(Math.abs(diffYearly / 12), country)}/Mt
                  </div>
                )}
              </div>

              {/* Action */}
              {!isActive ? (
                <button
                  onClick={() => setSelectedProvider(p.id)}
                  className="btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 10,
                    padding: '8px 12px',
                  }}
                >
                  WÄHLEN <ArrowRight size={12} />
                </button>
              ) : (
                <div style={{ width: 80 }}></div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="mono"
        style={{
          fontSize: 10,
          color: 'var(--text-dimmer)',
          marginTop: 12,
          padding: 12,
          background: 'var(--surface-2)',
        }}
      >
        Die Preise schwanken simuliert in Echtzeit (alle 3.5s) — in {country.flag} {country.name}{' '}
        sind Endkunden-Tarife real meist 1-2x pro Jahr fix gestellt. Anbieterwechsel meist
        kostenlos und in 4-6 Wochen abgeschlossen.
      </div>
    </section>
  );
}
