import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

import type { FormClassnamesProps } from '@/schemas/types';

interface CheckboxFormProps {
  name: string;
  label?: string;
  description?: string;
  isDisabled?: boolean;
  classNames?: FormClassnamesProps;
  onChange?: (checked: boolean) => void;
}

export default function CheckboxForm({
  name,
  label,
  description,
  classNames,
  isDisabled = false,
  onChange,
}: CheckboxFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const hasError = Boolean(errors[name]?.message);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="text-start">
          <div className={cn(label && 'flex items-center gap-3', classNames?.wrapper)}>
            <FormControl>
              <Checkbox
                disabled={isDisabled}
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  onChange?.(Boolean(checked));
                }}
                defaultValue={field.value}
                className={classNames?.content}
              />
            </FormControl>
            {label && (
              <FormLabel
                className={cn(
                  'leading-5 max-md:text-sm md:leading-6',
                  classNames?.label,
                  isDisabled && 'text-slate-500'
                )}
              >
                {label}
              </FormLabel>
            )}
          </div>
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
