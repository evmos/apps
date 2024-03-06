// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { nextCache } from "helpers/src/next/cache";
import { assert } from "helpers";
import { fetchEVMJsonRpcMetrics } from "./fetch-evm-json-rpc-metrics";
import { seconds } from "helpers/src/time";

const mainNetApiUrl =
  process.env.NEXT_PUBLIC_EVMOS_EVM_JSON_RPC || "https://proxy.evmos.org/web3";
export const fetchPreferredEvmJsonRpcUrl = nextCache(
  async (chain: string) => {
    if (chain === "evmos") {
      return {
        preferred: mainNetApiUrl,
        urls: [mainNetApiUrl],
      };
    }
    const { results } = await fetchEVMJsonRpcMetrics(chain);

    const [best, ...others] = results.flatMap(({ url, error }) => {
      if (error || !url) {
        return [];
      }
      return [url];
    });
    assert(best, "No metrics found");
    return {
      preferred: best,
      urls: [best, ...others] as [string, ...string[]],
    };
  },
  ["fetchPreferredEvmJsonRpcUrl"],
  {
    revalidate: seconds("10m"),
  },
);
