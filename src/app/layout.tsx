import { Nunito } from "next/font/google";

import "../styles/globals.css";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Seo from "@/components/Seo";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Seo />

      <body className={nunito.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
