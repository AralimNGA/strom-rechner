import { useState } from 'react';
import { TrendingUp, Zap, Users, Globe } from 'lucide-react';
import { CH_MACRO, projectNationalImpact, calculateExternalities } from '../data/macroData.js';

/**
 * Volkswirtschaftlicher Impact-Hochrechner
 *
 * Beantwortet die zentrale Frage der Probe-VA:
 * "Welchen Beitrag können wir selbst zu einer besseren Welt leisten?"
 *
 * Skaliert individuelles Sparpotential auf nationale Ebene.
 */
export default function VolkswirtschaftSection({ totalKwh, co2Kg, persons }) {
  const [savedPercent, setSavedPercent] = useState(15);

  // Annahme: jeder Haushalt spart X% seines Verbrauchs
  const kWhSavedPerHousehold = (totalKwh * savedPercent) / 100;
  const proj = projectNationalImpact(kWhSavedPerHousehold);
  const ext = calculateExternalities(co2Kg);

  // Wenn alle 8.8 Mio Einwohner deinen Pro-Kopf-Wert hätten
  const perPersonKwh = totalKwh / persons;
  const nationalIfAllLikeMe = (perPersonKwh * CH_MACRO.totalPopulation) / 1_000_000_000;
  const nationalDiffPct =
    ((nationalIfAllLikeMe - CH_MACRO.householdConsumptionTwh) / CH_MACRO.householdConsumptionTwh) *
    100;

  return (
    <section id="section-volkswirtschaft" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">15</span>
        <h2 className="section-title">VOLKSWIRTSCHAFTLICHER IMPACT</h2>
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'var(--text-dim)',
          marginBottom: 16,
          lineHeight: 1.5,
        }}
      >
        Wenn alle 3.9 Mio Schweizer Haushalte deine Optimierungen umsetzen würden — was wäre der
        gesamtschweizerische Effekt? Skalierung von Mikro auf Makro.
        Daten: BFS Statistik der Privathaushalte 2024, BFE Elektrizitätsstatistik 2023.
      </div>

      {/* "Wenn alle wie du" Karte */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
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
          <Users size={12} /> WENN ALLE 8.8 MIO EINWOHNER WIE DU LEBEN WÜRDEN
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
              Nationaler Haushaltsstrombedarf
            </div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              {nationalIfAllLikeMe.toFixed(1)} TWh
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              Aktuell real: {CH_MACRO.householdConsumptionTwh} TWh
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
              Differenz zur Realität
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: nationalDiffPct < 0 ? 'var(--success)' : 'var(--warning)',
              }}
            >
              {nationalDiffPct > 0 ? '+' : ''}
              {nationalDiffPct.toFixed(1)}%
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {nationalDiffPct < 0
                ? 'Du verbrauchst weniger als der Schweizer Durchschnitt'
                : 'Dein Verbrauch liegt über dem CH-Durchschnitt'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
              Pro Kopf bei dir
            </div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              {Math.round(perPersonKwh)} kWh
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              CH-Durchschnitt: ~{Math.round((CH_MACRO.householdConsumptionTwh * 1_000_000_000) / CH_MACRO.totalPopulation)} kWh
            </div>
          </div>
        </div>
      </div>

      {/* Spar-Slider */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
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
          <TrendingUp size={12} /> WENN ALLE 3.9 MIO HAUSHALTE X% SPAREN WÜRDEN
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 12 }}>Einsparung pro Haushalt:</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-bright)' }}>
              {savedPercent}% ({Math.round(kWhSavedPerHousehold)} kWh)
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="40"
            step="5"
            value={savedPercent}
            onChange={(e) => setSavedPercent(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent-bright)',
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 9,
              color: 'var(--text-dim)',
              marginTop: 2,
            }}
            className="mono"
          >
            <span>5% (realistisch ohne Aufwand)</span>
            <span>20% (gezielte Massnahmen)</span>
            <span>40% (radikales Sparen)</span>
          </div>
        </div>

        {/* Hochrechnungs-Resultate */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              padding: 10,
              background: 'var(--accent-bright-soft)',
              borderLeft: '3px solid var(--accent-bright)',
            }}
          >
            <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
              GESAMT-EINSPARUNG CH
            </div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{proj.totalSavedTwh} TWh</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {(proj.totalSavedKwh / 1_000_000).toFixed(0)} Mio kWh
            </div>
          </div>
          <div
            style={{
              padding: 10,
              background: 'var(--surface-hover)',
              borderLeft: '3px solid var(--success)',
            }}
          >
            <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
              CO2-EINSPARUNG
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--success)' }}>
              {(proj.co2SavedTons / 1000).toFixed(1)} kt
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              {proj.co2SavedTons.toLocaleString('de-CH')} t CO2
            </div>
          </div>
          <div
            style={{
              padding: 10,
              background: 'var(--surface-hover)',
              borderLeft: '3px solid var(--warning)',
            }}
          >
            <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
              MONETÄRER WERT (HAUSHALTE)
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--warning)' }}>
              CHF {proj.monetarySavingsBnChf} Mrd
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              ~29 Rp./kWh × eingesparte kWh
            </div>
          </div>
        </div>

        {/* Vergleichswerte */}
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: 'var(--text-dim)',
            letterSpacing: '0.15em',
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          ANSCHAULICHE VERGLEICHE
        </div>
        <div style={{ display: 'grid', gap: 6 }}>
          {proj.equivalents.map((eq, i) => (
            <div
              key={i}
              style={{
                padding: '8px 10px',
                background: 'var(--surface)',
                borderLeft: '2px solid var(--accent-bright)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 12,
                gap: 12,
              }}
            >
              <span style={{ flex: 1 }}>{eq.label}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-bright)' }}>
                {eq.value}{eq.unit}
              </span>
            </div>
          ))}
        </div>
        <div
          className="mono"
          style={{ fontSize: 9, color: 'var(--text-dimmer)', marginTop: 8, fontStyle: 'italic' }}
        >
          Quellen: Swissgrid, Axpo Geschäftsbericht 2023, SBB Geschäftsbericht 2023, BFE
          Elektrizitätsstatistik 2023
        </div>
      </div>

      {/* Externalitäten */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
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
          <Globe size={12} /> EXTERNALITÄTEN — WAS KOSTET DEIN CO2 GESELLSCHAFTLICH?
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12, lineHeight: 1.5 }}>
          Dein Stromverbrauch verursacht {ext.co2Tonnen} t CO2 pro Jahr. Diese Emissionen haben einen
          Preis — den du nicht direkt zahlst, der aber von der Gesellschaft getragen wird (Pigou-Externalitäten).
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
              EU-ETS HANDELSPREIS
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>CHF {ext.euEtsValueChf}</div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>
              ~75 EUR/t · EU-Emissionshandel 2024
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
              SCHWEDEN-STIL CO2-STEUER
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--warning)' }}>
              CHF {ext.swedishStyleTaxChf}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>
              ~120 EUR/t · höchste Steuer EU
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: '0.12em' }}>
              SOZIAL-KOSTEN (HOCH)
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--danger)' }}>
              CHF {ext.socialCostHighChf}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>
              ~200 USD/t · IPCC-Schätzung
            </div>
          </div>
        </div>
        <div
          className="mono"
          style={{ fontSize: 9, color: 'var(--text-dimmer)', marginTop: 10, fontStyle: 'italic' }}
        >
          Quellen: European Energy Exchange (EEX), Schwedisches Finanzministerium, IPCC AR6 (2023)
        </div>
      </div>

      {/* CH-Energiemix */}
      <div className="card" style={{ padding: 16 }}>
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
          <Zap size={12} /> CH-ENERGIEMIX 2023 — WORAUS DEIN STROM KOMMT
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {Object.entries(CH_MACRO.energyMix2023).map(([key, twh]) => {
            const pct = (twh / CH_MACRO.totalConsumptionTwh) * 100;
            const labels = {
              waterPower: { name: 'Wasserkraft', emoji: '💧', color: '#4488ff' },
              nuclear: { name: 'Kernenergie', emoji: '⚛️', color: '#ffaa00' },
              solar: { name: 'Photovoltaik', emoji: '☀️', color: '#ffcc00' },
              wind: { name: 'Wind', emoji: '💨', color: '#88ccee' },
              other: { name: 'Biomasse / Abfall / Fossil', emoji: '🌱', color: '#88aa44' },
            };
            const meta = labels[key];
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 130, fontSize: 12 }}>
                  {meta.emoji} {meta.name}
                </div>
                <div style={{ flex: 1, height: 18, background: 'var(--surface)', position: 'relative' }}>
                  <div
                    style={{
                      height: '100%',
                      background: meta.color,
                      width: `${(twh / 35) * 100}%`,
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
                <div className="mono" style={{ fontSize: 11, minWidth: 90, textAlign: 'right' }}>
                  {twh.toFixed(1)} TWh ({pct.toFixed(0)}%)
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="mono"
          style={{ fontSize: 9, color: 'var(--text-dimmer)', marginTop: 12, fontStyle: 'italic' }}
        >
          Quelle: BFE Schweizerische Elektrizitätsstatistik 2023. CH-Strom hat dank Wasser+Kern eine
          sehr tiefe CO2-Intensität von ~22 g CO2/kWh (Vergleich DE: ~380 g/kWh).
        </div>
      </div>
    </section>
  );
}
