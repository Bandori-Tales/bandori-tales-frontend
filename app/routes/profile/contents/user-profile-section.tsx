import { Eye, EyeClosed, Pencil, SquarePen, UserCircle } from 'lucide-react';
import { useState } from 'react';

import useDialogStore from '@/hooks/store/use-dialog';
import { handleCharacterPick } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import GeneralDialog from '@/components/shared/general-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DIALOG_KEY } from '@/constants';

import { SelectProfilePictureDialog } from '../components/profile-picture-dialog';

export function UserProfileSection({
  initial_profile_id,
  initial_username = 'Dreamers',
  user_email,
  handleSelectProfile,
  handleEditUsername,
  handleLogin,
  handleLogout,
}: {
  initial_profile_id?: number;
  initial_username?: string;
  user_email?: string;
  handleSelectProfile: (id: number) => void;
  handleEditUsername: (new_name: string, isDefault: boolean) => void;
  handleLogin: () => void;
  handleLogout: () => void;
}) {
  const { open: openDialog } = useDialogStore();
  const [username, setUsername] = useState(initial_username);
  const [hideEmail, setHideEmail] = useState(true);

  const profilePicture = initial_profile_id
    ? handleCharacterPick('profile_picture_url', initial_profile_id)
    : null;

  return (
    <>
      <SelectProfilePictureDialog
        initial_profile_id={initial_profile_id}
        handleSelectProfile={handleSelectProfile}
      />
      <GeneralDialog
        title="Edit Username"
        description="Edit your profile username"
        preventConfirmClose
        dialogKey={DIALOG_KEY.PROFILE.SET_USERNAME}
        onConfirm={() => handleEditUsername(username, false)}
        onCancel={() => {
          setUsername(initial_username);
          handleEditUsername(initial_username, true);
        }}
        confirmText="Edit"
      >
        <Input
          type="text"
          className="w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </GeneralDialog>
      <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:items-start">
        <button
          type="button"
          onClick={() => openDialog(DIALOG_KEY.PROFILE.SET_PICTURE)}
          className="relative flex size-24 shrink-0 items-center justify-center rounded-full bg-slate-400 ring-2 ring-transparent transition-all duration-300 hover:ring-amber-400"
        >
          <div className="absolute right-0 bottom-0 rounded-full bg-primary p-2">
            <Pencil className="size-3 stroke-3 text-white" />
          </div>
          {profilePicture ? (
            <Image alt="User Profile" src={profilePicture} className="rounded-full object-cover" />
          ) : (
            <UserCircle className="size-20 stroke-1 text-primary" />
          )}
        </button>

        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="flex flex-col gap-2">
            <Text type="p" weight="semibold" className="text-primary">
              Username
            </Text>
            <div className="flex w-full flex-row items-center justify-between rounded-md bg-slate-100 p-2 shadow-black/20 shadow-inner sm:w-90">
              <Text type="btn" weight="semibold" className="text-black">
                {username}
              </Text>
              <Button
                variant="default"
                size="icon"
                className="size-8 p-1"
                onClick={() => openDialog(DIALOG_KEY.PROFILE.SET_USERNAME)}
              >
                <SquarePen className="stroke-3 text-white" />
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Text type="p" weight="semibold" className="text-primary">
              Google Drive Email
            </Text>
            <div className="flex w-full flex-col items-start justify-start gap-2 sm:w-fit sm:flex-row sm:items-center">
              {user_email && user_email !== '' ? (
                <>
                  <div className="flex w-full flex-row items-center justify-between rounded-md bg-slate-100 p-2 shadow-black/20 shadow-inner sm:w-90">
                    {hideEmail ? (
                      <Text type="btn" weight="semibold" className="pt-2 text-black">
                        ****************
                      </Text>
                    ) : (
                      <Text type="btn" weight="semibold" className="text-black">
                        {user_email.slice(0, 32)}
                        {user_email.length > 32 ? '...' : ''}
                      </Text>
                    )}
                    <Button
                      variant="default"
                      size="icon"
                      className="size-8 p-1"
                      onClick={() => setHideEmail(!hideEmail)}
                    >
                      {hideEmail ? (
                        <Eye className="stroke-3 text-white" />
                      ) : (
                        <EyeClosed className="stroke-3 text-white" />
                      )}
                    </Button>
                  </div>
                  <Button variant="default" colors="destructive" onClick={handleLogout}>
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="transition-colors duration-300 hover:bg-black/5"
                  onClick={handleLogin}
                >
                  <Image
                    alt="Google Drive Logo"
                    src="/images/translation/google_drive.webp"
                    className="size-5"
                  />
                  <Text type="btn" weight="medium" className="text-primary">
                    Connect to Drive
                  </Text>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
