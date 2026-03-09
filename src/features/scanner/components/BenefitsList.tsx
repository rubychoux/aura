import type { BeneficialIngredient } from '@/engine/ingredients/ingredient.analyzer';

interface Props {
  beneficial: BeneficialIngredient[];
}

export function BenefitsList({ beneficial }: Props) {
  if (beneficial.length === 0) {
    return (
      <p className="text-sm text-warm-400 italic">
        No standout beneficial ingredients detected for your profile.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {beneficial.map((item, i) => (
        <div key={i} className="p-4 bg-sage-50 border border-sage-200 rounded-xl">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-warm-800">
              {item.ingredient.english_name}
            </p>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-sage-100 text-sage-600 shrink-0">
              {item.ingredient.category}
            </span>
          </div>
          <p className="text-xs text-warm-500 leading-relaxed">{item.reason}</p>
          <p className="text-xs text-warm-400 mt-1">{item.ingredient.what_it_does}</p>
        </div>
      ))}
    </div>
  );
}
