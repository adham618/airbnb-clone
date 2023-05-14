import { prisma } from "@/lib/prismadb";

type IParams = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservations(params: IParams) {
  try {
    const { authorId, userId, listingId } = params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (authorId) {
      query.listing = {
        userId: authorId,
      };
    }

    if (userId) {
      query.userId = userId;
    }

    if (listingId) {
      query.listingId = listingId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const SafeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return SafeReservations;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
