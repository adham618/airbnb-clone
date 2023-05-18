"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";

import Loader from "@/components/Loader";

import ListingsCard from "./ListingsCard";

import { SafeListing, SafeUser } from "@/types";

type ListingsPaginationProps = {
  currentUser?: SafeUser | null | undefined;
};

type UserQueryParams = {
  take?: number;
  lastCursor?: string;
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  category?: string;
};

const allListings = async ({
  take,
  lastCursor,
  userId,
  guestCount,
  roomCount,
  bathroomCount,
  startDate,
  endDate,
  location,
  category,
}: UserQueryParams) => {
  const response = await axios.get("/api/listings", {
    params: {
      take,
      lastCursor,
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      location,
      category,
    },
  });
  return response?.data;
};

export default function ListingsInfiniteScroll({
  currentUser,
}: ListingsPaginationProps) {
  const { ref, inView } = useInView();
  const params = useSearchParams();

  const userId = params?.get("userId");
  const guestCount = params?.get("guestCount");
  const roomCount = params?.get("roomCount");
  const bathroomCount = params?.get("bathroomCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const location = params?.get("location");
  const category = params?.get("category");

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
      allListings({
        take: 10,
        lastCursor: pageParam,
        userId: userId || undefined,
        guestCount: guestCount ? Number(guestCount) : undefined,
        roomCount: roomCount ? Number(roomCount) : undefined,
        bathroomCount: bathroomCount ? Number(bathroomCount) : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        location: location || undefined,
        category: category || undefined,
      }),
    queryKey: [
      "listings",
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      location,
      category,
    ],
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
  if (isLoading) return <Loader />;

  // console.log("data:",data);

  return (
    <section>
      <div className="layout py-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
        </div>
        {isFetchingNextPage && (
          <div className="mt-8 flex justify-center">
            <BeatLoader color="#FF385C" />
          </div>
        )}
      </div>
    </section>
  );
}
