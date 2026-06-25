import * as React from 'react';
import { type ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'outline';
type ButtonSize = 'default' | 'lg';

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-movielegend-500 text-slate-950 hover:bg-movielegend-400',
  secondary: 'border border-white/20 bg-transparent text-white hover:bg-white hover:text-black',
  outline: 'border border-movielegend-500 text-movielegend-500 hover:bg-movielegend-500 hover:text-slate-950'
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base'
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function Button({ variant = 'default', size = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-movielegend-400 focus:ring-offset-2 focus:ring-offset-slate-950',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}
