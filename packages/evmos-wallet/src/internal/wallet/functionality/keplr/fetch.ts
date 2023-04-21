// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchWithTimeout } from "../fetch";
import { EVMOS_BACKEND } from "../networkConfig";
import { NetworkChainConfigResponse } from "./network";

export async function networkConfigByName(network: string) {
  try {
    const res = await fetchWithTimeout(
      `${EVMOS_BACKEND}/NetworkConfig/${network}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    );
    return (await res.json()) as NetworkChainConfigResponse;
  } catch (e) {
    console.log(e);
  }
}
