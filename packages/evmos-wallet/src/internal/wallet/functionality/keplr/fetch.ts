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
