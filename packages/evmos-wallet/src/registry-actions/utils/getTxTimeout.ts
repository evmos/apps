// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { apiTendermintStatus } from "../../api";
import { getChain } from "../get-chain";
import { Prefixish } from "./normalize-to-prefix";

export const getTxTimeout = async (prefix: Prefixish) => {
  const chain = getChain(prefix);
  const { result } = await apiTendermintStatus(chain.tendermintRest);
  return {
    revisionHeight: BigInt(chain.cosmosId.split("-").at(-1) ?? 0),
    revisionNumber: BigInt(result.sync_info.latest_block_height) + 500n,
  };
};
