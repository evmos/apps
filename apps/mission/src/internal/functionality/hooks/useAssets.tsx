// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "@ethersproject/bignumber";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import { ERC20BalanceResponse } from "../../types";
import { addAssets, addDollarAssets } from "helpers";
import { getAssetsForAddress } from "../../fetch";

const useAssets = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const assets = useQuery<ERC20BalanceResponse, Error>({
    queryKey: [
      "missionControlAssets",
      value.evmosAddressCosmosFormat,
      value.evmosAddressEthFormat,
    ],
    queryFn: () =>
      getAssetsForAddress(
        value.evmosAddressCosmosFormat,
        value.evmosAddressEthFormat
      ),
  });

  const getAssetsForMissionControl = useMemo(() => {
    if (assets.data === undefined) {
      return [];
    }

    return assets.data.balance.slice(0, 3).map((item) => {
      return {
        symbol: item.symbol,
        description: item.description,
        valueInTokens: addAssets({
          erc20Balance: BigNumber.from(item.erc20Balance),
          decimals: Number(item.decimals),
          cosmosBalance: BigNumber.from(item.cosmosBalance),
        })
          .toFixed(6)
          .replace(/\.?0+$/, ""),
        valueInDollars: addDollarAssets({
          erc20Balance: BigNumber.from(item.erc20Balance),
          decimals: Number(item.decimals),
          coingeckoPrice: Number(item.coingeckoPrice),
          cosmosBalance: BigNumber.from(item.cosmosBalance),
        }).toFixed(2),
      };
    });
  }, [assets.data]);

  return {
    assets: getAssetsForMissionControl,
    loading: assets.isLoading,
    error: assets.error,
  };
};

export default useAssets;
