import { ExternalLink } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Link, useRevalidator } from 'react-router';
import { parseFormData } from 'remix-hook-form';

import { useIsMobile } from '@/hooks/use-mobile';
import { api } from '@/lib/axios';
import { generateMeta } from '@/lib/generate-meta';
import { itemStorage } from '@/lib/storage';
import { cn, handleApiResponseError } from '@/lib/utils';

import { Text } from '@/components/helper/text';

import { LOCAL_STORAGE_KEY } from '@/constants';
import type { BandoriStory, BandoriStoryForm, IReadingStatus } from '@/schemas/models';

import type { Route } from './+types';
import { ScrollNavigation } from './components/move-button';
import { StoryCard } from './components/story-card';
import { BulkActionDialog } from './contents/dialog-bulk-action';
import { DetailStoryDialog } from './contents/dialog-detail';
import { StoryTrackerSidebar } from './contents/sidebar';
import { StoryCollapsible } from './contents/story-collapsible';
import { getTrackerFilter, getTrackerReadingList, getTrackerSetting } from './hook/get-tracker';
import {
  buildStoryQuery,
  handleBulkUpdateReadingStatus,
  handleSettingUpdate,
  handleUpdateReadingStatus,
} from './hook/tracker-utils';

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

export async function clientLoader() {
  const userTrack = getTrackerReadingList();
  const userTrackFilter = getTrackerFilter();
  const userTrackSetting = getTrackerSetting();

  let fetchedStories: BandoriStory[] = [];

  try {
    const response = await api.get<BandoriStory[]>('/story-tracker', {
      params: buildStoryQuery(userTrackFilter),
    });

    fetchedStories = response.data;
  } catch (error) {
    handleApiResponseError(error, { withToast: true });
    fetchedStories = [];
  }

  return {
    fetchedStories,
    userTrack,
    userTrackFilter,
    userTrackSetting,
  };
}

export default function StoryTrackerPage({ loaderData }: Route.ComponentProps) {
  const isMobile = useIsMobile();
  const { revalidate } = useRevalidator();

  const [settings, setSettings] = useState(loaderData.userTrackSetting);
  const [userTrack, setUserTrack] = useState(loaderData.userTrack);
  const [dialogIsAnime, setDialogIsAnime] = useState(false);
  const [dialogIsAnimeOnly, setDialogIsAnimeOnly] = useState(false);

  const [selectedStory, setSelectedStory] = useState<
    (BandoriStory & { status?: IReadingStatus }) | null
  >(null);

  const stories: (BandoriStory & { status?: IReadingStatus })[] = useMemo(() => {
    return loaderData.fetchedStories
      .map((story) => {
        return {
          ...story,
          status: userTrack.find((track) => track.id === story.id)?.status,
        };
      })
      .filter((story) => {
        if (!settings.showUnread && story.status !== 'skip' && story.status !== 'finish')
          return false;
        if (!settings.showSkipped && story.status === 'skip') return false;
        if (!settings.showFinished && story.status === 'finish') return false;
        return true;
      });
  }, [
    loaderData.fetchedStories,
    userTrack,
    settings.showUnread,
    settings.showSkipped,
    settings.showFinished,
  ]);

  const edgeRef = useRef<HTMLDivElement>(null);
  const unreadRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef<HTMLDivElement>(null);

  const settingsUpdate = handleSettingUpdate(settings, setSettings);
  const updateReadingStatus = handleUpdateReadingStatus(userTrack, setUserTrack);
  const updateBlukReadingStatus = handleBulkUpdateReadingStatus(stories, userTrack, revalidate);

  return (
    <div
      className={cn(
        'flex min-h-screen w-full flex-col gap-3 bg-linear-to-t from-rose-50 to-background',
        isMobile ? 'px-3 py-6' : 'px-3 py-6 lg:px-12 lg:py-16'
      )}
      ref={edgeRef}
    >
      <BulkActionDialog stories={stories} bulkUpdateStatus={updateBlukReadingStatus} />
      <DetailStoryDialog
        isAnime={dialogIsAnime}
        isAnimeOnly={dialogIsAnimeOnly}
        setIsAnime={setDialogIsAnime}
        selectedStory={selectedStory}
        setSelectedStory={setSelectedStory}
        updateReadingStatus={updateReadingStatus}
      />
      <ScrollNavigation edgeRef={edgeRef} unreadRef={unreadRef} finishedRef={finishedRef} />
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
      <StoryTrackerSidebar settings={settings} handleSettingsUpdate={settingsUpdate} />
      {settings.isListSplitted ? (
        <>
          <StoryCollapsible
            ref={unreadRef}
            sectionName="Unfinished"
            isMobile={isMobile}
            isUnread
            items={stories}
            setDialogIsAnime={setDialogIsAnime}
            setDialogIsAnimeOnly={setDialogIsAnimeOnly}
            setSelectedStory={setSelectedStory}
            updateReadingStatus={updateReadingStatus}
          />
          <StoryCollapsible
            ref={finishedRef}
            sectionName="Finished"
            isMobile={isMobile}
            isUnread={false}
            items={stories}
            setDialogIsAnime={setDialogIsAnime}
            setDialogIsAnimeOnly={setDialogIsAnimeOnly}
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
            setDialogIsAnime={setDialogIsAnime}
            setDialogIsAnimeOnly={setDialogIsAnimeOnly}
            setSelectedStory={setSelectedStory}
            updateReadingStatus={updateReadingStatus}
          />
        ))
      )}
    </div>
  );
}
