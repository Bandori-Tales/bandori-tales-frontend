import { ArrowDownWideNarrow } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { FormField } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SeletOrderButtonProps {
  items: {
    value: string;
    label: string;
  }[];
  name: string;
  orderDirectionName: string;
  classname?: string;
}

function SelectOrderButton({ name, items, orderDirectionName, classname }: SeletOrderButtonProps) {
  const { control, watch } = useFormContext();

  const orderDirectionValue = watch(orderDirectionName);

  return (
    <div
      className={cn(
        'justify-baseline flex flex-row items-center gap-1 rounded-md bg-primary px-0.5',
        classname
      )}
    >
      <FormField
        control={control}
        name={orderDirectionName}
        render={({ field }) => (
          <button
            type="button"
            onClick={() => {
              if (orderDirectionValue === 'asc') field.onChange('desc');
              else field.onChange('asc');
            }}
            className="flex h-full items-center justify-center rounded-sm px-2 py-2 hover:bg-white/20"
          >
            <ArrowDownWideNarrow
              className={cn(
                'size-4 stroke-3 text-white transition-all duration-300',
                orderDirectionValue === 'asc' ? 'scale-y-[-1]' : 'scale-y-100'
              )}
            />
          </button>
        )}
      />

      <div className="my-1 block h-7 border border-white" />

      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
              <SelectTrigger
                size="sm"
                className="flex h-full w-full cursor-pointer flex-row items-center justify-between rounded-sm border-none text-white hover:bg-white/20"
              >
                <SelectValue className="text-white" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer bg-white drop-shadow-black/30 drop-shadow-md">
                {items.map((item) => {
                  return (
                    <SelectItem key={item.value} value={item.value} className="text-primary">
                      {item.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          );
        }}
      />
    </div>
  );
}

export { SelectOrderButton };
