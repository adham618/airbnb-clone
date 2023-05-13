"use client";

import { create } from "zustand";

type useLoginModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useLoginModal = create<useLoginModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useLoginModal;
