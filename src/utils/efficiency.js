/**
 * Effizienz-Score basiert auf dem PERSONALISIERTEN Durchschnitt
 * (berücksichtigt Land + Branche)
 */
export function calculateEfficiencyScore(actualKwh, expectedKwh) {
  if (expectedKwh <= 0)
    return {
      score: 50,
      grade: 'C',
      label: 'Schnitt',
      color: 'var(--text-dim)',
      ratio: 1,
      deviationPct: 0,
      deviationLabel: '0%',
      deviationColor: 'var(--text-dim)',
    };

  const ratio = actualKwh / expectedKwh;
  let score = Math.round(100 - (ratio - 0.5) * 100);
  score = Math.max(0, Math.min(100, score));

  let grade, label, color;
  if (score >= 90)      { grade = 'A+'; label = 'Exzellent';     color = '#00ff88'; }
  else if (score >= 80) { grade = 'A';  label = 'Sehr gut';      color = '#66ff66'; }
  else if (score >= 70) { grade = 'B';  label = 'Gut';           color = '#d4ff00'; }
  else if (score >= 60) { grade = 'C';  label = 'Solid';         color = '#ffd700'; }
  else if (score >= 45) { grade = 'D';  label = 'Mittelmässig';  color = '#ffaa00'; }
  else if (score >= 30) { grade = 'E';  label = 'Ausbaufähig';   color = '#ff6600'; }
  else                  { grade = 'F';  label = 'Optimierbar';   color = '#ff0040'; }

  // Deviation in % vs erwarteter Schnitt
  // ratio 1.0 = 0%, ratio 1.24 = +24%, ratio 0.85 = −15%
  const deviationPct = Math.round((ratio - 1) * 100);
  const sign = deviationPct > 0 ? '+' : '';
  const deviationLabel = `${sign}${deviationPct}%`;

  let deviationColor;
  if (deviationPct <= -15) deviationColor = '#00ff88';
  else if (deviationPct <= -5) deviationColor = '#66ff66';
  else if (deviationPct <= 5) deviationColor = 'var(--text)';
  else if (deviationPct <= 20) deviationColor = '#ffaa00';
  else if (deviationPct <= 40) deviationColor = '#ff6600';
  else deviationColor = '#ff0040';

  return {
    score,
    grade,
    label,
    color,
    ratio,
    deviationPct,
    deviationLabel,
    deviationColor,
  };
}
