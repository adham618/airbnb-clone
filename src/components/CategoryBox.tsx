"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import * as React from "react";
import { IconType } from "react-icons";

type CategoryBoxProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
};

export default function CategoryBox({
  label,
  icon: Icon,
  selected,
}: CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = React.useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: {
      [key: string]: string | string[];
    } = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    router.push(url);
  }, [label, params, router]);
  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected
          ? "border-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
