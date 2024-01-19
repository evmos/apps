// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQueries } from "@tanstack/react-query";
import { AccountBalancesQueryOptions } from "@evmosapps/evmos-wallet";
import { useAccount } from "wagmi";
import { TokenQueryOptions } from "@evmosapps/evmos-wallet/src/queries/token-query";
import { TokenPricesQueryOptions } from "@evmosapps/evmos-wallet/src/queries/token-prices-query";
export type SwapOption = {
  erc20Address: string;
  name: string;
  symbol: string;
  tokenIdentifier: string;
  chain: string;
  balance: string;
  price: number | null;
  decimals: number;
  osmosisDenom: string;
};

export function useOsmosisData() {
  const { address } = useAccount();

  return useQueries({
    queries: [
      AccountBalancesQueryOptions(address),
      TokenQueryOptions("EVMOS"),
      TokenQueryOptions("OSMO"),
      TokenPricesQueryOptions(),
    ],

    combine: ([
      { data: balances },
      { data: evmosToken },
      { data: osmoToken },
      { data: tokenPrices },
    ]) => {
      if (!osmoToken || !evmosToken || !balances) {
        return {
          pending: true,
          data: null,
        } as const;
      }

      const osmoBalance =
        balances
          ?.find(
            (balance) => balance.symbol === "OSMO" && balance.type === "ERC20",
          )
          ?.value.toString() ?? "0";

      const evmosBalance =
        balances
          ?.find(
            (balance) => balance.symbol === "EVMOS" && balance.type === "ICS20",
          )
          ?.value.toString() ?? "0";

      const osmosis = {
        ...osmoToken,
        chain: "Osmosis",
        balance: osmoBalance,
        price:
          tokenPrices?.find((token) =>
            token.coinDenoms.includes(osmoToken.coinDenom),
          )?.usd.price ?? null,
        osmosisDenom: osmoToken.minCoinDenom,
      } as const;

      const evmos = {
        ...evmosToken,
        chain: "Evmos",
        balance: evmosBalance,
        price:
          tokenPrices?.find((token) =>
            token.coinDenoms.includes(evmosToken.coinDenom),
          )?.usd.price ?? null,
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
    },
  });

  // const osmosis: SwapOption = {
  //   erc20Address: osmoToken.erc20Address,
  //   name: osmoBalance?.name ?? "Osmo",
  //   symbol: osmoBalance?.symbol ?? "OSMO",
  //   tokenIdentifier: osmoBalance?.tokenIdentifier ?? "",
  //   chain: "Osmosis",
  //   balance: osmoBalance?.erc20Balance ?? "0",
  //   price: parseFloat(osmoBalance?.coingeckoPrice ?? "0"),
  //   decimals: parseInt(osmoBalance?.decimals ?? "6"),
  //   osmosisDenom: "uosmo",
  // };

  // const evmos: SwapOption = {
  //   erc20Address: evmosBalance?.erc20Address ?? "",
  //   name: evmosBalance?.name ?? "Evmos",
  //   symbol: evmosBalance?.symbol ?? "EVMOS",
  //   tokenIdentifier: evmosBalance?.tokenIdentifier ?? "",
  //   chain: "Evmos",
  //   balance: evmosBalance?.cosmosBalance ?? "0",
  //   price: parseFloat(evmosBalance?.coingeckoPrice ?? "0"),
  //   decimals: parseInt(evmosBalance?.decimals ?? "18"),
  //   osmosisDenom:
  //     "ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A",
  // };

  // return {
  //   osmosis,
  //   evmos,
  // };
}
