import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
  size?: 'sm' | 'md';
  mono?: boolean;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200/90',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200/90',
  warning: 'bg-amber-50 text-amber-800 border-amber-200/90',
  danger: 'bg-rose-50 text-rose-700 border-rose-200/90',
};

export function Badge({ children, tone = 'neutral', size = 'sm', mono = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded select-none tracking-tight',
        mono ? 'font-mono' : 'font-sans',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px] leading-tight' : 'px-2 py-0.5 text-[11px] leading-tight',
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

