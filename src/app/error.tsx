"use client"; // Error components must be Client Components

import { useEffect } from "react";

import EmptyState from "@/components/EmptyState";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="An error occurred"
      subTitle="Something went wrong. Please try again later."
      showReset
      onClick={() => reset()}
    />
  );
}
