// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo } from "react";
import { TokenRef } from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { useAssets } from "@evmosapps/evmos-wallet";

export const useTokenPrice = (tokenRef: TokenRef) => {
  const { sourceData: assets } = useAssets();

  const priceMap = useMemo(
    () =>
      (assets?.balance ?? []).reduce(
        (acc, { symbol, coingeckoPrice, prefix }) => {
          const ref = `${prefix}:${symbol}` as TokenRef;
          if (!ref) {
            return acc;
          }
          acc[ref] = coingeckoPrice;
          return acc;
        },
        {} as Record<TokenRef, string | undefined>
      ),
    [assets]
  );
  return priceMap[tokenRef];
};
