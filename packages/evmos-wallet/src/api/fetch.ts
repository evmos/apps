// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Hex } from "viem";
import { EVMOS_BACKEND } from "../internal/wallet/functionality/networkConfig";
import { getAccountBalances } from "../registry-actions";
import { ERC20Element, StakingInfoResponse } from "./types";
import { trpc } from "@evmosapps/trpc/client";

import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { ERC20BalanceResponse } from "@evmosapps/trpc/procedures/legacy/queries/legacy-erc20modules";

const getAssets = async () => {
  return await trpc.legacyERC20ModuleBalance.query();
};

export const getAssetsForAddress = async (
  address?: string
): Promise<ERC20BalanceResponse> => {
  // If not wallet selected return everything empty
  if (!address) {
    return await getAssets();
  }
  const [{ balance: assets }, balances] = await Promise.all([
    getAssets(),
    getAccountBalances({ address: normalizeToCosmos(address as Hex) }),
  ]);

  const balancesMap = Object.fromEntries(
    balances.map((balance) => [balance.denom + "-" + balance.type, balance])
  );

  return {
    balance: assets
      .map((asset) => {
        const cosmosBalance =
          balancesMap[asset.tokenName + "-" + "ICS20"]?.value.toString() ?? "0";
        const erc20Balance =
          balancesMap[asset.tokenName + "-" + "ERC20"]?.value.toString() ?? "0";

        return {
          ...asset,

          cosmosBalance,
          erc20Balance,
        } satisfies ERC20Element;
      })
      .sort((a, b) => {
        if (a.tokenName === "EVMOS") {
          return -1;
        }
        if (b.tokenName === "EVMOS") {
          return 1;
        }
        return BigInt(a.cosmosBalance) + BigInt(a.erc20Balance) >
          BigInt(b.cosmosBalance) + BigInt(b.erc20Balance)
          ? -1
          : 1;
      }),
  } satisfies ERC20BalanceResponse;
};

export const getStakingInfo = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return {
      delegations: [],
      undelegations: [],
      rewards: { rewards: [], total: [] },
    };
  }
  const res = await fetch(`${EVMOS_BACKEND}/stakingInfo/${address}`);
  return res.json() as Promise<StakingInfoResponse>;
};
