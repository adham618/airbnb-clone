import { Metadata } from "next";

import { prisma } from "@/lib/prismadb";

import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";

import PropertiesSection from "./PropertiesSection";

export const metadata: Metadata = {
  title: "My Properties",
  description: "List of your Properties.",
};

export default async function Properties({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUser = await getCurrentUser();
  const propertiesCount = await prisma.listing.count({
    where: {
      userId: currentUser?.id,
    },
  });

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="You must be signed in to view this page."
      />
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
    page: searchParams.page,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subTitle="You haven't listed any properties yet."
      />
    );
  }
  return (
    <main className="min-h-screen">
      <PropertiesSection
        listings={listings}
        currentUser={currentUser}
        total={Math.ceil(propertiesCount / 10)}
      />
    </main>
  );
}
