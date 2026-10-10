import type { YunoThemeClasses } from '@/schemas/models';

export const YUNOGPT_WRITE_ASSETS = {
  NICKNAME: 'Yuno GPT',
  FULLNAME: 'Yuno (Sengoku) GPT',
  CHAT_BIO: "Mugendai MewType's DJ & Manipulator. 100% Human. Open for music commission.",
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
  '/images/tools/yunogpt/yuno7.webp',
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

export const YunoThemeMap: Record<YunoChatThemes, YunoThemeClasses> = {
  red: {
    background_primary: 'bg-red-600',
    background_lighter: 'bg-red-500',
    outline: 'outline-red-800',
    focus_visible: 'focus-visible:border-red-500',
  },
  orange: {
    background_primary: 'bg-orange-600',
    background_lighter: 'bg-orange-500',
    outline: 'outline-orange-800',
    focus_visible: 'focus-visible:border-orange-500',
  },
  amber: {
    background_primary: 'bg-amber-600',
    background_lighter: 'bg-amber-500',
    outline: 'outline-amber-800',
    focus_visible: 'focus-visible:border-amber-500',
  },
  yellow: {
    background_primary: 'bg-yellow-600',
    background_lighter: 'bg-yellow-500',
    outline: 'outline-yellow-800',
    focus_visible: 'focus-visible:border-yellow-500',
  },
  lime: {
    background_primary: 'bg-lime-600',
    background_lighter: 'bg-lime-500',
    outline: 'outline-lime-800',
    focus_visible: 'focus-visible:border-lime-500',
  },
  green: {
    background_primary: 'bg-green-600',
    background_lighter: 'bg-green-500',
    outline: 'outline-green-800',
    focus_visible: 'focus-visible:border-green-500',
  },
  emerald: {
    background_primary: 'bg-emerald-600',
    background_lighter: 'bg-emerald-500',
    outline: 'outline-emerald-800',
    focus_visible: 'focus-visible:border-emerald-500',
  },
  teal: {
    background_primary: 'bg-teal-600',
    background_lighter: 'bg-teal-500',
    outline: 'outline-teal-800',
    focus_visible: 'focus-visible:border-teal-500',
  },
  cyan: {
    background_primary: 'bg-cyan-600',
    background_lighter: 'bg-cyan-500',
    outline: 'outline-cyan-800',
    focus_visible: 'focus-visible:border-cyan-500',
  },
  sky: {
    background_primary: 'bg-sky-600',
    background_lighter: 'bg-sky-500',
    outline: 'outline-sky-800',
    focus_visible: 'focus-visible:border-sky-500',
  },
  blue: {
    background_primary: 'bg-blue-600',
    background_lighter: 'bg-blue-500',
    outline: 'outline-blue-800',
    focus_visible: 'focus-visible:border-blue-500',
  },
  indigo: {
    background_primary: 'bg-indigo-600',
    background_lighter: 'bg-indigo-500',
    outline: 'outline-indigo-800',
    focus_visible: 'focus-visible:border-indigo-500',
  },
  violet: {
    background_primary: 'bg-violet-600',
    background_lighter: 'bg-violet-500',
    outline: 'outline-violet-800',
    focus_visible: 'focus-visible:border-violet-500',
  },
  purple: {
    background_primary: 'bg-purple-600',
    background_lighter: 'bg-purple-500',
    outline: 'outline-purple-800',
    focus_visible: 'focus-visible:border-purple-500',
  },
  fuchsia: {
    background_primary: 'bg-fuchsia-600',
    background_lighter: 'bg-fuchsia-500',
    outline: 'outline-fuchsia-800',
    focus_visible: 'focus-visible:border-fuchsia-500',
  },
  pink: {
    background_primary: 'bg-pink-600',
    background_lighter: 'bg-pink-500',
    outline: 'outline-pink-800',
    focus_visible: 'focus-visible:border-pink-500',
  },
  rose: {
    background_primary: 'bg-rose-600',
    background_lighter: 'bg-rose-500',
    outline: 'outline-rose-800',
    focus_visible: 'focus-visible:border-rose-500',
  },
  slate: {
    background_primary: 'bg-slate-600',
    background_lighter: 'bg-slate-500',
    outline: 'outline-slate-800',
    focus_visible: 'focus-visible:border-slate-500',
  },
  mist: {
    background_primary: 'bg-mist-600',
    background_lighter: 'bg-mist-500',
    outline: 'outline-mist-800',
    focus_visible: 'focus-visible:border-mist-500',
  },
  olive: {
    background_primary: 'bg-olive-600',
    background_lighter: 'bg-olive-500',
    outline: 'outline-olive-800',
    focus_visible: 'focus-visible:border-olive-500',
  },
};

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
