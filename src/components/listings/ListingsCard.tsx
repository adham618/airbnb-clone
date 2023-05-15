"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import useCountries from "@/hooks/useCountries";

import Button from "@/components/Button";
import HeartButton from "@/components/HeartButton";

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
    <div className="group col-span-1">
      <div className="flex w-full flex-col gap-2">
        <Link
          href={`/listings/${data.id}`}
          className="relative aspect-square w-full overflow-hidden rounded-xl"
        >
          <Image
            className="h-full w-full cursor-pointer object-cover transition duration-300 group-hover:scale-110"
            src={data.image}
            fill
            alt={data.title}
          />
          <div className="absolute right-2 top-2">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </Link>
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
    </div>
  );
}
