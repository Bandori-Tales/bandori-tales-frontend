import Cookies from 'js-cookie';
import { type ReactNode, useEffect } from 'react';
import { useRevalidator } from 'react-router';

import useDialogStore from '@/hooks/store/use-dialog';
import { useGoogleDriveAuth } from '@/hooks/use-google';
import { useIsMobile } from '@/hooks/use-mobile';
import { generateMeta } from '@/lib/generate-meta';
import { GoogleDriveUtils } from '@/lib/google-drive';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';

import { COOKIE_KEY } from '@/constants';
import type { ProfileDriveData } from '@/schemas/models';

import type { Route } from './+types';
import { UserDataSection } from './contents/user-data-section';
import { UserPreferenceSection } from './contents/user-preference-section';
import { UserProfileSection } from './contents/user-profile-section';
import { getUserLocalData } from './hooks/get-profile';
import {
  updateUserPreference,
  updateUserProfilePicture,
  updateUserUsername,
} from './hooks/profile-utils';

interface SectionFrameProps {
  title: string;
  children: ReactNode;
}

export function meta() {
  generateMeta({
    title: 'Profile',
  });
}

export async function clientLoader() {
  const userLocalData = getUserLocalData();
  const accessToken = Cookies.get()[COOKIE_KEY.PROFILE.GOOGLE_ACCESS_TOKEN] || null;

  let userEmail: string | null = null;
  let userDriveData: ProfileDriveData | null = null;

  if (accessToken) {
    userEmail = await GoogleDriveUtils.getUserEmail(accessToken);
    userDriveData = await GoogleDriveUtils.getData(accessToken);
  }

  return {
    userAccessToken: accessToken,
    userLocalData,
    userEmail,
    userDriveData,
  };
}

function SectionFrame({ title, children }: SectionFrameProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-y-3 pt-3 pb-6 drop-shadow-black/20 drop-shadow-md">
      <Text type="h6" weight="bold">
        {title}
      </Text>

      <div className="flex h-fit w-full rounded-md border border-primary-foreground bg-white p-3 dark:bg-mauve-900">
        {children}
      </div>
    </div>
  );
}

export default function ProfilePage({ loaderData }: Route.ComponentProps) {
  const { userAccessToken, userLocalData, userEmail, userDriveData } = loaderData;

  const isMobile = useIsMobile({ isTablet: true });
  const { setSelected: setSelectedTheme } = useTheme();
  const { close: closeDialog } = useDialogStore();
  const { revalidate } = useRevalidator();
  const { login, logout } = useGoogleDriveAuth(revalidate);

  const handleUpdateProfilePicture = updateUserProfilePicture(
    userLocalData.user_profile,
    revalidate
  );
  const handleUpdateUsername = updateUserUsername(
    userLocalData.user_profile,
    revalidate,
    closeDialog
  );
  const handlePreferenceUpdate = updateUserPreference(userLocalData.user_profile, revalidate);

  async function handleExportData() {
    if (!userAccessToken) return;

    await GoogleDriveUtils.exportData(userAccessToken);
    revalidate();
  }

  async function handleImportData() {
    if (!userAccessToken) return;

    await GoogleDriveUtils.importData(userAccessToken);
    revalidate();
  }

  useEffect(() => {
    setSelectedTheme(
      (loaderData.userLocalData.user_profile.site_theme?.toLowerCase() as
        | 'system'
        | 'light'
        | 'dark') || 'system'
    );
  }, [loaderData, setSelectedTheme]);

  return (
    <div
      className={cn(
        'min-h-screen w-full bg-linear-to-t from-rose-100 to-background pb-6 dark:from-[#1E0009]',
        isMobile ? 'px-4 pt-0' : 'px-6 pt-20'
      )}
    >
      <SectionFrame title="User Profile">
        <UserProfileSection
          initial_profile={[
            userLocalData.user_profile.profile_picture_character_id || 0,
            userLocalData.user_profile.profile_picture_array_index || 0,
          ]}
          initial_username={userLocalData.user_profile.username}
          user_email={userEmail || undefined}
          handleSelectProfile={handleUpdateProfilePicture}
          handleEditUsername={handleUpdateUsername}
          handleLogin={login}
          handleLogout={logout}
        />
      </SectionFrame>

      <SectionFrame title="Preference">
        <UserPreferenceSection
          userProfile={userLocalData.user_profile}
          handleOnClick={handlePreferenceUpdate}
        />
      </SectionFrame>

      <SectionFrame title="Backup Data">
        <UserDataSection
          isLoginDrive={!!userAccessToken}
          userLocalData={userLocalData}
          userDriveData={userDriveData}
          handleExport={handleExportData}
          handleImport={handleImportData}
        />
      </SectionFrame>
    </div>
  );
}
