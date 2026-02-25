import type { UserProfile } from '@/types';
import type { CategoryScore } from '@/types/scoring.types';
import { scoreToGrade, scoreToLabel } from '../transforms/score.transforms';

export function calculateFitnessScore(profile: UserProfile): CategoryScore {
  let score = 40;

  const f = profile.workoutFrequency;
  if (f === 0) score -= 10;
  else if (f === 1) score += 5;
  else if (f === 2) score += 15;
  else if (f === 3) score += 25;
  else if (f <= 5) score += 35;
  else score += 30;

  const fitnessGoals = ['fat_loss', 'muscle_tone', 'energy_optimization'];
  const hasFitnessGoal = profile.goals.some(g => fitnessGoals.includes(g));
  if (hasFitnessGoal && profile.workoutFrequency < 3) score -= 10;
  if (profile.sleepHours < 6 && profile.workoutFrequency >= 4) score -= 15;

  score = Math.max(0, Math.min(100, score));

  let topInsight = 'Training frequency is supportive — focus on progressive overload and recovery quality.';
  if (f === 0) topInsight = 'No movement detected — even 2x/week resistance training transforms all optimization vectors.';
  else if (profile.sleepHours < 6 && f >= 4) topInsight = 'Overtraining signal: high workout load combined with sleep deficit degrades adaptation.';
  else if (hasFitnessGoal && f < 3) topInsight = 'Your goals require higher training frequency — current volume is below threshold for adaptation.';

  return {
    category: 'fitness',
    score: Math.round(score),
    grade: scoreToGrade(score),
    label: scoreToLabel(score),
    topInsight,
  };
}