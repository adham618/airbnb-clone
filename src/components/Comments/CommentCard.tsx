"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import * as React from "react";
import toast from "react-hot-toast";

import EditCommentForm from "@/components/Comments/EditCommentForm";
import CommentModal, { ModalSize } from "./CommentModal";

import capitalizeWord from "@/utils/capitalizeWord";
import formatDate from "@/utils/formatDate";

type CommentCardProps = {
  name: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  likes: { id: string; commentId: string; userId: string }[];
  userId: string;
  currentUserId: string;
  listingId: string;
  commentId: string;
};

export default function CommentCard({
  name,
  profilePic,
  createdAt,
  updatedAt,
  body,
  likes,
  userId,
  currentUserId,
  listingId,
  commentId,
}: CommentCardProps) {
  const [showDeleteModal, setDeleteShowModal] = useState<boolean>(false);
  const [showEditModal, setEditShowModal] = useState<boolean>(false);
  const [loadLike, setLoadLike] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const currentUserLiked =
    (session && likes?.some((like) => like.userId === user?.id)) || false;

  // console.log("likes:",props.likes);

  type LikeParams = {
    commentId: string;
  };

  const likelisting = async ({ commentId }: LikeParams) => {
    setLoadLike(true);
    try {
      await axios.listing("/api/comments/addLike", { commentId });
      queryClient.invalidateQueries(["listing", listingId]);
      //return response?.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    setLoadLike(false);
  };

  const { mutate } = useMutation(
    async (commentId: string) =>
      await axios.delete("/api/comments/deleteComment", {
        params: { commentId },
      }),
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        // eslint-disable-next-line no-console
        console.log(error);
        toast.error(error?.response?.data?.error || "Something went wrong", {
          id: "delete-comment-toast",
        });
      },
      onSuccess: () => {
        toast.success("Comment has been Deleted 🔥", {
          id: "delete-comment-toast",
        });
        queryClient.invalidateQueries(["listing", listingId]);
        // console.log(data.data);
      },
    }
  );

  const clickHeart = () => {
    likelisting({ commentId });
  };

  const openEditModal = () => {
    setEditShowModal(true);
  };

  const openDeleteModal = () => {
    setDeleteShowModal(true);
  };

  return (
    <>
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-white p-4 shadow-lg">
        <div className="flex items-center">
          <Image
            alt="profile pic"
            src={profilePic}
            className="mr-3 h-10 w-10 rounded-full object-cover"
            width={40}
            height={40}
          />
          <div>
            <div className="font-medium text-gray-700">
              {capitalizeWord(name)}
            </div>
            <div className="text-gray-400">
              {formatDate(createdAt)}{" "}
              {createdAt != updatedAt && <i>(edited)</i>}
            </div>
          </div>
        </div>
        <div className="mb-9 mt-9 text-gray-500">{body}</div>
        <div>
          <div className="flex items-center justify-between">
            <div>
              {loadLike ? (
                <i className="fa-solid fa-spinner text-red-600"></i>
              ) : (
                // <HeartIcon fill={currentUserLiked} onClick={clickHeart} />
                <span onClick={clickHeart}>HeartIcon</span>
              )}
              <span className="ml-1 text-gray-400">{likes.length}</span>
            </div>
            {userId === currentUserId && (
              <div className="flex gap-2.5">
                <div>
                  <span onClick={openEditModal}>EditIcon</span>
                </div>
                <div>
                  <span onClick={openDeleteModal}>DeleteIcon</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <CommentModal
          modalTitle="Delete listing"
          closeModal={() => setDeleteShowModal(false)}
          saveFunction={() => mutate(commentId)}
          footer={true}
          size={ModalSize.small}
        >
          Are you sure you want to delete this listing?
        </CommentModal>
      )}
      {showEditModal && (
        <CommentModal
          modalTitle="Edit listing"
          closeModal={() => setEditShowModal(false)}
          footer={false}
          size={ModalSize.medium}
        >
          <EditCommentForm
            listingId={listingId}
            commentId={commentId}
            body={body}
            closeModal={() => setEditShowModal(false)}
          />
        </CommentModal>
      )}
    </>
  );
}
