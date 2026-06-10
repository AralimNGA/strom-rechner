import { Zap, TrendingUp, Gauge, Leaf, Activity, Target } from 'lucide-react';
import { fmtKwh, fmtMoney } from '../utils/calculations.js';
import { getCO2Equivalents, getKwhEquivalents } from '../data/co2Equivalents.js';
import { getCountry } from '../data/countries.js';
import { calculateClimateGoal } from '../utils/insights.js';

export default function DashboardSection({
  totalKwh,
  yearlyCostChf,
  co2Kg,
  efficiency,
  averageKwh,
  countryId,
  persons,
}) {
  const country = getCountry(countryId);
  const monthlyCost = yearlyCostChf / 12;
  const co2Eq = getCO2Equivalents(co2Kg);
  const kwhEq = getKwhEquivalents(totalKwh);
  const climate = calculateClimateGoal(co2Kg, persons);

  return (
    <section id="section-dashboard" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">09</span>
        <h2 className="section-title">DEIN AUDIT</h2>
      </div>

      {/* Main Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <BigMetric
          icon={<Zap size={18} />}
          label="JAHRESVERBRAUCH"
          value={fmtKwh(totalKwh)}
          unit="kWh"
          color="var(--accent)"
          sub={`vs. erwartet ⌀ ${fmtKwh(averageKwh)} kWh`}
        />
        <BigMetric
          icon={<TrendingUp size={18} />}
          label="KOSTEN/JAHR"
          value={fmtMoney(yearlyCostChf, country)}
          unit={country.currencySymbol}
          color="var(--accent-bright)"
          sub={`${fmtMoney(monthlyCost, country)} ${country.currencySymbol}/Monat`}
        />
        <BigMetric
          icon={<Leaf size={18} />}
          label="CO₂-AUSSTOSS"
          value={co2Kg.toLocaleString(country.locale)}
          unit="kg/Jahr"
          color="#66ff66"
          sub={`${country.co2GramsPerKwh}g/kWh ${country.flag}-Mix`}
        />
        <EfficiencyGauge efficiency={efficiency} />
      </div>

      {/* Deviation Thermometer */}
      <DeviationBar
        efficiency={efficiency}
        totalKwh={totalKwh}
        averageKwh={averageKwh}
      />

      {/* Klimaziel Check */}
      <ClimateGoalCard climate={climate} co2Kg={co2Kg} country={country} />

      {/* CO2 Equivalents */}
      <div
        className="card"
        style={{ padding: 20, marginBottom: 16, background: 'var(--surface-2)' }}
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
          <Leaf size={12} color="#66ff66" /> WAS BEDEUTET DEIN CO₂?
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
          }}
        >
          <EqCell emoji="✈️" value={co2Eq.flights_mallorca} unit="Flüge Mallorca" />
          <EqCell emoji="🚗" value={co2Eq.car_km.toLocaleString(country.locale)} unit="km Benziner" />
          <EqCell emoji="🌳" value={co2Eq.trees_needed} unit="Bäume für 1J" />
          <EqCell emoji="🥩" value={co2Eq.beef_kg} unit="kg Rindfleisch" />
          <EqCell emoji="⛽" value={co2Eq.gasoline_liters} unit="L Benzin" />
        </div>
      </div>

      {/* kWh Equivalents */}
      <div className="card" style={{ padding: 20, background: 'var(--surface-2)' }}>
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
          <Zap size={12} color="var(--accent-bright)" /> DEIN VERBRAUCH IN ALLTAGS-EINHEITEN
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
          }}
        >
          <EqCell emoji="🚿" value={kwhEq.showers.toLocaleString(country.locale)} unit="warme Duschen" />
          <EqCell emoji="☕" value={kwhEq.coffee_cups.toLocaleString(country.locale)} unit="Tassen Kaffee" />
          <EqCell emoji="🧺" value={kwhEq.laundry_loads.toLocaleString(country.locale)} unit="Waschgänge" />
          <EqCell emoji="🔋" value={kwhEq.ev_km.toLocaleString(country.locale)} unit="km E-Auto" />
          <EqCell
            emoji="📱"
            value={kwhEq.smartphones_fully_charged.toLocaleString(country.locale)}
            unit="Handy-Ladungen"
          />
        </div>
      </div>
    </section>
  );
}

