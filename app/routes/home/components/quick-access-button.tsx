import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

type QuickAccessButtonProps = {
  title: string;
  path: string;
  icon?: LucideIcon;
  image?: string;
  reverseFlex?: boolean;
};

export function QuickAccessButton({
  title,
  path,
  icon,
  image,
  reverseFlex = false,
}: QuickAccessButtonProps) {
  const Icon = icon;

  return (
    <Button
      asChild
      className="group rounded-xl border border-white bg-primary/60 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400 [&_svg]:size-8"
    >
      <Link
        to={path}
        className={cn(
          'flex h-fit w-80 flex-row items-center justify-start gap-1 text-white lg:w-52 lg:flex-col lg:justify-center',
          reverseFlex && 'flex-row-reverse'
        )}
      >
        {Icon && (
          <div className="flex items-center justify-center rounded-full bg-foreground/50 p-2">
            <Icon className="stroke-2" />
          </div>
        )}
        {image && <Image alt={title} src={image} className="size-12 overflow-clip rounded-full" />}
        <Text
          type="p"
          weight="semibold"
          lineHeight={5}
          className="text-center transition-colors duration-300 group-hover:text-amber-400"
        >
          {title}
        </Text>
      </Link>
    </Button>
  );
}
