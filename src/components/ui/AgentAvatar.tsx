import React from 'react';
import { cn } from '../../lib/utils';
import { Bot, User } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'human' | 'agent' | 'avatar';
  name?: string;
  fallback?: string;
  status?: 'working' | 'idle' | 'offline';
  className?: string;
  children?: React.ReactNode;
}

export function AgentAvatar({ className, type = 'agent', name, fallback, status, ...props }: AvatarProps) {
  return (
    <div className="relative inline-block">
      <div className={cn('flex items-center justify-center shrink-0 h-10 w-10 overflow-hidden rounded-full bg-blue-500/10 border-2 border-blue-500/30', className)} {...props}>
        {type === 'human' ? <User className="h-5 w-5 text-blue-300" /> : <Bot className={cn("h-5 w-5", type === 'avatar' ? 'text-blue-400' : 'text-blue-300/80')} />}
      </div>
      
      {status && (
        <span className={cn(
          "absolute -bottom-1 -right-1 status-dot rounded-full border border-black",
          status === 'working' ? 'bg-green-500' : status === 'idle' ? 'bg-yellow-500' : 'bg-slate-600'
        )} />
      )}
    </div>
  );
}
