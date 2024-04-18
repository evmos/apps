// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { trpc } from "@evmosapps/trpc/client";

import { Address } from "helpers/src/crypto/addresses/types";

import { fromAtto } from "helpers/src/crypto/numbers/from-atto";
import { formatFiatWithoutSymbol } from "helpers/src/format/format-fiat";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils";

export const useTotalBalance = (address: Address) => {
  const chainRef = useEvmosChainRef();

  const [[balance, rewards, staked]] = trpc.useSuspenseQueries((t) => [
    t.account.balance.byDenom({
      address,
      denom: "EVMOS",
      chainRef,
    }),

    t.account.balance.rewards.evmos({
      address,
      chainRef,
    }),

    t.account.balance.staked.evmos({
      address,
      chainRef,
    }),
  ]);

  const total = balance.balance.total + rewards.total + staked.total;

  return {
    totalUsd:
      fromAtto(total, balance.decimals) * (balance.price?.usd.price ?? 0),
    total: formatUnits(total, balance.decimals, 0),
  };
};

export const TotalUsd = ({ address }: { address: Address }) => {
  const { totalUsd } = useTotalBalance(address);
  return formatFiatWithoutSymbol(totalUsd);
};
export const TotalEvmos = ({ address }: { address: Address }) => {
  const { total } = useTotalBalance(address);
  return total;
};
