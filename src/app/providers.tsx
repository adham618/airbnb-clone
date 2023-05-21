"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Layout/Header";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import NProgress from "@/components/NProgress";

import { SafeUser } from "@/types";

type ProvidersProps = {
  children: React.ReactNode;
  currentUser: SafeUser | null;
  session: Session | null;
};

function Providers({ children, currentUser, session }: ProvidersProps) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );
  const pathName = usePathname();
  const googleWindow = pathName === "/google-signin";

  return (
    <>
      {googleWindow ? (
        children
      ) : (
        <>
          <Header currentUser={currentUser} />
          <SessionProvider session={session}>
            <QueryClientProvider client={client}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </SessionProvider>
          {/* <Footer /> */}
          <NProgress />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Toaster />
        </>
      )}
    </>
  );
}

export default Providers;
