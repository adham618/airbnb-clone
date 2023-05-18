"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import ListingsCard from "./ListingsCard";

import { SafeListing, SafeUser } from "@/types";

type ListingsPaginationProps = {
  currentUser?: SafeUser | null | undefined;
};

type UserQueryParams = {
  take?: number;
  lastCursor?: string;
};
const allListings = async ({ take, lastCursor }: UserQueryParams) => {
  const response = await axios.get("/api/listings", {
    params: { take, lastCursor },
  });
  return response?.data;
};

export default function ListingsInfiniteScroll({
  currentUser,
}: ListingsPaginationProps) {
  const { ref, inView } = useInView();
  // useInfiniteQuery is a hook that accepts a queryFn and queryKey and returns the result of the queryFn
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = "" }) =>
      allListings({ take: 10, lastCursor: pageParam }),
    queryKey: ["listings"],
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  React.useEffect(() => {
    // if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (isError)
    return (
      <div className="mt-10">
        {"An error has occurred: " + JSON.stringify(error)}
      </div>
    );
  if (isLoading) return <div className="loading">Loading...</div>;

  // console.log("data:",data);

  return (
    <section>
      <div className="layout">
        <div className="grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {isSuccess &&
            data?.pages.map((page) =>
              page.data.map((listing: SafeListing, index: number) => {
                // if the last element in the page is in view, add a ref to it
                if (page.data.length === index + 1) {
                  return (
                    <div ref={ref} key={index}>
                      <ListingsCard
                        key={listing.id}
                        currentUser={currentUser}
                        data={listing}
                      />
                    </div>
                  );
                } else {
                  return (
                    <ListingsCard
                      key={listing.id}
                      currentUser={currentUser}
                      data={listing}
                    />
                  );
                }
              })
            )}

          {isFetchingNextPage && <p className="mb-4">Loading...</p>}
        </div>
      </div>
    </section>
  );
}
