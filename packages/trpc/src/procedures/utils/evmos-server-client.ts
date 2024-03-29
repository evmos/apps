// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Chain, createPublicClient, http } from "viem";

import { EVMOS_CONFIG_MAP } from "helpers/src/evmos-info";
import { raise } from "helpers";
import { get } from "lodash-es";
import { fetchPreferredEvmJsonRpcUrl } from "../metrics/queries/fetch-preferred-evm-json-rpc-url";
export const evmosServerClient = async (chain: string) =>
  createPublicClient({
    chain:
      (get(EVMOS_CONFIG_MAP, chain) as Chain) ??
      raise(`Chain ${chain} not supported`),

    transport: http((await fetchPreferredEvmJsonRpcUrl(chain)).preferred),
  });
