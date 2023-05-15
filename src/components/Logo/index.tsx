"use client";

import Link from "next/link";
import * as React from "react";

import clsxm from "@/lib/clsxm";

import Logo from "@/assets/logo.svg";

type indexProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export default function index({ className }: indexProps) {
  return (
    <Link href="/" aria-label="logo">
      <Logo className={clsxm("hidden md:block", className)} />
    </Link>
  );
}
