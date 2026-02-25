import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';
import { SKIN_TYPES, CLIMATES } from '@/utils/constants';
import type { SkinType, Climate } from '@/types';

interface Props {
  skinType?: SkinType;
  climate?: Climate;
  onChange: (data: { skinType?: SkinType; climate?: Climate }) => void;
}

export function SkinStep({ skinType, climate, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Skin Type
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SKIN_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => onChange({ skinType: type.value })}
              className={cn(
                'p-4 rounded-xl border text-left transition-all duration-150',
                skinType === type.value
                  ? 'border-violet-500 bg-violet-500/10 text-violet-300'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
              )}
            >
              <p className="font-semibold text-sm">{type.label}</p>
              <p className="text-xs mt-1 opacity-70">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-4">
          Your Climate
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {CLIMATES.map((c) => (
            <button
              key={c.value}
              onClick={() => onChange({ climate: c.value })}
              className={cn(
                'p-4 rounded-xl border text-center transition-all duration-150',
                climate === c.value
                  ? 'border-violet-500 bg-violet-500/10 text-violet-300'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
              )}
            >
              <p className="text-2xl mb-1">{c.emoji}</p>
              <p className="text-xs font-medium">{c.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}