import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import TripsSection from "./TripsSection";

export const metadata = {
  title: "Trips",
  description:
    "Manage your upcoming trips, including message threads with hosts.",
};

export default async function Trips() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subTitle="You must be signed in to view this page."
      />
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Trips"
        subTitle="You haven't booked any trips yet."
      />
    );
  }
  return (
    <main className="min-h-screen">
      <TripsSection reservations={reservations} currentUser={currentUser} />
    </main>
  );
}
