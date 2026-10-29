import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import Image from './image';
import { Text } from './text';

export default function WebNameLogo({
  size,
  wrapText,
  handleCloseSideMenu,
}: {
  size: 'regular' | 'small';
  wrapText: boolean;
  handleCloseSideMenu?: () => void;
}) {
  return (
    <Link
      to="/"
      className={cn(
        'group flex flex-row items-center justify-start hover:cursor-pointer',
        size === 'regular' ? 'gap-2' : 'gap-1.5'
      )}
      onClick={() => handleCloseSideMenu?.()}
    >
      <Image
        src="/android-chrome-192x192.png"
        alt="Web Logo"
        className={cn(
          'w-auto transition-all',
          size === 'regular'
            ? 'h-8 group-hover:drop-shadow-[0px_0px_5px_rgba(253,154,0)]'
            : 'h-7 group-hover:drop-shadow-[0px_0px_4px_rgba(253,154,0)]'
        )}
      />
      <div className={cn('flex h-fit w-fit gap-0', wrapText ? 'flex-col' : 'flex-row gap-1')}>
        <Text
          type="btn"
          weight="bold"
          lineHeight={4}
          className="text-rose-50 italic transition-colors group-hover:text-secondary"
        >
          Bandori
        </Text>
        <Text
          type="btn"
          weight={wrapText ? 'extrabold' : 'bold'}
          lineHeight={wrapText ? 5 : 4}
          className={cn(
            'text-rose-50 transition-colors group-hover:text-secondary',
            wrapText ? 'not-italic' : 'italic'
          )}
        >
          TALES
        </Text>
      </div>
    </Link>
  );
}
