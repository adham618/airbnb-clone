import { Metadata } from "next";

import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";

import ListingSection from "./ListingSection";
import { siteConfig } from "../../../config/site";

type Params = {
  params: { listingId: string };
};

// set dynamic metadata
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const listing = await getListingById(params);
  const description =
    listing?.description && listing?.description.length > 160
      ? listing?.description.slice(0, 160) + "..."
      : listing?.description;
  const url = `${siteConfig.url}/listings/${listing?.title.replace(
    /\s+/g,
    "-"
  )}_${listing?.id}`;
  return {
    title: listing?.title,
    description: description,
    openGraph: {
      title: listing?.title,
      description: description,
      url: url,
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
    twitter: {
      title: listing?.title,
      description: description,
      images: [listing?.image || ""],
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
