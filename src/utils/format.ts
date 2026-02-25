export function formatScore(score: number): string {
  return Math.round(score).toString();
}

export function formatGrade(grade: 'S' | 'A' | 'B' | 'C' | 'D'): string {
  const labels = {
    S: 'Peak',
    A: 'Optimized',
    B: 'Functional',
    C: 'Needs Work',
    D: 'Critical',
  };
  return labels[grade];
}

export function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function formatGoal(goal: string): string {
  return goal
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}