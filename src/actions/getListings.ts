import { prisma } from "@/lib/prismadb";

export type IListingsParams = {
  userId?: string;
};

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
