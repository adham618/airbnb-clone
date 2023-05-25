"use client";

import * as React from "react";

import CommentCard from "@/components/Comments/CommentCard";
import CreateCommentForm from "@/components/Comments/CreateCommentForm";

import { SafeComment, SafeUser } from "@/types";

type ListingCommentsProps = {
  listingId: string;
  currentUser?: SafeUser | null;
  comments: SafeComment[];
};
export default function ListingComments({
  listingId,
  currentUser,
  comments,
}: ListingCommentsProps) {
  return (
    <div className="mt-8">
      <CreateCommentForm listingId={listingId} />
      {comments ? (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            name={comment.user.name || ""}
            profilePic={comment.user.image || ""}
            likes={comment?.likes || []}
            body={comment.body || ""}
            createdAt={comment.createdAt}
            updatedAt={comment.updatedAt}
            userId={comment.userId || ""}
            currentUserId={currentUser?.id || ""}
            commentId={comment.id}
          />
        ))
      ) : (
        <div className="text-center">No comments yet</div>
      )}

      {/* {isLoading && (
        <div className="flex justify-center">
          <BeatLoader color="#FF385C" />
        </div>
      )} */}
    </div>
  );
}
