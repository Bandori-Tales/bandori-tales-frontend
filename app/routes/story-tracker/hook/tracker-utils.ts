import type { Dispatch, SetStateAction } from 'react';

import { itemStorage } from '@/lib/storage';

import { LOCAL_STORAGE_KEY } from '@/constants';
import type {
  BandoriStoryForm,
  IReadingStatus,
  TrackerSetting,
  UserSavedTrack,
} from '@/schemas/models';

export function buildStoryQuery(data?: BandoriStoryForm | null) {
  if (!data) return undefined;

  const params = new URLSearchParams();

  const appendArray = (key: string, arr?: (number | string)[]) => {
    if (arr) params.append(key, `[${arr.join(',')}]`);
  };

  if (data.search) {
    params.append('search', data.search);
  }

  if (data.enable_category) {
    const categoryArray: string[] = [];
    if (data.category_anime) categoryArray.push('ANIME');
    if (data.category_garupa) categoryArray.push('GARUPA');
    if (data.category_ournote) categoryArray.push('OURNOTE');
    appendArray('category', categoryArray);
  }

  if (data.enable_type) {
    const typeArray: string[] = [];
    if (data.type_anime) typeArray.push('ANIME');
    if (data.type_main) typeArray.push('MAIN_STORY');
    if (data.type_band) typeArray.push('BAND_STORY');
    if (data.type_event) typeArray.push('EVENT_STORY');
    appendArray('type', typeArray);
  }

  if (data.enable_translation) {
    appendArray('translation', data.translation);
    if (data.translation_operation) {
      params.append('translation_operation', data.translation_operation);
    }
  }

  if (data.enable_tag) {
    appendArray('tag', data.tag);
  }

  if (data.enable_main_band) {
    appendArray('main_band', data.main_band);
  }

  if (data.enable_side_band) {
    appendArray('side_band', data.side_band);
    if (data.side_band_operation) {
      params.append('side_band_operation', data.side_band_operation);
    }
  }

  if (data.enable_main_character) {
    appendArray('main_character', data.main_character);
    if (data.main_character_operation) {
      params.append('main_character_operation', data.main_character_operation);
    }
  }

  if (data.enable_side_character) {
    appendArray('side_character', data.side_character);
    if (data.side_character_operation) {
      params.append('side_character_operation', data.side_character_operation);
    }
  }

  if (data.order_by) {
    params.append('order_by', data.order_by);
  }
  if (data.order_type) {
    params.append('order_type', String(data.order_type));
  }

  return params;
}

export const handleSettingUpdate =
  (settings: TrackerSetting, setSettings: Dispatch<SetStateAction<TrackerSetting>>) =>
  (data: boolean, type: 'split-list' | 'show-unread' | 'show-skipped' | 'show-finished') => {
    switch (type) {
      case 'split-list': {
        itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING, {
          ...settings,
          isListSplitted: data,
        });
        setSettings((prev) => ({ ...prev, isListSplitted: data }));
        break;
      }
      case 'show-unread': {
        itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING, {
          ...settings,
          showUnread: data,
        });
        setSettings((prev) => ({ ...prev, showUnread: data }));
        break;
      }
      case 'show-skipped': {
        itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING, {
          ...settings,
          showSkipped: data,
        });
        setSettings((prev) => ({ ...prev, showSkipped: data }));
        break;
      }
      case 'show-finished': {
        itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.SETTING, {
          ...settings,
          showFinished: data,
        });
        setSettings((prev) => ({ ...prev, showFinished: data }));
        break;
      }
    }
    return;
  };

export const handleUpdateReadingStatus =
  (userTrack: UserSavedTrack[], setUserTrack: Dispatch<SetStateAction<UserSavedTrack[]>>) =>
  (id: number, status: IReadingStatus | 'unread') => {
    const userDataIndex = userTrack.findIndex((track) => track.id === id);

    let updatedTrack: UserSavedTrack[] = [];

    if (userDataIndex < 0 && status !== 'unread') {
      updatedTrack = [...userTrack, { id, status } satisfies UserSavedTrack];
      setUserTrack((prev) => [...prev, { id, status } satisfies UserSavedTrack]);
    } else if (userDataIndex >= 0) {
      if (status === 'unread') {
        updatedTrack = [...userTrack.filter((_, index) => index !== userDataIndex)];
        setUserTrack((prev) => [...prev.filter((_, index) => index !== userDataIndex)]);
      } else {
        updatedTrack = [
          ...userTrack.slice(0, userDataIndex),
          { id, status },
          ...userTrack.slice(userDataIndex + 1),
        ];
        setUserTrack((prev) => [
          ...prev.slice(0, userDataIndex),
          { id, status },
          ...prev.slice(userDataIndex + 1),
        ]);
      }
    }

    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.USER_READING_TRACK, updatedTrack);
    itemStorage.local.set(LOCAL_STORAGE_KEY.STORY_TRACKER.LAST_UPDATE, new Date(Date.now()));
  };
