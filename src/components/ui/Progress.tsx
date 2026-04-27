import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  indicatorClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Progress({ className, value, indicatorClassName, ...props }: ProgressProps) {
  return (
    <div
      className={cn(
        'relative h-1.5 w-full overflow-hidden rounded-full bg-black/40',
        className
      )}
      {...props}
    >
      <div
        className={cn('h-full w-full flex-1 bg-green-400 transition-all status-dot', indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
}
