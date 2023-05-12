"use client";

import * as React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

import clsxm from "@/lib/clsxm";

type InputProps = {
  id: string;
  className?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

export default function TextArea({
  id,
  className,
  label,
  formatPrice,
  required,
  disabled,
  register,
  errors,
}: InputProps) {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}
      <textarea
        id={id}
        className={clsxm(
          "peer min-h-[180px] w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70",
          formatPrice ? "pl-9" : "pl-4",
          errors[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-neutral-300 focus:border-black",
          className
        )}
        disabled={disabled}
        placeholder=" "
        {...register(id, { required })}
      />
      <label
        htmlFor={id}
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 transform text-base duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${
          formatPrice ? "left-9" : "left-4"
        } ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {label}
      </label>
    </div>
  );
}
