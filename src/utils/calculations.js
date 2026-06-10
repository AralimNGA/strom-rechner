import { CPUS, GPUS } from '../data/pcComponents.js';
import { getCountry } from '../data/countries.js';
import { getIndustry } from '../data/industries.js';

/**
 * Haushalts-Grundverbrauch (ohne einzelne ausgewählte Geräte) — country-aware
 */
export function calculateHouseholdBaseline({
  countryId,
  persons,
  housing,
  hasElectricBoiler,
  hasElectricHeating,
}) {
  const c = getCountry(countryId);
  const base = c.baseline[persons] ?? c.baseline[4];
  const mult = c.housingMultiplier[housing] ?? 1;
  let total = base * mult;

  if (hasElectricBoiler) {
    total += c.additionalBaseline.e_boiler_per_person * persons;
  }
  if (hasElectricHeating) {
    total +=
      housing === 'house'
        ? c.additionalBaseline.e_heating_house
        : c.additionalBaseline.e_heating_apartment;
  }
  return Math.round(total);
}

/**
 * Personalisierter Erwartungswert: Land × Personen × Wohnform × Branche
 * Inkl. Faktor für typische Geräte-Ausstattung (~1.5×)
 */
export function calculatePersonalizedAverage({ countryId, persons, housing, industryId }) {
  const c = getCountry(countryId);
  const industry = getIndustry(industryId);
  const base = c.baseline[persons] ?? c.baseline[4];
  const mult = c.housingMultiplier[housing] ?? 1;
  return Math.round(base * mult * 1.5 * industry.homeMultiplier);
}

/**
 * Standard-Durchschnitt (ohne Branchenfaktor)
 */
export function calculateAverageBaseline(countryId, persons, housing) {
  const c = getCountry(countryId);
  const base = c.baseline[persons] ?? c.baseline[4];
  const mult = c.housingMultiplier[housing] ?? 1;
  return Math.round(base * mult);
}

/**
 * PC-Jahresverbrauch
 */
export function calculatePC(cpuId, gpuId, pattern) {
  const cpu = CPUS.find((c) => c.id === cpuId) ?? CPUS[0];
  const gpu = GPUS.find((g) => g.id === gpuId) ?? GPUS[0];

  const idle_hours = pattern.idle_hours_day || 4;
  const light_hours = pattern.light_hours_day || 3;
  const heavy_hours = pattern.heavy_hours_day || 1;
  const sleep_hours = 24 - idle_hours - light_hours - heavy_hours;

  const idle_w = cpu.idle + gpu.idle + 40;
  const light_w = idle_w * 1.4;
  const heavy_w = cpu.load + gpu.load + 60;
  const sleep_w = 3;

  const daily_wh =
    idle_w * idle_hours +
    light_w * light_hours +
    heavy_w * heavy_hours +
    sleep_w * sleep_hours;

  return Math.round((daily_wh * 365) / 1000);
}

/**
 * CO2 — country-aware
 */
export function calculateCO2(kwh, countryId) {
  const c = getCountry(countryId);
  return Math.round((kwh * c.co2GramsPerKwh) / 1000); // kg
}

/* Formatters */
export function fmtKwh(n) {
  return Math.round(n).toLocaleString('de-CH', { maximumFractionDigits: 0 });
}
export function fmtChf(n) {
  return n.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function fmtRp(n) {
  return n.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
export function fmtMoney(n, country) {
  const c = typeof country === 'string' ? getCountry(country) : country;
  return n.toLocaleString(c.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
