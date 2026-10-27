import type { Dispatch, ReactNode, SetStateAction } from 'react';

import { itemStorage } from '@/lib/storage';

import { Text } from '@/components/helper/text';
import { Switch } from '@/components/ui/switch';

import { LOCAL_STORAGE_KEY, YUNOGPT_WRITE_ASSETS } from '@/constants';

import type { ShowPhotoProps } from './chat-block';

export interface YunoGptSettingsProps {
  showPhotoSettings: ShowPhotoProps;
  setShowPhotoSettings: Dispatch<SetStateAction<ShowPhotoProps>>;
}

function SettingsWrapper({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <Text type="btn" lineHeight={7} weight="semibold" className="text-foreground-lighter">
        {title}
      </Text>

      {children}
    </div>
  );
}

export function YunogptSettings({ showPhotoSettings, setShowPhotoSettings }: YunoGptSettingsProps) {
  function handleUpdateShowPhoto(data: boolean) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.YUNOGPT.SHOW_PHOTO, String(data));
    setShowPhotoSettings((prev) => ({ ...prev, showPhoto: data }));
  }

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start">
      <SettingsWrapper title={YUNOGPT_WRITE_ASSETS.SWITCH_SHOW_PHOTO}>
        <Switch
          defaultChecked={showPhotoSettings.showPhoto}
          onClick={() => handleUpdateShowPhoto(!showPhotoSettings.showPhoto)}
        />
      </SettingsWrapper>
    </div>
  );
}
