"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

const schema = z.object({
  body: z
    .string()
    .trim()
    .nonempty({ message: "Can't be blank" })
    .max(300, { message: "Should not exceed 300 characters" }),
});
type FormData = z.infer<typeof schema>;

type CreateCommentFormProps = {
  listingId: string;
};

import { useRouter } from "next/navigation";
import * as React from "react";

import clsxm from "@/lib/clsxm";

export default function CreateCommentForm({
  listingId,
}: CreateCommentFormProps) {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const mutate = React.useCallback(
    (data: FormData) => {
      axios
        .post("/api/comments/addComment", { ...data, listingId })
        .then(() => {
          toast.success("Comment has been created 🔥", {
            id: "comment-toast",
          });
          reset();
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Something went wrong", {
            id: "comment-toast",
          });
        });
    },

    [listingId, reset, router]
  );
  const onSubmit = async (data: FormData) => {
    toast.loading("Creating a comment", { id: "comment-toast" });
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="post_box" className="text-lg text-gray-600">
        {session ? "" : "Sign in to comment"}
      </label>
      <textarea
        placeholder="Comment here..."
        id="post_box"
        className={clsxm(
          "relative mt-1 min-h-[100px] w-full rounded border-2 bg-white px-3 py-3 text-sm shadow-md outline-none focus:outline-none",
          !session ? " cursor-not-allowed" : "",
          errors.body
            ? "border-rose-500 focus:border-rose-500"
            : "border-black focus:border-black"
        )}
        disabled={!session}
        {...register("body")}
      />
      <p className="text-rose-500">{errors.body?.message}</p>
      <button
        className={
          `my-3 mr-1 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-primary-hover` +
          (!session ? " cursor-not-allowed opacity-50" : "")
        }
        type="submit"
        disabled={!session}
      >
        Comment
      </button>
    </form>
  );
}
