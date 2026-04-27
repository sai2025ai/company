import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  className?: string;
  children?: React.ReactNode;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-slate-100 hover:bg-white/20',
    secondary: 'bg-black/20 text-[#94a3b8] hover:bg-black/30 border-white/5',
    destructive: 'bg-red-500/20 text-red-400 border border-red-500/20',
    success: 'bg-green-500/20 text-green-400 border border-green-500/20',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20',
    outline: 'text-slate-100 border-white/10 bg-transparent',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
