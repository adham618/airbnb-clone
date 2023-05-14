import { prisma } from "@/lib/prismadb";

export default async function getListingById(params: { listingId?: string }) {
  try {
    const { listingId } = params;
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return null;
    }
    return {
      ...listing,
      createdAt: listing.created_at?.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt?.toISOString(),
        updatedAt: listing.user.updatedAt?.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
