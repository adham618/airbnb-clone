import * as React from "react";

import EmptyState from "@/components/EmptyState";
import ListingsInfiniteScroll from "@/components/listings/ListingsInfiniteScroll";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <main className="min-h-screen">
      {/* <section>
        <div className="layout grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
            <ListingsCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
      </section> */}
      <ListingsInfiniteScroll currentUser={currentUser} />
      {/* <ListingsPagination listings={listings} currentUser={currentUser} /> */}
    </main>
  );
}
