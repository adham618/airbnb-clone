import { Metadata } from "next";

import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import { siteConfig } from "@/config/site";

import ListingSection from "./ListingSection";

type Params = {
  params: { listingId: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const listing = await getListingById(params);

  return {
    title: listing?.title,
    description: listing?.description,
    openGraph: {
      title: listing?.title,
      description: listing?.description,
      url: `${siteConfig.url}/listings/${listing?.id}`,
      siteName: siteConfig.name,
      images: [
        {
          url: listing?.image || "",
          width: 1200,
          height: 630,
          alt: listing?.title,
        },
      ],
    },
  };
}

export default async function Listings({ params }: Params) {
  const listing = await getListingById(params);
  const reservation = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <main className="min-h-screen">
      <ListingSection
        listing={listing}
        reservation={reservation}
        currentUser={currentUser}
      />
    </main>
  );
}
