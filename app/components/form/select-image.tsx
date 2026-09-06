import { type LucideIcon, X } from 'lucide-react';
import { type Control, type FieldValues, type UseFormWatch, useFormContext } from 'react-hook-form';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import Image from '../helper/image';
import { Text } from '../helper/text';
import { Badge, type BadgeProps } from '../ui/badge';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { FormField } from '../ui/form';
import { Switch } from '../ui/switch';

interface SelectImageProps {
  title: string;
  desciption?: string;
  name: string;
  items: {
    label: string;
    value: string | number;
    description?: string;
    badge?: BadgeProps;
    image?: string;
    icon?: LucideIcon;
  }[];
  isBadge?: boolean;
  roundedImage?: boolean;
  arrayMode?: boolean;
  withOperationSwitch?: boolean;
  operationFieldName?: string;
  alwaysSortArray?: boolean;
  className?: string;
}

function OperationSwitch({
  operationFieldName,
  control,
  watch,
}: {
  operationFieldName: string;
  control: Control;
  watch: UseFormWatch<FieldValues>;
}) {
  const operation = watch(operationFieldName);

  return (
    <FormField
      control={control}
      name={operationFieldName}
      render={({ field }) => (
        <div className="flex flex-row items-center justify-start gap-2">
          <Text type="btn" weight="semibold" lineHeight={5}>
            Operation:
          </Text>
          <div className="flex flex-row items-center justify-center gap-1">
            <Text type="c" weight="bold" className="text-blue-500">
              OR
            </Text>
            <Switch
              checked={operation === 'AND'}
              className="data-[state=checked]:bg-green-300 data-[state=unchecked]:bg-blue-300"
              onClick={() => {
                if (operation === 'OR') {
                  field.onChange('AND');
                } else field.onChange('OR');
              }}
            />
            <Text type="c" weight="bold" className="text-green-500">
              AND
            </Text>
          </div>
        </div>
      )}
    />
  );
}

function OperationIcon({ operation }: { operation: string }) {
  const isOrOperation = operation === 'OR';

  return (
    <div
      className={cn(
        'col-span-6 flex items-center justify-center rounded-sm border px-3 py-1',
        isOrOperation ? 'border-blue-900 bg-blue-700' : 'border-green-900 bg-green-700'
      )}
    >
      <Text
        className={cn(
          'text-center font-semibold text-[10px] leading-2.5',
          isOrOperation ? 'text-blue-100' : 'text-green-100'
        )}
      >
        {isOrOperation ? 'OR' : 'AND'}
      </Text>
    </div>
  );
}

