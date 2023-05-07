"use client";

import Image from "next/image";

import clsxm from "@/lib/clsxm";

type AvaterProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function Avater({ className }: AvaterProps) {
  return (
    <Image
      className={clsxm("rounded-full", className)}
      src="/images/placeholder.jpg"
      width={30}
      height={30}
      alt="Avater"
      priority
    />
  );
}
