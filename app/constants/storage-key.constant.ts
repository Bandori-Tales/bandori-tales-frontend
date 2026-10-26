export const DIALOG_KEY = {
  FOOTER: {
    CREDITS: 'footer-credits',
    POLICIES: 'footer-privacy-policies',
  },
  STORY_TRACKER: {
    STORY_DETAIL: 'story-detail',
    BULK_ACTION: 'story-bulk-action',
    CLEAR_FILTER: 'clear-tracker-filter',
  },
  STAMP_GENERATOR: {
    ADD_IMAGE: 'stamp-add-image',
    ADD_TEXT: 'stamp-add-text',
    EDIT_IMAGE: 'stamp-edit-image',
    EDIT_TEXT: 'stamp-edit-text',
    CLEAR_DATA: 'stamp-clear-data',
    HELPER_CROP: 'helper-crop',
  },
  YUNOGPT: {
    CLEAR_CHAT: 'clear-chat',
  },
  PROFILE: {
    SET_PICTURE: 'set-profile-picture',
    SET_USERNAME: 'set-username',
    EXPORT_DATA: 'export-data-drive',
    IMPORT_DATA: 'import-data-drive',
    HELPER_DRIVE: 'helper-drive',
  },
} as const;

export const LOCAL_STORAGE_KEY = {
  STORY_TRACKER: {
    USER_READING_TRACK: 'user-track',
    FILTER: 'user-track/filter',
    SETTING: 'user-track/setting',
    LAST_UPDATE: 'user-track/last-update',
  },
  STAMP_GENERATOR: {
    SETTINGS: 'stamp-generator-settings',
    DATA: 'stamp-generator-data',
  },
  YUNOGPT: {
    THEME: 'yuno-gpt-theme',
  },
  PROFILE: {
    GENERAL_SETTING: 'settings/general',
  },
} as const;

export const SESSION_STORAGE_KEY = {
  YUNOGPT: {
    CHAT_HISTORY: 'yuno-gpt-chats',
  },
} as const;

export const COOKIE_KEY = {
  PROFILE: {
    GOOGLE_ACCESS_TOKEN: 'google-access-token',
  },
};
