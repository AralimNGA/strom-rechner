/**
 * Szenarien-Speicher via localStorage
 */

const STORAGE_KEY = 'strom_scenarios';
const THEME_KEY = 'strom_theme';

export function saveScenario(name, state) {
  try {
    const scenarios = loadScenarios();
    const newScenario = {
      id: `sc_${Date.now()}`,
      name: name || `Szenario ${scenarios.length + 1}`,
      createdAt: new Date().toISOString(),
      state,
    };
    scenarios.push(newScenario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
    return newScenario;
  } catch (e) {
    console.error('Failed to save scenario', e);
    return null;
  }
}

export function loadScenarios() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load scenarios', e);
    return [];
  }
}

export function deleteScenario(id) {
  try {
    const scenarios = loadScenarios().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
    return true;
  } catch (e) {
    return false;
  }
}

export function getTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch (e) {
    return 'dark';
  }
}

export function setTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}
