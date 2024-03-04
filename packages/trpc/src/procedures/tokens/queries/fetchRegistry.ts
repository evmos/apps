// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use server";
import { TokenEntity } from "@evmosapps/registry/autogen/token-entity";
import { ChainEntity } from "@evmosapps/registry/autogen/chain-entity";
import { getPubUrl } from "helpers/src/clients/get-pub-url";

export const fetchRegistry = async () => {
  const res = await fetch(getPubUrl() + "/api/registry");
  return (await res.json()) as {
    tokens: TokenEntity[];
    chains: ChainEntity[];
  };
};
