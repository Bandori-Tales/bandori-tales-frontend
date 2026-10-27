import { LOCAL_STORAGE_KEY } from '@/constants';
import { type ProfileSetting, ProfileSettingSchema } from '@/schemas/models';

import { itemStorage } from './storage';
import { validateDataBySchema } from './utils';

const defaultValue: ProfileSetting = {
  profile_picture_character_id: 0,
  profile_picture_array_index: 0,
  site_theme: 'SYSTEM',
  username: 'Dreamers',
  quick_access_list: ['story-tracker', 'stamp-generator', 'yunogpt'],
  website_transition_duration: 'NORMAL',
};

export function getUserProfileSettings() {
  const profileSetting = validateDataBySchema(
    itemStorage.local.get<ProfileSetting>(LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING),
    ProfileSettingSchema,
    {
      defaultValue: defaultValue,
    }
  );

  return profileSetting;
}
