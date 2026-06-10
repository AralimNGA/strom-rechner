import { useState, useMemo } from 'react';
import { Search, Plus, X, HelpCircle, Minus } from 'lucide-react';
import {
  DEVICE_CATEGORIES,
  DEVICES,
  getDevicesByCategory,
  getDeviceById,
  getCategoryAverage,
} from '../data/devices.js';
import { fmtKwh } from '../utils/calculations.js';

export default function DevicesSection({
  selectedDevices,
  setSelectedDevices,
  fallbackCategories,
  setFallbackCategories,
  deviceQuantities,
  setDeviceQuantities,
}) {
  const [activeCategory, setActiveCategory] = useState('fridge');
  const [search, setSearch] = useState('');
  const [showBrand, setShowBrand] = useState('all');

  const devicesInCat = useMemo(() => {
    let list = getDevicesByCategory(activeCategory);
    if (showBrand !== 'all') list = list.filter((d) => d.brand === showBrand);
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (d) =>
          d.model.toLowerCase().includes(s) ||
          d.brand.toLowerCase().includes(s) ||
          d.note?.toLowerCase().includes(s),
      );
    }
    return list;
  }, [activeCategory, search, showBrand]);

  const brands = useMemo(() => {
    return [
      'all',
      ...new Set(getDevicesByCategory(activeCategory).map((d) => d.brand)),
    ].sort();
  }, [activeCategory]);

  const catMeta = DEVICE_CATEGORIES[activeCategory];
  const isFallback = fallbackCategories.includes(activeCategory);
  const selectedInCat = selectedDevices.filter(
    (id) => getDeviceById(id)?.category === activeCategory,
  );

  const toggleDevice = (id) => {
    if (selectedDevices.includes(id)) {
      setSelectedDevices(selectedDevices.filter((x) => x !== id));
      // qty cleanup beim Entfernen
      if (deviceQuantities && setDeviceQuantities) {
        const next = { ...deviceQuantities };
        delete next[id];
        setDeviceQuantities(next);
      }
    } else {
      setSelectedDevices([...selectedDevices, id]);
      // fallback aus wenn konkretes Gerät gewählt
      if (fallbackCategories.includes(activeCategory)) {
        setFallbackCategories(fallbackCategories.filter((c) => c !== activeCategory));
      }
    }
  };

  const setQty = (id, qty) => {
    if (!setDeviceQuantities) return;
    const safeQty = Math.max(1, Math.min(20, qty));
    if (safeQty === 1) {
      const next = { ...deviceQuantities };
      delete next[id];
      setDeviceQuantities(next);
    } else {
      setDeviceQuantities({ ...deviceQuantities, [id]: safeQty });
    }
  };

  const getQty = (id) => deviceQuantities?.[id] || 1;

  const toggleFallback = () => {
    if (isFallback) {
      setFallbackCategories(fallbackCategories.filter((c) => c !== activeCategory));
    } else {
      setFallbackCategories([...fallbackCategories, activeCategory]);
    }
  };

  return (
    <section id="section-geraete" style={{ marginTop: 40 }}>
      <div className="section-bar">
        <span className="section-num">02</span>
        <h2 className="section-title">GERÄTE-DATENBANK</h2>
        <div style={{ flex: 1 }}></div>
        <span
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-dimmer)', letterSpacing: '0.15em' }}
        >
          {DEVICES.length} MODELLE · {selectedDevices.length + fallbackCategories.length} GEWÄHLT
        </span>
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 12,
          marginBottom: 16,
          borderBottom: '1px solid var(--divider)',
        }}
      >
        {Object.entries(DEVICE_CATEGORIES).map(([id, cat]) => {
          const count =
            selectedDevices.filter((sid) => getDeviceById(sid)?.category === id).length +
            (fallbackCategories.includes(id) ? 1 : 0);
          const active = activeCategory === id;
          return (
            <button
              key={id}
              onClick={() => {
                setActiveCategory(id);
                setSearch('');
                setShowBrand('all');
              }}
              className={`btn ${active ? 'active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
                padding: '8px 12px',
              }}
            >
              <span>{cat.icon}</span>
              <span style={{ fontSize: 10 }}>{cat.name}</span>
              {count > 0 && (
                <span
                  style={{
                    background: active ? 'var(--bg)' : 'var(--accent)',
                    color: active ? 'var(--accent)' : '#fff',
                    padding: '1px 5px',
                    fontSize: 9,
                    borderRadius: 2,
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Fallback-Hinweis & Button */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
        <button
          onClick={toggleFallback}
          className={`btn ${isFallback ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderColor: isFallback ? 'var(--warning)' : 'var(--border-strong)',
            background: isFallback ? 'var(--warning)' : 'var(--surface-2)',
            color: isFallback ? '#000' : 'var(--text)',
          }}
        >
          <HelpCircle size={14} />
          Modell unbekannt → Durchschnitt ({catMeta.avgKwh} kWh)
        </button>
        {isFallback && (
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--warning-soft)',
              border: '1px solid var(--warning)',
              fontSize: 11,
              color: 'var(--warning)',
            }}
            className="mono"
          >
            Kategorie-Durchschnitt aktiv: {catMeta.avgKwh} kWh
          </div>
        )}
      </div>

      {/* Suche + Brand-Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search
            size={14}
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dimmer)',
            }}
          />
          <input
            type="text"
            placeholder="Modell suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
            style={{ paddingLeft: 32 }}
          />
        </div>
        <select
          value={showBrand}
          onChange={(e) => setShowBrand(e.target.value)}
          className="input"
          style={{ width: 180 }}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b === 'all' ? 'Alle Marken' : b}
            </option>
          ))}
        </select>
      </div>

      {/* Device Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 10,
          maxHeight: 500,
          overflowY: 'auto',
          padding: 2,
        }}
      >
        {devicesInCat.length === 0 ? (
          <div
            style={{
              gridColumn: '1/-1',
              padding: 40,
              textAlign: 'center',
              color: 'var(--text-dim)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
            }}
          >
            Kein Modell gefunden · Suchbegriff oder Marke ändern
          </div>
        ) : (
          devicesInCat.map((d) => {
            const selected = selectedDevices.includes(d.id);
            const qty = getQty(d.id);
            return (
              <button
                key={d.id}
                onClick={() => toggleDevice(d.id)}
                className="card"
                style={{
                  padding: 12,
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderColor: selected ? 'var(--accent-bright)' : 'var(--border)',
                  background: selected ? 'var(--accent-bright-soft)' : 'var(--surface)',
                  color: 'var(--text)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div
                      className="mono"
                      style={{ fontSize: 9, color: 'var(--accent-bright)', letterSpacing: '0.12em' }}
                    >
                      {d.brand.toUpperCase()} · {d.year}
                      {selected && qty > 1 && (
                        <span style={{ marginLeft: 6, color: 'var(--warning)', fontWeight: 700 }}>
                          × {qty}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, marginTop: 2, fontWeight: 500 }}>{d.model}</div>
                  </div>
                  {selected ? <X size={14} /> : <Plus size={14} style={{ opacity: 0.5 }} />}
                </div>
                {d.note && (
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{d.note}</div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 4,
                  }}
                >
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-dimmer)' }}>
                    {d.kwh} kWh/J
                  </span>
                  {d.class !== '—' && (
                    <span
                      className="efficiency-badge"
                      style={{
                        background: d.class.startsWith('A') ? '#0a3d1a' : 'var(--surface-hover)',
                        color: d.class.startsWith('A') ? '#7aff9a' : 'var(--text-dim)',
                      }}
                    >
                      {d.class}
                    </span>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Gewählte Geräte Liste */}
      {(selectedInCat.length > 0 || isFallback) && (
        <div style={{ marginTop: 16 }}>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              marginBottom: 8,
            }}
          >
            GEWÄHLT IN {catMeta.name.toUpperCase()}:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {isFallback && (
              <div
                className="mono"
                style={{
                  padding: '6px 10px',
                  background: 'var(--warning)',
                  color: '#000',
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <HelpCircle size={12} /> Ø Durchschnitt {catMeta.avgKwh} kWh
              </div>
            )}
            {selectedInCat.map((id) => {
              const d = getDeviceById(id);
              const qty = getQty(id);
              const totalKwh = d.kwh * qty;
              return (
                <div
                  key={id}
                  className="mono"
                  style={{
                    padding: '6px 10px',
                    background: 'var(--accent-bright-soft)',
                    border: '1px solid var(--accent-bright)',
                    color: 'var(--text)',
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {d.model}
                  {qty > 1 && (
                    <span style={{ color: 'var(--accent-bright)', fontWeight: 700 }}>
                      × {qty}
                    </span>
                  )}
                  · {totalKwh} kWh
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 4 }}>
                    <button
                      onClick={() => setQty(id, qty - 1)}
                      disabled={qty <= 1}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: qty <= 1 ? 'var(--text-dimmer)' : 'var(--text)',
                        cursor: qty <= 1 ? 'not-allowed' : 'pointer',
                        padding: '2px 4px',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Anzahl verringern"
                    >
                      <Minus size={10} />
                    </button>
                    <span style={{ minWidth: 18, textAlign: 'center', fontWeight: 600 }}>
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(id, qty + 1)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Anzahl erhöhen"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleDevice(id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-dim)',
                      cursor: 'pointer',
                      padding: 0,
                      marginLeft: 2,
                    }}
                    title="Entfernen"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
