"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Input from "@/components/inputs/Input";

import Modal from "./Modal";
export default function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
      // callbackUrl: `${window.location.origin}/dashboard`,
    }).then((callback) => {
      if (callback?.ok) {
        setIsLoading(false);
        toast.success("Logged in successfully!");
        loginModal.onClose();
        router.refresh();
      }
      if (callback?.error) {
        setIsLoading(false);
        toast.error(callback.error);
      }
    });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Login to your account" />
      <Input
        id="email"
        type="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        onClick={() => signIn("google")}
        icon={FcGoogle}
        ouline
        label="Continue with Google"
      />
      <Button
        onClick={() => signIn("github")}
        icon={AiFillGithub}
        ouline
        label="Continue with Github"
      />
      <div className="flex items-center justify-center gap-2">
        <span>Don't have an account?</span>
        <button
          onClick={() => {
            loginModal.onClose();
            registerModal.onOpen();
          }}
          className="text-neutral-800 hover:underline"
        >
          Sign Up
        </button>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      disabled={isLoading}
    />
  );
}
