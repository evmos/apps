import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ERC20BalanceResponse } from "../../../../../components/asset/table/types";
import { StoreType } from "../../../../../redux/Store";
import { addAssets, addDolarAssets } from "../../../../asset/style/format";
import { getAssetsForAddress } from "../../../functionality/hooks/fetch";

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
        }).toFixed(2),
        valueInDollars: addDolarAssets({
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
