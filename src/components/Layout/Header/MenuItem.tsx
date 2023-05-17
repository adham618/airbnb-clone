"use client";

import Link from "next/link";
import * as React from "react";

type MenuItemsProps = {
  onClick?: () => void;
  label: string;
  href?: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function MenuItem({ onClick, label, href }: MenuItemsProps) {
  return (
    <>
      {href ? (
        <Link
          href={href}
          className="px-4 py-3 text-left font-semibold transition hover:bg-neutral-100"
        >
          {label}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="px-4 py-3 text-left font-semibold transition hover:bg-neutral-100"
        >
          {label}
        </button>
      )}
    </>
  );
}
