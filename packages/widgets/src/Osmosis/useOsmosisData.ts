// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useAccount } from "wagmi";

import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { raise } from "helpers";
import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useMemo } from "react";

export function useOsmosisData() {
  const { address } = useAccount();

  const chainRef = useEvmosChainRef();
  const { data: evmosToken } = useTrpcQuery((t) => t.token.byDenom("EVMOS"));
  const { data: osmoToken } = useTrpcQuery((t) => t.token.byDenom("OSMO"));
  const { data: evmosBalance } = useTrpcQuery((t) =>
    t.account.balance.byDenom({
      chainRef: chainRef ?? raise("chainRef not found"),
      address: address ?? raise("address not found"),
      denom: "EVMOS",
    }),
  );
  const { data: osmoBalance } = useTrpcQuery((t) =>
    t.account.balance.byDenom({
      chainRef: chainRef ?? raise("chainRef not found"),
      address: address ?? raise("address not found"),
      denom: "OSMO",
    }),
  );

  return useMemo(() => {
    if (!evmosToken || !osmoToken || !evmosBalance || !osmoBalance) {
      return {
        pending: true,
        data: null,
      } as const;
    }
    const osmosis = {
      ...osmoToken,
      chain: "Osmosis",
      balance: osmoBalance.balance.erc20,
      price: osmoBalance.price?.usd.price ?? raise("osmo price not found"),
      osmosisDenom: osmoToken.minCoinDenom,
    } as const;

    const evmos = {
      ...evmosToken,
      chain: "Evmos",
      balance: evmosBalance.balance.erc20,
      price: evmosBalance.price?.usd.price ?? raise("evmos price not found"),

      osmosisDenom:
        "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A",
    } as const;

    return {
      pending: false,
      data: {
        osmosis,
        evmos,
      },
    } as const;
  }, [evmosToken, osmoToken, evmosBalance, osmoBalance]);
}
