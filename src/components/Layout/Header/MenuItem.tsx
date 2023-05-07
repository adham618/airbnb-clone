"use client";

import * as React from "react";

type MenuItemsProps = {
  onClick?: () => void;
  label: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function MenuItem({ onClick, label }: MenuItemsProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 text-left font-semibold transition hover:bg-neutral-100"
    >
      {label}
    </button>
  );
}
