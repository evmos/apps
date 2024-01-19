// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ChainEntity } from "../autogen/chain-entity";

type ChainEntityConfiguration = ChainEntity["configurations"][0];
export type ChainType = ChainEntityConfiguration["configurationType"];
