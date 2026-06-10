import { fmtKwh, fmtMoney } from '../utils/calculations.js';

export default function StickyStats({ totalKwh, yearlyCostChf, efficiency, country }) {
  return (
    <div className="sticky-stats">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 16,
          maxWidth: 1400,
          margin: '0 auto',
        }}
      >
        <Stat label="Verbrauch" value={`${fmtKwh(totalKwh)}`} unit="kWh/J" accent="var(--accent)" />
        <Stat
          label="vs. Schnitt"
          value={efficiency.deviationLabel}
          unit={efficiency.deviationPct === 0 ? 'genau Schnitt' : efficiency.deviationPct > 0 ? 'mehr' : 'weniger'}
          accent={efficiency.deviationColor}
        />
        <Stat
          label="Kosten/Jahr"
          value={fmtMoney(yearlyCostChf, country)}
          unit={country.currencySymbol}
          accent="var(--accent-bright)"
        />
        <Stat
          label="Kosten/Mt"
          value={fmtMoney(yearlyCostChf / 12, country)}
          unit={country.currencySymbol}
          accent="var(--text)"
        />
        <Stat
          label="Effizienz"
          value={efficiency.grade}
          unit={`${efficiency.score}/100`}
          accent={efficiency.color}
        />
      </div>
    </div>
  );
}

function Stat({ label, value, unit, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div
        className="mono"
        style={{
          fontSize: 9,
          color: 'var(--text-dimmer)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span
          className="display"
          style={{
            fontSize: 22,
            color: accent,
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>
          {unit}
        </span>
      </div>
    </div>
  );
}
