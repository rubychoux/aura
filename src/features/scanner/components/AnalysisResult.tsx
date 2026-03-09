import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FlaggedList } from './FlaggedList';
import { BenefitsList } from './BenefitsList';
import type { IngredientAnalysisResult } from '@/engine/ingredients/ingredient.analyzer';

interface Props {
  result: IngredientAnalysisResult;
  onReset: () => void;
}

const VERDICT_CONFIG = {
  great_match: {
    label: 'Great Match',
    color: 'text-sage-600',
    bg: 'bg-sage-50 border-sage-200',
    emoji: '✓',
  },
  use_caution: {
    label: 'Use Caution',
    color: 'text-gold-600',
    bg: 'bg-gold-100 border-gold-300',
    emoji: '!',
  },
  not_recommended: {
    label: 'Not Recommended',
    color: 'text-red-500',
    bg: 'bg-red-50 border-red-200',
    emoji: '✕',
  },
} as const;

export function AnalysisResult({ result, onReset }: Props) {
  const verdict = VERDICT_CONFIG[result.verdict];
  const scoreColor =
    result.overallScore >= 80
      ? 'text-sage-600'
      : result.overallScore >= 60
        ? 'text-gold-600'
        : 'text-red-500';
  const progressColor =
    result.overallScore >= 80 ? 'sage' : result.overallScore >= 60 ? 'gold' : 'blush';

  return (
    <div className="space-y-6">
      {/* Score header */}
      <Card>
        <div className="flex items-start gap-6">
          <div className="text-center shrink-0">
            <p className={`text-5xl font-black ${scoreColor}`}>{result.overallScore}</p>
            <p className="text-xs text-warm-400 mt-1">/ 100</p>
          </div>
          <div className="flex-1 min-w-0">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-2 ${verdict.bg} ${verdict.color}`}>
              <span>{verdict.emoji}</span>
              <span>{verdict.label}</span>
            </div>
            <p className="text-sm text-warm-600 leading-relaxed">{result.summary}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2">
            <ProgressBar value={result.overallScore} color={progressColor as 'sage' | 'gold' | 'blush'} />
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-cream-100">
          <div className="text-center">
            <p className="text-lg font-black text-warm-900">{result.matched.length}</p>
            <p className="text-xs text-warm-400">recognized</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-blush-500">{result.flagged.length}</p>
            <p className="text-xs text-warm-400">flagged</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-sage-500">{result.beneficial.length}</p>
            <p className="text-xs text-warm-400">beneficial</p>
          </div>
        </div>

        {result.matchRate < 100 && (
          <p className="text-xs text-warm-400 text-center mt-3">
            {result.matchRate}% ingredient match rate · {result.unmatched.length} not in database
          </p>
        )}
      </Card>

      {/* Flagged */}
      {result.flagged.length > 0 && (
        <section>
          <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-3">
            Flagged Ingredients
          </p>
          <FlaggedList flagged={result.flagged} />
        </section>
      )}

      {/* Beneficial */}
      {result.beneficial.length > 0 && (
        <section>
          <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-3">
            Beneficial Ingredients
          </p>
          <BenefitsList beneficial={result.beneficial} />
        </section>
      )}

      {/* Unmatched */}
      {result.unmatched.length > 0 && (
        <section>
          <p className="text-xs font-medium text-warm-400 uppercase tracking-widest mb-3">
            Not in Database ({result.unmatched.length})
          </p>
          <Card>
            <div className="flex flex-wrap gap-2">
              {result.unmatched.map((name, i) => (
                <span
                  key={i}
                  className="text-xs text-warm-500 bg-cream-100 px-2 py-1 rounded-lg capitalize"
                >
                  {name}
                </span>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Scan another */}
      <button
        onClick={onReset}
        className="w-full py-3 border border-cream-300 text-warm-600 text-sm font-medium rounded-xl hover:bg-cream-50 transition-colors"
      >
        Scan Another Product
      </button>
    </div>
  );
}
