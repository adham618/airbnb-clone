import { Metadata } from "next";

import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <EmptyState
      title="Page Not Found"
      subTitle="Sorry, this page does not exist."
      showReset
      resetLabel="Go Home"
    />
  );
}
