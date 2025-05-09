import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  // Check if token is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //   const user = decodedToken(token);

  //   console.log(user)

  //   const isProtectedPath = request.nextUrl.pathname.startsWith("/dashboard");

  // Redirect if user is not authorized
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard"],
};
