import { valibotResolver } from '@hookform/resolvers/valibot';
import { SendHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Form, useNavigation, useSubmit } from 'react-router';
import { parseFormData, RemixFormProvider, useRemixForm } from 'remix-hook-form';

import useDialogStore from '@/hooks/store/use-dialog';
import { api } from '@/lib/axios';
import { generateMeta } from '@/lib/generate-meta';
import { itemStorage } from '@/lib/storage';
import { cn, handleApiResponseError } from '@/lib/utils';

import TextareaForm from '@/components/form/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';

import {
  LOCAL_STORAGE_KEY,
  SESSION_STORAGE_KEY,
  YUNO_CHAT_THEMES_ARRAY,
  YUNOGPT_WRITE_ASSETS,
  type YunoChatThemes,
} from '@/constants';
import { type UserChat, UserChatSchema } from '@/schemas/models';

import type { Route } from './+types';
import { ChatBlock, type IChatBlock } from './components/chat-block';
import ClearChatDialog from './components/clear-chat-dialog';
import { type YunoThemeClasses, YunoThemeMaps } from './components/theme-selector';
import { ChatProfileTab } from './contents/profile-tab';
import { ChatroomNavbar } from './contents/room-navbar';

function isThemeValid(value: string) {
  return (YUNO_CHAT_THEMES_ARRAY as readonly string[]).includes(value);
}

function validateRoomChat(chats: string | IChatBlock[]) {
  if (typeof chats === 'string') {
    toast.warning('An error was found in your recent chat. Resetting the room...');

    itemStorage.session.set(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY, []);
    return [];
  }

  let isInvalid = false;
  for (const chat of chats) {
    if (isInvalid) break;

    if (chat.sender !== 'user' && chat.sender !== 'yuno') isInvalid = true;
    if (chat.isLoading === false) isInvalid = true;
  }

  if (isInvalid) {
    toast.warning('An error was found in your recent chat. Resetting the room...');

    itemStorage.session.set(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY, []);
    return [];
  }

  return chats;
}

export function meta() {
  return generateMeta({ title: 'Yuno GPT' });
}

export async function clientLoader() {
  let userChatTheme = itemStorage.local.get<YunoChatThemes | string>(
    LOCAL_STORAGE_KEY.YUNOGPT.THEME
  );
  const rawUserChats = itemStorage.session.get<IChatBlock[] | string>(
    SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY
  );

  const userChats = rawUserChats ? validateRoomChat(rawUserChats) : [];
  const navbarStatus =
    userChats.length > 0
      ? YUNOGPT_WRITE_ASSETS.STATUS_ONLINE
      : YUNOGPT_WRITE_ASSETS.STATUS_TUTORIAL;

  if (!userChatTheme || userChatTheme === '' || !isThemeValid(userChatTheme)) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.YUNOGPT.THEME, 'rose');
    userChatTheme = 'rose';
  }

  return {
    used_theme: {
      theme: userChatTheme,
      ...YunoThemeMaps[userChatTheme as YunoChatThemes],
    },
    room_chats: userChats,
    navbar_status: navbarStatus,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const data = (await parseFormData(request)) as UserChat;

  const rawUserChats = itemStorage.session.get<IChatBlock[] | string>(
    SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY
  );
  const currentChats = rawUserChats ? validateRoomChat(rawUserChats) : [];

  const userChatBlock: IChatBlock = { sender: 'user', chat: data.user_chat };
  itemStorage.session.set(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY, [
    ...currentChats,
    userChatBlock,
  ]);

  const delay = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;

  let lastUserChat = 'No History Yet';
  let lastYunoChat = 'No History Yet';
  if (currentChats.length >= 2) {
    const reversedChat = [...currentChats].reverse();
    const lastUserChatReversedIndex = reversedChat
      .reverse()
      .findIndex((chat) => chat.sender === 'user');
    const lastYunoChatReversedIndex = reversedChat
      .reverse()
      .findIndex((chat) => chat.sender === 'yuno');

    if (lastUserChatReversedIndex > 0 && lastYunoChatReversedIndex >= 0) {
      lastUserChat = reversedChat[lastUserChatReversedIndex].chat;
      lastYunoChat = reversedChat[lastUserChatReversedIndex - 1].chat;
    } else if (
      lastUserChatReversedIndex < lastYunoChatReversedIndex &&
      lastYunoChatReversedIndex + 1 < reversedChat.length &&
      reversedChat[lastYunoChatReversedIndex + 1].sender === 'user'
    ) {
      lastUserChat = reversedChat[lastYunoChatReversedIndex + 1].chat;
      lastYunoChat = reversedChat[lastYunoChatReversedIndex].chat;
    }
  }

  let yunoReply: string | undefined;
  try {
    const [_, response] = await Promise.all([
      new Promise((resolve) => setTimeout(resolve, delay)),
      api.post<string>('/yunogpt', {
        previous_user_input: lastUserChat,
        previous_yuno_answer: lastYunoChat,
        input_text: data.user_chat,
      }),
    ]);

    yunoReply = response.data;
  } catch (error) {
    const finalChats = [...currentChats, userChatBlock];
    itemStorage.session.set(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY, finalChats);

    handleApiResponseError(error, { withToast: true });
    return { success: false };
  }

  const yunoChatBlock: IChatBlock = {
    sender: 'yuno',
    chat: yunoReply,
  };

  const finalChats = [...currentChats, userChatBlock, yunoChatBlock];
  itemStorage.session.set(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY, finalChats);

  return { success: true };
}

