export interface CategoryScore {
  category: 'skin' | 'sleep' | 'fitness' | 'lifestyle';
  score: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  label: string;
  topInsight: string;
}

export interface OptimizationScore {
  composite: number;
  categories: CategoryScore[];
  computedAt: string;
  profileSnapshot: string;
}