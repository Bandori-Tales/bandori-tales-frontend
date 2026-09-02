import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import type { SiteFeature } from '@/constants';

import { CardPageComponent } from './card-component';

export default function CardPageSection({
  sectionName,
  isMobile,
  isExternal,
  items,
}: {
  sectionName: string;
  isMobile: boolean;
  isExternal: boolean;
  items: SiteFeature[];
}) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true);

  const inverseCollapsibleState = () => {
    setIsCollapsibleOpen(!isCollapsibleOpen);
  };
  return (
    <Collapsible
      className="pt-4 pb-6 transition-all duration-300"
      open={isCollapsibleOpen}
      onOpenChange={inverseCollapsibleState}
    >
      <div className="mb-4 flex h-fit w-full flex-row items-center justify-center gap-2.5">
        <Text type="h6" weight="bold" className="text-nowrap text-primary">
          {sectionName}
        </Text>
        <div className="flex h-fit w-full border-t-3 border-t-primary" />
        <CollapsibleTrigger className="rounded-full border border-primary bg-white p-1.5 transition-all duration-300 hover:bg-white/80">
          <ChevronDown
            className={cn(
              'stroke-3 text-primary transition-all duration-300',
              isCollapsibleOpen ? 'rotate-180' : 'rotate-0'
            )}
          />
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent
        className={cn(
          'grid h-fit w-full gap-6 transition-all duration-300',
          'data-[state=closed]:slide-out-to-top-10 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-10 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=open]:animate-in',
          isMobile ? 'grid-cols-1' : 'grid-cols-4 lg:grid-cols-5'
        )}
      >
        {items.length === 0 ? (
          <div className={cn('h-fit w-full', isMobile ? 'col-span-1' : 'col-span-5')}>
            <Text type="t" weight="bold" className="text-center">
              No Content Available..
            </Text>
          </div>
        ) : (
          items.map((item, id) => (
            <div
              key={`${sectionName} item ${id}`}
              className="col-span-1 row-span-1 flex h-fit w-full items-center justify-center"
            >
              <CardPageComponent {...item} isMobile={isMobile} isExternal={isExternal} />
            </div>
          ))
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
