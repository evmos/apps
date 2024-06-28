// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { wagmiConfig } from "@evmosapps/evmos-wallet";
import { signIn  } from "next-auth/react";
import { createSiweMessage } from "@evmosapps/user/auth/create-siwe-message.ts";
import { getAccount, signMessage } from "wagmi/actions";
import { useAccount, useDisconnect } from "wagmi";
import {
  useSuspenseUserSession,
} from "@evmosapps/user/auth/use-user-session.ts";
import { SuspenseBoundary } from "./signin/SuspenseBoundary";
import { useQueryClient } from "@tanstack/react-query";

const signInWithEthereum = async () => {
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

const _SiweExample = ({}: {}) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data } = useSuspenseUserSession();
  const queryClient = useQueryClient();
  const { user } = data || {};
  return (
    <>
      {address && !user && (
        <>
          <button
            onClick={async () => {
              await signInWithEthereum();
              await queryClient.invalidateQueries({
                queryKey: ["user"],
              });
            }}
            className="bg-primary opacity-80 rounded p-1 text-white"
          >
            Sign to {address.slice(0, 12)}
          </button>
          <button
            onClick={() => {
              disconnect();
            }}
          >
            nope
          </button>
        </>
      )}
    </>
  );
};

export const SiweExample = () => (
  <SuspenseBoundary errorFallback={null}>
    <_SiweExample />
  </SuspenseBoundary>
);
