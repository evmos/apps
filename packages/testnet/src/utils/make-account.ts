// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { mnemonicToAccount } from "viem/accounts";
import { bech32 } from "bech32";

export const makeAccount = (
  key: string,
  mnemonic: string,
  initialBalance = 10000000n
) => {
  const { address, publicKey } = mnemonicToAccount(mnemonic);
  const words = bech32.toWords(Buffer.from(address.slice(2), "hex"));
  return {
    key,
    mnemonic,
    hexAddress: address,
    evmosAddress: bech32.encode("evmos", words),

    publicKey,
    initialBalance,
  };
};
