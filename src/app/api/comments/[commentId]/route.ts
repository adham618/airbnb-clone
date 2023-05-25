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

  const { commentId } = params;

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
}
