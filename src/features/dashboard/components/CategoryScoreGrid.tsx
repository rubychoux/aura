import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { CategoryScore } from '@/types/scoring.types';

interface Props {
  categories: CategoryScore[];
}

const CATEGORY_CONFIG: Record<string, { emoji: string; color: 'blush' | 'sage' | 'gold' | 'warm' }> = {
  skin:      { emoji: '✨', color: 'blush' },
  sleep:     { emoji: '🌙', color: 'warm' },
  fitness:   { emoji: '💪', color: 'sage' },
  lifestyle: { emoji: '🧘', color: 'gold' },
};

const GRADE_COLORS: Record<string, string> = {
  S: 'text-sage-500',
  A: 'text-blush-500',
  B: 'text-gold-500',
  C: 'text-gold-400',
  D: 'text-red-500',
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
                  <p className="text-sm font-semibold text-warm-800 capitalize">
                    {cat.category}
                  </p>
                  <p className="text-xs text-warm-400">{cat.label}</p>
                </div>
              </div>
              <span className={`text-2xl font-black ${GRADE_COLORS[cat.grade]}`}>
                {cat.grade}
              </span>
            </div>

            <div className="mb-3">
              <ProgressBar
                value={cat.score}
                color={config.color}
              />
            </div>

            <p className="text-xs text-warm-500 leading-relaxed">
              {cat.topInsight}
            </p>
          </Card>
        );
      })}
    </div>
  );
}