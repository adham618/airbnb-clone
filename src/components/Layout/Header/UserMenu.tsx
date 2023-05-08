"use client";

import { useClickOutside } from "@mantine/hooks";
import * as React from "react";
import { AiOutlineMenu } from "react-icons/ai";

import useRegisterModal from "@/hooks/useRegisterModal";

import Avater from "@/components/Avater";

import MenuItem from "./MenuItem";

export default function UserMenu() {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => setIsOpen((prev) => !prev), []);
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          // onClick={() => { }}
          className="hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </button>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <Avater className="hidden md:block" />
        </div>
      </div>
      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
        >
          <div className="flex cursor-pointer flex-col">
            <>
              <MenuItem
                // onClick={ }
                label="Login"
              />
              <MenuItem onClick={registerModal.onOpen} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
}
