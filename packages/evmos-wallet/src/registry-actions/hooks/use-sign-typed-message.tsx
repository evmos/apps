// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { useAccount } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import type { Message } from "@bufbuild/protobuf";
import {
  broadcastTypedMessage,
  createTypedMessage,
} from "../transfers/prepare-typed-message";
import { signTypedDataMessage } from "../..";
import { switchToEvmosChain } from "../../wallet/actions/switchToEvmosChain";
import { useEvmosChainRef } from "./use-evmos-chain-ref";

export const useSignTypedDataMessage = () => {
  const { address } = useAccount();
  const chainRef = useEvmosChainRef()
  return useMutation({
    mutationFn: async ({
      messages,
      gasLimit,
    }: {
      messages: Message[];
      gasLimit: bigint;
    }) => {
      if (!address) throw new Error("No address");
      await switchToEvmosChain();

      const typedMessage = await createTypedMessage(chainRef, {
        messages,
        sender: address,
        gasLimit,
      });

      const signature = await signTypedDataMessage(typedMessage.tx);

      return broadcastTypedMessage(chainRef, {
        ...typedMessage,
        signature,
      });
    },
  });
};
