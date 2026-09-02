import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

import type { FormClassnamesProps } from '@/schemas/types';

import { Switch } from '../ui/switch';

interface SwitchFormProps {
  name: string;
  label?: string;
  description?: string;
  isDisabled?: boolean;
  classNames?: FormClassnamesProps;
  onChange?: (checked: boolean) => void;
}

export default function SwitchForm({
  name,
  label,
  description,
  classNames,
  isDisabled = false,
  onChange,
}: SwitchFormProps) {
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
          <div className={cn(label && 'flex gap-3', classNames?.wrapper)}>
            <FormControl>
              <Switch
                disabled={isDisabled}
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  onChange?.(Boolean(checked));
                }}
                defaultValue={field.value}
              />
            </FormControl>
            {label && (
              <FormLabel
                className={cn('max-md:text-sm', classNames?.label, isDisabled && 'text-slate-500')}
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
