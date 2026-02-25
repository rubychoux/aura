import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import type { OptimizationScore } from '@/types/scoring.types';

interface Props {
  score: OptimizationScore;
}

const GRADE_CONFIG = {
  S: { color: '#10b981', label: 'Peak Performance' },
  A: { color: '#8b5cf6', label: 'Highly Optimized' },
  B: { color: '#f59e0b', label: 'Functional' },
  C: { color: '#f97316', label: 'Needs Attention' },
  D: { color: '#ef4444', label: 'Critical State' },
} as const;

export function OptimizationScoreCard({ score }: Props) {
  const grade = score.composite >= 90 ? 'S'
    : score.composite >= 75 ? 'A'
    : score.composite >= 60 ? 'B'
    : score.composite >= 45 ? 'C' : 'D';

  const config = GRADE_CONFIG[grade];
  const circumference = 2 * Math.PI * 54;

  const strokeDashoffset = useMemo(
    () => circumference - (score.composite / 100) * circumference,
    [score.composite, circumference]
  );

  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6">
        Optimization Score
      </p>

      <div className="relative w-40 h-40 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="#27272a"
            strokeWidth="10"
          />
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke={config.color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-white">{score.composite}</span>
          <span className="text-xs text-zinc-500 uppercase tracking-widest mt-1">/ 100</span>
        </div>
      </div>

      <span
        className="text-3xl font-black tracking-wide mb-1"
        style={{ color: config.color }}
      >
        {grade}
      </span>
      <p className="text-zinc-400 text-sm">{config.label}</p>
      <p className="text-zinc-600 text-xs mt-4">
        Last updated {new Date(score.computedAt).toLocaleDateString()}
      </p>
    </Card>
  );
}