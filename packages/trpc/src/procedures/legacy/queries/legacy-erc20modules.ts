// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { raise } from "helpers";

import { fetchTokenPrices } from "../../tokens/queries/price/fetch-token-prices";
import { fetchChains } from "../../chains/queries/fetch-chains";
import { fetchTokens } from "../../tokens/queries/fetch-tokens";
import { Address } from "helpers/src/crypto/addresses/types";
import { fetchAccountBalances } from "../../account/fetch-account-balances";

export const legacyFetchERC20ModuleBalance = async ({
  chainRef,
  address,
}: {
  chainRef: string;
  address?: Address;
}) => {
  const [registryToken, tokenPrices, chains, balances] = await Promise.all([
    fetchTokens(),
    fetchTokenPrices(),
    fetchChains(),
    address ? fetchAccountBalances({ address, chainRef }) : [],
  ]);
  const chainMap = Object.fromEntries(
    chains.map((chain) => [chain.ref, chain]),
  );
  const tokenPriceMap = Object.fromEntries(
    tokenPrices.map((tokenPrice) => [tokenPrice.coingeckoId, tokenPrice]),
  );

  const balancesMap = Object.fromEntries(
    balances.map((balance) => [balance.denom, balance]),
  );
  const balance = registryToken
    .filter((token) => token.networkType === "mainnet")
    .map((token) => {
      const tokenPrice = tokenPriceMap[token.coingeckoId];
      const chain = chainMap[token.source] ?? raise("chain not found");

      const balance = balancesMap[token.coinDenom];

      return {
        name: token.name,
        decimals: String(token.exponent),
        description: token.description,
        erc20Balance: balance?.balance.erc20.toString() || "0",
        symbol: token.coinDenom,
        tokenName: token.coinDenom,
        chainId: chain.chainId,
        chainIdentifier: chain.ref,
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
      if (a.tokenName === "EVMOS") {
        return -1;
      }
      if (b.tokenName === "EVMOS") {
        return 1;
      }
      return BigInt(a.erc20Balance) > BigInt(b.erc20Balance) ? -1 : 1;
    });

  return { balance };
};
