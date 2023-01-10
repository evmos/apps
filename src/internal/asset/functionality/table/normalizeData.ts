import { BigNumber } from "@ethersproject/bignumber";
import { ERC20BalanceResponse } from "../../../../components/asset/table/types";
import { BIG_ZERO } from "../../../common/math/Bignumbers";

export type TableDataElement = {
  name: string;
  cosmosBalance: BigNumber;
  decimals: number;
  description: string;
  erc20Balance: BigNumber;
  symbol: string;
  tokenName: string;
  chainId: string;
  chainIdentifier: string;
  handledByExternalUI: null | { handlingAction: string; url: string };
  coingeckoPrice: number;
  pngSrc: string;
  erc20Address: string;
};

export type TableData = {
  table: TableDataElement[];
  feeBalance: BigNumber;
};

export function normalizeAssetsData(data: ERC20BalanceResponse | undefined) {
  const temp: TableData = { table: [], feeBalance: BIG_ZERO };
  data?.balance.map((item) => {
    if (item.symbol !== "stATOM" && item.symbol !== "REGEN") {
      let external = null;
      if (
        item.handledByExternalUI !== null &&
        item.handledByExternalUI.length > 0
      ) {
        external = item.handledByExternalUI[0];
      }
      if (item.tokenName.toUpperCase() === "EVMOS") {
        temp.feeBalance = BigNumber.from(item.cosmosBalance);
      }
      temp.table.push({
        name: item.name,
        cosmosBalance: BigNumber.from(item.cosmosBalance),
        decimals: parseInt(item.decimals, 10),
        description: item.description,
        erc20Balance: BigNumber.from(item.erc20Balance),
        symbol: item.symbol,
        tokenName: item.tokenName,
        chainId: item.chainId,
        chainIdentifier: item.chainIdentifier,
        handledByExternalUI: external,
        coingeckoPrice: Number(item.coingeckoPrice),
        pngSrc: item.pngSrc,
        erc20Address: item.erc20Address,
      });
    }
  });
  return temp;
}
