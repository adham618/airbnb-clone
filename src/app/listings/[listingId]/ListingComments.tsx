"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { BeatLoader } from "react-spinners";

import CommentCard from "@/components/Comments/CommentCard";
import CreateCommentForm from "@/components/Comments/CreateCommentForm";

import { SafeUser } from "@/types";

type CommentType = {
  Image?: string;
  body: string;
  createdAt: string | Date;
  id: string;
  listingId: string;
  updatedAt: string | Date;
  userId: string;
  CommentLike: { id: string; commentId: string; userId: string }[];
  user: {
    name: string;
    image: string;
    id: string;
  };
};

const getPost = async ({ listingId }: { listingId: string }) => {
  const response = await axios.get("/api/posts/getPost", {
    params: { listingId },
  });
  return response?.data;
};
type ListingCommentsProps = {
  listingId: string;
  currentUser?: SafeUser | null;
};
export default function ListingComments({
  listingId,
  currentUser,
}: ListingCommentsProps) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getPost({ listingId }),
    queryKey: ["post", listingId],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (error as any)
    return (
      <div className="mt-10">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {"An error has occurred: " + (error as any).message}
      </div>
    );

  if (isLoading)
    return (
      <div className="mt-8 flex justify-center">
        <BeatLoader color="#FF385C" />
      </div>
    );

  return (
    <div className="mt-8">
      <CreateCommentForm listingId={listingId} />
      {data.Comment?.map((comment: CommentType) => (
        <CommentCard
          key={comment.id}
          listingId={data.id}
          name={comment.user.name}
          profilePic={comment.user.image}
          likes={comment.CommentLike}
          body={comment.body}
          createdAt={comment.createdAt as string}
          updatedAt={comment.updatedAt as string}
          userId={comment.user?.id}
          currentUserId={currentUser?.id || ""}
          commentId={comment.id}
        />
      ))}
    </div>
  );
}
