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
        comments.map((comment) =>
          comment.parentId ? (
            <div key={comment.id}>
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
                listingId={listingId}
              />
              <div className="ml-4">
                {comment?.Children?.map((child) => (
                  <CommentCard
                    key={child.id}
                    name={child.user.name || ""}
                    profilePic={child.user.image || ""}
                    likes={child?.likes || []}
                    body={child.body || ""}
                    createdAt={child.createdAt}
                    updatedAt={child.updatedAt}
                    userId={child.userId || ""}
                    currentUserId={currentUser?.id || ""}
                    commentId={child.id}
                    listingId={listingId}
                  />
                ))}
              </div>
            </div>
          ) : (
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
              listingId={listingId}
            />
          )
        )
      ) : (
        <div className="text-center">No comments yet</div>
      )}
    </div>
  );
}