function DeviationBar({ efficiency, totalKwh, averageKwh }) {
  const { deviationPct, deviationLabel, deviationColor } = efficiency;

  // Map deviation to 0-100% position on bar
  // -50% → 0%, 0% → 50%, +50% → 100%, +100% → 100%
  const clampedPct = Math.max(-50, Math.min(100, deviationPct));
  // shifted: -50 → 0, 0 → 0.5, +50 → 1, +100 → 1.25 (overshoot ok visually capped)
  const visualPos = Math.max(2, Math.min(98, ((clampedPct + 50) / 150) * 100));

  const above = deviationPct > 0;
  const verdict = above
    ? `Du verbrauchst ${deviationLabel.replace('+', '')} mehr Strom als erwartet`
    : deviationPct < 0
    ? `Du verbrauchst ${Math.abs(deviationPct)}% weniger als erwartet — geile Effizienz!`
    : 'Du liegst exakt auf dem Erwartungswert';

  return (
    <div
      className="card"
      style={{
        padding: 20,
        marginBottom: 16,
        background: 'var(--surface-2)',
        borderColor: deviationColor,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Activity size={12} color={deviationColor} /> ABWEICHUNG VOM ERWARTUNGSWERT
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span className="display" style={{ fontSize: 32, color: deviationColor, lineHeight: 1 }}>
            {deviationLabel}
          </span>
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
            vs. Schnitt
          </span>
        </div>
      </div>

      {/* Thermometer Bar */}
      <div
        style={{
          position: 'relative',
          height: 32,
          background:
            'linear-gradient(to right, #00ff88 0%, #66ff66 25%, #d4ff00 40%, #ffd700 50%, #ffaa00 60%, #ff6600 75%, #ff0040 100%)',
          marginBottom: 8,
          marginTop: 8,
        }}
      >
        {/* Center line at 0% deviation */}
        <div
          style={{
            position: 'absolute',
            left: '33.33%',
            top: -4,
            bottom: -4,
            width: 1,
            background: 'var(--text)',
            opacity: 0.3,
          }}
        />
        {/* Position marker */}
        <div
          style={{
            position: 'absolute',
            left: `${visualPos}%`,
            top: -6,
            bottom: -6,
            width: 4,
            background: 'var(--text)',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 0 2px var(--bg)',
            transition: 'left 0.4s ease',
          }}
        />
      </div>

      <div
        className="mono"
        style={{
          fontSize: 10,
          color: 'var(--text-dimmer)',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span>−50% (Champion)</span>
        <span>SCHNITT (0%)</span>
        <span>+100% (Notfall)</span>
      </div>

      <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{verdict}</div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 4 }}>
        {fmtKwh(totalKwh)} kWh ({fmtKwh(averageKwh)} kWh erwartet)
      </div>
    </div>
  );
}

function ClimateGoalCard({ climate, co2Kg, country }) {
  const barWidth = Math.min(climate.ratio * 100, 250); // cap at 2.5x

  return (
    <div
      className="card"
      style={{
        padding: 20,
        marginBottom: 16,
        background: 'var(--surface-2)',
        borderColor: climate.color,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Target size={12} color={climate.color} /> KLIMAZIEL · 1.5 °C-PFAD
        </div>
        <div
          className="mono"
          style={{
            fontSize: 11,
            padding: '4px 10px',
            border: `1px solid ${climate.color}`,
            color: climate.color,
            letterSpacing: '0.1em',
          }}
        >
          {climate.label.toUpperCase()}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <ClimateCell
          label="DEIN CO₂"
          value={co2Kg.toLocaleString(country.locale)}
          unit="kg/Jahr"
          color={climate.color}
        />
        <ClimateCell
          label="PRO PERSON"
          value={climate.perPerson.toLocaleString(country.locale)}
          unit="kg"
          color="var(--text)"
        />
        <ClimateCell
          label="ZIEL/PERSON"
          value={climate.targetPerPerson.toString()}
          unit="kg (Strom)"
          color="var(--text-dim)"
        />
        <ClimateCell
          label="% VOM ZIEL"
          value={`${climate.pctOfTarget}%`}
          unit={climate.pctOfTarget <= 100 ? 'innerhalb' : 'über Ziel'}
          color={climate.color}
        />
      </div>

      {/* Progress bar — 0% to 250% scale */}
      <div
        style={{
          position: 'relative',
          height: 12,
          background: 'var(--border)',
          marginBottom: 8,
        }}
      >
        {/* 100% target line */}
        <div
          style={{
            position: 'absolute',
            left: '40%', // 100/250
            top: -2,
            bottom: -2,
            width: 1,
            background: 'var(--text)',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            height: '100%',
            width: `${(barWidth / 250) * 100}%`,
            background: climate.color,
            transition: 'width 0.4s ease',
          }}
        />
      </div>
      <div
        className="mono"
        style={{
          fontSize: 9,
          color: 'var(--text-dimmer)',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span>0%</span>
        <span style={{ marginLeft: '40%' }}>← KLIMANEUTRAL ({climate.target} kg)</span>
        <span>250%</span>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.5 }}>
        {climate.msg} · Pariser Pfad: ~{climate.targetPerPerson} kg CO₂ pro Person und Jahr
        nur für Strom (Klimaneutralität 2050).
      </div>
    </div>
  );
}

function ClimateCell({ label, value, unit, color }) {
  return (
    <div>
      <div
        className="mono"
        style={{
          fontSize: 9,
          color: 'var(--text-dimmer)',
          letterSpacing: '0.15em',
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div className="display" style={{ fontSize: 24, color, lineHeight: 1 }}>
        {value}
      </div>
      <div className="mono" style={{ fontSize: 9, color: 'var(--text-dimmer)', marginTop: 2 }}>
        {unit}
      </div>
    </div>
  );
}

function BigMetric({ icon, label, value, unit, color, sub }) {
  return (
    <div className="card" style={{ padding: 20 }}>
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
        {icon} {label}
      </div>
      <div
        className="display num-anim"
        key={value}
        style={{ fontSize: 40, color, lineHeight: 1 }}
      >
        {value}
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>
        {unit}
      </div>
      {sub && (
        <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 6 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function EfficiencyGauge({ efficiency }) {
  const { score, grade, label, color } = efficiency;
  const circ = 2 * Math.PI * 42;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="card" style={{ padding: 20 }}>
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
        <Gauge size={12} /> EFFIZIENZ
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8" className="gauge-track" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <div>
          <div className="display" style={{ fontSize: 48, color, lineHeight: 1 }}>
            {grade}
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--text)', marginTop: 2 }}>
            {score}/100
          </div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)' }}>
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

function EqCell({ emoji, value, unit }) {
  return (
    <div>
      <div style={{ fontSize: 24, marginBottom: 2 }}>{emoji}</div>
      <div className="display" style={{ fontSize: 22, color: 'var(--text)', lineHeight: 1 }}>
        {value}
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)', marginTop: 2 }}>
        {unit}
      </div>
    </div>
  );
}
