import { fmtRp } from '../utils/calculations.js';
import { getCountry, ICON_MAP } from '../data/countries.js';

export default function MarketSection({ providers, sources, selectedProvider, setSelectedProvider, countryId }) {
  const country = getCountry(countryId);

  return (
    <section id="section-markt" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">07</span>
        <h2 className="section-title">STROMMARKT (SIMULIERT)</h2>
        <div style={{ flex: 1 }}></div>
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--text-dimmer)',
            letterSpacing: '0.15em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span className="live-dot"></span> {country.flag} SIMULATION
        </div>
      </div>

      <div
        className="mono"
        style={{
          fontSize: 10,
          color: 'var(--text-dim)',
          letterSpacing: '0.15em',
          marginBottom: 8,
        }}
      >
        STROMANBIETER · {country.name.toUpperCase()} · PREISE SIMULIERT, KEINE ECHTEN TARIFE
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {providers.map((p) => {
          const active = selectedProvider === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedProvider(p.id)}
              className="card"
              style={{
                padding: 16,
                textAlign: 'left',
                cursor: 'pointer',
                borderColor: active ? 'var(--accent)' : 'var(--border)',
                background: active ? 'var(--accent-soft)' : 'var(--surface)',
                color: 'var(--text)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div
                    className="display"
                    style={{ fontSize: 20, color: active ? 'var(--accent)' : 'var(--text)' }}
                  >
                    {p.name}
                  </div>
                  <div
                    className="mono"
                    style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}
                  >
                    {p.region}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div
                    className="display num-anim"
                    key={p.currentPrice}
                    style={{ fontSize: 22, color: 'var(--accent-bright)' }}
                  >
                    {fmtRp(p.currentPrice)}
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: p.trend > 0 ? '#ff6666' : '#66ff66',
                    }}
                  >
                    {p.trend > 0 ? '▲' : '▼'} {Math.abs(p.trend).toFixed(2)}%
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className="mono"
        style={{
          fontSize: 10,
          color: 'var(--text-dim)',
          letterSpacing: '0.15em',
          marginBottom: 8,
        }}
      >
        ENERGIEQUELLEN · {country.name.toUpperCase()} STROMMIX
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
        }}
      >
        {sources.filter((s) => s.share > 0).map((s) => {
          const Icon = ICON_MAP[s.iconName] || ICON_MAP.Zap;
          return (
            <div key={s.id} className="card" style={{ padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <Icon size={14} color={s.color} />
                <div style={{ fontSize: 12, color: 'var(--text)' }}>{s.name}</div>
              </div>
              <div
                className="display"
                style={{ fontSize: 18, color: s.color }}
              >
                {fmtRp(s.currentPrice)} <span style={{ fontSize: 11 }}>{country.subUnit}</span>
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 2 }}>
                {s.share}% Anteil · {s.note}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
