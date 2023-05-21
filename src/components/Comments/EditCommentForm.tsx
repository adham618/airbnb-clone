"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type EditPostFormProps = {
  commentId: string;
  listingId: string;
  body: string;
  closeModal: () => void;
};

const schema = z.object({
  body: z
    .string()
    .nonempty({ message: "Can't be blank" })
    .max(300, { message: "Should not exceed 300 characters" }),
});
type FormData = z.infer<typeof schema>;

export default function EditCommentForm({
  commentId,
  body,
  closeModal,
  listingId,
}: EditPostFormProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      body: body,
    },
    resolver: zodResolver(schema),
  });

  const { mutate } = useMutation(
    async (data: FormData) =>
      await axios.put("/api/comments/updateComment", { ...data, commentId }),
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        // eslint-disable-next-line no-console
        console.log(error);
        toast.error(error?.response?.data?.error || "Something went wrong", {
          id: "comment-toast",
        });
      },
      onSuccess: (data) => {
        toast.success("Comment has been updated 🔥", { id: "comment-toast" });
        queryClient.invalidateQueries(["post", listingId]);
        reset();
        closeModal();
        // eslint-disable-next-line no-console
        console.log(data.data);
      },
    }
  );

  const onSubmit = async (data: FormData) => {
    toast.loading("Editing comment", { id: "comment-toast" });
    mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="What's on your mind..."
        rows={4}
        id="post_box"
        className="relative mb-2 mt-1 w-full rounded border bg-white px-3 py-3 text-sm placeholder-primary/70 outline-none focus:outline-none"
        {...register("body")}
      />
      <p className="text-red-500">{errors.body?.message}</p>
      <div className="flex items-center justify-end">
        <button
          className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
          type="button"
          onClick={() => closeModal()}
        >
          Close
        </button>
        <button
          className="mb-1 mr-1 rounded bg-emerald-500 px-4 py-2 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
          type="submit"
        >
          {/* {saveBtnText} */}
          Save edits
        </button>
      </div>
    </form>
  );
}
