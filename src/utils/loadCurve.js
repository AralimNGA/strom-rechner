import { getIndustry } from '../data/industries.js';

/**
 * Generiert 24h Last-Profil (kWh pro Stunde)
 * Basis: Branchen-Profil (% pro Stunde)
 */
export function generateLoadCurve(industryId, totalDailyKwh) {
  const industry = getIndustry(industryId);
  const profile = industry.loadProfile;
  const sum = profile.reduce((a, b) => a + b, 0);
  return profile.map((pct) => +((pct / sum) * totalDailyKwh).toFixed(3));
}

/**
 * HT/NT-Klassifikation pro Stunde (CH-Standard)
 * HT: Mo–Sa 06:00–22:00, NT: sonst
 * (vereinfacht: nur Tagesschema, keine Wochentag-Unterscheidung)
 */
export function getTariffClass(hour) {
  return hour >= 6 && hour < 22 ? 'HT' : 'NT';
}

/**
 * Peak-/Tal-Stunden finden
 */
export function getPeaks(curve) {
  const max = Math.max(...curve);
  const min = Math.min(...curve);
  return {
    peakHour: curve.indexOf(max),
    peakKwh: max,
    lowHour: curve.indexOf(min),
    lowKwh: min,
  };
}

/**
 * NT-Anteil aus Lastkurve berechnen
 */
export function calculateNtShareFromCurve(curve) {
  const total = curve.reduce((a, b) => a + b, 0);
  const ntKwh = curve.reduce((acc, kwh, hour) => {
    return getTariffClass(hour) === 'NT' ? acc + kwh : acc;
  }, 0);
  return total > 0 ? Math.round((ntKwh / total) * 100) : 0;
}
