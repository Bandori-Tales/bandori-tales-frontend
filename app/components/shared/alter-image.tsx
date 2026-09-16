import { cn } from '@/lib/utils';

import type { CustomImageOverlay } from '@/schemas/types';

import Image from '../helper/image';

type ProfileImageAlterProps = CustomImageOverlay & {
  alt: string;
  source: string | string[];
  className?: string;
};

export default function ProfileImageAlter({
  imageArrayIndex,
  useOverlay,
  grayscale,
  overlayImageSource,
  overlayImageClassname,
  alt,
  source,
  className,
}: ProfileImageAlterProps) {
  const imageSource = Array.isArray(source) ? source[imageArrayIndex || 0] : source;

  return (
    <div className="relative h-fit w-fit">
      {useOverlay && overlayImageSource && (
        <Image
          alt="Profile Overlay"
          src={overlayImageSource}
          className={cn(
            'absolute top-[4%] z-50 h-fit w-11',
            grayscale && 'grayscale-75',
            overlayImageClassname
          )}
        />
      )}
      <Image
        alt={alt}
        src={imageSource}
        className={cn(className, grayscale && 'grayscale-75', useOverlay ? 'z-40' : 'z-auto')}
      />
    </div>
  );
}
