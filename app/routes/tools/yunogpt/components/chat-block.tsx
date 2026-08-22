import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';

export type IChatBlock = {
  sender: 'yuno' | 'user';
  chat: string;
  isLoading?: boolean;
};

const blockedElements = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'pre',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
];

export function ChatBlock({
  chatItem,
  isProfileOpen,
  bgPrimary,
}: {
  chatItem: IChatBlock;
  isProfileOpen: boolean;
  bgPrimary: string;
}) {
  return (
    <div
      className={cn(
        'flex w-full flex-row items-baseline',
        chatItem.sender === 'user' ? 'justify-end' : 'justify-baseline'
      )}
    >
      <hgroup
        className={cn(
          'bubbletext relative h-fit w-fit rounded-lg px-4 py-2 shadow-black/50 drop-shadow-xl',
          'before:absolute before:top-0 before:h-4 before:w-3 before:bg-inherit',
          chatItem.sender === 'user'
            ? `${bgPrimary} rounded-tr-none text-white before:-right-3 before:[clip-path:polygon(0_0,100%_0,0_100%)]`
            : 'rounded-tl-none bg-white text-mauve-700 before:-left-3 before:[clip-path:polygon(0_0,100%_0,100%_100%)]',
          isProfileOpen ? 'max-w-[80%] lg:max-w-[60%]' : 'max-w-[80%] md:max-w-[45%]'
        )}
      >
        {chatItem.isLoading ? (
          <Text type="h6" weight="extrabold" className="animate-pulse">
            . . .
          </Text>
        ) : (
          <Text
            type="p"
            weight="medium"
            lineHeight={5}
            className="wrap-anywhere flex h-fit flex-col gap-2 text-wrap"
          >
            <ReactMarkdown
              disallowedElements={blockedElements}
              unwrapDisallowed
              remarkPlugins={[remarkBreaks]}
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {chatItem.chat}
            </ReactMarkdown>
          </Text>
        )}
      </hgroup>
      <style>
        {`
          .bubbletext a {
            color: blue;
            text-decoration: underline;
          }
          .bubbletext code {
            background-color: rgba(0, 0, 0, 0.1)
          }
        `}
      </style>
    </div>
  );
}
