"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import * as React from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { AiFillDelete, AiFillEdit, AiFillLike } from "react-icons/ai";

import EditCommentForm from "@/components/Comments/EditCommentForm";

import capitalizeWord from "@/utils/capitalizeWord";
import formatDate from "@/utils/formatDate";

import CommentModal, { ModalSize } from "./CommentModal";

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
  // const { data: session } = useSession();

  const [showDeleteModal, setDeleteShowModal] = useState<boolean>(false);
  const [showEditModal, setEditShowModal] = useState<boolean>(false);
  const [loadLike, setLoadLike] = useState<boolean>(false);
  const queryClient = useQueryClient();

  // const currentUserLiked =
  //   (session && likes?.some((like) => like.userId === session.user?.id)) || false;

  // console.log("likes:",props.likes);

  type LikeParams = {
    commentId: string;
  };

  const likelisting = async ({ commentId }: LikeParams) => {
    setLoadLike(true);
    try {
      await axios.post("/api/comments/addLike", { commentId });
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
            <div className="flex items-center gap-3">
              {loadLike ? (
                <LoaderIcon className="h-6 w-6" />
              ) : (
                // <HeartIcon fill={currentUserLiked} onClick={clickHeart} />
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
                  onClick={clickHeart}
                >
                  <AiFillLike size={24} />
                </button>
              )}
              <span className="text-gray-400">{likes.length}</span>
            </div>
            {userId === currentUserId && (
              <div className="flex gap-2.5">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
                  onClick={openEditModal}
                >
                  <AiFillEdit size={24} />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
                  onClick={openDeleteModal}
                >
                  <AiFillDelete size={24} />
                </button>
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
          modalTitle="Edit Comment"
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
