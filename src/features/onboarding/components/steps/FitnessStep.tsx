import { Slider } from '@/components/ui/Slider';
import type { WorkoutFrequency } from '@/types';

interface Props {
  workoutFrequency?: WorkoutFrequency;
  onChange: (data: { workoutFrequency: WorkoutFrequency }) => void;
}

const FREQUENCY_LABELS: Record<number, string> = {
  0: 'Sedentary',
  1: '1x / week',
  2: '2x / week',
  3: '3x / week',
  4: '4x / week',
  5: '5x / week',
  6: '6x / week',
  7: 'Daily',
};

export function FitnessStep({ workoutFrequency = 3, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div className="bg-cream-50 border border-cream-200 rounded-2xl p-6">
        <div className="text-center mb-8">
          <p className="text-5xl font-black text-blush-500">{workoutFrequency}x</p>
          <p className="text-warm-400 text-sm mt-2">{FREQUENCY_LABELS[workoutFrequency]}</p>
        </div>
        <Slider
          label=""
          value={workoutFrequency}
          min={0}
          max={7}
          step={1}
          onChange={(v) => onChange({ workoutFrequency: v as WorkoutFrequency })}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Object.entries(FREQUENCY_LABELS).map(([freq, label]) => (
          <button
            key={freq}
            onClick={() => onChange({ workoutFrequency: Number(freq) as WorkoutFrequency })}
            className={`p-2 rounded-lg text-xs text-center transition-all ${
              workoutFrequency === Number(freq)
                ? 'bg-warm-900 text-white'
                : 'bg-cream-100 text-warm-500 hover:bg-cream-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}