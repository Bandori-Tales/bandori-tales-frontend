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
        'relative flex h-58 w-full flex-col items-center justify-start gap-2 rounded-xl border border-primary-foreground bg-linear-to-t from-rose-700 to-rose-600 p-2.5 shadow-black shadow-xl/50 transition-colors duration-300',
        isDisabled ? undefined : 'group active:border-amber-400 active:from-rose-600'
      )}
    >
      <div
        className={cn(
          isDisabled ? 'absolute top-0 z-12 h-full w-full rounded-xl bg-white/25' : 'hidden'
        )}
      />
      <div className="flex h-fit w-full flex-row items-center gap-2.5">
        <div className="relative flex h-fit w-fit items-center justify-center overflow-hidden rounded-xl border border-white bg-white/50 transition-colors duration-300 group-active:border-amber-400">
          <Image
            src={profilePicture || '/images/dummy.png'}
            alt={title}
            className="z-11 h-18 w-fit shrink-0 rounded-xl p-1.5 group-active:scale-110"
          />
          <Image
            src={profilePicture || '/images/dummy.png'}
            alt={title}
            className="absolute z-10 h-full w-full blur-sm group-active:scale-125"
          />
        </div>

        <Text
          type="st1"
          weight="bold"
          className="w-fit text-wrap text-left text-primary-foreground transition-colors duration-300 group-active:text-amber-400"
        >
          {title}
        </Text>
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between gap-1.5">
        <div className="flex h-full w-full flex-col items-baseline justify-start gap-1.5 border-b border-b-primary-foreground transition-colors duration-300 group-active:border-b-amber-400">
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
          <Button
            asChild
            variant="secondary"
            className={cn(isDisabled ? 'pointer-events-none' : 'pointer-events-auto')}
          >
            <Link
              to={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex h-fit w-full flex-row items-center justify-center gap-2"
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
        'relative flex h-94.5 w-full flex-col items-center justify-start gap-2.5 rounded-xl border border-primary-foreground bg-linear-to-t from-rose-700 to-rose-600 p-2.5 shadow-black shadow-xl/50 transition-colors duration-300',
        isDisabled
          ? undefined
          : 'group hover:cursor-default hover:border-amber-400 hover:from-rose-600'
      )}
    >
      <div
        className={cn(
          isDisabled ? 'absolute top-0 z-12 h-full w-full rounded-xl bg-white/40' : 'hidden'
        )}
      />
      <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-white bg-white/50 transition-colors duration-300 group-hover:border-amber-400">
        <Image
          src={profilePicture || '/images/dummy.png'}
          alt={title}
          className="z-11 h-full w-auto rounded-xl p-1.5 group-hover:scale-105"
        />
        <Image
          src={profilePicture || '/images/dummy.png'}
          alt={title}
          className="absolute z-10 h-fit w-full blur-sm group-hover:scale-125"
        />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between gap-1.5">
        <div className="flex h-full w-full flex-col items-center justify-start gap-4 border-b border-b-primary-foreground transition-colors duration-300 group-hover:border-b-amber-400">
          <Text
            type="st1"
            weight="bold"
            className="w-full text-center text-primary-foreground transition-colors duration-300 group-hover:text-amber-400"
          >
            {title}
          </Text>
          <div className="flex w-full flex-col items-baseline justify-start gap-2.5">
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
          <Button
            asChild
            variant="secondary"
            className={cn(isDisabled ? 'pointer-events-none' : 'pointer-events-auto')}
          >
            <Link
              to={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex h-fit w-full flex-row items-center justify-center gap-2"
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
