import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { COUNTRIES, getCountryList } from '../data/countries.js';

export default function CountryPicker({ countryId, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const country = COUNTRIES[countryId];
  const list = getCountryList();

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 10px',
          fontSize: 12,
        }}
      >
        <span style={{ fontSize: 16 }}>{country.flag}</span>
        <span style={{ textTransform: 'none', letterSpacing: 0 }}>{country.name}</span>
        <ChevronDown size={12} style={{ opacity: 0.6 }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border-strong)',
            zIndex: 100,
            minWidth: 200,
            boxShadow: 'var(--shadow)',
          }}
        >
          {list.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onChange(c.id);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 14px',
                background: c.id === countryId ? 'var(--accent-soft)' : 'transparent',
                border: 'none',
                color: 'var(--text)',
                cursor: 'pointer',
                fontSize: 13,
                textAlign: 'left',
                borderBottom: '1px solid var(--divider)',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
              onMouseOut={(e) =>
                (e.currentTarget.style.background =
                  c.id === countryId ? 'var(--accent-soft)' : 'transparent')
              }
            >
              <span style={{ fontSize: 18 }}>{c.flag}</span>
              <div style={{ flex: 1 }}>
                <div>{c.name}</div>
                <div
                  className="mono"
                  style={{ fontSize: 9, color: 'var(--text-dimmer)', marginTop: 1 }}
                >
                  {c.avgPrice.toFixed(1)} {c.subUnit}/kWh · {c.co2GramsPerKwh}g CO₂
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
