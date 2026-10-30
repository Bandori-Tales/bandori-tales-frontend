import { UserRound } from 'lucide-react';
import { useState } from 'react';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import GeneralDialog from '@/components/shared/general-dialog';
import { Button } from '@/components/ui/button';

import { DIALOG_KEY } from '@/constants';

import { getAllCharacterProfilePictures } from '../hooks/profile-utils';

function ProfilePictureFrame({
  isSelected = false,
  character_id,
  character_array_index,
  character_name,
  profile_picture_src,
  handleClick,
}: {
  isSelected?: boolean;
  character_id: number;
  character_array_index: number;
  character_name: string;
  profile_picture_src?: string;
  handleClick: (id: number, array_index: number) => void;
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
        onClick={() => handleClick(character_id, character_array_index)}
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
  initial_profile,
  handleSelectProfile,
}: {
  initial_profile?: [number, number];
  handleSelectProfile: (id: number, array_index: number) => void;
}) {
  const [selectedProfile, setSelectedProfile] = useState<[number, number]>(
    initial_profile ?? [0, 0]
  );
  const { close: closeDialog } = useDialogStore();

  function handleSelect(id: number, array_index: number) {
    setSelectedProfile([id, array_index]);
    handleSelectProfile(id, array_index);
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
          isSelected={!selectedProfile[0]}
          character_id={0}
          character_array_index={0}
          character_name="Default Picture"
          handleClick={handleSelect}
        />
        {getAllCharacterProfilePictures().map((character) => {
          const isSelected =
            character.character_id === selectedProfile[0] &&
            character.character_array_index === selectedProfile[1];

          return (
            <ProfilePictureFrame
              key={character.character_name}
              isSelected={isSelected}
              character_id={character.character_id}
              character_array_index={character.character_array_index}
              character_name={character.character_name}
              profile_picture_src={character.profile_picture_src}
              handleClick={handleSelect}
            />
          );
        })}
      </div>
    </GeneralDialog>
  );
}
