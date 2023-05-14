"use client";

import * as React from "react";

import UserMenu from "@/components/Layout/Header/UserMenu";
import Logo from "@/components/Logo";

import Categories from "./Categories";
import Search from "./Search";

import { SafeUser } from "@/types";

type HeaderProps = {
  currentUser?: SafeUser | null;
};
export default function header({ currentUser }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10  w-full  bg-white/95 shadow-sm backdrop-blur-lg">
      <div className="border-b py-4">
        <div className="layout flex items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </div>
      <Categories />
    </header>
  );
}
