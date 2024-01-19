// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Prefix } from "./types";
import { Address, normalizeToCosmosAddress } from "../wallet/utils";
import { apiCosmosAccountByAddress } from "../api";
import { getChainByAddress } from "./get-chain-by-account";

export const getAccountInfo = async ({
  address,
}: {
  address: Address<Prefix>;
}) => {
  const chain = getChainByAddress(address);
  return await apiCosmosAccountByAddress(
    chain.cosmosRest,
    normalizeToCosmosAddress(address),
  );
};
