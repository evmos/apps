// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use server";
import { cosmos } from "helpers/src/clients/cosmos";
import { Address } from "helpers/src/crypto/addresses/types";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";

export const getRewards = async (chainRef: string, sender: Address) => {
  const client = cosmos(chainRef);
  const res = await client.GET(
    "/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards",
    { params: { path: { delegator_address: normalizeToCosmos(sender) } } },
  );
  return (
    res.data?.rewards?.flatMap(({ reward, validator_address }) => {
      return (
        reward?.flatMap(({ amount, denom }) => {
          if (!amount || !denom || !validator_address) return [];
          return [
            {
              amount: safeBigInt(amount),
              denom,
              validatorAddress: validator_address,
            },
          ];
        }) ?? []
      );
    }) ?? []
  );
};
