import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-violet-600 hover:bg-violet-500 text-white',
        variant === 'secondary' && 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700',
        variant === 'ghost' && 'bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100',
        variant === 'danger' && 'bg-red-600 hover:bg-red-500 text-white',
        size === 'sm' && 'text-xs px-3 py-1.5',
        size === 'md' && 'text-sm px-4 py-2.5',
        size === 'lg' && 'text-base px-6 py-3',
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}