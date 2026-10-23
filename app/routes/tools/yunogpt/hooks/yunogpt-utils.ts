import { api } from '@/lib/axios';
import { itemStorage } from '@/lib/storage';
import { handleApiResponseError } from '@/lib/utils';

import { SESSION_STORAGE_KEY } from '@/constants';
import type { IChatBlock, UserChat } from '@/schemas/models';

import { getUserChats } from './get-yunogpt';

export async function sendUserChat(data: UserChat) {
  const currentChats = getUserChats();
  const userChatBlock: IChatBlock = { sender: 'user', chat: data.user_chat };

  itemStorage.session.set(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY, [
    ...currentChats,
    userChatBlock,
  ]);

  const DELAY = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;

  let lastUserChat = 'No History Yet';
  let lastYunoChat = 'No History Yet';
  if (currentChats.length >= 2) {
    const reversedChat = [...currentChats].reverse();
    const lastUserChatReversedIndex = reversedChat.findIndex((chat) => chat.sender === 'user');
    const lastYunoChatReversedIndex = reversedChat.findIndex((chat) => chat.sender === 'yuno');

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
      new Promise((resolve) => setTimeout(resolve, DELAY)),
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
