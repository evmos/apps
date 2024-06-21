// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getCsrfToken } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import { apiClient } from "../api";

// Example with next-auth, have to check it
export const SignWithEthereumprovider = CredentialsProvider({
  name: "Ethereum",
  credentials: {
    message: {
      label: "Message",
      type: "text",
      placeholder: "0x0",
    },
    signature: {
      label: "Signature",
      type: "text",
      placeholder: "0x0",
    },
  },

  async authorize(credentials, req) {
    try {
      if (!credentials) return null;
      const message = JSON.parse(credentials.message) as Partial<SiweMessage>;
      const siwe = new SiweMessage(message);
      const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || "");

      const nonce = await getCsrfToken({
        req: {
          ...req,
          body: undefined,
        },
      });

      const result = await siwe.verify({
        signature: credentials?.signature || "",
        domain: nextAuthUrl.host,
        nonce,
      });

      if (!result.success) {
        return null;
      }

      const authorization = {
        address: siwe.address,
        authorizationMethod: "ETHEREUM",
      } as const;
      try {
        const user = await apiClient.getUserByAddress(siwe.address);
        return {
          id: user.id,
          authorization,
          isNewUser: false,
        };
      } catch (e) {}
      const newUser = await apiClient.createUser({
        walletAccount: {
          address: siwe.address,
          authorizationMethod: "ETHEREUM",
          verified: true,
        },
      });
      return {
        id: newUser.id,
        authorization,
        isNewUser: true,
      };
    } catch (e) {
      return null;
    }
  },
});
