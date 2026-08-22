import { cn } from '@/lib/utils';

import Image from './image';
import { Text } from './text';

export default function WebNameLogo({
  size,
  wrap_text,
}: {
  size: 'regular' | 'small';
  wrap_text: boolean;
}) {
  return (
    <div
      className={cn(
        'justify-baseline group flex flex-row items-center hover:cursor-pointer',
        size === 'regular' ? 'gap-2' : 'gap-1.5'
      )}
    >
      <Image
        src="/android-chrome-192x192.png"
        alt="Web Logo"
        className={cn(
          'w-auto',
          size === 'regular'
            ? 'h-9 group-hover:drop-shadow-[0px_0px_8px_rgba(255,241,242,0.2)]'
            : 'h-8 group-hover:drop-shadow-[0px_0px_6px_rgba(255,241,242,0.2)]'
        )}
      />
      <div className={cn('flex h-fit w-fit gap-0', wrap_text ? 'flex-col' : 'flex-row gap-1')}>
        <Text
          type="p"
          weight="bold"
          lineHeight={4}
          className="text-rose-50 italic group-hover:underline"
        >
          Bandori
        </Text>
        <Text
          type="p"
          weight={wrap_text ? 'extrabold' : 'bold'}
          lineHeight={wrap_text ? 5 : 4}
          className={cn('text-rose-50 group-hover:underline', wrap_text ? 'not-italic' : 'italic')}
        >
          TALES
        </Text>
      </div>
    </div>
  );
}
