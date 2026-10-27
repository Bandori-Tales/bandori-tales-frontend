import { X } from 'lucide-react';
import { useState } from 'react';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import type { GeneralDialogProps } from './general-alert-dialog';

export default function GeneralDialog({
  dialogKey,
  title,
  description,
  useCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmClassName = '',
  cancelClassname = '',
  disabledConfirm = false,
  hideConfirm = false,
  preventConfirmClose = false,
  children,
}: GeneralDialogProps) {
  const { isOpen, close } = useDialogStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;
    try {
      setIsSubmitting(true);
      await onConfirm();
      if (!preventConfirmClose) {
        close(dialogKey);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    close(dialogKey);
    onCancel?.();
  };

  return (
    <Dialog
      open={isOpen[dialogKey]}
      onOpenChange={(open) => {
        if (!open && !isSubmitting) {
          close(dialogKey);
          onCancel?.();
        }
      }}
    >
      <DialogContent
        className="max-w-sm bg-white sm:max-w-xl lg:max-w-2xl dark:bg-mauve-900"
        showCloseButton={false}
      >
        <DialogClose className="absolute top-4 right-4 rounded-full border-none bg-transparent p-1 shadow-none transition-colors hover:bg-black/5 dark:hover:bg-white/5">
          <X size={18} className="text-foreground" />
        </DialogClose>

        <DialogHeader className="space-y-2">
          <DialogTitle className="text-foreground">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-gray-500 text-sm dark:text-gray-200">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}

        <DialogFooter>
          {useCancel && (
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className={cn(
                  'text-sm hover:bg-black/5 dark:hover:bg-white/5',
                  cancelClassname,
                  isSubmitting && 'cursor-not-allowed opacity-70'
                )}
                onClick={handleCancel}
              >
                {cancelText}
              </Button>
            </DialogClose>
          )}

          {!hideConfirm && (
            <Button
              type="submit"
              disabled={isSubmitting || disabledConfirm}
              className={cn(
                'text-sm',
                confirmClassName,
                isSubmitting && 'cursor-not-allowed opacity-70'
              )}
              onClick={handleConfirm}
            >
              {confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
