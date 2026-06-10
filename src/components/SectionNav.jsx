const SECTIONS = [
  { id: 'profil', label: '01 · Profil' },
  { id: 'geraete', label: '02 · Geräte' },
  { id: 'pc', label: '03 · PC' },
  { id: 'solar', label: '04 · Solar' },
  { id: 'tarif', label: '05 · HT/NT' },
  { id: 'tageskurve', label: '06 · Tageskurve' },
  { id: 'markt', label: '07 · Markt' },
  { id: 'compare', label: '08 · Anbieter-Vgl.' },
  { id: 'dashboard', label: '09 · Audit' },
  { id: 'breakdown', label: '10 · Breakdown' },
  { id: 'plan', label: '11 · Optimierung' },
  { id: 'szenarien', label: '12 · Szenarien' },
  { id: 'history', label: '14 · Historie 📊' },
  { id: 'volkswirtschaft', label: '15 · Volkswirtschaft 🌍' },
];

export default function SectionNav() {
  const scrollTo = (id) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <nav
      style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--divider)',
      }}
    >
      <div className="tab-nav" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
        {SECTIONS.map((s) => (
          <button key={s.id} className="tab-btn" onClick={() => scrollTo(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
