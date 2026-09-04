import { ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useRevalidator } from 'react-router';
import { parseFormData } from 'remix-hook-form';
import { safeParse } from 'valibot';

import { useIsMobile } from '@/hooks/use-mobile';
import { generateMeta } from '@/lib/generate-meta';
import { itemStorage } from '@/lib/storage';
import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import { toast } from '@/components/ui/toast';

import { DUMMY_STORY, LOCAL_STORAGE_KEY } from '@/constants';
import {
  type BandoriStory,
  type BandoriStoryForm,
  BandoriStoryFormSchema,
  type ReadingStatus,
  type UserSavedTrack,
} from '@/schemas/models';

import type { Route } from './+types';
import { StoryCard } from './components/story-card';
import { DetailStoryDialog } from './contents/dialog-detail';
import { StoryTrackerSidebar } from './contents/sidebar';
import { StoryCollapsible } from './contents/story-collapsible';

function validateUserTrack(data: null | string | UserSavedTrack[], isLite?: boolean) {
  let isInvalid = false;

  if (!data) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK, []);
    return [];
  }
  if (typeof data === 'string' || !Array.isArray(data)) {
    isInvalid = true;
  } else if (!isLite) {
    for (const item of data) {
      if (typeof item.id !== 'number' || (item.status !== 'finish' && item.status !== 'skip')) {
        isInvalid = true;
        break;
      }
    }
  }

  if (isInvalid) {
    toast.warning('There is an error while parsing your data. Resetting tracker.');

    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK, []);
    return [];
  }

  return data as UserSavedTrack[];
}

function validateUserTrackFilter(data: unknown) {
  if (!data) return null;

  const parsed = safeParse(BandoriStoryFormSchema, data);
  if (!parsed.success) {
    toast.warning('Filter data is corrupted. Resetting filters.');
    itemStorage.local.remove(LOCAL_STORAGE_KEY.STORY_TRACKER.FILTER);
    return null;
  }

  return parsed.output;
}

export function meta() {
  return generateMeta({ title: 'Story Tracker' });
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let data: BandoriStoryForm;

  if (request.headers.get('Content-Type')?.includes('application/json')) {
    data = (await request.json()) as BandoriStoryForm;
  } else {
    data = (await parseFormData(request)) as BandoriStoryForm;
  }

  itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.FILTER, data);

  return { success: true };
}

export function clientLoader() {
  const fetchedStories = DUMMY_STORY;

  const userTrack = itemStorage.local.get<UserSavedTrack[]>(
    LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK
  );
  const userTrackFilterRaw = itemStorage.local.get<unknown>(LOCAL_STORAGE_KEY.STORY_TRACKER.FILTER);
  let isListSplitted = itemStorage.local.get<boolean>(
    LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING_SPLIT_LIST
  );

  if (typeof isListSplitted !== 'boolean') isListSplitted = true;

  const cleanedUserTrack = validateUserTrack(userTrack);
  const userTrackFilter = validateUserTrackFilter(userTrackFilterRaw);

  return {
    fetchedStories,
    userTrack: cleanedUserTrack,
    userTrackFilter,
    isListSplitted,
  };
}

export default function StoryTrackerPage({ loaderData }: Route.ComponentProps) {
  const isMobile = useIsMobile();
  const { revalidate } = useRevalidator();
  const [isListSplitted, setIsListSplitted] = useState(loaderData.isListSplitted);
  const [selectedStory, setSelectedStory] = useState<
    (BandoriStory & { status?: ReadingStatus }) | null
  >(null);

  const stories: (BandoriStory & { status?: ReadingStatus })[] = useMemo(() => {
    return loaderData.fetchedStories.map((story) => {
      return {
        ...story,
        status: loaderData.userTrack.find((track) => track.id === story.id)?.status,
      };
    });
  }, [loaderData.fetchedStories, loaderData.userTrack]);

  function updateReadingStatus(id: number, status: ReadingStatus | 'unread') {
    const userDataIndex = loaderData.userTrack.findIndex((track) => track.id === id);

    if (userDataIndex < 0 && status !== 'unread') {
      itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK, [
        ...loaderData.userTrack,
        { id, status } satisfies UserSavedTrack,
      ]);
    } else if (userDataIndex >= 0) {
      if (status === 'unread')
        itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK, [
          ...loaderData.userTrack.filter((_, index) => index !== userDataIndex),
        ]);
      else
        itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK, [
          ...loaderData.userTrack.slice(0, userDataIndex),
          { id, status },
          ...loaderData.userTrack.slice(userDataIndex + 1),
        ]);
    }

    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.LAST_UPDATE, new Date(Date.now()));

    revalidate();
  }

  return (
    <div
      className={cn(
        'flex min-h-screen w-full flex-col gap-3 bg-linear-to-t from-rose-50 to-background',
        isMobile ? 'px-3 py-6' : 'px-3 py-6 lg:px-12 lg:py-16'
      )}
    >
      <DetailStoryDialog
        selectedStory={selectedStory}
        setSelectedStory={setSelectedStory}
        updateReadingStatus={updateReadingStatus}
      />
      <Text
        type="btn"
        weight="regular"
        className="flex w-full flex-row items-center gap-1 text-rose-500 italic"
      >
        For spreadsheet version,
        {
          <Link
            to="https://docs.google.com/spreadsheets/d/1g4MsZ_U7CbwCK7TcW_9_d-Q7CSGtK0R2M1B10XrZGns/edit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-1 text-blue-600 text-sm underline"
          >
            Click Here {<ExternalLink className="size-4 text-blue-600" />}
          </Link>
        }
      </Text>
      <StoryTrackerSidebar
        isMobile={isMobile}
        splitList={isListSplitted}
        setSplitList={setIsListSplitted}
        filterData={loaderData.userTrackFilter}
      />
      {isListSplitted ? (
        <>
          <StoryCollapsible
            sectionName="Unfinished"
            isMobile={isMobile}
            isUnread
            items={stories}
            setSelectedStory={setSelectedStory}
            updateReadingStatus={updateReadingStatus}
          />
          <StoryCollapsible
            sectionName="Finished"
            isMobile={isMobile}
            isUnread={false}
            items={stories}
            setSelectedStory={setSelectedStory}
            updateReadingStatus={updateReadingStatus}
          />
        </>
      ) : (
        stories.map((story) => (
          <StoryCard
            key={`story_${story.id}`}
            isMobile={isMobile}
            story={story}
            setSelectedStory={setSelectedStory}
            updateReadingStatus={updateReadingStatus}
          />
        ))
      )}
    </div>
  );
}
