import { NextResponse } from "next/server";

import { prisma } from "@/lib/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { commentId } = await req.json();
  if (!commentId || typeof commentId !== "string") {
    throw new Error("Invalid ID");
  }
  const prismaUser = await prisma.user.findUnique({
    where: { email: currentUser.email || undefined },
  });

  // Check if user has already liked the post
  const alreadyLiked = await prisma.like.findFirst({
    where: {
      commentId: commentId as string,
      userId: prismaUser?.id as string,
    },
  });

  // Create like
  try {
    if (!alreadyLiked) {
      // Create like if user has not liked the post
      const result = await prisma.like.create({
        data: {
          commentId: commentId as string,
          userId: prismaUser?.id as string,
        },
      });

      return NextResponse.json(result);
    } else {
      // Delete like if user has already liked the post
      const result = await prisma.like.delete({
        where: {
          id: alreadyLiked.id,
        },
      });

      return NextResponse.json(result);
    }
  } catch (error) {
    NextResponse.json(
      { error: "Error has occured while trying to like comment" },
      { status: 403 }
    );
  }
}
