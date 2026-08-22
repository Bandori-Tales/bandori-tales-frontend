import { ImageOff } from 'lucide-react';
import { useEffect, useState } from 'react';

import { createImageResource } from '@/lib/image';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackClassName?: string;
  fallbackStyle?: React.CSSProperties;
  showFallbackText?: boolean;
}

export default function Image({
  src,
  alt,
  className = '',
  style,
  fallbackClassName = '',
  fallbackStyle,
  showFallbackText = true,
  onLoad,
  onError,
  ...imgProps
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoaded(false);
    setFailed(false);

    createImageResource(src)
      .then(() => {
        if (isMounted) setLoaded(true);
      })
      .catch(() => {
        if (isMounted) setFailed(true);
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  function handleLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    setLoaded(true);
    onLoad?.(e);
  }

  function handleError(e: React.SyntheticEvent<HTMLImageElement>) {
    setFailed(true);
    onError?.(e);
  }

  if (failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center gap-x-2 bg-mauve-300 p-2 text-rose-900 text-sm sm:text-base',
          fallbackClassName,
          className
        )}
        style={{ ...style, ...fallbackStyle }}
        {...imgProps}
      >
        <ImageOff className="size-5" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('transition-all duration-200', !loaded && 'opacity-80 blur-xs', className)}
      style={style}
      onLoad={handleLoad}
      onError={handleError}
      {...imgProps}
    />
  );
}
