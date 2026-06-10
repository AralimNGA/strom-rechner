import { useState, useEffect, useMemo } from 'react';

import { DEVICES, getDeviceById, getCategoryAverage } from './data/devices.js';
import { getCountry } from './data/countries.js';
import {
  calculateHouseholdBaseline,
  calculatePersonalizedAverage,
  calculatePC,
  calculateCO2,
} from './utils/calculations.js';
import { calculateEfficiencyScore } from './utils/efficiency.js';
import { generateOptimizations } from './utils/optimization.js';
import { getTopConsumers, calculateClimateGoal } from './utils/insights.js';
import {
  saveScenario,
  loadScenarios,
  deleteScenario,
  getTheme,
  setTheme as persistTheme,
} from './utils/storage.js';
import { exportAsJson } from './utils/exporter.js';
import { exportAsPdf } from './utils/pdfExport.js';

import TopBar from './components/TopBar.jsx';
import StickyStats from './components/StickyStats.jsx';
import SectionNav from './components/SectionNav.jsx';
import ProfilSection from './components/ProfilSection.jsx';
import DevicesSection from './components/DevicesSection.jsx';
import PCSection from './components/PCSection.jsx';
import SolarSection from './components/SolarSection.jsx';
import TariffSection from './components/TariffSection.jsx';
import LoadCurveSection from './components/LoadCurveSection.jsx';
import MarketSection from './components/MarketSection.jsx';
import ProviderCompareSection from './components/ProviderCompareSection.jsx';
import DashboardSection from './components/DashboardSection.jsx';
import BreakdownSection from './components/BreakdownSection.jsx';
import OptimizationSection from './components/OptimizationSection.jsx';
import ScenariosSection from './components/ScenariosSection.jsx';
import TipsSection from './components/TipsSection.jsx';
import PriceHistorySection from './components/PriceHistorySection.jsx';
import VolkswirtschaftSection from './components/VolkswirtschaftSection.jsx';

const DEFAULT_STATE = {
  countryId: 'ch',
  industryId: 'unspecified',
  persons: 2,
  housing: 'apartment',
  hasElectricBoiler: false,
  hasElectricHeating: false,
  selectedDevices: [
    'fridge_bosch_kgn39vleb',
    'wash_miele_weg365wcs',
    'dish_miele_g7210sc',
    'tv_lg_c4_55',
    'router_swisscom_box4',
  ],
  deviceQuantities: {}, // { deviceId: quantity } — default 1 falls nicht gesetzt
  fallbackCategories: [],
  pcMode: 'custom',
  cpuId: 'r7_9800x3d',
  gpuId: 'rtx5090',
  pcPattern: { idle_hours_day: 4, light_hours_day: 3, heavy_hours_day: 1 },
  tariff: { enabled: false, ntShare: 35 },
  solar: { enabled: false, kwp: 8, hasBattery: true, batteryKwh: 10 },
};

