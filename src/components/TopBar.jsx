import { Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';
import CountryPicker from './CountryPicker.jsx';

export default function TopBar({ theme, onThemeToggle, countryId, onCountryChange, providers, sources, tick, country }) {
  return (
    <>
      {/* Ticker */}
      <div
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--divider)',
          padding: '8px 0',
          overflow: 'hidden',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11,
          color: 'var(--text-dim)',
        }}
      >
        <div className="ticker-track">
          {[...providers, ...sources, ...providers, ...sources].map((item, i) => {
            const isProvider = 'region' in item;
            return (
              <span key={i} style={{ padding: '0 24px', whiteSpace: 'nowrap' }}>
                <span style={{ color: 'var(--accent-bright)' }}>
                  {isProvider ? '⚡' : '◇'}
                </span>{' '}
                {item.name}{' '}
                <span style={{ color: 'var(--accent)' }}>
                  {item.currentPrice?.toFixed(2)} {country.subUnit}/kWh
                </span>{' '}
                <span
                  style={{
                    color: item.trend > 0 ? '#ff6666' : '#66ff66',
                    marginLeft: 8,
                  }}
                >
                  {item.trend > 0 ? '▲' : '▼'} {Math.abs(item.trend).toFixed(2)}%
                </span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Header */}
      <header
        style={{
          padding: '24px 32px',
          borderBottom: '1px solid var(--divider)',
          background: 'var(--bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: 'var(--accent)',
              clipPath: 'polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={20} color="#fff" strokeWidth={2.5} fill="#fff" />
          </div>
          <div>
            <div
              className="display"
              style={{
                fontSize: 36,
                color: 'var(--text)',
                lineHeight: 1,
                letterSpacing: '0.04em',
              }}
            >
              STROM<span style={{ color: 'var(--accent)' }}>.</span>EU
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--accent-bright)',
                letterSpacing: '0.2em',
                marginTop: 4,
              }}
            >
              HAUSHALTS-AUDIT v3.0
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div
            className="hide-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11,
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
            }}
          >
            <span className="live-dot"></span>
            <span title="Marktpreise werden zufällig simuliert, keine Echtzeitdaten">
              SIMULIERT — {tick.toLocaleTimeString('de-CH')}
            </span>
          </div>
          <CountryPicker countryId={countryId} onChange={onCountryChange} />
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </header>
    </>
  );
}
