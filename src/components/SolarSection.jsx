import { Sun, Battery, TrendingUp, Clock } from 'lucide-react';
import { analyzePv } from '../utils/solar.js';
import { fmtKwh, fmtMoney } from '../utils/calculations.js';
import { getCountry } from '../data/countries.js';

export default function SolarSection({ state, setState, totalKwh, tariffSubUnit }) {
  const country = getCountry(state.countryId);
  const { solar } = state;
  const analysis = solar.enabled
    ? analyzePv({
        kwp: solar.kwp,
        hasBattery: solar.hasBattery,
        batteryKwh: solar.batteryKwh,
        totalHouseholdKwh: totalKwh,
        tariffSubUnit,
        countryId: state.countryId,
      })
    : null;

  const update = (key, value) => setState('solar', { ...solar, [key]: value });

  return (
    <section id="section-solar" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">04</span>
        <h2 className="section-title">SOLAR / PV-ANLAGE</h2>
        <div style={{ flex: 1 }}></div>
        <button
          onClick={() => update('enabled', !solar.enabled)}
          className={`btn ${solar.enabled ? 'active' : ''}`}
        >
          {solar.enabled ? 'PV AKTIV' : 'PV AKTIVIEREN'}
        </button>
      </div>

      {!solar.enabled && (
        <div
          className="card"
          style={{
            padding: 24,
            textAlign: 'center',
            borderStyle: 'dashed',
            color: 'var(--text-dim)',
          }}
        >
          <Sun size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.1em' }}>
            AKTIVIERE DIE PV-SIMULATION FÜR {country.flag} {country.name.toUpperCase()}
          </div>
          <div style={{ fontSize: 11, marginTop: 8 }}>
            Eigenverbrauch · Einspeisung · Amortisation · Ertrag {country.solarYieldPerKwp} kWh/kWp/J
          </div>
        </div>
      )}

      {solar.enabled && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div className="card" style={{ padding: 16 }}>
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
                ANLAGENGRÖSSE · {solar.kwp} kWp
              </label>
              <input
                type="range"
                min="2"
                max="30"
                step="0.5"
                value={solar.kwp}
                onChange={(e) => update('kwp', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  color: 'var(--text-dimmer)',
                  marginTop: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>2 kWp</span>
                <span>30 kWp</span>
              </div>
            </div>

            <div className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Battery size={14} />
                <label
                  className="mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-dim)',
                    letterSpacing: '0.15em',
                  }}
                >
                  BATTERIESPEICHER
                </label>
              </div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  marginBottom: 8,
                }}
              >
                <input
                  type="checkbox"
                  checked={solar.hasBattery}
                  onChange={(e) => update('hasBattery', e.target.checked)}
                />
                <span style={{ fontSize: 13 }}>
                  Batterie nachrüsten (Eigenverbrauch ~65%)
                </span>
              </label>
              {solar.hasBattery && (
                <>
                  <div
                    className="mono"
                    style={{ fontSize: 10, color: 'var(--text-dim)', marginBottom: 4 }}
                  >
                    GRÖSSE: {solar.batteryKwh} kWh
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    value={solar.batteryKwh}
                    onChange={(e) => update('batteryKwh', parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <Metric
              label="Produktion/Jahr"
              value={fmtKwh(analysis.production)}
              unit="kWh"
              color="var(--accent-bright)"
              icon={<Sun size={16} />}
            />
            <Metric
              label="Eigenverbrauch"
              value={fmtKwh(analysis.selfUsed)}
              unit={`kWh · ${(analysis.selfRatio * 100).toFixed(0)}%`}
              color="#66ff66"
            />
            <Metric
              label="Einspeisung"
              value={fmtKwh(analysis.fedIn)}
              unit="kWh"
              color="var(--info)"
            />
            <Metric
              label="Abdeckung"
              value={`${analysis.coverage.toFixed(0)}%`}
              unit="des Verbrauchs"
              color="var(--accent)"
            />
          </div>

          <div
            className="card"
            style={{
              padding: 20,
              background: 'var(--success-bg)',
              borderColor: 'var(--accent-bright)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 16,
              }}
            >
              <TrendingUp size={18} color="var(--accent-bright)" />
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: 'var(--accent-bright)',
                  letterSpacing: '0.15em',
                }}
              >
                WIRTSCHAFTLICHKEIT · {country.flag} {country.currency}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 20,
              }}
            >
              <FinanceCell
                label="Investition (brutto)"
                value={fmtMoney(analysis.gross, country)}
                unit={country.currencySymbol}
              />
              <FinanceCell
                label="Förderung"
                value={analysis.subsidy > 0 ? `−${fmtMoney(analysis.subsidy, country)}` : '—'}
                unit={analysis.subsidy > 0 ? country.currencySymbol : ''}
                color="var(--accent-bright)"
              />
              <FinanceCell
                label="Netto-Kosten"
                value={fmtMoney(analysis.net, country)}
                unit={country.currencySymbol}
                big
              />
              <FinanceCell
                label="Ersparnis/Jahr"
                value={`${fmtMoney(analysis.savedChf, country)} + ${fmtMoney(analysis.earnedChf, country)}`}
                unit={`= ${fmtMoney(analysis.totalYearlyChf, country)} ${country.currencySymbol}`}
                color="var(--accent-bright)"
              />
              <FinanceCell
                label="Amortisation"
                value={
                  analysis.amortizationYears === Infinity
                    ? '—'
                    : `${analysis.amortizationYears}`
                }
                unit="Jahre"
                color="var(--accent)"
                icon={<Clock size={14} />}
                big
              />
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-dimmer)',
                marginTop: 16,
                paddingTop: 12,
                borderTop: '1px solid var(--divider)',
              }}
            >
              Basis {country.name}: {country.solarYieldPerKwp} kWh/kWp/J ·{' '}
              {country.feedInTariff} {country.subUnit}/kWh Einspeisung ·{' '}
              {country.costPerKwp} {country.currencySymbol}/kWp installiert
              {country.subsidyPerKwp > 0 &&
                ` · Förderung ${country.subsidyPerKwp} ${country.currencySymbol}/kWp`}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function Metric({ label, value, unit, color, icon }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div
        className="mono"
        style={{
          fontSize: 10,
          color: 'var(--text-dim)',
          letterSpacing: '0.15em',
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {icon} {label}
      </div>
      <div className="display" style={{ fontSize: 28, color, lineHeight: 1 }}>
        {value}
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 4 }}>
        {unit}
      </div>
    </div>
  );
}

function FinanceCell({ label, value, unit, color = 'var(--text)', big = false, icon }) {
  return (
    <div>
      <div
        className="mono"
        style={{
          fontSize: 10,
          color: 'var(--text-dim)',
          letterSpacing: '0.1em',
          marginBottom: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {icon} {label}
      </div>
      <div className="display" style={{ fontSize: big ? 28 : 20, color, lineHeight: 1 }}>
        {value}
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 2 }}>
        {unit}
      </div>
    </div>
  );
}
