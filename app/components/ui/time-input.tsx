import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Clock } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Input, type InputProps } from '@/components/ui/input';

type TimeInput = InputProps & {
  popoverContent?: React.ReactNode;
  isDisabled?: boolean;
};

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInput>(
  ({ popoverContent, className, isDisabled, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="relative">
        <Input type="time" className={className} ref={ref} {...props} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={isDisabled}
              className={cn(
                'absolute top-0 right-0 bottom-0 z-10 my-auto h-fit px-3 py-2 hover:bg-transparent'
              )}
              tabIndex={-1}
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="z-50 my-2 flex min-w-61.25 flex-col gap-2 rounded-md border bg-background p-4 shadow-md"
          >
            {popoverContent}
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);
TimeInput.displayName = 'TimeInput';