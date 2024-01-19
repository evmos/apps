// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";
import { fetchChains } from "@evmosapps/registry/src/fetch-chains";
import { fetchTokenPrices } from "./fetch-token-prices.server";
import { raise } from "helpers";
import { ERC20BalanceResponse } from "../api/types";

export const fetchLegacyERC20ModuleBalance =
  async (): Promise<ERC20BalanceResponse> => {
    const [{ tokens: registryToken }, tokenPrices, { chains }] =
      await Promise.all([fetchTokens(), fetchTokenPrices(), fetchChains()]);
    const chainMap = Object.fromEntries(
      chains.map((chain) => [chain.identifier, chain]),
    );
    const tokenPriceMap = Object.fromEntries(
      tokenPrices.map((tokenPrice) => [tokenPrice.coingeckoId, tokenPrice]),
    );
    const balance = registryToken
      .filter((token) => token.networkType === "mainnet")
      .map((token) => {
        const tokenPrice = tokenPriceMap[token.coingeckoId];
        const chain = chainMap[token.source] ?? raise("chain not found");
        return {
          name: token.name,
          cosmosBalance: "0",
          decimals: String(token.exponent),
          description: token.description,
          erc20Balance: "0",
          symbol: token.coinDenom,
          tokenName: token.coinDenom,
          chainId: chain.chainId,
          chainIdentifier: chain.identifier,
          handledByExternalUI: token.handledByExternalUI ?? null,
          coingeckoPrice: String(tokenPrice?.usd.price ?? "0"),
          prefix: chain.prefix,
          pngSrc: token.img?.png ?? "",
          erc20Address: token.erc20Address,
          tokenIdentifier: token.tokenRepresentation,
          price24HChange: String(tokenPrice?.usd.priceChange ?? "0"),
        };
      })
      .sort((a, b) => {
        return a.tokenName === "EVMOS" ? -1 : b.tokenName === "EVMOS" ? 1 : 0;
      });

    return { balance };
  };
