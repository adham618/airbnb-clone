"use client";

import * as React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useFavorite from "@/hooks/useFavorite";

import { SafeUser } from "@/types";

type HeartButtonProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};

export default function HeartButton({
  listingId,
  currentUser,
}: HeartButtonProps) {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer transition hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[1px] -top-[.8px] fill-white"
      />
      <AiFillHeart
        size="24"
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
