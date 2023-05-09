import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import Seo from "@/components/Seo";

import getCurrentUser from "@/actions/getCurrentUser";

const nunito = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <Seo />
      <body className={nunito.className}>
        <Header currentUser={currentUser} />
        {children}
        <Footer />
        <RegisterModal />
        <LoginModal />
        <Toaster />
      </body>
    </html>
  );
}
