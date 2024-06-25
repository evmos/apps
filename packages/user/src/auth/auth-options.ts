// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "server-only";
import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import { apiClient } from "../api";
import { JWT } from "next-auth/jwt";
import { SignWithEthereumprovider } from "./sign-with-ethereum-provider";

const providers = [SignWithEthereumprovider];

export const authOptions: AuthOptions = {
  providers,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt(options) {
      if (options.trigger === "signIn") {
        return {
          sub: options.user.id,
          ...options.user,
        } as JWT;
      }
      return options.token;
    },
    async session({ session, token }) {
      if (!session.user?.id && token?.sub) {
        session.user = await apiClient.getUserById(token.sub);
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions) as (
  req: Request,
  res: Response,
) => Promise<void>;
