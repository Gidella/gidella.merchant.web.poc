import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const res = NextResponse.next();
   
    if (pathname.startsWith('/_next') || pathname.startsWith('/images/')) {
      return res;
    }

    const unauthenticatedPages = [
      "/auth/login",
      "/auth/register",
      "/auth/create-password",
      "/auth/reset-instruction",
      "/auth/forgot-password",
      "/business-not-found",
      "/",
      "/cart-items"
    ];

    const isRequiresAuthentication = unauthenticatedPages.some((page) =>
      new RegExp(`^${page.replace("*", ".*")}$`).test(pathname)
    );

    if (req.nextauth.token) {
      if (isRequiresAuthentication) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    } else {
      if (!isRequiresAuthentication) {
        const url = new URL("/auth/login", req.url);
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
