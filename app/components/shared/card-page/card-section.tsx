import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import type { SiteFeature } from '@/constants';

import { CardPageComponent } from './card-component';

export default function CardPageSection({
  section_name,
  isMobile,
  isExternal,
  items,
}: {
  section_name: string;
  isMobile: boolean;
  isExternal: boolean;
  items: SiteFeature[];
}) {
  return (
    <div className="pt-4 pb-6">
      <div className="mb-4 flex h-fit w-full flex-row items-center justify-center gap-2.5">
        <Text type="h5" weight="bold" className="text-nowrap">
          {section_name}
        </Text>
        <div className="flex w-full border-t-2 border-t-foreground" />
        <Button variant="secondary" size="icon" className="border border-foreground">
          <ChevronDown className="stroke-3" />
        </Button>
      </div>

      <div
        className={cn(
          'grid h-fit w-full gap-6',
          isMobile ? 'grid-cols-1' : 'grid-cols-4 lg:grid-cols-5'
        )}
      >
        {items.length === 0 ? (
          <div className={cn('h-fit w-full', isMobile ? 'col-span-1' : 'col-span-5')}>
            <Text type="h6" weight="bold" className="text-center">
              No Content Available..
            </Text>
          </div>
        ) : (
          items.map((item, id) => (
            <div
              key={`${section_name} item ${id}`}
              className="col-span-1 row-span-1 flex h-fit w-full items-center justify-center"
            >
              <CardPageComponent {...item} isMobile={isMobile} isExternal={isExternal} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
