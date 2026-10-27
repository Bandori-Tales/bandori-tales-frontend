import { FileDown, FileUp } from 'lucide-react';

import useDialogStore from '@/hooks/store/use-dialog';
import { formatDateTime } from '@/lib/utils';

import { Text } from '@/components/helper/text';
import GeneralAlertDialog from '@/components/shared/general-alert-dialog';
import { Button } from '@/components/ui/button';

import { DIALOG_KEY } from '@/constants';
import type { ProfileDriveData } from '@/schemas/models';

interface UserDataSectionProps {
  isLoginDrive: boolean;
  userLocalData: Omit<ProfileDriveData, 'global_last_update'>;
  userDriveData: ProfileDriveData | null;
  handleExport: () => Promise<void>;
  handleImport: () => Promise<void>;
}

interface DataComparionsFrameProps {
  props:
    | {
        type: 'local';
        data: Omit<ProfileDriveData, 'global_last_update'>;
      }
    | {
        type: 'drive';
        data: ProfileDriveData | null;
      };
}

function DataComparisonFrame({ props }: DataComparionsFrameProps) {
  const { type, data } = props;
  return (
    <div className="col-span-1 flex h-40 w-full flex-col gap-y-3">
      <Text type="st2" weight="semibold" className="text-foreground-lighter">
        {type === 'drive' ? 'Drive' : 'Local Storage'}
      </Text>
      <div className="flex h-full w-full flex-col items-start gap-y-2 rounded-md bg-slate-100 p-3 shadow-black/20 shadow-inner dark:bg-mauve-800">
        {data ? (
          <>
            <Text type="p" weight="semibold" className="text-foreground-lighter">
              Story Tracker
            </Text>
            <div className="flex w-full flex-col gap-y-2 pl-3 text-slate-600 dark:text-slate-300/90">
              <Text type="btn" weight="medium">
                Story Finished:{' '}
                {data.story_tracker.track_list.filter((story) => story.status === 'finish').length}
              </Text>
              <Text type="btn" weight="medium">
                Story Skipped:{' '}
                {data.story_tracker.track_list.filter((story) => story.status === 'skip').length}
              </Text>
              <Text type="btn" weight="medium">
                Last Update: {formatDateTime(new Date(data.story_tracker.last_update))}
              </Text>
            </div>
          </>
        ) : (
          <Text type="p" weight="semibold" className="text-foreground-lighter">
            No Backup Created
          </Text>
        )}
      </div>
    </div>
  );
}

export function UserDataSection({
  isLoginDrive,
  userLocalData,
  userDriveData,
  handleExport,
  handleImport,
}: UserDataSectionProps) {
  const { open: openDialog } = useDialogStore();

  return (
    <>
      <GeneralAlertDialog
        title="Export Data to Drive"
        dialogKey={DIALOG_KEY.PROFILE.EXPORT_DATA}
        description="This action will rewrite all bandori-tales data in your backup drive"
        confirmText="Export"
        useCancel
        onConfirm={handleExport}
      />
      <GeneralAlertDialog
        title="Import Data from Drive"
        dialogKey={DIALOG_KEY.PROFILE.IMPORT_DATA}
        description="This action will rewrite all bandori-tales data in your local storage"
        confirmText="Import"
        useCancel
        onConfirm={handleImport}
      />
      <div className="flex w-full flex-col gap-y-2">
        {isLoginDrive ? (
          <>
            <div className="flex w-full flex-col-reverse items-start justify-start gap-y-3 sm:flex-row sm:items-center sm:justify-between">
              <Text
                type="btn"
                weight="medium"
                className="text-slate-500 italic dark:text-slate-200/80"
              >
                Last Backup:{' '}
                {userDriveData?.global_last_update
                  ? formatDateTime(new Date(userDriveData?.global_last_update))
                  : '-'}
              </Text>
              <div className="flex flex-row gap-4">
                <Button
                  type="button"
                  leftIcon={<FileUp />}
                  onClick={() => openDialog(DIALOG_KEY.PROFILE.EXPORT_DATA)}
                >
                  Export
                </Button>

                <Button
                  type="button"
                  leftIcon={<FileDown />}
                  onClick={() => openDialog(DIALOG_KEY.PROFILE.IMPORT_DATA)}
                >
                  Import
                </Button>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-3 pt-3 sm:grid-cols-2">
              <DataComparisonFrame props={{ type: 'local', data: userLocalData }} />
              <DataComparisonFrame props={{ type: 'drive', data: userDriveData }} />
            </div>
          </>
        ) : (
          <div className="flex h-fit w-full items-center justify-center px-3 py-5">
            <Text type="p" weight="semibold" className="text-foreground-lighter">
              Not connected to google drive account..
            </Text>
          </div>
        )}
      </div>
    </>
  );
}
