"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import clsxm from "@/lib/clsxm";

type ReplayCommentFormProps = {
  commentId: string;
  closeModal: () => void;
};

const schema = z.object({
  body: z
    .string()
    .nonempty({ message: "Can't be blank" })
    .max(300, { message: "Should not exceed 300 characters" }),
});
type FormData = z.infer<typeof schema>;

export default function ReplayCommentForm({
  commentId,
  closeModal,
}: ReplayCommentFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const mutate = React.useCallback(
    (data: FormData) => {
      axios
        .put("/api/comments/replayComment", { ...data, commentId })
        .then(() => {
          toast.success("Sucess 🔥", { id: "comment-toast" });
          reset();
          closeModal();
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Something went wrong", {
            id: "comment-toast",
          });
        });
    },

    [closeModal, commentId, reset, router]
  );
  const onSubmit = async (data: FormData) => {
    toast.loading("Editing comment", { id: "comment-toast" });
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="What's on your mind..."
        id="post_box"
        className={clsxm(
          "relative mt-1 min-h-[100px] w-full rounded border-2 bg-white px-3 py-3 text-sm shadow-md outline-none focus:outline-none",
          errors.body
            ? "border-rose-500 focus:border-rose-500"
            : "border-black focus:border-black"
        )}
        {...register("body")}
      />
      <p className="text-red-500">{errors.body?.message}</p>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          className="rounded border-2 border-black px-6 py-2 text-sm font-bold uppercase outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
          type="button"
          onClick={() => closeModal()}
        >
          Close
        </button>
        <button
          className="rounded border border-primary bg-primary px-4 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-primary-hover"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
