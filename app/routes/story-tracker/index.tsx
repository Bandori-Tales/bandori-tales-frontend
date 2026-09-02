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

import {
  type BandoriStory,
  type BandoriStoryForm,
  BandoriStoryFormSchema,
  type ReadingStatus,
  type UserSavedTrack,
} from '@/schemas/models';

import type { Route } from './+types';
import { StoryCard } from './components/story-card';
import { StoryTrackerSidebar } from './contents/sidebar';
import { StoryCollapsible } from './contents/story-collapsible';

const DUMMY_STORY: BandoriStory[] = [
  {
    id: 1,
    order: 1,
    name: 'Raise A Suilen band Story 1: RAISE A SUILEN ~Raise the Curtain~ Pt. 1',
    story_banner: '/images/dummy_banner.png',
    story_type: 'BAND_STORY',
    story_tag: 'EXPLORATION',
    event_id: 123,
    has_anime_eq: true,
    anime_banner: '/images/dummy_banner_anime.png',
    anime_name: 'Anime BanG Dream! Season 3',
    anime_url: 'https://bestdori.com',
    category: 'GARUPA',
    available_tl_type: ['OFFICIAL', 'FAN'],
    available_tl: [
      {
        source: 'YOUTUBE',
        type: 'OFFICIAL',
        url: 'https://youtube.com/playlist?list=PLDBZt_5XOInpjEuvLQDSj3hP-QQlnn1D7',
      },
      {
        source: 'BESTDORI',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
      {
        source: 'BLUESKY',
        type: 'FAN',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
    ],
    main_characters: [31, 32, 33, 34, 35],
    main_band: 7,
    side_characters: [1, 2, 3, 4, 5, 21, 22, 23, 24, 25],
    side_bands: [1, 5],
    synopsis:
      "The girls of Afterglow have finished their last day of school, but Himari's still got something on her mind...",
    notes: null,
  },
  {
    id: 2,
    order: 2,
    name: 'Raise A Suilen band Story 1: RAISE A SUILEN ~Raise the Curtain~ Pt. 2',
    story_banner: '/images/dummy_banner.png',
    story_type: 'BAND_STORY',
    story_tag: 'MAJOR',
    event_id: 124,
    has_anime_eq: true,
    anime_banner: '/images/dummy_banner_anime.png',
    anime_name: 'Anime BanG Dream! Season 3',
    anime_url: 'https://bestdori.com',
    category: 'GARUPA',
    available_tl_type: ['OFFICIAL', 'FAN'],
    available_tl: [
      {
        source: 'YOUTUBE',
        type: 'OFFICIAL',
        url: 'https://youtube.com/playlist?list=PLDBZt_5XOInpjEuvLQDSj3hP-QQlnn1D7',
      },
      {
        source: 'BESTDORI',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
      {
        source: 'FANDOM',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
      {
        source: 'BLUESKY',
        type: 'FAN',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
    ],
    main_characters: [31, 32, 33, 34, 35],
    main_band: 7,
    side_characters: [1, 2, 3, 4, 5, 21, 22, 23, 24, 25],
    side_bands: [1, 5],
    synopsis:
      "The girls of Afterglow have finished their last day of school, but Himari's still got something on her mind...",
    notes: null,
  },
  {
    id: 3,
    order: 3,
    name: 'Raise A Suilen band Story 1: RAISE A SUILEN ~Raise the Curtain~ Pt. 3',
    story_banner: '/images/dummy_banner.png',
    story_type: 'BAND_STORY',
    story_tag: 'COLLAB',
    event_id: 125,
    has_anime_eq: true,
    anime_banner: '/images/dummy_banner_anime.png',
    anime_name: 'Anime BanG Dream! Season 3',
    anime_url: 'https://bestdori.com',
    category: 'GARUPA',
    available_tl_type: ['OFFICIAL', 'FAN'],
    available_tl: [
      {
        source: 'YOUTUBE',
        type: 'OFFICIAL',
        url: 'https://youtube.com/playlist?list=PLDBZt_5XOInpjEuvLQDSj3hP-QQlnn1D7',
      },
      {
        source: 'BESTDORI',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
    ],
    main_characters: [31, 32, 33, 34, 35],
    main_band: 7,
    side_characters: [],
    side_bands: [],
    synopsis:
      "The girls of Afterglow have finished their last day of school, but Himari's still got something on her mind...",
    notes: null,
  },
];

function validateUserTrack(data: null | string | UserSavedTrack[], isLite?: boolean) {
  let isInvalid = false;

  if (!data) {
    itemStorage.local.set('user-track', []);
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

    itemStorage.local.set('user-track', []);
    return [];
  }

  return data as UserSavedTrack[];
}

function validateUserTrackFilter(data: unknown) {
  if (!data) return null;

  const parsed = safeParse(BandoriStoryFormSchema, data);
  if (!parsed.success) {
    toast.warning('Filter data is corrupted. Resetting filters.');
    itemStorage.local.remove('user-track/filter');
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

  itemStorage.local.set('user-track/filter', data);

  return { success: true };
}

export function clientLoader() {
  const fetchedStories = DUMMY_STORY;

  const userTrack = itemStorage.local.get<UserSavedTrack[]>('user-track');
  const userTrackFilterRaw = itemStorage.local.get<unknown>('user-track/filter');
  const isListSplitted = itemStorage.local.get<boolean>('user-track/split-list') === true;

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
      itemStorage.local.set('user-track', [
        ...loaderData.userTrack,
        { id, status } satisfies UserSavedTrack,
      ]);
    } else if (userDataIndex >= 0) {
      if (status === 'unread')
        itemStorage.local.set('user-track', [
          ...loaderData.userTrack.filter((_, index) => index !== userDataIndex),
        ]);
      else
        itemStorage.local.set('user-track', [
          ...loaderData.userTrack.slice(0, userDataIndex),
          { id, status },
          ...loaderData.userTrack.slice(userDataIndex + 1),
        ]);
    }

    itemStorage.local.set('user-track/last-update', new Date(Date.now()));

    revalidate();
  }

  return (
    <div
      className={cn(
        'flex min-h-screen w-full flex-col gap-3 bg-linear-to-t from-rose-50 to-background',
        isMobile ? 'px-3 py-6' : 'px-3 py-6 lg:px-12 lg:py-20'
      )}
    >
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
            updateReadingStatus={updateReadingStatus}
          />
          <StoryCollapsible
            sectionName="Finished"
            isMobile={isMobile}
            isUnread={false}
            items={stories}
            updateReadingStatus={updateReadingStatus}
          />
        </>
      ) : (
        stories.map((story) => (
          <StoryCard
            key={`story_${story.id}`}
            isMobile={isMobile}
            story={story}
            updateReadingStatus={updateReadingStatus}
          />
        ))
      )}
    </div>
  );
}
