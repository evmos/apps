import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import { ERC20BalanceResponse } from "../../types";
import { getAssetsForAddress } from "../../fetch";
import { addAssets, addDollarAssets, amountToDollars } from "helpers";

const useAssetsTopBar = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const assets = useQuery<ERC20BalanceResponse, Error>({
    queryKey: [
      "commonAssets",
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
        }).toFixed(2),
        valueInDollars: addDollarAssets({
          erc20Balance: BigNumber.from(item.erc20Balance),
          decimals: Number(item.decimals),
          coingeckoPrice: Number(item.coingeckoPrice),
          cosmosBalance: BigNumber.from(item.cosmosBalance),
        }).toFixed(2),
      };
    });
  }, [assets.data]);

  const getTotalAssetsForMissionControl = useMemo(() => {
    let total = 0;

    if (assets.data === undefined) {
      return total;
    }

    assets.data.balance.map((item) => {
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
    if (assets.data === undefined || assets.data.balance.length === 0) {
      return "--";
    }

    return assets.data.balance[0].coingeckoPrice;
  }, [assets.data]);

  const getTotalEvmos = useMemo(() => {
    // returns the amount of evmos and wrap evmos
    let total = BigNumber.from(0);

    if (assets.data === undefined || assets.data.balance.length === 0) {
      return total;
    }

    const evmosData = assets.data.balance.filter(
      (i) => i.symbol.toLowerCase() === "evmos"
    );

    total = BigNumber.from(evmosData[0].cosmosBalance).add(
      BigNumber.from(evmosData[0].erc20Balance)
    );

    return total;
  }, [assets.data]);

  return {
    assets: getAssetsForMissionControl,
    totalAssets: getTotalAssetsForMissionControl,
    totalEvmosAsset: getTotalEvmos,
    evmosPrice: getEvmosPrice,
    loading: assets.isLoading,
    error: assets.error,
  };
};

export default useAssetsTopBar;
