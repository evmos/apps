// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import createClient from "openapi-fetch";
import { paths } from "./cosmos-client";

import { getPubUrl } from "./get-pub-url";

export const cosmos = (
  chain: string,
  config: {
    baseUrl?: string;
    fetch?: typeof fetch;
  } = {},
) => {
  return createClient<paths>({
    baseUrl: getPubUrl() + `/api/cosmos-rest/${chain}/`,
    fetch,
    ...config,
  });
};

export type CosmosClientPaths = paths;
