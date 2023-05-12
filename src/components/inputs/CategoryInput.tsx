"use client";

import * as React from "react";
import { IconType } from "react-icons";

import clsxm from "@/lib/clsxm";

type CategoryInputProps = {
  className?: string;
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
} & React.ComponentPropsWithoutRef<"button">;

export default function CategoryInput({
  className,
  selected,
  label,
  icon: Icon,
  onClick,
  ...rest
}: CategoryInputProps) {
  return (
    <button
      onClick={() => onClick(label)}
      type="button"
      className={clsxm(
        "flex w-full flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black",
        selected ? "border-black" : "border-neutral-200",
        className
      )}
      {...rest}
    >
      <Icon size={30} />
      <span className="font-semibold">{label}</span>
    </button>
  );
}
