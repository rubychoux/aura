import { cn } from '@/utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'violet' | 'emerald' | 'amber' | 'blue' | 'red';
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  color = 'violet',
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-zinc-400">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-zinc-800 rounded-full h-2">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-700',
            color === 'violet' && 'bg-violet-500',
            color === 'emerald' && 'bg-emerald-500',
            color === 'amber' && 'bg-amber-500',
            color === 'blue' && 'bg-blue-500',
            color === 'red' && 'bg-red-500',
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}