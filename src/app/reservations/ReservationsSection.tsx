"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-hot-toast";

import Heading from "@/components/Heading";
import ListingsCard from "@/components/listings/ListingsCard";

import { SafeReservation, SafeUser } from "@/types";

type TripsSectionProps = {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

export default function ReservationsSection({
  reservations,
  currentUser,
}: TripsSectionProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState("");

  const onCancel = React.useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Failed to cancel reservation");
          setDeletingId("");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <section>
      <div className="layout py-8">
        <Heading title="Reservations" subTitle="Bookings on your properties" />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {reservations.map((reservation) => (
            <ListingsCard
              key={reservation.id}
              currentUser={currentUser}
              reservaion={reservation}
              data={reservation.listing}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest Reservation"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
