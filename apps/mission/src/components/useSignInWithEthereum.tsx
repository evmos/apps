// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { wagmiConfig } from "@evmosapps/evmos-wallet";
import { signIn } from "next-auth/react";
import { createSiweMessage } from "@evmosapps/user/auth/create-siwe-message.ts";
import { getAccount, signMessage } from "wagmi/actions";

// TODO: remove if Renzo already implemented something similar
export const signInWithEthereum = async () => {
  const account = getAccount(wagmiConfig);
  if (!account.address) {
    throw new Error("No account found");
  }
  const message = await createSiweMessage(account.address);
  const signature = await signMessage(wagmiConfig, {
    message: message.prepareMessage(),
    account: account.address,
  });

  await signIn("credentials", {
    message: JSON.stringify(message),
    signature,
    callbackUrl: window.location.pathname,
    redirect: false,
  });
};
