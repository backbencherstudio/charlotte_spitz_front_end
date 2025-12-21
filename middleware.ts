import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = ["/dashboard", "/payment"]; // add your protected paths
const publicRoutes = ["/login", "/", "/signup", "/email-verify"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isPublicRoutes = publicRoutes.includes(request.nextUrl.pathname);

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoutes && token) {
    const dashUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashUrl);
  }

  return NextResponse.next();
}
