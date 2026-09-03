import { ArrowLeftRight, ExternalLink, Loader2, X } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Link } from 'react-router';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Bands, Characters, StoryTrackerTagDescription } from '@/constants';
import {
  type AvailableTranslation,
  type BandoriStory,
  type ITranslationSource,
  type ReadingStatus,
  storyTagMap,
  storyTypeMap,
  translationSourceMap,
} from '@/schemas/models';

import { StoryBadgeColorMaps } from '../components/badges';
import { UpdateStoryStatusButton } from '../components/story-card';

interface DetailStoryDialogProps {
  selectedStory: (BandoriStory & { status?: ReadingStatus }) | null;
  setSelectedStory: (story: (BandoriStory & { status?: ReadingStatus }) | null) => void;
  updateReadingStatus: (id: number, status: ReadingStatus | 'unread') => void;
}

const translationButtonMap: Record<
  ITranslationSource,
  {
    logo: string;
    background: string;
  }
> = {
  YOUTUBE: {
    logo: '/images/translation/youtube.webp',
    background: 'bg-red-500 hover:bg-red-500/85',
  },
  BLUESKY: {
    logo: '/images/translation/bluesky.webp',
    background: 'bg-sky-500 hover:bg-sky-500/85',
  },
  BESTDORI: {
    logo: '/images/tools/other/bestdori.webp',
    background: 'bg-blue-500 hover:bg-blue-500/85',
  },
  FANDOM: {
    logo: '/images/tools/other/bandoriwiki.webp',
    background: 'bg-fuchsia-500 hover:bg-fuchsia-500/85',
  },
};

function DetailSection({
  title,
  withBackground = true,
  children,
}: {
  title: string;
  withBackground?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex h-fit w-full flex-col gap-1 py-2">
      <Text type="p" weight="bold" lineHeight={6} className="text-left text-primary">
        {title}
      </Text>
      <div
        className={cn(
          'flex min-h-10 w-full flex-row flex-wrap gap-2 rounded-md',
          withBackground ? 'bg-slate-100 p-2 shadow-black/50 shadow-inner' : 'bg-transparent'
        )}
      >
        {children}
      </div>
    </div>
  );
}

function TranslationButton({ name, source, type, url }: AvailableTranslation) {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'min-h-10 rounded-md drop-shadow-black/30 drop-shadow-md transition-all duration-300',
        translationButtonMap[source].background
      )}
    >
      <Link
        to={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-fit w-full flex-row items-center justify-center gap-2"
      >
        <Image
          alt={`${source} Logo`}
          src={translationButtonMap[source].logo}
          className="size-6 rounded-full"
        />
        <Text type="btn" weight="semibold" lineHeight={5} className="text-white">
          {type === 'FAN' ? name : translationSourceMap[source]}
        </Text>
        <ExternalLink className="size-5 stroke-3 text-white" />
      </Link>
    </Button>
  );
}

