import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { CategoryScore } from '@/types/scoring.types';
import type { PartialProfile } from '@/types';

interface Props {
  categories: CategoryScore[];
  profile: PartialProfile;
}

export function InsightsFeed({ categories, profile }: Props) {
  const insights = generateInsights(categories, profile);

  return (
    <Card>
      <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-4">
        Priority Insights
      </p>
      <div className="space-y-4">
        {insights.map((insight, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-lg mt-0.5">{insight.emoji}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-warm-800">{insight.title}</p>
                <Badge variant={insight.badgeVariant}>{insight.tag}</Badge>
              </div>
              <p className="text-xs text-warm-500 leading-relaxed">{insight.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function generateInsights(categories: CategoryScore[], profile: PartialProfile) {
  const insights = [];

  const lowestCat = [...categories].sort((a, b) => a.score - b.score)[0];
  insights.push({
    emoji: '🎯',
    title: `Priority: ${lowestCat.category.charAt(0).toUpperCase() + lowestCat.category.slice(1)}`,
    body: lowestCat.topInsight,
    tag: 'Highest Leverage',
    badgeVariant: 'danger' as const,
  });

  if (profile.sleepHours && profile.sleepHours < 7) {
    insights.push({
      emoji: '🌙',
      title: 'Sleep Deficit Detected',
      body: `You are averaging ${profile.sleepHours}h. Increasing to 7.5h would improve all category scores within 2 weeks.`,
      tag: 'Critical',
      badgeVariant: 'warning' as const,
    });
  }

  if (profile.stressLevel && profile.stressLevel >= 4) {
    insights.push({
      emoji: '⚠️',
      title: 'Elevated Cortisol Pattern',
      body: 'Stress level 4-5 creates systemic inflammation that counteracts all other optimization efforts.',
      tag: 'Systemic',
      badgeVariant: 'danger' as const,
    });
  }

  const highestCat = [...categories].sort((a, b) => b.score - a.score)[0];
  insights.push({
    emoji: '✅',
    title: `Strong Foundation: ${highestCat.category.charAt(0).toUpperCase() + highestCat.category.slice(1)}`,
    body: `Your ${highestCat.category} score is ${highestCat.score}/100 — maintain this as your anchor variable.`,
    tag: 'Strength',
    badgeVariant: 'success' as const,
  });

  return insights;
}