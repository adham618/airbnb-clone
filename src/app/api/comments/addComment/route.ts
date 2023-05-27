import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  try {
    const { body, listingId } = await req.json();

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }
    const result = await prisma.comment.create({
      data: {
        body: body,
        userId: currentUser.id as string,
        listingId: listingId,
      },
    });
    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
