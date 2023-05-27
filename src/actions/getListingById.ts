import { prisma } from "@/lib/prismadb";

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId?.split("_")[1],
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
            likes: true,
            // Children: {
            //   include: {
            //     Children: true,
            //   },
            // },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      comments: listing.comments.map((comment) => ({
        ...comment,
        createdAt: comment.createdAt.toString(),
        updatedAt: comment.updatedAt.toString(),
        user: {
          ...comment.user,
          createdAt: comment.user.createdAt.toString(),
          updatedAt: comment.user.updatedAt.toString(),
          emailVerified: comment.user.emailVerified?.toString() || null,
        },
        // Children: comment.Children.map((child) => ({
        //   ...child,
        //   createdAt: child.createdAt.toString(),
        //   updatedAt: child.updatedAt.toString(),
        // })),
        likes: comment.likes.map((like) => ({
          ...like,
        })),
      })),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
}
