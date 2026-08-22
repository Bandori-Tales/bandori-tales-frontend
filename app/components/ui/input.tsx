import type * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ className, type, readOnly, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      readOnly={readOnly}
      onWheel={type === 'number' ? (e) => (e.target as HTMLInputElement).blur() : undefined}
      data-slot="input"
      className={cn(
        'flex h-10 w-full min-w-0 rounded-md border border-input bg-mauve-50 px-3 text-sm shadow-sm outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-10 file:border-0 file:bg-mauve-50 file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
        'focus-visible:border-amber-500 focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        readOnly && 'text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export { Input };