import { VisuallyHidden } from 'radix-ui';

import { cn } from '@/lib/utils';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import type { ImageProps } from './image';
import Image from './image';

export default function ExpandableImage({ src, alt, className, ...props }: ImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image src={src} alt={alt} className={cn('cursor-zoom-in', className)} {...props} />
      </DialogTrigger>

      <VisuallyHidden.Root asChild>
        <DialogTitle>{alt}</DialogTitle>
      </VisuallyHidden.Root>

      <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
        <Image src={src} alt={alt} className="h-auto max-h-[85vh] w-full object-contain" />
      </DialogContent>
    </Dialog>
  );
}
