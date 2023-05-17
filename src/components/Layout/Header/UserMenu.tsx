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
  const ref = useClickOutside(() => setIsOpen(false));

  const onRent = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={onRent}
          className="hidden rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </button>
        <div ref={ref} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          >
            <AiOutlineMenu />
            <Avater src={currentUser?.image} className="hidden md:block" />
          </button>
          {isOpen && (
            <div className="absolute right-0 top-12 w-[40vw] max-w-[170px] overflow-hidden rounded-xl bg-white text-sm shadow-md">
              <div className="flex cursor-pointer flex-col">
                {currentUser ? (
                  <>
                    <MenuItem label="My Trips" href="/trips" />
                    <MenuItem label="My Favorites" href="/favorites" />
                    <MenuItem label="My Reservations" href="/reservations" />
                    <MenuItem label="My Properties" href="/properties" />
                    <MenuItem
                      onClick={rentModal.onOpen}
                      label="Airbnb my home"
                    />
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
      </div>
    </div>
  );
}
