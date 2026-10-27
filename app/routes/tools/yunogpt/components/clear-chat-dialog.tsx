import { useRevalidator } from 'react-router';

import { itemStorage } from '@/lib/storage';

import GeneralAlertDialog from '@/components/shared/general-alert-dialog';
import { toast } from '@/components/ui/toast';

import { DIALOG_KEY, SESSION_STORAGE_KEY } from '@/constants';

export default function ClearChatDialog() {
  const { revalidate } = useRevalidator();

  async function handleClearChat() {
    itemStorage.session.remove(SESSION_STORAGE_KEY.YUNOGPT.CHAT_HISTORY);
    toast.success('Room chat has been cleared.');
    revalidate();
  }

  return (
    <GeneralAlertDialog
      title="Clear Chat"
      dialogKey={DIALOG_KEY.YUNOGPT.CLEAR_CHAT}
      description="This room chat history will be cleared"
      onConfirm={handleClearChat}
      useCancel
      cancelText="Cancel"
      confirmText="Clear"
    />
  );
}
