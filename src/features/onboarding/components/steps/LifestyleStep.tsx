import { Slider } from '@/components/ui/Slider';
import { DIET_TYPES } from '@/utils/constants';
import { cn } from '@/utils/cn';
import type { DietType, StressLevel } from '@/types';

interface Props {
  sleepHours?: number;
  stressLevel?: StressLevel;
  waterIntakeLiters?: number;
  dietType?: DietType;
  onChange: (data: {
    sleepHours?: number;
    stressLevel?: StressLevel;
    waterIntakeLiters?: number;
    dietType?: DietType;
  }) => void;
}

export function LifestyleStep({
  sleepHours = 7,
  stressLevel = 3,
  waterIntakeLiters = 2,
  dietType,
  onChange,
}: Props) {
  return (
    <div className="space-y-8">
      <div className="bg-cream-50 border border-cream-200 rounded-2xl p-6 space-y-6">
        <Slider
          label="Sleep Hours per Night"
          value={sleepHours}
          min={3}
          max={12}
          step={0.5}
          onChange={(v) => onChange({ sleepHours: v })}
        />
        <Slider
          label="Stress Level"
          value={stressLevel}
          min={1}
          max={5}
          step={1}
          onChange={(v) => onChange({ stressLevel: v as StressLevel })}
        />
        <Slider
          label="Daily Water Intake (Liters)"
          value={waterIntakeLiters}
          min={0.5}
          max={4}
          step={0.25}
          onChange={(v) => onChange({ waterIntakeLiters: v })}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-warm-400 uppercase tracking-widest mb-4">
          Diet Type
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DIET_TYPES.map((d) => (
            <button
              key={d.value}
              onClick={() => onChange({ dietType: d.value })}
              className={cn(
                'p-4 rounded-xl border text-left transition-all duration-150',
                dietType === d.value
                  ? 'border-blush-400 bg-blush-50 text-blush-600'
                  : 'border-cream-200 bg-white text-warm-600 hover:border-cream-400 hover:text-warm-900'
              )}
            >
              <p className="font-semibold text-sm">{d.label}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}