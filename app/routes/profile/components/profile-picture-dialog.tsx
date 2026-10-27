import { UserRound } from 'lucide-react';
import { useState } from 'react';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn, handleCharacterPick } from '@/lib/utils';

import Image from '@/components/helper/image';
import GeneralDialog from '@/components/shared/general-dialog';
import { Button } from '@/components/ui/button';

import { Characters, DIALOG_KEY } from '@/constants';

function ProfilePictureFrame({
  isSelected = false,
  character_id,
  character_name,
  profile_picture_src,
  handleClick,
}: {
  isSelected?: boolean;
  character_id: number;
  character_name: string;
  profile_picture_src?: string;
  handleClick: (id: number) => void;
}) {
  return (
    <div className="col-span-1 flex h-full w-full items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'group items-center justify-center rounded-full ring-2 transition-all',
          isSelected ? 'ring-secondary' : 'ring-transparent hover:ring-secondary'
        )}
        onClick={() => handleClick(character_id)}
      >
        {profile_picture_src ? (
          <Image alt={character_name} src={profile_picture_src} className="size-10 rounded-full" />
        ) : (
          <UserRound className="size-12 stroke-3 text-black dark:text-white" />
        )}
      </Button>
    </div>
  );
}

export function SelectProfilePictureDialog({
  initial_profile_id,
  handleSelectProfile,
}: {
  initial_profile_id?: number;
  handleSelectProfile: (id: number) => void;
}) {
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    initial_profile_id ?? null
  );
  const { close: closeDialog } = useDialogStore();

  function handleSelect(id: number) {
    setSelectedProfileId(id);
    handleSelectProfile(id);
    closeDialog(DIALOG_KEY.PROFILE.SET_PICTURE);
  }

  return (
    <GeneralDialog
      title="Select Profile Picture"
      dialogKey={DIALOG_KEY.PROFILE.SET_PICTURE}
      description="For your own customization"
      hideConfirm
    >
      <div className="scrollbar-thin grid h-100 w-full grid-cols-4 gap-x-2 gap-y-4 overflow-y-scroll py-3 md:grid-cols-6 lg:grid-cols-8">
        <ProfilePictureFrame
          isSelected={!selectedProfileId}
          character_id={0}
          character_name="Default Picture"
          handleClick={handleSelect}
        />
        {Characters.map((character) => {
          const isSelected = character.id === selectedProfileId;
          const characterName = handleCharacterPick('nickname', character.id);
          const characterPicture = handleCharacterPick('profile_picture_url', character.id);

          return (
            <ProfilePictureFrame
              key={characterName}
              isSelected={isSelected}
              character_id={character.id}
              character_name={characterName}
              profile_picture_src={characterPicture}
              handleClick={handleSelect}
            />
          );
        })}
      </div>
    </GeneralDialog>
  );
}
