import { getUserProfileSettings } from '@/lib/profile';
import { itemStorage } from '@/lib/storage';
import { handleCharacterPick, validateDataBySchema } from '@/lib/utils';

import {
  LOCAL_STORAGE_KEY,
  SESSION_STORAGE_KEY,
  YUNO_CHAT_THEMES_ARRAY,
  type YunoChatThemes,
  YunoThemeMap,
} from '@/constants';
import { ChatBlockArraySchema, type IChatBlock } from '@/schemas/models';

export function getUserChats() {
  const userChats = validateDataBySchema(
    itemStorage.session.get<IChatBlock[] | string>(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY),
    ChatBlockArraySchema,
    {
      showErrorToast: true,
      errorText: 'An error was found in your recent chat. Resetting the room...',
    }
  );

  if (!userChats) {
    itemStorage.session.set(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY, []);
    return [];
  }

  return userChats;
}

export function getUserTheme() {
  let userChatTheme = itemStorage.local.get<YunoChatThemes | string>(
    LOCAL_STORAGE_KEY.YUNOGPT.THEME
  );

  if (
    !userChatTheme ||
    userChatTheme === '' ||
    !(YUNO_CHAT_THEMES_ARRAY as readonly string[]).includes(userChatTheme)
  ) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.YUNOGPT.THEME, 'rose');
    userChatTheme = 'rose';
  }

  return {
    theme: userChatTheme,
    ...YunoThemeMap[userChatTheme as YunoChatThemes],
  };
}

export function getUserShowPhoto() {
  const showPhoto = itemStorage.local.get<boolean>(LOCAL_STORAGE_KEY.YUNOGPT.SHOW_PHOTO);

  const userProfile = getUserProfileSettings();
  const profileImageSource =
    !userProfile.profile_picture_character_id || userProfile.profile_picture_character_id === 0
      ? ''
      : handleCharacterPick(
          'profile_picture_url',
          userProfile.profile_picture_character_id,
          userProfile.profile_picture_array_index
        );
  const profileImageType =
    !userProfile.profile_picture_character_id || userProfile.profile_picture_character_id === 0
      ? 'icon'
      : 'image';

  if (typeof showPhoto !== 'boolean') {
    itemStorage.local.set(LOCAL_STORAGE_KEY.YUNOGPT.SHOW_PHOTO, String(false));
  }

  return {
    showPhoto: showPhoto === true,
    photoSource: profileImageSource,
    photoType: profileImageType as 'icon' | 'image',
  };
}
