"use client";

import * as React from "react";

type HeadingProps = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

export default function Heading({ title, subTitle, center }: HeadingProps) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-2 font-light text-neutral-500">{subTitle}</p>
    </div>
  );
}
