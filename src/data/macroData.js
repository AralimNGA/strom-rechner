/**
 * Schweizer Makro-Referenzdaten für volkswirtschaftliche Hochrechnungen
 *
 * Datenquellen (für VA-Quellenverzeichnis):
 * - BFS (Bundesamt für Statistik), www.bfs.admin.ch
 * - BFE (Bundesamt für Energie), Schweizerische Elektrizitätsstatistik 2024
 * - Swissgrid AG, Energieübersicht Schweiz
 * - Axpo / BKW Geschäftsberichte
 * - SBB Energieverbrauch (Vergleichszahlen)
 */

export const CH_MACRO = {
  // Haushalte
  totalHouseholds: 3_900_000,
  totalHouseholdsSource: 'BFS Statistik der Privathaushalte 2024 (~3.9 Mio Haushalte)',

  // Bevölkerung
  totalPopulation: 8_800_000,
  totalPopulationSource: 'BFS STATPOP 2024 (~8.8 Mio Einwohner)',

  // Stromverbrauch CH gesamt (TWh = Mrd kWh)
  totalConsumptionTwh: 56.1,
  totalConsumptionSource: 'BFE Schweizerische Elektrizitätsstatistik 2023 (56.1 TWh)',

  // Anteil Haushalte am Gesamtverbrauch
  householdShareOfTotal: 0.31, // ~31%
  householdShareSource: 'BFE Energieverbrauch nach Verwendungszweck 2023',
  householdConsumptionTwh: 17.4, // 56.1 × 0.31

  // Schweizer Energiemix 2023 (in TWh)
  energyMix2023: {
    waterPower: 33.2,    // Wasserkraft
    nuclear: 19.4,       // Kernenergie
    solar: 4.3,          // Photovoltaik (stark wachsend)
    wind: 0.2,           // Windkraft (klein)
    other: 1.8,          // Biomasse, Abfall, Fossil
  },
  energyMixSource: 'BFE Schweizerische Elektrizitätsstatistik 2023',

  // CO2-Intensität CH-Strommix
  co2PerKwhGrams: 22, // sehr tief dank Wasser+Kernkraft
  co2Source: 'Bundesamt für Umwelt (BAFU) 2023, Treibhausgas-Inventar',

  // Vergleichswerte für Anschaulichkeit
  comparisons: {
    gotthardSpeicherTwh: 0.5,
    gotthardLabel: 'Speicherkraftwerk Gotthard (Lago di Lucendro): ~0.5 TWh Jahresproduktion',
    gotthardSource: 'Schätzung Swissgrid + Axpo Geschäftsberichte',

    beznau1JahrTwh: 3.0,
    beznauLabel: 'AKW Beznau Block 1, jährliche Produktion: ~3.0 TWh',
    beznauSource: 'Axpo Geschäftsbericht 2023',

    sbbAnnualTwh: 2.4,
    sbbLabel: 'SBB Bahnstromverbrauch jährlich: ~2.4 TWh',
    sbbSource: 'SBB Geschäftsbericht 2023',

    wallisJahrTwh: 4.5,
    wallisLabel: 'Gesamter Stromverbrauch Kanton Wallis: ~4.5 TWh',
    wallisSource: 'BFE kantonaler Stromverbrauch 2023',
  },

  // EU-Emissionshandel CO2-Preis
  euEtsCo2PriceEur: 75, // typisch 2024-2025
  euEtsSource: 'European Energy Exchange (EEX), durchschnittlicher EU-ETS-Preis 2024',

  // Klimaziele
  parisGoalKgPerPersonTotal: 1500, // 1.5t CO2 pro Person bis 2050
  parisGoalSource: 'IPCC AR6 Synthesis Report 2023, 1.5°C-Pfad',
  parisStromAnteil: 200, // davon Strom-Anteil
  parisStromSource: 'WWF Schweiz Klima-Score Methodik',
};

/**
 * Hochrechnung: Was passiert wenn alle Haushalte X kWh sparen
 *
 * @param {number} kWhSavedPerHousehold - kWh pro Haushalt eingespart
 * @returns Hochrechnung mit Vergleichen
 */
export function projectNationalImpact(kWhSavedPerHousehold) {
  const totalSavedKwh = kWhSavedPerHousehold * CH_MACRO.totalHouseholds;
  const totalSavedTwh = totalSavedKwh / 1_000_000_000;
  const co2SavedTons =
    (totalSavedKwh * CH_MACRO.co2PerKwhGrams) / 1_000_000;
  const monetarySavingsChf = (totalSavedKwh * 29) / 100; // ~29 Rp./kWh

  // Vergleichswerte
  const cmp = CH_MACRO.comparisons;
  const equivalents = [
    {
      label: cmp.gotthardLabel.split(':')[0],
      value: (totalSavedTwh / cmp.gotthardSpeicherTwh).toFixed(1),
      unit: 'x',
      source: cmp.gotthardSource,
    },
    {
      label: cmp.beznauLabel.split(':')[0],
      value: ((totalSavedTwh / cmp.beznau1JahrTwh) * 100).toFixed(1),
      unit: '%',
      source: cmp.beznauSource,
    },
    {
      label: cmp.sbbLabel.split(':')[0],
      value: ((totalSavedTwh / cmp.sbbAnnualTwh) * 100).toFixed(1),
      unit: '%',
      source: cmp.sbbSource,
    },
    {
      label: 'Kanton Wallis Jahresverbrauch',
      value: ((totalSavedTwh / cmp.wallisJahrTwh) * 100).toFixed(1),
      unit: '%',
      source: cmp.wallisSource,
    },
    {
      label: 'CH Gesamtstromverbrauch',
      value: ((totalSavedTwh / CH_MACRO.totalConsumptionTwh) * 100).toFixed(2),
      unit: '%',
      source: CH_MACRO.totalConsumptionSource,
    },
  ];

  return {
    totalSavedKwh,
    totalSavedTwh: totalSavedTwh.toFixed(2),
    co2SavedTons: Math.round(co2SavedTons),
    monetarySavingsChf: Math.round(monetarySavingsChf),
    monetarySavingsBnChf: (monetarySavingsChf / 1_000_000_000).toFixed(2),
    co2MonetaryValueChf: Math.round(co2SavedTons * CH_MACRO.euEtsCo2PriceEur * 0.95), // EUR→CHF
    equivalents,
  };
}

/**
 * Externalitäten-Berechnung: was kostet dein CO2 eigentlich gesellschaftlich?
 */
export function calculateExternalities(co2KgPerYear) {
  const co2TonnenPerYear = co2KgPerYear / 1000;
  const euEtsValue = co2TonnenPerYear * CH_MACRO.euEtsCo2PriceEur * 0.95; // EUR→CHF
  const swedishStyleTax = co2TonnenPerYear * 120 * 0.95; // schwedische CO2-Steuer ~120 EUR/t
  const socialCostHigh = co2TonnenPerYear * 200; // wissenschaftlich geschätzte Sozialkosten ~200 USD/t

  return {
    co2Tonnen: co2TonnenPerYear.toFixed(2),
    euEtsValueChf: Math.round(euEtsValue),
    swedishStyleTaxChf: Math.round(swedishStyleTax),
    socialCostHighChf: Math.round(socialCostHigh),
  };
}
