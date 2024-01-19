// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useTokenBalance } from "@evmosapps/evmos-wallet";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchTokenPriceByDenom } from "@evmosapps/evmos-wallet/src/server/fetch-token-price-by-denom.server";
import { raise } from "helpers";

export function useEvmosData() {
  const { address } = useAccount();
  const { balance } = useTokenBalance(address, "evmos:EVMOS");

  // TODO: is used on Header for EvmosPrice component
  const { data } = useQuery({
    queryKey: ["apiFetchTokenPriceByDenom", "evmos"],
    refetchOnWindowFocus: true,
    queryFn: async () =>
      (await fetchTokenPriceByDenom("EVMOS")) ?? raise("Token Price Not Found"),
    refetchInterval: 1000 * 60 * 5,
  });

  return {
    balance: balance?.value.toString() ?? "0",
    evmosPrice: data?.usd.price.toString() ?? "0",
  };
}
