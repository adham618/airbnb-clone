"use client";

import Link from "next/link";
import * as React from "react";

import clsxm from "@/lib/clsxm";
import { useTailWindResponsive } from "@/hooks/useTailWindResponsive";

import LargeLogo from "@/assets/logo.svg";
import SmallLogo from "@/assets/SmallLogo.svg";

type indexProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function Logo({ className }: indexProps) {
  const isMd = useTailWindResponsive("md");
  return (
    <Link href="/" aria-label="logo">
      {isMd ? <LargeLogo className={clsxm(className)} /> : <SmallLogo />}
    </Link>
  );
}
