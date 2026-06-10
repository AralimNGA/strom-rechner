import { getCountry } from '../data/countries.js';

export function calculateSolarProduction(kwp, countryId) {
  const c = getCountry(countryId);
  return Math.round(kwp * c.solarYieldPerKwp);
}

export function calculateSelfConsumption(productionKwh, totalHouseholdKwh, hasBattery) {
  const ratio = hasBattery ? 0.65 : 0.35;
  const selfUsed = Math.min(productionKwh * ratio, totalHouseholdKwh);
  const fedIn = Math.max(productionKwh - selfUsed, 0);
  return {
    selfUsed: Math.round(selfUsed),
    fedIn: Math.round(fedIn),
    selfRatio: ratio,
  };
}

export function calculateSolarSavings(selfUsedKwh, fedInKwh, tariffSubUnit, countryId) {
  const c = getCountry(countryId);
  const savedLocal = (selfUsedKwh * tariffSubUnit) / 100;
  const earnedLocal = (fedInKwh * c.feedInTariff) / 100;
  return {
    savedChf: Math.round(savedLocal),
    earnedChf: Math.round(earnedLocal),
    totalYearlyChf: Math.round(savedLocal + earnedLocal),
  };
}

export function calculateInvestment(kwp, batteryKwh, countryId) {
  const c = getCountry(countryId);
  const panels = kwp * c.costPerKwp;
  const battery = batteryKwh * c.batteryPerKwh;
  const gross = panels + battery;
  const subsidy = kwp * c.subsidyPerKwp + c.subsidyBase;
  return {
    gross: Math.round(gross),
    subsidy: Math.round(subsidy),
    net: Math.round(gross - subsidy),
  };
}

export function calculateAmortization(netInvestment, yearlySavings) {
  if (yearlySavings <= 0) return Infinity;
  return +(netInvestment / yearlySavings).toFixed(1);
}

export function analyzePv({
  kwp,
  hasBattery,
  batteryKwh,
  totalHouseholdKwh,
  tariffSubUnit,
  countryId,
}) {
  const production = calculateSolarProduction(kwp, countryId);
  const { selfUsed, fedIn, selfRatio } = calculateSelfConsumption(
    production,
    totalHouseholdKwh,
    hasBattery,
  );
  const savings = calculateSolarSavings(selfUsed, fedIn, tariffSubUnit, countryId);
  const invest = calculateInvestment(kwp, hasBattery ? batteryKwh : 0, countryId);
  const years = calculateAmortization(invest.net, savings.totalYearlyChf);

  return {
    production,
    selfUsed,
    fedIn,
    selfRatio,
    ...savings,
    ...invest,
    amortizationYears: years,
    coverage: totalHouseholdKwh > 0 ? Math.min((selfUsed / totalHouseholdKwh) * 100, 100) : 0,
  };
}
