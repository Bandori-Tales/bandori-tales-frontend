import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React, { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'shadow-sm',
        outline: 'border bg-transparent shadow-sm',
        secondary: 'bg-mauve-50 text-foreground shadow-xs hover:bg-mauve-50/80',
        ghost: 'hover:bg-mauve-50',
        link: 'underline-offset-4 hover:underline',
      },
      colors: {
        default: 'text-primary',
        'amber': 'text-amber-500',
        'cyan': 'text-cyan-500',
        destructive: 'text-destructive',
      },
      size: {
        default: 'h-10 rounded-md px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: cn(
          'h-9 rounded-md px-4 has-[>svg]:px-3 max-md:py-2',
          'md:h-10 md:px-6 md:has-[>svg]:px-4'
        ),
        icon: 'size-10 rounded-full shrink-0',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        colors: 'default',
        className: 'bg-primary text-primary-foreground hover:bg-primary/80',
      },
      {
        variant: 'default',
        colors: 'cyan',
        className: 'bg-cyan-500 text-white hover:bg-cyan-500/80',
      },
      {
        variant: 'default',
        colors: 'amber',
        className: 'bg-amber-500 text-white hover:bg-amber-500/80',
      },
      {
        variant: 'default',
        colors: 'destructive',
        className:
          'bg-destructive text-white hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
      },
      {
        variant: 'outline',
        colors: 'default',
        className: 'border-primary text-primary hover:bg-primary-foreground/20',
      },
      {
        variant: 'outline',
        colors: 'cyan',
        className:
          'border-cyan-500 text-cyan-500 hover:bg-white/20 hover:text-cyan-500 focus-visible:ring-cyan-500/20',
      },
      {
        variant: 'outline',
        colors: 'amber',
        className:
          'border-amber-500 text-amber-500 hover:bg-white/20 hover:text-amber-500 focus-visible:ring-amber-500/20',
      },
      {
        variant: 'outline',
        colors: 'destructive',
        className:
          'border-destructive text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20',
      },
      {
        variant: 'ghost',
        colors: 'default',
        className: 'text-primary hover:bg-primary-foreground/20',
      },
      {
        variant: 'ghost',
        colors: 'cyan',
        className: 'text-cyan-500 hover:bg-white/20',
      },
      {
        variant: 'ghost',
        colors: 'amber',
        className: 'text-amber-500 hover:bg-white/20',
      },
      {
        variant: 'ghost',
        colors: 'destructive',
        className: 'text-destructive hover:bg-destructive/20',
      },
      {
        variant: 'link',
        colors: 'default',
        className: 'text-primary',
      },
      {
        variant: 'link',
        colors: 'cyan',
        className: 'text-cyan-500',
      },
      {
        variant: 'link',
        colors: 'amber',
        className: 'text-amber-500',
      },
    ],
    defaultVariants: {
      variant: 'default',
      colors: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      colors,
      asChild = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, colors, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {!isLoading && leftIcon}
        <Slottable>{children}</Slottable>
        {!isLoading && rightIcon}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };