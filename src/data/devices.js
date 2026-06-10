/**
 * Geräte-Datenbank v2 — ~350 Modelle
 *
 * Kategorien neu aufgeteilt:
 * - "laptop" (vorher unter small_tech)
 * - "phone"  (neu)
 * - "tablet" (neu)
 * - "wearable" (neu)
 *
 * kwh = Jahresverbrauch in kWh (typische Nutzung)
 * class = EU-Energieeffizienzklasse (A-G seit 2021, A+++ für ältere Label)
 *
 * Mobile-Werte (Phone/Tablet/Laptop):
 *   kWh = (Akku_Wh × Lade-Zyklen_pro_Jahr × Ladeverlust-Faktor) / 1000
 *   Laptop zusätzlich: avg_watts × Nutzungs-Stunden × 365 / 1000
 */

export const DEVICE_CATEGORIES = {
  fridge:        { name: 'Kühl- & Gefriergeräte', icon: '❄️', avgKwh: 220 },
  dishwasher:    { name: 'Geschirrspüler',         icon: '🍽️', avgKwh: 220 },
  washer:        { name: 'Waschmaschinen',         icon: '🧺', avgKwh: 55 },
  dryer:         { name: 'Tumbler',                icon: '🌀', avgKwh: 175 },
  oven:          { name: 'Backöfen',               icon: '🔥', avgKwh: 75 },
  stove:         { name: 'Kochfelder',             icon: '🍳', avgKwh: 220 },
  coffee:        { name: 'Kaffeemaschinen',        icon: '☕', avgKwh: 180 },
  small_kitchen: { name: 'Küchen-Kleingeräte',     icon: '🍞', avgKwh: 80 },
  tv:            { name: 'Fernseher',              icon: '📺', avgKwh: 150 },
  console:       { name: 'Spielkonsolen',          icon: '🎮', avgKwh: 110 },
  audio:         { name: 'Audio',                  icon: '🔊', avgKwh: 60 },
  router:        { name: 'Router & WLAN',          icon: '📡', avgKwh: 100 },
  nas:           { name: 'NAS & Heimserver',       icon: '💾', avgKwh: 220 },
  monitor:       { name: 'Monitore',               icon: '🖥️', avgKwh: 80 },
  laptop:        { name: 'Laptops',                icon: '💻', avgKwh: 60 },
  phone:         { name: 'Smartphones',            icon: '📱', avgKwh: 8 },
  tablet:        { name: 'Tablets',                icon: '📲', avgKwh: 15 },
  wearable:      { name: 'Wearables & Zubehör',    icon: '⌚', avgKwh: 3 },
  aircon:        { name: 'Klimaanlagen',           icon: '🌬️', avgKwh: 700 },
  small_misc:    { name: 'Haushalt-Kleingeräte',   icon: '🧹', avgKwh: 40 },
  lighting:      { name: 'Beleuchtung-Extras',     icon: '💡', avgKwh: 60 },
  special:       { name: 'Spezial-Verbraucher',    icon: '🔋', avgKwh: 800 },
};

