import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { jwtDecode } from "jwt-decode";

export default withAuth(
  function middleware(req) {
    const isAuthenticated = req.nextauth.token;
    if (!isAuthenticated) {
      return NextResponse.redirect("/login");
    }
    try {
      const decoded = jwtDecode(isAuthenticated.token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        const response = NextResponse.rewrite(new URL("/login", req.url));
        response.cookies.delete("next-auth.session-token");
        return response;
      }
    } catch (error) {
      const response = NextResponse.rewrite(new URL("/login", req.url));
      response.cookies.delete("next-auth.session-token");
      return response;
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
