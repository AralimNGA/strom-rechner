import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { generateLoadCurve, getTariffClass, getPeaks, calculateNtShareFromCurve } from '../utils/loadCurve.js';
import { getIndustry } from '../data/industries.js';
import { fmtKwh } from '../utils/calculations.js';

export default function LoadCurveSection({ industryId, totalKwh, htNtEnabled }) {
  const industry = getIndustry(industryId);
  const dailyKwh = totalKwh / 365;
  const curve = generateLoadCurve(industryId, dailyKwh);
  const max = Math.max(...curve);
  const peaks = getPeaks(curve);
  const calculatedNtShare = calculateNtShareFromCurve(curve);

  const W = 720;
  const H = 220;
  const PAD = { l: 40, r: 16, t: 12, b: 32 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;
  const barW = innerW / 24;

  return (
    <section id="section-tageskurve" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">06</span>
        <h2 className="section-title">TAGESKURVE</h2>
        <div style={{ flex: 1 }}></div>
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-dimmer)', letterSpacing: '0.15em' }}
        >
          PROFIL: {industry.emoji !== '—' ? industry.emoji + ' ' : ''}
          {industry.name.toUpperCase()}
        </span>
      </div>

      <div
        className="card"
        style={{ padding: 20, overflow: 'hidden' }}
      >
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Activity size={12} color="var(--accent-bright)" /> 24h LAST-PROFIL · ⌀ {dailyKwh.toFixed(1)} kWh/Tag
        </div>

        {/* SVG Chart */}
        <div style={{ overflowX: 'auto' }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: '100%', minWidth: 600, display: 'block' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const y = PAD.t + innerH * (1 - frac);
              return (
                <g key={frac}>
                  <line
                    x1={PAD.l}
                    y1={y}
                    x2={W - PAD.r}
                    y2={y}
                    stroke="var(--divider)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                  <text
                    x={PAD.l - 6}
                    y={y + 3}
                    fontSize="9"
                    fontFamily="JetBrains Mono"
                    fill="var(--text-dimmer)"
                    textAnchor="end"
                  >
                    {(max * frac).toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* HT/NT Background bands (if enabled) */}
            {htNtEnabled && (
              <>
                {/* NT bands: 0-6 and 22-24 */}
                <rect
                  x={PAD.l}
                  y={PAD.t}
                  width={6 * barW}
                  height={innerH}
                  fill="var(--info)"
                  opacity="0.06"
                />
                <rect
                  x={PAD.l + 22 * barW}
                  y={PAD.t}
                  width={2 * barW}
                  height={innerH}
                  fill="var(--info)"
                  opacity="0.06"
                />
                <text
                  x={PAD.l + 3 * barW}
                  y={PAD.t + 12}
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fill="var(--info)"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  NT
                </text>
                <text
                  x={PAD.l + 14 * barW}
                  y={PAD.t + 12}
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fill="var(--accent)"
                  textAnchor="middle"
                  letterSpacing="1"
                  opacity="0.5"
                >
                  HT
                </text>
                <text
                  x={PAD.l + 23 * barW}
                  y={PAD.t + 12}
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fill="var(--info)"
                  textAnchor="middle"
                  letterSpacing="1"
                >
                  NT
                </text>
              </>
            )}

            {/* Bars */}
            {curve.map((kwh, hour) => {
              const h = (kwh / max) * innerH;
              const x = PAD.l + hour * barW + 1;
              const y = PAD.t + innerH - h;
              const isPeak = hour === peaks.peakHour;
              const isLow = hour === peaks.lowHour;
              const isNt = getTariffClass(hour) === 'NT';
              return (
                <g key={hour}>
                  <rect
                    x={x}
                    y={y}
                    width={barW - 2}
                    height={h}
                    fill={
                      isPeak
                        ? 'var(--accent)'
                        : isLow
                        ? 'var(--info)'
                        : isNt && htNtEnabled
                        ? 'var(--info)'
                        : 'var(--accent-bright)'
                    }
                    opacity={isPeak || isLow ? 1 : 0.85}
                    rx="1"
                  />
                  {hour % 3 === 0 && (
                    <text
                      x={x + (barW - 2) / 2}
                      y={H - PAD.b + 14}
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      fill="var(--text-dimmer)"
                      textAnchor="middle"
                    >
                      {String(hour).padStart(2, '0')}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Peak labels */}
            <text
              x={PAD.l + peaks.peakHour * barW + barW / 2}
              y={PAD.t + innerH - (peaks.peakKwh / max) * innerH - 4}
              fontSize="9"
              fontFamily="JetBrains Mono"
              fill="var(--accent)"
              textAnchor="middle"
              fontWeight="700"
            >
              ▲ PEAK
            </text>
          </svg>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid var(--divider)',
          }}
        >
          <Stat
            icon={<TrendingUp size={14} color="var(--accent)" />}
            label="PEAK-STUNDE"
            value={`${String(peaks.peakHour).padStart(2, '0')}:00`}
            sub={`${peaks.peakKwh.toFixed(2)} kWh`}
            color="var(--accent)"
          />
          <Stat
            icon={<TrendingDown size={14} color="var(--info)" />}
            label="NIEDRIGSTE STUNDE"
            value={`${String(peaks.lowHour).padStart(2, '0')}:00`}
            sub={`${peaks.lowKwh.toFixed(2)} kWh`}
            color="var(--info)"
          />
          <Stat
            label="NT-ANTEIL (BERECHNET)"
            value={`${calculatedNtShare}%`}
            sub="aus Lastprofil"
            color="var(--accent-bright)"
          />
          <Stat
            label="JAHRES-TOTAL"
            value={fmtKwh(totalKwh)}
            sub="kWh"
            color="var(--text)"
          />
        </div>

        {industry.id !== 'unspecified' && (
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dimmer)',
              marginTop: 12,
              padding: 10,
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
            }}
          >
            ℹ️ Profil-Annahme für {industry.name}: {industry.note}.
            Anpassbar via Branchen-Auswahl im Profil.
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ icon, label, value, sub, color }) {
  return (
    <div>
      <div
        className="mono"
        style={{
          fontSize: 9,
          color: 'var(--text-dimmer)',
          letterSpacing: '0.15em',
          marginBottom: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        {icon} {label}
      </div>
      <div className="display" style={{ fontSize: 22, color, lineHeight: 1 }}>
        {value}
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 2 }}>
        {sub}
      </div>
    </div>
  );
}
