import * as v from 'valibot';

export type YunoThemeClasses = {
  background_primary: string;
  background_lighter: string;
  outline: string;
  focus_visible: string;
};

export const ChatBlockSchema = v.object({
  sender: v.union([v.literal('yuno'), v.literal('user')]),
  chat: v.string(),
  isLoading: v.optional(v.boolean()),
});

export const ChatBlockArraySchema = v.array(ChatBlockSchema);

export const UserChatSchema = v.object({
  user_chat: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('User message required.'),
    v.minLength(1, 'User message required.'),
    v.maxLength(1000, 'Message must be less than 1000 characters, including whitespaces.')
  ),
});

export type IChatBlock = v.InferInput<typeof ChatBlockSchema>;
export type UserChat = v.InferInput<typeof UserChatSchema>;
