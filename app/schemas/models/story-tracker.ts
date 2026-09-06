import * as v from 'valibot';

export const storyCategoryMap = {
  ANIME: 'Anime',
  GARUPA: 'Girls Band Party',
  OURNOTE: 'Our Note',
};

export const StoryCategory = {
  ANIME: 'ANIME', // Story that not in the game (ex. Season 2)
  GARUPA: 'GARUPA',
  OURNOTE: 'OURNOTE',
} as const;

export const StoryCategorySchema = v.enum(StoryCategory);

export const storyTypeMap = {
  ANIME: 'Anime', // Story that not in the game (ex. Season 2)
  EVENT_STORY: 'Event Story',
  BAND_STORY: 'Band Story',
  MAIN_STORY: 'Main Story',
};

export const StoryType = {
  ANIME: 'ANIME',
  EVENT_STORY: 'EVENT_STORY',
  BAND_STORY: 'BAND_STORY',
  MAIN_STORY: 'MAIN_STORY',
} as const;

export const StoryTypeSchema = v.enum(StoryType);

export const storyTagMap = {
  EXPLORATION: 'Character Exploration',
  FILLER: 'Filler',
  RELEVANT: 'Plot Relevant',
  MAJOR: 'Major Arc',
  COLLAB: 'Collab Event',
  NOTCANON: 'Not Canon',
};

export const StoryTag = {
  EXPLORATION: 'EXPLORATION',
  FILLER: 'FILLER',
  RELEVANT: 'RELEVANT',
  MAJOR: 'MAJOR',
  COLLAB: 'COLLAB',
  NOTCANON: 'NOTCANON',
} as const;

export const StoryTagSchema = v.enum(StoryTag);

export const translationTypeMap = {
  OFFICIAL: 'Official',
  FAN: 'Fan TL',
  NONE: 'None',
};

export const TranslationType = {
  OFFICIAL: 'OFFICIAL',
  FAN: 'FAN',
  NONE: 'NONE',
} as const;

export const TranslationTypeSchema = v.enum(TranslationType);

export const translationSourceMap = {
  YOUTUBE: 'Youtube',
  BLUESKY: 'Bluesky',
  BESTDORI: 'Bestdori',
  FANDOM: 'Miraheze Fandom',
};

export const TranslationSource = {
  YOUTUBE: 'YOUTUBE',
  BLUESKY: 'BLUESKY',
  BESTDORI: 'BESTDORI',
  FANDOM: 'FANDOM',
} as const;

export const TranslationSourceSchema = v.enum(TranslationSource);

export const ReadingStatus = {
  skip: 'skip',
  finish: 'finish',
} as const;

export const ReadingStatusSchema = v.enum(ReadingStatus);

export const TrackerSettingSchema = v.object({
  isListSplitted: v.boolean(),
  showUnread: v.boolean(),
  showSkipped: v.boolean(),
  showFinished: v.boolean(),
});

export const UserSavedTrackSchema = v.object({
  id: v.pipe(v.number(), v.integer()),
  status: ReadingStatusSchema,
});

export const UserTrackListSchema = v.array(UserSavedTrackSchema);

export const AvailableTranslationSchema = v.object({
  name: v.string(),
  source: TranslationSourceSchema,
  type: TranslationTypeSchema,
  url: v.string(),
});

export const BandoriStorySchema = v.object({
  id: v.number(),
  order: v.number(),
  name: v.string(),
  story_banner_img: v.nullable(v.string()),
  story_type: StoryTypeSchema,
  story_tag: StoryTagSchema,
  event_id: v.nullable(v.number()),
  has_anime_eq: v.boolean(),
  anime_banner_img: v.nullable(v.string()),
  anime_name: v.nullable(v.string()),
  anime_url: v.nullable(v.string()),
  category: StoryCategorySchema,
  available_tl_type: v.nullable(v.array(TranslationTypeSchema)),
  available_tl: v.nullable(v.array(AvailableTranslationSchema)),
  main_characters: v.array(v.number()),
  side_characters: v.nullable(v.array(v.number())),
  main_band: v.number(),
  side_bands: v.nullable(v.array(v.number())),
  // related_songs: v.array(v.string()), // For future update
  synopsis: v.string(),
  notes: v.nullable(v.string()),
});

export const SearchOperation = {
  AND: 'AND',
  OR: 'OR',
} as const;

const SortOperation = {
  asc: 'asc',
  desc: 'desc',
} as const;

export const SearchOperationSchema = v.enum(SearchOperation);

export const BandoriStoryFormSchema = v.object({
  search: v.pipe(
    v.string(),
    v.trim(),
    v.maxLength(100, 'Searched item must be less than 100 characters, including whitespaces.')
  ),
  enable_category: v.boolean(),
  category_anime: v.boolean(),
  category_garupa: v.boolean(),
  category_ournote: v.boolean(),
  enable_type: v.boolean(),
  type_anime: v.boolean(),
  type_main: v.boolean(),
  type_band: v.boolean(),
  type_event: v.boolean(),
  enable_translation: v.boolean(),
  translation: v.array(TranslationTypeSchema),
  translation_operation: SearchOperationSchema,
  enable_tag: v.boolean(),
  tag: v.array(StoryTagSchema),
  enable_main_band: v.boolean(),
  main_band: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(99))),
  enable_side_band: v.boolean(),
  side_band: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(99))),
  side_band_operation: SearchOperationSchema,
  enable_main_character: v.boolean(),
  main_character: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(60))),
  main_character_operation: SearchOperationSchema,
  enable_side_character: v.boolean(),
  side_character: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(60))),
  side_character_operation: SearchOperationSchema,
  order_by: v.pipe(v.string(), v.trim(), v.maxLength(20)),
  order_type: v.enum(SortOperation),
});

export const BandoriStoryQuerySchema = v.object({
  search: v.pipe(v.string(), v.trim(), v.maxLength(100)),
  category: v.array(StoryCategorySchema),
  type: v.array(StoryTypeSchema),
  translation: v.array(TranslationTypeSchema),
  translation_operation: SearchOperationSchema,
  tag: v.array(StoryTagSchema),
  main_band: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(99))),
  side_band: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(99))),
  side_band_operation: SearchOperationSchema,
  main_character: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(60))),
  main_character_operation: SearchOperationSchema,
  side_character: v.array(v.pipe(v.number(), v.minValue(1), v.maxValue(60))),
  side_character_operation: SearchOperationSchema,
  order_by: v.pipe(v.string(), v.trim(), v.maxLength(20)),
  order_type: v.enum(SortOperation),
});

export type IReadingStatus = v.InferInput<typeof ReadingStatusSchema>;
export type IStoryCategory = v.InferInput<typeof StoryCategorySchema>;
export type IStoryType = v.InferInput<typeof StoryTypeSchema>;
export type IStoryTag = v.InferInput<typeof StoryTagSchema>;
export type ITranslationType = v.InferInput<typeof TranslationTypeSchema>;
export type ITranslationSource = v.InferInput<typeof TranslationSourceSchema>;

export type TrackerSetting = v.InferInput<typeof TrackerSettingSchema>;
export type UserSavedTrack = v.InferInput<typeof UserSavedTrackSchema>;
export type AvailableTranslation = v.InferInput<typeof AvailableTranslationSchema>;
export type BandoriStory = v.InferInput<typeof BandoriStorySchema>;
export type BandoriStoryForm = v.InferInput<typeof BandoriStoryFormSchema>;
export type BandoriStoryQuery = v.InferInput<typeof BandoriStoryQuerySchema>;
