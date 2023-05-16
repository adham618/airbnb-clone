"use client";

import ProgressBar from "next-nprogress-bar";
import * as React from "react";

export default function NProgress() {
  return (
    <ProgressBar
      height="3px"
      color="#FF385C"
      options={{ showSpinner: false }}
      shallowRouting
      appDirectory
    />
  );
}
