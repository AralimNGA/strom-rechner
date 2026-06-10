/**
 * Branchen / Berufsfelder
 * Jede Branche hat:
 *  - homeMultiplier: Faktor auf den erwarteten Haushalts-Verbrauch
 *  - loadProfile: 24h Verteilung (Anteil pro Stunde, Summe ~100)
 *  - typicalDevices: Hinweis auf typische Setups
 *
 * Quellen: BFE Lastganganalysen, eigene Schätzungen, IEA Residential Profiles
 */

export const INDUSTRIES = {
  // -------- DEFAULT --------
  unspecified: {
    id: 'unspecified',
    name: 'Keine Angabe',
    emoji: '—',
    homeMultiplier: 1.0,
    note: 'Standard-Durchschnitt ohne Anpassung',
    typicalDevices: [],
    loadProfile: [3,2,2,2,2,2,3,5,6,5,4,4,5,4,4,5,5,7,9,8,7,5,4,3],
  },

  // -------- HIGH HOME USE (Tech/Creative) --------
  it_tech: {
    id: 'it_tech',
    name: 'IT / Tech / Software',
    emoji: '💻',
    homeMultiplier: 1.35,
    note: 'Home Office, mehrere Bildschirme, oft NAS/Heimserver, Gaming-PC',
    typicalDevices: ['Multi-Monitor-Setup', 'NAS / Heimserver', 'Gaming/Workstation-PC', 'Mehrere Laptops'],
    loadProfile: [3,2,2,2,2,2,3,4,6,7,8,8,7,8,8,8,7,6,6,6,5,4,3,3],
  },
  creative: {
    id: 'creative',
    name: 'Creative / Design / Video',
    emoji: '🎨',
    homeMultiplier: 1.40,
    note: 'Workstation für 3D/Video-Editing, kalibrierte Monitore',
    typicalDevices: ['High-End Workstation', 'Pro-Monitor (4K/5K)', 'Externe Drives'],
    loadProfile: [3,3,2,2,2,2,3,3,5,7,8,8,7,7,7,7,7,7,6,6,5,4,3,3],
  },

  // -------- MEDIUM-HIGH HOME USE --------
  office: {
    id: 'office',
    name: 'Büro / Wissensarbeit',
    emoji: '🏢',
    homeMultiplier: 1.10,
    note: 'Hybrid-Arbeit, Laptop + 1-2 Monitore',
    typicalDevices: ['Laptop', '1-2 Monitore', 'Drucker'],
    loadProfile: [3,2,2,2,2,3,5,6,4,3,3,3,4,3,3,3,5,7,9,8,7,5,4,3],
  },
  finance: {
    id: 'finance',
    name: 'Finance / Banking / Trading',
    emoji: '📈',
    homeMultiplier: 1.15,
    note: 'Mehrere Bildschirme fürs Trading, oft 24h Marktbeobachtung',
    typicalDevices: ['Multi-Monitor-Setup', 'Workstation', 'NAS für Daten'],
    loadProfile: [3,3,3,2,2,3,5,7,5,4,4,4,5,4,4,4,5,7,8,7,6,5,4,3],
  },
  teacher: {
    id: 'teacher',
    name: 'Bildung / Lehrperson',
    emoji: '👨‍🏫',
    homeMultiplier: 1.05,
    note: 'Vorbereitung am Abend, Drucker, Laptop',
    typicalDevices: ['Laptop', 'Drucker', 'Tablet'],
    loadProfile: [3,2,2,2,2,3,5,6,3,3,3,3,4,3,3,4,5,7,9,8,7,5,4,3],
  },

  // -------- AT HOME ALL DAY --------
  retired: {
    id: 'retired',
    name: 'Pensioniert / Rente',
    emoji: '🌻',
    homeMultiplier: 1.20,
    note: 'Mehr Zeit zuhause, oft TV/Radio den Tag durch',
    typicalDevices: ['TV (lange an)', 'Radio', 'Beleuchtung tagsüber'],
    loadProfile: [4,3,3,3,3,3,4,5,6,5,5,5,6,5,5,5,5,6,6,5,5,4,4,4],
  },
  parental_leave: {
    id: 'parental_leave',
    name: 'Elternzeit / Hausmann/-frau',
    emoji: '👶',
    homeMultiplier: 1.25,
    note: 'Mehr Wäsche, Heizung tagsüber, mehr Kochen',
    typicalDevices: ['Mehr Waschgänge', 'Trockner', 'Heizung tagsüber'],
    loadProfile: [3,2,2,2,2,2,4,5,6,5,5,6,6,5,5,5,6,7,7,6,5,4,3,3],
  },
  student: {
    id: 'student',
    name: 'Student / Lernende:r',
    emoji: '🎓',
    homeMultiplier: 0.95,
    note: 'Späteres Aufstehen, Laptop-Arbeit am Abend',
    typicalDevices: ['Laptop', 'Konsole/Gaming', 'Subs/Streaming'],
    loadProfile: [5,4,3,3,3,2,2,3,4,4,5,5,5,5,5,5,5,5,5,5,6,6,5,5],
  },

  // -------- LOW HOME USE (often away) --------
  sales: {
    id: 'sales',
    name: 'Sales / Vertrieb',
    emoji: '💼',
    homeMultiplier: 0.85,
    note: 'Häufig auf Achse, weniger Zeit zuhause',
    typicalDevices: ['Laptop'],
    loadProfile: [3,2,2,2,2,3,5,6,3,2,2,2,3,2,2,2,3,5,8,8,7,5,4,3],
  },
  consulting: {
    id: 'consulting',
    name: 'Consulting / Beratung',
    emoji: '🤝',
    homeMultiplier: 0.90,
    note: 'Reisetätigkeit, Hybrid',
    typicalDevices: ['Laptop', 'Externer Monitor'],
    loadProfile: [3,2,2,2,2,3,4,5,3,2,2,2,3,2,2,2,4,6,8,7,7,5,4,3],
  },
  construction: {
    id: 'construction',
    name: 'Bau / Handwerk',
    emoji: '🔨',
    homeMultiplier: 0.85,
    note: 'Tagsüber auf Baustelle, Abends zuhause',
    typicalDevices: ['Standard-Haushalt'],
    loadProfile: [3,3,2,2,2,3,5,3,3,3,3,3,4,3,3,3,4,6,8,8,7,5,4,3],
  },
  hospitality: {
    id: 'hospitality',
    name: 'Gastro / Hotellerie / Retail',
    emoji: '🍽️',
    homeMultiplier: 0.85,
    note: 'Schichtarbeit, oft Abends/Wochenende auswärts',
    typicalDevices: ['Standard-Haushalt'],
    loadProfile: [4,3,3,3,2,2,3,4,3,3,3,3,3,3,3,3,3,4,5,5,6,6,5,4],
  },
  manufacturing: {
    id: 'manufacturing',
    name: 'Industrie / Produktion',
    emoji: '🏭',
    homeMultiplier: 0.90,
    note: 'Schichtarbeit oder Bürotätigkeit in der Industrie',
    typicalDevices: ['Standard-Haushalt'],
    loadProfile: [3,3,2,2,2,3,5,3,3,3,3,3,4,3,3,3,4,6,8,8,7,5,4,3],
  },
  healthcare: {
    id: 'healthcare',
    name: 'Gesundheit / Pflege',
    emoji: '🏥',
    homeMultiplier: 0.90,
    note: 'Schichtbetrieb, unregelmässige Zeiten',
    typicalDevices: ['Standard-Haushalt'],
    loadProfile: [3,3,3,3,3,3,4,5,4,3,3,3,4,3,3,3,4,5,6,6,5,5,4,3],
  },
};

export function getIndustry(id) {
  return INDUSTRIES[id] || INDUSTRIES.unspecified;
}

export function getIndustryList() {
  // sortiert: erst unspecified, dann nach Multiplier (high to low)
  const list = Object.values(INDUSTRIES);
  const unspec = list.find((i) => i.id === 'unspecified');
  const rest = list.filter((i) => i.id !== 'unspecified').sort((a, b) => b.homeMultiplier - a.homeMultiplier);
  return [unspec, ...rest];
}
