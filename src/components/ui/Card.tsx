import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-zinc-900 border border-zinc-800 rounded-2xl p-6',
        hover && 'hover:border-zinc-600 transition-colors duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}