// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { FormattedBalance, Prefix } from "./types";
import { Address, isEvmosAddress, normalizeToEvmos } from "../wallet/utils";
import { isHex } from "viem";
import { getERC20TokenBalances } from "./get-erc20-token-balances";
import { getCosmosBalances } from "./get-cosmos-balances";

export const getAccountBalances = async ({
  address,
}: {
  address: Address<Prefix>;
}) => {
  const addressAsCosmos = isHex(address) ? normalizeToEvmos(address) : address;
  const balances = await getCosmosBalances({ address: addressAsCosmos });
  if (!isEvmosAddress(address)) {
    return balances;
  }

  return sortEmptyBalanceLast([
    ...balances,
    ...(await getERC20TokenBalances({
      address: normalizeToEvmos(address),
    })),
  ]);
};

const sortEmptyBalanceLast = (balances: FormattedBalance[]) => {
  return balances.sort((a, b) => {
    return b.value === 0n ? 1 : -1;
  });
};
