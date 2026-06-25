import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cn('rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur-xl', className)} {...props} />;
}
