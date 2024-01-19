// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import chalk from "chalk";
import { setupRelayer, startRelayer } from "./relayer/setup-relayer";
import Table from "cli-table";
import { getTokenPairsFromNetwork } from "./cosmos/get-token-pairs-from-network";
import { deployMulticallContract } from "./cosmos/deploy-multicall-contract";
import { deployERC20Contract } from "./cosmos/deploy-erc20-contract";
import { registerCoinTokenPair } from "./cosmos/register-coin-token-pair";
import { createNetwork } from "./cosmos/create-network";
import { createLogger } from "./utils/logger";

export const evmosConfig = {
  chainName: "evmos",
  prefix: "evmos",
  moniker: "evmos-testnode",
  chainId: "evmoslocal_9000-10",
  baseDenom: "aevmos",
} as const;
export const setupTestnet = async (
  options: {
    enableLogging?: boolean;
    compactLogging?: boolean;
    overwrite?: boolean;
  } = {}
) => {
  const logger = createLogger({
    enabled: !!options.enableLogging,
    label: "Testnet",
    color: chalk.whiteBright,
  });
  const evmos = await createNetwork({
    ...evmosConfig,
    ...options,
    customizeGenesis: (genesis) => {
      genesis.app_state.gov.params.max_deposit_period = "10s";
      genesis.app_state.gov.params.voting_period = "20s";

      return genesis;
    },
  });

  const cosmoshub = await createNetwork({
    chainName: "cosmos",
    prefix: "cosmos",
    moniker: "cosmos-testnode",
    chainId: "cosmolocal-10",
    baseDenom: "uatom",
    index: 1,
    ...options,
  });

  const { enableLogging, compactLogging } = options;

  logger.info("Let's wait a few blocks to make sure everything is synced");

  await Promise.all([cosmoshub.waitNBlocks(1n), evmos.waitNBlocks(1n)]);

  logger.info(`${cosmoshub.config.chainId} height: ${cosmoshub.getHeight()}`);

  logger.info(`${evmos.config.chainId} height: ${evmos.getHeight()}`);

  try {
    await setupRelayer(evmos.config, cosmoshub.config, options);

    await startRelayer(options);
  } catch (e) {}

  logger.info("Checking if the token pairs are already registered");
  const registeredTokenPairs = await getTokenPairsFromNetwork(evmos.config);

  if (registeredTokenPairs.token_pairs.length === 0) {
    logger.info("No token pairs found, registering them now");
    await deployMulticallContract(evmos.config);
    await deployERC20Contract(evmos.config, {
      name: "Wizz",
      symbol: "WIZZ",
    });

    await registerCoinTokenPair(evmos.config, cosmoshub.config, {
      denom: "uatom",
      symbol: "ATOM",
      channelId: "channel-0",
    });
  }

  logger.info("Checking registered token pairs");
  // sanity check
  const registeredTokens = (
    await getTokenPairsFromNetwork(evmos.config)
  ).token_pairs.map(({ erc20_address }) => erc20_address);
  if (
    !(
      registeredTokens.includes(
        // eslint-disable-next-line no-secrets/no-secrets
        "0x04f9faC55b24c53F39b2aDCbef6318Ee2d9A6B84"
      ) &&
      registeredTokens.includes("0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd")
    )
  ) {
    throw new Error(
      [
        "Something went wrong with the token registration",
        "please, reset your testnet by running `pnpm run testnet start --recreate`",
      ].join("\n")
    );
  }

  if (enableLogging) {
    const log = () => {
      const cosmosHeight = cosmoshub.getHeight().toString();
      const evmosHeight = evmos.getHeight().toString();
      if (compactLogging) {
        logger.info(`Cosmos: ${cosmosHeight} | Evmos: ${evmosHeight}`);
        return;
      }
      const table = new Table({
        head: ["Chain", "Height", ...Object.keys(cosmoshub.config.api)],

        style: {
          head: ["bold"],
        },
      });

      table.push(
        [
          cosmoshub.config.chainId,
          cosmosHeight,
          ...Object.values(cosmoshub.config.api).map((port) => `:${port}`),
        ],
        [
          evmos.config.chainId,
          evmosHeight,
          ...Object.values(evmos.config.api).map((port) => `:${port}`),
        ]
      );
      process.stdout.write("\x1Bc");
      logger.info("All set 🚀");
      logger.raw(table.toString());
    };
    evmos.subscribe(log);

    cosmoshub.subscribe(log);
  }
  return {
    cosmoshub,
    evmos,
  };
};
