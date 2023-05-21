"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname, useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import React from "react";

import useLoggedWindow from "@/hooks/useLoggedWindow";

import DismissableToast from "@/components/DismissableToast";
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
};

function Providers({ children, currentUser }: ProvidersProps) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );
  const router = useRouter();
  const pathName = usePathname();
  const googleWindow = pathName === "/google-signin";
  const { isLogged } = useLoggedWindow();

  React.useEffect(() => {
    isLogged && router.refresh();
  }, [isLogged, router]);

  return (
    <>
      {googleWindow ? (
        <SessionProvider>{children}</SessionProvider>
      ) : (
        <>
          <SessionProvider>
            <NProgress />
            <Header currentUser={currentUser} />
            <QueryClientProvider client={client}>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <RegisterModal />
            <LoginModal />
            <RentModal />
            <SearchModal />
            <DismissableToast />
          </SessionProvider>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
}

export default Providers;
