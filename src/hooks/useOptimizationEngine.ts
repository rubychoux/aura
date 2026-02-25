import { useMemo } from 'react';
import type { UserProfile, PartialProfile } from '@/types';
import type { OptimizationScore } from '@/types/scoring.types';
import type { OptimizationProtocol } from '@/types/protocol.types';
import {
  calculateOptimizationScore,
  generateDailyRoutine,
  buildWeeklySchedule,
  recommendProductStack,
} from '@/engine';

interface OptimizationEngineResult {
  score: OptimizationScore | null;
  protocol: OptimizationProtocol | null;
  isReady: boolean;
}

function isCompleteProfile(p: PartialProfile): p is UserProfile {
  return Boolean(
    p.skinType &&
    p.climate &&
    p.sleepHours !== undefined &&
    p.stressLevel !== undefined &&
    p.workoutFrequency !== undefined &&
    p.dietType &&
    p.waterIntakeLiters !== undefined &&
    p.goals &&
    p.goals.length > 0
  );
}

export function useOptimizationEngine(profile: PartialProfile): OptimizationEngineResult {
  return useMemo(() => {
    if (!isCompleteProfile(profile)) {
      return { score: null, protocol: null, isReady: false };
    }

    const score = calculateOptimizationScore(profile);
    const dailyRoutine = generateDailyRoutine(profile);
    const weeklySchedule = buildWeeklySchedule(dailyRoutine, profile);
    const productStack = recommendProductStack(profile);

    const protocol: OptimizationProtocol = {
      userId: profile.id ?? 'guest',
      generatedAt: new Date().toISOString(),
      dailyRoutine,
      weeklySchedule,
      productStack,
      insights: [],
    };

    return { score, protocol, isReady: true };
  }, [profile]);
}