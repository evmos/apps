// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ERC20BalanceResponse } from "./types";
import { getAssetsForAddress } from "./fetch";
import { addAssets, addDollarAssets, amountToDollars } from "helpers";
import { BigNumber } from "@ethersproject/bignumber";
import { useAccount } from "wagmi";
import { normalizeToEvmos } from "../wallet";
export const useAssets = () => {
  const { address = "" } = useAccount();

  const assets = useQuery<ERC20BalanceResponse, Error>({
    queryKey: ["commonAssets", address],
    queryFn: () =>
      getAssetsForAddress(
        address ? normalizeToEvmos(address) : address,
        address
      ),
  });
  const balance = assets.data?.balance ?? [];

  const getAssetsForMissionControl = useMemo(() => {
    if (assets.data === undefined) {
      return [];
    }

    return (
      balance.slice(0, 3).map((item) => {
        return {
          symbol: item.symbol,
          description: item.description,
          valueInTokens: addAssets({
            erc20Balance: BigNumber.from(item.erc20Balance),
            decimals: Number(item.decimals),
            cosmosBalance: BigNumber.from(item.cosmosBalance),
          }).toFixed(2),
          valueInDollars: addDollarAssets({
            erc20Balance: BigNumber.from(item.erc20Balance),
            decimals: Number(item.decimals),
            coingeckoPrice: Number(item.coingeckoPrice),
            cosmosBalance: BigNumber.from(item.cosmosBalance),
          }).toFixed(2),
        };
      }) ?? []
    );
  }, [assets.data]);

  const getTotalAssetsForMissionControl = useMemo(() => {
    let total = 0;

    if (assets.data === undefined) {
      return total;
    }

    balance.forEach((item) => {
      if (item.erc20Balance !== undefined && item.cosmosBalance !== undefined) {
        total =
          total +
          parseFloat(
            amountToDollars(
              BigNumber.from(item.cosmosBalance),
              Number(item.decimals),
              Number(item.coingeckoPrice)
            )
          ) +
          parseFloat(
            amountToDollars(
              BigNumber.from(item.erc20Balance),
              Number(item.decimals),
              Number(item.coingeckoPrice)
            )
          );
      }
    });

    return total;
  }, [assets.data]);

  const getEvmosPrice = useMemo(() => {
    if (assets.data === undefined || balance.length === 0) {
      return "--";
    }

    return balance[0]?.coingeckoPrice ?? "--";
  }, [assets.data]);

  const getEvmosPriceChange = useMemo(() => {
    if (assets.data === undefined || balance.length === 0) {
      return "0";
    }

    return balance[0]?.price24HChange ?? "0";
  }, [assets.data]);

  const getTotalEvmos = useMemo(() => {
    // returns the amount of evmos and wrap evmos
    let total = BigNumber.from(0);

    if (assets.data === undefined || balance.length === 0) {
      return total;
    }

    const evmosData = balance.filter((i) => i.symbol.toLowerCase() === "evmos");

    total = BigNumber.from(evmosData[0]?.cosmosBalance).add(
      BigNumber.from(evmosData[0]?.erc20Balance)
    );

    return total;
  }, [assets.data]);

  const evmosPriceFixed = useMemo(() => {
    if (assets.data === undefined || balance.length === 0) {
      return "-";
    }

    return `$${Number(balance[0]?.coingeckoPrice).toFixed(2)}`;
  }, [assets.data]);
  return {
    sourceData: assets.data,
    assets: getAssetsForMissionControl,
    totalAssets: getTotalAssetsForMissionControl,
    totalEvmosAsset: getTotalEvmos,
    evmosPrice: getEvmosPrice,
    evmosPriceChange: getEvmosPriceChange,
    evmosPriceFixed,
    loading: assets.isLoading,
    error: assets.error,
  };
};
