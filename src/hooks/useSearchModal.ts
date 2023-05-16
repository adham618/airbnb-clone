"use client";

import { create } from "zustand";

type useSearchModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSearchModal = create<useSearchModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useSearchModal;
