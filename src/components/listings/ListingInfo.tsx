"use client";

import * as React from "react";
import { IconType } from "react-icons";

import useCountries from "@/hooks/useCountries";

import Avater from "@/components/Avater";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

import dynamic from "next/dynamic";

import ListingCategory from "./ListingCategory";

import { SafeUser } from "@/types";

type ListingInfoProps = {
  user?: SafeUser | null;
  category:
    | {
        label: string;
        desc?: string;
        icon: IconType;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathCount: number;
  locationValue: string;
};

export default function ListingInfo({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathCount,
  locationValue,
}: ListingInfoProps) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Avater src={user?.image} />
          <div>Hosted by {user?.name}</div>
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          label={category.label}
          desc={category.desc}
          icon={category.icon}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}
