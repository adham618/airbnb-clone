"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

import { SafeUser } from "@/types";

const SignInPage = ({ currentUser }: { currentUser: SafeUser | null }) => {
  useEffect(() => {
    if (!currentUser) void signIn("google");
    if (currentUser) window.close();
  }, [currentUser]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
        zIndex: 99999,
      }}
    ></div>
  );
};

export default SignInPage;
