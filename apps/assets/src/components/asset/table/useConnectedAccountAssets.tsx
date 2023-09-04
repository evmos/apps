import { useQuery } from "@tanstack/react-query";
import { EVMOS_BACKEND, WalletExtension } from "evmos-wallet";
import { ERC20BalanceResponse } from "./types";
import { useAccount } from "wagmi";
import { ethToEvmos } from "@evmos/address-converter";
import { BigNumber } from "@ethersproject/bignumber";
import { useMemo } from "react";
import {
  TableData,
  normalizeAssetsData,
} from "../../../internal/asset/functionality/table/normalizeData";

export function useAssets() {
  const { address } = useAccount();
  return useQuery({
    refetchInterval: 10000,
    queryKey: ["assets", address],

    queryFn: async () => {
      const response = await fetch(
        `${EVMOS_BACKEND}/ERC20ModuleBalance` +
          (address ? `/${ethToEvmos(address)}/${address}` : "")
      );
      return (await response.json()) as ERC20BalanceResponse;
    },
    enabled: !!address,
  });
}
