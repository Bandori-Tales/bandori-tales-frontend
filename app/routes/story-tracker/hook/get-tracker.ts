import { safeParse } from 'valibot';

import { itemStorage } from '@/lib/storage';

import { toast } from '@/components/ui/toast';

import { LOCAL_STORAGE_KEY, StoryTrackerSettingDefaultValue } from '@/constants';
import {
  type BandoriStoryForm,
  BandoriStoryFormSchema,
  type TrackerSetting,
  TrackerSettingSchema,
  type UserSavedTrack,
  UserTrackListSchema,
} from '@/schemas/models';

export function getTrackerSetting() {
  const trackerSettings = itemStorage.local.get<TrackerSetting>(
    LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING
  );

  const parsed = safeParse(TrackerSettingSchema, trackerSettings);
  if (!parsed.success) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING, StoryTrackerSettingDefaultValue);

    return StoryTrackerSettingDefaultValue;
  }

  return parsed.output;
}

export function getTrackerReadingList() {
  const userTrack = itemStorage.local.get<UserSavedTrack[]>(
    LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK
  );

  const parsed = safeParse(UserTrackListSchema, userTrack);
  if (!parsed.success) {
    if (userTrack) toast.warning('There is an error while parsing your data. Resetting tracker.');

    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK, []);
    return [];
  }

  return parsed.output;
}

export function getTrackerFilter() {
  const userTrackFilterRaw = itemStorage.local.get<BandoriStoryForm>(
    LOCAL_STORAGE_KEY.STORY_TRACKER.FILTER
  );

  const parsed = safeParse(BandoriStoryFormSchema, userTrackFilterRaw);
  if (!parsed.success) {
    itemStorage.local.remove(LOCAL_STORAGE_KEY.STORY_TRACKER.FILTER);
    return null;
  }

  return parsed.output;
}
