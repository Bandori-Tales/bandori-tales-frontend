import { Trash2, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FiYoutube } from 'react-icons/fi';
import { Link } from 'react-router';

import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import { YUNOGPT_MEDIA_LIST, YUNOGPT_WRITE_ASSETS, type YunoChatThemes } from '@/constants';

import { ChatThemeSelector } from '../components/theme-selector';

function YunoProfile({
  theme_primary,
  theme_lighter,
  setIsProfileOpen,
}: {
  theme_primary: string;
  theme_lighter: string;
  setIsProfileOpen: (value: boolean) => void;
}) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-center gap-3 border-b-mauve-300 px-3 py-5',
        theme_primary
      )}
    >
      <div className="flex w-full flex-row items-start justify-between">
        <Button
          variant="ghost"
          className="rounded-full p-6 text-white hover:bg-black/10 [&_svg]:size-6"
          size="icon"
          onClick={() => setIsProfileOpen(false)}
        >
          <X className="stroke-3" />
        </Button>

        <Image
          src="/images/tools/yunogpt/yunogpt_icon.webp"
          alt="YunoGPT"
          className="aspect-square h-fit w-24 rounded-full"
        />

        <div className="w-12" />
      </div>

      <div className="flex w-full flex-col items-start justify-center gap-1.5">
        <Text type="st2" weight="bold" className="w-full text-center text-white">
          {YUNOGPT_WRITE_ASSETS.FULLNAME}
        </Text>
        <Text
          type="btn"
          weight="medium"
          lineHeight={5}
          className="w-full text-center text-mauve-50"
        >
          {YUNOGPT_WRITE_ASSETS.CHAT_BIO}
        </Text>
      </div>

      <div className="flex w-full flex-row items-center justify-center gap-2.5">
        <Button
          asChild
          variant="default"
          className={cn(
            'rounded-full p-6 text-white duration-300 hover:bg-white/10 [&_svg]:size-6',
            theme_lighter
          )}
          size="icon"
        >
          <Link
            to={YUNOGPT_WRITE_ASSETS.SOCIAL_TWEET_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </Link>
        </Button>
        <Button
          asChild
          variant="default"
          className={cn(
            'rounded-full p-6 text-white duration-300 hover:bg-white/10 [&_svg]:size-6',
            theme_lighter
          )}
          size="icon"
        >
          <Link to={YUNOGPT_WRITE_ASSETS.SOCIAL_YT_URL} target="_blank" rel="noopener noreferrer">
            <FiYoutube />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ProfileMiddleSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-fit w-full flex-col gap-2.5 border border-b-mauve-300 px-3 py-2.5">
      <Text type="st2" weight="semibold" className="text-start text-mauve-700">
        {title}
      </Text>

      {children}
    </div>
  );
}

function MediaList() {
  return (
    <div className="flex h-fit w-full flex-row items-baseline gap-1 overflow-scroll pb-4">
      {YUNOGPT_MEDIA_LIST.map((media, index) => (
        <Image
          key={`yuno_media_${index}`}
          src={media}
          alt={`yuno_media_${index}`}
          className="w-24 rounded-lg"
        />
      ))}
    </div>
  );
}

function ClearChatButton({ openDialog }: { openDialog: (value: string) => void }) {
  return (
    <Button
      variant="default"
      colors="destructive"
      leftIcon={<Trash2 />}
      className="w-full"
      onClick={() => openDialog('clear_chat')}
    >
      <Text type="p" className="text-white">
        {YUNOGPT_WRITE_ASSETS.BUTTON_CLEAR_CHAT}
      </Text>
    </Button>
  );
}

export function ChatProfileTab({
  theme_primary,
  theme_lighter,
  isProfileOpen,
  userTheme,
  setIsProfileOpen,
  setUserTheme,
  openDialog,
}: {
  theme_primary: string;
  theme_lighter: string;
  isProfileOpen: boolean;
  userTheme: YunoChatThemes;
  setIsProfileOpen: (value: boolean) => void;
  setUserTheme: (theme: YunoChatThemes) => void;
  openDialog: (value: string) => void;
}) {
  return (
    <aside
      className={cn(
        'fixed top-0 right-0 z-50 flex h-screen flex-col items-center justify-start bg-mauve-50 pb-4 transition-all duration-300',
        isProfileOpen
          ? 'w-full md:w-75 md:shadow-[-4px_0px_4px_-4px_rgba(0,0,0,0.25)]'
          : 'w-0 overflow-hidden'
      )}
    >
      <YunoProfile
        theme_primary={theme_primary}
        theme_lighter={theme_lighter}
        setIsProfileOpen={setIsProfileOpen}
      />

      <div className="flex w-full flex-col overflow-scroll">
        <ProfileMiddleSection
          title={`${YUNOGPT_WRITE_ASSETS.PROFILE_MEDIA} (${YUNOGPT_MEDIA_LIST.length})`}
        >
          <MediaList />
        </ProfileMiddleSection>

        <ProfileMiddleSection title={YUNOGPT_WRITE_ASSETS.PROFILE_SELECT_THEME}>
          <ChatThemeSelector selectedTheme={userTheme} setUserTheme={setUserTheme} />
        </ProfileMiddleSection>

        <div className="flex h-fit w-full items-center justify-center px-3 pt-2.5">
          <ClearChatButton openDialog={openDialog} />
        </div>
      </div>
    </aside>
  );
}
