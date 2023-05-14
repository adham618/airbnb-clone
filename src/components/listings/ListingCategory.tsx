"use client";

import * as React from "react";
import { IconType } from "react-icons";

type ListingCategoryProps = {
  label: string;
  desc?: string;
  icon: IconType;
};

export default function ListingCategory({
  label,
  desc,
  icon: Icon,
}: ListingCategoryProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <p className="font-light text-neutral-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}
