import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export default async function DELETE(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const { commentId } = await req.json();

    if (!commentId || typeof commentId !== "string") {
      throw new Error("Invalid ID");
    }
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

    const result = await prisma.comment.delete({
      where: {
        id: commentId as string,
      },
    });

    return NextResponse.json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.log(err);
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
