import { CircleQuestionMark } from 'lucide-react';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import Image from '../helper/image';
import { Text } from '../helper/text';
import GeneralDialog from './general-dialog';

export interface HelperDialogItem {
  id: string;
  type: 'text' | 'image';
  title?: string;
  content: string;
  caption?: string;
}

interface HelpDialogProps {
  title: string;
  dialogKey: string;
  items: HelperDialogItem[];
  description?: string;
  classname?: string;
}

export default function HelpDialog({
  title,
  dialogKey,
  items,
  description = '',
  classname,
}: HelpDialogProps) {
  const { open: openDialog } = useDialogStore();

  return (
    <>
      <GeneralDialog title={title} dialogKey={dialogKey} description={description} hideConfirm>
        <div className="flex max-h-100 w-full flex-col gap-2 overflow-y-auto pr-2">
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className={cn(
                  'flex w-full flex-col justify-start gap-1 pb-2',
                  item.type === 'image' ? 'items-center' : 'items-start'
                )}
              >
                {item.title && (
                  <Text type="st1" weight="semibold" className="text-black">
                    {item.title}
                  </Text>
                )}
                {item.type === 'image' ? (
                  <Image alt={`Media ${item.id}`} src={item.content} className="h-auto w-[90%]" />
                ) : (
                  <Text type="p" weight="medium" lineHeight={5} className="text-slate-900">
                    {item.content}
                  </Text>
                )}
                {item.caption && (
                  <Text type="c" weight="regular" className="text-slate-600">
                    {item.caption}
                  </Text>
                )}
              </div>
            );
          })}
        </div>
      </GeneralDialog>

      <button
        type="button"
        className={cn(
          'flex size-8 items-center justify-center rounded-full bg-transparent text-primary transition-colors duration-300 hover:text-amber-400',
          classname
        )}
        onClick={() => openDialog(dialogKey)}
      >
        <CircleQuestionMark className="h-auto w-full text-inherit" />
      </button>
    </>
  );
}
