"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

import useLoggedWindow from "@/hooks/useLoggedWindow";

export default function SignIn() {
  const { data: session, status } = useSession();
  const { setLogged } = useLoggedWindow();
  useEffect(() => {
    if (!(status === "loading") && !session) void signIn("google");
    if (session) {
      window.close();
      setLogged();
    }
  }, [session, setLogged, status]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        background: "white",
      }}
    ></div>
  );
}
