import * as v from 'valibot';

export const UserChatSchema = v.object({
  user_chat: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('User message required.'),
    v.minLength(1, 'User message required.'),
    v.maxLength(1000, 'Message must be less than 1000 characters, including whitespaces.')
  ),
});

export type UserChat = v.InferInput<typeof UserChatSchema>;
