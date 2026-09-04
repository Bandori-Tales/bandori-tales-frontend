import type { BandoriStory, BandoriStoryForm, IStoryTag, ITranslationType } from '@/schemas/models';

export const StoryTrackerDefaultValue = {
  search: '',
  category_anime: true,
  category_garupa: true,
  category_ournote: true,
  type_anime: true,
  type_band: true,
  type_main: true,
  type_event: true,
  translation: ['FAN', 'OFFICIAL', 'NONE'],
  translation_operation: 'OR',
  tag: ['COLLAB', 'EXPLORATION', 'FILLER', 'MAJOR', 'RELEVANT', 'NOTCANON'],
  main_band: Array.from({ length: 13 }, (_, i) => i),
  side_band: Array.from({ length: 12 }, (_, i) => i + 1),
  side_band_operation: 'OR',
  main_character: Array.from({ length: 60 }, (_, i) => i + 1),
  main_character_operation: 'OR',
  side_character: Array.from({ length: 60 }, (_, i) => i + 1),
  side_character_operation: 'OR',
  order_by: 'chronology',
  order_type: 'desc',
} as BandoriStoryForm;

export const StoryTrackerCheckboxList: Record<string, { name: string; label: string }[]> = {
  category: [
    {
      name: 'category_anime',
      label: 'Anime',
    },
    {
      name: 'category_garupa',
      label: 'Garupa',
    },
    {
      name: 'category_ournote',
      label: 'Our Note',
    },
  ],
  type: [
    {
      name: 'type_anime',
      label: 'Anime',
    },
    {
      name: 'type_band',
      label: 'Band Story',
    },
    {
      name: 'type_main',
      label: 'Main Story',
    },
    {
      name: 'type_event',
      label: 'Event Story',
    },
  ],
};

export const StoryTrackerTranslationDescription: Record<ITranslationType, string> = {
  OFFICIAL: 'Translated to English by Official Team from the game or anime.',
  FAN: 'Translated to English by a fan or group. Quality may vary, but might be better than offical.',
  NONE: 'Not translated yet. Wait until the official release or a fan decided to do it themself.',
};

export const StoryTrackerTagDescription: Record<IStoryTag, string> = {
  MAJOR:
    "A significant event (or part of events) which resulted in change of character(s) personality or band's goal.",
  RELEVANT:
    "Important event from character's past, a setup for future plot or an event following after significant event.",
  EXPLORATION: "Exploring character's personality, usually deepening their connection with others.",
  FILLER:
    "A fun or seasonal event (e.g. halloween, christmas) which won't be impacting any plot. Some event is not canon.",
  COLLAB: 'Story for collaboration with another franchise.',
  NOTCANON:
    "The story didn't happen in the actual timeline. Take a note that past event could still being mentioned here.",
};

export const DUMMY_STORY: BandoriStory[] = [
  {
    id: 1,
    order: 1,
    name: 'Raise A Suilen band Story 1: RAISE A SUILEN ~Raise the Curtain~ Pt. 1',
    story_banner_img: '/images/dummy_banner.png',
    story_type: 'BAND_STORY',
    story_tag: 'EXPLORATION',
    event_id: 123,
    has_anime_eq: true,
    anime_banner_img: '/images/dummy_banner_anime.png',
    anime_name: 'Anime BanG Dream! Season 3',
    anime_url: 'https://bestdori.com',
    category: 'GARUPA',
    available_tl_type: ['OFFICIAL', 'FAN'],
    available_tl: [
      {
        name: 'Playlist',
        source: 'YOUTUBE',
        type: 'OFFICIAL',
        url: 'https://youtube.com/playlist?list=PLDBZt_5XOInpjEuvLQDSj3hP-QQlnn1D7',
      },
      {
        name: 'Bestdori',
        source: 'BESTDORI',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
      {
        name: 'TL By NameHere',
        source: 'BLUESKY',
        type: 'FAN',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
    ],
    main_characters: [31, 32, 33, 34, 35],
    main_band: 7,
    side_characters: [1, 2, 3, 4, 5, 21, 22, 23, 24, 25],
    side_bands: [1, 5],
    synopsis:
      "The girls of Afterglow have finished their last day of school, but Himari's still got something on her mind...",
    notes: null,
  },
  {
    id: 2,
    order: 2,
    name: 'Raise A Suilen band Story 1: RAISE A SUILEN ~Raise the Curtain~ Pt. 2',
    story_banner_img: '/images/dummy_banner.png',
    story_type: 'BAND_STORY',
    story_tag: 'MAJOR',
    event_id: 124,
    has_anime_eq: true,
    anime_banner_img: '/images/dummy_banner_anime.png',
    anime_name: 'Anime BanG Dream! Season 3',
    anime_url: 'https://bestdori.com',
    category: 'GARUPA',
    available_tl_type: ['OFFICIAL', 'FAN'],
    available_tl: [
      {
        name: 'Playlist',
        source: 'YOUTUBE',
        type: 'OFFICIAL',
        url: 'https://youtube.com/playlist?list=PLDBZt_5XOInpjEuvLQDSj3hP-QQlnn1D7',
      },
      {
        name: 'Bestdori',
        source: 'BESTDORI',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
      {
        name: 'Fandom',
        source: 'FANDOM',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
      {
        name: 'TL By NameHere',
        source: 'BLUESKY',
        type: 'FAN',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
    ],
    main_characters: [31, 32, 33, 34, 35],
    main_band: 7,
    side_characters: [1, 2, 3, 4, 5, 21, 22, 23, 24, 25],
    side_bands: [1, 5],
    synopsis:
      "The girls of Afterglow have finished their last day of school, but Himari's still got something on her mind...",
    notes: null,
  },
  {
    id: 3,
    order: 3,
    name: 'Raise A Suilen band Story 1: RAISE A SUILEN ~Raise the Curtain~ Pt. 3',
    story_banner_img: '/images/dummy_banner.png',
    story_type: 'BAND_STORY',
    story_tag: 'COLLAB',
    event_id: 125,
    has_anime_eq: true,
    anime_banner_img: '/images/dummy_banner_anime.png',
    anime_name: 'Anime BanG Dream! Season 3',
    anime_url: 'https://bestdori.com',
    category: 'GARUPA',
    available_tl_type: ['OFFICIAL', 'FAN'],
    available_tl: [
      {
        name: 'Playlist',
        source: 'YOUTUBE',
        type: 'OFFICIAL',
        url: 'https://youtube.com/playlist?list=PLDBZt_5XOInpjEuvLQDSj3hP-QQlnn1D7',
      },
      {
        name: 'Bestdori',
        source: 'BESTDORI',
        type: 'OFFICIAL',
        url: 'https://bestdori.com/info/events/16/The-6th-Afterglow',
      },
    ],
    main_characters: [31, 32, 33, 34, 35],
    main_band: 7,
    side_characters: [],
    side_bands: [],
    synopsis:
      "The girls of Afterglow have finished their last day of school, but Himari's still got something on her mind...",
    notes: null,
  },
];
