import { Home, Building, Users, Briefcase, MapPin } from 'lucide-react';
import { getCountry } from '../data/countries.js';
import { INDUSTRIES, getIndustryList, getIndustry } from '../data/industries.js';
import { fmtKwh } from '../utils/calculations.js';

export default function ProfilSection({ state, setState }) {
  const country = getCountry(state.countryId);
  const industry = getIndustry(state.industryId);

  return (
    <section id="section-profil">
      <div className="section-bar">
        <span className="section-num">01</span>
        <h2 className="section-title">PROFIL</h2>
        <div style={{ flex: 1 }}></div>
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-dimmer)', letterSpacing: '0.15em' }}
        >
          LAND · HAUSHALT · BRANCHE
        </span>
      </div>

      {/* Land-Info */}
      <div
        className="card"
        style={{
          padding: 16,
          marginBottom: 16,
          background: 'var(--accent-soft)',
          borderColor: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 32 }}>{country.flag}</span>
          <div>
            <div className="display" style={{ fontSize: 22, color: 'var(--text)' }}>
              {country.name}
            </div>
            <div
              className="mono"
              style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.1em' }}
            >
              <MapPin size={9} style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
              REGION AKTIV
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', flex: 1 }}>
          <Pill label="Ø Tarif" value={`${country.avgPrice} ${country.subUnit}`} />
          <Pill label="CO₂-Mix" value={`${country.co2GramsPerKwh} g/kWh`} />
          <Pill label="PV-Ertrag" value={`${country.solarYieldPerKwp} kWh/kWp`} />
          <Pill label="Währung" value={country.currency} />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {/* Personen */}
        <div className="card" style={{ padding: 20 }}>
          <label
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 12,
            }}
          >
            <Users size={12} /> PERSONEN IM HAUSHALT
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <button
                key={n}
                onClick={() => setState('persons', n)}
                className={`btn ${state.persons === n ? 'active' : ''}`}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  fontSize: 14,
                  fontFamily: 'Bebas Neue, sans-serif',
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Wohnform */}
        <div className="card" style={{ padding: 20 }}>
          <label
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              marginBottom: 12,
              display: 'block',
            }}
          >
            WOHNFORM
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setState('housing', 'apartment')}
              className={`btn ${state.housing === 'apartment' ? 'active' : ''}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Building size={14} /> WOHNUNG
            </button>
            <button
              onClick={() => setState('housing', 'house')}
              className={`btn ${state.housing === 'house' ? 'active' : ''}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Home size={14} /> HAUS
            </button>
          </div>
        </div>

        {/* Heizung Extras */}
        <div className="card" style={{ padding: 20 }}>
          <label
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              marginBottom: 12,
              display: 'block',
            }}
          >
            ELEKTRISCHE HEIZSYSTEME
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CheckRow
              label="Elektroboiler"
              sub={`+${country.additionalBaseline.e_boiler_per_person} kWh/Person`}
              checked={state.hasElectricBoiler}
              onChange={(v) => setState('hasElectricBoiler', v)}
            />
            <CheckRow
              label="Elektroheizung"
              sub={`+${
                state.housing === 'house'
                  ? country.additionalBaseline.e_heating_house
                  : country.additionalBaseline.e_heating_apartment
              } kWh`}
              checked={state.hasElectricHeating}
              onChange={(v) => setState('hasElectricHeating', v)}
            />
          </div>
        </div>

        {/* Branche / Beruf */}
        <div className="card" style={{ padding: 20, gridColumn: 'span 2' }}>
          <label
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 12,
            }}
          >
            <Briefcase size={12} /> BRANCHE / BERUFSFELD <span style={{ color: 'var(--text-dimmer)' }}>(optional)</span>
          </label>
          <select
            value={state.industryId}
            onChange={(e) => setState('industryId', e.target.value)}
            className="input"
            style={{ marginBottom: 12 }}
          >
            {getIndustryList().map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.emoji !== '—' ? `${ind.emoji} ` : ''}
                {ind.name}
                {ind.id !== 'unspecified' &&
                  ` (×${ind.homeMultiplier.toFixed(2)})`}
              </option>
            ))}
          </select>
          {industry.id !== 'unspecified' && (
            <div
              style={{
                background: industry.homeMultiplier > 1 ? 'var(--accent-soft)' : 'var(--success-bg)',
                border: `1px solid ${industry.homeMultiplier > 1 ? 'var(--accent)' : 'var(--accent-bright)'}`,
                padding: 12,
                fontSize: 12,
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  color: 'var(--text-dim)',
                  letterSpacing: '0.15em',
                  marginBottom: 4,
                }}
              >
                ERWARTETER MEHR-/MINDER-VERBRAUCH
              </div>
              <div style={{ color: 'var(--text)', marginBottom: 4 }}>
                {industry.note}
              </div>
              {industry.typicalDevices.length > 0 && (
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>
                  Typisch: {industry.typicalDevices.join(' · ')}
                </div>
              )}
            </div>
          )}
          {industry.id === 'unspecified' && (
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-dimmer)',
                fontStyle: 'italic',
              }}
            >
              Ohne Angabe wird der Standard-Durchschnitt für deinen Haushalt verwendet.
              Wähle eine Branche um den Effizienz-Score deinem Lebensstil anzupassen.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Pill({ label, value }) {
  return (
    <div>
      <div
        className="mono"
        style={{ fontSize: 9, color: 'var(--text-dimmer)', letterSpacing: '0.15em' }}
      >
        {label}
      </div>
      <div className="display" style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.2 }}>
        {value}
      </div>
    </div>
  );
}

function CheckRow({ label, sub, checked, onChange }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        padding: '6px 8px',
        border: '1px solid var(--border)',
        background: checked ? 'var(--accent-soft)' : 'transparent',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 14, height: 14 }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: 'var(--text)' }}>{label}</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>
          {sub}
        </div>
      </div>
    </label>
  );
}
