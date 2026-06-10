import { useState } from 'react';
import { Save, Download, Trash2, FileJson, RotateCcw, FileText } from 'lucide-react';
import { fmtKwh, fmtMoney } from '../utils/calculations.js';
import { getCountry } from '../data/countries.js';

export default function ScenariosSection({
  scenarios,
  onSave,
  onLoad,
  onDelete,
  onExport,
  onExportPdf,
  onReset,
  currentTotals,
  countryId,
}) {
  const [name, setName] = useState('');
  const country = getCountry(countryId);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name.trim());
    setName('');
  };

  return (
    <section id="section-szenarien" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">12</span>
        <h2 className="section-title">SZENARIEN & EXPORT</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div className="card" style={{ padding: 16 }}>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Save size={12} /> AKTUELLES SZENARIO SPEICHERN
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              type="text"
              placeholder="z.B. Jetzt / Mit PV / Nach Sanierung"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="input"
              style={{ flex: 1 }}
            />
            <button onClick={handleSave} className="btn lime" disabled={!name.trim()}>
              SPEICHERN
            </button>
          </div>
          <div
            className="mono"
            style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 8 }}
          >
            localStorage · bleibt auf diesem Gerät
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Download size={12} /> EXPORT / RESET
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={onExportPdf}
              className="btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                flex: 1,
                background: 'var(--accent-bright-soft)',
                borderColor: 'var(--accent-bright)',
                color: 'var(--accent-bright)',
                fontWeight: 700,
              }}
              title="PDF-Audit-Bericht herunterladen"
            >
              <FileText size={12} /> PDF-BERICHT
            </button>
            <button
              onClick={onExport}
              className="btn"
              style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}
            >
              <FileJson size={12} /> JSON
            </button>
            <button
              onClick={onReset}
              className="btn"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <RotateCcw size={12} /> RESET
            </button>
          </div>
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
        GESPEICHERTE SZENARIEN · {scenarios.length}
      </div>
      {scenarios.length === 0 ? (
        <div
          className="card"
          style={{
            padding: 24,
            textAlign: 'center',
            color: 'var(--text-dim)',
            borderStyle: 'dashed',
          }}
        >
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em' }}>
            NOCH KEIN SZENARIO GESPEICHERT
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}
        >
          {scenarios.map((sc) => {
            const t = sc.state?.__totals || {};
            const diffKwh = t.totalKwh ? t.totalKwh - currentTotals.totalKwh : 0;
            const scCountry = getCountry(sc.state?.countryId || 'ch');
            return (
              <div key={sc.id} className="scenario-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    marginBottom: 6,
                  }}
                >
                  <div className="display" style={{ fontSize: 18, color: 'var(--text)' }}>
                    {scCountry.flag} {sc.name}
                  </div>
                  <button
                    onClick={() => onDelete(sc.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 9, color: 'var(--text-dimmer)', marginBottom: 8 }}
                >
                  {new Date(sc.createdAt).toLocaleString('de-CH')}
                </div>
                {t.totalKwh && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Tag label={`${fmtKwh(t.totalKwh)} kWh`} />
                    <Tag
                      label={`${fmtMoney(t.yearlyCostChf || 0, scCountry)} ${scCountry.currencySymbol}`}
                    />
                    {diffKwh !== 0 && (
                      <Tag
                        label={`${diffKwh > 0 ? '+' : ''}${fmtKwh(diffKwh)} vs. jetzt`}
                        color={diffKwh > 0 ? 'var(--accent)' : 'var(--accent-bright)'}
                      />
                    )}
                  </div>
                )}
                <button
                  onClick={() => onLoad(sc)}
                  className="btn"
                  style={{ marginTop: 10, width: '100%', fontSize: 10 }}
                >
                  LADEN
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Tag({ label, color = 'var(--text-dim)' }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 10,
        padding: '3px 7px',
        border: '1px solid var(--border-strong)',
        color,
      }}
    >
      {label}
    </span>
  );
}
