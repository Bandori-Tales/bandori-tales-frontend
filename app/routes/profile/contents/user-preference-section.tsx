import type { ReactNode } from 'react';

import { Text } from '@/components/helper/text';

import {
  type IProfileTheme,
  type ITransitionSpeed,
  type ProfileSetting,
  ProfileTheme,
  profileThemeMap,
  TransitionSpeed,
  transitionSpeedLabelMap,
} from '@/schemas/models';

import { PreferenceSettingComponent } from '../components/preference-setting-component';

function PreferenceFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col items-start justify-start gap-y-2">
        <Text type="p" weight="semibold" className="text-primary">
          {title}
        </Text>
        <Text type="btn" weight="medium" className="text-slate-500">
          {description}
        </Text>
      </div>
      {children}
    </div>
  );
}

export function UserPreferenceSection({
  userProfile,
  handleOnClick,
}: {
  userProfile: ProfileSetting;
  handleOnClick: ({
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
      }) => void;
}) {
  function handleThemeUpdate(value: string) {
    handleOnClick({
      type: 'theme',
      value: value as IProfileTheme,
    });
  }

  function handleTransitionSpeedUpdate(value: string) {
    handleOnClick({
      type: 'transition-speed',
      value: value as ITransitionSpeed,
    });
  }

  return (
    <div className="flex w-full flex-col gap-y-6">
      <PreferenceFrame title="Site Theme" description="Theme for the entire website.">
        <PreferenceSettingComponent
          type="select"
          items={Object.values(ProfileTheme).map((theme) => {
            const themeItem = profileThemeMap[theme];

            return {
              label: themeItem.label,
              icon: themeItem.icon,
              value: theme,
            };
          })}
          currentValue={userProfile.site_theme || 'SYSTEM'}
          onClick={handleThemeUpdate}
        />
      </PreferenceFrame>

      <PreferenceFrame title="Animation Speed" description="Animation such as hover animation etc.">
        <PreferenceSettingComponent
          type="select"
          items={Object.values(TransitionSpeed).map((speed) => {
            const label = transitionSpeedLabelMap[speed];

            return {
              label: label,
              value: speed,
            };
          })}
          currentValue={userProfile.website_transition_duration || 'NORMAL'}
          onClick={handleTransitionSpeedUpdate}
        />
      </PreferenceFrame>
    </div>
  );
}
