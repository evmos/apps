// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ChainRef } from "../../../autogen/registry";
import { serverCosmos } from "../utils/cosmos-server-client";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

import { isValidCosmosAddress } from "helpers/src/crypto/addresses/is-valid-cosmos-address";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";
import { Address } from "helpers/src/crypto/addresses/types";

export const fetchAccountEvmosRewards = async ({
  chainRef,
  address,
}: {
  chainRef: ChainRef | (string & {});
  address: Address;
}) => {
  const cosmos = await serverCosmos(chainRef);
  const { data = {} } = await cosmos.GET(
    "/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards",
    {
      params: {
        path: {
          delegator_address: normalizeToCosmos(address),
        },
      },
      next: {
        revalidate: 5 * 60,
      },
    },
  );
  console.log(address, chainRef, data);
  return {
    rewards: data.rewards?.flatMap(({ reward, validator_address }) => {
      if (isValidCosmosAddress(validator_address) === false) {
        return [];
      }
      return [
        {
          amount:
            reward?.reduce((acc, { amount }) => {
              return acc + safeBigInt(amount ?? 0n);
            }, 0n) ?? 0n,

          validatorAddress: validator_address,
        },
      ];
    }),
    total:
      data.total?.reduce((acc, { amount }) => {
        return acc + safeBigInt(amount ?? 0n);
      }, 0n) ?? 0n,
  };
};
