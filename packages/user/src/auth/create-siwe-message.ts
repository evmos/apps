// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address } from "helpers/src/crypto/addresses/types";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

const SIWE_MESSAGE_VERSION = "1";
/**
 * @example
 * ```ts
 * import { wagmiConfig } from "@evmosapps/evmos-wallet";
 * import { signIn } from "next-auth/react";
 * import { createSiweMessage } from "@evmosapps/user/auth/create-siwe-message.ts";
 * import { getAccount, signMessage } from "wagmi/actions";
 *
 * const signInWithEthereum = async () => {
 *   const account = getAccount(wagmiConfig);
 *   if (!account.address) {
 *     throw new Error("No account found");
 *   }
 *   const message = await createSiweMessage(account.address);
 *   const signature = await signMessage(wagmiConfig, {
 *     message: message.prepareMessage(),
 *     account: account.address,
 *   });
 *
 *   await signIn("credentials", {
 *     message: JSON.stringify(message),
 *     signature,
 *     redirect: false,
 *     callbackUrl: window.location.pathname,
 *   });
 * };
 * ```
 */
export const createSiweMessage = async (account: Address) => {
  return new SiweMessage({
    domain: window.location.host,
    address: account,
    statement: "Sign in with Ethereum to the app.",
    uri: window.location.origin,
    version: SIWE_MESSAGE_VERSION,
    nonce: await getCsrfToken(),
  });
};
