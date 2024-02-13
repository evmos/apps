// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useAccount } from "wagmi";

import { raise } from "helpers";
import { useEvmosChainRef } from "../registry-actions/hooks/use-evmos-chain-ref";

export const useEvmosBalance = () => {
  const { address } = useAccount();
  const chainRef = useEvmosChainRef();

  const { data } = useTrpcQuery((t) =>
    t.account.balance.byDenom({
      chainRef,
      address: address ?? raise("Address not found"),
      denom: "EVMOS",
    }),
  );

  return { evmosBalance: BigNumber.from(data?.balance.erc20 ?? 0) };
};
