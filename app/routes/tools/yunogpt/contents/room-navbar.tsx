import { EllipsisVertical, House, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { YUNOGPT_WRITE_ASSETS } from '@/constants';

function HomeButton() {
  return (
    <Button
      asChild
      variant="ghost"
      className="rounded-full p-6 text-white hover:bg-black/10 [&_svg]:size-6"
      size="icon"
    >
      <Link to="/">
        <House className="stroke-3" />
      </Link>
    </Button>
  );
}

function OptionButton({ openDialog }: { openDialog: (value: string) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-6 text-white hover:bg-black/10 [&_svg]:size-6"
          size="icon"
        >
          <EllipsisVertical className="stroke-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem className="focus:bg-transparent">
            <Button
              variant="default"
              colors="destructive"
              leftIcon={<Trash2 className="text-white" />}
              className="w-full"
              onClick={() => openDialog('clear_chat')}
            >
              <Text type="p" className="text-white">
                {YUNOGPT_WRITE_ASSETS.BUTTON_CLEAR_CHAT}
              </Text>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ChatroomNavbar({
  online_status,
  theme_primary,
  isProfileOpen,
  setIsProfileOpen,
  openDialog,
}: {
  online_status: string;
  theme_primary: string;
  isProfileOpen: boolean;
  setIsProfileOpen: (value: boolean) => void;
  openDialog: (value: string) => void;
}) {
  return (
    <nav
      className={cn(
        isProfileOpen ? 'w-full md:w-[calc(100vw-300px)]' : 'w-full',
        theme_primary,
        'fixed top-0 z-30 flex h-fit flex-row items-center justify-between px-3 py-1 drop-shadow-black/25 drop-shadow-lg transition-all duration-300 sm:px-9'
      )}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        <HomeButton />

        <Button
          asChild
          variant="ghost"
          onClick={() => setIsProfileOpen(true)}
          className="flex h-fit px-2 py-1 hover:bg-black/10 focus-visible:ring-0"
        >
          <div className="flex flex-row gap-3 rounded-lg shadow-none">
            <Image
              src="/images/tools/yunogpt/yunogpt_icon.webp"
              alt="YunoGPT"
              className="aspect-square h-fit w-12 rounded-full"
            />

            <div className="flex flex-col justify-center gap-2 text-white">
              <Text type="p" weight="bold">
                {YUNOGPT_WRITE_ASSETS.NICKNAME}
              </Text>
              <Text type="btn" weight="semibold" className="text-mauve-50">
                {online_status}
              </Text>
            </div>
          </div>
        </Button>
      </div>

      <OptionButton openDialog={openDialog} />
    </nav>
  );
}
