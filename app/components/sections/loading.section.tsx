import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function LoadingSection() {
  return (
    <div className="flex w-full items-center justify-center rounded-md border border-border bg-background p-4 sm:px-8 sm:py-6">
      <Loader2 className={cn('size-10 animate-spin text-primary')} />
    </div>
  );
}
