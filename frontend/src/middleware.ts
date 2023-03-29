// middleware.ts
// export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { User } from "./common/types/User/User";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/dashboard"];

  const matchesProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  if (matchesProtectedPath) {
    const token = await getToken({ req: request });
    const user: User | any = token?.user;

    if (!token) {
      const url = new URL(`/`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }

    // Admin Only
    if (token.role !== "admin" && !user.is_staff && !user.is_superuser) {
      const url = new URL(`/403`, request.url);

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// Authenticated routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
