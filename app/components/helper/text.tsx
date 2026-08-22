import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ElementType } from 'react';

import { cn } from '@/lib/utils';

const textVariants = cva('font-sans tracking-wide', {
  variants: {
    type: {
      h1: 'text-8xl',
      h2: 'text-7xl',
      h3: 'text-6xl',
      h4: 'text-5xl',
      h5: 'text-4xl',
      h6: 'text-3xl',
      t: 'text-2xl',
      st1: 'text-xl',
      st2: 'text-lg',
      p: 'text-base',
      btn: 'text-sm',
      c: 'text-xs',
    },
    lineHeight: {
      none: 'leading-none',
      1: 'leading-1',
      2: 'leading-2',
      3: 'leading-3',
      4: 'leading-4',
      5: 'leading-5',
      6: 'leading-6',
      7: 'leading-7',
      8: 'leading-8',
      9: 'leading-9',
      10: 'leading-10',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  defaultVariants: {
    type: 'p',
    lineHeight: 'none',
    weight: 'regular',
  },
});

const typeMapping: Record<NonNullable<VariantProps<typeof textVariants>['type']>, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  t: 'p',
  st1: 'p',
  st2: 'p',
  p: 'p',
  btn: 'span',
  c: 'span',
};

type TextOwnProps<T extends ElementType = ElementType> = {
  as?: T;
  children?: React.ReactNode;
} & VariantProps<typeof textVariants>;

export type TextProps<T extends ElementType> = TextOwnProps<T> &
  Omit<ComponentProps<T>, keyof TextOwnProps<T>>;

export function Text<T extends ElementType = 'p'>({
  as,
  children,
  className,
  type,
  lineHeight,
  weight,
  ...rest
}: TextProps<T>) {
  const Component = as ?? (type ? typeMapping[type] : 'p');

  return (
    <Component className={cn(textVariants({ type, lineHeight, weight, className }))} {...rest}>
      {children}
    </Component>
  );
}
