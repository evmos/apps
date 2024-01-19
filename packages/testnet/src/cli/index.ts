// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { setupTestnet } from "../initializers";
import { createCommand, program } from "@commander-js/extra-typings";
import inquirer from "inquirer";
import { isString } from "lodash-es";
import { english, generateMnemonic } from "viem/accounts";
import {
  StoredAccount,
  pushAccount,
  readAccounts,
  writeAccounts,
} from "../utils/add-account";
import { TEST_ACCOUNTS } from "../utils/test-accounts";
import Table from "cli-table";
import { makeAccount } from "../utils/make-account";
import chalk from "chalk";
import { Log } from "helpers";
import { fundProgram } from "./fundProgram";

const logAccountsWarning = () => {
  Log().info("\n\n");
  const table = new Table({
    colAligns: ["middle"],
  });
  table.push([
    [
      "",
      chalk.yellowBright("WARNING:"),
      "",
      "Account changes only take effect when you recreate testnets",
      "Run `pnpm run testnet start --recreate` to do so",
      "",
    ].join("\n"),
  ]);
  Log().info(table.toString());
};
const accountsProgram = createCommand("accounts").description(
  "Manage your testnet accounts",
);

const startCommand = createCommand("start")
  .option("--compact-logging", "Log only the height of the chains")
  .option("--recreate", "Delete and recreate the testnet")
  .description("Starts local testnet")
  .action(async ({ recreate, compactLogging }) => {
    Log().info("Starting testnet...", recreate, compactLogging);
    await setupTestnet({
      compactLogging,
      enableLogging: true,
      overwrite: recreate,
    });
  });

accountsProgram.command("add").action(async () => {
  const accounts = await readAccounts();
  const answers = (await inquirer.prompt([
    {
      message: "Enter the key of the account",
      name: "key",
      type: "input",
      default: "my-account",
      validate: (input: string) => {
        if (input.length < 1) {
          return "Please enter a valid key";
        }
        if (!isString(input)) {
          return "Please enter a valid key";
        }
        if (accounts.find((account) => account.key === input)) {
          return "Account with this key already exists";
        }

        return true;
      },
    },
    {
      message:
        "Enter the mnemonic of the account\nWARNING: mnemonic will be unsafely stored in plain text so don't use accounts with real funds\n",

      name: "mnemonic",
      type: "input",
      default: generateMnemonic(english),
      validate: (input: string[]) => {
        if (input.length < 1) {
          return "Please enter a valid mnemonic";
        }
        if (!isString(input)) {
          return "Please enter a valid mnemonic";
        }

        return true;
      },
    },
    {
      message: [
        "Enter the initial balance of the account",
        "(Value in the minimum unit of the token. Will be applied to all tokens in all networks)\n",
      ].join("\n"),
      name: "initialBalance",
      type: "input",
      default: "100000000000000000000000",
    },
  ])) as StoredAccount;

  await pushAccount(answers);

  Log().info("\n\n", "Account added successfully 🎉");
  Log().info(answers);
  logAccountsWarning();
});

const wordBreak = (str: string, width: number) => {
  let currLength = 0;

  const words = str.split(" ");
  let sentence = "";

  for (const word of words) {
    if (currLength + word.length > width) {
      currLength = 0;
      sentence += `\n`;
    }

    currLength += word.length;
    sentence += `${word} `;
  }
  return sentence.trim();
};
const logAccounts = (accounts: ReturnType<typeof makeAccount>[]) => {
  accounts.forEach((account) => {
    const table = new Table({
      colWidths: [20, 60],
    });
    Object.entries(account).forEach(([key, value]) => {
      table.push([
        chalk.cyanBright(key.toUpperCase()),
        wordBreak(String(value), 45),
      ]);
    });
    Log().info(table.toString());
    table.length = 0;
  });
};
accountsProgram.command("list").action(async () => {
  const accounts = await readAccounts();

  Log().info("Default test accounts:");
  Log().info("(Feel free to use them, but they can't be deleted or modified)");

  const testAccounts = Object.values(TEST_ACCOUNTS);
  logAccounts(testAccounts);

  if (accounts.length === 0) {
    Log().info("You don't have any custom account yet");
    logAccountsWarning();
    return;
  }
  Log().info("\n\n", "Your accounts:");
  logAccounts(accounts);

  logAccountsWarning();
});

accountsProgram.command("delete").action(async () => {
  const accounts = await readAccounts();
  if (accounts.length === 0) {
    Log().info("You don't have any accounts yet");
    return;
  }
  const answers = (await inquirer.prompt([
    {
      name: "keys",
      type: "checkbox",
      choices: accounts.map((account) => account.key),
      validate: (input: string[]) => {
        if (input.length < 1) {
          return "Please select at least one account";
        }
        return true;
      },
      message: "Select the account you want to delete",
    },
    {
      name: "confirm",
      type: "confirm",
      message({ keys }: { keys: string[] }) {
        return `Are you sure you want to delete ${keys
          .map((key) => `"${key}"`)
          .join(", ")}?`;
      },
    },
  ])) as { keys: string[]; confirm: boolean };

  if (!answers.confirm) {
    Log().info("Aborted");
    return;
  }

  const filteredAccounts = accounts.filter(
    (account) => !answers.keys.includes(account.key),
  );

  await writeAccounts(
    filteredAccounts.map((account) => {
      return {
        key: account.key,
        mnemonic: account.mnemonic,
        initialBalance: account.initialBalance.toString(),
      };
    }),
  );

  Log().info("\n\n", "Account deleted successfully 🎉");
  logAccountsWarning();
});

program
  .addCommand(accountsProgram)
  .addCommand(startCommand)
  .addCommand(fundProgram);
program.parse(process.argv);
