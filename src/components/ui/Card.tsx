import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={cn(
      'bg-white rounded-2xl border border-cream-200 shadow-softer',
      paddings[padding],
      hover && 'transition-shadow duration-200 hover:shadow-soft cursor-pointer',
      className
    )}>
      {children}
    </div>
  );
}