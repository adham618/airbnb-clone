"use client";

import { Listing, Reservation } from "@prisma/client";
import * as React from "react";

import { categories } from "@/components/Layout/Header/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";

import { SafeUser } from "@/types";

type Props = {
  reservation?: Reservation[];
  listing: Listing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

export default function ListingSection({ listing, currentUser }: Props) {
  const category = React.useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);

  return (
    <section>
      <div className="layout mx-auto max-w-2xl py-8">
        <ListingHead
          title={listing.title}
          image={listing.image}
          locationValue={listing.location}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.questCount}
            bathCount={listing.bathroomCount}
            locationValue={listing.location}
          />
        </div>
      </div>
    </section>
  );
}
