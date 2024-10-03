import NextAuth from "next-auth/next";
import { jwtDecode } from "jwt-decode";
import { handleLogin, handleRefreshMerchantToken } from "@/actions/auth";
import { SessionModel, TokenModel, UserModel } from "@/models/auth";
import type { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@gidella.online" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        request: Pick<RequestInternal, "body">
      ): Promise<any | null> {
        const loginPayload = {
          email: request.body?.email,
          password: request.body?.password,
        };
        const response = loginPayload.email == "no-email"? await handleRefreshMerchantToken(loginPayload.password) : await handleLogin(loginPayload);
        const data = response.data.data;
        if (response.status && data) {
          return data;
        } else {
          return null;
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, trigger, session, user }: any): Promise<any> {
      
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: any;
      token: any;
    }): Promise<any> {
      const userData = token.user as TokenModel;
      const userToken = jwtDecode(userData.accessToken);
      const userDetials = JSON.parse(userToken.sub!) as UserModel;

      session = {
        user: userDetials,
        token: userData.accessToken,
        expires: new Date(userData.tokenExp * 1000).toISOString(),
      } as SessionModel;

      return session;
    },
  },
  pages: { 
    signIn: "/auth/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);