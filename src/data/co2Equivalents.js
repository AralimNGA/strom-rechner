/**
 * CO₂-Äquivalente: macht abstrakte Zahlen greifbar
 * Quellen: BFE, Mobitool, Myclimate, WWF
 */

export const CO2_EQUIVALENTS = {
  // Umrechnungsfaktoren: 1kg CO2 entspricht...
  tree_years_per_kg: 0.05,          // 1 Baum absorbiert ~20kg CO2/Jahr → 1kg = 1/20 Baumjahre
  car_km_per_kg: 8.0,               // Durchschn. Benziner: ~125g CO2/km → 1kg CO2 = 8km
  flight_zurich_mallorca_kg: 290,   // Hin+Zurück ca. 290kg pro Person (Economy)
  flight_zurich_newyork_kg: 1600,   // Hin+Zurück ca. 1.6t pro Person
  beef_kg_per_kg_co2: 1 / 27,       // 1kg Rindfleisch ~ 27kg CO2
  shower_minutes_per_kg_co2: 15,    // 1min Warmdusche ~ 70g CO2
  phone_charges_per_kg_co2: 200,    // 1 Handy-Ladung ~ 5g CO2
  netflix_hours_per_kg_co2: 10,     // 1h Streaming ~ 100g CO2
  jeans_per_kg_co2: 1 / 33,         // 1 Jeans ~ 33kg CO2 Produktion
  liters_gasoline_per_kg_co2: 1 / 2.37, // 1L Benzin ~ 2.37kg CO2
};

/**
 * Konvertiert Gesamtverbrauch zu anschaulichen Äquivalenten
 * @param {number} totalCo2Kg - Jahres-CO2 in kg
 */
export function getCO2Equivalents(totalCo2Kg) {
  return {
    trees_needed: Math.round(totalCo2Kg / 20),
    car_km: Math.round(totalCo2Kg * CO2_EQUIVALENTS.car_km_per_kg),
    flights_mallorca: (totalCo2Kg / CO2_EQUIVALENTS.flight_zurich_mallorca_kg).toFixed(1),
    flights_nyc: (totalCo2Kg / CO2_EQUIVALENTS.flight_zurich_newyork_kg).toFixed(2),
    beef_kg: Math.round(totalCo2Kg / 27),
    gasoline_liters: Math.round(totalCo2Kg / 2.37),
    phone_charges: Math.round(totalCo2Kg * 200),
  };
}

/**
 * kWh zu "Alltags-Einheiten"
 */
export function getKwhEquivalents(totalKwh) {
  return {
    showers: Math.round(totalKwh / 1.5),          // 1 warme Dusche ~1.5 kWh
    coffee_cups: Math.round(totalKwh * 10),       // 1 Tasse Kaffee ~0.1 kWh
    laundry_loads: Math.round(totalKwh / 0.7),    // 1 Waschgang ~0.7 kWh
    ev_km: Math.round(totalKwh * 5),              // E-Auto ~0.2kWh/km → 5km/kWh
    smartphones_fully_charged: Math.round(totalKwh * 70), // ~14Wh pro Ladung
    boiling_liters: Math.round(totalKwh * 9),     // 1L kochen ~0.11 kWh
  };
}
