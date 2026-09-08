import { X } from 'lucide-react';
import { useState } from 'react';

import useDialogStore from '@/hooks/store/use-dialog';
import { cn } from '@/lib/utils';

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

type GeneralDialogProps = {
  dialogKey: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  useCancel?: boolean;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
  confirmClassName?: string;
  cancelClassname?: string;
  disabledConfirm?: boolean;
  children?: React.ReactNode;
};

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
  children,
}: GeneralDialogProps) {
  const { isOpen, close } = useDialogStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;
    try {
      setIsSubmitting(true);
      await onConfirm();
      close(dialogKey);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    close(dialogKey);
    onCancel?.();
  };

  return (
    <AlertDialog
      open={isOpen[dialogKey]}
      onOpenChange={(open) => {
        if (!open && !isSubmitting) {
          close(dialogKey);
          onCancel?.();
        }
      }}
    >
      <AlertDialogContent className="max-w-sm bg-white sm:max-w-xl lg:max-w-2xl">
        <AlertDialogCancel className="absolute top-4 right-4 rounded-full border-none p-1 shadow-none">
          <X size={18} />
        </AlertDialogCancel>

        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="font-semibold text-lg text-primary">
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-gray-500 text-sm">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {children}

        <AlertDialogFooter className="mt-4">
          {useCancel && (
            <AlertDialogCancel
              disabled={isSubmitting}
              className={cn(cancelClassname, isSubmitting && 'cursor-not-allowed opacity-70')}
              onClick={handleCancel}
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            type="submit"
            disabled={isSubmitting || disabledConfirm}
            className={cn(confirmClassName, isSubmitting && 'cursor-not-allowed opacity-70')}
            onClick={handleConfirm}
          >
            {isSubmitting ? 'Processing' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
