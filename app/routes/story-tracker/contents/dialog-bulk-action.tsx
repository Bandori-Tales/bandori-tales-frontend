import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import GeneralDialog from '@/components/shared/general-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DIALOG_KEY } from '@/constants';
import type { BandoriStory, IReadingStatus } from '@/schemas/models';

interface dropdownItemMap {
  label: string;
  color: string;
}

const targetStoryItem: (IReadingStatus | 'all' | 'unread')[] = ['all', 'unread', 'skip', 'finish'];
const targetStoryMap: Record<IReadingStatus | 'all' | 'unread', dropdownItemMap> = {
  all: {
    label: 'All Stories',
    color: 'text-rose-900',
  },
  unread: {
    label: 'Unread Stories',
    color: 'text-red-600',
  },
  skip: {
    label: 'Skipped Stories',
    color: 'text-purple-600',
  },
  finish: {
    label: 'Finished Stories',
    color: 'text-green-600',
  },
};

const updateStatusItem: (IReadingStatus | 'unread')[] = ['unread', 'skip', 'finish'];
const updateStatusMap: Record<IReadingStatus | 'unread', dropdownItemMap> = {
  unread: {
    label: 'Unread',
    color: 'text-red-600',
  },
  skip: {
    label: 'Skipped',
    color: 'text-purple-600',
  },
  finish: {
    label: 'Finished',
    color: 'text-green-600',
  },
};

function TargetStoryDropdown<T>({
  targetStory,
  setTargetStory,
  dropdownList,
  targetMap,
}: {
  targetStory?: T;
  setTargetStory: (target: T) => void;
  dropdownList: T[];
  targetMap: Record<string, dropdownItemMap>;
}) {
  return (
    <div className="w-48 border-b border-b-primary">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full flex-row items-center justify-between">
          <Text
            weight="medium"
            className={cn(targetStory ? targetMap[targetStory as string].color : 'text-primary')}
          >
            {targetStory ? targetMap[targetStory as string].label : ''}
          </Text>
          <ChevronDown
            className={cn(targetStory ? targetMap[targetStory as string].color : 'text-primary')}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-1">
          {dropdownList.map((item) => (
            <Button key={`target_${item}`} asChild onClick={() => setTargetStory(item)}>
              <DropdownMenuItem className="bg-transparent hover:bg-black/5">
                <Text weight="medium" className={cn(targetMap[item as string].color)}>
                  {targetMap[item as string].label}
                </Text>
              </DropdownMenuItem>
            </Button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function BulkActionDialog({
  stories,
  bulkUpdateStatus,
}: {
  stories: (BandoriStory & { status?: IReadingStatus })[];
  bulkUpdateStatus: (
    target: IReadingStatus | ('unread' | 'all'),
    updatedStatus: IReadingStatus | 'unread'
  ) => void;
}) {
  const [targetStory, setTargetStory] = useState<IReadingStatus | 'all' | 'unread' | null>(null);
  const [updateStatus, setUpdateStatus] = useState<IReadingStatus | 'unread' | null>(null);

  function handleBulkUpdateStatus() {
    if (!targetStory || !updateStatus) return;
    bulkUpdateStatus(targetStory, updateStatus);

    setTargetStory(null);
    setUpdateStatus(null);
  }

  function handleCloseDialog() {
    setTargetStory(null);
    setUpdateStatus(null);
  }

  return (
    <GeneralDialog
      dialogKey={DIALOG_KEY.STORY_TRACKER.BULK_ACTION}
      title="Batch Update Stories"
      description="Only the current filtered stories will be used in batch update. Make sure you have set your filter properly."
      useCancel
      confirmText="Go!"
      cancelText="Cancel"
      disabledConfirm={!targetStory || !updateStatus}
      onConfirm={handleBulkUpdateStatus}
      onCancel={handleCloseDialog}
    >
      <div className="flex w-full flex-col items-start justify-center gap-3">
        <div className="flex w-full items-center justify-start gap-3">
          <Text type="p" weight="bold">
            Set
          </Text>
          {TargetStoryDropdown<IReadingStatus | 'all' | 'unread' | null>({
            targetStory: targetStory,
            setTargetStory: setTargetStory,
            targetMap: targetStoryMap,
            dropdownList: targetStoryItem,
          })}
          <Text type="p" weight="bold">
            to
          </Text>
          {TargetStoryDropdown<IReadingStatus | 'unread' | null>({
            targetStory: updateStatus,
            setTargetStory: setUpdateStatus,
            targetMap: updateStatusMap,
            dropdownList: updateStatusItem,
          })}
        </div>

        {targetStory && (
          <Text type="c" weight="medium" className="text-start text-primary">
            {targetStory === 'all'
              ? stories.length
              : stories.filter((story) => {
                  switch (targetStory) {
                    case 'skip':
                      return story.status === 'skip';
                    case 'finish':
                      return story.status === 'finish';
                    case 'unread':
                      return story.status !== 'skip' && story.status !== 'finish';
                  }
                }).length}{' '}
            Stories will be affected
          </Text>
        )}
      </div>
    </GeneralDialog>
  );
}
