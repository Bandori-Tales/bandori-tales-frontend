import { itemStorage } from '@/lib/storage';

import { toast } from '@/components/ui/toast';

import { DIALOG_KEY, LOCAL_STORAGE_KEY } from '@/constants';
import type { IProfileTheme, ITransitionSpeed, ProfileSetting } from '@/schemas/models';

export const updateUserUsername =
  (
    currentSetting: ProfileSetting,
    revalidate: () => Promise<void>,
    closeDialog: (key: string) => void
  ) =>
  (new_name: string, isDefault: boolean) => {
    if (new_name.length < 2) {
      toast.error('Username must be more than 1 character!');
      return;
    }
    if (new_name.length > 20) {
      toast.error('Username must be less than 21 characters!');
      return;
    }

    const newSetting: ProfileSetting = {
      ...currentSetting,
      username: new_name,
    };

    itemStorage.local.set(LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING, newSetting);
    if (!isDefault) {
      toast.success('Username updated');
    }

    closeDialog(DIALOG_KEY.PROFILE.SET_USERNAME);
    revalidate();
  };

export const updateUserProfilePicture =
  (currentSetting: ProfileSetting, revalidate: () => Promise<void>) => (character_id: number) => {
    const newSetting: ProfileSetting = {
      ...currentSetting,
      profile_picture_character_id: character_id,
    };

    itemStorage.local.set(LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING, newSetting);
    toast.success('Profile picture updated');

    revalidate();
  };

export const updateUserPreference =
  (currentSetting: ProfileSetting, revalidate: () => Promise<void>) =>
  ({
    type,
    value,
  }:
    | {
        type: 'theme';
        value: IProfileTheme;
      }
    | {
        type: 'transition-speed';
        value: ITransitionSpeed;
      }
    | {
        type: 'quick-access';
        value: string[];
      }) => {
    let newSetting: ProfileSetting;

    switch (type) {
      case 'theme': {
        newSetting = {
          ...currentSetting,
          site_theme: value,
        };
        break;
      }
      case 'transition-speed': {
        newSetting = {
          ...currentSetting,
          website_transition_duration: value,
        };
        break;
      }
      case 'quick-access': {
        newSetting = {
          ...currentSetting,
          quick_access_list: value,
        };
        break;
      }
    }

    itemStorage.local.set(LOCAL_STORAGE_KEY.PROFILE.GENERAL_SETTING, newSetting);
    revalidate();
  };
