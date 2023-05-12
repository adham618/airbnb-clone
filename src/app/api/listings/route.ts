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
    questCount,
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
      questCount,
      location: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
