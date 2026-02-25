import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { CategoryScore } from '@/types/scoring.types';

interface Props {
  categories: CategoryScore[];
}

const CATEGORY_CONFIG: Record<string, { emoji: string; color: 'violet' | 'emerald' | 'amber' | 'blue' }> = {
  skin:      { emoji: '✨', color: 'violet' },
  sleep:     { emoji: '🌙', color: 'blue' },
  fitness:   { emoji: '💪', color: 'emerald' },
  lifestyle: { emoji: '🧘', color: 'amber' },
};

const GRADE_COLORS: Record<string, string> = {
  S: 'text-emerald-400',
  A: 'text-violet-400',
  B: 'text-amber-400',
  C: 'text-orange-400',
  D: 'text-red-400',
};

export function CategoryScoreGrid({ categories }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((cat) => {
        const config = CATEGORY_CONFIG[cat.category];
        return (
          <Card key={cat.category}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{config.emoji}</span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200 capitalize">
                    {cat.category}
                  </p>
                  <p className="text-xs text-zinc-500">{cat.label}</p>
                </div>
              </div>
              <span className={`text-2xl font-black ${GRADE_COLORS[cat.grade]}`}>
                {cat.grade}
              </span>
            </div>

            <ProgressBar
              value={cat.score}
              color={config.color}
              className="mb-3"
            />

            <p className="text-xs text-zinc-500 leading-relaxed">
              {cat.topInsight}
            </p>
          </Card>
        );
      })}
    </div>
  );
}