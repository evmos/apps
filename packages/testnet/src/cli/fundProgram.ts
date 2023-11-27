import { evmosConfig } from "../initializers";
import { createCommand } from "@commander-js/extra-typings";
import { readAccounts } from "../utils/add-account";
import { TEST_ACCOUNTS } from "../utils/test-accounts";
import { Log } from "helpers";
import { Config, createConfig } from "../cosmos/cosmos-config";
import { getChainClient } from "../utils/get-chain-client";

const fundEvmosAccount = async (
  config: Config,
  accountKeyOrAddress: string,
  amount: string
) => {
  const accounts = await readAccounts();
  const address = accountKeyOrAddress.startsWith("evmos1")
    ? accountKeyOrAddress
    : accounts.find((account) => account.key === accountKeyOrAddress)
        ?.evmosAddress;
  if (!address) {
    Log().error("Account not found");
    return;
  }
  const client = await getChainClient(config);
  const response = await client([
    "tx",
    "bank",
    "send",
    TEST_ACCOUNTS.thevalidator.key,
    address,
    `${amount}${config.baseDenom}`,
    "--gas-prices",
    `25000000000${config.baseDenom}`,

    "--gas",
    "3000000",
    "--yes",
  ]).exited;

  console.log(response);
};
export const fundProgram = createCommand("fund").description(
  "Fund an account with tokens"
);
fundProgram
  .command("evmos <accountKeyOrAddress> <amount>")
  .action(async (accountKeyOrAddress, amount) => {
    await fundEvmosAccount(
      createConfig(evmosConfig),
      accountKeyOrAddress,
      amount
    );
  });
