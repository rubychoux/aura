export function scoreToGrade(score: number): 'S' | 'A' | 'B' | 'C' | 'D' {
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 60) return 'B';
  if (score >= 45) return 'C';
  return 'D';
}

export function scoreToLabel(score: number): string {
  if (score >= 90) return 'Peak';
  if (score >= 75) return 'Optimized';
  if (score >= 60) return 'Functional';
  if (score >= 45) return 'Needs Work';
  return 'Critical';
}