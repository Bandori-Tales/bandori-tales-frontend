import type { LucideIcon } from 'lucide-react';

import { Text } from '@/components/helper/text';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type PreferenceSettingComponentProps =
  | {
      type: 'switch';
      currentValue: boolean;
      onClick: (state: boolean) => void;
    }
  | {
      type: 'select';
      currentValue: string;
      items: {
        label: string;
        icon?: LucideIcon;
        value: string;
      }[];
      onClick: (value: string) => void;
    };

export function PreferenceSettingComponent(props: PreferenceSettingComponentProps) {
  switch (props.type) {
    case 'switch': {
      return (
        <div className="flex flex-row items-center justify-center gap-2">
          <Text type="btn" weight="semibold" className="text-primary">
            Off
          </Text>
          <Switch checked={props.currentValue} onClick={() => props.onClick(!props.currentValue)} />
          <Text type="btn" weight="semibold" className="text-primary">
            Off
          </Text>
        </div>
      );
    }
    case 'select': {
      const currentLabel =
        props.items.find((item) => item.value === props.currentValue)?.label || '';
      const CurrentIcon =
        props.items.find((item) => item.value === props.currentValue)?.icon || undefined;

      return (
        <Select>
          <SelectTrigger className="w-48 bg-primary transition-colors duration-300 hover:bg-primary/80">
            <div className="flex flex-row items-center justify-start gap-2">
              {CurrentIcon && <CurrentIcon className="size-5 stroke-3 text-white" />}
              <Text type="btn" weight="semibold" className="text-white">
                {currentLabel}
              </Text>
            </div>
          </SelectTrigger>
          <SelectContent>
            {props.items.map((item) => {
              const Icon = item.icon;

              return (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="group flex w-full flex-row items-center justify-start transition-colors duration-300 hover:bg-amber-400"
                  onClick={() => props.onClick(item.value)}
                >
                  {Icon && (
                    <Icon className="size-5 stroke-2 text-foreground transition-colors duration-300 group-hover:text-white" />
                  )}
                  <Text
                    type="btn"
                    weight="semibold"
                    className="text-foreground transition-colors duration-300 group-hover:text-white"
                  >
                    {item.label}
                  </Text>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      );
    }
  }
}
