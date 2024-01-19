// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TEST_ACCOUNTS } from "../utils/test-accounts";
import { Config } from "./cosmos-config";
import { pool } from "../utils/pool";
import { getChainClient } from "../utils/get-chain-client";

export const watchProposalsByTitle = async (config: Config, title: string) => {
  const client = await getChainClient(config);
  const { logger } = config;

  // let proposalId: string | undefined;
  logger.info(`Watching new proposals to vote`);
  const proposalId = await pool(async () => {
    try {
      const [response] = await client([
        "query",
        "gov",
        "proposals",
        "--status",
        "voting_period",
        "--output",
        "json",
      ]).exited;

      const { proposals } = JSON.parse(response) as {
        proposals: {
          id: string;

          title: string;
        }[];
      };

      const proposal = proposals.find((content) => content.title === title);
      return proposal?.id ?? false;
    } catch (e) {
      return false;
    }
  });

  logger.info(`Found proposals to vote, voting yes...`);

  await client([
    "tx",
    "gov",
    "vote",
    proposalId,
    "yes",
    "--from",
    TEST_ACCOUNTS.thevalidator.key,
    "--yes",
    "--keyring-backend",
    "test",
    "--gas",
    "3000000",
    "--gas-prices",
    `25000000000${config.baseDenom}`,
  ]).exited;
};
