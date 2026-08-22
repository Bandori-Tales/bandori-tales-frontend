/** biome-ignore-all lint/suspicious/noExplicitAny: _ */

import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRevalidator } from 'react-router';

import useDialogStore from '@/hooks/store/use-dialog';
import { itemStorage } from '@/lib/storage';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/toast';

export default function ClearChatDialog() {
  const { isOpen, close } = useDialogStore();
  const [isLoading, setIsLoading] = useState(false);
  const revalidator = useRevalidator();

  async function handleClearChat() {
    setIsLoading(true);
    try {
      itemStorage.session.remove('yuno-gpt-chats');

      revalidator.revalidate();

      setTimeout(() => {
        toast.success('Room chat has been cleared.');
        close('clear_chat');
        setIsLoading(false);

        setTimeout(() => {
          document.body.style.pointerEvents = '';
        }, 250);
      }, 250);
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error?.response?.data?.message || error?.message;
      toast.error(errorMessage);
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open && !isLoading) {
      close('clear_chat');
      setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 250);
    }
  }

  return (
    <AlertDialog open={!!isOpen.clear_chat} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Chat</AlertDialogTitle>
          <AlertDialogDescription>This room chat history will be cleared</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-red-500 disabled:opacity-50"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleClearChat();
            }}
          >
            {isLoading && <Loader2 className="mb-0.5 size-4 animate-spin" />}
            Clear
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
