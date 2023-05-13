"use client";

import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

import useCountries from "@/hooks/useCountries";

import Button from "@/components/Button";
import HeartButton from "@/components/HeartButton";

import { SafeUser } from "@/types";

type Props = {
  currentUser: SafeUser | null;
  data: Listing;
  reservaion?: Reservation;
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
  const router = useRouter();
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
    <div
      onClick={() =>
        router.push(
          `/listings/${data.title.replace(/\s/g, "-").toLowerCase()}-${data.id}`
        )
      }
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            src={data.image}
            fill
            alt={data.title}
          />
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
    </div>
  );
}