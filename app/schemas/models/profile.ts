import { MoonIcon, SunIcon, SunMoonIcon } from 'lucide-react';
import * as v from 'valibot';

import { TrackerSettingSchema, UserTrackListSchema } from './story-tracker';

export const ProfileTheme = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  SYSTEM: 'SYSTEM',
} as const;

export const profileThemeMap = {
  LIGHT: {
    label: 'Light',
    icon: SunIcon,
  },
  DARK: {
    label: 'Dark',
    icon: MoonIcon,
  },
  SYSTEM: {
    label: 'System',
    icon: SunMoonIcon,
  },
};

export const ProfileThemeSchema = v.enum(ProfileTheme);

export const TransitionSpeed = {
  FAST: 'FAST',
  NORMAL: 'NORMAL',
  SLOW: 'SLOW',
  OFF: 'OFF',
} as const;

export const transitionSpeedLabelMap = {
  FAST: 'Fast',
  NORMAL: 'Normal',
  SLOW: 'Slow',
  OFF: 'Off',
};

export const transitionSpeedValueMap = {
  FAST: 'duration-100',
  NORMAL: 'duration-300',
  SLOW: 'duration-500',
  OFF: 'transition-none',
};

export const TransitionSpeedSchema = v.enum(TransitionSpeed);

export const ProfileSettingSchema = v.partial(
  v.object({
    profile_picture_character_id: v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(60)),
    profile_picture_array_index: v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(3)),
    username: v.pipe(v.string(), v.maxLength(20), v.minLength(2)),
    site_theme: ProfileThemeSchema,
    quick_access_list: v.array(v.string()),
    website_transition_duration: TransitionSpeedSchema,
  })
);

export const ProfileDriveDataSchema = v.object({
  user_profile: ProfileSettingSchema,
  story_tracker: v.object({
    track_list: UserTrackListSchema,
    settings: TrackerSettingSchema,
    last_update: v.string(),
  }),
  global_last_update: v.string(),
});

export const PartialProfileDriveDataSchema = v.partial(ProfileDriveDataSchema);

export type IProfileTheme = v.InferInput<typeof ProfileThemeSchema>;
export type ITransitionSpeed = v.InferInput<typeof TransitionSpeedSchema>;
export type ProfileSetting = v.InferInput<typeof ProfileSettingSchema>;
export type ProfileDriveData = v.InferInput<typeof ProfileDriveDataSchema>;
