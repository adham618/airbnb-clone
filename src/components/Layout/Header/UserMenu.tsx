"use client";

import { useClickOutside } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import * as React from "react";
import { AiOutlineMenu } from "react-icons/ai";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useRentModal from "@/hooks/useRentModal";

import Avater from "@/components/Avater";

import MenuItem from "./MenuItem";

import { SafeUser } from "@/types";

export default function UserMenu({
  currentUser,
}: {
  currentUser?: SafeUser | null;
}) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => setIsOpen((prev) => !prev), []);
  const ref = useClickOutside(() => setIsOpen(false));

  const onRent = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          onClick={onRent}
          className="hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </button>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <Avater src={currentUser?.image} className="hidden md:block" />
        </div>
      </div>
      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
        >
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem onClick={loginModal.onOpen} label="My Trips" />
                <MenuItem onClick={registerModal.onOpen} label="My Favorites" />
                <MenuItem
                  // onClick={registerModal.onOpen}
                  label="My Reservations"
                />
                <MenuItem
                  // onClick={registerModal.onOpen}
                  label="My properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  label="Sign Out"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
