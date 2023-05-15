"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import toast from "react-hot-toast";

import Heading from "@/components/Heading";
import ListingsCard from "@/components/listings/ListingsCard";

import { SafeListing, SafeUser } from "@/types";

type PropertiesSectionProps = {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export default function PropertiesSection({
  listings,
  currentUser,
}: PropertiesSectionProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = React.useState("");

  const onDelete = React.useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property deleted");
          router.refresh();
        })
        .catch(() => {
          toast.error("Failed to delete property");
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
        <Heading title="Properties" subTitle="List of your Properties." />
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
            <ListingsCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onDelete}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
