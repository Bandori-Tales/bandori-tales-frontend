import { itemStorage } from '@/lib/storage';

import { toast } from '@/components/ui/toast';

import { Characters, DIALOG_KEY, LOCAL_STORAGE_KEY } from '@/constants';
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
  (currentSetting: ProfileSetting, revalidate: () => Promise<void>) =>
  (character_id: number, array_index: number) => {
    const newSetting: ProfileSetting = {
      ...currentSetting,
      profile_picture_character_id: character_id,
      profile_picture_array_index: array_index,
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

export function getAllCharacterProfilePictures() {
  interface CharacterProfile {
    character_id: number;
    character_array_index: number;
    character_name: string;
    profile_picture_src: string;
  }

  const ProfilePictureList: CharacterProfile[] = [];

  for (const character of Characters) {
    if (Array.isArray(character.profile_picture)) {
      for (let i = 0; i < character.profile_picture.length; i++) {
        ProfilePictureList.push({
          character_id: character.id,
          character_array_index: i,
          character_name: `${character.nickname}_${i}`,
          profile_picture_src: character.profile_picture[i],
        });
      }
    } else {
      ProfilePictureList.push({
        character_id: character.id,
        character_array_index: 0,
        character_name: `${character.nickname}_${0}`,
        profile_picture_src: character.profile_picture,
      });
    }
  }

  return ProfilePictureList;
}
