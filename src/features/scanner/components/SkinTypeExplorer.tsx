import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { INGREDIENTS } from '@/data/ingredients';
import type { SkinType } from '@/types';

const SKIN_TYPES: { value: SkinType; label: string; emoji: string }[] = [
  { value: 'oily', label: 'Oily', emoji: '✦' },
  { value: 'dry', label: 'Dry', emoji: '◎' },
  { value: 'combination', label: 'Combination', emoji: '◑' },
  { value: 'sensitive', label: 'Sensitive', emoji: '⬡' },
  { value: 'normal', label: 'Normal', emoji: '○' },
];

function ComedogenicityDots({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < value ? 'bg-blush-400' : 'bg-cream-300'
          }`}
        />
      ))}
    </div>
  );
}

export function SkinTypeExplorer() {
  const [selectedSkinType, setSelectedSkinType] = useState<SkinType>('oily');

  const compatible = INGREDIENTS.filter(
    (ing) => ing.skin_type_compatibility[selectedSkinType],
  ).slice(0, 20);

  const avoid = INGREDIENTS.filter(
    (ing) =>
      !ing.skin_type_compatibility[selectedSkinType] &&
      (ing.irritancy === 'high' || ing.comedogenicity >= 3),
  ).slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Skin type selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SKIN_TYPES.map((st) => (
          <button
            key={st.value}
            onClick={() => setSelectedSkinType(st.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
              selectedSkinType === st.value
                ? 'bg-warm-900 text-white border-warm-900'
                : 'bg-white text-warm-600 border-cream-300 hover:border-cream-400'
            }`}
          >
            <span>{st.emoji}</span>
            <span>{st.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Good for */}
        <div>
          <p className="text-xs font-medium text-sage-600 uppercase tracking-widest mb-3">
            Works Well For {SKIN_TYPES.find((s) => s.value === selectedSkinType)?.label} Skin
          </p>
          <div className="space-y-2">
            {compatible.map((ing) => (
              <Card key={ing.id}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-warm-800 truncate">
                      {ing.english_name}
                    </p>
                    <p className="text-xs text-warm-400 mt-0.5">{ing.category}</p>
                  </div>
                  <ComedogenicityDots value={ing.comedogenicity} />
                </div>
                <p className="text-xs text-warm-500 mt-2 leading-relaxed">
                  {ing.what_it_does}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Avoid */}
        <div>
          <p className="text-xs font-medium text-blush-500 uppercase tracking-widest mb-3">
            Ingredients To Avoid
          </p>
          <div className="space-y-2">
            {avoid.length === 0 ? (
              <p className="text-sm text-warm-400 italic p-4">
                No major ingredients to avoid for {selectedSkinType} skin.
              </p>
            ) : (
              avoid.map((ing) => (
                <Card key={ing.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-warm-800 truncate">
                        {ing.english_name}
                      </p>
                      <p className="text-xs text-warm-400 mt-0.5">{ing.category}</p>
                    </div>
                    <ComedogenicityDots value={ing.comedogenicity} />
                  </div>
                  {ing.watch_out_if.length > 0 && (
                    <p className="text-xs text-warm-500 mt-2 leading-relaxed">
                      {ing.watch_out_if[0]}
                    </p>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-warm-400 text-center">
        Dots ••••• indicate comedogenicity (pore-clogging) level — 5 being highest risk
      </p>
    </div>
  );
}
