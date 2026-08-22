import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import type { FormClassnamesProps } from '@/schemas/types';

interface TextareaFormProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  minHeight?: number;
  maxHeight?: number;
  isRequired?: boolean;
  isDisabled?: boolean;
  classNames?: FormClassnamesProps;
}

export default function TextareaForm({
  name,
  label,
  placeholder,
  description,
  classNames,
  minHeight,
  maxHeight,
  isRequired,
  isDisabled,
}: TextareaFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const hasError = Boolean(errors[name]?.message);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={classNames?.wrapper}>
          {label && (
            <FormLabel
              className={cn(
                'max-md:text-sm',
                isDisabled && 'text-slate-500',
                isRequired && 'after:-ml-1.5 after:text-destructive after:content-["*"]',
                classNames?.label
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormMessage />
          <FormControl>
            <Textarea
              disabled={isDisabled}
              minHeight={minHeight}
              maxHeight={maxHeight}
              placeholder={placeholder}
              className={cn(
                'resize-none rounded-md border p-2',
                hasError && 'border-destructive',
                classNames?.content
              )}
              {...field}
            />
          </FormControl>
          {description && (
            <FormDescription
              className={cn(
                'text-xs md:text-sm',
                hasError && 'text-destructive-400',
                isDisabled && 'text-slate-500'
              )}
            >
              {description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