function SelectImage({
  title,
  desciption,
  name,
  items,
  isBadge = false,
  roundedImage = true,
  arrayMode = true,
  withOperationSwitch = false,
  operationFieldName = '',
  alwaysSortArray = true,
  className = '',
}: SelectImageProps) {
  const { control, watch, setValue, getValues } = useFormContext();
  const { isOpen, open: openDialog, close: closeDialog } = useDialogStore();

  const arrayValues: (string | number)[] = arrayMode ? watch(name) || [] : [];
  const operationValue: string = watch(operationFieldName);
  const isTextHigh = items.some((item) => item.label.length > 12);

  function handleSelection(value: string | number) {
    if (!arrayMode) return;

    const selectedItem = items.find((item) => item.value === value);
    if (!selectedItem) return;

    const currentArray: (string | number)[] = getValues(name) || [];

    const existingIndex = currentArray.indexOf(selectedItem.value);

    let newArray: (string | number)[] = [];
    if (existingIndex !== -1) {
      newArray = currentArray.filter((_, index) => index !== existingIndex);
    } else {
      newArray = alwaysSortArray
        ? [...currentArray, selectedItem.value].sort()
        : [...currentArray, selectedItem.value];
    }

    setValue(name, newArray, { shouldDirty: true });
  }

  function isItemSelected(value: string | number) {
    if (arrayMode) {
      return arrayValues.some((item) => item === value);
    }

    return getValues(name) === value;
  }

  return (
    <>
      <Dialog
        open={isOpen[name]}
        onOpenChange={(open) => {
          if (!open) closeDialog(name);
        }}
      >
        <DialogContent
          className="h-125 max-w-sm bg-white sm:max-w-xl lg:max-w-2xl"
          showCloseButton={false}
        >
          <DialogClose className="absolute top-4 right-4 rounded-full border-none p-1 shadow-none">
            <X size={18} />
          </DialogClose>

          <DialogHeader className="space-y-2">
            <DialogTitle className="font-semibold text-lg text-primary">{title}</DialogTitle>
            {desciption && (
              <DialogDescription className="text-gray-500 text-sm">{desciption}</DialogDescription>
            )}
          </DialogHeader>

          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <>
                <div
                  className={cn(
                    'grid h-full w-full gap-3 overflow-y-scroll px-2',
                    isBadge
                      ? 'grid-cols-1'
                      : 'shrink-0 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
                  )}
                >
                  {items.map((item) => {
                    const isSelected = isItemSelected(item.value);
                    const Icon = item.icon;

                    return (
                      <div
                        key={`${name}_${item.value}`}
                        className={cn(
                          'group flex w-full items-center rounded-md transition-colors duration-300 hover:bg-black/5',
                          isBadge ? 'h-fit justify-start py-1' : 'h-full justify-center'
                        )}
                      >
                        <button
                          type="button"
                          className={cn('flex flex-col items-center justify-center gap-1 p-2')}
                          onClick={() => {
                            if (arrayMode) {
                              handleSelection(item.value);
                            } else field.onChange(item.value);
                          }}
                        >
                          {item.badge && (
                            <div className="flex w-full flex-row items-baseline justify-start gap-2">
                              <Checkbox checked={isSelected} />
                              <div className="flex w-full flex-col gap-1">
                                <Badge title={item.label} {...item.badge} />
                                {item.description && (
                                  <Text
                                    type="c"
                                    weight="medium"
                                    lineHeight={5}
                                    className="text-left text-slate-500"
                                  >
                                    {item.description}
                                  </Text>
                                )}
                              </div>
                            </div>
                          )}
                          {item.image && (
                            <div
                              className={cn(
                                'flex size-8 items-center justify-center overflow-clip rounded-full transition-colors duration-300 group-hover:ring-2 group-hover:ring-amber-400',
                                roundedImage ? 'p-0' : 'p-1',
                                isSelected ? 'ring-2 ring-amber-500' : 'ring-0'
                              )}
                            >
                              <Image
                                alt={item.label}
                                src={item.image}
                                className={cn(roundedImage ? 'size-8' : 'size-7')}
                              />
                            </div>
                          )}
                          {Icon && (
                            <Icon
                              className={cn(
                                'size-8 stroke-3 transition-colors duration-300 group-hover:text-amber-500',
                                isSelected ? 'text-amber-500' : 'text-primary'
                              )}
                            />
                          )}
                          {!isBadge && (
                            <Text
                              type="c"
                              weight="medium"
                              lineHeight={4}
                              className={cn(
                                'flex flex-col items-center justify-start text-center transition-colors duration-300 group-hover:text-amber-400',
                                isTextHigh ? 'h-12' : 'h-fit',
                                isSelected ? 'text-amber-400' : 'text-primary'
                              )}
                            >
                              {item.label}
                            </Text>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
                {arrayMode && (
                  <DialogFooter className="flex h-full w-full items-end justify-center">
                    <div
                      className={cn(
                        'flex h-fit w-full flex-col items-end border-t border-t-primary pt-2 sm:flex-row sm:items-center',
                        withOperationSwitch ? 'justify-end gap-3 sm:justify-between' : 'justify-end'
                      )}
                    >
                      {withOperationSwitch && (
                        <OperationSwitch
                          operationFieldName={operationFieldName}
                          control={control}
                          watch={watch}
                        />
                      )}
                      <div className="flex w-fit flex-row items-center justify-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="hover:bg-black/5"
                          onClick={() => {
                            field.onChange([]);
                          }}
                        >
                          Deselect All
                        </Button>
                        <Button
                          type="button"
                          variant="default"
                          size="sm"
                          onClick={() => {
                            field.onChange(items.map((item) => item.value));
                          }}
                        >
                          Select All
                        </Button>
                      </div>
                    </div>
                  </DialogFooter>
                )}
              </>
            )}
          />
        </DialogContent>
      </Dialog>

      <button
        type="button"
        className={cn(className, 'grid w-full grid-cols-6 gap-1.5')}
        onClick={() => openDialog(name)}
      >
        {withOperationSwitch && <OperationIcon operation={operationValue} />}
        {items
          .filter((item) => arrayValues.includes(item.value))
          .map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={`display_${item.label}`}
                className={cn(
                  'flex items-center rounded-full',
                  isBadge ? 'col-span-6 w-full justify-start' : 'col-span-1 justify-center'
                )}
              >
                {item.badge && <Badge title={item.label} {...item.badge} />}
                {item.image && (
                  <div
                    className={cn(
                      'flex size-6 items-center justify-center overflow-clip rounded-full ring-1 ring-rose-800',
                      roundedImage ? 'p-0' : 'p-1'
                    )}
                  >
                    <Image
                      alt={item.label}
                      src={item.image}
                      className={cn(roundedImage ? 'size-6' : 'size-5')}
                    />
                  </div>
                )}
                {Icon && <Icon className="size-5 stroke-3 text-primary" />}
              </div>
            );
          })}
        {items.filter((item) => arrayValues.includes(item.value)).length === 0 &&
          !withOperationSwitch && (
            <Text type="btn" weight="medium" className="col-span-6 w-full">
              Nothing Selected..
            </Text>
          )}
      </button>
    </>
  );
}

export { SelectImage };
