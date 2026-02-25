import type { UserProfile } from '@/types';
import type { CategoryScore } from '@/types/scoring.types';
import { scoreToGrade, scoreToLabel } from '../transforms/score.transforms';

export function calculateSleepScore(profile: UserProfile): CategoryScore {
  let score = 50;

  if (profile.sleepHours >= 8 && profile.sleepHours <= 9) score += 40;
  else if (profile.sleepHours >= 7) score += 25;
  else if (profile.sleepHours >= 6) score += 10;
  else if (profile.sleepHours >= 5) score -= 5;
  else score -= 20;

  score += (5 - profile.stressLevel) * 3;

  if (profile.workoutFrequency >= 3) score += 5;

  score = Math.max(0, Math.min(100, score));

  let topInsight = 'Sleep architecture is favorable — focus on consistency and timing.';
  if (profile.sleepHours < 7) topInsight = 'Sub-optimal sleep duration is your single highest-leverage recovery variable.';
  else if (profile.stressLevel >= 4) topInsight = 'High stress is degrading sleep quality even if duration appears adequate.';

  return {
    category: 'sleep',
    score: Math.round(score),
    grade: scoreToGrade(score),
    label: scoreToLabel(score),
    topInsight,
  };
}