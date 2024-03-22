// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { useMemo } from "react";
import { TableDataElement } from "../table/normalizeData";

type accordionData = {
  address: string;
  name: string;
  icon: string;
  total: BigNumber;
  tokens: TableDataElement[];
  img: string;
  symbol: string;
  decimals: number;
};

export const useDataTokens = ({
  tableData,
}: {
  tableData: TableDataElement[];
}) => {
  const data = useMemo(() => {
    const map = new Map<string, accordionData>();
    tableData?.forEach((e) => {
      if (
        (e.chainIdentifier === "Stride" && map.has(e.chainIdentifier)) ||
        (e.chainIdentifier === "Quicksilver" && map.has(e.chainIdentifier))
      ) {
        const temp = map.get(e.chainIdentifier);
        if (temp === undefined) {
          return;
        }
        temp.tokens.push(e);
        temp.total = temp.total.add(e.erc20Balance);
      } else if (
        e.chainIdentifier === "Stride" ||
        e.chainIdentifier === "Quicksilver"
      ) {
        map.set(e.chainIdentifier, {
          address: e.erc20Address,
          name: e.chainIdentifier,
          icon: e.chainIdentifier,
          total: e.erc20Balance,
          img: e.pngSrc,
          symbol: e.symbol,
          decimals: e.decimals,
          tokens: [e],
        });
      } else if (map.has(e.tokenIdentifier)) {
        const temp = map.get(e.tokenIdentifier);
        if (temp === undefined) {
          return;
        }
        temp.tokens.push(e);
        temp.total = temp.total.add(e.erc20Balance);
      } else {
        map.set(e.tokenIdentifier, {
          address: e.erc20Address,
          name: e.tokenIdentifier,
          icon: e.tokenIdentifier,
          total: e.erc20Balance,
          img: e.pngSrc,
          symbol: e.symbol,
          decimals: e.decimals,
          tokens: [e],
        });
      }
    });

    return map;
  }, [tableData]);

  return { dataTokens: data };
};
