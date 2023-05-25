import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

type IParams = {
  commentId?: string;
};

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  try {
    const { commentId } = params;
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
    if (!commentId || typeof commentId !== "string") {
      throw new Error("Invalid ID");
    }

    const deleteComment = await prisma.comment.deleteMany({
      where: {
        id: commentId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(deleteComment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
