// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { ChainRef } from "../../../autogen/registry";
import { serverCosmos } from "../utils/cosmos-server-client";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";
import { Address } from "helpers/src/crypto/addresses/types";

export const fetchAccountStakedEvmos = async ({
  chainRef,
  address,
}: {
  chainRef: ChainRef | (string & {});
  address: Address;
}) => {
  const cosmos = await serverCosmos(chainRef);

  const { data: delegations } = await cosmos.GET(
    "/cosmos/staking/v1beta1/delegations/{delegator_addr}",
    {
      params: {
        path: {
          delegator_addr: normalizeToCosmos(address),
        },
        query: {
          "pagination.limit": "200",
        },
      },
    },
  );

  return {
    delegations:
      delegations?.delegation_responses?.flatMap(({ balance, delegation }) => {
        const { validator_address, shares, delegator_address } =
          delegation ?? {};
        if (!validator_address || !delegator_address || !balance) return [];

        return [
          {
            amount: safeBigInt(balance.amount ?? "0"),
            validatorAddress: validator_address,
            shares: safeBigInt(shares ?? "0"),
            delegatorAddress: delegator_address,
          },
        ];
      }) ?? [],
    total:
      delegations?.delegation_responses?.reduce((total, delegation) => {
        return total + safeBigInt(delegation.balance?.amount ?? 0);
      }, 0n) ?? 0n,
  };
};
