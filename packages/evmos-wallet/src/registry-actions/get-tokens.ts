import { getChains } from "./get-chain";

export const tokens = getChains().flatMap((chain) => {
  return [...chain.tokens];
});
export const getTokens = () => tokens;