export function DetailStoryDialog({
  selectedStory,
  setSelectedStory,
  updateReadingStatus,
}: DetailStoryDialogProps) {
  const { isOpen, close: closeDialog } = useDialogStore();
  const [isAnime, setIsAnime] = useState(false);
  const isAnimeOnly = selectedStory?.category === 'ANIME';

  const storyBand = Bands.find((band) => band.id === selectedStory?.main_band) || null;
  const officialTl = selectedStory?.available_tl
    ?.filter((translation) => translation.type === 'OFFICIAL')
    .sort((a, b) => (b.source > a.source ? -1 : 1));
  const fanTl = selectedStory?.available_tl
    ?.filter((translation) => translation.type === 'FAN')
    .sort((a, b) => (b.source > a.source ? -1 : 1));

  let detailText: string | null = null;
  if (selectedStory && selectedStory.story_type !== 'ANIME') {
    let storyNumber: number | null = null;

    switch (selectedStory.story_type) {
      case 'BAND_STORY': {
        const match = selectedStory.name.match(/Band\s+Story\s+(\d+)/i);
        if (match) storyNumber = Number.parseInt(match[1], 10);
        break;
      }
      case 'MAIN_STORY': {
        const match = selectedStory.name.match(/Main\s+Story\s+(\d+)/i);
        if (match) storyNumber = Number.parseInt(match[1], 10);
        break;
      }
    }

    detailText = `${selectedStory.story_type !== 'MAIN_STORY' ? `${storyBand?.name} ` : ''}${storyTypeMap[selectedStory.story_type]}${storyNumber !== null ? ` ${storyNumber}` : ''}`;
  }

  function handleUpdateReadingStatus(id: number, status: ReadingStatus | 'unread') {
    updateReadingStatus(id, status);
    closeDialog('story_detail');
    setIsAnime(false);
    setSelectedStory(null);
  }

  function handleCloseDialog(open: boolean) {
    if (!open) {
      closeDialog('story_detail');
      setIsAnime(false);
      setSelectedStory(null);
    }
  }

  return (
    <Dialog open={isOpen.story_detail} onOpenChange={(open) => handleCloseDialog(open)}>
      {selectedStory ? (
        <DialogContent
          className="h-160 max-w-sm bg-white sm:h-200 sm:max-w-xl lg:h-150 lg:max-w-4xl"
          showCloseButton={false}
        >
          <DialogClose className="absolute top-4 right-4 rounded-full border-none p-1 shadow-none">
            <X size={18} />
          </DialogClose>

          <DialogHeader className="flex h-fit w-full items-center justify-start">
            <DialogTitle className="font-semibold text-lg">Story Detail</DialogTitle>
          </DialogHeader>

          <div className="relative flex w-full flex-col items-center justify-start gap-2 border-b border-b-primary pb-2 sm:flex-row sm:justify-center">
            <div
              className={cn(
                'flex h-fit w-48 items-center justify-center',
                isAnimeOnly || isAnime ? 'sm:w-50' : 'sm:w-75'
              )}
            >
              {selectedStory.category !== 'ANIME' && selectedStory.has_anime_eq && (
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsAnime(!isAnime)}
                  className="absolute left-0 sm:static sm:left-auto"
                >
                  <ArrowLeftRight
                    className={cn(
                      'stroke-2 text-primary transition-all duration-300',
                      isAnime ? 'scale-x-100' : 'scale-x-[-1]'
                    )}
                  />
                </Button>
              )}
              <Image
                alt={`${selectedStory.name} banner`}
                src={
                  (isAnime ? selectedStory.anime_banner : selectedStory.story_banner) ||
                  '/images/dummy.png'
                }
                className="w-full"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <Text
                type="st2"
                weight="semibold"
                className={cn('text-center text-primary sm:text-left', isAnime && 'hidden')}
              >
                {selectedStory.name}
              </Text>
              {selectedStory.has_anime_eq && (
                <Link to={selectedStory.anime_url || '#'} target="_blank" rel="noopener noreferrer">
                  <Text
                    type="p"
                    weight="medium"
                    className="text-center text-primary/80 underline hover:underline sm:text-left lg:no-underline"
                  >
                    {selectedStory.anime_name}
                  </Text>
                </Link>
              )}
              {selectedStory.category !== 'ANIME' && (
                <div className="flex flex-row items-center justify-center gap-1 sm:justify-start">
                  {selectedStory.story_type !== 'MAIN_STORY' && (
                    <Image
                      alt="Band Icon"
                      src={storyBand?.icon || ''}
                      className="aspect-square size-5"
                    />
                  )}
                  <Text
                    type="btn"
                    lineHeight={6}
                    weight="semibold"
                    style={{ color: `${storyBand?.colorDark || 'black'}` }}
                  >
                    {detailText}
                  </Text>
                </div>
              )}
            </div>
          </div>

          <div className="h-full w-full overflow-y-scroll px-3">
            <DetailSection title="Synopsis">
              <Text type="btn" lineHeight={5} weight="medium" className="text-slate-700">
                {selectedStory.synopsis}
              </Text>
            </DetailSection>

            <DetailSection title="Story Tag">
              <div className="flex w-full flex-col gap-2">
                <Badge
                  {...StoryBadgeColorMaps[selectedStory.story_tag]}
                  title={storyTagMap[selectedStory.story_tag]}
                />
                <Text type="btn" weight="medium" lineHeight={5}>
                  {StoryTrackerTagDescription[selectedStory.story_tag]}
                </Text>
              </div>
            </DetailSection>

            <DetailSection title="Main Characters">
              {selectedStory.main_characters.map((character) => {
                const characterDetail = Characters.find((item) => item.id === character);
                if (!characterDetail) return;

                const nickname = Array.isArray(characterDetail.nickname)
                  ? characterDetail.nickname[0]
                  : characterDetail.nickname;
                const profilePicture = Array.isArray(characterDetail.profile_picture)
                  ? characterDetail.profile_picture[0]
                  : characterDetail.profile_picture;

                return (
                  <Image
                    key={`main_character_${characterDetail.id}`}
                    alt={`${nickname} profile picture`}
                    src={profilePicture}
                    className="aspect-square w-12 rounded-full"
                  />
                );
              })}
            </DetailSection>

            <DetailSection title="Side Bands">
              {selectedStory.side_bands?.map((character) => {
                const bandDetail = Bands.find((item) => item.id === character);
                if (!bandDetail) return;

                const nickname = bandDetail.name;
                const profilePicture = bandDetail.icon;

                return (
                  <Image
                    key={`side_band_${bandDetail.id}`}
                    alt={`${nickname} icon`}
                    src={profilePicture}
                    className="aspect-square size-10 rounded-full"
                  />
                );
              })}
            </DetailSection>

            <DetailSection title="Side Characters">
              {selectedStory.side_characters?.map((character) => {
                const characterDetail = Characters.find((item) => item.id === character);
                if (!characterDetail) return;

                const nickname = Array.isArray(characterDetail.nickname)
                  ? characterDetail.nickname[0]
                  : characterDetail.nickname;
                const profilePicture = Array.isArray(characterDetail.profile_picture)
                  ? characterDetail.profile_picture[0]
                  : characterDetail.profile_picture;

                return (
                  <Image
                    key={`side_character_${characterDetail.id}`}
                    alt={`${nickname} profile picture`}
                    src={profilePicture}
                    className="aspect-square size-12 rounded-full"
                  />
                );
              })}
            </DetailSection>

            <DetailSection title="Official Translation" withBackground={false}>
              {officialTl && officialTl.length > 0 ? (
                <div className="grid h-fit w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {officialTl.map((translation) => (
                    <div
                      key={`official_${translation.name}`}
                      className="flex h-fit w-full items-center justify-center"
                    >
                      <TranslationButton {...translation} />
                    </div>
                  ))}
                </div>
              ) : (
                <Text type="btn" weight="semibold" lineHeight={6}>
                  Not Available
                </Text>
              )}
            </DetailSection>

            <DetailSection title="Fan Translation" withBackground={false}>
              {fanTl && fanTl.length > 0 ? (
                <div className="grid h-fit w-full grid-cols-3 gap-3">
                  {fanTl.map((translation) => (
                    <div
                      key={`fan_${translation.name}`}
                      className="col-span-3 flex h-fit w-full items-center justify-center"
                    >
                      <TranslationButton {...translation} />
                    </div>
                  ))}
                </div>
              ) : (
                <Text type="btn" weight="semibold" lineHeight={6}>
                  Not Available
                </Text>
              )}
            </DetailSection>
          </div>

          <DialogFooter className="flex h-full w-full flex-row items-end justify-center">
            <div className="flex h-fit w-full flex-row items-center justify-center gap-2 border-t border-t-primary pt-2">
              <UpdateStoryStatusButton
                storyId={selectedStory.id}
                status={selectedStory.status === 'skip' ? 'unread' : 'skip'}
                isMobile
                updateReadingStatus={handleUpdateReadingStatus}
              />
              <UpdateStoryStatusButton
                storyId={selectedStory.id}
                status={selectedStory.status === 'finish' ? 'unread' : 'finish'}
                isMobile
                updateReadingStatus={handleUpdateReadingStatus}
              />
            </div>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent
          className="h-125 w-full max-w-sm bg-white sm:max-w-xl lg:max-w-2xl"
          showCloseButton={false}
        >
          <div className="flex h-full w-full items-center justify-center">
            <Text type="btn" weight="semibold" className="text-primary">
              Loading Data.. <Loader2 className="animate-spin text-primary" />{' '}
            </Text>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
