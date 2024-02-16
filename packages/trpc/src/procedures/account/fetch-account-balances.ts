// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { evmosServerClient } from "../utils/evmos-server-client";
import { Hex, erc20Abi } from "viem";
import { normalizeToEth } from "helpers/src/crypto/addresses/normalize-to-eth";
import { Address } from "helpers/src/crypto/addresses/types";
import { fetchTokenPrices } from "../tokens/queries/price/fetch-token-prices";

import { formatBalance } from "./utils/format-balance";

import { fetchTokens } from "../tokens/queries/fetch-tokens";

export const fetchAccountBalances = async ({
  chainRef,
  address,
}: {
  chainRef: string;
  address: Address;
}) => {
  const [evmosClient, tokens, tokenPrices] = await Promise.all([
    chainRef.startsWith("evmos") ? evmosServerClient(chainRef) : null,
    fetchTokens(),
    fetchTokenPrices(),
  ]);

  const tokenMap = Object.fromEntries(
    tokens.flatMap((token) => {
      if (token.source.startsWith("evmos"))
        return [
          [token.cosmosDenom, token],
          [token.coinDenom, token],
          [token.minCoinDenom, token],
        ];
      return [
        [token.cosmosDenom, token],
        [token.coinDenom, token],
      ];
    }),
  );

  const balanceMap = new Map<
    string,
    {
      erc20: bigint;
    }
  >();
 

  const evmosBalancePromise =
    evmosClient
      ?.multicall({
        contracts: tokens.map((token) => ({
          abi: erc20Abi,
          address: token.erc20Address as Hex,
          functionName: "balanceOf",
          args: [normalizeToEth(address)],
        })),
      })
      .then((balances) => {
        return balances.forEach((response, index) => {
          if (response.status !== "success") return;
          const token = tokens[index];
          if (!token) return;
          const erc20 = BigInt(response.result ?? "0");
          if (erc20 === 0n) return;

          balanceMap.set(token.coinDenom, {
            erc20,
          });
        });
      }) ?? Promise.resolve();
  await Promise.all([evmosBalancePromise]);

  const tokenPriceMap = new Map(
    tokenPrices.map((token) => [token.coingeckoId, token]),
  );
  return [...balanceMap.entries()].flatMap(([denom, { erc20 }]) => {
    const token = tokenMap[denom];
    if (!token) return [];

    return [
      formatBalance({
        token,
        erc20,
        tokenPrice: tokenPriceMap.get(token.coingeckoId),
      }),
    ];
  });
};
