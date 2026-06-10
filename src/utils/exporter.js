/**
 * JSON Export - triggert Browser-Download
 */

export function exportAsJson(state, totals) {
  const payload = {
    exportedAt: new Date().toISOString(),
    version: '2.0.0',
    generator: 'STROM.CH',
    totals: {
      totalKwh: totals.totalKwh,
      yearlyCostChf: totals.yearlyCostChf,
      monthlyCostChf: totals.monthlyCostChf,
      co2Kg: totals.co2Kg,
      efficiencyScore: totals.efficiencyScore,
      efficiencyGrade: totals.efficiencyGrade,
    },
    breakdown: {
      baseline: totals.baselineKwh,
      devices: totals.deviceKwh,
      pc: totals.pcKwh,
    },
    state: {
      household: {
        persons: state.persons,
        housing: state.housing,
        hasElectricBoiler: state.hasElectricBoiler,
        hasElectricHeating: state.hasElectricHeating,
      },
      selectedDevices: state.selectedDevices,
      fallbackCategories: state.fallbackCategories,
      pc: {
        cpu: state.cpuId,
        gpu: state.gpuId,
        pattern: state.pcPattern,
      },
      tariff: state.tariff,
      solar: state.solar,
    },
  };

  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `strom-audit-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Als Textreport kopierbar (für Notion)
 */
export function generateTextReport(state, totals) {
  return `STROM.CH - Haushalts-Audit
Exportiert: ${new Date().toLocaleString('de-CH')}
====================================

HAUSHALT
  Personen:           ${state.persons}
  Wohnform:           ${state.housing === 'house' ? 'Haus' : 'Wohnung'}
  Elektroboiler:      ${state.hasElectricBoiler ? 'Ja' : 'Nein'}
  Elektroheizung:     ${state.hasElectricHeating ? 'Ja' : 'Nein'}

GESAMTVERBRAUCH
  Total:              ${totals.totalKwh.toLocaleString('de-CH')} kWh/Jahr
  Kosten/Jahr:        CHF ${totals.yearlyCostChf.toFixed(2)}
  Kosten/Monat:       CHF ${totals.monthlyCostChf.toFixed(2)}
  CO2-Fussabdruck:    ${totals.co2Kg} kg/Jahr

EFFIZIENZ
  Score:              ${totals.efficiencyScore}/100
  Grade:              ${totals.efficiencyGrade}

AUFTEILUNG
  Grundverbrauch:     ${totals.baselineKwh.toLocaleString('de-CH')} kWh
  Geräte:             ${totals.deviceKwh.toLocaleString('de-CH')} kWh
  PC/Gaming:          ${totals.pcKwh.toLocaleString('de-CH')} kWh
`;
}
