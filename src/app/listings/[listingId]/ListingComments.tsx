"use client";

import * as React from "react";

import CommentCard from "@/components/Comments/CommentCard";
import CreateCommentForm from "@/components/Comments/CreateCommentForm";

import { SafeUser } from "@/types";

type ListingCommentsProps = {
  listingId: string;
  currentUser?: SafeUser | null;
  comments: any;
};
export default function ListingComments({
  listingId,
  currentUser,
  comments,
}: ListingCommentsProps) {
  return (
    <div className="mt-8">
      <CreateCommentForm listingId={listingId} />
      {comments.map((comment: any) => (
        <CommentCard
          key={comment.id}
          listingId={listingId}
          name={comment.user.name || ""}
          profilePic={comment.user.image || ""}
          likes={comment.likes}
          // likes={[]}
          body={comment.body || ""}
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
          userId={comment.user?.id}
          currentUserId={currentUser?.id || ""}
          commentId={comment.id}
        />
      ))}
      {/* {isLoading && (
        <div className="flex justify-center">
          <BeatLoader color="#FF385C" />
        </div>
      )} */}
    </div>
  );
}
