import type { BandoriStoryForm } from '@/schemas/models';

export const StoryTrackerDefaultValue = {
  search: '',
  category_anime: true,
  category_garupa: true,
  category_ournote: true,
  type_anime: true,
  type_band: true,
  type_main: true,
  type_event: true,
  translation: ['FAN', 'OFFICIAL'],
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
