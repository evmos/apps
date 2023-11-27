// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  isEthereumAddressValid,
  isEvmosAddressValid,
} from "../components/vesting/helpers";
import { VestingResponse } from "./types";
import { EVMOS_BACKEND } from "@evmosapps/evmos-wallet";

export const getVesting = async (account?: string) => {
  const acc = account?.trim();
  let address: string = "";

  if (acc === undefined) {
    return { error: "There is no vesting account linked to this address." };
  }
  if (typeof acc !== "string") {
    return { error: "There is no vesting account linked to this address." };
  }
  if (isEthereumAddressValid(acc)) {
    address = acc;
  }
  if (isEvmosAddressValid(acc)) {
    address = acc;
  }
  if (address === "") {
    return { error: "There is no vesting account linked to this address." };
  }

  try {
    const res = await fetch(`${EVMOS_BACKEND}/v2/vesting/${address}`);
    return res.json() as Promise<VestingResponse | { error: string }>;
  } catch (error) {
    return { error: "Error while getting vesting account info" };
  }
};
