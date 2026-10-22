import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white border border-slate-200/90 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('p-3.5 sm:p-4 border-b border-slate-100', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('p-3.5 sm:p-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn('px-3.5 py-2.5 sm:px-4 sm:py-3 bg-slate-50/60 border-t border-slate-100', className)}
      {...props}
    >
      {children}
    </div>
  );
}

