"use client";

import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { BiSearch } from "react-icons/bi";

import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";

export default function Search() {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const location = params?.get("location");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = React.useMemo(() => {
    if (location) {
      return getByValue(location)?.label;
    }
    return "Anywhere";
  }, [location, getByValue]);

  const durationLabel = React.useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff + 1} Days`;
    }
    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = React.useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guest${Number(guestCount) > 1 ? "s" : ""}`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full cursor-pointer rounded-full border py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold">{locationLabel}</div>
        <div className="hidden flex-1 border-x px-6 text-center text-sm font-semibold sm:block">
          {durationLabel}
        </div>
        <div className="flex items-center gap-3 pl-6 pr-2 text-sm font-semibold text-gray-600">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
