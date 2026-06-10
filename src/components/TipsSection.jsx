import { Lightbulb, TrendingDown, Sun, Zap } from 'lucide-react';

const TIPS = [
  {
    icon: TrendingDown,
    title: 'Wärmepumpe statt Elektroheizung',
    saving: '−70%',
    text: 'Bei 4500 kWh Heizverbrauch bedeutet das ~3150 kWh weniger pro Jahr.',
  },
  {
    icon: Zap,
    title: 'Stand-by killen',
    saving: 'bis 10%',
    text: 'Steckerleisten mit Schalter für TV/Konsole/AV-Receiver — typisch 200–400 kWh/Jahr gespart.',
  },
  {
    icon: Sun,
    title: 'PV-Anlage mit Eigenverbrauch',
    saving: '~50%',
    text: '8 kWp + Batterie → ~5000 kWh Eigenstrom, Amortisation 10–14 Jahre.',
  },
  {
    icon: Lightbulb,
    title: 'LED überall, auch im Keller',
    saving: '−80% vs. Halogen',
    text: 'Tauschen in 3 Stunden erledigt — pays back in unter einem Jahr.',
  },
  {
    icon: TrendingDown,
    title: 'Waschen bei 30°C statt 60°C',
    saving: '−60%',
    text: 'Moderne Maschinen + moderne Waschmittel reichen bei 30° locker für Alltagswäsche.',
  },
  {
    icon: Zap,
    title: 'Kühlschrank nicht neben Herd/Ofen',
    saving: '−15%',
    text: 'Jedes Grad Umgebungstemperatur kostet ~3% mehr Kühlenergie.',
  },
];

export default function TipsSection() {
  return (
    <section style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">13</span>
        <h2 className="section-title">SPAR-MOVES</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12,
        }}
      >
        {TIPS.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div key={i} className="card" style={{ padding: 16 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon size={16} color="var(--accent-bright)" />
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--accent-bright)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {tip.saving}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>
                {tip.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.4 }}>
                {tip.text}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