function ChatContents({
  chats,
  bgPrimary,
  isProfileOpen,
}: {
  chats: IChatBlock[];
  bgPrimary: string;
  isProfileOpen: boolean;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chats.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  return (
    <div
      className={cn(
        isProfileOpen ? 'w-full md:w-[calc(100vw-300px)]' : 'w-full',
        'flex h-full max-h-screen flex-col gap-4 overflow-scroll px-4 transition-all duration-300 md:px-9'
      )}
    >
      <div className="block h-20 w-full shrink-0" />
      {chats.map((chat, index) => (
        <ChatBlock
          key={`chat_${chat.sender}_${index}`}
          chatItem={chat}
          isProfileOpen={isProfileOpen}
          bgPrimary={bgPrimary}
        />
      ))}
      <div className="block h-19.5 w-full shrink-0 md:h-24" ref={messagesEndRef} />
    </div>
  );
}

export default function YunogptToolPage({ loaderData }: Route.ComponentProps) {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [navbarStatus, setNavbarStatus] = useState<string>(loaderData.navbar_status);
  const [userTheme, setUserTheme] = useState<{ theme: string } & YunoThemeClasses>(
    loaderData.used_theme
  );

  const [roomChats, setRoomChats] = useState<IChatBlock[]>(loaderData.room_chats);
  const navigation = useNavigation();
  const loadingTimeoutRef = useRef<number | null>(null);

  const { open: openDialog } = useDialogStore();

  useEffect(() => {
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setRoomChats(loaderData.room_chats);
  }, [loaderData.room_chats]);

  function changeUserTheme(theme: YunoChatThemes) {
    itemStorage.local.set(LOCAL_STORAGE_KEY.YUNOGPT.THEME, theme);
    setUserTheme({
      theme: theme,
      ...YunoThemeMaps[theme],
    });
  }

  const submit = useSubmit();

  const methods = useRemixForm({
    mode: 'onBlur',
    defaultValues: {
      user_chat: '',
    } as UserChat,
    submitHandlers: {
      onValid: (data) => {
        const userChat: IChatBlock = { sender: 'user', chat: data.user_chat };
        setRoomChats((prev) => [...prev, userChat]);

        const loadingDelay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
        loadingTimeoutRef.current = window.setTimeout(() => {
          const loadingChat: IChatBlock = { sender: 'yuno', chat: '', isLoading: true };
          setRoomChats((prev) => [...prev, loadingChat]);
          setNavbarStatus(YUNOGPT_WRITE_ASSETS.STATUS_ONLINE);
        }, loadingDelay);

        submit(data, { method: 'POST' });
      },
    },
    resolver: valibotResolver(UserChatSchema),
  });

  const { reset, handleSubmit } = methods;
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (navigation.state === 'submitting') {
      reset();
    }
  }, [navigation.state, reset]);

  return (
    <main className="h-screen w-full bg-mauve-300">
      <ClearChatDialog />
      <ChatroomNavbar
        online_status={navbarStatus}
        theme_primary={userTheme.background_primary}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        openDialog={openDialog}
      />

      <ChatContents
        chats={roomChats}
        bgPrimary={userTheme.background_primary}
        isProfileOpen={isProfileOpen}
      />

      <ChatProfileTab
        theme_primary={userTheme.background_primary}
        theme_lighter={userTheme.background_lighter}
        isProfileOpen={isProfileOpen}
        userTheme={userTheme.theme as YunoChatThemes}
        setIsProfileOpen={setIsProfileOpen}
        setUserTheme={changeUserTheme}
        openDialog={openDialog}
      />

      <RemixFormProvider {...methods}>
        <Form
          method="POST"
          onSubmit={handleSubmit}
          className={cn(
            isProfileOpen ? 'w-full md:w-[calc(100vw-300px)]' : 'w-full',
            'fixed bottom-0 z-30 flex h-fit flex-row items-end gap-2 px-3 pb-3 transition-all duration-300 sm:gap-4 sm:px-9'
          )}
        >
          <TextareaForm
            minHeight={40}
            maxHeight={78}
            classNames={{
              wrapper: cn('w-full'),
              content: cn(
                'h-fit w-full resize-none outline-1',
                userTheme.outline,
                userTheme.focus_visible
              ),
            }}
            name="user_chat"
            placeholder={YUNOGPT_WRITE_ASSETS.INPUT_PLACEHOLDER}
            isDisabled={isSubmitting}
            isRequired
          />
          <Button
            type="submit"
            variant="default"
            size="icon"
            className={cn(
              'mb-0.5 rounded-full p-4 text-white outline-1 hover:bg-inherit/80 hover:opacity-80 [&_svg]:size-4',
              userTheme.background_primary,
              userTheme.outline
            )}
            isLoading={isSubmitting}
          >
            <SendHorizontal className={cn('stroke-2', isSubmitting && 'hidden')} />
          </Button>
        </Form>
      </RemixFormProvider>
    </main>
  );
}
