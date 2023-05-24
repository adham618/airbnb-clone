"use client";

import { Like } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as React from "react";
import toast from "react-hot-toast";
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
  likes: Like[];
  userId: string;
  currentUserId: string;
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
  commentId,
}: CommentCardProps) {
  const router = useRouter();
  const [showDeleteModal, setDeleteShowModal] = useState<boolean>(false);
  const [showEditModal, setEditShowModal] = useState<boolean>(false);
  const likelisting = React.useCallback(
    (commentId: string) => {
      axios
        .post("/api/comments/addLike", { commentId })
        .then(() => {
          router.refresh();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    },

    [router]
  );
  const onDelete = React.useCallback(
    async (commentId: string) => {
      axios
        .delete(`/api/comments/${commentId}`)
        .then(() => {
          toast.success("Comment Deleted 🔥", {
            id: "delete-comment-toast",
          });
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Something went wrong", {
            id: "delete-comment-toast",
          });
        });
    },
    [router]
  );
  const clickHeart = () => {
    likelisting(commentId);
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
              {formatDate(updatedAt || createdAt)}
              {formatDate(updatedAt) !== formatDate(createdAt) && " (edited)"}
            </div>
          </div>
        </div>
        <div className="mb-9 mt-9 text-gray-500">{body}</div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className={`${
                  likes?.some((like) => like.userId === currentUserId)
                    ? "text-red-500"
                    : "text-gray-500"
                } flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100`}
                onClick={clickHeart}
              >
                <AiFillLike size={24} />
              </button>
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
          saveFunction={() => onDelete(commentId)}
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
            commentId={commentId}
            body={body}
            closeModal={() => setEditShowModal(false)}
          />
        </CommentModal>
      )}
    </>
  );
}
