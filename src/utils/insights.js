/**
 * Stromfresser-Analyse: identifiziert Top-N Verbraucher
 */
import { getDeviceById, getCategoryAverage, DEVICE_CATEGORIES } from '../data/devices.js';

const PC_MODE_LABELS = {
  fallback_office: 'PC · Office-Setup (Ø)',
  fallback_gaming: 'PC · Gaming-Setup (Ø)',
  fallback_highend: 'PC · High-End-Setup (Ø)',
  custom: 'PC · Custom-Build',
  none: 'PC',
};

/**
 * Sammelt alle Verbraucher-Items und sortiert nach kWh
 */
export function getTopConsumers({
  selectedDevices,
  fallbackCategories,
  pcKwh,
  pcMode,
  baselineKwh,
  deviceQuantities = {},
  topN = 5,
}) {
  const items = [];

  // Geräte (konkret gewählt) — multipliziere mit Anzahl
  selectedDevices.forEach((id) => {
    const d = getDeviceById(id);
    if (d) {
      const cat = DEVICE_CATEGORIES[d.category];
      const qty = deviceQuantities[id] || 1;
      const totalKwh = d.kwh * qty;
      items.push({
        id,
        name: qty > 1 ? `${d.brand} ${d.model} × ${qty}` : `${d.brand} ${d.model}`,
        category: cat?.name || d.category,
        emoji: cat?.icon || '📦',
        kwh: totalKwh,
        unitKwh: d.kwh,
        qty,
        type: 'device',
      });
    }
  });

  // Fallback-Kategorien
  fallbackCategories.forEach((catId) => {
    const cat = DEVICE_CATEGORIES[catId];
    if (cat) {
      items.push({
        id: `fb_${catId}`,
        name: `Ø ${cat.name}`,
        category: cat.name,
        emoji: cat.icon,
        kwh: getCategoryAverage(catId),
        type: 'fallback',
      });
    }
  });

  // PC
  if (pcKwh > 0) {
    items.push({
      id: 'pc',
      name: PC_MODE_LABELS[pcMode] || 'PC / Gaming-Rig',
      category: 'PC',
      emoji: '🖥️',
      kwh: pcKwh,
      type: 'pc',
    });
  }

  // Baseline (Grundverbrauch nicht-konfigurierter Last)
  if (baselineKwh > 0) {
    items.push({
      id: 'baseline',
      name: 'Grundverbrauch Haushalt',
      category: 'Baseline',
      emoji: '🏠',
      kwh: baselineKwh,
      type: 'baseline',
    });
  }

  return items.sort((a, b) => b.kwh - a.kwh).slice(0, topN);
}

/**
 * Klimaziel-Check: Pariser 1.5°C-Pfad
 *
 * Aktueller globaler Durchschnitt: ~5t CO2/Person/Jahr
 * Ziel 2050 (Klimaneutralität): ~1.5t/Person/Jahr ALL Sektoren
 * Davon Strom-Anteil zur Klimaneutralität: ~200kg/Person/Jahr
 *
 * Quellen: IPCC, WWF Klima-Score, Myclimate
 */
export function calculateClimateGoal(totalCo2Kg, persons) {
  const targetKgPerPerson = 200;
  const target = targetKgPerPerson * persons;
  const perPerson = totalCo2Kg / persons;
  const ratio = totalCo2Kg / target;
  const pctOfTarget = Math.round(ratio * 100);

  let label, color, msg;
  if (ratio < 0.5) {
    label = 'Vorbildlich';
    color = '#00ff88';
    msg = 'Weit unter Pariser Klimaziel — Champion-Niveau';
  } else if (ratio < 1.0) {
    label = 'Klimaziel erreicht';
    color = '#66ff66';
    msg = 'Innerhalb Pariser 1.5°C-Pfad — top!';
  } else if (ratio < 1.5) {
    label = 'Knapp drüber';
    color = '#ffd700';
    msg = 'Leicht über Klimaziel — noch Spielraum';
  } else if (ratio < 2.5) {
    label = 'Über Ziel';
    color = '#ffaa00';
    msg = 'Deutlich über Pariser Pfad — Optimierung lohnt sich';
  } else {
    label = 'Weit über Ziel';
    color = '#ff0040';
    msg = 'Stark über Klimaziel — grosses Sparpotential';
  }

  return {
    target,
    targetPerPerson: targetKgPerPerson,
    perPerson: Math.round(perPerson),
    ratio,
    pctOfTarget,
    label,
    color,
    msg,
  };
}