export default function App() {
  // Theme
  const [theme, setThemeState] = useState(getTheme());
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    persistTheme(theme);
  }, [theme]);
  const toggleTheme = () => setThemeState((t) => (t === 'light' ? 'dark' : 'light'));

  // Main state
  const [state, setState] = useState(DEFAULT_STATE);
  const updateState = (key, value) => setState((s) => ({ ...s, [key]: value }));

  // Country derived
  const country = getCountry(state.countryId);

  // Scenarios
  const [scenarios, setScenarios] = useState([]);
  useEffect(() => setScenarios(loadScenarios()), []);

  // Live market ticker — rebuild when country changes
  const [tick, setTick] = useState(new Date());
  const [marketData, setMarketData] = useState(() => buildMarketData(country));
  const [selectedProvider, setSelectedProvider] = useState(country.providers[0].id);

  // Reset market data + selected provider when country changes
  useEffect(() => {
    const c = getCountry(state.countryId);
    setMarketData(buildMarketData(c));
    setSelectedProvider(c.providers[0].id);
  }, [state.countryId]);

  // Live tick simulation
  useEffect(() => {
    const iv = setInterval(() => {
      setTick(new Date());
      setMarketData((prev) => ({
        providers: prev.providers.map((p) => {
          const delta = (Math.random() - 0.5) * p.volatility;
          const newPrice = Math.max(0.1, p.currentPrice + delta);
          return {
            ...p,
            currentPrice: newPrice,
            trend: ((newPrice - p.base) / p.base) * 100,
          };
        }),
        sources: prev.sources.map((s) => {
          const delta = (Math.random() - 0.5) * s.volatility;
          const newPrice = Math.max(0.1, s.currentPrice + delta);
          return {
            ...s,
            currentPrice: newPrice,
            trend: ((newPrice - s.base) / s.base) * 100,
          };
        }),
      }));
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  // Berechnung
  const calc = useMemo(() => {
    const baselineKwh = calculateHouseholdBaseline({
      countryId: state.countryId,
      persons: state.persons,
      housing: state.housing,
      hasElectricBoiler: state.hasElectricBoiler,
      hasElectricHeating: state.hasElectricHeating,
    });

    let deviceKwh = 0;
    state.selectedDevices.forEach((id) => {
      const d = getDeviceById(id);
      if (d) {
        const qty = state.deviceQuantities?.[id] || 1;
        deviceKwh += d.kwh * qty;
      }
    });
    state.fallbackCategories.forEach((catId) => {
      deviceKwh += getCategoryAverage(catId);
    });

    // PC: respektiere Modus
    let pcKwh = 0;
    if (state.pcMode === 'fallback_office') pcKwh = 150;
    else if (state.pcMode === 'fallback_gaming') pcKwh = 400;
    else if (state.pcMode === 'fallback_highend') pcKwh = 750;
    else if (state.pcMode === 'custom') pcKwh = calculatePC(state.cpuId, state.gpuId, state.pcPattern);
    // pcMode === 'none' → 0

    const totalKwh = baselineKwh + deviceKwh + pcKwh;

    // Personalisierter Erwartungswert (Land × Branche)
    const personalizedAvg = calculatePersonalizedAverage({
      countryId: state.countryId,
      persons: state.persons,
      housing: state.housing,
      industryId: state.industryId,
    });

    const provider =
      marketData.providers.find((p) => p.id === selectedProvider) || marketData.providers[0];
    const rappen = provider.currentPrice;
    const yearlyCostChf = (totalKwh * rappen) / 100;

    const co2Kg = calculateCO2(totalKwh, state.countryId);
    const efficiency = calculateEfficiencyScore(totalKwh, personalizedAvg);

    return {
      baselineKwh,
      deviceKwh,
      pcKwh,
      totalKwh,
      personalizedAvg,
      yearlyCostChf,
      co2Kg,
      efficiency,
      rappen,
      breakdown: {
        Grundverbrauch: baselineKwh,
        'Geräte gesamt': deviceKwh,
        'PC / Gaming': pcKwh,
      },
    };
  }, [state, marketData, selectedProvider]);

  // Stromfresser Top 5
  const topConsumers = useMemo(
    () =>
      getTopConsumers({
        selectedDevices: state.selectedDevices,
        fallbackCategories: state.fallbackCategories,
        pcKwh: calc.pcKwh,
        pcMode: state.pcMode,
        baselineKwh: calc.baselineKwh,
        deviceQuantities: state.deviceQuantities || {},
        topN: 5,
      }),
    [state, calc],
  );

  // Optimierungs-Plan
  const optimizations = useMemo(
    () =>
      generateOptimizations({
        countryId: state.countryId,
        state,
        totals: calc,
        marketProviders: marketData.providers,
        selectedProviderId: selectedProvider,
      }),
    [state, calc, marketData, selectedProvider],
  );

  // Klimaziel
  const climateGoal = useMemo(
    () => calculateClimateGoal(calc.co2Kg, state.persons),
    [calc.co2Kg, state.persons],
  );

  // Handlers Scenarios
  const handleSaveScenario = (name) => {
    const totals = {
      totalKwh: calc.totalKwh,
      yearlyCostChf: calc.yearlyCostChf,
      co2Kg: calc.co2Kg,
    };
    const saved = saveScenario(name, { ...state, __totals: totals });
    if (saved) setScenarios(loadScenarios());
  };
  const handleLoadScenario = (sc) => {
    if (sc.state) setState({ ...DEFAULT_STATE, ...sc.state });
  };
  const handleDeleteScenario = (id) => {
    deleteScenario(id);
    setScenarios(loadScenarios());
  };
  const handleExport = () => {
    exportAsJson(state, {
      totalKwh: calc.totalKwh,
      yearlyCostChf: calc.yearlyCostChf,
      monthlyCostChf: calc.yearlyCostChf / 12,
      co2Kg: calc.co2Kg,
      efficiencyScore: calc.efficiency.score,
      efficiencyGrade: calc.efficiency.grade,
      baselineKwh: calc.baselineKwh,
      deviceKwh: calc.deviceKwh,
      pcKwh: calc.pcKwh,
    });
  };
  const handleExportPdf = () => {
    exportAsPdf({
      state,
      calc,
      topConsumers,
      optimizations,
      climateGoal,
      marketData,
      selectedProvider,
    });
  };
  const handleReset = () => {
    if (confirm('Alles auf Standard zurücksetzen?')) setState(DEFAULT_STATE);
  };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <TopBar
        theme={theme}
        onThemeToggle={toggleTheme}
        countryId={state.countryId}
        onCountryChange={(id) => updateState('countryId', id)}
        providers={marketData.providers}
        sources={marketData.sources}
        tick={tick}
        country={country}
      />

      <SectionNav />

      <StickyStats
        totalKwh={calc.totalKwh}
        yearlyCostChf={calc.yearlyCostChf}
        efficiency={calc.efficiency}
        country={country}
      />

      <main
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '24px 32px 80px',
        }}
      >
        <ProfilSection state={state} setState={updateState} />

        <DevicesSection
          selectedDevices={state.selectedDevices}
          setSelectedDevices={(list) => updateState('selectedDevices', list)}
          fallbackCategories={state.fallbackCategories}
          setFallbackCategories={(list) => updateState('fallbackCategories', list)}
          deviceQuantities={state.deviceQuantities}
          setDeviceQuantities={(q) => updateState('deviceQuantities', q)}
        />

        <PCSection
          pcMode={state.pcMode}
          setPcMode={(v) => updateState('pcMode', v)}
          cpuId={state.cpuId}
          setCpuId={(v) => updateState('cpuId', v)}
          gpuId={state.gpuId}
          setGpuId={(v) => updateState('gpuId', v)}
          pattern={state.pcPattern}
          setPattern={(v) => updateState('pcPattern', v)}
          pcKwh={calc.pcKwh}
        />

        <SolarSection
          state={state}
          setState={updateState}
          totalKwh={calc.totalKwh}
          tariffSubUnit={calc.rappen}
        />

        <TariffSection
          state={state}
          setState={updateState}
          totalKwh={calc.totalKwh}
          baseRappen={calc.rappen}
        />

        <LoadCurveSection
          industryId={state.industryId}
          totalKwh={calc.totalKwh}
          htNtEnabled={state.tariff.enabled}
        />

        <MarketSection
          providers={marketData.providers}
          sources={marketData.sources}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          countryId={state.countryId}
        />

        <ProviderCompareSection
          providers={marketData.providers}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          totalKwh={calc.totalKwh}
          countryId={state.countryId}
        />

        <DashboardSection
          totalKwh={calc.totalKwh}
          yearlyCostChf={calc.yearlyCostChf}
          co2Kg={calc.co2Kg}
          efficiency={calc.efficiency}
          averageKwh={calc.personalizedAvg}
          countryId={state.countryId}
          persons={state.persons}
        />

        <BreakdownSection
          breakdown={calc.breakdown}
          totalKwh={calc.totalKwh}
          topConsumers={topConsumers}
        />

        <OptimizationSection items={optimizations} countryId={state.countryId} />

        <ScenariosSection
          scenarios={scenarios}
          onSave={handleSaveScenario}
          onLoad={handleLoadScenario}
          onDelete={handleDeleteScenario}
          onExport={handleExport}
          onExportPdf={handleExportPdf}
          onReset={handleReset}
          currentTotals={{ totalKwh: calc.totalKwh, yearlyCostChf: calc.yearlyCostChf }}
          countryId={state.countryId}
        />

        <PriceHistorySection totalKwh={calc.totalKwh} countryId={state.countryId} />

        <VolkswirtschaftSection
          totalKwh={calc.totalKwh}
          co2Kg={calc.co2Kg}
          persons={state.persons}
        />

        <TipsSection />
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--divider)',
          padding: 24,
          textAlign: 'center',
          background: 'var(--surface)',
        }}
      >
        <div
          className="mono"
          style={{ fontSize: 10, color: 'var(--text-dimmer)', letterSpacing: '0.15em' }}
        >
          STROM.EU v6.0 · {DEVICES.length} GERÄTEMODELLE · 7 LÄNDER · BUILT WITH VITE + REACT
        </div>
      </footer>
    </div>
  );
}

function buildMarketData(country) {
  return {
    providers: country.providers.map((p) => ({
      ...p,
      currentPrice: p.base,
      trend: 0,
    })),
    sources: country.energySources.map((s) => ({
      ...s,
      currentPrice: s.base,
      trend: 0,
    })),
  };
}
