export { default } from "next-auth/middleware";

export const config = {
  // "/admin/:path*", // Matches any path starting with /api
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
