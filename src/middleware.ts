/* eslint-disable no-console */
export { default } from "next-auth/middleware";

export const config = {
  // matcher: '/about/:path*',
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
