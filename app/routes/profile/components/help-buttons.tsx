import HelpDialog, { type HelperDialogItem } from '@/components/shared/help-dialog';

import { DIALOG_KEY } from '@/constants';

export function GoogleDriveHelpButton() {
  const helpItems: HelperDialogItem[] = [
    {
      id: 'top-part',
      type: 'text',
      content:
        'Login to google drive allows you to save your site data inside your google drive account and sync it with another device.',
    },
    // {
    //   id: 'bottom-part',
    //   type: 'text',
    //   content:
    //     'Currently, the login session is only for 1 hour. After that, you will have to re-login to your drive account. It is very suggested to login to your drive only when you want to check your backup item or about to do an export or import.',
    // },
    {
      id: 'bottom-part',
      type: 'text',
      content: 'Currently disabled, awaiting aproval from google.',
    },
  ];

  return (
    <HelpDialog
      title="Google Drive Sync"
      dialogKey={DIALOG_KEY.PROFILE.HELPER_DRIVE}
      items={helpItems}
      classname="size-5"
    />
  );
}
