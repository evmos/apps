// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";
import { toIBCDenom } from "helpers";

import { TEST_ACCOUNTS } from "../utils/test-accounts";
import { Config } from "./cosmos-config";
import { get } from "lodash-es";
import { pool } from "../utils/pool";
import { getTokenPairsFromNetwork } from "./get-token-pairs-from-network";
import { watchProposalsByTitle } from "./watch-proposals-by-title";
import { getChainClient } from "../utils/get-chain-client";
import { writeJson } from "../utils/handlejson";

export const registerCoinTokenPair = async (
  evmosConfig: Config,
  counterpartyConfig: Config,
  {
    denom,
    symbol,
    exponent = 18,
    channelId,
  }: { denom: string; symbol: string; exponent?: number; channelId: string },
) => {
  const evmosClient = await getChainClient(evmosConfig);
  const counterpartyClient = await getChainClient(counterpartyConfig);

  const { logger } = evmosConfig;
  logger.info(
    "Before registering a token pair, we need to have some amount of the token in Evmos supply",
  );
  logger.info(
    `Transferring ${counterpartyConfig.baseDenom} to ${evmosConfig.chainName}`,
  );

  const destinationAccount = TEST_ACCOUNTS.relayer.evmosAddress;
  await counterpartyClient([
    "tx",
    "ibc-transfer",
    "transfer",
    "transfer",
    "channel-0",
    destinationAccount,
    "1000uatom",
    "--from",
    TEST_ACCOUNTS.thevalidator.key,
    "--yes",
    "--chain-id",
    counterpartyConfig.chainId,
    "--node",
    "http://localhost:26667",
    "--fees",
    `1389${counterpartyConfig.baseDenom}`,
    "--gas",
    "138823",
    "--packet-timeout-height",
    "0-0",
  ]).exited;

  const ibcDenom = toIBCDenom("transfer", channelId, denom);

  logger.info("Watching destination account for the token to arrive");
  await pool(async () => {
    const resp = (await (
      await fetch(
        `http://127.0.0.1:${evmosConfig.api.cosmos}/cosmos/bank/v1beta1/balances/${destinationAccount}/by_denom?denom=${ibcDenom}`,
      )
    ).json()) as unknown;

    const balance: string = get(resp, "balance.amount", "0");
    if (BigInt(balance) > 0n) {
      logger.info(`Tokens arrived!`);
      return true;
    }
    logger.info(`No tokens found yet, waiting tokens...`);
    return false;
  });

  const metadata = {
    metadata: [
      {
        description: `The native token of the ${evmosConfig.chainId} chain. `,
        denom_units: [
          {
            denom: ibcDenom,
            exponent: 0,
            aliases: [denom],
          },
          {
            denom: symbol,
            exponent,
          },
        ],
        base: ibcDenom,
        display: symbol,
        name: symbol,
        symbol: symbol,
      },
    ],
  };

  const tokenMetadataPath = path.join(
    evmosConfig.homeDir,
    `${denom}-metadata.json`,
  );
  await writeJson(tokenMetadataPath, metadata);
  logger.info(`Submitting proposal to registering ${denom} token pair`);

  const proposalTitle = `register ${denom} token pair`;
  await evmosClient([
    "tx",
    "gov",
    "submit-legacy-proposal",
    "register-coin",
    tokenMetadataPath,
    "--from",
    TEST_ACCOUNTS.thevalidator.key,
    "--deposit",
    `10000000${evmosConfig.baseDenom}`,
    "--title",
    proposalTitle,
    "--description",
    `register ${denom} token pair`,
    "--gas-prices",
    `25000000000${evmosConfig.baseDenom}`,
    "--gas",
    "3000000",

    "--yes",
  ]).exited;

  await watchProposalsByTitle(evmosConfig, proposalTitle);
  await pool(async () => {
    const registeredTokenPairs = await getTokenPairsFromNetwork(evmosConfig);
    const isRegistered = registeredTokenPairs.token_pairs.some(
      ({ denom }) => denom === ibcDenom,
    );
    if (isRegistered) {
      logger.info(`Token pair registered!`);
      return true;
    }
    logger.info(`Waiting for token pair to be registered...`);
    return false;
  });
};
