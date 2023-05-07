import * as React from "react";

import UserMenu from "@/components/Layout/Header/UserMenu";
import Logo from "@/components/Logo";

import Search from "./Search";

export default function header() {
  return (
    <header className="sticky top-0 z-10  w-full  bg-white/75 shadow-sm backdrop-blur-lg">
      <div className="border-b py-4">
        <div className="layout flex items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
