import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { ColorPicker } from '@/components/ui/color-picker';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface DrawerSliderProps {
  label: string;
  value: number;
  maxValue: number;
  minValue: number;
  step: number;
  labelClassname?: string;
  handleValueChange: (value: number) => void;
}

interface DrawerSwitchProps {
  label: string;
  value: boolean;
  handleValueChange: (value: boolean) => void;
}

interface DrawerColorPickerProps {
  label: string;
  value: string;
  handleValueChange: (value: string) => void;
}

export function DrawerSlider({
  label,
  value,
  maxValue,
  minValue,
  step,
  labelClassname,
  handleValueChange,
}: DrawerSliderProps) {
  return (
    <div className="flex w-full flex-row items-center gap-3" data-vaul-no-drag>
      <Text
        type="btn"
        weight="semibold"
        lineHeight={5}
        className={cn('w-16 shrink-0 text-nowrap text-left', labelClassname)}
      >
        {label}
      </Text>
      <Slider
        min={minValue}
        max={maxValue}
        value={[value]}
        step={step}
        onValueChange={(v) => handleValueChange(v[0])}
        className="w-70"
      />
      <Input
        type="number"
        value={value}
        min={minValue}
        max={maxValue}
        onChange={(v) => handleValueChange(Number(v.target.value))}
        className="w-15 px-2 text-center"
      />
    </div>
  );
}

export function DrawerSwitch({ label, value, handleValueChange }: DrawerSwitchProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-3 lg:justify-start">
      <Text type="btn" weight="semibold" lineHeight={5} className="w-30 text-nowrap text-left">
        {label}
      </Text>
      <Switch checked={value} onClick={() => handleValueChange(!value)} />
    </div>
  );
}

export function DrawerColorPicker({ label, value, handleValueChange }: DrawerColorPickerProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-3 lg:justify-start">
      <Text type="btn" weight="semibold" lineHeight={5} className="w-30 text-nowrap text-left">
        {label}
      </Text>
      <ColorPicker type="popover" currentColor={value} onChange={handleValueChange} />
    </div>
  );
}
