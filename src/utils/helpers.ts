import { APIResponseModel, ResponseModel } from "@/models/auth";
import { MenuItemModel, NavLabelModel } from "@/models/menu";
import cookie from 'cookie';
import { NextResponse } from "next/server";

export const catchActionError = (action: () => Promise<APIResponseModel>): Promise<APIResponseModel> => {
    try {
      return action();
    } catch (error) {
      console.error("Error occurred:", error);
      return Promise.resolve({
        status: false,
        data: { message: "Error perfoming request" },
      });
    }
  };

  export const capitalizeFirstLetter = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  export const transformToGidellaSubdomain = (name: string) => {
    if (!name) return '';
    return "https://"+name.toLowerCase()+".gidella.site";
  };
  
  export const extractRoutes = (menuItems: (MenuItemModel | NavLabelModel)[]): string[] => {
    return menuItems
      .filter((item): item is MenuItemModel => 'href' in item) // Type guard to filter MenuItemModel
      .map(item => item.href as string); // Cast href as string
  };

  export const formatNaira = (amount: Number) => {
    //code for naira \u20A6
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  };

  export const generateUniqueId = () => {
    return `${Math.random().toString(36).substr(2, 9)}`;
  }

  export const retrieveOrSetSubdomain = (req: any, res: any) => {
    const cookies = req?.headers?.cookie;
  
    // Parse cookies
    const parsedCookies = cookies ? cookie.parse(cookies) : {};
    let subdomain = parsedCookies.subdomain || null;
  
    // If subdomain is not already set in the cookies, set it
    if (!subdomain) {
      const host = req.headers.host;
      const hostNames = host?.split('.');
  
      if (hostNames?.[0] && hostNames[0] !== 'www') {
        subdomain = hostNames[0].toLowerCase();
      }
  
      // Set cookie if valid subdomain is found
      if (subdomain) {
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('subdomain', subdomain, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24, // 1 day
            sameSite: 'strict',
            path: '/',
          })
        );
      }
    }
  
    return subdomain;
  };

  export const getSubDomain = (request: Request, response: NextResponse) => {
    const host = request.headers.get('host');
  
    const hostNames = host?.split('.');
  
    if (!hostNames || hostNames.length === 0) {
      return "";
    }
  
    // Remove 'www' if present
    if (hostNames[0] === "www") {
      hostNames.shift();
    }
  
    let subdomain = hostNames[0];
  
    // Validate subdomain and return if invalid
    if (!subdomain || ["lowercase", "www", "*"].includes(subdomain.toLocaleLowerCase())) {
      return "";
    }
  
    subdomain = subdomain.toLocaleLowerCase();
  
    // Set the subdomain cookie
    response.headers.set('Set-Cookie', cookie.serialize('subdomain', subdomain, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Secure cookie in production
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
      path: '/',
    }));
  
    return subdomain;
  };

