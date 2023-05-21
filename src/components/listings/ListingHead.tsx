"use client";

import * as React from "react";

import useCountries from "@/hooks/useCountries";

import BlurImage from "@/components/BlurImage";
import Heading from "@/components/Heading";
import HeartButton from "@/components/HeartButton";

import { SafeUser } from "@/types";

type Props = {
  title: string;
  image: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
};

export default function ListingHead({
  title,
  image,
  locationValue,
  id,
  currentUser,
}: Props) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative mt-4 h-[60vh] max-h-96 w-full overflow-hidden rounded-xl">
        <BlurImage
          src={image}
          alt={title}
          fill
          className="w-full object-cover"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
