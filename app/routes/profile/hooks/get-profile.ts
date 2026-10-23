import { getUserProfileSettings } from '@/lib/profile';
import { itemStorage } from '@/lib/storage';
import { validateDataBySchema } from '@/lib/utils';

import { LOCAL_STORAGE_KEY, StoryTrackerSettingDefaultValue } from '@/constants';
import {
  type ProfileDriveData,
  type TrackerSetting,
  TrackerSettingSchema,
  type UserSavedTrack,
  UserTrackListSchema,
} from '@/schemas/models';

export function getUserLocalData() {
  const userLocalData: Omit<ProfileDriveData, 'global_last_update'> = {
    user_profile: getUserProfileSettings(),
    story_tracker: {
      track_list: validateDataBySchema(
        itemStorage.local.get<UserSavedTrack[]>(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK),
        UserTrackListSchema,
        { useDefaultValue: true, defaultValue: [] }
      ) as UserSavedTrack[],
      settings: validateDataBySchema(
        itemStorage.local.get<TrackerSetting>(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING),
        TrackerSettingSchema,
        { useDefaultValue: true, defaultValue: StoryTrackerSettingDefaultValue }
      ) as TrackerSetting,
      last_update: itemStorage.local.get<string>(LOCAL_STORAGE_KEY.STORY_TRACKER.LAST_UPDATE) || '',
    },
  };

  return userLocalData;
}
