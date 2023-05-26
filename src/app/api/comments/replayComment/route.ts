import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  try {
    const { body, commentId, listingId } = await req.json();

    if (!commentId || typeof commentId !== "string") {
      throw new Error("Invalid ID");
    }
    const result = await prisma.comment.create({
      data: {
        body: body,
        userId: currentUser.id as string,
        // parentId: commentId,
        listingId: listingId,
      },
      include: {
        // Children: {
        //   include: {
        //     Children: true,
        //   },
        // },
      },
    });
    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
