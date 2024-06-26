// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/* eslint-disable @typescript-eslint/no-unused-vars */


import NextAuth from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

import { User, WalletAccount } from "../api";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    authorization: {
      method: WalletAccount["authorizationMethod"];
      address: WalletAccount["address"];
    };
  }
}
