"use client";

import * as React from "react";
import { FiHeart } from "react-icons/fi";

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
      className="cursor-pointer transition hover:opacity-80"
    >
      <FiHeart
        size={28}
        className={`stroke-white ${
          hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"
        }`}
      />
    </div>
  );
}
