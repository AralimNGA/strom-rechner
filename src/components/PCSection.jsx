import { Cpu, X, FileText, Gamepad2, Flame, Sliders } from 'lucide-react';
import { CPUS, GPUS } from '../data/pcComponents.js';

export const PC_MODES = {
  none: { id: 'none', label: 'Kein PC', icon: X, kwh: 0, desc: 'Kein Desktop-PC im Haushalt' },
  fallback_office: {
    id: 'fallback_office',
    label: 'Office-Setup',
    icon: FileText,
    kwh: 150,
    desc: 'Office, Surfen, Streaming · ~150 kWh/J · 6h/Tag mässig',
  },
  fallback_gaming: {
    id: 'fallback_gaming',
    label: 'Gaming-Setup',
    icon: Gamepad2,
    kwh: 400,
    desc: 'Mid-Range Gaming PC · ~400 kWh/J · RTX 4060/4070 Klasse',
  },
  fallback_highend: {
    id: 'fallback_highend',
    label: 'High-End-Setup',
    icon: Flame,
    kwh: 750,
    desc: 'Enthusiast-Rig · ~750 kWh/J · RTX 4090/5090 Klasse, viel Heavy-Load',
  },
  custom: {
    id: 'custom',
    label: 'Detailliert konfigurieren',
    icon: Sliders,
    kwh: null,
    desc: 'CPU, GPU und Nutzungsmuster genau eintragen',
  },
};

export default function PCSection({
  pcMode,
  setPcMode,
  cpuId,
  setCpuId,
  gpuId,
  setGpuId,
  pattern,
  setPattern,
  pcKwh,
}) {
  const groupedCpus = {
    'AMD Zen 5 X3D': CPUS.filter((c) => c.gen === 'Zen 5 X3D'),
    'AMD Zen 5': CPUS.filter((c) => c.gen === 'Zen 5'),
    'AMD Zen 4 X3D': CPUS.filter((c) => c.gen === 'Zen 4 X3D'),
    'AMD Zen 4': CPUS.filter((c) => c.gen === 'Zen 4'),
    'Intel Arrow Lake': CPUS.filter((c) => c.gen === 'Arrow Lake'),
    'Intel Raptor Lake Refresh': CPUS.filter((c) => c.gen === 'Raptor Lake Refresh'),
    'Intel Raptor Lake': CPUS.filter((c) => c.gen === 'Raptor Lake'),
  };

  const isCustom = pcMode === 'custom';
  const isNone = pcMode === 'none';

  return (
    <section id="section-pc" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">03</span>
        <h2 className="section-title">PC / GAMING-RIG</h2>
        <div style={{ flex: 1 }}></div>
        <span
          className="mono display"
          style={{ fontSize: 22, color: pcKwh > 0 ? 'var(--accent-bright)' : 'var(--text-dim)' }}
        >
          {pcKwh} kWh/J
        </span>
      </div>

      {/* Mode Picker — Pill Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 8,
          marginBottom: 16,
        }}
      >
        {Object.values(PC_MODES).map((mode) => {
          const Icon = mode.icon;
          const active = pcMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setPcMode(mode.id)}
              className={`btn ${active ? 'active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '12px 14px',
                gap: 6,
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
                <Icon size={14} />
                <span style={{ fontSize: 11 }}>{mode.label}</span>
                {mode.kwh !== null && (
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: 10,
                      opacity: 0.7,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {mode.kwh} kWh
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode-Beschreibung */}
      <div
        className="card"
        style={{
          padding: 14,
          marginBottom: isCustom ? 16 : 0,
          background: isNone ? 'var(--surface-2)' : 'var(--accent-soft)',
          borderColor: isNone ? 'var(--border)' : 'var(--accent)',
        }}
      >
        <div
          className="mono"
          style={{
            fontSize: 11,
            color: isNone ? 'var(--text-dim)' : 'var(--accent)',
            letterSpacing: '0.1em',
          }}
        >
          {PC_MODES[pcMode]?.desc || ''}
        </div>
      </div>

      {/* Custom Configuration — nur wenn 'custom' */}
      {isCustom && (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 16,
            }}
          >
            <div className="card" style={{ padding: 16 }}>
              <label
                className="mono"
                style={{
                  fontSize: 10,
                  color: 'var(--text-dim)',
                  letterSpacing: '0.15em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                <Cpu size={12} /> CPU
              </label>
              <select value={cpuId} onChange={(e) => setCpuId(e.target.value)} className="input">
                {Object.entries(groupedCpus).map(([gen, cpus]) =>
                  cpus.length > 0 ? (
                    <optgroup key={gen} label={gen}>
                      {cpus.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </optgroup>
                  ) : null,
                )}
              </select>
            </div>

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
                GPU
              </label>
              <select value={gpuId} onChange={(e) => setGpuId(e.target.value)} className="input">
                <option value="none">Keine dedizierte GPU (iGPU)</option>
                <optgroup label="NVIDIA RTX 50">
                  {GPUS.filter((g) => g.id.startsWith('rtx5')).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="NVIDIA RTX 40">
                  {GPUS.filter((g) => g.id.startsWith('rtx4')).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="AMD RX 9000">
                  {GPUS.filter((g) => g.id.startsWith('rx9')).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="AMD RX 7000">
                  {GPUS.filter((g) => g.id.startsWith('rx7')).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Intel Arc">
                  {GPUS.filter((g) => g.id.startsWith('arc')).map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="card" style={{ padding: 16, marginTop: 12 }}>
            <label
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--text-dim)',
                letterSpacing: '0.15em',
                display: 'block',
                marginBottom: 12,
              }}
            >
              NUTZUNGSMUSTER (Stunden/Tag)
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
              }}
            >
              <Slider
                label="IDLE"
                val={pattern.idle_hours_day}
                onChange={(v) => setPattern({ ...pattern, idle_hours_day: v })}
                color="var(--info)"
              />
              <Slider
                label="LIGHT (Office/Web)"
                val={pattern.light_hours_day}
                onChange={(v) => setPattern({ ...pattern, light_hours_day: v })}
                color="var(--accent-bright)"
              />
              <Slider
                label="HEAVY (Gaming/3D)"
                val={pattern.heavy_hours_day}
                onChange={(v) => setPattern({ ...pattern, heavy_hours_day: v })}
                color="var(--accent)"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function Slider({ label, val, onChange, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.1em' }}
        >
          {label}
        </span>
        <span className="mono" style={{ fontSize: 11, color }}>
          {val}h
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="12"
        step="0.5"
        value={val}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: color }}
      />
    </div>
  );
}
