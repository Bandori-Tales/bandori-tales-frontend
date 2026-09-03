// biome-ignore-all lint/a11y/noStaticElementInteractions: Div Required to be clickable
// biome-ignore-all lint/a11y/useKeyWithClickEvents: Element will be iterated
import { CheckCheck, Delete, FastForward, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';

import { Bands } from '@/constants';
import type { BandoriStory, ReadingStatus } from '@/schemas/models';

import { StoryBadge } from './badges';

interface StoryCardProps {
  isMobile: boolean;
  story: BandoriStory & { status?: ReadingStatus };
  setSelectedStory: (story: (BandoriStory & { status?: ReadingStatus }) | null) => void;
  updateReadingStatus: (id: number, status: ReadingStatus | 'unread') => void;
}

interface ListLabelProps {
  title: string;
  children: ReactNode;
}

interface UpdateStoryStatusButtonProps {
  storyId: number;
  status: ReadingStatus | 'unread';
  isMobile: boolean;
  updateReadingStatus: (id: number, status: ReadingStatus | 'unread') => void;
}

const storyStatusMap: Record<
  string,
  {
    background: string;
    border: string;
    text: string;
    icon: LucideIcon;
  }
> = {
  finish: {
    background: 'bg-green-600',
    border: 'border-green-600',
    text: 'Finish',
    icon: CheckCheck,
  },
  skip: {
    background: 'bg-purple-600',
    border: 'border-purple-600',
    text: 'Skip',
    icon: FastForward,
  },
  unread: {
    background: 'bg-red-600',
    border: 'border-red-600',
    text: 'Unread',
    icon: Delete,
  },
};

function ListLabel({ title, children }: ListLabelProps) {
  return (
    <div className="flex h-fit w-fit flex-row items-center justify-start gap-1 rounded-md bg-mauve-100 px-2 py-1">
      <Text type="btn" lineHeight={5} weight="semibold" className="text-left text-accent/80">
        {title}
      </Text>
      {children}
    </div>
  );
}

export function UpdateStoryStatusButton({
  status,
  isMobile,
  storyId,
  updateReadingStatus,
}: UpdateStoryStatusButtonProps) {
  const Icon = storyStatusMap[status].icon;
  return (
    <button
      type="button"
      className={cn(
        'flex h-fit items-center justify-center rounded-md px-1.5 drop-shadow-black-50 drop-shadow-md transition-opacity duration-300 hover:opacity-80 active:opacity-80',
        isMobile ? 'w-full flex-row gap-1 py-1' : 'w-18 flex-col gap-0 py-2 lg:w-20',
        storyStatusMap[status].background
      )}
      onClick={(e) => {
        e.stopPropagation();
        updateReadingStatus(storyId, status);
      }}
    >
      <Icon className={cn('stroke-2 text-white', isMobile ? 'size-5' : 'size-6')} />
      <Text
        type={isMobile ? 'c' : 'btn'}
        weight="semibold"
        lineHeight={6}
        className="text-center text-white"
      >
        {storyStatusMap[status].text}
      </Text>
    </button>
  );
}

export function StoryCard({
  isMobile,
  story,
  setSelectedStory,
  updateReadingStatus,
}: StoryCardProps) {
  const readStatus = story.status || 'unread';
  const Icon = storyStatusMap[readStatus].icon;

  const { open: openDialog } = useDialogStore();

  function handleOpenDialog() {
    setSelectedStory(story);
    openDialog('story_detail');
  }

  return isMobile ? (
    <div
      className={cn(
        'relative flex h-fit w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-white p-2 drop-shadow-black/50 drop-shadow-md transition-colors duration-300 hover:cursor-pointer active:border-amber-400',
        storyStatusMap[readStatus].border
      )}
    >
      <div
        className={cn(
          'absolute top-0 left-0 flex items-center justify-center rounded-br-xl px-2.5 py-1.5 drop-shadow-black/50 drop-shadow-sm transition-colors duration-300 group-active:bg-amber-400',
          storyStatusMap[readStatus].background,
          readStatus === 'unread' ? 'hidden' : undefined
        )}
      >
        <Icon className="size-4 stroke-2 text-white" />
      </div>
      <div className="flex h-fit w-full flex-col items-center justify-start gap-3">
        <Image
          src={story.story_banner || '/images/dummy.png'}
          alt={`${story.name} Event Banner`}
          className="h-20 w-fit shrink-0"
        />
        <div className="flex h-fit w-full flex-col gap-1.5">
          <Text
            type="p"
            weight="semibold"
            className="text-center text-primary transition-colors duration-300 group-active:text-amber-500"
          >
            {story.name}
          </Text>
          {story.anime_name && (
            <Text
              type="btn"
              weight="semibold"
              className="text-center text-primary/80 transition-colors duration-300 group-active:text-amber-500/80"
            >
              {story.anime_name}
            </Text>
          )}
        </div>
      </div>

      <div className="flex h-fit w-full flex-row flex-wrap items-center justify-center gap-2 border-b border-b-primary py-2 group-active:border-b-amber-400">
        <ListLabel title="Band">
          <Image
            src={Bands[story.main_band].icon}
            alt={`${Bands[story.main_band].name} Icon`}
            className="h-fit w-5"
          />
        </ListLabel>
        <ListLabel title="Tag">
          <StoryBadge badge={story.story_tag} type="story" />
        </ListLabel>
        <ListLabel title="Translation">
          {story.available_tl_type && story.available_tl_type.length > 0 ? (
            story.available_tl_type.map((tlType) => (
              <StoryBadge key={`${story.id}_${tlType}`} badge={tlType} type="translation" />
            ))
          ) : (
            <StoryBadge badge="NONE" type="translation" />
          )}
        </ListLabel>
      </div>

      <div className="flex h-fit w-full flex-row items-center justify-between gap-3 pt-2">
        <UpdateStoryStatusButton
          storyId={story.id}
          status={story.status === 'skip' ? 'unread' : 'skip'}
          isMobile={isMobile}
          updateReadingStatus={updateReadingStatus}
        />
        <button
          type="button"
          className={cn(
            'flex h-fit items-center justify-center rounded-md bg-mauve-500 px-1.5 py-2 drop-shadow-black-50 drop-shadow-md transition-opacity duration-300 active:opacity-80',
            isMobile ? 'w-full flex-row gap-1 py-1' : 'w-20 flex-col gap-0 py-2'
          )}
          onClick={handleOpenDialog}
        >
          <Text
            type={isMobile ? 'c' : 'btn'}
            weight="semibold"
            lineHeight={6}
            className="text-center text-white"
          >
            Detail
          </Text>
        </button>
        <UpdateStoryStatusButton
          storyId={story.id}
          status={story.status === 'finish' ? 'unread' : 'finish'}
          isMobile={isMobile}
          updateReadingStatus={updateReadingStatus}
        />
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'group relative flex h-36 w-full flex-row items-center justify-start gap-2 overflow-hidden rounded-xl border bg-white px-3 py-2 drop-shadow-black/50 drop-shadow-md transition-colors duration-300 active:border-amber-400 lg:h-24 lg:hover:cursor-pointer lg:hover:border-amber-400',
        storyStatusMap[readStatus].border
      )}
      onClick={handleOpenDialog}
    >
      <div
        className={cn(
          'absolute top-0 left-0 flex items-center justify-center rounded-br-xl px-2.5 py-1.5 drop-shadow-black/50 drop-shadow-sm transition-colors duration-300 group-hover:bg-amber-400',
          storyStatusMap[readStatus].background,
          readStatus === 'unread' ? 'hidden' : undefined
        )}
      >
        <Icon className="size-4 stroke-3 text-white" />
      </div>
      <div className="flex h-full w-fit shrink-0 items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={story.story_banner || '/images/dummy.png'}
          alt={`${story.name} Event Banner`}
          className="h-full w-fit shrink-0 py-8 lg:py-0"
        />
      </div>

      <div className="flex h-full w-full flex-col items-baseline justify-between">
        <div className="flex h-fit w-full flex-col gap-1.5">
          <Text
            type="p"
            weight="semibold"
            className="text-primary transition-colors duration-300 group-active:text-amber-500 lg:group-hover:text-amber-500"
          >
            {story.name}
          </Text>
          {story.anime_name && (
            <Text
              type="btn"
              weight="semibold"
              className="text-primary/80 transition-colors duration-300 group-active:text-amber-500/80 lg:group-hover:text-amber-500/80"
            >
              {story.anime_name}
            </Text>
          )}
        </div>
        <div className="flex h-fit w-full flex-row flex-wrap items-center justify-start gap-2">
          <ListLabel title="Band">
            <Image
              src={Bands[story.main_band].icon}
              alt={`${Bands[story.main_band].name} Icon`}
              className="h-fit w-6"
            />
          </ListLabel>
          <ListLabel title="Tag">
            <StoryBadge badge={story.story_tag} type="story" />
          </ListLabel>
          <ListLabel title="Translation">
            {story.available_tl_type && story.available_tl_type.length > 0 ? (
              story.available_tl_type.map((tlType) => (
                <StoryBadge key={`${story.id}_${tlType}`} badge={tlType} type="translation" />
              ))
            ) : (
              <StoryBadge badge="NONE" type="translation" />
            )}
          </ListLabel>
        </div>
      </div>

      <div className="flex h-full w-fit shrink-0 flex-row items-center justify-center gap-3 overflow-hidden transition-all duration-300 lg:w-fit lg:max-w-0 lg:group-hover:max-w-xl">
        <UpdateStoryStatusButton
          storyId={story.id}
          status={story.status === 'skip' ? 'unread' : 'skip'}
          isMobile={isMobile}
          updateReadingStatus={updateReadingStatus}
        />
        <UpdateStoryStatusButton
          storyId={story.id}
          status={story.status === 'finish' ? 'unread' : 'finish'}
          isMobile={isMobile}
          updateReadingStatus={updateReadingStatus}
        />
      </div>
    </div>
  );
}
