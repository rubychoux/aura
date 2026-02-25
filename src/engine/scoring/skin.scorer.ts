import type { UserProfile } from '@/types';
import type { CategoryScore } from '@/types/scoring.types';
import { scoreToGrade, scoreToLabel } from '../transforms/score.transforms';

const CLIMATE_SKIN_PENALTIES: Record<string, Record<string, number>> = {
  humid:     { dry: -5,  oily: -10, combination: -5,  normal: 0,  sensitive: -5  },
  dry:       { dry: -15, oily: 5,   combination: -8,  normal: -5, sensitive: -10 },
  cold:      { dry: -20, oily: 0,   combination: -10, normal: -5, sensitive: -15 },
  tropical:  { oily: -15,combination: -8, dry: -5,    normal: 0,  sensitive: -8  },
  temperate: { dry: -5,  oily: -5,  combination: 0,   normal: 5,  sensitive: -3  },
};

export function calculateSkinScore(profile: UserProfile): CategoryScore {
  let score = 60;

  const climatePenalty = CLIMATE_SKIN_PENALTIES[profile.climate]?.[profile.skinType] ?? 0;
  score += climatePenalty;

  if (profile.sleepHours >= 8) score += 10;
  else if (profile.sleepHours >= 7) score += 5;
  else if (profile.sleepHours >= 6) score += 0;
  else if (profile.sleepHours >= 5) score -= 10;
  else score -= 20;

  score += (5 - profile.stressLevel) * 5;

  const dietModifiers: Record<string, number> = {
    mediterranean: 15, vegan: 10, vegetarian: 8, omnivore: 0, keto: 5,
  };
  score += dietModifiers[profile.dietType] ?? 0;

  if (profile.waterIntakeLiters >= 2.5) score += 8;
  else if (profile.waterIntakeLiters >= 2) score += 4;
  else if (profile.waterIntakeLiters < 1.5) score -= 10;

  score = Math.max(0, Math.min(100, score));

  let topInsight = 'Your skin baseline is stable — focus on optimization over correction.';
  if (profile.sleepHours < 6) topInsight = 'Sleep deprivation is significantly impacting skin repair cycles.';
  else if (profile.stressLevel >= 4) topInsight = 'High cortisol is disrupting your skin barrier — stress management is priority.';
  else if (climatePenalty <= -10) topInsight = `${profile.skinType} skin has high friction with ${profile.climate} climate — barrier support is essential.`;
  else if (profile.waterIntakeLiters < 1.5) topInsight = 'Hydration is below threshold — this is your highest-leverage skin variable.';

  return {
    category: 'skin',
    score: Math.round(score),
    grade: scoreToGrade(score),
    label: scoreToLabel(score),
    topInsight,
  };
}