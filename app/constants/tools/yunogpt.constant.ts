export const YUNOGPT_WRITE_ASSETS = {
  NICKNAME: 'Yuno GPT',
  FULLNAME: 'Yuno (Sengoku) GPT',
  CHAT_BIO: "Mugendai MewType's DJ & Manipulator. 100% Human",
  STATUS_ONLINE: 'Online',
  STATUS_TUTORIAL: 'Click here to open the profile',
  PROFILE_MEDIA: 'Media',
  PROFILE_SELECT_THEME: 'Select Theme',
  BUTTON_CLEAR_CHAT: 'Clear Chat',
  INPUT_PLACEHOLDER: 'Type a message',
  SOCIAL_TWEET_URL: 'https://x.com/yuno_yumemita',
  SOCIAL_YT_URL: 'https://www.youtube.com/@yuno_yumemita',
};

export const YUNOGPT_MEDIA_LIST = [
  '/images/tools/yunogpt/yuno1.webp',
  '/images/tools/yunogpt/yuno2.webp',
  '/images/tools/yunogpt/yuno3.webp',
  '/images/tools/yunogpt/yuno4.webp',
  '/images/tools/yunogpt/u_no.webp',
  '/images/tools/yunogpt/yuno5.webp',
  '/images/tools/yunogpt/yuno6.webp',
  '/images/tools/yunogpt/yuno_no.webp',
  '/images/tools/yunogpt/yuno_wha.webp',
];

export const YUNO_CHAT_THEMES_ARRAY = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'mist',
  'olive',
] as const;

export type YunoChatThemes = (typeof YUNO_CHAT_THEMES_ARRAY)[number];
