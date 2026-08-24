import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import type { SiteFeature } from '@/constants';

interface CardComponentProps {
  isExternal?: boolean;
  isMobile?: boolean;
}

function AuthorBadge({ author }: { author: string }) {
  return (
    <div className="flex h-fit w-fit rounded-4xl border border-mauve-50 bg-mauve-400 px-3 py-0.5">
      <Text type="c" weight="semibold" className="text-mauve-50">
        {author}
      </Text>
    </div>
  );
}

export function CardPageComponent({
  title,
  href,
  author,
  description,
  profilePicture,
  isMobile,
  isDisabled = false,
  isExternal = false,
}: SiteFeature & CardComponentProps) {
  return isMobile ? (
    <div
      className={cn(
        'justify-baseline group flex h-58 w-full flex-col items-center gap-2 rounded-xl border border-primary-foreground bg-linear-to-t from-rose-700 to-rose-600 p-2.5 shadow-black shadow-xl/50 transition-colors duration-300 active:border-amber-400 active:from-rose-600'
      )}
    >
      <div className="flex h-fit w-full flex-row items-center gap-2.5">
        <div
          className={cn(
            'relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-xl border border-white bg-white/50 transition-colors duration-300 group-active:border-amber-400'
          )}
        >
          <Image
            src={profilePicture || '/images/dummy.png'}
            alt={title}
            className={cn('z-11 h-18 w-fit shrink-0 rounded-xl p-1.5')}
          />
          <Image
            src={profilePicture || '/images/dummy.png'}
            alt={title}
            className={cn('absolute z-10 h-full w-full blur-sm')}
          />
        </div>

        <Text
          type="st1"
          weight="bold"
          className={cn(
            'w-fit text-wrap text-left text-primary-foreground transition-colors duration-300 group-active:text-amber-400'
          )}
        >
          {title}
        </Text>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between gap-1.5">
        <div className="justify-baseline flex h-full w-full flex-col items-baseline gap-1.5 border-b border-b-primary-foreground transition-colors duration-300 group-active:border-b-amber-400">
          {author && <AuthorBadge author={author} />}
          <Text
            type="btn"
            weight="medium"
            lineHeight={5}
            className="wrap-break-word h-fit w-full text-primary-foreground"
          >
            {description}
          </Text>
        </div>

        <div className="h-fit w-full">
          <Button asChild variant="secondary" disabled={isDisabled}>
            <Link
              to={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={cn('flex h-fit w-full flex-row items-center justify-center gap-2')}
            >
              <Text type="btn" weight="medium" className="text-primary">
                {isExternal ? 'Go to Site' : 'Go to Page'}
              </Text>
              {isExternal ? <ExternalLink /> : <ArrowRight />}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'justify-baseline group flex w-full items-center gap-2.5 rounded-xl border border-primary-foreground bg-linear-to-t from-rose-700 to-rose-600 p-2.5 shadow-black shadow-xl/50 transition-colors duration-300 hover:border-amber-400 hover:from-rose-600',
        isMobile ? 'h-52 flex-row' : 'h-94.5 flex-col'
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-xl border border-white bg-white/50 transition-colors duration-300 group-hover:border-amber-400',
          isMobile ? 'h-fit w-fit' : 'h-48 w-full'
        )}
      >
        <Image
          src={profilePicture || '/images/dummy.png'}
          alt={title}
          className={cn('z-11 rounded-xl p-1.5', isMobile ? 'h-auto w-28' : 'h-full w-auto')}
        />
        <Image
          src={profilePicture || '/images/dummy.png'}
          alt={title}
          className={cn('absolute z-10 blur-sm', isMobile ? 'h-full w-full' : 'h-fit w-full')}
        />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between gap-1.5">
        <div className="justify-baseline flex h-full w-full flex-col items-center gap-4 border-b border-b-primary-foreground transition-colors duration-300 group-hover:border-b-amber-400">
          <Text
            type="st1"
            weight="bold"
            className={cn(
              'w-full text-primary-foreground transition-colors duration-300 group-hover:text-amber-400',
              isMobile ? 'text-left' : 'text-center'
            )}
          >
            {title}
          </Text>
          <div className="justify-baseline flex w-full flex-col items-baseline gap-2.5">
            {author && <AuthorBadge author={author} />}
            <Text
              type="btn"
              weight="medium"
              lineHeight={5}
              className="wrap-break-word h-fit w-full text-primary-foreground"
            >
              {description}
            </Text>
          </div>
        </div>

        <div className="h-fit w-full">
          <Button asChild variant="secondary" disabled={isDisabled}>
            <Link
              to={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={cn(
                'flex h-fit flex-row items-center justify-center gap-2',
                isMobile ? 'w-fit' : 'w-full'
              )}
            >
              <Text type="btn" weight="medium" className="text-primary">
                {isExternal ? 'Go to Site' : 'Go to Page'}
              </Text>
              {isExternal ? <ExternalLink /> : <ArrowRight />}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
