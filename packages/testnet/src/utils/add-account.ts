// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BASEDIR } from "./constants";
import { readJson, writeJson } from "./handlejson";
import path from "path";
import { makeAccount } from "./make-account";
import { TEST_ACCOUNTS } from "./test-accounts";
export type StoredAccount = {
  key: string;
  mnemonic: string;
  initialBalance: string;
};
const accountsFile = path.join(BASEDIR, "accounts.json");
export const readAccounts = async () => {
  let accounts: StoredAccount[] = [];
  try {
    accounts = await readJson<StoredAccount[]>(accountsFile);
  } catch (error) {}

  return accounts.map(({ key, mnemonic, initialBalance }) =>
    makeAccount(key, mnemonic, BigInt(initialBalance)),
  );
};

export const writeAccounts = async (accounts: StoredAccount[]) => {
  await writeJson(accountsFile, accounts);
};

export const pushAccount = async (account: StoredAccount) => {
  const accounts = await readAccounts();
  await writeAccounts([
    ...accounts.map(({ key, mnemonic, initialBalance }) => ({
      key,
      mnemonic,
      initialBalance: initialBalance.toString(),
    })),
    account,
  ]);
};

export const getAllAccounts = async () => {
  return [...Object.values(TEST_ACCOUNTS), ...(await readAccounts())];
};
