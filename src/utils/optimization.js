import { getCountry } from '../data/countries.js';

/**
 * Optimization Engine
 * Generiert personalisierte Action-Items mit kWh + Geld-Einsparungen.
 * Sortiert nach grösstem Impact.
 */

export function generateOptimizations({
  countryId,
  state,
  totals,
  marketProviders,
  selectedProviderId,
}) {
  const country = getCountry(countryId);
  const items = [];
  const tariffSubUnit = totals.rappen; // aktueller Preis in Rp/Cent
  const yearlySpend = totals.yearlyCostChf;

  // ----------------------------------------------------------------
  // 1. Anbieter-Wechsel (immer prüfen)
  // ----------------------------------------------------------------
  if (marketProviders && marketProviders.length > 1) {
    const cheapest = [...marketProviders].sort((a, b) => a.currentPrice - b.currentPrice)[0];
    const current = marketProviders.find((p) => p.id === selectedProviderId);
    if (cheapest && current && cheapest.id !== current.id) {
      const cheapestCost = (totals.totalKwh * cheapest.currentPrice) / 100;
      const savings = yearlySpend - cheapestCost;
      if (savings > 20) {
        items.push({
          id: 'switch_provider',
          icon: '🔄',
          title: `Wechsel zu ${cheapest.name}`,
          current: `Aktuell: ${current.name} bei ${current.currentPrice.toFixed(2)} ${country.subUnit}/kWh`,
          action: `${cheapest.name} bietet ${cheapest.currentPrice.toFixed(2)} ${country.subUnit}/kWh`,
          kwhSaved: 0,
          moneySaved: savings,
          payback: 0,
          priority: savings > 100 ? 'HOCH' : 'MITTEL',
          color: 'var(--accent-bright)',
        });
      }
    }
  }

  // ----------------------------------------------------------------
  // 2. Wärmepumpe statt Elektroheizung
  // ----------------------------------------------------------------
  if (state.hasElectricHeating) {
    const heatingKwh = state.housing === 'house'
      ? country.additionalBaseline.e_heating_house
      : country.additionalBaseline.e_heating_apartment;
    const saved = heatingKwh * 0.7; // WP spart ~70%
    const moneySaved = (saved * tariffSubUnit) / 100;
    const investment = state.housing === 'house' ? 35000 : 18000;
    items.push({
      id: 'heat_pump',
      icon: '🔥',
      title: 'Elektroheizung → Wärmepumpe',
      current: `Aktuelle E-Heizung: ${heatingKwh.toLocaleString(country.locale)} kWh/J`,
      action: 'Luft-Wärmepumpe ersetzt deine E-Heizung — JAZ ~3.5',
      kwhSaved: Math.round(saved),
      moneySaved,
      payback: investment / moneySaved,
      investment,
      priority: 'HOCH',
      color: '#66ff66',
    });
  }

  // ----------------------------------------------------------------
  // 3. Wärmepumpenboiler statt Elektroboiler
  // ----------------------------------------------------------------
  if (state.hasElectricBoiler) {
    const boilerKwh = country.additionalBaseline.e_boiler_per_person * state.persons;
    const saved = boilerKwh * 0.6;
    const moneySaved = (saved * tariffSubUnit) / 100;
    const investment = 4500;
    items.push({
      id: 'hp_boiler',
      icon: '♨️',
      title: 'Elektroboiler → Wärmepumpenboiler',
      current: `Aktuell: ${boilerKwh.toLocaleString(country.locale)} kWh/J nur für Warmwasser`,
      action: 'WP-Boiler nutzt Raumwärme zur Aufheizung',
      kwhSaved: Math.round(saved),
      moneySaved,
      payback: investment / moneySaved,
      investment,
      priority: 'HOCH',
      color: '#66ff66',
    });
  }

  // ----------------------------------------------------------------
  // 4. PV-Anlage installieren (wenn nicht aktiv)
  // ----------------------------------------------------------------
  if (!state.solar.enabled && state.housing === 'house') {
    const recommendedKwp = Math.min(Math.max(Math.round(totals.totalKwh / 950), 4), 15);
    const production = recommendedKwp * country.solarYieldPerKwp;
    const selfUsed = Math.min(production * 0.65, totals.totalKwh);
    const moneySaved = (selfUsed * tariffSubUnit) / 100 + ((production - selfUsed) * country.feedInTariff) / 100;
    const investment = recommendedKwp * country.costPerKwp + 10 * country.batteryPerKwh;
    const subsidy = recommendedKwp * country.subsidyPerKwp + country.subsidyBase;
    const netInvest = investment - subsidy;
    items.push({
      id: 'install_pv',
      icon: '☀️',
      title: `PV-Anlage ${recommendedKwp} kWp + Batterie`,
      current: 'Aktuell ohne Eigenproduktion',
      action: `Empfohlene Grösse für deinen Verbrauch · ~${(recommendedKwp * country.solarYieldPerKwp).toLocaleString(country.locale)} kWh/J Produktion`,
      kwhSaved: Math.round(selfUsed),
      moneySaved,
      payback: netInvest / moneySaved,
      investment: netInvest,
      priority: 'HOCH',
      color: '#FFD54F',
    });
  }

  // ----------------------------------------------------------------
  // 5. HT/NT aktivieren wenn nicht im Einsatz
  // ----------------------------------------------------------------
  if (!state.tariff.enabled && country.htPremium > 1.0) {
    // Konservative Schätzung: 35% NT-Anteil → ~10% Ersparnis
    const moneySaved = yearlySpend * 0.10;
    if (moneySaved > 30) {
      items.push({
        id: 'enable_htnt',
        icon: '⏰',
        title: 'Niedertarif (NT) beim Anbieter beantragen',
        current: 'Aktuell Einheitstarif',
        action: 'Verlagere Wäsche/Geschirrspüler auf nach 22:00 — automatisch via Timer',
        kwhSaved: 0,
        moneySaved,
        payback: 0,
        priority: 'MITTEL',
        color: 'var(--info)',
      });
    }
  }

  // ----------------------------------------------------------------
  // 6. Standby-Killer
  // ----------------------------------------------------------------
  const standbyKwh = totals.deviceKwh * 0.05;
  if (standbyKwh > 50) {
    const moneySaved = (standbyKwh * tariffSubUnit) / 100;
    items.push({
      id: 'standby',
      icon: '🔌',
      title: 'Standby-Verbrauch eliminieren',
      current: `Geschätzte ~${Math.round(standbyKwh)} kWh durch Geräte im Standby`,
      action: 'Schaltbare Steckerleisten für TV/AV/Konsole + Smart Plugs',
      kwhSaved: Math.round(standbyKwh),
      moneySaved,
      payback: 80 / moneySaved,
      investment: 80,
      priority: 'NIEDRIG',
      color: 'var(--text)',
    });
  }

  // ----------------------------------------------------------------
  // 7. Grünstrom-Aufpreis (nur informativ falls günstiger Anbieter)
  // ----------------------------------------------------------------
  // (skip — meistens 2-5 Rp Aufpreis, keine Einsparung)

  return items.sort((a, b) => b.moneySaved - a.moneySaved);
}
