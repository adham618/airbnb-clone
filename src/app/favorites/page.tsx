import { Metadata } from "next";

import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";

import FavoritesSection from "./FavoritesSection";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "Manage your favorite listings.",
};

export default async function Favorites() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="You must be signed in to view this page."
      />
    );
  }

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Favorites Found"
        subTitle="You haven't favorited any listings yet."
      />
    );
  }
  return (
    <main className="min-h-screen">
      <FavoritesSection listings={listings} currentUser={currentUser} />
    </main>
  );
}
