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
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-warm-900 text-white hover:bg-warm-800 active:bg-warm-900',
    secondary: 'bg-cream-100 text-warm-800 border border-cream-300 hover:bg-cream-200',
    ghost: 'text-warm-600 hover:bg-cream-100 hover:text-warm-900',
    danger: 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-xl',
  };

  return (
    <button
      className={cn(
        'font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}