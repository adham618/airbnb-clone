import EmptyState from "@/components/EmptyState";
import ListingsCard from "@/components/listings/ListingsCard";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/actions/getListings";

type HomeProps = {
  searchParams: IListingsParams;
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
      <section>
        <div className="layout grid grid-cols-1 gap-8 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
            <ListingsCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
