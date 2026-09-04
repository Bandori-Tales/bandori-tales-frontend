import { ChevronsDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import type { BandoriStory, ReadingStatus } from '@/schemas/models';

import { StoryCard } from '../components/story-card';

export function StoryCollapsible({
  sectionName,
  isMobile,
  isUnread,
  items,
  setSelectedStory,
  updateReadingStatus,
}: {
  sectionName: string;
  isMobile: boolean;
  isUnread: boolean;
  items: (BandoriStory & { status?: ReadingStatus })[];
  setSelectedStory: (story: (BandoriStory & { status?: ReadingStatus }) | null) => void;
  updateReadingStatus: (id: number, status: ReadingStatus | 'unread') => void;
}) {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true);

  const inverseCollapsibleState = () => {
    setIsCollapsibleOpen(!isCollapsibleOpen);
  };

  const filteredItems = items.filter((item) =>
    isUnread
      ? item.status !== 'finish' && item.status !== 'skip'
      : item.status === 'finish' || item.status === 'skip'
  );

  return (
    <Collapsible
      className="pb-6 transition-all duration-300"
      open={isCollapsibleOpen}
      onOpenChange={inverseCollapsibleState}
    >
      <CollapsibleTrigger className="group mb-4 flex h-fit w-full flex-row-reverse items-center justify-center gap-2.5 border-b py-2 lg:flex-row">
        <Text
          type="t"
          weight="semibold"
          className={cn(
            'text-nowrap transition-all duration-300',
            isUnread
              ? 'text-primary group-hover:text-primary/80'
              : 'text-green-600 group-hover:text-green-600/80'
          )}
        >
          {sectionName}
          {` (${filteredItems.length})`}
        </Text>
        <div
          className={cn(
            'flex h-fit w-full border-t-3 transition-all duration-300',
            isUnread
              ? 'border-t-primary group-hover:border-t-primary/80'
              : 'border-t-green-600 group-hover:border-t-green-600/80'
          )}
        />
        <ChevronsDown
          className={cn(
            'size-5 shrink-0 stroke-3 transition-all duration-300',
            isCollapsibleOpen ? 'rotate-180' : 'rotate-0',
            isUnread
              ? 'text-primary group-hover:text-primary/80'
              : 'text-green-600 group-hover:text-green-600/80'
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent
        className={cn(
          'flex h-fit w-full flex-col gap-3 transition-all duration-300',
          'data-[state=closed]:slide-out-to-top-10 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-top-10 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=open]:animate-in'
        )}
      >
        {filteredItems.map((item) => (
          <StoryCard
            key={`story_${item.id}_${isUnread ? 'unread' : 'finished'}`}
            isMobile={isMobile}
            story={item}
            setSelectedStory={setSelectedStory}
            updateReadingStatus={updateReadingStatus}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