export const DEVICES = [
  // ============================================================
  // KÜHL- & GEFRIERGERÄTE
  // ============================================================
  { id: 'fridge_bosch_kgn39vleb', category: 'fridge', brand: 'Bosch', model: 'KGN39VLEB Serie 4', year: 2024, kwh: 242, class: 'E', note: '368L Kühl-Gefrierkombi, NoFrost' },
  { id: 'fridge_bosch_kgn56xleb', category: 'fridge', brand: 'Bosch', model: 'KGN56XLEB Serie 4', year: 2024, kwh: 267, class: 'E', note: '508L XXL Kühl-Gefrierkombi' },
  { id: 'fridge_bosch_kgn39aict', category: 'fridge', brand: 'Bosch', model: 'KGN39AICT Serie 6', year: 2025, kwh: 175, class: 'C', note: '363L VitaFresh Pro' },
  { id: 'fridge_samsung_rb38c635', category: 'fridge', brand: 'Samsung', model: 'RB38C635DSA Bespoke', year: 2024, kwh: 185, class: 'C', note: '390L AI Cooling' },
  { id: 'fridge_samsung_rb53dg706', category: 'fridge', brand: 'Samsung', model: 'RB53DG706AS9 Bespoke', year: 2024, kwh: 224, class: 'D', note: '538L AI Energy Mode' },
  { id: 'fridge_lg_gbb72swvgn', category: 'fridge', brand: 'LG', model: 'GBB72SWVGN Door Cooling+', year: 2024, kwh: 189, class: 'C', note: '384L NoFrost DoorCooling' },
  { id: 'fridge_lg_gbb92mcacp', category: 'fridge', brand: 'LG', model: 'GBB92MCACP InstaView', year: 2023, kwh: 210, class: 'D', note: '384L Door-in-Door' },
  { id: 'fridge_vzug_v6000', category: 'fridge', brand: 'V-Zug', model: 'CombiCooler V6000 Supreme', year: 2025, kwh: 98, class: 'A', note: '255L Schweizer Premium' },
  { id: 'fridge_vzug_v4000', category: 'fridge', brand: 'V-Zug', model: 'CombiCooler V4000 178', year: 2024, kwh: 130, class: 'B', note: '249L Einbau' },
  { id: 'fridge_miele_kfn4898ad', category: 'fridge', brand: 'Miele', model: 'KFN 4898 AD', year: 2024, kwh: 142, class: 'B', note: '367L PerfectFresh Pro' },
  { id: 'fridge_miele_kfns7795', category: 'fridge', brand: 'Miele', model: 'KFNS 7795 D', year: 2025, kwh: 118, class: 'A', note: '363L PerfectFresh Active' },
  { id: 'fridge_liebherr_cbnef5723', category: 'fridge', brand: 'Liebherr', model: 'CBNbsa 5753 Prime', year: 2024, kwh: 156, class: 'C', note: '363L BioFresh Professional' },
  { id: 'fridge_liebherr_sbsbs70i5', category: 'fridge', brand: 'Liebherr', model: 'SBSbs 70I5 Side-by-Side', year: 2024, kwh: 358, class: 'E', note: '634L Side-by-Side XXL' },
  { id: 'fridge_electrolux_lnt7me32x2', category: 'fridge', brand: 'Electrolux', model: 'LNT7ME32X2', year: 2024, kwh: 171, class: 'C', note: '324L TwinTech NoFrost' },
  { id: 'fridge_siemens_kg39naict', category: 'fridge', brand: 'Siemens', model: 'KG39NAICT iQ500', year: 2024, kwh: 157, class: 'C', note: '363L HyperFresh Plus' },
  { id: 'fridge_freezer_liebherr_gn3735', category: 'fridge', brand: 'Liebherr', model: 'GN 3735 Gefrierschrank', year: 2024, kwh: 199, class: 'E', note: '268L Standgerät NoFrost' },
  { id: 'fridge_freezer_bosch_gsn36vxep', category: 'fridge', brand: 'Bosch', model: 'GSN36VXEP Serie 4', year: 2024, kwh: 253, class: 'E', note: '242L Gefrierschrank 186cm' },
  { id: 'fridge_chest_liebherr_gtp2356', category: 'fridge', brand: 'Liebherr', model: 'GTP 2356 Gefriertruhe', year: 2023, kwh: 165, class: 'D', note: '209L Premium Truhe' },
  { id: 'fridge_wine_liebherr_wkr1811', category: 'fridge', brand: 'Liebherr', model: 'WKr 1811 Weinkühler', year: 2023, kwh: 141, class: 'G', note: '66 Flaschen Weinschrank' },

  // ============================================================
  // GESCHIRRSPÜLER
  // ============================================================
  { id: 'dish_miele_g7210sc', category: 'dishwasher', brand: 'Miele', model: 'G 7210 SC AutoDos', year: 2024, kwh: 66, class: 'C', note: 'AutoDos mit PowerDisk' },
  { id: 'dish_miele_g7420sci', category: 'dishwasher', brand: 'Miele', model: 'G 7420 SCi PowerDisk', year: 2025, kwh: 58, class: 'B', note: 'PowerDisk + Auto Open' },
  { id: 'dish_bosch_smv6zdx49e', category: 'dishwasher', brand: 'Bosch', model: 'SMV6ZDX49E Serie 6', year: 2024, kwh: 75, class: 'C', note: 'PerfectDry Zeolith' },
  { id: 'dish_bosch_sms8yci03e', category: 'dishwasher', brand: 'Bosch', model: 'SMS8YCI03E Serie 8', year: 2024, kwh: 62, class: 'A', note: 'EfficientDry Klasse A' },
  { id: 'dish_siemens_sn87ed801', category: 'dishwasher', brand: 'Siemens', model: 'SN87ED801CE iQ700', year: 2024, kwh: 74, class: 'B', note: 'varioSpeed + Zeolith' },
  { id: 'dish_vzug_adora_v6000', category: 'dishwasher', brand: 'V-Zug', model: 'Adora SL V6000', year: 2024, kwh: 71, class: 'B', note: 'Schweizer Premium-Einbau' },
  { id: 'dish_vzug_adora_v4000', category: 'dishwasher', brand: 'V-Zug', model: 'AdoraVario SL V4000', year: 2024, kwh: 73, class: 'C', note: 'Schweizer Standard-Einbau' },
  { id: 'dish_electrolux_esf9862rox', category: 'dishwasher', brand: 'Electrolux', model: 'ESF9862ROX', year: 2024, kwh: 74, class: 'C', note: 'QuickSelect + 4 Körbe' },
  { id: 'dish_aeg_fsb53637p', category: 'dishwasher', brand: 'AEG', model: 'FSB53637P 7000er', year: 2024, kwh: 78, class: 'D', note: 'MaxiFlex-Besteckschublade' },

  // ============================================================
  // WASCHMASCHINEN
  // ============================================================
  { id: 'wash_miele_weg365wcs', category: 'washer', brand: 'Miele', model: 'WEG 365 WCS PWash', year: 2024, kwh: 49, class: 'A', note: '9kg, TwinDos, PowerWash' },
  { id: 'wash_miele_wxi860wcs', category: 'washer', brand: 'Miele', model: 'WXI 860 WCS W1', year: 2025, kwh: 46, class: 'A', note: '9kg, QuickPowerWash' },
  { id: 'wash_miele_wsi863wcs', category: 'washer', brand: 'Miele', model: 'WSI 863 WCS Passion', year: 2024, kwh: 52, class: 'A', note: '9kg TwinDos + CapDosing' },
  { id: 'wash_bosch_wav28e44', category: 'washer', brand: 'Bosch', model: 'WAV28E44 Serie 8', year: 2023, kwh: 58, class: 'A', note: '9kg i-DOS + Home Connect' },
  { id: 'wash_bosch_wgg244zch', category: 'washer', brand: 'Bosch', model: 'WGG244ZCH Serie 8', year: 2024, kwh: 56, class: 'A', note: '9kg SpeedPerfect, CH-Modell' },
  { id: 'wash_siemens_wg44b20g0', category: 'washer', brand: 'Siemens', model: 'WG44B20G0 iQ700', year: 2024, kwh: 58, class: 'A', note: '9kg i-Dos automatic' },
  { id: 'wash_vzug_adora_v4000', category: 'washer', brand: 'V-Zug', model: 'AdoraWash V4000', year: 2024, kwh: 63, class: 'A', note: '8kg Schweizer Premium' },
  { id: 'wash_vzug_adora_v6000', category: 'washer', brand: 'V-Zug', model: 'AdoraWash V6000 Supreme', year: 2025, kwh: 57, class: 'A', note: '8kg OptiDos, Steam Care' },
  { id: 'wash_samsung_ww11bb704', category: 'washer', brand: 'Samsung', model: 'WW11BB704DGE AI Ecobubble', year: 2024, kwh: 52, class: 'A', note: '11kg AI + SpaceMax' },
  { id: 'wash_samsung_ww11bba046', category: 'washer', brand: 'Samsung', model: 'WW11BBA046AW Bespoke AI', year: 2024, kwh: 52, class: 'A', note: '11kg Bespoke Design' },
  { id: 'wash_lg_f4wv710p2', category: 'washer', brand: 'LG', model: 'F4WV710P2E AI DD', year: 2024, kwh: 53, class: 'A', note: '10,5kg SteamTurboWash' },
  { id: 'wash_lg_f4wv912p2', category: 'washer', brand: 'LG', model: 'F4WV912P2E AI DD', year: 2024, kwh: 48, class: 'A', note: '12kg SmartDiagnosis' },
  { id: 'wash_electrolux_ew9f1497go', category: 'washer', brand: 'Electrolux', model: 'EW9F1497GO PerfectCare 900', year: 2024, kwh: 56, class: 'A', note: '9kg SensiCare SoftPlus' },

  // ============================================================
  // TUMBLER
  // ============================================================
  { id: 'dryer_miele_twf640wp', category: 'dryer', brand: 'Miele', model: 'TWF 640 WP EcoSpeed', year: 2024, kwh: 156, class: 'A+++', note: '8kg Wärmepumpe' },
  { id: 'dryer_miele_tec855wp', category: 'dryer', brand: 'Miele', model: 'TEC 855 WP T1', year: 2025, kwh: 148, class: 'A+++', note: '9kg Wärmepumpe SteamCare' },
  { id: 'dryer_bosch_wqg233d40', category: 'dryer', brand: 'Bosch', model: 'WQG233D40 Serie 6', year: 2024, kwh: 165, class: 'A++', note: '8kg Wärmepumpe AutoDry' },
  { id: 'dryer_bosch_wqg245a9ch', category: 'dryer', brand: 'Bosch', model: 'WQG245A9CH Serie 8', year: 2024, kwh: 175, class: 'A+++', note: '9kg CH-Modell' },
  { id: 'dryer_siemens_wq45g200ch', category: 'dryer', brand: 'Siemens', model: 'WQ45G200CH iQ500', year: 2024, kwh: 188, class: 'A++', note: '9kg autoDry' },
  { id: 'dryer_vzug_adora_v4000', category: 'dryer', brand: 'V-Zug', model: 'AdoraDry V4000 TSL', year: 2024, kwh: 173, class: 'A++', note: '8kg Wärmepumpe' },
  { id: 'dryer_vzug_adora_v6000', category: 'dryer', brand: 'V-Zug', model: 'AdoraDry V6000 Supreme', year: 2025, kwh: 158, class: 'A+++', note: '8kg RefreshButler' },
  { id: 'dryer_samsung_dv90bba045', category: 'dryer', brand: 'Samsung', model: 'DV90BBA045AW AI OptimalDry', year: 2024, kwh: 159, class: 'A+++', note: '9kg AI-Steuerung' },
  { id: 'dryer_lg_rc92v9av2q', category: 'dryer', brand: 'LG', model: 'RC92V9AV2Q DUAL Inverter', year: 2024, kwh: 165, class: 'A+++', note: '9kg Heat Pump TurboDry' },

  // ============================================================
  // BACKÖFEN
  // ============================================================
  { id: 'oven_miele_h7264b', category: 'oven', brand: 'Miele', model: 'H 7264 B ArtLine', year: 2024, kwh: 69, class: 'A+', note: 'Pyrolyse + MultiSteam' },
  { id: 'oven_miele_h7690bm', category: 'oven', brand: 'Miele', model: 'H 7690 BM MChef Pro', year: 2025, kwh: 76, class: 'A+', note: 'Pyrolyse + Mikrowelle' },
  { id: 'oven_bosch_hbg675bb1', category: 'oven', brand: 'Bosch', model: 'HBG675BB1 Serie 8', year: 2024, kwh: 71, class: 'A+', note: 'PerfectBake + PerfectRoast' },
  { id: 'oven_bosch_hbg7341b1', category: 'oven', brand: 'Bosch', model: 'HBG7341B1 Serie 8 Pyro', year: 2024, kwh: 68, class: 'A+', note: 'Pyrolyse Dampf' },
  { id: 'oven_siemens_hb774g1b1', category: 'oven', brand: 'Siemens', model: 'HB774G1B1 iQ700', year: 2024, kwh: 69, class: 'A+', note: 'activeClean Pyrolyse' },
  { id: 'oven_vzug_combair_v6000', category: 'oven', brand: 'V-Zug', model: 'Combair V6000 45', year: 2024, kwh: 63, class: 'A+', note: 'Schweizer Premium Steam' },
  { id: 'oven_vzug_combisteam_v4000', category: 'oven', brand: 'V-Zug', model: 'CombiSteamer V4000', year: 2024, kwh: 72, class: 'A', note: 'Dampfgarer + Backofen' },
  { id: 'oven_electrolux_eob9s31wz', category: 'oven', brand: 'Electrolux', model: 'EOB9S31WZ SteamPro', year: 2024, kwh: 74, class: 'A+', note: 'SteamPro 100°C Dampf' },

  // ============================================================
  // KOCHFELDER
  // ============================================================
  { id: 'stove_vzug_gk46tebso', category: 'stove', brand: 'V-Zug', model: 'GK46TEBSO Induktion', year: 2024, kwh: 180, class: 'A', note: 'Induktion 4-Felder' },
  { id: 'stove_miele_km7679fr', category: 'stove', brand: 'Miele', model: 'KM 7679 FR FullFlex', year: 2024, kwh: 195, class: 'A', note: 'FullFlex TempControl' },
  { id: 'stove_bosch_pkm875dp1d', category: 'stove', brand: 'Bosch', model: 'PKM875DP1D Serie 8', year: 2024, kwh: 210, class: 'A', note: 'FlexInduction 80cm' },
  { id: 'stove_siemens_ex875kyw1e', category: 'stove', brand: 'Siemens', model: 'EX875KYW1E iQ700', year: 2024, kwh: 205, class: 'A', note: 'fullFlex Induktion' },
  { id: 'stove_aeg_ikb6431xxb', category: 'stove', brand: 'AEG', model: 'IKB6431XXB Induktion', year: 2024, kwh: 220, class: 'A', note: 'Induktions-Standardfeld' },
  { id: 'stove_gas_bosch_pbp6b5b90', category: 'stove', brand: 'Bosch', model: 'PBP6B5B90 Gaskochfeld', year: 2023, kwh: 15, class: '—', note: 'Gasfeld, nur Zündung elektrisch' },

  // ============================================================
  // KAFFEE
  // ============================================================
  { id: 'coffee_jura_e8', category: 'coffee', brand: 'Jura', model: 'E8 Chrome (2024)', year: 2024, kwh: 180, class: '—', note: 'Vollautomat Schweizer Premium' },
  { id: 'coffee_jura_ena8', category: 'coffee', brand: 'Jura', model: 'ENA 8 Touch', year: 2024, kwh: 140, class: '—', note: 'Kompakt-Vollautomat' },
  { id: 'coffee_jura_z10', category: 'coffee', brand: 'Jura', model: 'Z10 Aluminium', year: 2024, kwh: 220, class: '—', note: 'Flaggschiff Cold Brew' },
  { id: 'coffee_delonghi_dinamica_plus', category: 'coffee', brand: 'De\'Longhi', model: 'Dinamica Plus ECAM370', year: 2024, kwh: 190, class: '—', note: 'LatteCrema Vollautomat' },
  { id: 'coffee_delonghi_eletta_explore', category: 'coffee', brand: 'De\'Longhi', model: 'Eletta Explore ECAM450', year: 2024, kwh: 210, class: '—', note: 'Cold Brew + Hot Extraction' },
  { id: 'coffee_nespresso_vertuo_next', category: 'coffee', brand: 'Nespresso', model: 'Vertuo Next', year: 2023, kwh: 75, class: '—', note: 'Kapsel mit Standby' },
  { id: 'coffee_nespresso_creatista', category: 'coffee', brand: 'Nespresso', model: 'Creatista Plus', year: 2024, kwh: 95, class: '—', note: 'Kapsel mit Dampflanze' },
  { id: 'coffee_sage_oracle_touch', category: 'coffee', brand: 'Sage', model: 'Oracle Touch SES990', year: 2024, kwh: 285, class: '—', note: 'Halbautomat Premium' },
  { id: 'coffee_rancilio_silvia', category: 'coffee', brand: 'Rancilio', model: 'Silvia Pro X', year: 2024, kwh: 320, class: '—', note: 'Dual-Boiler Halbautomat' },
  { id: 'coffee_filter_moccamaster', category: 'coffee', brand: 'Moccamaster', model: 'KBG Select', year: 2024, kwh: 85, class: '—', note: 'Filter-Kaffeemaschine' },

  // ============================================================
  // KÜCHEN-KLEINGERÄTE
  // ============================================================
  { id: 'small_kettle_wmf_lono', category: 'small_kitchen', brand: 'WMF', model: 'Lono Wasserkocher', year: 2024, kwh: 160, class: '—', note: '2-3x tägl. Nutzung' },
  { id: 'small_toaster_dualit', category: 'small_kitchen', brand: 'Dualit', model: 'Classic 2-Slice', year: 2024, kwh: 40, class: '—', note: 'Typischer Toaster' },
  { id: 'small_microwave_samsung_mg23t5018', category: 'small_kitchen', brand: 'Samsung', model: 'MG23T5018CW', year: 2024, kwh: 50, class: '—', note: 'Mikrowelle mit Grill' },
  { id: 'small_airfryer_ninja_af400', category: 'small_kitchen', brand: 'Ninja', model: 'Foodi MAX AF400', year: 2024, kwh: 75, class: '—', note: 'Airfryer 7.6L' },
  { id: 'small_airfryer_philips_xxl', category: 'small_kitchen', brand: 'Philips', model: 'Airfryer XXL HD9280', year: 2024, kwh: 90, class: '—', note: 'Premium Heissluftfritteuse' },
  { id: 'small_blender_vitamix', category: 'small_kitchen', brand: 'Vitamix', model: 'A3500i Ascent', year: 2024, kwh: 40, class: '—', note: 'Hochleistungsmixer' },
  { id: 'small_mixer_kenwood_titanium', category: 'small_kitchen', brand: 'Kenwood', model: 'Chef Titanium XL', year: 2024, kwh: 30, class: '—', note: 'Küchenmaschine' },
  { id: 'small_thermomix_tm7', category: 'small_kitchen', brand: 'Vorwerk', model: 'Thermomix TM7', year: 2025, kwh: 95, class: '—', note: 'Kochroboter (tägliche Nutzung)' },

  // ============================================================
  // TVs
  // ============================================================
  { id: 'tv_lg_c3_55', category: 'tv', brand: 'LG', model: 'OLED55C3 (2023)', year: 2023, kwh: 107, class: 'G', note: 'OLED evo 55" 4K' },
  { id: 'tv_lg_c3_65', category: 'tv', brand: 'LG', model: 'OLED65C3 (2023)', year: 2023, kwh: 149, class: 'G', note: 'OLED evo 65" 4K' },
  { id: 'tv_lg_c4_55', category: 'tv', brand: 'LG', model: 'OLED55C4 (2024)', year: 2024, kwh: 99, class: 'G', note: 'OLED evo 55" α9 AI Gen7' },
  { id: 'tv_lg_c4_65', category: 'tv', brand: 'LG', model: 'OLED65C4 (2024)', year: 2024, kwh: 138, class: 'G', note: 'OLED evo 65" 4K 144Hz' },
  { id: 'tv_lg_g4_65', category: 'tv', brand: 'LG', model: 'OLED65G4 (2024)', year: 2024, kwh: 151, class: 'G', note: 'MLA OLED 65" Gallery' },
  { id: 'tv_samsung_s95c_55', category: 'tv', brand: 'Samsung', model: 'QE55S95C QD-OLED (2023)', year: 2023, kwh: 111, class: 'G', note: 'QD-OLED 55" 144Hz' },
  { id: 'tv_samsung_s95d_65', category: 'tv', brand: 'Samsung', model: 'QE65S95D QD-OLED (2024)', year: 2024, kwh: 155, class: 'G', note: 'QD-OLED 65" Glare Free' },
  { id: 'tv_samsung_qn90d_55', category: 'tv', brand: 'Samsung', model: 'QE55QN90D Neo QLED (2024)', year: 2024, kwh: 99, class: 'F', note: 'Neo QLED 55" 144Hz' },
  { id: 'tv_samsung_qn95d_65', category: 'tv', brand: 'Samsung', model: 'QE65QN95D Neo QLED (2024)', year: 2024, kwh: 141, class: 'F', note: 'Neo QLED 65" Flaggschiff' },
  { id: 'tv_sony_a95l_55', category: 'tv', brand: 'Sony', model: 'XR-55A95L QD-OLED (2023)', year: 2023, kwh: 110, class: 'G', note: 'QD-OLED Cognitive XR' },
  { id: 'tv_sony_bravia9_65', category: 'tv', brand: 'Sony', model: 'Bravia 9 XR-65K895 (2024)', year: 2024, kwh: 160, class: 'F', note: 'Mini LED 65" XR Backlight' },
  { id: 'tv_sony_bravia8_55', category: 'tv', brand: 'Sony', model: 'Bravia 8 XR-55K855 (2024)', year: 2024, kwh: 108, class: 'G', note: 'OLED 55" Cognitive XR' },
  { id: 'tv_philips_oled908_55', category: 'tv', brand: 'Philips', model: 'OLED908 55" (2023)', year: 2023, kwh: 108, class: 'G', note: 'MLA OLED+ Ambilight' },
  { id: 'tv_philips_oled909_65', category: 'tv', brand: 'Philips', model: 'OLED909 65" (2024)', year: 2024, kwh: 152, class: 'G', note: 'OLED+ MLA 4-Seiten Ambilight' },
  { id: 'tv_tcl_c855_65', category: 'tv', brand: 'TCL', model: 'C855 65" Mini-LED (2024)', year: 2024, kwh: 125, class: 'F', note: 'Mini-LED 144Hz' },
  { id: 'tv_hisense_u8k_65', category: 'tv', brand: 'Hisense', model: 'U8K 65" Mini-LED (2023)', year: 2023, kwh: 132, class: 'F', note: 'ULED Mini-LED 1500 Nits' },
  { id: 'tv_lg_big_77', category: 'tv', brand: 'LG', model: 'OLED77C4 77" (2024)', year: 2024, kwh: 198, class: 'G', note: 'OLED 77" Grossformat' },
  { id: 'tv_samsung_big_85', category: 'tv', brand: 'Samsung', model: 'QE85QN95D 85" Neo QLED', year: 2024, kwh: 275, class: 'F', note: 'Neo QLED 85" Giant' },

  // ============================================================
  // KONSOLEN
  // ============================================================
  { id: 'console_ps5_slim', category: 'console', brand: 'Sony', model: 'PlayStation 5 Slim', year: 2024, kwh: 110, class: '—', note: '~200W Gaming / 2h tägl.' },
  { id: 'console_ps5_pro', category: 'console', brand: 'Sony', model: 'PlayStation 5 Pro', year: 2024, kwh: 175, class: '—', note: '~310W Gaming / 2h tägl.' },
  { id: 'console_ps5_standard', category: 'console', brand: 'Sony', model: 'PlayStation 5 (Launch)', year: 2023, kwh: 130, class: '—', note: '~220W Gaming / 2h tägl.' },
  { id: 'console_xbox_series_x', category: 'console', brand: 'Microsoft', model: 'Xbox Series X', year: 2023, kwh: 95, class: '—', note: '~165W Gaming / 2h tägl.' },
  { id: 'console_xbox_series_s', category: 'console', brand: 'Microsoft', model: 'Xbox Series S', year: 2023, kwh: 45, class: '—', note: '~75W Gaming / 2h tägl.' },
  { id: 'console_switch_oled', category: 'console', brand: 'Nintendo', model: 'Switch OLED', year: 2023, kwh: 6, class: '—', note: '~10W gedockt / 2h tägl.' },
  { id: 'console_switch_2', category: 'console', brand: 'Nintendo', model: 'Switch 2', year: 2025, kwh: 18, class: '—', note: '~30W gedockt / 2h tägl.' },
  { id: 'console_steamdeck_oled', category: 'console', brand: 'Valve', model: 'Steam Deck OLED', year: 2024, kwh: 15, class: '—', note: '~25W Handheld' },
  { id: 'console_rog_ally_x', category: 'console', brand: 'Asus', model: 'ROG Ally X', year: 2024, kwh: 22, class: '—', note: '~35W Handheld High-End' },
  { id: 'console_legion_go', category: 'console', brand: 'Lenovo', model: 'Legion Go', year: 2024, kwh: 20, class: '—', note: '~33W Handheld' },

  // ============================================================
  // AUDIO
  // ============================================================
  { id: 'audio_sonos_arc', category: 'audio', brand: 'Sonos', model: 'Arc Ultra (2024)', year: 2024, kwh: 65, class: '—', note: 'Premium-Soundbar' },
  { id: 'audio_sonos_beam2', category: 'audio', brand: 'Sonos', model: 'Beam Gen 2', year: 2023, kwh: 45, class: '—', note: 'Kompakt-Soundbar' },
  { id: 'audio_bose_smart_ultra', category: 'audio', brand: 'Bose', model: 'Smart Ultra Soundbar', year: 2024, kwh: 70, class: '—', note: 'Dolby Atmos Soundbar' },
  { id: 'audio_samsung_hw_q990d', category: 'audio', brand: 'Samsung', model: 'HW-Q990D 11.1.4', year: 2024, kwh: 105, class: '—', note: 'Soundbar-Komplettsystem' },
  { id: 'audio_sonos_era_300', category: 'audio', brand: 'Sonos', model: 'Era 300', year: 2023, kwh: 50, class: '—', note: 'Premium Speaker' },
  { id: 'audio_hifi_avreceiver', category: 'audio', brand: 'Denon/Marantz', model: 'AVR X3800H / Cinema 50', year: 2024, kwh: 180, class: '—', note: 'AV-Receiver 9.2 Typ' },
  { id: 'audio_homepod_2', category: 'audio', brand: 'Apple', model: 'HomePod (2. Gen)', year: 2023, kwh: 35, class: '—', note: 'Smart Speaker' },
  { id: 'audio_kef_ls50_wireless', category: 'audio', brand: 'KEF', model: 'LS50 Wireless II', year: 2023, kwh: 110, class: '—', note: 'Aktiv-Lautsprecher Paar' },

  // ============================================================
  // ROUTER
  // ============================================================
  { id: 'router_swisscom_box4', category: 'router', brand: 'Swisscom', model: 'Internet-Box 4', year: 2023, kwh: 114, class: '—', note: '~13W, 24/7' },
  { id: 'router_swisscom_box_smart', category: 'router', brand: 'Swisscom', model: 'Internet-Box Smart', year: 2024, kwh: 96, class: '—', note: '~11W, 24/7' },
  { id: 'router_sunrise_tp_deco', category: 'router', brand: 'Sunrise', model: 'TP-Link Deco (Mietgerät)', year: 2024, kwh: 88, class: '—', note: '~10W, Mesh-Router' },
  { id: 'router_fritzbox_7590', category: 'router', brand: 'AVM', model: 'FRITZ!Box 7590 AX', year: 2023, kwh: 96, class: '—', note: '~11W Wi-Fi 6' },
  { id: 'router_fritzbox_7690', category: 'router', brand: 'AVM', model: 'FRITZ!Box 7690', year: 2024, kwh: 114, class: '—', note: '~13W Wi-Fi 7' },
  { id: 'router_asus_gt_be98', category: 'router', brand: 'Asus', model: 'ROG Rapture GT-BE98', year: 2024, kwh: 175, class: '—', note: '~20W Wi-Fi 7 Gaming' },
  { id: 'router_ubiquiti_dream_pro', category: 'router', brand: 'Ubiquiti', model: 'UniFi Dream Machine Pro', year: 2023, kwh: 290, class: '—', note: '~33W Enterprise' },
  { id: 'router_eero_pro_6e', category: 'router', brand: 'Amazon eero', model: 'Pro 6E 3-Pack Mesh', year: 2024, kwh: 175, class: '—', note: '~20W Mesh-System' },

  // ============================================================
  // NAS
  // ============================================================
  { id: 'nas_synology_ds224', category: 'nas', brand: 'Synology', model: 'DS224+ (2x 4TB HDD)', year: 2023, kwh: 175, class: '—', note: '~20W idle' },
  { id: 'nas_synology_ds423', category: 'nas', brand: 'Synology', model: 'DS423+ (4x 4TB HDD)', year: 2023, kwh: 240, class: '—', note: '~27W idle' },
  { id: 'nas_synology_ds923', category: 'nas', brand: 'Synology', model: 'DS923+ (4x 8TB HDD)', year: 2023, kwh: 307, class: '—', note: '~35W idle' },
  { id: 'nas_synology_ds1522', category: 'nas', brand: 'Synology', model: 'DS1522+ (5x HDD)', year: 2024, kwh: 395, class: '—', note: '~45W Prosumer' },
  { id: 'nas_qnap_ts464', category: 'nas', brand: 'QNAP', model: 'TS-464 (4x HDD)', year: 2024, kwh: 265, class: '—', note: '~30W idle 4-Bay' },
  { id: 'nas_ugreen_dxp4800', category: 'nas', brand: 'UGREEN', model: 'DXP4800 Plus', year: 2024, kwh: 220, class: '—', note: '~25W idle 4-Bay' },
  { id: 'nas_diy_homelab', category: 'nas', brand: 'DIY', model: 'Homelab / Proxmox Server', year: 2024, kwh: 525, class: '—', note: '~60W idle 24/7' },

  // ============================================================
  // MONITORE
  // ============================================================
  { id: 'mon_dell_u2723qe', category: 'monitor', brand: 'Dell', model: 'UltraSharp U2723QE 27" 4K', year: 2023, kwh: 55, class: 'G', note: '~25W, 6h/Tag' },
  { id: 'mon_dell_u3225qe', category: 'monitor', brand: 'Dell', model: 'UltraSharp U3225QE 32" 4K', year: 2025, kwh: 77, class: 'G', note: '~35W QD-IPS' },
  { id: 'mon_lg_ultragear_27gp950', category: 'monitor', brand: 'LG', model: 'UltraGear 27GP950 27" 4K 144Hz', year: 2023, kwh: 77, class: 'G', note: '~35W Nano IPS Gaming' },
  { id: 'mon_lg_ultragear_27gs95qe', category: 'monitor', brand: 'LG', model: 'UltraGear 27GS95QE OLED', year: 2024, kwh: 88, class: 'G', note: '~40W OLED 240Hz' },
  { id: 'mon_samsung_odyssey_g9_49', category: 'monitor', brand: 'Samsung', model: 'Odyssey G9 Neo 49"', year: 2023, kwh: 164, class: 'G', note: '~75W Super-Ultrawide' },
  { id: 'mon_samsung_odyssey_oled_g9', category: 'monitor', brand: 'Samsung', model: 'Odyssey OLED G9 49"', year: 2024, kwh: 132, class: 'G', note: '~60W QD-OLED Ultrawide' },
  { id: 'mon_asus_pg27ucdm', category: 'monitor', brand: 'Asus', model: 'ROG Swift PG27UCDM 27" 4K OLED', year: 2025, kwh: 98, class: 'G', note: '~45W QD-OLED 240Hz' },
  { id: 'mon_alienware_aw3225qf', category: 'monitor', brand: 'Alienware', model: 'AW3225QF 32" 4K OLED', year: 2024, kwh: 110, class: 'G', note: '~50W QD-OLED 240Hz' },
  { id: 'mon_apple_studio', category: 'monitor', brand: 'Apple', model: 'Studio Display 27" 5K', year: 2023, kwh: 88, class: 'G', note: '~40W Thunderbolt' },
  { id: 'mon_apple_pro_xdr', category: 'monitor', brand: 'Apple', model: 'Pro Display XDR 32"', year: 2023, kwh: 175, class: 'G', note: '~80W HDR Pro' },
  { id: 'mon_budget_24fhd', category: 'monitor', brand: 'Generic', model: '24" FHD Office-Monitor', year: 2024, kwh: 33, class: 'F', note: '~15W Office/Büro' },

  // ============================================================
  // LAPTOPS — Apple MacBook
  // ============================================================
  { id: 'lap_mba_m2_13', category: 'laptop', brand: 'Apple', model: 'MacBook Air 13" M2', year: 2022, kwh: 28, class: '—', note: '~12W avg, 6h/Tag' },
  { id: 'lap_mba_m2_15', category: 'laptop', brand: 'Apple', model: 'MacBook Air 15" M2', year: 2023, kwh: 33, class: '—', note: '~14W avg, 6h/Tag' },
  { id: 'lap_mba_m3_13', category: 'laptop', brand: 'Apple', model: 'MacBook Air 13" M3', year: 2024, kwh: 26, class: '—', note: '~11W avg, 6h/Tag' },
  { id: 'lap_mba_m3_15', category: 'laptop', brand: 'Apple', model: 'MacBook Air 15" M3', year: 2024, kwh: 31, class: '—', note: '~13W avg, 6h/Tag' },
  { id: 'lap_mba_m4_13', category: 'laptop', brand: 'Apple', model: 'MacBook Air 13" M4', year: 2025, kwh: 24, class: '—', note: '~10W avg, 6h/Tag' },
  { id: 'lap_mba_m4_15', category: 'laptop', brand: 'Apple', model: 'MacBook Air 15" M4', year: 2025, kwh: 29, class: '—', note: '~12W avg, 6h/Tag' },
  { id: 'lap_mbp14_m3', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M3', year: 2023, kwh: 35, class: '—', note: '~15W avg Mixed Use' },
  { id: 'lap_mbp14_m3_pro', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M3 Pro', year: 2023, kwh: 55, class: '—', note: '~22W avg' },
  { id: 'lap_mbp14_m3_max', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M3 Max', year: 2023, kwh: 70, class: '—', note: '~28W avg Creative' },
  { id: 'lap_mbp16_m3_pro', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 16" M3 Pro', year: 2023, kwh: 62, class: '—', note: '~25W avg' },
  { id: 'lap_mbp16_m3_max', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 16" M3 Max', year: 2023, kwh: 82, class: '—', note: '~33W avg Pro Workload' },
  { id: 'lap_mbp14_m4', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M4', year: 2024, kwh: 33, class: '—', note: '~14W avg' },
  { id: 'lap_mbp14_m4_pro', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M4 Pro', year: 2024, kwh: 50, class: '—', note: '~20W avg' },
  { id: 'lap_mbp14_m4_max', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M4 Max', year: 2024, kwh: 66, class: '—', note: '~27W avg' },
  { id: 'lap_mbp16_m4_pro', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 16" M4 Pro', year: 2024, kwh: 58, class: '—', note: '~24W avg' },
  { id: 'lap_mbp16_m4_max', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 16" M4 Max', year: 2024, kwh: 77, class: '—', note: '~31W avg Creative Pro' },

  // ============================================================
  // LAPTOPS — Lenovo ThinkPad
  // ============================================================
  { id: 'lap_tp_x1c_g11', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 11', year: 2023, kwh: 48, class: '—', note: '~20W avg Office' },
  { id: 'lap_tp_x1c_g12', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 12', year: 2024, kwh: 50, class: '—', note: '~20W avg Office, Core Ultra' },
  { id: 'lap_tp_x1c_g13', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 13', year: 2025, kwh: 46, class: '—', note: '~19W avg, Lunar Lake' },
  { id: 'lap_tp_x1_yoga_g8', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Yoga Gen 8', year: 2023, kwh: 52, class: '—', note: '~22W avg 2-in-1' },
  { id: 'lap_tp_t14_g5', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad T14 Gen 5', year: 2024, kwh: 55, class: '—', note: '~23W avg Business' },
  { id: 'lap_tp_t16_g3', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad T16 Gen 3', year: 2024, kwh: 62, class: '—', note: '~26W avg 16" Business' },
  { id: 'lap_tp_p14s_g5', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad P14s Gen 5', year: 2024, kwh: 70, class: '—', note: '~28W Mobile Workstation' },
  { id: 'lap_tp_p16_g3', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad P16 Gen 3', year: 2024, kwh: 150, class: '—', note: '~62W Mobile Workstation RTX' },
  { id: 'lap_tp_x1_nano_g3', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Nano Gen 3', year: 2023, kwh: 41, class: '—', note: '~17W avg Ultra-Light' },
  { id: 'lap_lenovo_yoga_slim_7x', category: 'laptop', brand: 'Lenovo', model: 'Yoga Slim 7x Snapdragon X', year: 2024, kwh: 40, class: '—', note: '~17W ARM-Windows' },
  { id: 'lap_lenovo_legion_pro_7i', category: 'laptop', brand: 'Lenovo', model: 'Legion Pro 7i Gen 9', year: 2024, kwh: 215, class: '—', note: '~90W Gaming RTX 4080' },

  // ============================================================
  // LAPTOPS — Dell
  // ============================================================
  { id: 'lap_dell_xps13_2024', category: 'laptop', brand: 'Dell', model: 'XPS 13 9340 (2024)', year: 2024, kwh: 48, class: '—', note: '~20W avg Ultrabook' },
  { id: 'lap_dell_xps14_2024', category: 'laptop', brand: 'Dell', model: 'XPS 14 9440', year: 2024, kwh: 62, class: '—', note: '~26W avg mit RTX' },
  { id: 'lap_dell_xps15_2024', category: 'laptop', brand: 'Dell', model: 'XPS 15 9550', year: 2024, kwh: 95, class: '—', note: '~40W mit RTX 4070' },
  { id: 'lap_dell_xps16_2024', category: 'laptop', brand: 'Dell', model: 'XPS 16 9650', year: 2024, kwh: 110, class: '—', note: '~45W Creator Laptop' },
  { id: 'lap_dell_latitude_7450', category: 'laptop', brand: 'Dell', model: 'Latitude 7450', year: 2024, kwh: 52, class: '—', note: '~22W Business' },
  { id: 'lap_dell_latitude_9450', category: 'laptop', brand: 'Dell', model: 'Latitude 9450', year: 2024, kwh: 48, class: '—', note: '~20W Premium Business' },
  { id: 'lap_dell_precision_5690', category: 'laptop', brand: 'Dell', model: 'Precision 5690', year: 2024, kwh: 145, class: '—', note: '~60W Mobile Workstation' },
  { id: 'lap_dell_alienware_m18_r2', category: 'laptop', brand: 'Alienware', model: 'm18 R2 (2024)', year: 2024, kwh: 245, class: '—', note: '~100W Gaming RTX 4090' },

  // ============================================================
  // LAPTOPS — HP
  // ============================================================
  { id: 'lap_hp_spectre_x360_14', category: 'laptop', brand: 'HP', model: 'Spectre x360 14 (2024)', year: 2024, kwh: 52, class: '—', note: '~22W 2-in-1 Premium' },
  { id: 'lap_hp_spectre_x360_16', category: 'laptop', brand: 'HP', model: 'Spectre x360 16 (2024)', year: 2024, kwh: 68, class: '—', note: '~28W 16" Convertible' },
  { id: 'lap_hp_elitebook_840_g11', category: 'laptop', brand: 'HP', model: 'EliteBook 840 G11', year: 2024, kwh: 55, class: '—', note: '~23W Business' },
  { id: 'lap_hp_elitebook_860_g11', category: 'laptop', brand: 'HP', model: 'EliteBook 860 G11', year: 2024, kwh: 60, class: '—', note: '~25W 16" Business' },
  { id: 'lap_hp_elitebook_ultra_g1q', category: 'laptop', brand: 'HP', model: 'EliteBook Ultra G1q (Snapdragon)', year: 2024, kwh: 38, class: '—', note: '~16W ARM Business' },
  { id: 'lap_hp_omen_transcend_16', category: 'laptop', brand: 'HP', model: 'Omen Transcend 16', year: 2024, kwh: 200, class: '—', note: '~83W Gaming RTX 4080' },
  { id: 'lap_hp_zbook_firefly_g11', category: 'laptop', brand: 'HP', model: 'ZBook Firefly 14 G11', year: 2024, kwh: 68, class: '—', note: '~28W Mobile Workstation' },
  { id: 'lap_hp_omnibook_ultra', category: 'laptop', brand: 'HP', model: 'OmniBook Ultra 14', year: 2024, kwh: 55, class: '—', note: '~23W AI PC' },

  // ============================================================
  // LAPTOPS — Asus
  // ============================================================
  { id: 'lap_asus_zenbook_14_oled', category: 'laptop', brand: 'Asus', model: 'Zenbook 14 OLED UX3405', year: 2024, kwh: 48, class: '—', note: '~20W OLED Ultrabook' },
  { id: 'lap_asus_zenbook_14x_oled', category: 'laptop', brand: 'Asus', model: 'Zenbook 14X OLED Space Edition', year: 2024, kwh: 58, class: '—', note: '~24W OLED Mid-Range' },
  { id: 'lap_asus_zenbook_s16', category: 'laptop', brand: 'Asus', model: 'Zenbook S 16 OLED (Ryzen AI)', year: 2024, kwh: 55, class: '—', note: '~23W 16" Ultrabook' },
  { id: 'lap_asus_zenbook_duo_2024', category: 'laptop', brand: 'Asus', model: 'Zenbook Duo UX8406', year: 2024, kwh: 72, class: '—', note: '~30W Dual-Screen' },
  { id: 'lap_asus_rog_zephyrus_g14', category: 'laptop', brand: 'Asus', model: 'ROG Zephyrus G14 (2024)', year: 2024, kwh: 145, class: '—', note: '~60W Gaming RTX 4070' },
  { id: 'lap_asus_rog_zephyrus_g16', category: 'laptop', brand: 'Asus', model: 'ROG Zephyrus G16 (2024)', year: 2024, kwh: 175, class: '—', note: '~72W Gaming RTX 4080' },
  { id: 'lap_asus_rog_strix_g16', category: 'laptop', brand: 'Asus', model: 'ROG Strix G16 (2024)', year: 2024, kwh: 210, class: '—', note: '~87W Gaming Performance' },
  { id: 'lap_asus_rog_strix_scar_18', category: 'laptop', brand: 'Asus', model: 'ROG Strix Scar 18 (2024)', year: 2024, kwh: 265, class: '—', note: '~110W Gaming RTX 4090' },
  { id: 'lap_asus_proart_studiobook_16', category: 'laptop', brand: 'Asus', model: 'ProArt Studiobook 16 OLED', year: 2024, kwh: 155, class: '—', note: '~64W Creator RTX 4070' },
  { id: 'lap_asus_vivobook_s_15', category: 'laptop', brand: 'Asus', model: 'Vivobook S 15 (Snapdragon X)', year: 2024, kwh: 46, class: '—', note: '~19W ARM-Windows' },

  // ============================================================
  // LAPTOPS — Razer / MSI / Framework / Microsoft / Samsung / LG
  // ============================================================
  { id: 'lap_razer_blade_14_2024', category: 'laptop', brand: 'Razer', model: 'Blade 14 (2024)', year: 2024, kwh: 140, class: '—', note: '~58W Gaming RTX 4070' },
  { id: 'lap_razer_blade_16_2024', category: 'laptop', brand: 'Razer', model: 'Blade 16 (2024)', year: 2024, kwh: 195, class: '—', note: '~80W Gaming RTX 4090' },
  { id: 'lap_razer_blade_18_2024', category: 'laptop', brand: 'Razer', model: 'Blade 18 (2024)', year: 2024, kwh: 238, class: '—', note: '~98W Gaming RTX 4090' },
  { id: 'lap_msi_titan_18_hx', category: 'laptop', brand: 'MSI', model: 'Titan 18 HX A14V', year: 2024, kwh: 275, class: '—', note: '~113W Desktop-Replacement' },
  { id: 'lap_msi_raider_18_hx', category: 'laptop', brand: 'MSI', model: 'Raider 18 HX A14V', year: 2024, kwh: 242, class: '—', note: '~100W Gaming High-End' },
  { id: 'lap_msi_stealth_16_ai', category: 'laptop', brand: 'MSI', model: 'Stealth 16 AI Studio', year: 2024, kwh: 162, class: '—', note: '~67W Slim Gaming' },
  { id: 'lap_framework_13_amd', category: 'laptop', brand: 'Framework', model: 'Laptop 13 (Ryzen 7840U)', year: 2024, kwh: 52, class: '—', note: '~22W modular reparierbar' },
  { id: 'lap_framework_16', category: 'laptop', brand: 'Framework', model: 'Laptop 16 (RX 7700S)', year: 2024, kwh: 105, class: '—', note: '~43W modular Gaming' },
  { id: 'lap_surface_laptop_6', category: 'laptop', brand: 'Microsoft', model: 'Surface Laptop 6 Business', year: 2024, kwh: 50, class: '—', note: '~21W Business' },
  { id: 'lap_surface_laptop_7', category: 'laptop', brand: 'Microsoft', model: 'Surface Laptop 7 (Snapdragon X)', year: 2024, kwh: 42, class: '—', note: '~18W ARM Copilot+ PC' },
  { id: 'lap_surface_laptop_studio_2', category: 'laptop', brand: 'Microsoft', model: 'Surface Laptop Studio 2', year: 2023, kwh: 95, class: '—', note: '~40W Creator mit RTX 4060' },
  { id: 'lap_samsung_galaxy_book4_pro', category: 'laptop', brand: 'Samsung', model: 'Galaxy Book4 Pro', year: 2024, kwh: 45, class: '—', note: '~19W AMOLED Ultrabook' },
  { id: 'lap_samsung_galaxy_book4_edge', category: 'laptop', brand: 'Samsung', model: 'Galaxy Book4 Edge (Snapdragon X)', year: 2024, kwh: 40, class: '—', note: '~17W ARM-Windows' },
  { id: 'lap_lg_gram_17_2024', category: 'laptop', brand: 'LG', model: 'Gram 17 (2024)', year: 2024, kwh: 55, class: '—', note: '~23W Ultra-Light 17"' },
  { id: 'lap_lg_gram_pro_16', category: 'laptop', brand: 'LG', model: 'Gram Pro 16 (2024)', year: 2024, kwh: 72, class: '—', note: '~30W mit RTX 3050' },
  { id: 'lap_acer_swift_go_14', category: 'laptop', brand: 'Acer', model: 'Swift Go 14 (2024)', year: 2024, kwh: 45, class: '—', note: '~19W Mid-Range' },

  // ============================================================
  // SMARTPHONES — Apple iPhone
  // ============================================================
  { id: 'phone_iphone_13', category: 'phone', brand: 'Apple', model: 'iPhone 13', year: 2021, kwh: 7, class: '—', note: '3227 mAh, ~1.2× Zyklus/Tag' },
  { id: 'phone_iphone_13_mini', category: 'phone', brand: 'Apple', model: 'iPhone 13 mini', year: 2021, kwh: 5, class: '—', note: '2406 mAh' },
  { id: 'phone_iphone_13_pro', category: 'phone', brand: 'Apple', model: 'iPhone 13 Pro', year: 2021, kwh: 7, class: '—', note: '3095 mAh' },
  { id: 'phone_iphone_13_pro_max', category: 'phone', brand: 'Apple', model: 'iPhone 13 Pro Max', year: 2021, kwh: 9, class: '—', note: '4352 mAh' },
  { id: 'phone_iphone_14', category: 'phone', brand: 'Apple', model: 'iPhone 14', year: 2022, kwh: 7, class: '—', note: '3279 mAh' },
  { id: 'phone_iphone_14_plus', category: 'phone', brand: 'Apple', model: 'iPhone 14 Plus', year: 2022, kwh: 9, class: '—', note: '4325 mAh' },
  { id: 'phone_iphone_14_pro', category: 'phone', brand: 'Apple', model: 'iPhone 14 Pro', year: 2022, kwh: 7, class: '—', note: '3200 mAh, Always-On +5%' },
  { id: 'phone_iphone_14_pro_max', category: 'phone', brand: 'Apple', model: 'iPhone 14 Pro Max', year: 2022, kwh: 10, class: '—', note: '4323 mAh, Always-On' },
  { id: 'phone_iphone_15', category: 'phone', brand: 'Apple', model: 'iPhone 15', year: 2023, kwh: 7, class: '—', note: '3349 mAh, USB-C' },
  { id: 'phone_iphone_15_plus', category: 'phone', brand: 'Apple', model: 'iPhone 15 Plus', year: 2023, kwh: 9, class: '—', note: '4383 mAh' },
  { id: 'phone_iphone_15_pro', category: 'phone', brand: 'Apple', model: 'iPhone 15 Pro', year: 2023, kwh: 7, class: '—', note: '3274 mAh, Titan' },
  { id: 'phone_iphone_15_pro_max', category: 'phone', brand: 'Apple', model: 'iPhone 15 Pro Max', year: 2023, kwh: 10, class: '—', note: '4422 mAh, Titan Tele 5x' },
  { id: 'phone_iphone_16', category: 'phone', brand: 'Apple', model: 'iPhone 16', year: 2024, kwh: 8, class: '—', note: '3561 mAh, A18' },
  { id: 'phone_iphone_16_plus', category: 'phone', brand: 'Apple', model: 'iPhone 16 Plus', year: 2024, kwh: 10, class: '—', note: '4674 mAh, A18' },
  { id: 'phone_iphone_16_pro', category: 'phone', brand: 'Apple', model: 'iPhone 16 Pro', year: 2024, kwh: 8, class: '—', note: '3582 mAh, Apple Intelligence' },
  { id: 'phone_iphone_16_pro_max', category: 'phone', brand: 'Apple', model: 'iPhone 16 Pro Max', year: 2024, kwh: 11, class: '—', note: '4685 mAh, A18 Pro' },
  { id: 'phone_iphone_se_3', category: 'phone', brand: 'Apple', model: 'iPhone SE (3. Gen)', year: 2022, kwh: 5, class: '—', note: '2018 mAh' },
  { id: 'phone_iphone_16e', category: 'phone', brand: 'Apple', model: 'iPhone 16e', year: 2025, kwh: 7, class: '—', note: '3961 mAh, budget-Modell' },

  // ============================================================
  // SMARTPHONES — Samsung Galaxy
  // ============================================================
  { id: 'phone_s23', category: 'phone', brand: 'Samsung', model: 'Galaxy S23', year: 2023, kwh: 8, class: '—', note: '3900 mAh' },
  { id: 'phone_s23_plus', category: 'phone', brand: 'Samsung', model: 'Galaxy S23+', year: 2023, kwh: 10, class: '—', note: '4700 mAh' },
  { id: 'phone_s23_ultra', category: 'phone', brand: 'Samsung', model: 'Galaxy S23 Ultra', year: 2023, kwh: 11, class: '—', note: '5000 mAh, S Pen' },
  { id: 'phone_s24', category: 'phone', brand: 'Samsung', model: 'Galaxy S24', year: 2024, kwh: 9, class: '—', note: '4000 mAh, Galaxy AI' },
  { id: 'phone_s24_plus', category: 'phone', brand: 'Samsung', model: 'Galaxy S24+', year: 2024, kwh: 10, class: '—', note: '4900 mAh' },
  { id: 'phone_s24_ultra', category: 'phone', brand: 'Samsung', model: 'Galaxy S24 Ultra', year: 2024, kwh: 11, class: '—', note: '5000 mAh, Titan, S Pen' },
  { id: 'phone_s24_fe', category: 'phone', brand: 'Samsung', model: 'Galaxy S24 FE', year: 2024, kwh: 10, class: '—', note: '4700 mAh' },
  { id: 'phone_s25', category: 'phone', brand: 'Samsung', model: 'Galaxy S25', year: 2025, kwh: 9, class: '—', note: '4000 mAh, Snapdragon 8 Elite' },
  { id: 'phone_s25_plus', category: 'phone', brand: 'Samsung', model: 'Galaxy S25+', year: 2025, kwh: 10, class: '—', note: '4900 mAh' },
  { id: 'phone_s25_ultra', category: 'phone', brand: 'Samsung', model: 'Galaxy S25 Ultra', year: 2025, kwh: 11, class: '—', note: '5000 mAh, Titan Frame' },
  { id: 'phone_z_flip5', category: 'phone', brand: 'Samsung', model: 'Galaxy Z Flip5', year: 2023, kwh: 8, class: '—', note: '3700 mAh Foldable' },
  { id: 'phone_z_flip6', category: 'phone', brand: 'Samsung', model: 'Galaxy Z Flip6', year: 2024, kwh: 9, class: '—', note: '4000 mAh Foldable' },
  { id: 'phone_z_fold5', category: 'phone', brand: 'Samsung', model: 'Galaxy Z Fold5', year: 2023, kwh: 10, class: '—', note: '4400 mAh Foldable' },
  { id: 'phone_z_fold6', category: 'phone', brand: 'Samsung', model: 'Galaxy Z Fold6', year: 2024, kwh: 10, class: '—', note: '4400 mAh Foldable' },
  { id: 'phone_galaxy_a55', category: 'phone', brand: 'Samsung', model: 'Galaxy A55 5G', year: 2024, kwh: 11, class: '—', note: '5000 mAh Mid-Range' },
  { id: 'phone_galaxy_a35', category: 'phone', brand: 'Samsung', model: 'Galaxy A35 5G', year: 2024, kwh: 11, class: '—', note: '5000 mAh Budget' },

  // ============================================================
  // SMARTPHONES — Google Pixel
  // ============================================================
  { id: 'phone_pixel_7', category: 'phone', brand: 'Google', model: 'Pixel 7', year: 2022, kwh: 9, class: '—', note: '4355 mAh' },
  { id: 'phone_pixel_7_pro', category: 'phone', brand: 'Google', model: 'Pixel 7 Pro', year: 2022, kwh: 11, class: '—', note: '5000 mAh' },
  { id: 'phone_pixel_7a', category: 'phone', brand: 'Google', model: 'Pixel 7a', year: 2023, kwh: 9, class: '—', note: '4385 mAh Budget-Pro' },
  { id: 'phone_pixel_8', category: 'phone', brand: 'Google', model: 'Pixel 8', year: 2023, kwh: 10, class: '—', note: '4575 mAh, Gemini' },
  { id: 'phone_pixel_8_pro', category: 'phone', brand: 'Google', model: 'Pixel 8 Pro', year: 2023, kwh: 11, class: '—', note: '5050 mAh, Temp-Sensor' },
  { id: 'phone_pixel_8a', category: 'phone', brand: 'Google', model: 'Pixel 8a', year: 2024, kwh: 10, class: '—', note: '4492 mAh' },
  { id: 'phone_pixel_9', category: 'phone', brand: 'Google', model: 'Pixel 9', year: 2024, kwh: 10, class: '—', note: '4700 mAh Tensor G4' },
  { id: 'phone_pixel_9_pro', category: 'phone', brand: 'Google', model: 'Pixel 9 Pro', year: 2024, kwh: 10, class: '—', note: '4700 mAh' },
  { id: 'phone_pixel_9_pro_xl', category: 'phone', brand: 'Google', model: 'Pixel 9 Pro XL', year: 2024, kwh: 11, class: '—', note: '5060 mAh' },
  { id: 'phone_pixel_9_pro_fold', category: 'phone', brand: 'Google', model: 'Pixel 9 Pro Fold', year: 2024, kwh: 10, class: '—', note: '4650 mAh Foldable' },
  { id: 'phone_pixel_9a', category: 'phone', brand: 'Google', model: 'Pixel 9a', year: 2025, kwh: 11, class: '—', note: '5100 mAh Mid-Range' },

  // ============================================================
  // SMARTPHONES — OnePlus / Xiaomi / Nothing / Honor
  // ============================================================
  { id: 'phone_oneplus_11', category: 'phone', brand: 'OnePlus', model: 'OnePlus 11', year: 2023, kwh: 11, class: '—', note: '5000 mAh, 100W laden' },
  { id: 'phone_oneplus_12', category: 'phone', brand: 'OnePlus', model: 'OnePlus 12', year: 2024, kwh: 12, class: '—', note: '5400 mAh, 100W laden' },
  { id: 'phone_oneplus_13', category: 'phone', brand: 'OnePlus', model: 'OnePlus 13', year: 2025, kwh: 13, class: '—', note: '6000 mAh Silicon Carbon' },
  { id: 'phone_oneplus_open', category: 'phone', brand: 'OnePlus', model: 'OnePlus Open', year: 2023, kwh: 10, class: '—', note: '4805 mAh Foldable' },
  { id: 'phone_xiaomi_13', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 13', year: 2023, kwh: 10, class: '—', note: '4500 mAh' },
  { id: 'phone_xiaomi_14', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 14', year: 2024, kwh: 10, class: '—', note: '4610 mAh, Leica' },
  { id: 'phone_xiaomi_14_ultra', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 14 Ultra', year: 2024, kwh: 11, class: '—', note: '5300 mAh Leica Quad' },
  { id: 'phone_xiaomi_15', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 15', year: 2024, kwh: 11, class: '—', note: '5240 mAh Snapdragon 8 Elite' },
  { id: 'phone_xiaomi_15_ultra', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 15 Ultra', year: 2025, kwh: 13, class: '—', note: '6000 mAh Leica Optic 200MP' },
  { id: 'phone_xiaomi_14t_pro', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 14T Pro', year: 2024, kwh: 11, class: '—', note: '5000 mAh Mid-High' },
  { id: 'phone_nothing_2', category: 'phone', brand: 'Nothing', model: 'Phone (2)', year: 2023, kwh: 10, class: '—', note: '4700 mAh Glyph Interface' },
  { id: 'phone_nothing_2a', category: 'phone', brand: 'Nothing', model: 'Phone (2a)', year: 2024, kwh: 11, class: '—', note: '5000 mAh Mid-Range' },
  { id: 'phone_nothing_3a_pro', category: 'phone', brand: 'Nothing', model: 'Phone (3a) Pro', year: 2025, kwh: 11, class: '—', note: '5000 mAh Mid-Range' },
  { id: 'phone_honor_magic6_pro', category: 'phone', brand: 'Honor', model: 'Magic6 Pro', year: 2024, kwh: 12, class: '—', note: '5600 mAh Silicon-Carbon' },
  { id: 'phone_honor_magic_v3', category: 'phone', brand: 'Honor', model: 'Magic V3', year: 2024, kwh: 11, class: '—', note: '5150 mAh Ultra-Slim Foldable' },

  // ============================================================
  // TABLETS — Apple iPad
  // ============================================================
  { id: 'tab_ipad_10', category: 'tablet', brand: 'Apple', model: 'iPad (10. Gen)', year: 2022, kwh: 12, class: '—', note: '28.6 Wh Akku' },
  { id: 'tab_ipad_11', category: 'tablet', brand: 'Apple', model: 'iPad (11. Gen A16)', year: 2025, kwh: 12, class: '—', note: '28.9 Wh Akku' },
  { id: 'tab_ipad_mini_6', category: 'tablet', brand: 'Apple', model: 'iPad Mini (6. Gen)', year: 2021, kwh: 8, class: '—', note: '19.3 Wh Akku' },
  { id: 'tab_ipad_mini_7', category: 'tablet', brand: 'Apple', model: 'iPad Mini (7. Gen)', year: 2024, kwh: 8, class: '—', note: '19.3 Wh Akku, A17 Pro' },
  { id: 'tab_ipad_air_m1_11', category: 'tablet', brand: 'Apple', model: 'iPad Air 11" M1', year: 2022, kwh: 13, class: '—', note: '28.6 Wh' },
  { id: 'tab_ipad_air_m2_11', category: 'tablet', brand: 'Apple', model: 'iPad Air 11" M2', year: 2024, kwh: 13, class: '—', note: '28.9 Wh' },
  { id: 'tab_ipad_air_m2_13', category: 'tablet', brand: 'Apple', model: 'iPad Air 13" M2', year: 2024, kwh: 15, class: '—', note: '36.6 Wh' },
  { id: 'tab_ipad_pro_m2_11', category: 'tablet', brand: 'Apple', model: 'iPad Pro 11" M2', year: 2022, kwh: 15, class: '—', note: '28.6 Wh ProMotion' },
  { id: 'tab_ipad_pro_m2_13', category: 'tablet', brand: 'Apple', model: 'iPad Pro 12.9" M2', year: 2022, kwh: 18, class: '—', note: '40.9 Wh Mini-LED' },
  { id: 'tab_ipad_pro_m4_11', category: 'tablet', brand: 'Apple', model: 'iPad Pro 11" M4', year: 2024, kwh: 14, class: '—', note: '31.3 Wh Tandem OLED' },
  { id: 'tab_ipad_pro_m4_13', category: 'tablet', brand: 'Apple', model: 'iPad Pro 13" M4', year: 2024, kwh: 18, class: '—', note: '38.9 Wh Tandem OLED' },

  // ============================================================
  // TABLETS — Samsung Galaxy Tab
  // ============================================================
  { id: 'tab_galaxy_s9', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S9', year: 2023, kwh: 14, class: '—', note: '8400 mAh S Pen' },
  { id: 'tab_galaxy_s9_plus', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S9+', year: 2023, kwh: 16, class: '—', note: '10090 mAh' },
  { id: 'tab_galaxy_s9_ultra', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S9 Ultra', year: 2023, kwh: 18, class: '—', note: '11200 mAh 14.6" AMOLED' },
  { id: 'tab_galaxy_s9_fe', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S9 FE', year: 2023, kwh: 14, class: '—', note: '8000 mAh Mid-Range' },
  { id: 'tab_galaxy_s9_fe_plus', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S9 FE+', year: 2023, kwh: 16, class: '—', note: '10090 mAh 12.4"' },
  { id: 'tab_galaxy_s10_plus', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S10+', year: 2024, kwh: 16, class: '—', note: '10090 mAh 12.4" AMOLED' },
  { id: 'tab_galaxy_s10_ultra', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S10 Ultra', year: 2024, kwh: 18, class: '—', note: '11200 mAh 14.6" Dimensity' },
  { id: 'tab_galaxy_a9_plus', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab A9+', year: 2023, kwh: 12, class: '—', note: '7040 mAh Budget' },

  // ============================================================
  // TABLETS — Microsoft Surface
  // ============================================================
  { id: 'tab_surface_pro_9', category: 'tablet', brand: 'Microsoft', model: 'Surface Pro 9', year: 2022, kwh: 28, class: '—', note: 'Windows Tablet 47Wh' },
  { id: 'tab_surface_pro_10', category: 'tablet', brand: 'Microsoft', model: 'Surface Pro 10 Business', year: 2024, kwh: 30, class: '—', note: 'Core Ultra, Business' },
  { id: 'tab_surface_pro_11', category: 'tablet', brand: 'Microsoft', model: 'Surface Pro 11 (Snapdragon X)', year: 2024, kwh: 24, class: '—', note: 'ARM Copilot+ PC' },
  { id: 'tab_surface_go_4', category: 'tablet', brand: 'Microsoft', model: 'Surface Go 4 Business', year: 2023, kwh: 22, class: '—', note: 'Intel N200' },

  // ============================================================
  // TABLETS — Lenovo / Xiaomi / Huawei / OnePlus
  // ============================================================
  { id: 'tab_lenovo_tab_p12_pro', category: 'tablet', brand: 'Lenovo', model: 'Tab P12 Pro', year: 2023, kwh: 14, class: '—', note: '8600 mAh 12.7" 3K' },
  { id: 'tab_lenovo_yoga_tab_plus', category: 'tablet', brand: 'Lenovo', model: 'Yoga Tab Plus', year: 2024, kwh: 17, class: '—', note: '10200 mAh 12.7" 3K' },
  { id: 'tab_lenovo_legion_tab', category: 'tablet', brand: 'Lenovo', model: 'Legion Tab (2024)', year: 2024, kwh: 14, class: '—', note: '6550 mAh Gaming-Tablet' },
  { id: 'tab_xiaomi_pad_6', category: 'tablet', brand: 'Xiaomi', model: 'Pad 6', year: 2023, kwh: 13, class: '—', note: '8840 mAh' },
  { id: 'tab_xiaomi_pad_6_pro', category: 'tablet', brand: 'Xiaomi', model: 'Pad 6 Pro', year: 2023, kwh: 13, class: '—', note: '8600 mAh Snapdragon 8+' },
  { id: 'tab_xiaomi_pad_7_pro', category: 'tablet', brand: 'Xiaomi', model: 'Pad 7 Pro', year: 2024, kwh: 14, class: '—', note: '8850 mAh Snapdragon 8 Gen 3' },
  { id: 'tab_huawei_matepad_pro', category: 'tablet', brand: 'Huawei', model: 'MatePad Pro 13.2"', year: 2024, kwh: 17, class: '—', note: '10100 mAh OLED' },
  { id: 'tab_oneplus_pad_2', category: 'tablet', brand: 'OnePlus', model: 'Pad 2', year: 2024, kwh: 15, class: '—', note: '9510 mAh 3K Display' },

  // ============================================================
  // WEARABLES
  // ============================================================
  { id: 'wear_apple_watch_s10', category: 'wearable', brand: 'Apple', model: 'Apple Watch Series 10', year: 2024, kwh: 2, class: '—', note: 'Tägliches Laden' },
  { id: 'wear_apple_watch_ultra2', category: 'wearable', brand: 'Apple', model: 'Apple Watch Ultra 2', year: 2023, kwh: 2, class: '—', note: 'Alle 2-3 Tage laden' },
  { id: 'wear_galaxy_watch_7', category: 'wearable', brand: 'Samsung', model: 'Galaxy Watch 7', year: 2024, kwh: 2, class: '—', note: 'BioActive Sensor' },
  { id: 'wear_pixel_watch_3', category: 'wearable', brand: 'Google', model: 'Pixel Watch 3', year: 2024, kwh: 2, class: '—', note: 'Fitbit-Integration' },
  { id: 'wear_garmin_fenix_8', category: 'wearable', brand: 'Garmin', model: 'Fenix 8', year: 2024, kwh: 1, class: '—', note: '2-3 Wochen Laufzeit' },
  { id: 'wear_airpods_pro_2', category: 'wearable', brand: 'Apple', model: 'AirPods Pro 2 (USB-C)', year: 2023, kwh: 3, class: '—', note: 'Täglich laden im Case' },
  { id: 'wear_airpods_4', category: 'wearable', brand: 'Apple', model: 'AirPods 4 ANC', year: 2024, kwh: 3, class: '—', note: 'USB-C Case' },
  { id: 'wear_airpods_max', category: 'wearable', brand: 'Apple', model: 'AirPods Max (USB-C)', year: 2024, kwh: 5, class: '—', note: 'Over-Ear Kopfhörer' },
  { id: 'wear_sony_wh1000xm5', category: 'wearable', brand: 'Sony', model: 'WH-1000XM5', year: 2023, kwh: 4, class: '—', note: 'Premium ANC' },
  { id: 'wear_bose_qc_ultra', category: 'wearable', brand: 'Bose', model: 'QuietComfort Ultra Headphones', year: 2023, kwh: 4, class: '—', note: 'Flagship ANC' },
  { id: 'wear_meta_quest_3', category: 'wearable', brand: 'Meta', model: 'Quest 3', year: 2023, kwh: 25, class: '—', note: 'VR-Headset ~15W/h, ~3h/Woche' },
  { id: 'wear_meta_quest_3s', category: 'wearable', brand: 'Meta', model: 'Quest 3S', year: 2024, kwh: 22, class: '—', note: 'VR-Headset Budget-Version' },
  { id: 'wear_apple_vision_pro', category: 'wearable', brand: 'Apple', model: 'Vision Pro', year: 2024, kwh: 45, class: '—', note: 'Spatial Computing ~35W/h' },

  // ============================================================
  // KLIMAANLAGEN
  // ============================================================
  { id: 'ac_mitsubishi_msz_ap35', category: 'aircon', brand: 'Mitsubishi Electric', model: 'MSZ-AP35VGK Split', year: 2024, kwh: 550, class: 'A+++', note: 'Split 3.5kW Saison' },
  { id: 'ac_daikin_ftxm35r', category: 'aircon', brand: 'Daikin', model: 'FTXM35R Perfera Split', year: 2024, kwh: 580, class: 'A+++', note: 'Split 3.5kW Heizfunktion' },
  { id: 'ac_daikin_ftxj25', category: 'aircon', brand: 'Daikin', model: 'FTXJ25MW Emura Split', year: 2023, kwh: 475, class: 'A+++', note: 'Split 2.5kW Design' },
  { id: 'ac_panasonic_cs_z35', category: 'aircon', brand: 'Panasonic', model: 'CS-Z35ZKEW Etherea', year: 2024, kwh: 525, class: 'A+++', note: 'Split 3.5kW nanoe-X' },
  { id: 'ac_delonghi_pac_el112', category: 'aircon', brand: 'De\'Longhi', model: 'Pinguino PAC EL112CST', year: 2024, kwh: 450, class: 'A', note: 'Mobile Klimaanlage' },
  { id: 'ac_midea_portable', category: 'aircon', brand: 'Midea', model: 'Silent Cool 26 Pro', year: 2024, kwh: 380, class: 'A', note: 'Mobile Klimaanlage' },
  { id: 'ac_stadlerform_theo', category: 'aircon', brand: 'Stadler Form', model: 'Theo Klimagerät', year: 2023, kwh: 420, class: 'A', note: 'Schweizer Marke' },
  { id: 'ac_fan_dyson_tp09', category: 'aircon', brand: 'Dyson', model: 'Purifier Cool TP09', year: 2023, kwh: 55, class: '—', note: 'Ventilator mit Filter' },

  // ============================================================
  // HAUSHALT-KLEINGERÄTE
  // ============================================================
  { id: 'misc_vacuum_dyson_v15', category: 'small_misc', brand: 'Dyson', model: 'V15 Detect Absolute', year: 2024, kwh: 18, class: '—', note: 'Akku-Staubsauger' },
  { id: 'misc_robot_roborock_s8', category: 'small_misc', brand: 'Roborock', model: 'S8 MaxV Ultra', year: 2024, kwh: 55, class: '—', note: 'Saugroboter mit Station' },
  { id: 'misc_robot_dreame_x40', category: 'small_misc', brand: 'Dreame', model: 'X40 Ultra', year: 2024, kwh: 60, class: '—', note: 'Saugroboter Premium' },
  { id: 'misc_iron_philips_azur', category: 'small_misc', brand: 'Philips', model: 'PerfectCare 8000 Series', year: 2024, kwh: 45, class: '—', note: 'Dampfbügelstation' },
  { id: 'misc_hairdryer_dyson', category: 'small_misc', brand: 'Dyson', model: 'Supersonic Nural', year: 2024, kwh: 30, class: '—', note: 'Premium-Föhn' },
  { id: 'misc_straightener_ghd', category: 'small_misc', brand: 'GHD', model: 'Platinum+ Styler', year: 2024, kwh: 15, class: '—', note: 'Glätteisen' },
  { id: 'misc_dehumidifier_stadler', category: 'small_misc', brand: 'Stadler Form', model: 'Theo Luftentfeuchter', year: 2024, kwh: 280, class: '—', note: 'Entfeuchter, Keller-Saison' },

  // ============================================================
  // BELEUCHTUNG
  // ============================================================
  { id: 'light_philips_hue_kit', category: 'lighting', brand: 'Philips Hue', model: 'Smart Lighting Ökosystem (10 Lampen)', year: 2024, kwh: 95, class: '—', note: '~6W avg × 10 Lampen' },
  { id: 'light_led_strip', category: 'lighting', brand: 'Generic', model: 'LED-Strip Deckenbeleuchtung 10m', year: 2024, kwh: 65, class: '—', note: '~14W × 4h/Tag' },
  { id: 'light_aquarium_pro', category: 'lighting', brand: 'Generic', model: 'Aquarium Pro LED (200L)', year: 2024, kwh: 160, class: '—', note: '~30W × 14h/Tag' },
  { id: 'light_grow_lights', category: 'lighting', brand: 'Generic', model: 'Pflanzen-Growlight (indoor)', year: 2024, kwh: 110, class: '—', note: '~75W × 4h/Tag' },

  // ============================================================
  // SPEZIAL
  // ============================================================
  { id: 'special_aquarium_200l', category: 'special', brand: 'Generic', model: 'Aquarium 200L beheizt', year: 2024, kwh: 450, class: '—', note: 'Heizung + Licht + Pumpe' },
  { id: 'special_sauna_home', category: 'special', brand: 'Generic', model: 'Heimsauna (6kW, 2x/Woche)', year: 2024, kwh: 1200, class: '—', note: 'Infrarot / Finnisch' },
  { id: 'special_hottub', category: 'special', brand: 'Generic', model: 'Whirlpool / Hot Tub ganzjährig', year: 2024, kwh: 3500, class: '—', note: 'Outdoor Premium' },
  { id: 'special_poolheater', category: 'special', brand: 'Generic', model: 'Poolheizung (Wärmepumpe, Saison)', year: 2024, kwh: 2200, class: '—', note: 'Saison-Nutzung' },
  { id: 'special_ev_charger_10k', category: 'special', brand: 'Generic', model: 'E-Auto-Laden 10\'000 km/J', year: 2024, kwh: 2000, class: '—', note: 'Durchschnittsverbrauch' },
  { id: 'special_ev_charger_15k', category: 'special', brand: 'Generic', model: 'E-Auto-Laden 15\'000 km/J', year: 2024, kwh: 3000, class: '—', note: 'Mitte' },
  { id: 'special_ev_charger_20k', category: 'special', brand: 'Generic', model: 'E-Auto-Laden 20\'000 km/J', year: 2024, kwh: 4000, class: '—', note: 'Pendler' },
  { id: 'special_ev_charger_30k', category: 'special', brand: 'Generic', model: 'E-Auto-Laden 30\'000 km/J', year: 2024, kwh: 6000, class: '—', note: 'Vielfahrer' },
  { id: 'special_heat_recovery', category: 'special', brand: 'Generic', model: 'Wohnraum-Lüftung WRG', year: 2024, kwh: 350, class: '—', note: 'Kontrollierte Lüftung' },
  { id: 'special_terrace_heater', category: 'special', brand: 'Generic', model: 'Infrarot-Terrassenstrahler', year: 2024, kwh: 200, class: '—', note: 'Saison' },
  { id: 'special_ebike_charging', category: 'special', brand: 'Generic', model: 'E-Bike laden (3×/Woche)', year: 2024, kwh: 80, class: '—', note: '500Wh Akku' },
  { id: 'special_heat_pump_air', category: 'special', brand: 'Generic', model: 'Luft-Wärmepumpe (Heizung)', year: 2024, kwh: 4500, class: 'A+++', note: 'Ersatz E-Heizung, 150m² Haus' },
  { id: 'special_heat_pump_ground', category: 'special', brand: 'Generic', model: 'Erdsonden-Wärmepumpe', year: 2024, kwh: 3200, class: 'A+++', note: '150m² Haus, effizienter' },
  { id: 'special_heat_pump_ground', category: 'special', brand: 'Generic', model: 'Erdsonden-Wärmepumpe', year: 2024, kwh: 3200, class: 'A+++', note: '150m² Haus, effizienter' },

  // ============================================================
  // KÜHLSCHRÄNKE — ERWEITERUNG
  // ============================================================
  { id: 'fridge_bosch_kgn39iact', category: 'fridge', brand: 'Bosch', model: 'KGN39IACT Serie 8', year: 2025, kwh: 168, class: 'C', note: '363L VitaFresh XXL' },
  { id: 'fridge_bosch_kgv33vleas', category: 'fridge', brand: 'Bosch', model: 'KGV33VLEAS Serie 4', year: 2023, kwh: 213, class: 'D', note: '288L LowFrost Standard' },
  { id: 'fridge_bosch_ksv29vleg', category: 'fridge', brand: 'Bosch', model: 'KSV29VLEG Vollraum', year: 2024, kwh: 105, class: 'E', note: '290L Vollraum-Kühlschrank' },
  { id: 'fridge_samsung_rs6ja8810', category: 'fridge', brand: 'Samsung', model: 'RS6JA8810S9 Side-by-Side', year: 2023, kwh: 365, class: 'E', note: '634L SbS SpaceMax' },
  { id: 'fridge_samsung_rf65a967', category: 'fridge', brand: 'Samsung', model: 'RF65A967ESR Family Hub', year: 2024, kwh: 392, class: 'E', note: '627L 4-Door Display' },
  { id: 'fridge_samsung_rb34c775', category: 'fridge', brand: 'Samsung', model: 'RB34C775CB1 Bespoke AI', year: 2024, kwh: 169, class: 'C', note: '344L AI Energy' },
  { id: 'fridge_lg_gsxv90mcae', category: 'fridge', brand: 'LG', model: 'GSXV90MCAE Side-by-Side', year: 2024, kwh: 408, class: 'E', note: '655L InstaView Door-in-Door' },
  { id: 'fridge_lg_gtb382sehzd', category: 'fridge', brand: 'LG', model: 'GTB382SEHZD Top-Mount', year: 2023, kwh: 215, class: 'D', note: '227L Top-Freezer' },
  { id: 'fridge_haier_hb18fgsaaa', category: 'fridge', brand: 'Haier', model: 'HB18FGSAAA French Door', year: 2024, kwh: 286, class: 'D', note: '551L French-Door' },
  { id: 'fridge_haier_h2f220wsaa', category: 'fridge', brand: 'Haier', model: 'H2F-220WSAA', year: 2023, kwh: 168, class: 'C', note: '218L NoFrost' },
  { id: 'fridge_aeg_rcb736e5mb', category: 'fridge', brand: 'AEG', model: 'RCB736E5MB Custom Flex', year: 2024, kwh: 167, class: 'C', note: '367L TwinTech' },
  { id: 'fridge_aeg_rcb646e5mw', category: 'fridge', brand: 'AEG', model: 'RCB646E5MW', year: 2024, kwh: 220, class: 'D', note: '321L Standard' },
  { id: 'fridge_beko_b3rcne404hxbr', category: 'fridge', brand: 'Beko', model: 'B3RCNE404HXBR', year: 2024, kwh: 204, class: 'D', note: '358L NoFrost Budget' },
  { id: 'fridge_beko_gn1426234zdxn', category: 'fridge', brand: 'Beko', model: 'GN1426234ZDXN American', year: 2023, kwh: 396, class: 'E', note: '614L American-Style' },
  { id: 'fridge_whirlpool_w7831aox', category: 'fridge', brand: 'Whirlpool', model: 'W7 831A OX', year: 2023, kwh: 184, class: 'D', note: '335L 6th Sense' },
  { id: 'fridge_smeg_fab28rdg5', category: 'fridge', brand: 'Smeg', model: 'FAB28RDG5 Retro', year: 2024, kwh: 158, class: 'D', note: '270L Retro-Design' },
  { id: 'fridge_gorenje_nrk6193axl4', category: 'fridge', brand: 'Gorenje', model: 'NRK6193AXL4', year: 2023, kwh: 199, class: 'D', note: '326L AdaptTech' },
  { id: 'fridge_hisense_rb645n4bie', category: 'fridge', brand: 'Hisense', model: 'RB645N4BIE PureFlat', year: 2024, kwh: 219, class: 'D', note: '495L Total NoFrost' },
  { id: 'fridge_panasonic_nrbn31ax2', category: 'fridge', brand: 'Panasonic', model: 'NR-BN31AX2', year: 2023, kwh: 163, class: 'C', note: '300L EcoNavi' },
  { id: 'fridge_sharp_sjbb05ntxlf', category: 'fridge', brand: 'Sharp', model: 'SJ-BB05NTXLF', year: 2023, kwh: 181, class: 'D', note: '294L Eco-Modus' },
  { id: 'fridge_hoover_hoce4t618ex', category: 'fridge', brand: 'Hoover', model: 'HOCE4T618EX', year: 2024, kwh: 234, class: 'D', note: '417L NoFrost' },
  { id: 'fridge_freezer_aeg_agb728e2nx', category: 'fridge', brand: 'AEG', model: 'AGB728E2NX Gefrierschrank', year: 2024, kwh: 218, class: 'D', note: '280L NoFrost Standgerät' },
  { id: 'fridge_freezer_beko_rfne312k31wn', category: 'fridge', brand: 'Beko', model: 'RFNE312K31WN', year: 2023, kwh: 248, class: 'E', note: '275L Gefrierschrank' },
  { id: 'fridge_chest_bosch_gtv15nwea', category: 'fridge', brand: 'Bosch', model: 'GTV15NWEA Truhe', year: 2023, kwh: 168, class: 'D', note: '139L Gefriertruhe' },
  { id: 'fridge_chest_haier_hce203t', category: 'fridge', brand: 'Haier', model: 'HCE203T Truhe', year: 2024, kwh: 153, class: 'D', note: '203L Gefriertruhe' },
  { id: 'fridge_wine_caso_winecomfort', category: 'fridge', brand: 'Caso', model: 'WineComfort 1800 Smart', year: 2024, kwh: 149, class: 'G', note: '180 Flaschen Weinkühler' },
  { id: 'fridge_mini_klarstein_beerbarrel', category: 'fridge', brand: 'Klarstein', model: 'Mr. Beer 60L Mini-Kühlschrank', year: 2024, kwh: 95, class: 'F', note: '60L Mini für Büro/Studio' },
  { id: 'fridge_old_bosch_kgn36nl30', category: 'fridge', brand: 'Bosch', model: 'KGN36NL30 (älteres Modell)', year: 2018, kwh: 280, class: 'A++', note: '302L Vor 2021er Label' },
  { id: 'fridge_old_lg_gbp20nsdfs', category: 'fridge', brand: 'LG', model: 'GBP20NSDFS (älteres Modell)', year: 2018, kwh: 295, class: 'A++', note: '343L Vor 2021er Label' },

  // ============================================================
  // GESCHIRRSPÜLER — ERWEITERUNG
  // ============================================================
  { id: 'dish_bosch_smv8ycx02e', category: 'dishwasher', brand: 'Bosch', model: 'SMV8YCX02E Serie 8', year: 2024, kwh: 73, class: 'B', note: 'EfficientDry + HC' },
  { id: 'dish_bosch_smi6zcs00e', category: 'dishwasher', brand: 'Bosch', model: 'SMI6ZCS00E Serie 6', year: 2023, kwh: 78, class: 'C', note: 'TimeLight' },
  { id: 'dish_bosch_sgs2itw04e', category: 'dishwasher', brand: 'Bosch', model: 'SGS2ITW04E Serie 2 freistehend', year: 2024, kwh: 84, class: 'E', note: '60cm Standgerät Budget' },
  { id: 'dish_siemens_sn85ex69ce', category: 'dishwasher', brand: 'Siemens', model: 'SN85EX69CE iQ500', year: 2024, kwh: 75, class: 'B', note: 'Zeolith + emotionLight' },
  { id: 'dish_miele_g5210sci', category: 'dishwasher', brand: 'Miele', model: 'G 5210 SCi Active Plus', year: 2023, kwh: 72, class: 'C', note: 'Knock2Open' },
  { id: 'dish_miele_g5350sciactive', category: 'dishwasher', brand: 'Miele', model: 'G 5350 SCi Active', year: 2024, kwh: 71, class: 'C', note: 'Cube + AutoOpen' },
  { id: 'dish_aeg_fse63647p', category: 'dishwasher', brand: 'AEG', model: 'FSE63647P 6000', year: 2024, kwh: 84, class: 'D', note: 'AirDry SatelliteClean' },
  { id: 'dish_aeg_fsk93847p', category: 'dishwasher', brand: 'AEG', model: 'FSK93847P 9000 Glass Care', year: 2024, kwh: 75, class: 'B', note: 'GlassCare ComfortLift' },
  { id: 'dish_beko_bdfn36560xa', category: 'dishwasher', brand: 'Beko', model: 'BDFN36560XA AutoDose', year: 2024, kwh: 84, class: 'D', note: 'Budget HygieneShield' },
  { id: 'dish_whirlpool_wfo3p33plx', category: 'dishwasher', brand: 'Whirlpool', model: 'WFO 3P33 PL X', year: 2023, kwh: 92, class: 'D', note: '6th Sense PowerClean' },
  { id: 'dish_haier_xs6b0s3fsb', category: 'dishwasher', brand: 'Haier', model: 'XS 6B0S3FSB', year: 2024, kwh: 80, class: 'C', note: 'Direct Spray + UV' },
  { id: 'dish_smeg_st2fabne2', category: 'dishwasher', brand: 'Smeg', model: 'ST2FABNE2 Retro', year: 2024, kwh: 74, class: 'B', note: 'Retro-Design FlexZone' },
  { id: 'dish_gorenje_gv693c60xv', category: 'dishwasher', brand: 'Gorenje', model: 'GV693C60XV TotalDry', year: 2023, kwh: 84, class: 'D', note: 'AquaStop, 16 Gedecke' },
  { id: 'dish_neff_s257hcx01e', category: 'dishwasher', brand: 'Neff', model: 'S257HCX01E N70', year: 2024, kwh: 71, class: 'B', note: 'OpenAssist Zeolith' },
  { id: 'dish_zanussi_zdln91511', category: 'dishwasher', brand: 'Zanussi', model: 'ZDLN91511', year: 2023, kwh: 92, class: 'D', note: 'AirDry-Technologie Budget' },
  { id: 'dish_compact_bomann_gsp7409', category: 'dishwasher', brand: 'Bomann', model: 'GSP 7409 Tisch-GS', year: 2024, kwh: 85, class: 'F', note: '6 Gedecke Tischgerät' },
  { id: 'dish_compact_klarstein_amazonia', category: 'dishwasher', brand: 'Klarstein', model: 'Amazonia 6 Tisch-GS', year: 2024, kwh: 90, class: 'F', note: '6 Gedecke kompakt' },

  // ============================================================
  // WASCHMASCHINEN — ERWEITERUNG
  // ============================================================
  { id: 'wash_bosch_wge24426ch', category: 'washer', brand: 'Bosch', model: 'WGE24426CH Serie 6', year: 2024, kwh: 60, class: 'A', note: '8kg ActiveWater Plus CH' },
  { id: 'wash_bosch_wgg2440tch', category: 'washer', brand: 'Bosch', model: 'WGG2440TCH Serie 6', year: 2024, kwh: 62, class: 'A', note: '9kg AntiVibration' },
  { id: 'wash_bosch_was28842', category: 'washer', brand: 'Bosch', model: 'WAS28842 Serie 8 Klassik', year: 2022, kwh: 60, class: 'A', note: '8kg, älteres Premium' },
  { id: 'wash_siemens_wm14n2g3', category: 'washer', brand: 'Siemens', model: 'WM14N2G3 iQ300', year: 2023, kwh: 65, class: 'A', note: '8kg waterPerfect Plus' },
  { id: 'wash_aeg_lr7e75690', category: 'washer', brand: 'AEG', model: 'LR7E75690 Serie 7000', year: 2024, kwh: 60, class: 'A', note: '9kg ÖKOMix ProSteam' },
  { id: 'wash_aeg_lr9d75695', category: 'washer', brand: 'AEG', model: 'LR9D75695 Serie 9000', year: 2024, kwh: 49, class: 'A', note: '9kg AbsoluteCare ÖKOMix' },
  { id: 'wash_haier_hw90b14959u1', category: 'washer', brand: 'Haier', model: 'HW90-B14959U1', year: 2023, kwh: 62, class: 'A', note: '9kg Direct Motion' },
  { id: 'wash_beko_wue7732xst', category: 'washer', brand: 'Beko', model: 'WUE7732XST AquaTech', year: 2024, kwh: 70, class: 'A', note: '7kg HygieneShield Budget' },
  { id: 'wash_beko_b3wftv8843mw', category: 'washer', brand: 'Beko', model: 'B3WFTV8843MW', year: 2024, kwh: 60, class: 'A', note: '8kg AquaTech, Bestseller' },
  { id: 'wash_whirlpool_w8w946wbee', category: 'washer', brand: 'Whirlpool', model: 'W8 W946WB EE Supreme Care', year: 2024, kwh: 52, class: 'A', note: '9kg 6th Sense Direct Drive' },
  { id: 'wash_gorenje_wnei84aps', category: 'washer', brand: 'Gorenje', model: 'WNEI84APS', year: 2023, kwh: 75, class: 'A', note: '8kg WaveActive Trommel' },
  { id: 'wash_lg_f6wv710p2t', category: 'washer', brand: 'LG', model: 'F6WV710P2T AI DD', year: 2024, kwh: 51, class: 'A', note: '10,5kg AIDD + Steam' },
  { id: 'wash_zanussi_zwf944a2pw', category: 'washer', brand: 'Zanussi', model: 'ZWF944A2PW', year: 2023, kwh: 73, class: 'A', note: '9kg JetSystem Budget' },
  { id: 'wash_indesit_bwa101284xwukn', category: 'washer', brand: 'Indesit', model: 'BWA 101284X WUK N', year: 2023, kwh: 79, class: 'A', note: '10kg Push&Wash Budget' },
  { id: 'wash_hotpoint_nm11724wsauk', category: 'washer', brand: 'Hotpoint', model: 'NM11 724 WS A UK N', year: 2024, kwh: 70, class: 'A', note: '7kg ActiveCare' },
  { id: 'wash_candy_csws_4852dwe1', category: 'washer', brand: 'Candy', model: 'CSWS 4852DWE/1', year: 2023, kwh: 78, class: 'A', note: '8kg+5kg Wäsche/Trocknen' },
  { id: 'wash_smeg_lbw60sgch', category: 'washer', brand: 'Smeg', model: 'LBW60SGCH', year: 2023, kwh: 66, class: 'A', note: '7kg Schweizer Modell' },

  // ============================================================
  // TUMBLER — ERWEITERUNG
  // ============================================================
  { id: 'dryer_bosch_wqg231d40', category: 'dryer', brand: 'Bosch', model: 'WQG231D40 Serie 6', year: 2023, kwh: 175, class: 'A++', note: '8kg AutoDry Heat Pump' },
  { id: 'dryer_aeg_tr918a5', category: 'dryer', brand: 'AEG', model: 'TR918A5 Serie 9000', year: 2024, kwh: 158, class: 'A+++', note: '9kg AbsoluteCare 8000' },
  { id: 'dryer_aeg_tr818a4', category: 'dryer', brand: 'AEG', model: 'TR818A4 Serie 8000', year: 2024, kwh: 175, class: 'A++', note: '8kg ÖkoMix' },
  { id: 'dryer_haier_hd80a3939', category: 'dryer', brand: 'Haier', model: 'HD80-A3939', year: 2024, kwh: 235, class: 'A++', note: '8kg Wärmepumpe Budget' },
  { id: 'dryer_beko_dpue7440x', category: 'dryer', brand: 'Beko', model: 'DPUE7440X', year: 2024, kwh: 244, class: 'A++', note: '7kg Heat Pump Budget' },
  { id: 'dryer_beko_dryyer90hp', category: 'dryer', brand: 'Beko', model: 'DRY 9 HP V8 Standard', year: 2024, kwh: 235, class: 'A++', note: '9kg AquaWave Drum' },
  { id: 'dryer_whirlpool_w8d94wbeeu', category: 'dryer', brand: 'Whirlpool', model: 'W8 D94WB EE U', year: 2023, kwh: 197, class: 'A+++', note: '9kg 6th Sense' },
  { id: 'dryer_gorenje_dpne8b2', category: 'dryer', brand: 'Gorenje', model: 'DPNE8B2', year: 2023, kwh: 235, class: 'A++', note: '8kg PrimeDry' },
  { id: 'dryer_indesit_yth798fhotpoint', category: 'dryer', brand: 'Hotpoint', model: 'H8 D94WB EU', year: 2024, kwh: 199, class: 'A++', note: '9kg Active Care' },
  { id: 'dryer_zanussi_zdh8333pz', category: 'dryer', brand: 'Zanussi', model: 'ZDH8333PZ', year: 2023, kwh: 233, class: 'A+', note: '8kg Heat Pump Budget' },
  { id: 'dryer_candy_csoehc9tge', category: 'dryer', brand: 'Candy', model: 'CSO E H9A2TE-S', year: 2023, kwh: 225, class: 'A++', note: '9kg Easy Iron Budget' },
  { id: 'dryer_condenser_bosch_wtw87499', category: 'dryer', brand: 'Bosch', model: 'WTW87499 (Kondensations-Tumbler)', year: 2022, kwh: 285, class: 'A', note: 'Älterer Kondensations-Tumbler' },

  // ============================================================
  // BACKÖFEN — ERWEITERUNG
  // ============================================================
  { id: 'oven_bosch_hba573br0', category: 'oven', brand: 'Bosch', model: 'HBA573BR0 Serie 4', year: 2023, kwh: 84, class: 'A', note: '3D Heissluft Standard' },
  { id: 'oven_siemens_hb478g0b0', category: 'oven', brand: 'Siemens', model: 'HB478G0B0 iQ500', year: 2024, kwh: 78, class: 'A', note: 'cookControl 30' },
  { id: 'oven_aeg_bcr452350m', category: 'oven', brand: 'AEG', model: 'BCR452350M Steam Pro', year: 2024, kwh: 79, class: 'A+', note: 'SteamCrisp + Pyrolyse' },
  { id: 'oven_aeg_kse998290m', category: 'oven', brand: 'AEG', model: 'KSE998290M Compact Steam', year: 2024, kwh: 71, class: 'A+', note: '45cm Compact mit Dampf' },
  { id: 'oven_neff_b69cs7ky0', category: 'oven', brand: 'Neff', model: 'B69CS7KY0 N90 Slide&Hide', year: 2024, kwh: 73, class: 'A+', note: 'Pyrolyse + CircoTherm' },
  { id: 'oven_neff_b3ace4hn0', category: 'oven', brand: 'Neff', model: 'B3ACE4HN0 N50', year: 2023, kwh: 81, class: 'A+', note: 'Slide&Hide Standard' },
  { id: 'oven_haier_huo37f9wgcs1', category: 'oven', brand: 'Haier', model: 'HUO 37 F9WGCS1', year: 2024, kwh: 86, class: 'A', note: 'I-Touch Pyrolyse' },
  { id: 'oven_beko_bbim13400xms', category: 'oven', brand: 'Beko', model: 'BBIM13400XMS', year: 2024, kwh: 88, class: 'A', note: 'AeroPerfect Multifunktion' },
  { id: 'oven_smeg_sf6390xpzd', category: 'oven', brand: 'Smeg', model: 'SF6390XPZD Classic', year: 2024, kwh: 85, class: 'A', note: 'Pyrolyse Vapor Clean' },
  { id: 'oven_whirlpool_w7om44s1pbl', category: 'oven', brand: 'Whirlpool', model: 'W7 OM4 4S1 P BL', year: 2023, kwh: 78, class: 'A+', note: '6th Sense Pyrolyse' },
  { id: 'oven_microwave_combi_bosch_cma585gs0', category: 'oven', brand: 'Bosch', model: 'CMA585GS0 Mikrowellen-Kombi', year: 2024, kwh: 95, class: 'A+', note: 'Mikrowelle + Backofen' },
  { id: 'oven_steam_neff_c17fs44h0', category: 'oven', brand: 'Neff', model: 'C17FS44H0 Dampfgarer', year: 2024, kwh: 65, class: 'A+', note: 'Dampfgarer einzeln' },
  { id: 'oven_old_bosch_hbg635bs1', category: 'oven', brand: 'Bosch', model: 'HBG635BS1 (älteres Modell)', year: 2019, kwh: 95, class: 'A+', note: 'Älteres Premium-Modell' },

  // ============================================================
  // KAFFEE — ERWEITERUNG
  // ============================================================
  { id: 'coffee_jura_giga6', category: 'coffee', brand: 'Jura', model: 'GIGA 6', year: 2023, kwh: 250, class: '—', note: 'Premium Vollautomat 2 Mahlwerke' },
  { id: 'coffee_jura_x10', category: 'coffee', brand: 'Jura', model: 'X10 Pro Office', year: 2024, kwh: 280, class: '—', note: 'Office Hochleistungs-Vollautomat' },
  { id: 'coffee_jura_d4', category: 'coffee', brand: 'Jura', model: 'D4 Einsteiger', year: 2023, kwh: 130, class: '—', note: 'Einsteiger-Vollautomat' },
  { id: 'coffee_delonghi_magnifica_evo', category: 'coffee', brand: 'De\'Longhi', model: 'Magnifica Evo ECAM290', year: 2023, kwh: 165, class: '—', note: 'Bestseller LatteCrema' },
  { id: 'coffee_delonghi_primadonna_soul', category: 'coffee', brand: 'De\'Longhi', model: 'Primadonna Soul ECAM610', year: 2024, kwh: 230, class: '—', note: 'Flaggschiff Bean Adapt' },
  { id: 'coffee_delonghi_dedica_arte', category: 'coffee', brand: 'De\'Longhi', model: 'Dedica Arte EC885', year: 2024, kwh: 105, class: '—', note: 'Slim Siebträger' },
  { id: 'coffee_philips_3300_lattego', category: 'coffee', brand: 'Philips', model: '3300 LatteGo Series EP3343', year: 2024, kwh: 155, class: '—', note: 'Vollautomat Mid-Range' },
  { id: 'coffee_philips_5500', category: 'coffee', brand: 'Philips', model: '5500 LatteGo EP5547', year: 2023, kwh: 180, class: '—', note: 'Premium-Vollautomat 20 Drinks' },
  { id: 'coffee_siemens_eq900', category: 'coffee', brand: 'Siemens', model: 'EQ.900 TQ905DZ8', year: 2024, kwh: 215, class: '—', note: 'iAroma Vollautomat Premium' },
  { id: 'coffee_siemens_eq700', category: 'coffee', brand: 'Siemens', model: 'EQ.700 TP705D01', year: 2024, kwh: 180, class: '—', note: 'beanIdent System' },
  { id: 'coffee_melitta_caffeo_ci_touch', category: 'coffee', brand: 'Melitta', model: 'CaffeO CI Touch Plus', year: 2023, kwh: 175, class: '—', note: 'Vollautomat 2-Mahlwerk' },
  { id: 'coffee_melitta_solo_perfect_milk', category: 'coffee', brand: 'Melitta', model: 'Solo & Perfect Milk', year: 2023, kwh: 145, class: '—', note: 'Schlanker Vollautomat' },
  { id: 'coffee_krups_evidence_one', category: 'coffee', brand: 'Krups', model: 'Evidence One EA913810', year: 2024, kwh: 160, class: '—', note: 'Smart Connect Vollautomat' },
  { id: 'coffee_bosch_vero_cup_500', category: 'coffee', brand: 'Bosch', model: 'VeroCup 500', year: 2023, kwh: 165, class: '—', note: 'CeramDrive Vollautomat' },
  { id: 'coffee_nespresso_vertuo_pop', category: 'coffee', brand: 'Nespresso', model: 'Vertuo Pop+', year: 2024, kwh: 65, class: '—', note: 'Kompakt Kapsel' },
  { id: 'coffee_nespresso_essenza_mini', category: 'coffee', brand: 'Nespresso', model: 'Essenza Mini', year: 2023, kwh: 55, class: '—', note: 'Mini Kapsel-Maschine' },
  { id: 'coffee_dolce_gusto_genio_s_plus', category: 'coffee', brand: 'Dolce Gusto', model: 'Genio S Plus', year: 2023, kwh: 85, class: '—', note: 'Krups-Kapsel-Maschine' },
  { id: 'coffee_tchibo_cafissimo_pure', category: 'coffee', brand: 'Tchibo', model: 'Cafissimo Pure', year: 2023, kwh: 75, class: '—', note: 'Kapsel-Maschine' },
  { id: 'coffee_breville_barista_express', category: 'coffee', brand: 'Sage / Breville', model: 'Barista Express SES875', year: 2024, kwh: 245, class: '—', note: 'Halbautomat mit Mahlwerk' },
  { id: 'coffee_gaggia_classic_evo', category: 'coffee', brand: 'Gaggia', model: 'Classic Evo Pro', year: 2024, kwh: 280, class: '—', note: 'Italienischer Halbautomat-Klassiker' },
  { id: 'coffee_filter_aeg_kaff7300', category: 'coffee', brand: 'AEG', model: 'KAFF7300 Filtermaschine', year: 2024, kwh: 75, class: '—', note: 'Filter mit Thermokanne' },
  { id: 'coffee_filter_severin_ka4814', category: 'coffee', brand: 'Severin', model: 'KA 4814 Filter', year: 2023, kwh: 70, class: '—', note: 'Standard Filtermaschine' },

  // ============================================================
  // KÜCHEN-KLEINGERÄTE — ERWEITERUNG
  // ============================================================
  { id: 'small_kettle_bosch_styline', category: 'small_kitchen', brand: 'Bosch', model: 'TWK8612P Wasserkocher', year: 2023, kwh: 155, class: '—', note: '1.5L Sieve, 2-3x täglich' },
  { id: 'small_kettle_russell_velocity', category: 'small_kitchen', brand: 'Russell Hobbs', model: 'Velocity Wasserkocher', year: 2024, kwh: 145, class: '—', note: 'Schnellkocher 1.7L' },
  { id: 'small_kettle_philips_hd9385', category: 'small_kitchen', brand: 'Philips', model: 'HD9385 Senseo Wasserkocher', year: 2023, kwh: 150, class: '—', note: 'Standard 1.5L' },
  { id: 'small_toaster_smeg_2slice', category: 'small_kitchen', brand: 'Smeg', model: 'TSF01 Toaster 2-Scheiben Retro', year: 2024, kwh: 35, class: '—', note: 'Premium Retro' },
  { id: 'small_toaster_severin_at2509', category: 'small_kitchen', brand: 'Severin', model: 'AT 2509 Automatic-Toaster', year: 2023, kwh: 38, class: '—', note: '2-Scheiben Standard' },
  { id: 'small_toaster_4slice_bosch', category: 'small_kitchen', brand: 'Bosch', model: 'TAT5P445 Toaster 4-Schlitz', year: 2024, kwh: 55, class: '—', note: '4-Scheiben Familie' },
  { id: 'small_microwave_panasonic_nne28jw', category: 'small_kitchen', brand: 'Panasonic', model: 'NN-E28JW', year: 2023, kwh: 42, class: '—', note: 'Solo-Mikrowelle 800W' },
  { id: 'small_microwave_severin_mw7857', category: 'small_kitchen', brand: 'Severin', model: 'MW 7857 mit Grill', year: 2024, kwh: 55, class: '—', note: '20L Mikrowelle + Grill' },
  { id: 'small_microwave_sharp_yc_ms252ae', category: 'small_kitchen', brand: 'Sharp', model: 'YC-MS252AE-B', year: 2024, kwh: 48, class: '—', note: '25L Solo Mikrowelle' },
  { id: 'small_airfryer_xiaomi_smart_air', category: 'small_kitchen', brand: 'Xiaomi', model: 'Smart Air Fryer 6.5L', year: 2024, kwh: 70, class: '—', note: 'Smart Connect' },
  { id: 'small_airfryer_tefal_easy_fry_xxl', category: 'small_kitchen', brand: 'Tefal', model: 'Easy Fry XXL EY701D', year: 2024, kwh: 80, class: '—', note: '5.6L Heissluftfritteuse' },
  { id: 'small_airfryer_cosori_dual_blaze', category: 'small_kitchen', brand: 'Cosori', model: 'Dual Blaze 6.4L', year: 2024, kwh: 78, class: '—', note: 'Premium Heissluft' },
  { id: 'small_blender_nutribullet_pro', category: 'small_kitchen', brand: 'NutriBullet', model: 'Pro 900', year: 2024, kwh: 28, class: '—', note: 'Smoothie Maker' },
  { id: 'small_blender_braun_multiquick9', category: 'small_kitchen', brand: 'Braun', model: 'MultiQuick 9 Stabmixer', year: 2024, kwh: 18, class: '—', note: 'Profi-Stabmixer' },
  { id: 'small_blender_bosch_serie4', category: 'small_kitchen', brand: 'Bosch', model: 'MMB6172S Standmixer Serie 4', year: 2023, kwh: 25, class: '—', note: 'Standmixer 1.5L' },
  { id: 'small_mixer_kitchenaid_artisan', category: 'small_kitchen', brand: 'KitchenAid', model: 'Artisan 5KSM175 PS', year: 2024, kwh: 35, class: '—', note: 'Küchenmaschine Premium' },
  { id: 'small_mixer_bosch_mum_serie2', category: 'small_kitchen', brand: 'Bosch', model: 'MUM Serie 2 MUMS2EW40', year: 2023, kwh: 28, class: '—', note: 'Standardküchenmaschine' },
  { id: 'small_mixer_kenwood_cooking_chef', category: 'small_kitchen', brand: 'Kenwood', model: 'Cooking Chef XL KCL95', year: 2024, kwh: 75, class: '—', note: 'Mit Heizfunktion' },
  { id: 'small_thermomix_tm6', category: 'small_kitchen', brand: 'Vorwerk', model: 'Thermomix TM6 (Vorgaenger)', year: 2019, kwh: 90, class: '—', note: 'TM7-Vorgaenger' },
  { id: 'small_monsieur_cuisine_smart', category: 'small_kitchen', brand: 'Lidl', model: 'Monsieur Cuisine Smart', year: 2024, kwh: 75, class: '—', note: 'Thermomix-Alternative' },
  { id: 'small_grill_tefal_optigrill_xl', category: 'small_kitchen', brand: 'Tefal', model: 'OptiGrill+ XL GC724D', year: 2024, kwh: 55, class: '—', note: 'Kontaktgrill mit Sensor' },
  { id: 'small_raclette_stoeckli_chf', category: 'small_kitchen', brand: 'Stoeckli', model: 'Cheese-Top 8 Raclette', year: 2023, kwh: 35, class: '—', note: 'Schweizer Raclette saisonal' },
  { id: 'small_fondue_kuhn_rikon', category: 'small_kitchen', brand: 'Kuhn Rikon', model: 'Fondue elektrisch', year: 2023, kwh: 25, class: '—', note: 'Elektrisches Fondue' },
  { id: 'small_slowcooker_crockpot', category: 'small_kitchen', brand: 'Crockpot', model: 'Express 5.6L', year: 2024, kwh: 65, class: '—', note: 'Slow Cooker / Multikocher' },
  { id: 'small_instantpot_duo7', category: 'small_kitchen', brand: 'Instant Pot', model: 'Duo Plus 7 V5 6L', year: 2024, kwh: 70, class: '—', note: 'Multikocher Bestseller' },
  { id: 'small_dehydrator_klarstein_fruitberry', category: 'small_kitchen', brand: 'Klarstein', model: 'Fruitberry Doerrautomat', year: 2024, kwh: 95, class: '—', note: 'Doerrautomat saisonal' },
  { id: 'small_icecream_unold_nobless', category: 'small_kitchen', brand: 'Unold', model: 'Eismaschine Nobless', year: 2024, kwh: 35, class: '—', note: 'Eismaschine mit Kompressor' },
  { id: 'small_juicer_omega_h3000d', category: 'small_kitchen', brand: 'Omega', model: 'H3000D Slow Juicer', year: 2024, kwh: 18, class: '—', note: 'Premium Slow Juicer' },
  { id: 'small_breadmaker_panasonic_sd-r2530', category: 'small_kitchen', brand: 'Panasonic', model: 'SD-R2530 Brotbackautomat', year: 2024, kwh: 75, class: '—', note: 'Brotbackautomat' },
  { id: 'small_eggcooker_severin_ek3056', category: 'small_kitchen', brand: 'Severin', model: 'EK 3056 Eierkocher', year: 2023, kwh: 8, class: '—', note: '6 Eier elektrisch' },

  // ============================================================
  // TVs — ERWEITERUNG
  // ============================================================
  { id: 'tv_lg_b3_55', category: 'tv', brand: 'LG', model: 'OLED55B3 (2023)', year: 2023, kwh: 102, class: 'G', note: 'OLED B-Serie 55" Mid-Range' },
  { id: 'tv_lg_b4_65', category: 'tv', brand: 'LG', model: 'OLED65B4 (2024)', year: 2024, kwh: 138, class: 'G', note: 'OLED B-Serie 65" 2024' },
  { id: 'tv_lg_oled_evo_g3_77', category: 'tv', brand: 'LG', model: 'OLED77G3 (2023)', year: 2023, kwh: 195, class: 'G', note: 'MLA OLED 77" Gallery' },
  { id: 'tv_lg_oled_55c5', category: 'tv', brand: 'LG', model: 'OLED55C5 (2025)', year: 2025, kwh: 96, class: 'G', note: 'OLED evo C-Serie 2025' },
  { id: 'tv_lg_oled_65c5', category: 'tv', brand: 'LG', model: 'OLED65C5 (2025)', year: 2025, kwh: 132, class: 'G', note: 'OLED evo 65" 2025' },
  { id: 'tv_lg_qned_55_85', category: 'tv', brand: 'LG', model: 'QNED85 55" (2024)', year: 2024, kwh: 88, class: 'F', note: 'QNED Mid-Range 55"' },
  { id: 'tv_samsung_qn85d_55', category: 'tv', brand: 'Samsung', model: 'QE55QN85D Neo QLED (2024)', year: 2024, kwh: 91, class: 'F', note: 'Neo QLED 55" Mid-High' },
  { id: 'tv_samsung_q60d_55', category: 'tv', brand: 'Samsung', model: 'QE55Q60D QLED (2024)', year: 2024, kwh: 75, class: 'F', note: 'QLED 55" Mid-Range' },
  { id: 'tv_samsung_q60d_65', category: 'tv', brand: 'Samsung', model: 'QE65Q60D QLED (2024)', year: 2024, kwh: 105, class: 'F', note: 'QLED 65" Mid-Range' },
  { id: 'tv_samsung_q60d_43', category: 'tv', brand: 'Samsung', model: 'QE43Q60D QLED (2024)', year: 2024, kwh: 60, class: 'F', note: 'QLED 43" Schlafzimmer' },
  { id: 'tv_samsung_cu7100_55', category: 'tv', brand: 'Samsung', model: 'UE55CU7100 Crystal UHD', year: 2023, kwh: 70, class: 'G', note: 'Crystal UHD Budget' },
  { id: 'tv_samsung_s90d_65', category: 'tv', brand: 'Samsung', model: 'QE65S90D OLED (2024)', year: 2024, kwh: 138, class: 'G', note: 'OLED 65" QD-OLED Mid-High' },
  { id: 'tv_sony_x90l_55', category: 'tv', brand: 'Sony', model: 'KD-55X90L Bravia (2023)', year: 2023, kwh: 84, class: 'F', note: 'Full Array LED 55"' },
  { id: 'tv_sony_x95l_65', category: 'tv', brand: 'Sony', model: 'XR-65X95L (2023)', year: 2023, kwh: 130, class: 'F', note: 'Mini-LED 65"' },
  { id: 'tv_sony_a80l_55', category: 'tv', brand: 'Sony', model: 'XR-55A80L OLED (2023)', year: 2023, kwh: 105, class: 'G', note: 'OLED 55" Bravia' },
  { id: 'tv_sony_bravia7_75', category: 'tv', brand: 'Sony', model: 'Bravia 7 XR-75K755', year: 2024, kwh: 178, class: 'F', note: 'Mini-LED 75"' },
  { id: 'tv_philips_pus8909_55', category: 'tv', brand: 'Philips', model: 'PUS8909 55" Ambilight (2024)', year: 2024, kwh: 78, class: 'F', note: 'LED 55" 4-seitig Ambilight' },
  { id: 'tv_philips_oled807_55', category: 'tv', brand: 'Philips', model: 'OLED807 55" (2022)', year: 2022, kwh: 109, class: 'G', note: 'OLED Ambilight aelter' },
  { id: 'tv_philips_the_xtra_8909_65', category: 'tv', brand: 'Philips', model: 'The Xtra 8909 65" Mini-LED', year: 2024, kwh: 145, class: 'F', note: 'Mini-LED Ambilight 65"' },
  { id: 'tv_panasonic_mz1500_55', category: 'tv', brand: 'Panasonic', model: 'TX-55MZ1500 OLED', year: 2023, kwh: 108, class: 'G', note: 'OLED Master HDR 55"' },
  { id: 'tv_panasonic_mz980_55', category: 'tv', brand: 'Panasonic', model: 'TX-55MZ980 OLED', year: 2023, kwh: 105, class: 'G', note: 'OLED Mid-Range 55"' },
  { id: 'tv_tcl_p635_55', category: 'tv', brand: 'TCL', model: 'P635 55" Smart TV', year: 2023, kwh: 70, class: 'F', note: 'LED 4K Budget' },
  { id: 'tv_tcl_c645_65', category: 'tv', brand: 'TCL', model: 'C645 65" QLED', year: 2024, kwh: 105, class: 'F', note: 'QLED Mid-Range 65"' },
  { id: 'tv_tcl_c805_55', category: 'tv', brand: 'TCL', model: 'C805 55" Mini-LED', year: 2024, kwh: 102, class: 'F', note: 'Mini-LED Mid-Range' },
  { id: 'tv_hisense_e7nq_55', category: 'tv', brand: 'Hisense', model: 'E7NQ 55" QLED', year: 2024, kwh: 75, class: 'F', note: 'QLED Budget' },
  { id: 'tv_hisense_u7n_65', category: 'tv', brand: 'Hisense', model: 'U7N 65" Mini-LED', year: 2024, kwh: 130, class: 'F', note: 'ULED Mini-LED 144Hz' },
  { id: 'tv_hisense_a6k_43', category: 'tv', brand: 'Hisense', model: 'A6K 43" 4K', year: 2024, kwh: 55, class: 'F', note: 'Budget 4K Schlafzimmer' },
  { id: 'tv_grundig_oled_pro_55', category: 'tv', brand: 'Grundig', model: 'OLED Pro 55" GOB 9290', year: 2023, kwh: 110, class: 'G', note: 'OLED Mid-Range' },
  { id: 'tv_metz_classic_oled_55', category: 'tv', brand: 'Metz', model: 'OLED Classic 55" MUC9000', year: 2024, kwh: 108, class: 'G', note: 'Premium OLED German Brand' },
  { id: 'tv_old_lg_b8_55', category: 'tv', brand: 'LG', model: 'OLED55B8 (2018)', year: 2018, kwh: 195, class: 'B', note: 'Aelteres Premium OLED' },
  { id: 'tv_old_samsung_q70r_55', category: 'tv', brand: 'Samsung', model: 'QE55Q70R QLED (2019)', year: 2019, kwh: 165, class: 'B', note: 'Aelteres QLED' },
  { id: 'tv_old_panasonic_gxw804_55', category: 'tv', brand: 'Panasonic', model: 'TX-55GXW804 (2019)', year: 2019, kwh: 145, class: 'A+', note: 'Aelteres LCD' },

  // ============================================================
  // KONSOLEN — ERWEITERUNG
  // ============================================================
  { id: 'console_xbox_one_x', category: 'console', brand: 'Microsoft', model: 'Xbox One X (Vorgaenger)', year: 2017, kwh: 105, class: '—', note: '~180W Vorgaenger-Gen' },
  { id: 'console_ps4_pro', category: 'console', brand: 'Sony', model: 'PlayStation 4 Pro', year: 2016, kwh: 120, class: '—', note: '~200W Vorgaenger-Gen' },
  { id: 'console_ps4_slim', category: 'console', brand: 'Sony', model: 'PlayStation 4 Slim', year: 2016, kwh: 85, class: '—', note: '~140W aeltere Gen' },
  { id: 'console_xbox_series_s_2tb', category: 'console', brand: 'Microsoft', model: 'Xbox Series S 2TB Carbon', year: 2024, kwh: 50, class: '—', note: '~80W Series S 2TB' },
  { id: 'console_switch_lite', category: 'console', brand: 'Nintendo', model: 'Switch Lite', year: 2019, kwh: 4, class: '—', note: 'Handheld-only ~7W' },
  { id: 'console_switch_v1', category: 'console', brand: 'Nintendo', model: 'Switch (Original 2017)', year: 2017, kwh: 8, class: '—', note: '~13W gedockt' },
  { id: 'console_steamdeck_lcd', category: 'console', brand: 'Valve', model: 'Steam Deck LCD', year: 2022, kwh: 18, class: '—', note: '~30W Original LCD' },
  { id: 'console_msi_claw', category: 'console', brand: 'MSI', model: 'Claw A1M Handheld', year: 2024, kwh: 22, class: '—', note: '~35W Intel Handheld' },
  { id: 'console_ayn_odin_2', category: 'console', brand: 'AYN', model: 'Odin 2 Handheld', year: 2024, kwh: 12, class: '—', note: 'Android Gaming-Handheld' },
  { id: 'console_anbernic_rg40xx', category: 'console', brand: 'Anbernic', model: 'RG40XX H Retro', year: 2024, kwh: 4, class: '—', note: 'Retro-Handheld guenstig' },

  // ============================================================
  // AUDIO — ERWEITERUNG
  // ============================================================
  { id: 'audio_sonos_ray', category: 'audio', brand: 'Sonos', model: 'Ray Soundbar', year: 2022, kwh: 35, class: '—', note: 'Einsteiger-Soundbar' },
  { id: 'audio_sonos_move_2', category: 'audio', brand: 'Sonos', model: 'Move 2', year: 2023, kwh: 30, class: '—', note: 'Portable Speaker' },
  { id: 'audio_sonos_roam_2', category: 'audio', brand: 'Sonos', model: 'Roam 2', year: 2024, kwh: 18, class: '—', note: 'Kompakt-Bluetooth' },
  { id: 'audio_bose_soundbar_900', category: 'audio', brand: 'Bose', model: 'Soundbar 900', year: 2023, kwh: 65, class: '—', note: 'Dolby Atmos Premium' },
  { id: 'audio_jbl_bar_1300', category: 'audio', brand: 'JBL', model: 'Bar 1300 11.1.4', year: 2023, kwh: 95, class: '—', note: 'Detachable Surround' },
  { id: 'audio_lg_s95tr', category: 'audio', brand: 'LG', model: 'S95TR Soundbar', year: 2024, kwh: 88, class: '—', note: 'Wireless Dolby Atmos' },
  { id: 'audio_samsung_hw_q800c', category: 'audio', brand: 'Samsung', model: 'HW-Q800C 5.1.2', year: 2023, kwh: 75, class: '—', note: 'Q-Symphony Mid-Range' },
  { id: 'audio_yamaha_yas_209', category: 'audio', brand: 'Yamaha', model: 'YAS-209 Soundbar', year: 2022, kwh: 42, class: '—', note: 'Standard Soundbar mit Sub' },
  { id: 'audio_avr_denon_x4800h', category: 'audio', brand: 'Denon', model: 'AVC-X4800H', year: 2024, kwh: 230, class: '—', note: 'AV-Receiver Premium 9.4' },
  { id: 'audio_avr_yamaha_rxa2a', category: 'audio', brand: 'Yamaha', model: 'RX-A2A Aventage', year: 2023, kwh: 200, class: '—', note: 'Aventage 7.2 AVR' },
  { id: 'audio_homepod_mini', category: 'audio', brand: 'Apple', model: 'HomePod mini', year: 2023, kwh: 15, class: '—', note: 'Smart Speaker kompakt' },
  { id: 'audio_echo_dot_5', category: 'audio', brand: 'Amazon', model: 'Echo Dot (5. Gen)', year: 2022, kwh: 18, class: '—', note: 'Smart Speaker Bestseller' },
  { id: 'audio_echo_studio', category: 'audio', brand: 'Amazon', model: 'Echo Studio', year: 2022, kwh: 35, class: '—', note: 'Premium Smart Speaker' },
  { id: 'audio_google_nest_audio', category: 'audio', brand: 'Google', model: 'Nest Audio', year: 2022, kwh: 22, class: '—', note: 'Google Smart Speaker' },
  { id: 'audio_marshall_stanmore_iii', category: 'audio', brand: 'Marshall', model: 'Stanmore III', year: 2024, kwh: 55, class: '—', note: 'Bluetooth Premium-Speaker' },
  { id: 'audio_dali_oberon_1c', category: 'audio', brand: 'DALI', model: 'Oberon 1C aktiv', year: 2024, kwh: 90, class: '—', note: 'Premium Aktivlautsprecher Paar' },
  { id: 'audio_record_player_pro_ject_x1', category: 'audio', brand: 'Pro-Ject', model: 'Debut Carbon X1 Plattenspieler', year: 2023, kwh: 12, class: '—', note: 'Hi-Fi Plattenspieler' },
  { id: 'audio_dac_amp_fiio_k7', category: 'audio', brand: 'FiiO', model: 'K7 DAC/Amp Desktop', year: 2024, kwh: 35, class: '—', note: 'Kopfhoererverstaerker Desktop' },

  // ============================================================
  // ROUTER — ERWEITERUNG
  // ============================================================
  { id: 'router_swisscom_box_2', category: 'router', brand: 'Swisscom', model: 'Internet-Box 2 (aelter)', year: 2018, kwh: 130, class: '—', note: '~15W aeltere Box' },
  { id: 'router_swisscom_box_3', category: 'router', brand: 'Swisscom', model: 'Internet-Box 3', year: 2021, kwh: 122, class: '—', note: '~14W' },
  { id: 'router_sunrise_centro', category: 'router', brand: 'Sunrise', model: 'Centro Connect Box', year: 2023, kwh: 96, class: '—', note: '~11W Standard' },
  { id: 'router_salt_box', category: 'router', brand: 'Salt', model: 'Salt Fiber Box', year: 2023, kwh: 88, class: '—', note: '~10W FTTH 10Gbit' },
  { id: 'router_init7_dasg', category: 'router', brand: 'Init7', model: 'DASG (Self-Hosted Standard-Router)', year: 2024, kwh: 130, class: '—', note: '~15W Pro-Setup' },
  { id: 'router_fritzbox_5530', category: 'router', brand: 'AVM', model: 'FRITZ!Box 5530 Fiber', year: 2023, kwh: 100, class: '—', note: '~11W FTTH' },
  { id: 'router_fritzbox_4060', category: 'router', brand: 'AVM', model: 'FRITZ!Box 4060', year: 2023, kwh: 105, class: '—', note: '~12W Wi-Fi 6E ohne Modem' },
  { id: 'router_fritzbox_repeater_3000ax', category: 'router', brand: 'AVM', model: 'FRITZ!Repeater 3000 AX', year: 2024, kwh: 70, class: '—', note: '~8W Wi-Fi 6 Repeater' },
  { id: 'router_tp_link_archer_be800', category: 'router', brand: 'TP-Link', model: 'Archer BE800 Wi-Fi 7', year: 2024, kwh: 175, class: '—', note: '~20W Wi-Fi 7 High-End' },
  { id: 'router_tp_link_deco_xe75', category: 'router', brand: 'TP-Link', model: 'Deco XE75 Pro 3-Pack Mesh', year: 2024, kwh: 158, class: '—', note: '~18W Mesh Wi-Fi 6E' },
  { id: 'router_netgear_orbi_970', category: 'router', brand: 'Netgear', model: 'Orbi 970 Series Mesh', year: 2024, kwh: 250, class: '—', note: '~28W Wi-Fi 7 Premium Mesh' },
  { id: 'router_netgear_nighthawk_rs700s', category: 'router', brand: 'Netgear', model: 'Nighthawk RS700S Wi-Fi 7', year: 2024, kwh: 165, class: '—', note: '~19W Wi-Fi 7' },
  { id: 'router_asus_zenwifi_bt8', category: 'router', brand: 'Asus', model: 'ZenWiFi BT8 Mesh', year: 2024, kwh: 130, class: '—', note: '~15W Wi-Fi 7 Mesh' },
  { id: 'router_ubiquiti_udr', category: 'router', brand: 'Ubiquiti', model: 'UniFi Dream Router', year: 2023, kwh: 130, class: '—', note: '~15W Prosumer' },
  { id: 'router_5g_huawei_5g_cpe_pro_2', category: 'router', brand: 'Huawei', model: '5G CPE Pro 2', year: 2023, kwh: 130, class: '—', note: '~15W 5G Mobilfunk' },

  // ============================================================
  // NAS — ERWEITERUNG
  // ============================================================
  { id: 'nas_synology_ds224play', category: 'nas', brand: 'Synology', model: 'DS224play (2x 4TB)', year: 2024, kwh: 175, class: '—', note: '~20W Plex-optimiert' },
  { id: 'nas_synology_ds124', category: 'nas', brand: 'Synology', model: 'DS124 (1x 4TB)', year: 2023, kwh: 105, class: '—', note: '~12W Single-Bay Budget' },
  { id: 'nas_synology_ds220plus', category: 'nas', brand: 'Synology', model: 'DS220+ (2x 4TB)', year: 2020, kwh: 165, class: '—', note: '~19W aeltere Plus-Serie' },
  { id: 'nas_synology_ds420plus', category: 'nas', brand: 'Synology', model: 'DS420+ (4x 4TB)', year: 2020, kwh: 230, class: '—', note: '~26W aeltere 4-Bay' },
  { id: 'nas_synology_ds1621plus', category: 'nas', brand: 'Synology', model: 'DS1621+ (6x HDD)', year: 2021, kwh: 460, class: '—', note: '~52W 6-Bay Prosumer' },
  { id: 'nas_qnap_ts264', category: 'nas', brand: 'QNAP', model: 'TS-264 (2x HDD)', year: 2024, kwh: 165, class: '—', note: '~19W 2-Bay 2.5GbE' },
  { id: 'nas_qnap_tvs_h874', category: 'nas', brand: 'QNAP', model: 'TVS-h874 (8x HDD)', year: 2024, kwh: 530, class: '—', note: '~60W 8-Bay Premium ZFS' },
  { id: 'nas_asustor_lockerstor4_gen2', category: 'nas', brand: 'Asustor', model: 'Lockerstor 4 Gen2 (4x HDD)', year: 2023, kwh: 280, class: '—', note: '~32W 4-Bay 2.5GbE' },
  { id: 'nas_terramaster_f4422', category: 'nas', brand: 'Terramaster', model: 'F4-422 (4x HDD)', year: 2022, kwh: 220, class: '—', note: '~25W 4-Bay 10GbE Budget' },
  { id: 'nas_ugreen_dxp2800', category: 'nas', brand: 'UGREEN', model: 'DXP2800 (2x HDD)', year: 2024, kwh: 130, class: '—', note: '~15W 2-Bay Budget' },
  { id: 'nas_diy_nas_unraid', category: 'nas', brand: 'DIY', model: 'Unraid Server (Ryzen, 8 Drives)', year: 2024, kwh: 700, class: '—', note: '~80W idle 24/7 Heavy' },
  { id: 'nas_pi_homelab_low', category: 'nas', brand: 'DIY', model: 'Raspberry Pi 5 + USB-Storage', year: 2024, kwh: 60, class: '—', note: '~7W Mini-Heimserver' },

  // ============================================================
  // MONITORE — ERWEITERUNG
  // ============================================================
  { id: 'mon_dell_p2425h', category: 'monitor', brand: 'Dell', model: 'P2425H 24" FHD Office', year: 2024, kwh: 35, class: 'F', note: '~16W IPS Office' },
  { id: 'mon_dell_p2725h', category: 'monitor', brand: 'Dell', model: 'P2725H 27" FHD Pro', year: 2024, kwh: 40, class: 'F', note: '~18W Office IPS' },
  { id: 'mon_dell_g2725d', category: 'monitor', brand: 'Dell', model: 'G2725D Gaming 27" QHD 165Hz', year: 2024, kwh: 60, class: 'G', note: '~27W Gaming' },
  { id: 'mon_lg_27ul850w', category: 'monitor', brand: 'LG', model: '27UL850-W 27" 4K USB-C', year: 2023, kwh: 60, class: 'G', note: '~27W Office 4K' },
  { id: 'mon_lg_oled_dual_45gx', category: 'monitor', brand: 'LG', model: 'UltraGear 45GX950A OLED 45"', year: 2025, kwh: 130, class: 'G', note: '~60W OLED Ultrawide' },
  { id: 'mon_samsung_m7_smart_32', category: 'monitor', brand: 'Samsung', model: 'Smart Monitor M7 32" 4K', year: 2023, kwh: 65, class: 'G', note: '~30W Smart-Monitor' },
  { id: 'mon_samsung_m8_smart_32', category: 'monitor', brand: 'Samsung', model: 'Smart Monitor M8 32" 4K', year: 2024, kwh: 70, class: 'G', note: '~32W Smart Premium' },
  { id: 'mon_samsung_viewfinity_s9', category: 'monitor', brand: 'Samsung', model: 'ViewFinity S9 27" 5K', year: 2024, kwh: 90, class: 'G', note: '~41W Studio Display Konkurrent' },
  { id: 'mon_asus_proart_pa279cv', category: 'monitor', brand: 'Asus', model: 'ProArt PA279CV 27" 4K', year: 2023, kwh: 60, class: 'G', note: '~27W Calman-zertifiziert' },
  { id: 'mon_asus_rog_swift_oled_27', category: 'monitor', brand: 'Asus', model: 'ROG Swift PG27AQDP 27" QD-OLED', year: 2024, kwh: 90, class: 'G', note: '~41W OLED 480Hz' },
  { id: 'mon_msi_mpg_271qrx', category: 'monitor', brand: 'MSI', model: 'MPG 271QRX QD-OLED', year: 2024, kwh: 88, class: 'G', note: '~40W 360Hz QD-OLED' },
  { id: 'mon_gigabyte_aorus_fo32u', category: 'monitor', brand: 'Gigabyte', model: 'AORUS FO32U2 4K OLED', year: 2024, kwh: 120, class: 'G', note: '~55W 4K OLED 240Hz' },
  { id: 'mon_benq_pd2706u', category: 'monitor', brand: 'BenQ', model: 'PD2706U 27" 4K Designer', year: 2024, kwh: 65, class: 'G', note: '~30W Mac-Designer' },
  { id: 'mon_eizo_ev2495', category: 'monitor', brand: 'Eizo', model: 'FlexScan EV2495 24"', year: 2023, kwh: 38, class: 'F', note: '~17W Premium Office' },
  { id: 'mon_eizo_cs2740', category: 'monitor', brand: 'Eizo', model: 'ColorEdge CS2740 27" 4K', year: 2024, kwh: 90, class: 'G', note: '~41W Pro Color Grading' },
  { id: 'mon_iiyama_xub2492', category: 'monitor', brand: 'iiyama', model: 'ProLite XUB2492HSU 24"', year: 2024, kwh: 45, class: 'F', note: '~20W Budget Office' },
  { id: 'mon_aoc_q27g3xmn', category: 'monitor', brand: 'AOC', model: 'Q27G3XMN Mini-LED 27"', year: 2024, kwh: 65, class: 'G', note: '~30W Gaming Mini-LED Budget' },
  { id: 'mon_curved_samsung_g5_32', category: 'monitor', brand: 'Samsung', model: 'Odyssey G5 32" Curved', year: 2024, kwh: 65, class: 'G', note: '~30W Curved Gaming' },
  { id: 'mon_portable_asus_zenscreen_oled', category: 'monitor', brand: 'Asus', model: 'ZenScreen OLED MQ16AHE 16"', year: 2024, kwh: 28, class: 'G', note: '~13W Mobile OLED' },

  // ============================================================
  // LAPTOPS — MASSIVE ERWEITERUNG
  // ============================================================
  { id: 'lap_mba_m1_13', category: 'laptop', brand: 'Apple', model: 'MacBook Air 13" M1', year: 2020, kwh: 28, class: '—', note: '~12W avg, aelteres M1' },
  { id: 'lap_mbp13_m1', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 13" M1', year: 2020, kwh: 35, class: '—', note: '~15W M1 Pro 13"' },
  { id: 'lap_mbp14_m1_pro', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M1 Pro', year: 2021, kwh: 50, class: '—', note: '~20W M1 Pro' },
  { id: 'lap_mbp16_m1_max', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 16" M1 Max', year: 2021, kwh: 80, class: '—', note: '~32W M1 Max' },
  { id: 'lap_mbp14_m2_pro', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 14" M2 Pro', year: 2023, kwh: 53, class: '—', note: '~22W M2 Pro' },
  { id: 'lap_mbp16_m2_max', category: 'laptop', brand: 'Apple', model: 'MacBook Pro 16" M2 Max', year: 2023, kwh: 80, class: '—', note: '~32W M2 Max' },
  { id: 'lap_tp_x1c_g9', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 9', year: 2021, kwh: 50, class: '—', note: '~21W avg aeltere Gen' },
  { id: 'lap_tp_x1c_g10', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad X1 Carbon Gen 10', year: 2022, kwh: 50, class: '—', note: '~21W avg' },
  { id: 'lap_tp_t14_g4', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad T14 Gen 4', year: 2023, kwh: 55, class: '—', note: '~23W avg Business' },
  { id: 'lap_tp_l15_g4', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad L15 Gen 4', year: 2023, kwh: 65, class: '—', note: '~27W Business Mid-Range' },
  { id: 'lap_tp_e14_g6', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad E14 Gen 6', year: 2024, kwh: 60, class: '—', note: '~25W avg SMB' },
  { id: 'lap_tp_e16_g2', category: 'laptop', brand: 'Lenovo', model: 'ThinkPad E16 Gen 2', year: 2024, kwh: 65, class: '—', note: '~27W avg 16" SMB' },
  { id: 'lap_lenovo_ideapad_pro_5', category: 'laptop', brand: 'Lenovo', model: 'IdeaPad Pro 5 16', year: 2024, kwh: 70, class: '—', note: '~29W Creator' },
  { id: 'lap_lenovo_yoga_7i', category: 'laptop', brand: 'Lenovo', model: 'Yoga 7i 14" (2024)', year: 2024, kwh: 50, class: '—', note: '~21W 2-in-1' },
  { id: 'lap_lenovo_yoga_pro_9i', category: 'laptop', brand: 'Lenovo', model: 'Yoga Pro 9i 16 (2024)', year: 2024, kwh: 95, class: '—', note: '~40W Creator mit RTX' },
  { id: 'lap_lenovo_legion_5_pro', category: 'laptop', brand: 'Lenovo', model: 'Legion 5 Pro 16 (2024)', year: 2024, kwh: 175, class: '—', note: '~72W Mid-Range Gaming' },
  { id: 'lap_lenovo_legion_slim_5', category: 'laptop', brand: 'Lenovo', model: 'Legion Slim 5 (2024)', year: 2024, kwh: 130, class: '—', note: '~54W Slim Gaming' },
  { id: 'lap_dell_xps13_2022', category: 'laptop', brand: 'Dell', model: 'XPS 13 9320 (2022)', year: 2022, kwh: 50, class: '—', note: '~21W avg aelter' },
  { id: 'lap_dell_xps15_2023', category: 'laptop', brand: 'Dell', model: 'XPS 15 9530 (2023)', year: 2023, kwh: 92, class: '—', note: '~38W mit RTX 4070 aelter' },
  { id: 'lap_dell_inspiron_14', category: 'laptop', brand: 'Dell', model: 'Inspiron 14 5440', year: 2024, kwh: 50, class: '—', note: '~21W Mid-Range Konsumer' },
  { id: 'lap_dell_inspiron_16', category: 'laptop', brand: 'Dell', model: 'Inspiron 16 7640', year: 2024, kwh: 60, class: '—', note: '~25W 16" Konsumer' },
  { id: 'lap_dell_vostro_5640', category: 'laptop', brand: 'Dell', model: 'Vostro 5640', year: 2024, kwh: 55, class: '—', note: '~23W SMB' },
  { id: 'lap_dell_alienware_x14_r2', category: 'laptop', brand: 'Alienware', model: 'x14 R2', year: 2023, kwh: 145, class: '—', note: '~60W Slim Gaming' },
  { id: 'lap_dell_alienware_m16_r2', category: 'laptop', brand: 'Alienware', model: 'm16 R2', year: 2024, kwh: 175, class: '—', note: '~72W Gaming Standard' },
  { id: 'lap_hp_pavilion_15', category: 'laptop', brand: 'HP', model: 'Pavilion 15 (2024)', year: 2024, kwh: 50, class: '—', note: '~21W Konsumer Mid' },
  { id: 'lap_hp_envy_x360_15', category: 'laptop', brand: 'HP', model: 'Envy x360 15 (2024)', year: 2024, kwh: 58, class: '—', note: '~24W 2-in-1 Konsumer' },
  { id: 'lap_hp_probook_440_g11', category: 'laptop', brand: 'HP', model: 'ProBook 440 G11', year: 2024, kwh: 55, class: '—', note: '~23W SMB' },
  { id: 'lap_hp_probook_460_g11', category: 'laptop', brand: 'HP', model: 'ProBook 460 G11 16"', year: 2024, kwh: 60, class: '—', note: '~25W 16" SMB' },
  { id: 'lap_hp_zbook_studio_g11', category: 'laptop', brand: 'HP', model: 'ZBook Studio G11', year: 2024, kwh: 130, class: '—', note: '~54W Mobile Workstation Slim' },
  { id: 'lap_hp_zbook_fury_g11', category: 'laptop', brand: 'HP', model: 'ZBook Fury 16 G11', year: 2024, kwh: 175, class: '—', note: '~72W Workstation Heavy' },
  { id: 'lap_hp_omen_16_2024', category: 'laptop', brand: 'HP', model: 'Omen 16 (2024)', year: 2024, kwh: 175, class: '—', note: '~72W Mid-Range Gaming' },
  { id: 'lap_hp_victus_15', category: 'laptop', brand: 'HP', model: 'Victus 15 (2024)', year: 2024, kwh: 130, class: '—', note: '~54W Budget Gaming' },
  { id: 'lap_asus_zenbook_15_2023', category: 'laptop', brand: 'Asus', model: 'Zenbook 15 OLED UM3504', year: 2023, kwh: 55, class: '—', note: '~23W OLED aelter' },
  { id: 'lap_asus_vivobook_15', category: 'laptop', brand: 'Asus', model: 'Vivobook 15 (2024)', year: 2024, kwh: 50, class: '—', note: '~21W Konsumer Standard' },
  { id: 'lap_asus_vivobook_pro_15', category: 'laptop', brand: 'Asus', model: 'Vivobook Pro 15 OLED', year: 2024, kwh: 80, class: '—', note: '~33W mit dGPU' },
  { id: 'lap_asus_expertbook_b5', category: 'laptop', brand: 'Asus', model: 'ExpertBook B5 B5604', year: 2024, kwh: 55, class: '—', note: '~23W Business' },
  { id: 'lap_asus_tuf_a15_2024', category: 'laptop', brand: 'Asus', model: 'TUF Gaming A15 (2024)', year: 2024, kwh: 145, class: '—', note: '~60W Mid-Gaming Budget' },
  { id: 'lap_asus_chromebook_plus_cx34', category: 'laptop', brand: 'Asus', model: 'Chromebook Plus CX34', year: 2024, kwh: 35, class: '—', note: '~15W ChromeOS' },
  { id: 'lap_acer_aspire_5', category: 'laptop', brand: 'Acer', model: 'Aspire 5 A515-58 (2024)', year: 2024, kwh: 50, class: '—', note: '~21W Konsumer Standard' },
  { id: 'lap_acer_swift_5', category: 'laptop', brand: 'Acer', model: 'Swift 5 SF514-56T', year: 2023, kwh: 45, class: '—', note: '~19W Premium Ultra-Slim' },
  { id: 'lap_acer_swift_x_14', category: 'laptop', brand: 'Acer', model: 'Swift X 14 (2024)', year: 2024, kwh: 70, class: '—', note: '~29W Creator mit RTX' },
  { id: 'lap_acer_predator_helios_16', category: 'laptop', brand: 'Acer', model: 'Predator Helios 16 (2024)', year: 2024, kwh: 200, class: '—', note: '~83W Heavy Gaming' },
  { id: 'lap_acer_nitro_v_16', category: 'laptop', brand: 'Acer', model: 'Nitro V 16 (2024)', year: 2024, kwh: 145, class: '—', note: '~60W Budget Gaming' },
  { id: 'lap_surface_pro_9_keyboard', category: 'laptop', brand: 'Microsoft', model: 'Surface Pro 9 mit Keyboard (2022)', year: 2022, kwh: 32, class: '—', note: '~14W als Laptop genutzt' },
  { id: 'lap_surface_laptop_5', category: 'laptop', brand: 'Microsoft', model: 'Surface Laptop 5', year: 2022, kwh: 50, class: '—', note: '~21W aelter' },
  { id: 'lap_surface_laptop_go_3', category: 'laptop', brand: 'Microsoft', model: 'Surface Laptop Go 3', year: 2023, kwh: 38, class: '—', note: '~16W kompakt 12.4"' },
  { id: 'lap_samsung_galaxy_book4_15', category: 'laptop', brand: 'Samsung', model: 'Galaxy Book4 15"', year: 2024, kwh: 50, class: '—', note: '~21W Konsumer' },
  { id: 'lap_samsung_galaxy_book4_360', category: 'laptop', brand: 'Samsung', model: 'Galaxy Book4 360', year: 2024, kwh: 48, class: '—', note: '~20W 2-in-1' },
  { id: 'lap_lg_gram_pro_17', category: 'laptop', brand: 'LG', model: 'Gram Pro 17 (2024)', year: 2024, kwh: 60, class: '—', note: '~25W Ultra-Light 17" Pro' },
  { id: 'lap_lg_gram_15_2023', category: 'laptop', brand: 'LG', model: 'Gram 15 (2023)', year: 2023, kwh: 50, class: '—', note: '~21W Ultra-Light 15"' },
  { id: 'lap_dynabook_portege_x40l', category: 'laptop', brand: 'Dynabook', model: 'Portege X40L-K', year: 2023, kwh: 50, class: '—', note: '~21W Business' },
  { id: 'lap_medion_akoya_e15', category: 'laptop', brand: 'Medion', model: 'Akoya E15407', year: 2024, kwh: 48, class: '—', note: '~20W Budget Konsumer' },
  { id: 'lap_huawei_matebook_x_pro_2024', category: 'laptop', brand: 'Huawei', model: 'MateBook X Pro (2024)', year: 2024, kwh: 50, class: '—', note: '~21W Ultra-Light Premium' },
  { id: 'lap_huawei_matebook_d16', category: 'laptop', brand: 'Huawei', model: 'MateBook D16', year: 2024, kwh: 55, class: '—', note: '~23W 16" Konsumer' },
  { id: 'lap_xiaomi_redmibook_pro_15', category: 'laptop', brand: 'Xiaomi', model: 'RedmiBook Pro 15 (2024)', year: 2024, kwh: 50, class: '—', note: '~21W Mid-Range' },
  { id: 'lap_xiaomi_book_pro_14', category: 'laptop', brand: 'Xiaomi', model: 'Mi Notebook Pro 14', year: 2023, kwh: 48, class: '—', note: '~20W' },

  // ============================================================
  // SMARTPHONES — MASSIVE ERWEITERUNG
  // ============================================================
  { id: 'phone_iphone_11', category: 'phone', brand: 'Apple', model: 'iPhone 11', year: 2019, kwh: 7, class: '—', note: '3110 mAh aelter' },
  { id: 'phone_iphone_11_pro', category: 'phone', brand: 'Apple', model: 'iPhone 11 Pro', year: 2019, kwh: 6, class: '—', note: '3046 mAh' },
  { id: 'phone_iphone_11_pro_max', category: 'phone', brand: 'Apple', model: 'iPhone 11 Pro Max', year: 2019, kwh: 8, class: '—', note: '3969 mAh' },
  { id: 'phone_iphone_12', category: 'phone', brand: 'Apple', model: 'iPhone 12', year: 2020, kwh: 6, class: '—', note: '2815 mAh, MagSafe' },
  { id: 'phone_iphone_12_mini', category: 'phone', brand: 'Apple', model: 'iPhone 12 mini', year: 2020, kwh: 5, class: '—', note: '2227 mAh' },
  { id: 'phone_iphone_12_pro', category: 'phone', brand: 'Apple', model: 'iPhone 12 Pro', year: 2020, kwh: 6, class: '—', note: '2815 mAh' },
  { id: 'phone_iphone_12_pro_max', category: 'phone', brand: 'Apple', model: 'iPhone 12 Pro Max', year: 2020, kwh: 8, class: '—', note: '3687 mAh' },
  { id: 'phone_iphone_se_2', category: 'phone', brand: 'Apple', model: 'iPhone SE (2. Gen)', year: 2020, kwh: 4, class: '—', note: '1821 mAh' },
  { id: 'phone_s21', category: 'phone', brand: 'Samsung', model: 'Galaxy S21', year: 2021, kwh: 8, class: '—', note: '4000 mAh' },
  { id: 'phone_s21_plus', category: 'phone', brand: 'Samsung', model: 'Galaxy S21+', year: 2021, kwh: 10, class: '—', note: '4800 mAh' },
  { id: 'phone_s21_ultra', category: 'phone', brand: 'Samsung', model: 'Galaxy S21 Ultra', year: 2021, kwh: 11, class: '—', note: '5000 mAh aelter' },
  { id: 'phone_s22', category: 'phone', brand: 'Samsung', model: 'Galaxy S22', year: 2022, kwh: 7, class: '—', note: '3700 mAh' },
  { id: 'phone_s22_plus', category: 'phone', brand: 'Samsung', model: 'Galaxy S22+', year: 2022, kwh: 9, class: '—', note: '4500 mAh' },
  { id: 'phone_s22_ultra', category: 'phone', brand: 'Samsung', model: 'Galaxy S22 Ultra', year: 2022, kwh: 11, class: '—', note: '5000 mAh, S Pen' },
  { id: 'phone_galaxy_a25_5g', category: 'phone', brand: 'Samsung', model: 'Galaxy A25 5G', year: 2024, kwh: 11, class: '—', note: '5000 mAh Mid-Budget' },
  { id: 'phone_galaxy_a16_5g', category: 'phone', brand: 'Samsung', model: 'Galaxy A16 5G', year: 2024, kwh: 11, class: '—', note: '5000 mAh Budget' },
  { id: 'phone_galaxy_m55', category: 'phone', brand: 'Samsung', model: 'Galaxy M55 5G', year: 2024, kwh: 11, class: '—', note: '5000 mAh M-Serie' },
  { id: 'phone_z_flip4', category: 'phone', brand: 'Samsung', model: 'Galaxy Z Flip4', year: 2022, kwh: 8, class: '—', note: '3700 mAh aelter Foldable' },
  { id: 'phone_z_fold4', category: 'phone', brand: 'Samsung', model: 'Galaxy Z Fold4', year: 2022, kwh: 10, class: '—', note: '4400 mAh aelter Foldable' },
  { id: 'phone_pixel_6', category: 'phone', brand: 'Google', model: 'Pixel 6', year: 2021, kwh: 9, class: '—', note: '4614 mAh erstes Tensor' },
  { id: 'phone_pixel_6_pro', category: 'phone', brand: 'Google', model: 'Pixel 6 Pro', year: 2021, kwh: 11, class: '—', note: '5003 mAh' },
  { id: 'phone_pixel_6a', category: 'phone', brand: 'Google', model: 'Pixel 6a', year: 2022, kwh: 9, class: '—', note: '4410 mAh' },
  { id: 'phone_redmi_note_13_pro', category: 'phone', brand: 'Xiaomi', model: 'Redmi Note 13 Pro 5G', year: 2024, kwh: 11, class: '—', note: '5100 mAh Bestseller' },
  { id: 'phone_redmi_note_14_pro', category: 'phone', brand: 'Xiaomi', model: 'Redmi Note 14 Pro+', year: 2024, kwh: 12, class: '—', note: '6200 mAh Mid-High' },
  { id: 'phone_redmi_note_12', category: 'phone', brand: 'Xiaomi', model: 'Redmi Note 12 5G', year: 2023, kwh: 11, class: '—', note: '5000 mAh Budget-Pro' },
  { id: 'phone_redmi_a3', category: 'phone', brand: 'Xiaomi', model: 'Redmi A3', year: 2024, kwh: 12, class: '—', note: '5000 mAh Sehr-Budget' },
  { id: 'phone_poco_x6_pro', category: 'phone', brand: 'Xiaomi', model: 'POCO X6 Pro', year: 2024, kwh: 11, class: '—', note: '5000 mAh Performance Mid-Range' },
  { id: 'phone_poco_f6_pro', category: 'phone', brand: 'Xiaomi', model: 'POCO F6 Pro', year: 2024, kwh: 11, class: '—', note: '5000 mAh Flagship-Killer' },
  { id: 'phone_xiaomi_13_pro', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 13 Pro', year: 2023, kwh: 10, class: '—', note: '4820 mAh aelter' },
  { id: 'phone_xiaomi_13t', category: 'phone', brand: 'Xiaomi', model: 'Xiaomi 13T', year: 2023, kwh: 11, class: '—', note: '5000 mAh Mid-Range' },
  { id: 'phone_moto_edge_50_pro', category: 'phone', brand: 'Motorola', model: 'Edge 50 Pro', year: 2024, kwh: 11, class: '—', note: '4500 mAh Mid-Range' },
  { id: 'phone_moto_edge_50_ultra', category: 'phone', brand: 'Motorola', model: 'Edge 50 Ultra', year: 2024, kwh: 11, class: '—', note: '4500 mAh Premium' },
  { id: 'phone_moto_g54_5g', category: 'phone', brand: 'Motorola', model: 'Moto G54 5G', year: 2024, kwh: 11, class: '—', note: '5000 mAh Budget' },
  { id: 'phone_moto_g75_5g', category: 'phone', brand: 'Motorola', model: 'Moto G75 5G', year: 2024, kwh: 12, class: '—', note: '5000 mAh Mid-Budget' },
  { id: 'phone_moto_razr_50_ultra', category: 'phone', brand: 'Motorola', model: 'Razr 50 Ultra', year: 2024, kwh: 9, class: '—', note: '4000 mAh Foldable' },
  { id: 'phone_realme_gt6', category: 'phone', brand: 'Realme', model: 'GT 6', year: 2024, kwh: 12, class: '—', note: '5500 mAh Performance Mid-Range' },
  { id: 'phone_realme_12_pro_plus', category: 'phone', brand: 'Realme', model: '12 Pro+', year: 2024, kwh: 11, class: '—', note: '5000 mAh Mid-Range Camera' },
  { id: 'phone_realme_c65', category: 'phone', brand: 'Realme', model: 'C65 Budget', year: 2024, kwh: 12, class: '—', note: '5000 mAh Sehr-Budget' },
  { id: 'phone_oneplus_nord_4', category: 'phone', brand: 'OnePlus', model: 'Nord 4', year: 2024, kwh: 12, class: '—', note: '5500 mAh Mid-Range' },
  { id: 'phone_oneplus_12r', category: 'phone', brand: 'OnePlus', model: 'OnePlus 12R', year: 2024, kwh: 12, class: '—', note: '5500 mAh Sub-Flagship' },
  { id: 'phone_honor_200', category: 'phone', brand: 'Honor', model: 'Honor 200', year: 2024, kwh: 11, class: '—', note: '5200 mAh Mid-Range' },
  { id: 'phone_honor_x9b', category: 'phone', brand: 'Honor', model: 'Honor X9b', year: 2024, kwh: 12, class: '—', note: '5800 mAh Robust Budget' },
  { id: 'phone_honor_magic7_pro', category: 'phone', brand: 'Honor', model: 'Magic7 Pro', year: 2025, kwh: 12, class: '—', note: '5850 mAh Premium' },
  { id: 'phone_huawei_pura70_pro', category: 'phone', brand: 'Huawei', model: 'Pura 70 Pro', year: 2024, kwh: 11, class: '—', note: '5050 mAh Premium ohne Google' },
  { id: 'phone_huawei_mate_xt', category: 'phone', brand: 'Huawei', model: 'Mate XT Tri-Fold', year: 2024, kwh: 12, class: '—', note: '5600 mAh Tri-Fold' },
  { id: 'phone_asus_rog_phone_8_pro', category: 'phone', brand: 'Asus', model: 'ROG Phone 8 Pro', year: 2024, kwh: 14, class: '—', note: '5500 mAh Gaming-Phone' },
  { id: 'phone_asus_zenfone_11_ultra', category: 'phone', brand: 'Asus', model: 'Zenfone 11 Ultra', year: 2024, kwh: 12, class: '—', note: '5500 mAh Flagship' },
  { id: 'phone_sony_xperia_1_vi', category: 'phone', brand: 'Sony', model: 'Xperia 1 VI', year: 2024, kwh: 11, class: '—', note: '5000 mAh Premium' },
  { id: 'phone_sony_xperia_10_vi', category: 'phone', brand: 'Sony', model: 'Xperia 10 VI', year: 2024, kwh: 11, class: '—', note: '5000 mAh Mid-Range' },
  { id: 'phone_fairphone_5', category: 'phone', brand: 'Fairphone', model: 'Fairphone 5', year: 2023, kwh: 10, class: '—', note: '4200 mAh Modular Sustainable' },
  { id: 'phone_cmf_phone_1', category: 'phone', brand: 'Nothing', model: 'CMF Phone 1', year: 2024, kwh: 11, class: '—', note: '5000 mAh Budget Sub-Brand' },
  { id: 'phone_tecno_camon_30_premier', category: 'phone', brand: 'Tecno', model: 'Camon 30 Premier', year: 2024, kwh: 11, class: '—', note: '5000 mAh Budget Camera' },
  { id: 'phone_infinix_zero_30', category: 'phone', brand: 'Infinix', model: 'Zero 30 5G', year: 2024, kwh: 11, class: '—', note: '5000 mAh Budget' },

  // ============================================================
  // TABLETS — ERWEITERUNG
  // ============================================================
  { id: 'tab_ipad_9', category: 'tablet', brand: 'Apple', model: 'iPad (9. Gen)', year: 2021, kwh: 11, class: '—', note: '32.4 Wh aelter' },
  { id: 'tab_ipad_air_5_m1_10', category: 'tablet', brand: 'Apple', model: 'iPad Air 10.9" M1 (5. Gen)', year: 2022, kwh: 13, class: '—', note: '28.6 Wh M1' },
  { id: 'tab_ipad_pro_2020_11', category: 'tablet', brand: 'Apple', model: 'iPad Pro 11" (2020) A12Z', year: 2020, kwh: 14, class: '—', note: '28.65 Wh aelter' },
  { id: 'tab_ipad_pro_2021_129_m1', category: 'tablet', brand: 'Apple', model: 'iPad Pro 12.9" M1 (2021)', year: 2021, kwh: 18, class: '—', note: '40.88 Wh' },
  { id: 'tab_galaxy_tab_s8', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S8', year: 2022, kwh: 13, class: '—', note: '8000 mAh aelter' },
  { id: 'tab_galaxy_tab_s8_plus', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S8+', year: 2022, kwh: 16, class: '—', note: '10090 mAh' },
  { id: 'tab_galaxy_tab_s8_ultra', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S8 Ultra', year: 2022, kwh: 18, class: '—', note: '11200 mAh aelter' },
  { id: 'tab_galaxy_tab_s10', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab S10', year: 2024, kwh: 14, class: '—', note: '8400 mAh 11" 2024' },
  { id: 'tab_galaxy_tab_a9', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab A9', year: 2023, kwh: 11, class: '—', note: '5100 mAh Budget' },
  { id: 'tab_galaxy_tab_active_5', category: 'tablet', brand: 'Samsung', model: 'Galaxy Tab Active 5 Rugged', year: 2024, kwh: 12, class: '—', note: 'Outdoor/Industrie Tablet' },
  { id: 'tab_lenovo_tab_m11', category: 'tablet', brand: 'Lenovo', model: 'Tab M11', year: 2024, kwh: 11, class: '—', note: '7040 mAh Konsumer' },
  { id: 'tab_lenovo_tab_p11_gen2', category: 'tablet', brand: 'Lenovo', model: 'Tab P11 Gen 2', year: 2023, kwh: 13, class: '—', note: '7700 mAh Mid-Range' },
  { id: 'tab_xiaomi_redmi_pad_se', category: 'tablet', brand: 'Xiaomi', model: 'Redmi Pad SE', year: 2023, kwh: 12, class: '—', note: '8000 mAh Budget' },
  { id: 'tab_xiaomi_pad_7', category: 'tablet', brand: 'Xiaomi', model: 'Pad 7', year: 2025, kwh: 13, class: '—', note: '8850 mAh Mid-Range' },
  { id: 'tab_honor_pad_9', category: 'tablet', brand: 'Honor', model: 'Pad 9', year: 2024, kwh: 13, class: '—', note: '8300 mAh Mid-Range' },
  { id: 'tab_huawei_matepad_11_5', category: 'tablet', brand: 'Huawei', model: 'MatePad 11.5"', year: 2024, kwh: 12, class: '—', note: '7700 mAh Mid-Range' },
  { id: 'tab_oneplus_pad', category: 'tablet', brand: 'OnePlus', model: 'OnePlus Pad', year: 2023, kwh: 14, class: '—', note: '9510 mAh Original' },
  { id: 'tab_amazon_fire_max_11', category: 'tablet', brand: 'Amazon', model: 'Fire Max 11', year: 2023, kwh: 11, class: '—', note: '7500 mAh Amazon Tablet' },
  { id: 'tab_amazon_fire_hd_10', category: 'tablet', brand: 'Amazon', model: 'Fire HD 10 (2023)', year: 2023, kwh: 9, class: '—', note: '5300 mAh Budget' },

  // ============================================================
  // WEARABLES — ERWEITERUNG
  // ============================================================
  { id: 'wear_apple_watch_s9', category: 'wearable', brand: 'Apple', model: 'Apple Watch Series 9', year: 2023, kwh: 2, class: '—', note: 'Taegliches Laden aelter' },
  { id: 'wear_apple_watch_se_2', category: 'wearable', brand: 'Apple', model: 'Apple Watch SE (2. Gen)', year: 2022, kwh: 2, class: '—', note: 'Budget Apple Watch' },
  { id: 'wear_galaxy_watch_ultra', category: 'wearable', brand: 'Samsung', model: 'Galaxy Watch Ultra', year: 2024, kwh: 2, class: '—', note: 'Outdoor Pro 100h Laufzeit' },
  { id: 'wear_pixel_watch_2', category: 'wearable', brand: 'Google', model: 'Pixel Watch 2', year: 2023, kwh: 2, class: '—', note: 'Aelter, taegliches Laden' },
  { id: 'wear_garmin_forerunner_965', category: 'wearable', brand: 'Garmin', model: 'Forerunner 965', year: 2023, kwh: 1, class: '—', note: 'Laufuhr 23 Tage Akku' },
  { id: 'wear_garmin_venu_3', category: 'wearable', brand: 'Garmin', model: 'Venu 3', year: 2023, kwh: 1, class: '—', note: 'AMOLED 14 Tage Akku' },
  { id: 'wear_garmin_instinct_3', category: 'wearable', brand: 'Garmin', model: 'Instinct 3 Solar', year: 2024, kwh: 1, class: '—', note: 'Outdoor Solar-geladen!' },
  { id: 'wear_polar_vantage_v3', category: 'wearable', brand: 'Polar', model: 'Vantage V3', year: 2023, kwh: 1, class: '—', note: 'Sportuhr 8 Tage' },
  { id: 'wear_suunto_race', category: 'wearable', brand: 'Suunto', model: 'Race', year: 2023, kwh: 1, class: '—', note: 'AMOLED Outdoor' },
  { id: 'wear_fitbit_charge_6', category: 'wearable', brand: 'Fitbit', model: 'Charge 6', year: 2023, kwh: 1, class: '—', note: 'Tracker 7 Tage' },
  { id: 'wear_oura_ring_gen3', category: 'wearable', brand: 'Oura', model: 'Ring Gen 3', year: 2023, kwh: 1, class: '—', note: 'Smart-Ring Schlaf-Tracking' },
  { id: 'wear_xiaomi_smart_band_8_pro', category: 'wearable', brand: 'Xiaomi', model: 'Smart Band 8 Pro', year: 2024, kwh: 1, class: '—', note: 'Tracker Budget 14 Tage' },
  { id: 'wear_xiaomi_watch_2_pro', category: 'wearable', brand: 'Xiaomi', model: 'Watch 2 Pro', year: 2024, kwh: 2, class: '—', note: 'Wear OS Mid-Range' },
  { id: 'wear_huawei_watch_gt5', category: 'wearable', brand: 'Huawei', model: 'Watch GT 5', year: 2024, kwh: 1, class: '—', note: '14 Tage Akku' },
  { id: 'wear_pixel_buds_pro_2', category: 'wearable', brand: 'Google', model: 'Pixel Buds Pro 2', year: 2024, kwh: 2, class: '—', note: 'Premium ANC Buds' },
  { id: 'wear_galaxy_buds_3_pro', category: 'wearable', brand: 'Samsung', model: 'Galaxy Buds 3 Pro', year: 2024, kwh: 2, class: '—', note: 'Premium Galaxy ANC' },
  { id: 'wear_sony_wf_1000xm5', category: 'wearable', brand: 'Sony', model: 'WF-1000XM5 Buds', year: 2023, kwh: 2, class: '—', note: 'Premium Sony Buds' },
  { id: 'wear_bose_qc_ultra_buds', category: 'wearable', brand: 'Bose', model: 'QuietComfort Ultra Earbuds', year: 2023, kwh: 2, class: '—', note: 'Bose Premium Buds' },
  { id: 'wear_jabra_elite_10', category: 'wearable', brand: 'Jabra', model: 'Elite 10', year: 2023, kwh: 2, class: '—', note: 'Premium Buds' },
  { id: 'wear_sennheiser_momentum_4', category: 'wearable', brand: 'Sennheiser', model: 'Momentum 4 Wireless', year: 2022, kwh: 4, class: '—', note: 'Over-Ear Premium' },
  { id: 'wear_airpods_3', category: 'wearable', brand: 'Apple', model: 'AirPods (3. Gen)', year: 2021, kwh: 3, class: '—', note: 'Standard AirPods' },
  { id: 'wear_pico_4', category: 'wearable', brand: 'Pico', model: 'Pico 4', year: 2022, kwh: 22, class: '—', note: 'VR-Headset Standalone' },
  { id: 'wear_valve_index', category: 'wearable', brand: 'Valve', model: 'Index VR', year: 2019, kwh: 35, class: '—', note: 'PC-VR aelter ~25W' },

  // ============================================================
  // KLIMA — ERWEITERUNG
  // ============================================================
  { id: 'ac_lg_dualcool_ac12bk', category: 'aircon', brand: 'LG', model: 'DualCool AC12BK Split', year: 2024, kwh: 530, class: 'A+++', note: 'Split 3.5kW Premium' },
  { id: 'ac_samsung_windfree_ar12', category: 'aircon', brand: 'Samsung', model: 'WindFree AR12 Split', year: 2024, kwh: 545, class: 'A+++', note: 'WindFree-Technologie' },
  { id: 'ac_toshiba_seiya_b13', category: 'aircon', brand: 'Toshiba', model: 'Seiya RAS-B13 Split', year: 2024, kwh: 510, class: 'A+++', note: 'Mid-Range Split' },
  { id: 'ac_fujitsu_lmcb_12', category: 'aircon', brand: 'Fujitsu', model: 'ASYG12LMCE Split', year: 2024, kwh: 525, class: 'A+++', note: 'Standard Split' },
  { id: 'ac_gree_amber_premium_12', category: 'aircon', brand: 'Gree', model: 'Amber Premium 12', year: 2023, kwh: 540, class: 'A++', note: 'Budget-Premium Split' },
  { id: 'ac_olimpia_unico_air_inverter', category: 'aircon', brand: 'Olimpia Splendid', model: 'Unico Air Inverter 8 SF', year: 2024, kwh: 380, class: 'A', note: 'Monoblock ohne Aussengeraet' },
  { id: 'ac_argo_ulisse_13', category: 'aircon', brand: 'Argo', model: 'Ulisse 13 DCI Mobile', year: 2024, kwh: 420, class: 'A', note: 'Mobile mit Aussengeraet' },
  { id: 'ac_klarstein_jungle', category: 'aircon', brand: 'Klarstein', model: 'Cooling Tower Jungle', year: 2024, kwh: 280, class: 'A', note: 'Mobile Budget' },
  { id: 'ac_fan_dyson_pure_cool', category: 'aircon', brand: 'Dyson', model: 'Pure Cool TP07', year: 2023, kwh: 60, class: '—', note: 'Ventilator + HEPA-Filter' },
  { id: 'ac_fan_xiaomi_smart_standing', category: 'aircon', brand: 'Xiaomi', model: 'Mi Smart Standing Fan 2', year: 2023, kwh: 35, class: '—', note: 'Standventilator Smart' },
  { id: 'ac_fan_meaco_1056', category: 'aircon', brand: 'Meaco', model: 'MeacoFan 1056 Air Circulator', year: 2024, kwh: 25, class: '—', note: 'Premium Ventilator' },

  // ============================================================
  // HAUSHALT-KLEINGERAETE — ERWEITERUNG
  // ============================================================
  { id: 'misc_vacuum_dyson_v8', category: 'small_misc', brand: 'Dyson', model: 'V8 Absolute (aelter)', year: 2019, kwh: 14, class: '—', note: 'Akku-Staubsauger Vorgaenger' },
  { id: 'misc_vacuum_dyson_v12', category: 'small_misc', brand: 'Dyson', model: 'V12 Detect Slim', year: 2022, kwh: 16, class: '—', note: 'Akku-Staubsauger Mid' },
  { id: 'misc_vacuum_dreame_z10_pro', category: 'small_misc', brand: 'Dreame', model: 'Z10 Pro Akku', year: 2024, kwh: 14, class: '—', note: 'Akku-Staubsauger Mid' },
  { id: 'misc_vacuum_xiaomi_g20_lite', category: 'small_misc', brand: 'Xiaomi', model: 'Mi Vacuum G20 Lite', year: 2024, kwh: 12, class: '—', note: 'Budget Akku-Sauger' },
  { id: 'misc_vacuum_aeg_qx7', category: 'small_misc', brand: 'AEG', model: 'QX7 Animal Akku', year: 2023, kwh: 14, class: '—', note: 'Akku-Sauger Mid-Range' },
  { id: 'misc_vacuum_corded_miele_c3', category: 'small_misc', brand: 'Miele', model: 'Complete C3 Boden', year: 2023, kwh: 30, class: 'A', note: 'Bodenstaubsauger Premium' },
  { id: 'misc_vacuum_corded_bosch_serie6', category: 'small_misc', brand: 'Bosch', model: 'BGS41ZOORU ProAnimal', year: 2024, kwh: 28, class: 'A', note: 'Bodenstaubsauger' },
  { id: 'misc_robot_irobot_roomba_j7', category: 'small_misc', brand: 'iRobot', model: 'Roomba j7+', year: 2022, kwh: 50, class: '—', note: 'Saugroboter Premium aelter' },
  { id: 'misc_robot_ecovacs_x2_omni', category: 'small_misc', brand: 'Ecovacs', model: 'Deebot X2 Omni', year: 2023, kwh: 60, class: '—', note: 'Saug- und Wischroboter' },
  { id: 'misc_robot_eufy_x10_pro', category: 'small_misc', brand: 'Eufy', model: 'X10 Pro Omni', year: 2024, kwh: 55, class: '—', note: 'Mit Saug-Mopp Station' },
  { id: 'misc_robot_xiaomi_x10', category: 'small_misc', brand: 'Xiaomi', model: 'Robot Vacuum X10+', year: 2023, kwh: 50, class: '—', note: 'Mid-Range mit Auto-Empty' },
  { id: 'misc_lawn_husqvarna_automower_405x', category: 'small_misc', brand: 'Husqvarna', model: 'Automower 405X', year: 2024, kwh: 95, class: '—', note: 'Maehroboter saisonal' },
  { id: 'misc_lawn_worx_landroid_m', category: 'small_misc', brand: 'Worx', model: 'Landroid M500 Plus', year: 2023, kwh: 75, class: '—', note: 'Maehroboter Mid-Range' },
  { id: 'misc_iron_steamone_compact_steam', category: 'small_misc', brand: 'SteamOne', model: 'Compact Steamer', year: 2024, kwh: 25, class: '—', note: 'Dampfglaetter' },
  { id: 'misc_iron_philips_eco_care', category: 'small_misc', brand: 'Philips', model: 'EcoCare Easy 5000', year: 2023, kwh: 30, class: '—', note: 'Buegeleisen Standard' },
  { id: 'misc_hairdryer_philips_8000', category: 'small_misc', brand: 'Philips', model: 'BHD8000 SenseIQ', year: 2024, kwh: 22, class: '—', note: 'Mid-Range Foehn' },
  { id: 'misc_hairdryer_remington_proluxe', category: 'small_misc', brand: 'Remington', model: 'PROluxe AC9140', year: 2023, kwh: 25, class: '—', note: 'Standard Foehn' },
  { id: 'misc_dehumidifier_meaco_arete_1', category: 'small_misc', brand: 'Meaco', model: 'Arete One 25L', year: 2024, kwh: 320, class: '—', note: 'Premium Entfeuchter' },
  { id: 'misc_humidifier_dyson_humidify_cool', category: 'small_misc', brand: 'Dyson', model: 'Humidify+Cool PH04', year: 2024, kwh: 175, class: '—', note: 'Premium Luftbefeuchter' },
  { id: 'misc_humidifier_stadlerform_oskar', category: 'small_misc', brand: 'Stadler Form', model: 'Oskar Verdunster', year: 2023, kwh: 45, class: '—', note: 'Schweizer Befeuchter' },
  { id: 'misc_air_purifier_dyson_big_quiet', category: 'small_misc', brand: 'Dyson', model: 'Big+Quiet Formaldehyde', year: 2024, kwh: 250, class: '—', note: 'Premium Luftreiniger' },
  { id: 'misc_air_purifier_xiaomi_4_pro', category: 'small_misc', brand: 'Xiaomi', model: 'Smart Air Purifier 4 Pro', year: 2024, kwh: 110, class: '—', note: 'Budget Luftreiniger' },
  { id: 'misc_air_purifier_blueair_blue_max', category: 'small_misc', brand: 'Blueair', model: 'Blue Max 3450i', year: 2024, kwh: 95, class: '—', note: 'Premium HEPA-Reiniger' },
  { id: 'misc_steamcleaner_karcher_sc4', category: 'small_misc', brand: 'Kaercher', model: 'SC 4 EasyFix Dampfreiniger', year: 2023, kwh: 45, class: '—', note: 'Dampfreiniger gelegentlich' },
  { id: 'misc_window_cleaner_karcher_wv6', category: 'small_misc', brand: 'Kaercher', model: 'WV 6 Plus N Akku-Fenstersauger', year: 2024, kwh: 6, class: '—', note: 'Akku-Fensterreiniger' },
  { id: 'misc_pressure_washer_karcher_k7', category: 'small_misc', brand: 'Kaercher', model: 'K 7 Hochdruckreiniger', year: 2024, kwh: 65, class: '—', note: 'Hochdruckreiniger saisonal' },
  { id: 'misc_sewing_brother_innov_is', category: 'small_misc', brand: 'Brother', model: 'Innov-is V3', year: 2023, kwh: 18, class: '—', note: 'Naehmaschine gelegentlich' },
  { id: 'misc_paper_shredder_office', category: 'small_misc', brand: 'Generic', model: 'Aktenvernichter Buero', year: 2023, kwh: 25, class: '—', note: 'Aktenvernichter gelegentlich' },

  // ============================================================
  // BELEUCHTUNG — ERWEITERUNG
  // ============================================================
  { id: 'light_hue_starter_4', category: 'lighting', brand: 'Philips Hue', model: 'White Ambiance 4 Lampen', year: 2024, kwh: 38, class: '—', note: '~6W x 4 Lampen' },
  { id: 'light_hue_play_gradient', category: 'lighting', brand: 'Philips Hue', model: 'Play Gradient TV-Stripe 75"', year: 2024, kwh: 50, class: '—', note: 'TV-Beleuchtung' },
  { id: 'light_govee_immersion', category: 'lighting', brand: 'Govee', model: 'Immersion TV Backlight', year: 2024, kwh: 35, class: '—', note: 'Budget TV-LED-Strip' },
  { id: 'light_nanoleaf_shapes', category: 'lighting', brand: 'Nanoleaf', model: 'Shapes Hexagons 9er', year: 2024, kwh: 65, class: '—', note: 'Wandbeleuchtung Smart' },
  { id: 'light_ledvance_smart_kit', category: 'lighting', brand: 'Ledvance', model: 'Smart+ Wifi 5 Lampen', year: 2024, kwh: 50, class: '—', note: '~7W x 5 Lampen Mid-Range' },
  { id: 'light_ikea_tradfri_kit', category: 'lighting', brand: 'IKEA', model: 'TRADFRI 6 Lampen Bundle', year: 2024, kwh: 58, class: '—', note: 'Budget Smart Home' },
  { id: 'light_pool_underwater', category: 'lighting', brand: 'Generic', model: 'Pool-Unterwasserbeleuchtung Saison', year: 2024, kwh: 75, class: '—', note: '~50W x 4h x Saison' },
  { id: 'light_christmas_outdoor_led', category: 'lighting', brand: 'Generic', model: 'Aussen-Weihnachts-LED-Kette', year: 2024, kwh: 35, class: '—', note: 'Saison ~6W x 8h x 60 Tage' },
  { id: 'light_garden_solar', category: 'lighting', brand: 'Generic', model: 'Solar-Garten-LEDs', year: 2024, kwh: 0, class: '—', note: 'Solar-betrieben, kein Netz' },

  // ============================================================
  // SPEZIAL — ERWEITERUNG
  // ============================================================
  { id: 'special_aquarium_60l', category: 'special', brand: 'Generic', model: 'Aquarium 60L beheizt', year: 2024, kwh: 165, class: '—', note: 'Kleines Aquarium' },
  { id: 'special_aquarium_400l', category: 'special', brand: 'Generic', model: 'Aquarium 400L beheizt Premium', year: 2024, kwh: 850, class: '—', note: 'Grosses Aquarium' },
  { id: 'special_terrarium_reptilien', category: 'special', brand: 'Generic', model: 'Reptilien-Terrarium beheizt', year: 2024, kwh: 350, class: '—', note: 'Heizmatte + UV 24/7' },
  { id: 'special_pool_pump_summer', category: 'special', brand: 'Generic', model: 'Pool-Filterpumpe Saison', year: 2024, kwh: 850, class: '—', note: 'Pool-Pumpe ~200W x 12h' },
  { id: 'special_pool_robot', category: 'special', brand: 'Dolphin', model: 'Pool-Reinigungsroboter saisonal', year: 2024, kwh: 45, class: '—', note: 'Pool-Roboter saisonal' },
  { id: 'special_hottub_indoor', category: 'special', brand: 'Generic', model: 'Indoor-Whirlpool ganzjaehrig', year: 2024, kwh: 2800, class: '—', note: 'Innen-Whirlpool' },
  { id: 'special_aufguss_sauna_4kw', category: 'special', brand: 'Generic', model: 'Aufgusssauna 4kW (1x/Woche)', year: 2024, kwh: 600, class: '—', note: 'Kleine Sauna' },
  { id: 'special_finnish_sauna_8kw', category: 'special', brand: 'Generic', model: 'Finnische Sauna 8kW (3x/Woche)', year: 2024, kwh: 1800, class: '—', note: 'Grosse Heim-Sauna' },
  { id: 'special_ev_charger_5k', category: 'special', brand: 'Generic', model: 'E-Auto laden 5000 km/J', year: 2024, kwh: 1000, class: '—', note: 'Wenig-Fahrer' },
  { id: 'special_ev_charger_25k', category: 'special', brand: 'Generic', model: 'E-Auto laden 25000 km/J', year: 2024, kwh: 5000, class: '—', note: 'Pendler intensiv' },
  { id: 'special_ev_charger_2x', category: 'special', brand: 'Generic', model: '2x E-Auto laden 15000 km je', year: 2024, kwh: 6000, class: '—', note: 'Doppel-Haushalt EV' },
  { id: 'special_pluginhybrid', category: 'special', brand: 'Generic', model: 'Plug-in-Hybrid 12000 km/J', year: 2024, kwh: 1100, class: '—', note: 'PHEV ~50% elektrisch' },
  { id: 'special_emotorbike', category: 'special', brand: 'Generic', model: 'E-Motorrad / E-Roller', year: 2024, kwh: 250, class: '—', note: 'E-Moped, Saison' },
  { id: 'special_ebike_2x', category: 'special', brand: 'Generic', model: '2x E-Bike laden ganzjaehrig', year: 2024, kwh: 160, class: '—', note: '2 x 500Wh saisonal' },
  { id: 'special_etrottinette', category: 'special', brand: 'Generic', model: 'E-Trottinett Saison', year: 2024, kwh: 50, class: '—', note: 'E-Scooter' },
  { id: 'special_3dprinter_prusa', category: 'special', brand: 'Prusa', model: 'Original Prusa MK4S', year: 2024, kwh: 130, class: '—', note: '3D-Drucker Hobby ~3h/Tag' },
  { id: 'special_3dprinter_bambu_x1c', category: 'special', brand: 'Bambu Lab', model: 'X1-Carbon 3D-Drucker', year: 2024, kwh: 175, class: '—', note: 'Premium 3D-Drucker oft' },
  { id: 'special_lasercutter_xtool', category: 'special', brand: 'xTool', model: 'P2 CO2 Lasercutter', year: 2024, kwh: 200, class: '—', note: 'Hobby/Maker Lasercutter' },
  { id: 'special_garage_door', category: 'special', brand: 'Generic', model: 'Garagentorantrieb', year: 2024, kwh: 35, class: '—', note: 'Garagentor mit Standby' },
  { id: 'special_alarm_system', category: 'special', brand: 'Generic', model: 'Alarmanlage 24/7', year: 2024, kwh: 45, class: '—', note: 'Alarm-Standby' },
  { id: 'special_security_cam_4x', category: 'special', brand: 'Generic', model: '4x Ueberwachungskameras 24/7', year: 2024, kwh: 105, class: '—', note: '~3W x 4 Kameras' },
  { id: 'special_video_doorbell_ring', category: 'special', brand: 'Ring', model: 'Video Doorbell Pro 2', year: 2024, kwh: 18, class: '—', note: 'Tuerklingel-Cam fest' },
  { id: 'special_smart_lock', category: 'special', brand: 'Nuki / Yale', model: 'Smart Lock Akku', year: 2024, kwh: 4, class: '—', note: 'Smart Lock minimal' },
  { id: 'special_irrigation_system', category: 'special', brand: 'Generic', model: 'Bewaesserungssystem Saison', year: 2024, kwh: 110, class: '—', note: 'Garten Saison' },
  { id: 'special_water_softener', category: 'special', brand: 'Generic', model: 'Wasserenthaerter', year: 2024, kwh: 90, class: '—', note: 'Wasseraufbereitung 24/7' },
  { id: 'special_dehumidifier_basement', category: 'special', brand: 'Generic', model: 'Keller-Entfeuchter ganzjaehrig', year: 2024, kwh: 700, class: '—', note: 'Keller intensiv' },
  { id: 'special_septic_pump', category: 'special', brand: 'Generic', model: 'Hebeanlage / Septic-Pumpe', year: 2024, kwh: 180, class: '—', note: 'Abwasserhebung 24/7' },
  { id: 'special_well_pump', category: 'special', brand: 'Generic', model: 'Brunnen/Hauswasser-Pumpe', year: 2024, kwh: 250, class: '—', note: 'Eigenwasserversorgung' },
  { id: 'special_floor_heating_partial', category: 'special', brand: 'Generic', model: 'Elektrische Bodenheizung Bad', year: 2024, kwh: 450, class: '—', note: 'Nur Bad/Kueche, Saison' },
  { id: 'special_homeoffice_setup', category: 'special', brand: 'Generic', model: 'Home-Office-Setup 8h/Tag', year: 2024, kwh: 280, class: '—', note: 'Vollzeit-Homeoffice' },

];


/* ========================================================================
   HELPER FUNCTIONS
   ======================================================================== */

export function getCategoryAverage(categoryId) {
  const cat = DEVICE_CATEGORIES[categoryId];
  return cat ? cat.avgKwh : 200;
}

export function getDeviceById(id) {
  return DEVICES.find((d) => d.id === id);
}

export function getDevicesByCategory(categoryId) {
  return DEVICES.filter((d) => d.category === categoryId);
}

export function getBrandsForCategory(categoryId) {
  return [...new Set(DEVICES.filter((d) => d.category === categoryId).map((d) => d.brand))].sort();
}

export function getDeviceCount() {
  return DEVICES.length;
}
