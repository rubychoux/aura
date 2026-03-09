import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/Slider';
import { Card } from '@/components/ui/Card';
import { calculateOptimizationScore } from '@/engine';
import type { PartialProfile, UserProfile, StressLevel, WorkoutFrequency } from '@/types';

interface Props {
  baseProfile: PartialProfile;
  baseScore: number;
}

function isCompleteProfile(p: PartialProfile): p is UserProfile {
  return Boolean(
    p.skinType && p.climate && p.sleepHours !== undefined &&
    p.stressLevel !== undefined && p.workoutFrequency !== undefined &&
    p.dietType && p.waterIntakeLiters !== undefined && p.goals
  );
}

export function WhatIfSimulator({ baseProfile, baseScore }: Props) {
  const [simSleep, setSimSleep] = useState(baseProfile.sleepHours ?? 7);
  const [simStress, setSimStress] = useState(baseProfile.stressLevel ?? 3);
  const [simWorkout, setSimWorkout] = useState(baseProfile.workoutFrequency ?? 3);
  const [simWater, setSimWater] = useState(baseProfile.waterIntakeLiters ?? 2);

  const simulatedScore = useMemo(() => {
    const simProfile: PartialProfile = {
      ...baseProfile,
      sleepHours: simSleep,
      stressLevel: simStress as StressLevel,
      workoutFrequency: simWorkout as WorkoutFrequency,
      waterIntakeLiters: simWater,
    };

    if (!isCompleteProfile(simProfile)) return null;
    return calculateOptimizationScore(simProfile);
  }, [baseProfile, simSleep, simStress, simWorkout, simWater]);

  const scoreDelta = simulatedScore ? simulatedScore.composite - baseScore : 0;
  const isImproved = scoreDelta > 0;
  const isWorse = scoreDelta < 0;

  return (
    <div className="space-y-6">
      <div className="bg-cream-50 border border-cream-200 rounded-2xl p-4">
        <p className="text-xs text-warm-500 leading-relaxed">
          Adjust the variables below to simulate how lifestyle changes would affect your optimization score in real time. No changes are saved to your profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <Card>
          <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-6">
            Adjust Variables
          </p>
          <div className="space-y-6">
            <Slider
              label="Sleep Hours"
              value={simSleep}
              min={3}
              max={12}
              step={0.5}
              onChange={setSimSleep}
            />
            <Slider
              label="Stress Level"
              value={simStress}
              min={1}
              max={5}
              step={1}
              onChange={(v) => setSimStress(v as StressLevel)}
            />
            <Slider
              label="Workout Frequency (days/week)"
              value={simWorkout}
              min={0}
              max={7}
              step={1}
              onChange={(v) => setSimWorkout(v as WorkoutFrequency)}
            />
            <Slider
              label="Water Intake (liters)"
              value={simWater}
              min={0.5}
              max={4}
              step={0.25}
              onChange={setSimWater}
            />
          </div>
        </Card>

        {/* Result */}
        <Card className="flex flex-col items-center justify-center text-center">
          <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-6">
            Simulated Score
          </p>

          {simulatedScore && (
            <>
              <div className="text-7xl font-black text-warm-900 mb-2">
                {simulatedScore.composite}
              </div>

              <div className={`text-2xl font-bold mb-4 ${
                isImproved ? 'text-sage-500' : isWorse ? 'text-red-500' : 'text-warm-400'
              }`}>
                {scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta === 0 ? '±0' : scoreDelta}
                <span className="text-sm font-normal ml-1">vs current</span>
              </div>

              <div className={`w-full p-4 rounded-xl border text-sm ${
                isImproved
                  ? 'bg-sage-50 border-sage-200 text-sage-500'
                  : isWorse
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-cream-100 border-cream-300 text-warm-400'
              }`}>
                {isImproved
                  ? `These changes would improve your score by ${scoreDelta} points.`
                  : isWorse
                  ? `These changes would decrease your score by ${Math.abs(scoreDelta)} points.`
                  : 'No change from your current baseline.'}
              </div>

              {/* Category deltas */}
              <div className="w-full mt-6 space-y-2">
                {simulatedScore.categories.map((cat) => {
                  return (
                    <div key={cat.category} className="flex items-center justify-between text-xs">
                      <span className="text-warm-500 capitalize">{cat.category}</span>
                      <span className="font-semibold text-warm-700">{cat.score}/100</span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}