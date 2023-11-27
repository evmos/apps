import { getChains, getTokens } from "@evmosapps/evmos-wallet";
import { REGISTRY_NETWORK_BLOCK_LIST } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";

export const sortedChains = getChains()
  .filter(
    ({ prefix }) => REGISTRY_NETWORK_BLOCK_LIST.includes(prefix) === false
  )
  .map(({ prefix }) => prefix)
  .sort((a, b) => {
    if (a === "evmos") return -1;
    if (b === "evmos") return 1;

    return a > b ? 1 : -1;
  });

export const sortedTokens = getTokens()
  .filter(
    ({ sourcePrefix, listed }) =>
      listed && REGISTRY_NETWORK_BLOCK_LIST.includes(sourcePrefix) === false
  )
  .sort(({ symbol: a }, { symbol: b }) => {
    if (a === "EVMOS") return -1;
    if (b === "EVMOS") return 1;

    return a > b ? 1 : -1;
  });
