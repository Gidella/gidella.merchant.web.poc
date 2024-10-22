import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const res = NextResponse.next();
   
    if (pathname.startsWith('/_next') || pathname.startsWith('/images/') || pathname.startsWith('/')) {
      return res;
    }

    const unauthenticatedPages = [
      "/login",
      "/create-password",
      "/reset-instruction",
      "/forgot-password",
      "/business-not-found",
      "/cart-items",
      "/sign-up",
      "/checkout"
    ];

    const hasAuthentication = unauthenticatedPages.some((page) =>
      new RegExp(`^${page.replace("*", ".*")}$`).test(pathname)
    );

    if (req.nextauth.token) {
      if (hasAuthentication) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    } else {
      if (!hasAuthentication) {
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
      }
    }

    return res;
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
