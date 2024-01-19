// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { multiply } from "helpers";

export const buffGasEstimate = (gas: bigint) => multiply(gas, 1.5);
