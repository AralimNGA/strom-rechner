/**
 * PC-Komponenten-Datenbank (aktuelle Modelle 2023–2026)
 * idle/load in Watt (TechPowerUp, Tom's Hardware)
 */

export const CPUS = [
  // AMD Ryzen 7000
  { id: 'r5_7600', name: 'AMD Ryzen 5 7600', idle: 25, load: 95, gen: 'Zen 4' },
  { id: 'r5_7600x', name: 'AMD Ryzen 5 7600X', idle: 28, load: 115, gen: 'Zen 4' },
  { id: 'r7_7700', name: 'AMD Ryzen 7 7700', idle: 30, load: 105, gen: 'Zen 4' },
  { id: 'r7_7700x', name: 'AMD Ryzen 7 7700X', idle: 35, load: 130, gen: 'Zen 4' },
  { id: 'r7_7800x3d', name: 'AMD Ryzen 7 7800X3D', idle: 30, load: 85, gen: 'Zen 4 X3D' },
  { id: 'r9_7900x', name: 'AMD Ryzen 9 7900X', idle: 40, load: 170, gen: 'Zen 4' },
  { id: 'r9_7900x3d', name: 'AMD Ryzen 9 7900X3D', idle: 38, load: 120, gen: 'Zen 4 X3D' },
  { id: 'r9_7950x', name: 'AMD Ryzen 9 7950X', idle: 45, load: 220, gen: 'Zen 4' },
  { id: 'r9_7950x3d', name: 'AMD Ryzen 9 7950X3D', idle: 42, load: 145, gen: 'Zen 4 X3D' },
  // AMD Ryzen 9000
  { id: 'r5_9600x', name: 'AMD Ryzen 5 9600X', idle: 25, load: 88, gen: 'Zen 5' },
  { id: 'r7_9700x', name: 'AMD Ryzen 7 9700X', idle: 28, load: 95, gen: 'Zen 5' },
  { id: 'r7_9800x3d', name: 'AMD Ryzen 7 9800X3D', idle: 30, load: 130, gen: 'Zen 5 X3D' },
  { id: 'r9_9900x', name: 'AMD Ryzen 9 9900X', idle: 38, load: 140, gen: 'Zen 5' },
  { id: 'r9_9900x3d', name: 'AMD Ryzen 9 9900X3D', idle: 40, load: 160, gen: 'Zen 5 X3D' },
  { id: 'r9_9950x', name: 'AMD Ryzen 9 9950X', idle: 42, load: 200, gen: 'Zen 5' },
  { id: 'r9_9950x3d', name: 'AMD Ryzen 9 9950X3D', idle: 42, load: 180, gen: 'Zen 5 X3D' },
  // Intel Raptor Lake
  { id: 'i5_13600k', name: 'Intel Core i5-13600K', idle: 20, load: 180, gen: 'Raptor Lake' },
  { id: 'i7_13700k', name: 'Intel Core i7-13700K', idle: 25, load: 240, gen: 'Raptor Lake' },
  { id: 'i9_13900k', name: 'Intel Core i9-13900K', idle: 30, load: 280, gen: 'Raptor Lake' },
  { id: 'i9_13900ks', name: 'Intel Core i9-13900KS', idle: 32, load: 310, gen: 'Raptor Lake' },
  { id: 'i5_14600k', name: 'Intel Core i5-14600K', idle: 22, load: 200, gen: 'Raptor Lake Refresh' },
  { id: 'i7_14700k', name: 'Intel Core i7-14700K', idle: 28, load: 253, gen: 'Raptor Lake Refresh' },
  { id: 'i9_14900k', name: 'Intel Core i9-14900K', idle: 32, load: 320, gen: 'Raptor Lake Refresh' },
  { id: 'i9_14900ks', name: 'Intel Core i9-14900KS', idle: 34, load: 350, gen: 'Raptor Lake Refresh' },
  // Arrow Lake
  { id: 'ultra_5_245k', name: 'Intel Core Ultra 5 245K', idle: 22, load: 165, gen: 'Arrow Lake' },
  { id: 'ultra_7_265k', name: 'Intel Core Ultra 7 265K', idle: 25, load: 210, gen: 'Arrow Lake' },
  { id: 'ultra_9_285k', name: 'Intel Core Ultra 9 285K', idle: 28, load: 250, gen: 'Arrow Lake' },
];

