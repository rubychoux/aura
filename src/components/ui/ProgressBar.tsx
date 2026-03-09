interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'blush' | 'sage' | 'gold' | 'warm';
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = 'blush',
  label,
  showValue = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    blush: 'bg-blush-300',
    sage: 'bg-sage-300',
    gold: 'bg-gold-300',
    warm: 'bg-warm-400',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between mb-1.5 text-xs text-warm-500">
          {label && <span>{label}</span>}
          {showValue && <span>{value}/{max}</span>}
        </div>
      )}
      <div className="w-full bg-cream-200 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}