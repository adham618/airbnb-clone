import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Page not found",
};
export default function NotFoundCatchAll() {
  notFound();
}
