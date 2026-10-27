import HelpDialog, { type HelperDialogItem } from '@/components/shared/help-dialog';

import { DIALOG_KEY } from '@/constants';

export function CropResultHelpButton() {
  const helpItems: HelperDialogItem[] = [
    {
      id: 'crop-image',
      type: 'image',
      content: '/images/help/stamp_generator_crop_result.webp',
    },
    {
      id: 'crop-explain',
      type: 'text',
      content:
        'Enabling the crop result setting will remove transparent paddings in each side of the result image.',
    },
  ];

  return (
    <HelpDialog
      title="Crop Result"
      dialogKey={DIALOG_KEY.STAMP_GENERATOR.HELPER_CROP}
      items={helpItems}
      classname="size-5 text-foreground-lighter"
    />
  );
}
