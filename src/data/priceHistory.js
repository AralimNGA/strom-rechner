/**
 * Historische Strompreise Schweiz 2010–2025
 *
 * Datenquellen (für VA-Quellenverzeichnis):
 * - ElCom (Eidgenössische Elektrizitätskommission), Strompreis-Webseite www.strompreis.elcom.admin.ch
 * - BFE (Bundesamt für Energie), Schweizerische Elektrizitätsstatistik
 * - Swissgrid, Marktbericht
 * - Eurostat, Electricity prices for household consumers
 *
 * Werte: Durchschnittlicher Endkundenpreis CH (Rappen/kWh)
 * für einen typischen 2-Personen-Haushalt (~3'500 kWh/Jahr, Tarif H4)
 * inkl. aller Abgaben, Netznutzung, Energie
 */

export const PRICE_HISTORY_CH = [
  { year: 2010, rappen: 18.5, source: 'ElCom Tarifübersicht 2010' },
  { year: 2011, rappen: 18.8, source: 'ElCom Tarifübersicht 2011' },
  { year: 2012, rappen: 19.4, source: 'ElCom Tarifübersicht 2012' },
  { year: 2013, rappen: 19.8, source: 'ElCom Tarifübersicht 2013' },
  { year: 2014, rappen: 20.4, source: 'ElCom Tarifübersicht 2014' },
  { year: 2015, rappen: 20.8, source: 'ElCom Tarifübersicht 2015' },
  { year: 2016, rappen: 20.5, source: 'ElCom Tarifübersicht 2016' },
  { year: 2017, rappen: 20.2, source: 'ElCom Tarifübersicht 2017' },
  { year: 2018, rappen: 20.4, source: 'ElCom Tarifübersicht 2018' },
  { year: 2019, rappen: 21.0, source: 'ElCom Tarifübersicht 2019' },
  { year: 2020, rappen: 21.2, source: 'ElCom Tarifübersicht 2020' },
  { year: 2021, rappen: 21.0, source: 'ElCom Tarifübersicht 2021' },
  { year: 2022, rappen: 21.3, source: 'ElCom Tarifübersicht 2022' },
  { year: 2023, rappen: 27.2, source: 'ElCom Tarifübersicht 2023' },
  { year: 2024, rappen: 32.1, source: 'ElCom Tarifübersicht 2024 (Spitzenwert)' },
  { year: 2025, rappen: 29.0, source: 'ElCom Tarifübersicht 2025 (leichter Rückgang)' },
];

/**
 * Globale & nationale Ereignisse mit Einfluss auf den CH-Strompreis
 * Belegt für die VA — jeweils mit Quelle
 */
export const PRICE_EVENTS = [
  {
    year: 2011,
    title: 'Fukushima-Reaktorkatastrophe',
    short: 'Fukushima',
    impact: 'medium',
    type: 'global',
    description:
      'Tsunami beschädigt das japanische AKW Fukushima Daiichi. Die Schweiz beschliesst daraufhin den schrittweisen Atomausstieg — Beginn der Energiestrategie-Diskussion.',
    source: 'Bundesrat-Entscheid vom 25.05.2011 zum Atomausstieg',
  },
  {
    year: 2017,
    title: 'Energiestrategie 2050 angenommen',
    short: 'Energiestrategie 2050',
    impact: 'medium',
    type: 'national',
    description:
      'Volk nimmt die Energiestrategie 2050 mit 58.2% Ja an. Bestehende AKW dürfen weiterlaufen, aber keine neuen mehr gebaut werden. Förderung erneuerbarer Energien.',
    source: 'Eidgenössische Volksabstimmung 21.05.2017, BFS',
  },
  {
    year: 2020,
    title: 'COVID-19-Pandemie',
    short: 'COVID-19',
    impact: 'low',
    type: 'global',
    description:
      'Lockdowns reduzieren Industrie-Stromverbrauch. Privater Verbrauch steigt durch Homeoffice. Strompreise zeitweise volatil, langfristig kaum Effekt.',
    source: 'BFE Elektrizitätsstatistik 2020',
  },
  {
    year: 2022,
    title: 'Russischer Angriff auf die Ukraine',
    short: 'Ukraine-Krieg',
    impact: 'high',
    type: 'global',
    description:
      'Russland greift die Ukraine an (24.02.2022). Europäische Gaspreise explodieren, da Russland-Lieferungen wegfallen. Gas-Verstromung treibt Strompreise auf Rekordhöhe. CH ist über das europäische Stromnetz betroffen.',
    source: 'BFE Energiekrise-Bericht 2022, ENTSO-E Marktdaten',
  },
  {
    year: 2023,
    title: 'Strompreis-Schock CH',
    short: 'Preis-Schock',
    impact: 'high',
    type: 'national',
    description:
      'Folgejahr der Energiekrise: Endkundenpreise steigen schweizweit um durchschnittlich +27%. Bevölkerung reduziert Verbrauch (-5%). Bundesrat aktiviert Eskalations-Plan (Sparappelle, Bewirtschaftung).',
    source: 'ElCom Medienmitteilung 06.09.2022, BFE Statistik',
  },
  {
    year: 2024,
    title: 'Strompreis-Höhepunkt',
    short: 'Preis-Spitze 32 Rp.',
    impact: 'high',
    type: 'national',
    description:
      'Durchschnittspreis erreicht mit ~32 Rp./kWh den Höhepunkt. Trockenheit reduziert Wasserkraft-Produktion. Druck auf Energieeffizienz und Solar-Ausbau steigt.',
    source: 'ElCom Tarifübersicht 2024',
  },
  {
    year: 2025,
    title: 'Leichte Entspannung',
    short: 'Entspannung',
    impact: 'low',
    type: 'national',
    description:
      'Gaspreise normalisieren sich, Wasserkraft erholt sich. Preise sinken auf ~29 Rp./kWh, bleiben aber deutlich über Vor-Krise-Niveau.',
    source: 'ElCom Tarifübersicht 2025',
  },
];

/**
 * Statistische Auswertung für die VA
 */
export function getPriceStats() {
  const minEntry = PRICE_HISTORY_CH.reduce((a, b) => (a.rappen < b.rappen ? a : b));
  const maxEntry = PRICE_HISTORY_CH.reduce((a, b) => (a.rappen > b.rappen ? a : b));
  const first = PRICE_HISTORY_CH[0];
  const last = PRICE_HISTORY_CH[PRICE_HISTORY_CH.length - 1];
  const avgPreCrisis =
    PRICE_HISTORY_CH.filter((p) => p.year >= 2010 && p.year <= 2021).reduce(
      (s, p) => s + p.rappen,
      0,
    ) / 12;
  const avgPostCrisis =
    PRICE_HISTORY_CH.filter((p) => p.year >= 2022).reduce((s, p) => s + p.rappen, 0) /
    PRICE_HISTORY_CH.filter((p) => p.year >= 2022).length;

  return {
    min: minEntry,
    max: maxEntry,
    first,
    last,
    avgPreCrisis: avgPreCrisis.toFixed(1),
    avgPostCrisis: avgPostCrisis.toFixed(1),
    crisisPctChange: (((avgPostCrisis - avgPreCrisis) / avgPreCrisis) * 100).toFixed(1),
    overallPctChange: (((last.rappen - first.rappen) / first.rappen) * 100).toFixed(1),
  };
}
