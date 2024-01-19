// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getChainClient } from "../utils/get-chain-client";
import { Config } from "./cosmos-config";

export const addGenesisAccountsFromList = async (
  config: Config,
  accounts: {
    key: string;
    initialBalance: bigint;
    mnemonic: string;
  }[],
) => {
  const client = await getChainClient(config);

  const createdAccounts: {
    address: string;
    name: string;
    type: string;
    pubkey: string;
    mnemonic: string;
  }[] = [];
  for (const account of accounts) {
    const [registeredAccount] = await client(
      [
        "keys",
        "add",
        account.key,
        "--recover",
        "--output",
        "json",
        "--keyring-backend",
        "test",
        "--home",
        config.homeDir,
      ],
      account.mnemonic,
    ).exited;
    const parsedAccount = JSON.parse(registeredAccount) as {
      address: string;
      name: string;
      type: string;
      pubkey: string;
    };

    createdAccounts.push({
      ...parsedAccount,
      mnemonic: account.mnemonic,
    });

    await client([
      "add-genesis-account",
      account.key,
      `${account.initialBalance}${config.baseDenom}`,
      "--keyring-backend",
      "test",
    ]).exited;
  }

  return createdAccounts;
};
