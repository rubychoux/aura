import { cn } from '@/utils/cn';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  label,
  showValue = true,
  className,
}: SliderProps) {
  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-3">
          {label && <span className="text-sm text-zinc-400">{label}</span>}
          {showValue && (
            <span className="text-sm font-semibold text-violet-400">{value}</span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-violet-500"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-zinc-600">{min}</span>
        <span className="text-xs text-zinc-600">{max}</span>
      </div>
    </div>
  );
}