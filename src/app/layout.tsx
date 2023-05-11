import { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "../styles/globals.css";

import Header from "@/components/Layout/Header";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

import getCurrentUser from "@/actions/getCurrentUser";
import { siteConfig } from "@/config/site";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  generator: `Next.js`,
  viewport: "width=device-width, initial-scale=1.0",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "Adham Tarek",
      url: "https://adhamtarek.vercel.app",
    },
  ],
  creator: "Adham Tarek",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@test",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/favicon/site.webmanifest`,
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/favicon/mstile-150x150.png",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
  robots: "index, follow",
  // verification: {
  //   google: "1234567890",
  //   yandex: "1234567890",
  // },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head></head>
      <body className={nunito.className}>
        <Header currentUser={currentUser} />
        {children}
        {/* <Footer /> */}
        <RegisterModal />
        <LoginModal />
        <Toaster />
      </body>
    </html>
  );
}
