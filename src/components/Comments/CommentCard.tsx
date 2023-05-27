"use client";
import { Like } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as React from "react";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit, AiFillLike } from "react-icons/ai";
import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');

import Avater from "@/components/Avater";
import EditCommentForm from "@/components/Comments/EditCommentForm";
import ReplayCommentForm from "@/components/Comments/ReplayCommentForm";

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
  listingId: string;
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
  listingId,
}: CommentCardProps) {
  const router = useRouter();
  const [showDeleteModal, setDeleteShowModal] = useState<boolean>(false);
  const [showEditModal, setEditShowModal] = useState<boolean>(false);
  const [showReplayModal, setReplayModal] = useState<boolean>(false);
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
  const openReplayModal = () => {
    setReplayModal(true);
  };
  return (
    <>
      <div className="relative mb-4 flex w-full min-w-0 flex-col break-words rounded-lg bg-white p-2 shadow hover:shadow-lg sm:p-4">
        <div className="flex items-center">
          <Avater src={profilePic} className="mr-2 w-10" />
          <div>
            <div className="font-medium text-gray-700">
              {capitalizeWord(name)}
            </div>
            <div className="text-sm text-gray-400">
              {/* {formatDate(updatedAt || createdAt)} */}
              <TimeAgo
                datetime={updatedAt ? new Date(updatedAt) : new Date(createdAt)}
              />
              {formatDate(updatedAt) !== formatDate(createdAt) && " (edited)"}
            </div>
          </div>
        </div>
        <p className="mb-0.5 ml-3 mt-2 text-sm text-gray-500 sm:text-base">
          {body}
        </p>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                className={`${
                  likes?.some((like) => like.userId === currentUserId)
                    ? "text-red-500"
                    : "text-gray-500"
                } flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-slate-100 sm:h-9 sm:w-9`}
                onClick={clickHeart}
              >
                <AiFillLike className="sm:text-xl" />
              </button>
              <span className="text-xs text-gray-400 sm:text-sm">
                {likes?.length === 0 ? "" : likes?.length}
              </span>
            </div>
            <div className="flex gap-2.5">
              {userId === currentUserId && (
                <>
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-full  transition hover:bg-slate-100 sm:h-9 sm:w-9"
                    onClick={openEditModal}
                  >
                    <AiFillEdit className="sm:text-xl" />
                  </button>
                  <button
                    className="flex h-7 w-7 items-center justify-center  rounded-full transition hover:bg-slate-100 sm:h-9 sm:w-9"
                    onClick={openDeleteModal}
                  >
                    <AiFillDelete className="sm:text-xl" />
                  </button>
                </>
              )}
              <button
                className="rounded-md border-2 border-primary px-4 py-1 text-sm text-primary transition hover:bg-slate-100 sm:text-base"
                onClick={openReplayModal}
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <CommentModal
          modalTitle="Delete Comment"
          closeModal={() => setDeleteShowModal(false)}
          saveFunction={() => onDelete(commentId)}
          footer={true}
          size={ModalSize.small}
        >
          Are you sure you want to delete this comment?
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
      {showReplayModal && (
        <CommentModal
          modalTitle={`Replay to ${name}`}
          closeModal={() => setReplayModal(false)}
          footer={false}
          size={ModalSize.medium}
        >
          <ReplayCommentForm
            commentId={commentId}
            listingId={listingId}
            closeModal={() => setReplayModal(false)}
          />
        </CommentModal>
      )}
    </>
  );
}
