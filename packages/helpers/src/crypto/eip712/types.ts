// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { TypedDataDomain } from "abitype";

import { Hex } from "viem";

type EvmosTypedDataDomain =
  | TypedDataDomain
  | {
      chainId: Hex;
    };

export type EvmosTypedData = {
  domain?: EvmosTypedDataDomain;
  message: Record<string, unknown>;
  primaryType: string;
  types: Record<
    string,
    {
      name: string;
      type: string;
    }[]
  >;
};
