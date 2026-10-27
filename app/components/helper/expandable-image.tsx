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

      <DialogContent
        showCloseButton={false}
        className="w-fit max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[95vw]"
      >
        <Image
          src={src}
          alt={alt}
          className="h-auto max-h-[85vh] w-auto max-w-[95vw] object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