export const GPUS = [
  { id: 'none', name: 'Keine dedizierte GPU (iGPU)', idle: 5, load: 15 },
  // RTX 40
  { id: 'rtx4060', name: 'NVIDIA GeForce RTX 4060', idle: 12, load: 115 },
  { id: 'rtx4060ti_8', name: 'NVIDIA GeForce RTX 4060 Ti 8GB', idle: 15, load: 160 },
  { id: 'rtx4060ti_16', name: 'NVIDIA GeForce RTX 4060 Ti 16GB', idle: 15, load: 160 },
  { id: 'rtx4070', name: 'NVIDIA GeForce RTX 4070', idle: 15, load: 200 },
  { id: 'rtx4070s', name: 'NVIDIA GeForce RTX 4070 Super', idle: 16, load: 220 },
  { id: 'rtx4070ti', name: 'NVIDIA GeForce RTX 4070 Ti', idle: 18, load: 285 },
  { id: 'rtx4070tis', name: 'NVIDIA GeForce RTX 4070 Ti Super', idle: 20, load: 290 },
  { id: 'rtx4080', name: 'NVIDIA GeForce RTX 4080', idle: 20, load: 320 },
  { id: 'rtx4080s', name: 'NVIDIA GeForce RTX 4080 Super', idle: 20, load: 320 },
  { id: 'rtx4090', name: 'NVIDIA GeForce RTX 4090', idle: 22, load: 450 },
  // RTX 50
  { id: 'rtx5060', name: 'NVIDIA GeForce RTX 5060', idle: 12, load: 150 },
  { id: 'rtx5060ti', name: 'NVIDIA GeForce RTX 5060 Ti', idle: 15, load: 180 },
  { id: 'rtx5070', name: 'NVIDIA GeForce RTX 5070', idle: 18, load: 250 },
  { id: 'rtx5070ti', name: 'NVIDIA GeForce RTX 5070 Ti', idle: 20, load: 300 },
  { id: 'rtx5080', name: 'NVIDIA GeForce RTX 5080', idle: 22, load: 360 },
  { id: 'rtx5090', name: 'NVIDIA GeForce RTX 5090', idle: 28, load: 575 },
  // RX 7000
  { id: 'rx7600', name: 'AMD Radeon RX 7600', idle: 12, load: 165 },
  { id: 'rx7600xt', name: 'AMD Radeon RX 7600 XT', idle: 15, load: 190 },
  { id: 'rx7700xt', name: 'AMD Radeon RX 7700 XT', idle: 16, load: 245 },
  { id: 'rx7800xt', name: 'AMD Radeon RX 7800 XT', idle: 18, load: 263 },
  { id: 'rx7900gre', name: 'AMD Radeon RX 7900 GRE', idle: 20, load: 260 },
  { id: 'rx7900xt', name: 'AMD Radeon RX 7900 XT', idle: 20, load: 315 },
  { id: 'rx7900xtx', name: 'AMD Radeon RX 7900 XTX', idle: 22, load: 355 },
  // RX 9000
  { id: 'rx9060xt', name: 'AMD Radeon RX 9060 XT', idle: 14, load: 180 },
  { id: 'rx9070', name: 'AMD Radeon RX 9070', idle: 18, load: 220 },
  { id: 'rx9070xt', name: 'AMD Radeon RX 9070 XT', idle: 20, load: 304 },
  // Intel Arc
  { id: 'arc_b580', name: 'Intel Arc B580', idle: 12, load: 190 },
  { id: 'arc_b570', name: 'Intel Arc B570', idle: 12, load: 150 },
];
