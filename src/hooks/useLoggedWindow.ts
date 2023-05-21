"use client";

import { create } from "zustand";

type useLoggedWindowProps = {
  isLogged: boolean;
  setLogged: () => void;
};

const useLoggedWindow = create<useLoggedWindowProps>((set) => ({
  isLogged: false,
  setLogged: () => set({ isLogged: true }),
}));
export default useLoggedWindow;
