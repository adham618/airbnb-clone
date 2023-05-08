"use client";

import * as React from "react";
import { IconType } from "react-icons/lib";

import clsxm from "@/lib/clsxm";

type ButtonProps = {
  className?: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  ouline?: boolean;
  small?: boolean;
  icon?: IconType;
} & React.ComponentPropsWithoutRef<"button">;

export default function Button({
  className,
  label,
  onClick,
  disabled = false,
  ouline = false,
  small = false,
  icon: Icon,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsxm(
        "relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70",
        ouline
          ? "border-black bg-white text-black"
          : "border-rose-500 bg-rose-500 text-white",
        small
          ? "border px-2 py-1 text-sm font-light"
          : "border-2 px-4 py-2 text-base font-semibold",
        className
      )}
      {...rest}
    >
      {Icon && (
        <Icon size={24} className="absolute bottom-0 left-4 top-0 my-auto" />
      )}
      {label}
    </button>
  );
}
