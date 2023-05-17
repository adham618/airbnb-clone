/* eslint-disable no-console */
export { default } from "next-auth/middleware";

import type { NextMiddleware, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware: NextMiddleware = (req: NextRequest) => {
  console.log("middleware.ts running");
  console.log(req.nextUrl.domainLocale);
  return NextResponse.next();
};

export const config = {
  // matcher: '/about/:path*',
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
