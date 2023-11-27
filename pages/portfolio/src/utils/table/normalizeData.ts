// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { ERC20BalanceResponse } from "../../asset/table/types";

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
  prefix: string;
  pngSrc: string;
  erc20Address: string;
  tokenIdentifier: string;
};

export type TableData = {
  table: TableDataElement[];
  feeBalance: BigNumber;
};

export function normalizeAssetsData(data: ERC20BalanceResponse | undefined) {
  const temp: TableData = { table: [], feeBalance: BigNumber.from(0) };
  data?.balance.map((item) => {
    if (
      item.symbol !== "REGEN" &&
      // TODO: show USK when erc20 balance bug is fixed
      item.symbol !== "USK"
    ) {
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

      if (item.erc20Balance === "") {
        item.erc20Balance = "0";
      }

      if (item.cosmosBalance === "") {
        item.cosmosBalance = "0";
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
        handledByExternalUI: external ?? null,
        coingeckoPrice: Number(item.coingeckoPrice),
        prefix: item.prefix,
        pngSrc: item.pngSrc,
        erc20Address: item.erc20Address,
        tokenIdentifier: item.tokenIdentifier,
      });
    }
  });
  return temp;
}
