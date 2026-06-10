/**
 * PDF-Bericht-Export
 * Erstellt einen umfassenden Audit-Report aus dem aktuellen State + Calc.
 */
import { jsPDF } from 'jspdf';
import { getDeviceById, DEVICE_CATEGORIES } from '../data/devices.js';
import { getCountry } from '../data/countries.js';
import { INDUSTRIES } from '../data/industries.js';
import { getPriceStats, PRICE_EVENTS } from '../data/priceHistory.js';
import { CH_MACRO, projectNationalImpact, calculateExternalities } from '../data/macroData.js';

const COLORS = {
  primary: [0, 220, 130],   // accent
  dark: [20, 20, 24],
  text: [30, 30, 35],
  dim: [110, 110, 120],
  border: [200, 200, 210],
  red: [220, 50, 50],
  green: [40, 180, 90],
  amber: [240, 175, 0],
  bgGray: [245, 246, 248],
};

function formatCurrency(amount, country) {
  return new Intl.NumberFormat(country?.locale || 'de-CH', {
    style: 'currency',
    currency: country?.currency || 'CHF',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatKwh(kwh) {
  return new Intl.NumberFormat('de-CH', {
    maximumFractionDigits: 0,
  }).format(Math.round(kwh)) + ' kWh';
}

export function exportAsPdf({ state, calc, topConsumers, optimizations, climateGoal, marketData, selectedProvider }) {
  const country = getCountry(state.countryId);
  const industry = INDUSTRIES[state.industryId];
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = 210;
  const margin = 15;
  let y = margin;

  // ===== HEADER =====
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, pageW, 32, 'F');

  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, 4, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('STROM.EU', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Strom-Audit-Bericht v6.0', margin, 21);

  doc.setFontSize(8);
  doc.setTextColor(180, 180, 200);
  const today = new Date().toLocaleDateString('de-CH', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(today, margin, 27);

  // Score-Badge rechts
  const score = calc.efficiency.score;
  const grade = calc.efficiency.grade;
  const badgeColor = score >= 80 ? COLORS.green : score >= 60 ? COLORS.amber : COLORS.red;
  doc.setFillColor(...badgeColor);
  doc.roundedRect(pageW - margin - 35, 8, 30, 18, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('EFFIZIENZ', pageW - margin - 30, 13);
  doc.setFontSize(16);
  doc.text(`${score}`, pageW - margin - 30, 21);
  doc.setFontSize(9);
  doc.text(`Note ${grade}`, pageW - margin - 16, 21);

  y = 42;

  // ===== PROFIL =====
  doc.setTextColor(...COLORS.dark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('01 — PROFIL', margin, y);

  doc.setDrawColor(...COLORS.primary);
  doc.setLineWidth(0.4);
  doc.line(margin, y + 2, pageW - margin, y + 2);
  y += 8;

  const profileRows = [
    ['Land:', `${country.flag} ${country.name}`],
    ['Branche:', industry?.name || '—'],
    ['Personen im Haushalt:', `${state.persons}`],
    ['Wohnsituation:', state.housing === 'apartment' ? 'Wohnung' : state.housing === 'house' ? 'Einfamilienhaus' : 'Studio'],
    ['Elektroboiler:', state.hasElectricBoiler ? 'Ja' : 'Nein'],
    ['Elektroheizung:', state.hasElectricHeating ? 'Ja' : 'Nein'],
    ['Solaranlage:', state.solar.enabled ? `${state.solar.kwp} kWp${state.solar.hasBattery ? ` + ${state.solar.batteryKwh} kWh Akku` : ''}` : 'Keine'],
    ['HT/NT-Tarif:', state.tariff.enabled ? `Ja (${state.tariff.ntShare}% NT)` : 'Nein'],
  ];

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  profileRows.forEach(([label, value]) => {
    doc.setTextColor(...COLORS.dim);
    doc.text(label, margin, y);
    doc.setTextColor(...COLORS.text);
    doc.text(String(value), margin + 50, y);
    y += 5;
  });

  y += 5;

  // ===== TOTALS =====
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.dark);
  doc.text('02 — VERBRAUCH & KOSTEN', margin, y);
  doc.setDrawColor(...COLORS.primary);
  doc.line(margin, y + 2, pageW - margin, y + 2);
  y += 8;

  // 4 metrics in a 2×2 grid
  const cellW = (pageW - 2 * margin - 4) / 2;
  const cellH = 18;

  const drawMetric = (x, yOff, label, value, sub, accent) => {
    doc.setFillColor(...COLORS.bgGray);
    doc.rect(x, yOff, cellW, cellH, 'F');
    doc.setDrawColor(...(accent || COLORS.primary));
    doc.setLineWidth(0.6);
    doc.line(x, yOff, x, yOff + cellH);
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.dim);
    doc.setFont('helvetica', 'bold');
    doc.text(label, x + 3, yOff + 5);
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text(value, x + 3, yOff + 11);
    if (sub) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.dim);
      doc.text(sub, x + 3, yOff + 15.5);
    }
  };

  drawMetric(margin, y, 'JAHRESVERBRAUCH', formatKwh(calc.totalKwh), `Tarif: ${calc.rappen.toFixed(1)} ${country.subUnit}/kWh`);
  drawMetric(margin + cellW + 4, y, 'JAHRESKOSTEN', formatCurrency(calc.yearlyCostChf, country), `${formatCurrency(calc.yearlyCostChf / 12, country)}/Monat`, COLORS.amber);
  y += cellH + 4;
  drawMetric(margin, y, 'CO2-EMISSIONEN', `${calc.co2Kg.toFixed(0)} kg`, `${(calc.co2Kg / state.persons).toFixed(0)} kg/Person`, [200, 100, 50]);
  drawMetric(margin + cellW + 4, y, 'ABWEICHUNG vom Erwartungswert',
    `${calc.efficiency.deviationPct > 0 ? '+' : ''}${calc.efficiency.deviationPct.toFixed(0)}%`,
    `Erwartet: ${formatKwh(calc.personalizedAvg)}`,
    calc.efficiency.deviationPct < 0 ? COLORS.green : COLORS.red);

  y += cellH + 8;

  // ===== KLIMAZIEL =====
  if (climateGoal) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text('03 — KLIMAZIEL (Pariser 1.5°C-Pfad)', margin, y);
    doc.setDrawColor(...COLORS.primary);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.dim);
    doc.text('Aktueller Wert:', margin, y);
    doc.setTextColor(...COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${climateGoal.perPerson} kg CO2/Person`, margin + 35, y);
    y += 5;

    doc.setTextColor(...COLORS.dim);
    doc.setFont('helvetica', 'normal');
    doc.text('Pariser Ziel:', margin, y);
    doc.setTextColor(...COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${climateGoal.targetPerPerson} kg CO2/Person`, margin + 35, y);
    y += 5;

    doc.setTextColor(...COLORS.dim);
    doc.setFont('helvetica', 'normal');
    doc.text('Status:', margin, y);
    const climateColor = climateGoal.ratio < 1 ? COLORS.green : climateGoal.ratio < 1.5 ? COLORS.amber : COLORS.red;
    doc.setTextColor(...climateColor);
    doc.setFont('helvetica', 'bold');
    doc.text(`${climateGoal.label} (${climateGoal.pctOfTarget}% des Ziels) — ${climateGoal.msg}`, margin + 35, y);
    y += 7;
  }

  // ===== TOP-5 STROMFRESSER =====
  if (topConsumers && topConsumers.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text('04 — TOP-5 STROMFRESSER', margin, y);
    doc.setDrawColor(...COLORS.primary);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 8;

    const maxKwh = topConsumers[0].kwh;
    topConsumers.forEach((c, i) => {
      const barW = ((pageW - 2 * margin - 50) * c.kwh) / maxKwh;
      doc.setFillColor(...COLORS.primary);
      doc.rect(margin, y - 3, barW, 4, 'F');
      doc.setFontSize(9);
      doc.setTextColor(...COLORS.text);
      doc.setFont('helvetica', 'bold');
      doc.text(`${i + 1}. ${c.name}`, margin, y + 5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.dim);
      doc.text(`${c.category} · ${formatKwh(c.kwh)} (${((c.kwh / calc.totalKwh) * 100).toFixed(0)}%)`, margin, y + 9);
      y += 12;
    });
    y += 3;
  }

  // ===== NEUE SEITE =====
  doc.addPage();
  y = margin;

  // ===== ALLE GERAETE =====
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.dark);
  doc.text('05 — GEWAEHLTE GERAETE', margin, y);
  doc.setDrawColor(...COLORS.primary);
  doc.line(margin, y + 2, pageW - margin, y + 2);
  y += 8;

  doc.setFillColor(...COLORS.bgGray);
  doc.rect(margin, y - 4, pageW - 2 * margin, 6, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.dim);
  doc.text('GERAET', margin + 2, y);
  doc.text('KAT.', margin + 75, y);
  doc.text('ANZ.', margin + 100, y);
  doc.text('kWh/Stk', margin + 115, y);
  doc.text('TOTAL', margin + 140, y);
  doc.text('KOSTEN', margin + 165, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.text);

  state.selectedDevices.forEach((id) => {
    const d = getDeviceById(id);
    if (!d) return;
    if (y > 270) {
      doc.addPage();
      y = margin;
    }
    const cat = DEVICE_CATEGORIES[d.category];
    const qty = state.deviceQuantities?.[id] || 1;
    const totalKwh = d.kwh * qty;
    const cost = (totalKwh * calc.rappen) / 100;
    doc.setFontSize(8);
    const modelText = `${d.brand} ${d.model}`;
    doc.text(modelText.length > 38 ? modelText.substring(0, 35) + '...' : modelText, margin + 2, y);
    doc.text(cat?.name || '—', margin + 75, y);
    if (qty > 1) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLORS.amber);
      doc.text(`× ${qty}`, margin + 100, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLORS.text);
    } else {
      doc.text('1', margin + 100, y);
    }
    doc.text(`${d.kwh}`, margin + 115, y);
    doc.text(`${totalKwh}`, margin + 140, y);
    doc.text(formatCurrency(cost, country), margin + 165, y);
    y += 4;
  });

  // Fallback-Kategorien
  state.fallbackCategories.forEach((catId) => {
    const cat = DEVICE_CATEGORIES[catId];
    if (!cat) return;
    if (y > 270) {
      doc.addPage();
      y = margin;
    }
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.dim);
    doc.text(`Ø ${cat.name} (Fallback)`, margin + 2, y);
    doc.text(cat.name, margin + 75, y);
    doc.text('—', margin + 100, y);
    doc.text(`${cat.avgKwh}`, margin + 140, y);
    y += 4;
  });
  y += 5;

  // PC
  if (calc.pcKwh > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.dark);
    doc.setFontSize(10);
    doc.text(`PC/Workstation: ${formatKwh(calc.pcKwh)}`, margin, y);
    y += 6;
  }

  // Grundverbrauch
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);
  doc.text(`Grundverbrauch: ${formatKwh(calc.baselineKwh)}`, margin, y);
  y += 8;

  // ===== OPTIMIERUNGS-PLAN =====
  if (optimizations && optimizations.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text('06 — OPTIMIERUNGS-PLAN', margin, y);
    doc.setDrawColor(...COLORS.primary);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 8;

    optimizations.slice(0, 6).forEach((opt, i) => {
      if (y > 265) {
        doc.addPage();
        y = margin;
      }
      doc.setFillColor(...COLORS.bgGray);
      doc.rect(margin, y - 4, pageW - 2 * margin, 14, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...COLORS.dark);
      doc.text(`${i + 1}. ${opt.title}`, margin + 2, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.dim);
      const desc = opt.description || '';
      const lines = doc.splitTextToSize(desc, pageW - 2 * margin - 50);
      doc.text(lines.slice(0, 1), margin + 2, y + 4);

      doc.setTextColor(...COLORS.green);
      doc.setFont('helvetica', 'bold');
      const savingTxt = `Spart ~${opt.savingsKwh || 0} kWh / ${formatCurrency(opt.savingsChf || 0, country)}`;
      doc.text(savingTxt, margin + 2, y + 8);
      y += 16;
    });
  }

  // ===== PROVIDER-VERGLEICH =====
  if (marketData && marketData.providers && marketData.providers.length > 1) {
    if (y > 240) {
      doc.addPage();
      y = margin;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text('07 — PROVIDER-VERGLEICH', margin, y);
    doc.setDrawColor(...COLORS.primary);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 8;

    doc.setFillColor(...COLORS.bgGray);
    doc.rect(margin, y - 4, pageW - 2 * margin, 6, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.dim);
    doc.text('PROVIDER', margin + 2, y);
    doc.text('PREIS', margin + 80, y);
    doc.text('JAHRESKOSTEN', margin + 110, y);
    doc.text('DIFF.', margin + 160, y);
    y += 6;

    const sorted = [...marketData.providers].sort((a, b) => a.currentPrice - b.currentPrice);
    const cheapest = sorted[0].currentPrice;

    sorted.slice(0, 6).forEach((p) => {
      const cost = (calc.totalKwh * p.currentPrice) / 100;
      const diff = ((p.currentPrice - cheapest) / cheapest) * 100;
      const isSelected = p.id === selectedProvider;
      doc.setFontSize(8);
      doc.setFont('helvetica', isSelected ? 'bold' : 'normal');
      doc.setTextColor(...(isSelected ? COLORS.dark : COLORS.text));
      doc.text(`${p.name}${isSelected ? ' ←' : ''}`, margin + 2, y);
      doc.text(`${p.currentPrice.toFixed(1)} ${country.subUnit}`, margin + 80, y);
      doc.text(formatCurrency(cost, country), margin + 110, y);
      if (diff < 0.1) {
        doc.setTextColor(...COLORS.green);
        doc.text('GÜNSTIGSTER', margin + 160, y);
      } else {
        doc.setTextColor(...COLORS.dim);
        doc.text(`+${diff.toFixed(1)}%`, margin + 160, y);
      }
      y += 5;
    });
  }

  // ===== NEUE SEITE — Volkswirtschaft & Historie =====
  if (state.countryId === 'ch') {
    doc.addPage();
    y = margin;

    // ===== STROMPREIS-HISTORIE =====
    const stats = getPriceStats();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text('08 — STROMPREIS-HISTORIE 2010—2025', margin, y);
    doc.setDrawColor(...COLORS.primary);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.dim);
    doc.text('Tiefststand:', margin, y);
    doc.setTextColor(...COLORS.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(`${stats.min.rappen} Rp./kWh (${stats.min.year})`, margin + 35, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.dim);
    doc.text('Höchststand:', margin, y);
    doc.setTextColor(...COLORS.red);
    doc.setFont('helvetica', 'bold');
    doc.text(`${stats.max.rappen} Rp./kWh (${stats.max.year})`, margin + 35, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.dim);
    doc.text('Vor Krise (Ø):', margin, y);
    doc.setTextColor(...COLORS.dark);
    doc.text(`${stats.avgPreCrisis} Rp./kWh`, margin + 35, y);
    y += 5;

    doc.setTextColor(...COLORS.dim);
    doc.text('Nach Krise (Ø):', margin, y);
    doc.setTextColor(...COLORS.amber);
    doc.setFont('helvetica', 'bold');
    doc.text(`${stats.avgPostCrisis} Rp./kWh (+${stats.crisisPctChange}%)`, margin + 35, y);
    y += 8;

    // Top-Events
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.dark);
    doc.text('Globale & nationale Ereignisse mit Preiseinfluss:', margin, y);
    y += 6;

    PRICE_EVENTS.filter((e) => e.impact !== 'low').forEach((ev) => {
      if (y > 270) { doc.addPage(); y = margin; }
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(ev.impact === 'high' ? COLORS.red[0] : COLORS.amber[0],
                      ev.impact === 'high' ? COLORS.red[1] : COLORS.amber[1],
                      ev.impact === 'high' ? COLORS.red[2] : COLORS.amber[2]);
      doc.text(`${ev.year} · ${ev.title}`, margin, y);
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...COLORS.text);
      const lines = doc.splitTextToSize(ev.description, pageW - 2 * margin);
      lines.slice(0, 2).forEach((line) => {
        doc.text(line, margin, y);
        y += 3.5;
      });
      doc.setTextColor(...COLORS.dim);
      doc.setFontSize(7);
      doc.text(`Quelle: ${ev.source}`, margin, y);
      y += 5;
    });

    y += 4;

    // ===== VOLKSWIRTSCHAFTLICHER IMPACT =====
    if (y > 230) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text('09 — VOLKSWIRTSCHAFTLICHER IMPACT', margin, y);
    doc.setDrawColor(...COLORS.primary);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.dim);
    const intro = 'Hochrechnung: Wenn alle 3.9 Mio Schweizer Haushalte den Verbrauch um 15% reduzieren würden.';
    doc.text(doc.splitTextToSize(intro, pageW - 2 * margin), margin, y);
    y += 8;

    const projection = projectNationalImpact(calc.totalKwh * 0.15);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.dark);
    doc.text('Gesamteinsparung CH:', margin, y);
    doc.setTextColor(...COLORS.primary);
    doc.text(`${projection.totalSavedTwh} TWh`, margin + 50, y);
    y += 5;

    doc.setTextColor(...COLORS.dark);
    doc.text('CO2-Einsparung:', margin, y);
    doc.setTextColor(...COLORS.green);
    doc.text(`${(projection.co2SavedTons / 1000).toFixed(1)} kt CO2`, margin + 50, y);
    y += 5;

    doc.setTextColor(...COLORS.dark);
    doc.text('Monetärer Wert:', margin, y);
    doc.setTextColor(...COLORS.amber);
    doc.text(`CHF ${projection.monetarySavingsBnChf} Mrd`, margin + 50, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.dark);
    doc.text('Anschauliche Vergleiche:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    projection.equivalents.slice(0, 4).forEach((eq) => {
      doc.setTextColor(...COLORS.text);
      doc.text(`• ${eq.label}: ${eq.value}${eq.unit}`, margin + 2, y);
      y += 4;
    });
    y += 4;

    // Externalitäten
    if (y > 240) { doc.addPage(); y = margin; }
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.dark);
    doc.text('Externalitäten — was kostet dein CO2 gesellschaftlich?', margin, y);
    y += 6;
    const ext = calculateExternalities(calc.co2Kg);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.dim);
    doc.text('Dein CO2-Ausstoss:', margin, y);
    doc.setTextColor(...COLORS.dark);
    doc.text(`${ext.co2Tonnen} t CO2/Jahr`, margin + 50, y);
    y += 5;
    doc.setTextColor(...COLORS.dim);
    doc.text('EU-ETS-Wert:', margin, y);
    doc.setTextColor(...COLORS.text);
    doc.text(`CHF ${ext.euEtsValueChf} (~75 EUR/t)`, margin + 50, y);
    y += 5;
    doc.setTextColor(...COLORS.dim);
    doc.text('CO2-Steuer Schweden:', margin, y);
    doc.setTextColor(...COLORS.amber);
    doc.text(`CHF ${ext.swedishStyleTaxChf} (~120 EUR/t)`, margin + 50, y);
    y += 5;
    doc.setTextColor(...COLORS.dim);
    doc.text('IPCC-Sozialkosten:', margin, y);
    doc.setTextColor(...COLORS.red);
    doc.text(`CHF ${ext.socialCostHighChf} (~200 USD/t)`, margin + 50, y);
    y += 8;

    // ===== QUELLENVERZEICHNIS =====
    if (y > 220) { doc.addPage(); y = margin; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.dark);
    doc.text('10 — QUELLENVERZEICHNIS', margin, y);
    doc.setDrawColor(...COLORS.primary);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 8;

    const sources = [
      'ElCom (Eidg. Elektrizitätskommission). Strompreis-Webseite. www.strompreis.elcom.admin.ch',
      'BFE (Bundesamt für Energie). Schweizerische Elektrizitätsstatistik 2023. www.bfe.admin.ch',
      'BFS (Bundesamt für Statistik). Statistik der Privathaushalte 2024. www.bfs.admin.ch',
      'BAFU (Bundesamt für Umwelt). Treibhausgas-Inventar Schweiz 2023.',
      'Swissgrid AG. Energieübersicht Schweiz. www.swissgrid.ch',
      'Axpo Holding AG. Geschäftsbericht 2023.',
      'BKW Energie AG. Geschäftsbericht 2023.',
      'SBB CFF FFS. Geschäftsbericht 2023, Bahnstromverbrauch.',
      'European Energy Exchange (EEX). EU-ETS Spot-Preise 2024. www.eex.com',
      'IPCC (Intergovernmental Panel on Climate Change). AR6 Synthesis Report 2023.',
      'WWF Schweiz. Klima-Score Methodik. www.wwf.ch',
      'topten.ch — Best of Energy Efficiency. Schweiz. www.topten.ch',
      'Eurostat. Electricity prices for household consumers. ec.europa.eu/eurostat',
      'ENTSO-E (European Network of Transmission System Operators). Transparency Platform.',
      'Bundesrat (2011). Beschluss zum schrittweisen Atomausstieg, 25.05.2011.',
      'Eidgenössische Volksabstimmung 21.05.2017: Energiestrategie 2050.',
    ];

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.text);
    sources.forEach((src, i) => {
      if (y > 280) { doc.addPage(); y = margin; }
      doc.text(`${i + 1}. ${src}`, margin, y, { maxWidth: pageW - 2 * margin });
      y += 5;
    });

    y += 4;
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.dim);
    doc.setFont('helvetica', 'italic');
    doc.text(
      'Hinweis: Werte in der Geräte-Datenbank basieren auf publizierten EU-Energieetiketten der Hersteller, Datenblättern, sowie Vergleichsplattformen wie topten.ch und energy-label.eu.',
      margin, y, { maxWidth: pageW - 2 * margin },
    );
  }

  // ===== FOOTER auf jeder Seite =====
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.dim);
    doc.setFont('helvetica', 'normal');
    doc.text(`STROM.EU v6.0 · Bericht erstellt ${today}`, margin, 290);
    doc.text(`Seite ${i} / ${pageCount}`, pageW - margin - 20, 290);
  }

  // Speichern
  const filename = `strom-audit-${state.countryId}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
