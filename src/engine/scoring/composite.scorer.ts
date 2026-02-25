import type { UserProfile } from '@/types';
import type { OptimizationScore } from '@/types/scoring.types';
import { calculateSkinScore } from './skin.scorer';
import { calculateSleepScore } from './sleep.scorer';
import { calculateFitnessScore } from './fitness.scorer';
import { calculateLifestyleScore } from './lifestyle.scorer';

const WEIGHTS = {
  skin: 0.25,
  sleep: 0.30,
  fitness: 0.20,
  lifestyle: 0.25,
};

export function calculateOptimizationScore(profile: UserProfile): OptimizationScore {
  const categories = [
    calculateSkinScore(profile),
    calculateSleepScore(profile),
    calculateFitnessScore(profile),
    calculateLifestyleScore(profile),
  ];

  const composite = categories.reduce((acc, cat) => {
    return acc + cat.score * WEIGHTS[cat.category];
  }, 0);

  return {
    composite: Math.round(composite),
    categories,
    computedAt: new Date().toISOString(),
    profileSnapshot: btoa(JSON.stringify(profile)).slice(0, 16),
  };
}