// /types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      profileId: string;
      email: string;
      fullName: string;
      firstName: string;
      lastName: string;
      role: number;
      roleName: string;
      isMerchantOnboarded: boolean;
    };
    token: string;
    expires: string;
  }

  interface User {
    profileId: string;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    role: number;
    roleName: string;
    isMerchantOnboarded: boolean;
  }
}
