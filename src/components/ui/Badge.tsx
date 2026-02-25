import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'violet';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium',
        variant === 'default' && 'bg-zinc-800 text-zinc-300',
        variant === 'success' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        variant === 'warning' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        variant === 'danger' && 'bg-red-500/10 text-red-400 border border-red-500/20',
        variant === 'info' && 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        variant === 'violet' && 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
        className
      )}
    >
      {children}
    </span>
  );
}