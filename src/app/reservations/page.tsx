import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

import ReservationsSection from "./ReservationsSection";

export const metadata = {
  title: "Reservations",
  description: "Bookings on your properties",
};

export default async function Reservations() {
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

  if (reservations?.length === 0 || reservations === undefined) {
    return (
      <EmptyState
        title="No Reservations"
        subTitle="You haven't booked any reservations yet."
      />
    );
  }
  return (
    <main className="min-h-screen">
      <ReservationsSection
        reservations={reservations}
        currentUser={currentUser}
      />
    </main>
  );
}
