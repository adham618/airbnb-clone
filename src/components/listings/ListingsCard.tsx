"use client";

import { format } from "date-fns";
import Link from "next/link";
import * as React from "react";
import { Suspense } from "react";

import useCountries from "@/hooks/useCountries";

import BlurImage from "@/components/BlurImage";
import Button from "@/components/Button";
import HeartButton from "@/components/HeartButton";
import Skeleton from "@/components/Skeleton";

import { SafeListing, SafeReservation, SafeUser } from "@/types";

type Props = {
  currentUser: SafeUser | null | undefined;
  data: SafeListing;
  reservaion?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};
export default function ListingsCard({
  currentUser,
  data,
  reservaion,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}: Props) {
  const { getByValue } = useCountries();

  const location = getByValue(data.location);

  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (disabled) return;
      if (onAction) {
        onAction(actionId);
      }
    },
    [disabled, onAction, actionId]
  );

  const price = React.useMemo(() => {
    if (reservaion) {
      return reservaion.totalPrice;
    }
    return data.price;
  }, [data.price, reservaion]);

  const resvervationDate = React.useMemo(() => {
    if (!reservaion) return null;
    const start = new Date(reservaion.startDate);
    const end = new Date(reservaion.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservaion]);

  return (
    <div className="group col-span-1 flex w-full flex-col gap-2">
      <div className="relative flex w-full overflow-hidden rounded-xl">
        <Link
          href={`/listings/${data.title.replace(/\s+/g, "-")}_${data.id}`}
          className="flex aspect-square w-full overflow-hidden rounded-xl"
          aria-label="View Listing"
        >
          <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <BlurImage
              className="h-full w-full cursor-pointer object-cover transition duration-300 group-hover:scale-110"
              src={data.image}
              fill
              sizes="100%"
              alt={data.title}
            />
          </Suspense>
        </Link>
        <div className="absolute right-2 top-2">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>
      <div className="text-lg font-semibold">
        {location?.region}, {location?.label}
      </div>
      <div className="font-light text-neutral-500">
        {resvervationDate || data.category}
      </div>
      <div className="flex items-center gap-1">
        <div className="font-semibold">${price}</div>
        {!reservaion && <div className="font-light">/ night</div>}
      </div>
      {onAction && actionLabel && (
        <Button
          onClick={handleCancel}
          label={actionLabel}
          small
          disabled={disabled}
        />
      )}
    </div>
  );
}
