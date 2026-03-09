import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'blush';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-cream-100 text-warm-700 border border-cream-300',
    success: 'bg-sage-50 text-sage-500 border border-sage-200',
    warning: 'bg-gold-100 text-gold-500 border border-gold-200',
    danger: 'bg-red-50 text-red-600 border border-red-200',
    info: 'bg-blue-50 text-blue-600 border border-blue-200',
    blush: 'bg-blush-50 text-blush-600 border border-blush-200',
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}