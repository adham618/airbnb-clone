"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

import Button from "@/components/Button";
import Heading from "@/components/Heading";

type EmptyStateProps = {
  title?: string;
  subTitle?: string;
  showReset?: React.ReactNode;
  onClick?: () => void;
};

export default function EmptyState({
  title = "No results found",
  subTitle = "Try adjusting your search or filter to find what you are looking for.",
  showReset,
  onClick,
}: EmptyStateProps) {
  const router = useRouter();
  const onReset = React.useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  }, [onClick, router]);

  return (
    <section>
      <div className="layout flex h-[60vh] flex-col items-center justify-center gap-2">
        <Heading center title={title} subTitle={subTitle} />
        {showReset && (
          <Button
            className="mt-4 w-48"
            outline
            label="Reset Filters"
            onClick={onReset}
          />
        )}
      </div>
    </section>
  );
}
