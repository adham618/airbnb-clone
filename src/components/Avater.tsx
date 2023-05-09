"use client";

import Image from "next/image";

import clsxm from "@/lib/clsxm";

type AvaterProps = {
  className?: string;
  src?: string | null | undefined;
} & React.ComponentPropsWithoutRef<"div">;

export default function Avater({ className, src }: AvaterProps) {
  return (
    <Image
      className={clsxm("rounded-full", className)}
      src={src || "/images/placeholder.jpg"}
      width={30}
      height={30}
      alt="Avater"
      priority
    />
  );
}
