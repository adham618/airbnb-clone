"use client";

import { create } from "zustand";

type useRegisterModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useRegisterModal = create<useRegisterModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useRegisterModal;
