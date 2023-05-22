import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const { body, commentId } = await req.json();

  if (!commentId || typeof commentId !== "string") {
    throw new Error("Invalid ID");
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId as string },
      select: { userId: true },
    });
    if (!comment) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    if (comment.userId !== currentUser.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const result = await prisma.comment.update({
      where: {
        id: commentId as string,
      },
      data: {
        body,
      },
    });
    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
