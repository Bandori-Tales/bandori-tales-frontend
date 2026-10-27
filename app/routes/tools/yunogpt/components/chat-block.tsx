import { UserCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';

import type { IChatBlock } from '@/schemas/models';

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

export interface ShowPhotoProps {
  showPhoto: boolean;
  photoSource: string;
  photoType: 'icon' | 'image';
}

export function ChatBlock({
  chatItem,
  isProfileOpen,
  bgPrimary,
  showPhotoProps,
}: {
  chatItem: IChatBlock;
  isProfileOpen: boolean;
  bgPrimary: string;
  showPhotoProps: ShowPhotoProps;
}) {
  return (
    <div
      className={cn(
        'flex w-full items-baseline justify-start gap-x-4',
        chatItem.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {showPhotoProps.showPhoto && (
        <div className="flex size-10 items-center justify-center rounded-full bg-background drop-shadow-black/20 drop-shadow-md">
          {showPhotoProps.photoType === 'image' || chatItem.sender === 'yuno' ? (
            <Image
              alt={`${chatItem.sender} photo`}
              src={
                chatItem.sender === 'yuno'
                  ? '/images/tools/yunogpt/yunogpt_icon.webp'
                  : showPhotoProps.photoSource
              }
              className="size-10 rounded-full object-contain"
            />
          ) : (
            <UserCircle className="size-10 stroke-2 text-writing-dark dark:text-writing-light" />
          )}
        </div>
      )}
      <hgroup
        className={cn(
          'bubbletext relative h-fit w-fit rounded-lg px-4 py-2 drop-shadow-black/30 drop-shadow-lg',
          'before:absolute before:top-0 before:h-4 before:w-3 before:bg-inherit',
          chatItem.sender === 'user'
            ? `${bgPrimary} rounded-tr-none text-white before:-right-3 before:[clip-path:polygon(0_0,100%_0,0_100%)]`
            : 'rounded-tl-none bg-white text-mauve-700 before:-left-3 dark:bg-mauve-800 dark:text-mauve-100 before:[clip-path:polygon(0_0,100%_0,100%_100%)]',
          isProfileOpen ? 'max-w-[80%] lg:max-w-[60%]' : 'max-w-[80%] md:max-w-[45%]'
        )}
      >
        {chatItem.isLoading ? (
          <Text type="h6" weight="extrabold" className="animate-pulse">
            . . .
          </Text>
        ) : (
          <div className="wrap-anywhere flex h-fit flex-col gap-2 text-wrap font-regular text-md leading-6">
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
          </div>
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
