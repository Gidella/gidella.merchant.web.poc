import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { extractRoutes } from '@/utils/helpers'
import AdminMenuItems from "@/components/shared/sidebar/MenuItems/AdminMenuItems";
import MerchantMenuItems from "@/components/shared/sidebar/MenuItems/MerchantMenuItems";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/_next') || pathname.startsWith('/images/')) {
      return NextResponse.next();
    }

    const adminRoutes = extractRoutes(AdminMenuItems);
    const merchantRoutes = extractRoutes(MerchantMenuItems);
    
    const unauthenticatedPages = [
      "/auth/login",
      "/auth/register",
      "/auth/create-password",
      "/auth/reset-instruction",
      "/auth/forgot-password"
    ];

    const isUnauthenticatedPage = unauthenticatedPages.some((page) =>
      new RegExp(`^${page.replace("*", ".*")}$`).test(pathname)
    );

   

    // const session = await getSession();

    // if (session) {
    //   const userRole = session.user.role; // Adjust based on your session structure

    //   console.log(session)
    //   // Check if user is accessing admin routes
    //   if ((userRole === 1 || userRole === 2) && !adminRoutes.includes(pathname)) {
    //     return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    //   }

    //   // Check if user is accessing merchant routes
    //   if (userRole === 3 && !merchantRoutes.includes(pathname)) {
    //     return NextResponse.redirect(new URL("/dashboard/merchant", req.url));
    //   }
    // }

    if (req.nextauth.token) {
      if (isUnauthenticatedPage) {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    } else {
      if (!isUnauthenticatedPage) {
        const url = new URL("/auth/login", req.url);
        return NextResponse.redirect(url);
      }
    }
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