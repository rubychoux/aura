import type { FlaggedIngredient } from '@/engine/ingredients/ingredient.analyzer';

interface Props {
  flagged: FlaggedIngredient[];
}

export function FlaggedList({ flagged }: Props) {
  if (flagged.length === 0) {
    return (
      <div className="flex items-center gap-3 p-4 bg-sage-50 border border-sage-200 rounded-xl">
        <span className="text-lg">✓</span>
        <p className="text-sm text-sage-600 font-medium">No flagged ingredients — formula looks clean.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {flagged.map((item, i) => (
        <div
          key={i}
          className={`p-4 rounded-xl border ${
            item.severity === 'warning'
              ? 'bg-red-50 border-red-200'
              : 'bg-gold-100 border-gold-300'
          }`}
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-warm-800">
              {item.ingredient.english_name}
            </p>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                item.severity === 'warning'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gold-200 text-gold-700'
              }`}
            >
              {item.severity === 'warning' ? 'Warning' : 'Caution'}
            </span>
          </div>
          <p className="text-xs text-warm-500 leading-relaxed">{item.reason}</p>
          {item.ingredient.watch_out_if.length > 0 && (
            <p className="text-xs text-warm-400 mt-1 italic">
              Watch out if: {item.ingredient.watch_out_if[0]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
