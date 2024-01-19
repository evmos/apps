// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { apiCosmosFetch } from "./api-cosmos-fetch";
import { BlockLatestSchema } from "./api-cosmos-block-latest";

export const apiCosmosBlockByHeight = (
  urls: Readonly<[string, ...string[]]>,
  height: bigint | number | string,
) =>
  apiCosmosFetch(
    BlockLatestSchema,
    urls,
    `/cosmos/base/tendermint/v1beta1/blocks/${height.toString()}`,
  );
