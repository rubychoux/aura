import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import type { OptimizationScore } from '@/types/scoring.types';

interface Props {
  score: OptimizationScore;
}

const GRADE_CONFIG = {
  S: { color: '#4A7C4A', label: 'Peak Performance' },
  A: { color: '#C97060', label: 'Highly Optimized' },
  B: { color: '#C48900', label: 'Functional' },
  C: { color: '#A85548', label: 'Needs Attention' },
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
      <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-6">
        Optimization Score
      </p>

      <div className="relative w-40 h-40 mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="#EDE5D8"
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
          <span className="text-5xl font-black text-warm-900">{score.composite}</span>
          <span className="text-xs text-warm-400 uppercase tracking-widest mt-1">/ 100</span>
        </div>
      </div>

      <span
        className="text-3xl font-black tracking-wide mb-1"
        style={{ color: config.color }}
      >
        {grade}
      </span>
      <p className="text-warm-500 text-sm">{config.label}</p>
      <p className="text-warm-400 text-xs mt-4">
        Last updated {new Date(score.computedAt).toLocaleDateString()}
      </p>
    </Card>
  );
}