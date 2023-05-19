"use client";

import * as React from "react";

import Heading from "@/components/Heading";
import ListingsCard from "@/components/listings/ListingsCard";

import { SafeListing, SafeUser } from "@/types";

type FavoritesSectionProps = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export default function FavoritesSection({
  listings,
  currentUser,
}: FavoritesSectionProps) {
  return (
    <section>
      <div className="layout py-8">
        <Heading title="Favorites" subTitle="Manage your favorite listings." />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listings.map((listing) => (
            <ListingsCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
