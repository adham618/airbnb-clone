"use client";

import * as React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CounterProps = {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
};

export default function Counter({
  title,
  subTitle,
  value,
  onChange,
}: CounterProps) {
  const onIncrement = React.useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onDecrement = React.useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="font-medium">{title}</h3>
        <p className="font-light text-gray-600">{subTitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 transition-opacity hover:opacity-80"
          onClick={onDecrement}
        >
          <AiOutlineMinus />
        </button>
        <span className="font-medium">{value}</span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-400 transition-opacity hover:opacity-80"
          onClick={onIncrement}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}
