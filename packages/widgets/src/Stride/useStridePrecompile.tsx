// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import StrideABI from "./abi/StrideTempABI.json";
import { ethToBech32, ethToEvmos } from "@evmosapps/evmos-wallet";
import { writeContract } from "wagmi/actions";
import { useAccount, useConfig } from "wagmi";
import { useMutation } from "@tanstack/react-query";
import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";
import { E, Log } from "helpers";
import { useMemo } from "react";

const STRIDE_PRECOMPILE_ADDRESS = "0xeE44c15a354F72bb787FFfe2975872380E37afED";

export function useStridePrecompile() {
  const { address } = useAccount();

  const config = useConfig();
  const { mutate, error, ...rest } = useMutation({
    mutationKey: ["stride-swap"],
    mutationFn: async function liquidStake({ amount }: { amount: string }) {
      if (!address) throw new Error("Not connected");

      await switchToEvmosChain();

      return writeContract(config, {
        address: STRIDE_PRECOMPILE_ADDRESS,
        abi: StrideABI,
        functionName: "liquidStakeEvmos",
        account: address,
        args: [amount, ethToBech32(address, "stride"), ethToEvmos(address)],
        gas: 1227440n,
      });
    },
    onError: (e) => {
      Log().error(e);
    },
  });

  const mappedError = useMemo(() => {
    if (!error) {
      return null;
    }
    if (
      E.match.byPattern(error, /(Request rejected|User rejected the request)/g)
    ) {
      return "Request rejected";
    }
    return "Error generating transaction, please try again";
  }, [error]);

  return {
    liquidStake: mutate,
    errorMessage: mappedError,
    ...rest,
  };
}
