import { Comment, Like, Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt" | "comments"> & {
  createdAt: string;
  comments?: SafeComment[];
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeComment = Omit<
  Comment,
  "createdAt" | "updatedAt" | "likes" | "user" | "Children"
> & {
  createdAt: string;
  updatedAt: string;
  user: SafeUser;
  likes?: Like[];
  // Children?: SafeComment[];
};
