import type { UserProfile } from '@/types';
import type { CategoryScore } from '@/types/scoring.types';
import { scoreToGrade, scoreToLabel } from '../transforms/score.transforms';

export function calculateLifestyleScore(profile: UserProfile): CategoryScore {
  let score = 50;

  score += (5 - profile.stressLevel) * 8;

  const dietScores: Record<string, number> = {
    mediterranean: 15, vegan: 10, vegetarian: 8, keto: 5, omnivore: 0,
  };
  score += dietScores[profile.dietType] ?? 0;

  if (profile.waterIntakeLiters >= 2.5) score += 5;
  else if (profile.waterIntakeLiters < 1.5) score -= 10;

  score = Math.max(0, Math.min(100, score));

  let topInsight = 'Lifestyle variables are stable — stress modulation offers the highest compounding returns.';
  if (profile.stressLevel >= 4) topInsight = 'Chronic stress is systemically degrading all optimization outcomes — this is your critical intervention point.';
  else if (profile.dietType === 'mediterranean') topInsight = 'Mediterranean diet pattern aligns with all your optimization goals — maintain and optimize micronutrients.';

  return {
    category: 'lifestyle',
    score: Math.round(score),
    grade: scoreToGrade(score),
    label: scoreToLabel(score),
    topInsight,
  };
}