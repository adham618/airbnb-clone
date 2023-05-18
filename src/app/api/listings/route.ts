import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await req.json();
  const {
    title,
    description,
    image,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      image,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}

// get listings

export async function GET(req: Request) {
  try {
    // get page and lastCursor from query
    const url = new URL(req.url);

    const take = url.searchParams.get("take");
    const lastCursor = url.searchParams.get("lastCursor");

    const userId = url.searchParams.get("userId");
    const category = url.searchParams.get("category");
    const roomCount = url.searchParams.get("roomCount");
    const guestCount = url.searchParams.get("guestCount");
    const bathroomCount = url.searchParams.get("bathroomCount");
    const location = url.searchParams.get("location");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (location) {
      query.location = location;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }
    const result = await prisma.listing.findMany({
      take: take ? parseInt(take as string) : 10,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor as string,
        },
      }),
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (result.length == 0) {
      return new Response(
        JSON.stringify({
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        }),
        { status: 200 }
      );
    }

    const lastPostInResults = result[result.length - 1];
    const cursor = lastPostInResults.id;

    const nextPage = await prisma.listing.findMany({
      // Same as before, limit the number of events returned by this query.
      take: take ? parseInt(take as string) : 7,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
    });

    const data = {
      data: result.map((listing) => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      })),
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };

    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 }
    );
  }
}
