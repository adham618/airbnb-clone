"use client";

import { usePagination } from "@mantine/hooks";
import * as React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import ListingsCard from "./ListingsCard";

import { SafeListing, SafeUser } from "@/types";

type ListingsPaginationProps = {
  currentUser?: SafeUser | null | undefined;
  listings: SafeListing[];
};

export default function ListingsPagination({
  listings,
  currentUser,
}: ListingsPaginationProps) {
  const [page, onChange] = React.useState(1);

  const pagination = usePagination({
    total: listings.length,
    initialPage: 1,
    page,
    onChange,
    boundaries: 1,
    siblings: 1,
  });

  const onNextPage = React.useCallback(() => {
    pagination.next();
  }, [pagination]);

  const onPrevPage = React.useCallback(() => {
    pagination.previous();
  }, [pagination]);

  const onPageChange = React.useCallback(
    (page: number | "dots") => {
      if (page === "dots") return;

      onChange(page);
      pagination.setPage(page);
    },
    [pagination]
  );

  return (
    <section>
      <div className="layout">
        <div className="grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
            <ListingsCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
        <ul className="my-10 flex flex-wrap items-center justify-center gap-3">
          <li>
            <button
              onClick={onPrevPage}
              className="rounded-full bg-primary p-1 text-3xl text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary hover:disabled:opacity-50"
              disabled={pagination.active === 1}
            >
              <MdKeyboardArrowLeft />
            </button>
          </li>
          {pagination.range.map((page, index) => (
            <li key={index}>
              {page !== "dots" ? (
                <button
                  onClick={() => onPageChange(page)}
                  className={`${
                    pagination.active === page
                      ? "bg-primary text-white hover:cursor-not-allowed"
                      : ""
                  } flex h-10 items-center justify-center rounded-sm border-2 border-primary px-3 py-1 text-base transition hover:border-primary-hover hover:bg-primary-hover hover:text-white`}
                  disabled={pagination.active === page}
                >
                  {page}
                </button>
              ) : (
                <div className="flex h-10 items-center rounded-sm border-2 border-primary px-2.5 py-1 text-base transition hover:cursor-not-allowed hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 hover:disabled:opacity-50">
                  <BsThreeDots />
                </div>
              )}
            </li>
          ))}
          <li>
            <button
              onClick={onNextPage}
              className="rounded-full bg-primary p-1 text-3xl text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary hover:disabled:opacity-50"
              disabled={pagination.active === listings.length}
            >
              <MdKeyboardArrowRight />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
