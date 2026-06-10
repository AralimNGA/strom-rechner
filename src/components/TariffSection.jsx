import { Clock, Moon, Sun } from 'lucide-react';
import { fmtRp, fmtMoney } from '../utils/calculations.js';
import { getCountry } from '../data/countries.js';

export default function TariffSection({ state, setState, totalKwh, baseRappen }) {
  const country = getCountry(state.countryId);
  const { tariff } = state;
  const update = (key, value) => setState('tariff', { ...tariff, [key]: value });

  const supportsHTNT = country.htPremium > 1.0;

  // Berechnung
  const htRappen = baseRappen * country.htPremium;
  const ntRappen = baseRappen * country.ntDiscount;
  const ntKwh = totalKwh * (tariff.ntShare / 100);
  const htKwh = totalKwh - ntKwh;
  const htCost = (htKwh * htRappen) / 100;
  const ntCost = (ntKwh * ntRappen) / 100;
  const totalCost = htCost + ntCost;
  const flatCost = (totalKwh * baseRappen) / 100;
  const savings = flatCost - totalCost;

  return (
    <section id="section-tarif" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">05</span>
        <h2 className="section-title">HOCH- / NIEDERTARIF</h2>
        <div style={{ flex: 1 }}></div>
        {supportsHTNT && (
          <button
            onClick={() => update('enabled', !tariff.enabled)}
            className={`btn ${tariff.enabled ? 'active' : ''}`}
          >
            {tariff.enabled ? 'HT/NT AKTIV' : 'HT/NT AKTIVIEREN'}
          </button>
        )}
      </div>

      {!supportsHTNT && (
        <div
          className="card"
          style={{
            padding: 20,
            color: 'var(--text-dim)',
            fontSize: 13,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <Clock size={24} style={{ opacity: 0.5 }} />
          <div>
            <div style={{ color: 'var(--text)', marginBottom: 4 }}>
              {country.flag} {country.name}: meist Einheitstarif
            </div>
            <div className="mono" style={{ fontSize: 11 }}>
              In diesem Land bieten die meisten Versorger keinen klassischen HT/NT-Tarif an.
              Stattdessen sind dynamische Spot-Preis-Tarife verbreitet (Tibber, aWattar).
            </div>
          </div>
        </div>
      )}

      {supportsHTNT && !tariff.enabled && (
        <div
          className="card"
          style={{
            padding: 20,
            color: 'var(--text-dim)',
            fontSize: 13,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <Clock size={24} style={{ opacity: 0.5 }} />
          <div>
            <div style={{ color: 'var(--text)', marginBottom: 4 }}>Doppeltarif-Simulation</div>
            <div className="mono" style={{ fontSize: 11 }}>
              {country.flag} {country.name}: HT +{((country.htPremium - 1) * 100).toFixed(0)}% ·
              NT −{((1 - country.ntDiscount) * 100).toFixed(0)}% (typisch)
            </div>
          </div>
        </div>
      )}

      {supportsHTNT && tariff.enabled && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div className="card" style={{ padding: 16 }}>
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
                <Sun size={12} color="var(--accent)" /> HOCHTARIF (HT)
              </div>
              <div className="display" style={{ fontSize: 28, color: 'var(--accent)' }}>
                {fmtRp(htRappen)} <span style={{ fontSize: 14 }}>{country.subUnit}/kWh</span>
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 4 }}>
                Mo–Sa 06:00–22:00 · +{((country.htPremium - 1) * 100).toFixed(0)}%
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
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
                <Moon size={12} color="var(--info)" /> NIEDERTARIF (NT)
              </div>
              <div className="display" style={{ fontSize: 28, color: 'var(--info)' }}>
                {fmtRp(ntRappen)} <span style={{ fontSize: 14 }}>{country.subUnit}/kWh</span>
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 4 }}>
                Nacht + So · −{((1 - country.ntDiscount) * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <label
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-dim)',
                letterSpacing: '0.15em',
                display: 'block',
                marginBottom: 8,
              }}
            >
              ANTEIL VERBRAUCH IM NT: {tariff.ntShare}%
            </label>
            <input
              type="range"
              min="0"
              max="70"
              step="5"
              value={tariff.ntShare}
              onChange={(e) => update('ntShare', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-dimmer)',
                marginTop: 6,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>0% (nur tags)</span>
              <span style={{ color: 'var(--accent-bright)' }}>
                {country.typicalNtShare}% typisch ohne Verschiebung
              </span>
              <span>70% (maximal)</span>
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: 20,
              background: savings > 0 ? 'var(--success-bg)' : 'var(--surface)',
              borderColor: savings > 0 ? 'var(--accent-bright)' : 'var(--border)',
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-dim)',
                letterSpacing: '0.15em',
                marginBottom: 12,
              }}
            >
              VERGLEICH
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 16,
              }}
            >
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>HT-Kosten</div>
                <div className="display" style={{ fontSize: 22, color: 'var(--accent)' }}>
                  {fmtMoney(htCost, country)} {country.currencySymbol}
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>
                  {htKwh.toFixed(0)} kWh
                </div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>NT-Kosten</div>
                <div className="display" style={{ fontSize: 22, color: 'var(--info)' }}>
                  {fmtMoney(ntCost, country)} {country.currencySymbol}
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>
                  {ntKwh.toFixed(0)} kWh
                </div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>Total HT/NT</div>
                <div className="display" style={{ fontSize: 22, color: 'var(--text)' }}>
                  {fmtMoney(totalCost, country)} {country.currencySymbol}
                </div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>vs. Einheitstarif</div>
                <div
                  className="display"
                  style={{
                    fontSize: 24,
                    color: savings > 0 ? 'var(--accent-bright)' : 'var(--accent)',
                  }}
                >
                  {savings > 0 ? '−' : '+'}{fmtMoney(Math.abs(savings), country)} {country.currencySymbol}
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>
                  {savings > 0 ? 'Einsparung/Jahr' : 'Mehrkosten/Jahr'}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
