import EmptyState from "@/components/EmptyState";
import ListingSection from "@/components/listings/ListingSection";

import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";

export default async function Listings({
  params,
}: {
  params: { listingId: string };
}) {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <main className="min-h-screen">
      <ListingSection listing={listing} currentUser={currentUser} />
    </main>
  );
}
