"use client";

import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/useLoginModal";

import { categories } from "@/components/Layout/Header/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingResvervation from "@/components/listings/ListingResvervation";

import ListingComments from "./ListingComments";

import { SafeListing, SafeReservation, SafeUser } from "@/types";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

type Props = {
  reservation?: SafeReservation[] | null;
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
};

export default function ListingSection({
  listing,
  reservation = [],
  currentUser,
}: Props) {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = React.useMemo(() => {
    let dates: Date[] = [];

    reservation?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservation]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(listing.price);
  const [dateRange, setDateRange] = React.useState<Range>(initialDateRange);

  const onCreateReservation = React.useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        listingId: listing?.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success("Reservation created successfully");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, dateRange, listing, loginModal, router, totalPrice]);

  React.useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount =
        differenceInCalendarDays(dateRange.endDate, dateRange.startDate) + 1;
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = React.useMemo(() => {
    return categories.find((c) => c.label === listing.category);
  }, [listing.category]);

  return (
    <section>
      <div className="layout mx-auto max-w-3xl py-8">
        <ListingHead
          title={listing.title}
          image={listing.image}
          locationValue={listing.location}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathCount={listing.bathroomCount}
            locationValue={listing.location}
          />
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingResvervation
              price={listing.price}
              totalPrice={totalPrice}
              onChanageDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
        <ListingComments listingId={listing.id} currentUser={currentUser} />
      </div>
    </section>
  );
}
