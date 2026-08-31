import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminPath = path.startsWith("/admin");
  const isLoginPath = path === "/admin/login";

  const token = request.cookies.get("admin-token")?.value || "";

  if (isAdminPath && !isLoginPath && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
