import { cn } from '@/utils/cn';
import { OPTIMIZATION_GOALS } from '@/utils/constants';
import type { OptimizationGoal } from '@/types';

interface Props {
  goals?: OptimizationGoal[];
  onChange: (data: { goals: OptimizationGoal[] }) => void;
}

export function GoalsStep({ goals = [], onChange }: Props) {
  const toggleGoal = (goal: OptimizationGoal) => {
    const updated = goals.includes(goal)
      ? goals.filter(g => g !== goal)
      : [...goals, goal];
    onChange({ goals: updated });
  };

  return (
    <div className="space-y-4">
      <p className="text-warm-500 text-sm">Select all that apply. Your protocol will be weighted toward these outcomes.</p>
      <div className="grid grid-cols-2 gap-3">
        {OPTIMIZATION_GOALS.map((goal) => {
          const isSelected = goals.includes(goal.value);
          return (
            <button
              key={goal.value}
              onClick={() => toggleGoal(goal.value)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all duration-150 relative',
                isSelected
                  ? 'border-blush-400 bg-blush-50 text-blush-600'
                  : 'border-cream-200 bg-white text-warm-600 hover:border-cream-400 hover:text-warm-900'
              )}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 text-blush-500 text-xs font-bold">✓</span>
              )}
              <p className="text-xl mb-2">{goal.emoji}</p>
              <p className="font-semibold text-sm">{goal.label}</p>
            </button>
          );
        })}
      </div>
      {goals.length > 0 && (
        <p className="text-xs text-warm-400 text-center">
          {goals.length} goal{goals.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}