"use client";

import * as React from "react";
import { Range } from "react-date-range";

import Button from "@/components/Button";
import Calendar from "@/components/inputs/Calendar";

type ListingResvervationProps = {
  price: number;
  totalPrice: number;
  onChanageDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

export default function ListingResvervation({
  price,
  totalPrice,
  onChanageDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: ListingResvervationProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${price}</div>
        <div className="font-light text-neutral-600">/ night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        onChange={(value) => onChanageDate(value.selection)}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button label="Reserve" onClick={onSubmit} disabled={disabled} />
      </div>
      <div className="flex items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
}
