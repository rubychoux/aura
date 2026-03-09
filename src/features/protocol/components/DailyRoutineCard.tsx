import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { RoutineStep } from '@/types/protocol.types';

interface Props {
  steps: RoutineStep[];
}

const TIME_LABELS: Record<string, { label: string; emoji: string }> = {
  morning: { label: 'Morning', emoji: '🌅' },
  midday:  { label: 'Midday',  emoji: '☀️'  },
  evening: { label: 'Evening', emoji: '🌆' },
  night:   { label: 'Night',   emoji: '🌙' },
};

const PRIORITY_VARIANT: Record<string, 'danger' | 'warning' | 'default'> = {
  essential:    'danger',
  recommended:  'warning',
  optional:     'default',
};

const CATEGORY_COLORS: Record<string, string> = {
  skincare:    'bg-blush-50 text-blush-500',
  fitness:     'bg-sage-50 text-sage-500',
  nutrition:   'bg-gold-100 text-gold-500',
  mindfulness: 'bg-warm-100 text-warm-600',
  sleep:       'bg-warm-100 text-warm-600',
};

export function DailyRoutineCard({ steps }: Props) {
  const grouped = steps.reduce((acc, step) => {
    if (!acc[step.timeOfDay]) acc[step.timeOfDay] = [];
    acc[step.timeOfDay].push(step);
    return acc;
  }, {} as Record<string, RoutineStep[]>);

  const timeOrder = ['morning', 'midday', 'evening', 'night'];

  return (
    <div className="space-y-6">
      {timeOrder.map(time => {
        const timeSteps = grouped[time];
        if (!timeSteps?.length) return null;
        const timeConfig = TIME_LABELS[time];

        return (
          <div key={time}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{timeConfig.emoji}</span>
              <h3 className="text-sm font-semibold text-warm-600">{timeConfig.label}</h3>
              <div className="flex-1 h-px bg-cream-200" />
            </div>

            <div className="space-y-3">
              {timeSteps.map(step => (
                <Card key={step.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <p className="text-sm font-semibold text-warm-800">{step.title}</p>
                        <Badge variant={PRIORITY_VARIANT[step.priority]}>
                          {step.priority}
                        </Badge>
                        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${CATEGORY_COLORS[step.category]}`}>
                          {step.category}
                        </span>
                      </div>
                      <p className="text-xs text-warm-500 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-warm-700">{step.durationMinutes}m</p>
                      <p className="text-xs text-warm-400">duration</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}