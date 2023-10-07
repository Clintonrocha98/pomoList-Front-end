import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookies = request.cookies.get("userId")?.value;
  const isSignedIn = Boolean(cookies);
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isSignupPage = request.nextUrl.pathname === "/signup";

  if (isSignedIn) {
    if (isLoginPage || isSignupPage) {
      return NextResponse.redirect(new URL("/todolist", request.url));
    }
  } else {
    if (isLoginPage) {
      return NextResponse.next();
    }
    if (!isSignupPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/todolist"],
};
