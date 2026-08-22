import { create } from 'zustand';

type DialogState = {
  isOpen: Record<string, boolean>;
  open: (type: string) => void;
  close: (type: string) => void;
};

const useDialogStore = create<DialogState>((set) => ({
  isOpen: {},
  open: (type) =>
    set((state) => ({
      isOpen: { ...state.isOpen, [type]: true },
    })),
  close: (type) =>
    set((state) => {
      const newIsOpen = { ...state.isOpen };
      delete newIsOpen[type];
      return { isOpen: newIsOpen };
    }),
}));

export default useDialogStore;
