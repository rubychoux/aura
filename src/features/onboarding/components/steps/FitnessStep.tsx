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
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="text-center mb-8">
          <p className="text-5xl font-black text-violet-400">{workoutFrequency}x</p>
          <p className="text-zinc-400 text-sm mt-2">{FREQUENCY_LABELS[workoutFrequency]}</p>
        </div>
        <Slider
          value={workoutFrequency}
          min={0}
          max={7}
          step={1}
          showValue={false}
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
                ? 'bg-violet-600 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}