/**
 * Länder-Datenbank
 * Jedes Land hat: Baseline-kWh, Provider, Energie-Mix, CO2-Faktor,
 * Solar-Ertrag, HT/NT-Konventionen, Förderungen, Währung
 *
 * Alle Provider-Preise in lokaler Sub-Einheit (Rappen/Cent) pro kWh
 * Quellen: Eurostat, ElCom, BNetzA, BFE 2025/2026
 */

import { Droplet, Sun, Wind, Flame, Atom, Zap, Trees } from 'lucide-react';

export const COUNTRIES = {
  // ====================================================================
  // SCHWEIZ
  // ====================================================================
  ch: {
    id: 'ch',
    name: 'Schweiz',
    flag: '🇨🇭',
    locale: 'de-CH',
    currency: 'CHF',
    currencySymbol: 'CHF',
    subUnit: 'Rp',           // Rappen (1/100 CHF)
    subUnitName: 'Rappen',
    baseline: { 1: 1600, 2: 2700, 3: 3500, 4: 4300, 5: 5100, 6: 5800, 7: 6500, 8: 7200 },
    housingMultiplier: { apartment: 1.0, house: 1.25 },
    additionalBaseline: {
      e_boiler_per_person: 800,
      e_heating_apartment: 2500,
      e_heating_house: 4500,
    },
    avgPrice: 30.0,
    co2GramsPerKwh: 100,
    solarYieldPerKwp: 950,
    feedInTariff: 9.5,
    costPerKwp: 1800,
    batteryPerKwh: 900,
    subsidyPerKwp: 350,
    subsidyBase: 1400,
    htPremium: 1.05,
    ntDiscount: 0.75,
    typicalNtShare: 35,
    providers: [
      { id: 'bkw',  name: 'BKW',        fullName: 'BKW Energie AG',                          base: 30.4, volatility: 0.8, region: 'Bern / Mittelland' },
      { id: 'axpo', name: 'Axpo / CKW', fullName: 'Axpo / Centralschweizerische Kraftwerke', base: 32.1, volatility: 1.2, region: 'Zentralschweiz / Ostschweiz' },
      { id: 'ewz',  name: 'EWZ',        fullName: 'Elektrizitätswerk Zürich',                base: 27.6, volatility: 0.6, region: 'Zürich' },
    ],
    energySources: [
      { id: 'hydro',   name: 'Wasserkraft',     iconName: 'Droplet', base: 6.5,  volatility: 1.2, share: 60,  color: '#4FC3F7', note: 'Lauf+Speicherwasser' },
      { id: 'nuclear', name: 'Kernkraft',       iconName: 'Atom',    base: 5.8,  volatility: 0.4, share: 29,  color: '#FF8A65', note: 'Beznau, Gösgen, Leibstadt' },
      { id: 'solar',   name: 'Solar (PV)',      iconName: 'Sun',     base: 7.2,  volatility: 3.5, share: 7,   color: '#FFD54F', note: 'Stark wetterabhängig' },
      { id: 'wind',    name: 'Wind',            iconName: 'Wind',    base: 8.8,  volatility: 2.8, share: 0.2, color: '#81C784', note: 'Mt. Crosin / Mt. Soleil' },
      { id: 'gas',     name: 'Gas / Thermisch', iconName: 'Flame',   base: 18.5, volatility: 4.0, share: 3,   color: '#FF5252', note: 'Import + KVA' },
    ],
  },

  // ====================================================================
  // DEUTSCHLAND
  // ====================================================================
  de: {
    id: 'de',
    name: 'Deutschland',
    flag: '🇩🇪',
    locale: 'de-DE',
    currency: 'EUR',
    currencySymbol: '€',
    subUnit: 'ct',
    subUnitName: 'Cent',
    baseline: { 1: 1500, 2: 2500, 3: 3500, 4: 4250, 5: 5000, 6: 5500, 7: 6000, 8: 6500 },
    housingMultiplier: { apartment: 1.0, house: 1.30 },
    additionalBaseline: {
      e_boiler_per_person: 850,
      e_heating_apartment: 3000,
      e_heating_house: 5500,
    },
    avgPrice: 36.5,
    co2GramsPerKwh: 380,         // höher wegen Kohleanteil
    solarYieldPerKwp: 1000,
    feedInTariff: 8.2,           // EEG-Vergütung 2026
    costPerKwp: 1600,
    batteryPerKwh: 850,
    subsidyPerKwp: 0,            // KfW-Kredite, keine direkte Einmalzahlung
    subsidyBase: 0,
    htPremium: 1.0,
    ntDiscount: 1.0,
    typicalNtShare: 0,
    providers: [
      { id: 'eon',         name: 'E.ON',         fullName: 'E.ON Energie Deutschland',  base: 36.5, volatility: 1.2, region: 'Bundesweit' },
      { id: 'enbw',        name: 'EnBW',         fullName: 'EnBW Energie Baden-Württemberg', base: 34.2, volatility: 1.5, region: 'BaWü / Bundesweit' },
      { id: 'vattenfall',  name: 'Vattenfall',   fullName: 'Vattenfall GmbH',           base: 37.1, volatility: 1.3, region: 'Berlin / Hamburg' },
    ],
    energySources: [
      { id: 'wind_on',  name: 'Wind onshore',   iconName: 'Wind',    base: 9.2,  volatility: 3.0, share: 27, color: '#81C784', note: 'NRW, Niedersachsen' },
      { id: 'wind_off', name: 'Wind offshore',  iconName: 'Wind',    base: 10.5, volatility: 2.0, share: 6,  color: '#4DB6AC', note: 'Nord- und Ostsee' },
      { id: 'solar',    name: 'Solar (PV)',     iconName: 'Sun',     base: 7.8,  volatility: 4.0, share: 14, color: '#FFD54F', note: 'EEG-gefördert' },
      { id: 'gas',      name: 'Gas',            iconName: 'Flame',   base: 22.5, volatility: 4.5, share: 14, color: '#FF5252', note: 'Hochpreissegment' },
      { id: 'coal',     name: 'Kohle',          iconName: 'Flame',   base: 14.0, volatility: 2.5, share: 21, color: '#5D4037', note: 'Auslaufmodell bis 2038' },
      { id: 'biomass',  name: 'Biomasse',       iconName: 'Trees',   base: 11.0, volatility: 1.5, share: 9,  color: '#689F38', note: 'Bioenergie' },
      { id: 'hydro',    name: 'Wasserkraft',    iconName: 'Droplet', base: 6.5,  volatility: 1.2, share: 4,  color: '#4FC3F7', note: 'Begrenzte Kapazität' },
      { id: 'nuclear',  name: 'Kernkraft',      iconName: 'Atom',    base: 0,    volatility: 0,   share: 0,  color: '#FF8A65', note: 'Ausgestiegen 2023' },
    ],
  },

  // ====================================================================
  // ÖSTERREICH
  // ====================================================================
  at: {
    id: 'at',
    name: 'Österreich',
    flag: '🇦🇹',
    locale: 'de-AT',
    currency: 'EUR',
    currencySymbol: '€',
    subUnit: 'ct',
    subUnitName: 'Cent',
    baseline: { 1: 1700, 2: 2800, 3: 3500, 4: 4200, 5: 4800, 6: 5400, 7: 6000, 8: 6600 },
    housingMultiplier: { apartment: 1.0, house: 1.28 },
    additionalBaseline: {
      e_boiler_per_person: 800,
      e_heating_apartment: 2800,
      e_heating_house: 5000,
    },
    avgPrice: 28.5,
    co2GramsPerKwh: 125,       // Hoher Wasserkraft-Anteil
    solarYieldPerKwp: 1050,
    feedInTariff: 8.0,
    costPerKwp: 1650,
    batteryPerKwh: 870,
    subsidyPerKwp: 250,
    subsidyBase: 0,
    htPremium: 1.04,
    ntDiscount: 0.78,
    typicalNtShare: 30,
    providers: [
      { id: 'verbund',     name: 'VERBUND',     fullName: 'VERBUND AG',                base: 28.4, volatility: 1.0, region: 'Bundesweit' },
      { id: 'wien',        name: 'Wien Energie', fullName: 'Wien Energie GmbH',        base: 30.1, volatility: 1.2, region: 'Wien / NÖ' },
      { id: 'evn',         name: 'EVN',         fullName: 'EVN AG',                    base: 27.8, volatility: 0.9, region: 'Niederösterreich' },
    ],
    energySources: [
      { id: 'hydro',   name: 'Wasserkraft',     iconName: 'Droplet', base: 6.0,  volatility: 1.2, share: 60,  color: '#4FC3F7', note: 'Donaukraftwerke' },
      { id: 'wind',    name: 'Wind',            iconName: 'Wind',    base: 9.0,  volatility: 2.8, share: 11,  color: '#81C784', note: 'Burgenland' },
      { id: 'solar',   name: 'Solar (PV)',      iconName: 'Sun',     base: 7.5,  volatility: 3.5, share: 6,   color: '#FFD54F', note: 'Schnell wachsend' },
      { id: 'biomass', name: 'Biomasse',        iconName: 'Trees',   base: 10.5, volatility: 1.5, share: 9,   color: '#689F38', note: 'KWK-Anlagen' },
      { id: 'gas',     name: 'Gas',             iconName: 'Flame',   base: 22.0, volatility: 4.0, share: 14,  color: '#FF5252', note: 'Spitzenlast' },
    ],
  },

  // ====================================================================
  // FRANKREICH
  // ====================================================================
  fr: {
    id: 'fr',
    name: 'Frankreich',
    flag: '🇫🇷',
    locale: 'fr-FR',
    currency: 'EUR',
    currencySymbol: '€',
    subUnit: 'ct',
    subUnitName: 'Centimes',
    baseline: { 1: 1800, 2: 3000, 3: 3800, 4: 4600, 5: 5400, 6: 6200, 7: 7000, 8: 7800 },
    housingMultiplier: { apartment: 1.0, house: 1.32 },
    additionalBaseline: {
      e_boiler_per_person: 750,
      e_heating_apartment: 3500,        // viele e-Heizungen
      e_heating_house: 6000,
    },
    avgPrice: 25.2,
    co2GramsPerKwh: 60,                 // sehr niedrig dank Atomkraft
    solarYieldPerKwp: 1150,
    feedInTariff: 10.0,
    costPerKwp: 1700,
    batteryPerKwh: 880,
    subsidyPerKwp: 300,
    subsidyBase: 0,
    htPremium: 1.08,
    ntDiscount: 0.70,
    typicalNtShare: 40,                 // Heures Creuses sehr verbreitet
    providers: [
      { id: 'edf',         name: 'EDF',         fullName: 'Électricité de France',     base: 25.2, volatility: 0.7, region: 'Bundesweit' },
      { id: 'engie',       name: 'Engie',       fullName: 'Engie SA',                  base: 26.8, volatility: 1.0, region: 'Bundesweit' },
      { id: 'totalenergies', name: 'TotalEnergies', fullName: 'TotalEnergies Électricité', base: 25.9, volatility: 0.9, region: 'Bundesweit' },
    ],
    energySources: [
      { id: 'nuclear', name: 'Nucléaire',       iconName: 'Atom',    base: 5.5,  volatility: 0.3, share: 65,  color: '#FF8A65', note: 'EDF-Reaktorpark' },
      { id: 'hydro',   name: 'Hydraulique',     iconName: 'Droplet', base: 6.5,  volatility: 1.2, share: 12,  color: '#4FC3F7', note: 'Alpen + Pyrenäen' },
      { id: 'wind',    name: 'Éolien',          iconName: 'Wind',    base: 9.0,  volatility: 2.8, share: 9,   color: '#81C784', note: 'Wachsend' },
      { id: 'solar',   name: 'Solaire',         iconName: 'Sun',     base: 7.5,  volatility: 3.5, share: 4,   color: '#FFD54F', note: 'Süden / Korsika' },
      { id: 'gas',     name: 'Gaz',             iconName: 'Flame',   base: 21.0, volatility: 4.0, share: 7,   color: '#FF5252', note: 'Spitzenlast' },
    ],
  },

  // ====================================================================
  // ITALIEN
  // ====================================================================
  it: {
    id: 'it',
    name: 'Italia',
    flag: '🇮🇹',
    locale: 'it-IT',
    currency: 'EUR',
    currencySymbol: '€',
    subUnit: 'cent',
    subUnitName: 'Centesimi',
    baseline: { 1: 1300, 2: 2200, 3: 2900, 4: 3600, 5: 4300, 6: 5000, 7: 5700, 8: 6400 },
    housingMultiplier: { apartment: 1.0, house: 1.30 },
    additionalBaseline: {
      e_boiler_per_person: 700,
      e_heating_apartment: 2200,
      e_heating_house: 4200,
    },
    avgPrice: 31.0,
    co2GramsPerKwh: 245,
    solarYieldPerKwp: 1300,                // sonnig!
    feedInTariff: 7.5,
    costPerKwp: 1500,
    batteryPerKwh: 800,
    subsidyPerKwp: 0,
    subsidyBase: 0,
    htPremium: 1.10,
    ntDiscount: 0.80,
    typicalNtShare: 35,
    providers: [
      { id: 'enel',     name: 'Enel',     fullName: 'Enel Energia SpA',          base: 31.0, volatility: 1.5, region: 'Bundesweit' },
      { id: 'eni',      name: 'Eni Plenitude', fullName: 'Eni Plenitude SpA',    base: 32.5, volatility: 1.8, region: 'Bundesweit' },
      { id: 'a2a',      name: 'A2A',      fullName: 'A2A Energia',               base: 30.2, volatility: 1.4, region: 'Lombardei' },
    ],
    energySources: [
      { id: 'gas',     name: 'Gas',             iconName: 'Flame',   base: 23.5, volatility: 4.5, share: 45,  color: '#FF5252', note: 'Hauptanteil' },
      { id: 'solar',   name: 'Solare',          iconName: 'Sun',     base: 6.5,  volatility: 3.0, share: 12,  color: '#FFD54F', note: 'Sehr ergiebig' },
      { id: 'hydro',   name: 'Idroelettrico',   iconName: 'Droplet', base: 7.0,  volatility: 1.5, share: 16,  color: '#4FC3F7', note: 'Alpen' },
      { id: 'wind',    name: 'Eolico',          iconName: 'Wind',    base: 9.5,  volatility: 2.5, share: 8,   color: '#81C784', note: 'Süditalien' },
      { id: 'geo',     name: 'Geotermico',      iconName: 'Zap',     base: 8.0,  volatility: 0.5, share: 2,   color: '#FF7043', note: 'Toskana' },
      { id: 'biomass', name: 'Biomassa',        iconName: 'Trees',   base: 11.0, volatility: 1.5, share: 6,   color: '#689F38', note: 'Bioenergie' },
    ],
  },

  // ====================================================================
  // SPANIEN
  // ====================================================================
  es: {
    id: 'es',
    name: 'España',
    flag: '🇪🇸',
    locale: 'es-ES',
    currency: 'EUR',
    currencySymbol: '€',
    subUnit: 'ct',
    subUnitName: 'Céntimos',
    baseline: { 1: 1400, 2: 2400, 3: 3100, 4: 3800, 5: 4500, 6: 5200, 7: 5900, 8: 6500 },
    housingMultiplier: { apartment: 1.0, house: 1.35 },     // Klima im Süden
    additionalBaseline: {
      e_boiler_per_person: 700,
      e_heating_apartment: 1800,
      e_heating_house: 3500,
    },
    avgPrice: 22.5,
    co2GramsPerKwh: 180,
    solarYieldPerKwp: 1500,                     // bestes EU-Land für PV
    feedInTariff: 7.0,
    costPerKwp: 1400,
    batteryPerKwh: 780,
    subsidyPerKwp: 200,
    subsidyBase: 0,
    htPremium: 1.15,
    ntDiscount: 0.65,
    typicalNtShare: 35,
    providers: [
      { id: 'iberdrola',  name: 'Iberdrola',  fullName: 'Iberdrola SA',          base: 22.5, volatility: 1.5, region: 'Bundesweit' },
      { id: 'endesa',     name: 'Endesa',     fullName: 'Endesa SA (Enel)',      base: 23.8, volatility: 1.8, region: 'Bundesweit' },
      { id: 'naturgy',    name: 'Naturgy',    fullName: 'Naturgy Energy Group',  base: 24.0, volatility: 1.6, region: 'Katalonien / Madrid' },
    ],
    energySources: [
      { id: 'wind',    name: 'Eólica',          iconName: 'Wind',    base: 8.5,  volatility: 2.8, share: 25,  color: '#81C784', note: 'Galicien / Aragón' },
      { id: 'solar',   name: 'Solar',           iconName: 'Sun',     base: 6.0,  volatility: 2.5, share: 22,  color: '#FFD54F', note: 'Andalusien / Extremadura' },
      { id: 'nuclear', name: 'Nuclear',         iconName: 'Atom',    base: 5.5,  volatility: 0.3, share: 20,  color: '#FF8A65', note: 'Auslaufphase ab 2027' },
      { id: 'gas',     name: 'Gas',             iconName: 'Flame',   base: 23.0, volatility: 4.0, share: 16,  color: '#FF5252', note: 'Mittellast' },
      { id: 'hydro',   name: 'Hidráulica',      iconName: 'Droplet', base: 7.0,  volatility: 2.0, share: 11,  color: '#4FC3F7', note: 'Pyrenäen' },
    ],
  },

  // ====================================================================
  // NIEDERLANDE
  // ====================================================================
  nl: {
    id: 'nl',
    name: 'Nederland',
    flag: '🇳🇱',
    locale: 'nl-NL',
    currency: 'EUR',
    currencySymbol: '€',
    subUnit: 'ct',
    subUnitName: 'Cent',
    baseline: { 1: 1600, 2: 2700, 3: 3400, 4: 4100, 5: 4800, 6: 5500, 7: 6200, 8: 6800 },
    housingMultiplier: { apartment: 1.0, house: 1.25 },
    additionalBaseline: {
      e_boiler_per_person: 800,
      e_heating_apartment: 2500,
      e_heating_house: 4500,
    },
    avgPrice: 32.0,
    co2GramsPerKwh: 290,
    solarYieldPerKwp: 950,
    feedInTariff: 9.0,
    costPerKwp: 1500,
    batteryPerKwh: 820,
    subsidyPerKwp: 0,
    subsidyBase: 0,
    htPremium: 1.0,
    ntDiscount: 1.0,
    typicalNtShare: 0,
    providers: [
      { id: 'vattenfall_nl', name: 'Vattenfall', fullName: 'Vattenfall N.V.',   base: 32.0, volatility: 1.6, region: 'Bundesweit' },
      { id: 'essent',        name: 'Essent',     fullName: 'Essent N.V.',       base: 31.5, volatility: 1.5, region: 'Bundesweit' },
      { id: 'eneco',         name: 'Eneco',      fullName: 'Eneco Group',       base: 32.8, volatility: 1.4, region: 'Rotterdam / Bundesweit' },
    ],
    energySources: [
      { id: 'gas',     name: 'Aardgas',         iconName: 'Flame',   base: 24.5, volatility: 5.0, share: 38,  color: '#FF5252', note: 'Hauptanteil' },
      { id: 'wind',    name: 'Wind',            iconName: 'Wind',    base: 9.5,  volatility: 2.8, share: 26,  color: '#81C784', note: 'Nordsee + Land' },
      { id: 'solar',   name: 'Zonne',           iconName: 'Sun',     base: 8.0,  volatility: 4.0, share: 17,  color: '#FFD54F', note: 'Höchste pro-Kopf-Dichte EU' },
      { id: 'biomass', name: 'Biomassa',        iconName: 'Trees',   base: 11.5, volatility: 1.5, share: 8,   color: '#689F38', note: 'KWK + Biomasse' },
      { id: 'coal',    name: 'Kohle',           iconName: 'Flame',   base: 14.5, volatility: 2.5, share: 6,   color: '#5D4037', note: 'Auslaufend' },
      { id: 'nuclear', name: 'Kernenergie',     iconName: 'Atom',    base: 5.8,  volatility: 0.3, share: 3,   color: '#FF8A65', note: 'Borssele' },
    ],
  },
};

// Icon Map (für JSON-Serialisierung statt Komponenten direkt im Datenobjekt)
export const ICON_MAP = {
  Droplet, Sun, Wind, Flame, Atom, Zap, Trees,
};

// Helper
export function getCountry(id) {
  return COUNTRIES[id] || COUNTRIES.ch;
}

export function getCountryList() {
  return Object.values(COUNTRIES);
}

export function fmtCurrency(n, country) {
  const c = typeof country === 'string' ? getCountry(country) : country;
  return n.toLocaleString(c.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function fmtPriceUnit(n, country) {
  const c = typeof country === 'string' ? getCountry(country) : country;
  return `${n.toFixed(2)} ${c.subUnit}/kWh`;
}

export function fmtMoney(n, country) {
  const c = typeof country === 'string' ? getCountry(country) : country;
  return `${fmtCurrency(n, c)} ${c.currencySymbol}`;
}
