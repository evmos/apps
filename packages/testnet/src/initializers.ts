import { spawn } from "child_process";
import path from "path";
import { rm } from "fs/promises";
import chalk from "chalk";
import { toIBCDenom } from "helpers";
import { updateJson, writeJson } from "src/utils/handlejson";
import { Genesis } from "src/types/genesis";

import { TEST_ACCOUNTS } from "./utils/test-accounts";
import { Config, createConfig } from "./cosmos/cosmos-config";
import { init } from "./cosmos/commands/init";
import { addKey } from "./cosmos/commands/addKey";
import { addGenesisAccount } from "./cosmos/commands/addGenesisAccount";
import { gentx } from "./cosmos/commands/gentx";
import { collectGentxs } from "./cosmos/commands/collectGentxs";
import { start } from "./cosmos/commands/start";
import { delay, listenToBlocks } from "./cosmos/listenToBlocks";
import { updateConfigFiles } from "./cosmos/updateConfigFiles";
import { setupRelayer, startRelayer } from "./relayer/setupRelayer";
import { createLogger, logger } from "src/utils/logger";
import Table from "cli-table";
import killPort from "kill-port";
import { SupportedBinaries, downloadBinaries } from "./utils/downloadBinaries";
import { stat } from "fs/promises";
import { createCommandClient } from "./utils/command-client";
import { get } from "lodash-es";
import {
  Hex,
  createPublicClient,
  createWalletClient,
  getContractAddress,
  http,
  multicall3Abi,
} from "viem";

import { mnemonicToAccount } from "viem/accounts";
import { ERC20_CONTRACT_ABI, ercBinaries } from "./utils/erc20";
import { multicallBin } from "./utils/multicallcontract";

const addGenesisAccountsFromList = async (
  config: Config,
  accounts: {
    key: string;
    initialBalance: bigint;
    mneumonic: string;
  }[]
) => {
  const client = await getChainClient(config);

  const createdAccounts: {
    address: string;
    name: string;
    type: string;
    pubkey: string;
    mneumonic: string;
  }[] = [];
  for (const account of accounts) {
    const registeredAccount = await client(
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
      account.mneumonic
    ).exited.then(
      (accounts) =>
        JSON.parse(accounts[0]) as {
          address: string;
          name: string;
          type: string;
          pubkey: string;
        }
    );
    createdAccounts.push({
      ...registeredAccount,
      mneumonic: account.mneumonic,
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

const initialize = async (config: Config) => {
  const { enableLogging, baseDenom, chainId, moniker, chainName, logger } =
    config;
  const client = await getChainClient(config);
  logger.info("Initializing chain configuration");

  await client(["init", moniker, "--chain-id", chainId, "-o"]).exited;

  logger.info(`Setting up initial accounts`);
  await addGenesisAccountsFromList(config, Object.values(TEST_ACCOUNTS));

  logger.info(`Creating genesis files for ${chainName} testnet`);

  await client([
    "gentx",
    TEST_ACCOUNTS.thevalidator.key,
    `1000000000000000000${baseDenom}`,
    "--keyring-backend",
    "test",
    "--chain-id",
    chainId,
    "--yes",
  ]).exited;

  await updateJson<Genesis>(
    path.join(config.homeDir, "config/genesis.json"),
    (genesis) => {
      if (chainName === "evmos") {
        genesis.consensus_params.block.max_gas = "1844674407370955161";
      }

      return JSON.parse(
        JSON.stringify(genesis, null, 2).replace(/"stake"/g, `"${baseDenom}"`)
      );
    }
  );
  logger.info(`Updating configuration files`);
  await updateConfigFiles(config);
};

const getChainClient = (config: Config) =>
  createCommandClient(config.chainName, [
    "--home",
    config.homeDir,
    "--log_format",
    "json",
  ]);

// const log =
//   (message: string) =>
//   <T extends Config>(config: T) => {
//     logger.info(`[${config.chainName}] ${message}`);
//     return config;
//   };

// const createChain = (
//   configParameters: Omit<Parameters<typeof createConfig>[0], "executable"> & {
//     customizeGenesis?: (genesis: Genesis) => Genesis;
//   }
// ) =>
//   Promise.resolve(createConfig(configParameters))
//     .then(log(`Creating local network`))
//     .then(log(`Closing any previous open connections`))

//     .then(async (config) => {
//       try {
//         await fetch(
//           `http://127.0.0.1:${(config.portOffset ?? 0) * 10 + 26657}`
//         );
//         await killPort((config.portOffset ?? 0) * 10 + 26657);
//       } catch (e) {}
//       return config;
//     })
//     .then((config) =>
//       !config.overwrite
//         ? config
//         : Promise.resolve(config)
//             .then(log(`Cleaning up previous testnet`))
//             .then(() => rm(config.homeDir, { recursive: true, force: true }))
//             .then(() => config)
//             // if it fails to delete the directory, it means it doesn't exist so we just proceed
//             .catch(() => config)
//     )
//     .then((config) =>
//       stat(config.homeDir)
//         // chain directory already exists wo we reuse it
//         .then(() => config)
//         .then(log(`Using existing testnet`))
//         // chain directory doesn't exist so we create it
//         .catch(() =>
//           Promise.resolve(config)
//             .then(log(`Initializing ${config.chainName} testnet`))
//             .then(() => initialize(config.chainName, config))
//             .then(() => config)
//         )
//     );

/**
 *  Sometimes in Watch mode the previous api process doesn't get killed, so we do a check here
 */
const killPreviousProcess = async (config: Config) => {
  config.logger.info(`Closing any previous open connections`);
  try {
    await fetch(`http://127.0.0.1:${(config.index ?? 0) * 10 + 26657}`);
    await killPort((config.index ?? 0) * 10 + 26657);
  } catch (e) {}
};
export const create = async (
  configParameters: Omit<Parameters<typeof createConfig>[0], "executable"> & {
    customizeGenesis?: (genesis: Genesis) => Genesis;
  }
) => {
  const { enableLogging, overwrite, customizeGenesis, chainName } =
    configParameters;

  const config = createConfig(configParameters);
  const { logger } = config;

  logger.info(`Cleaning up previous testnet`);
  const client = await getChainClient(config);
  await killPreviousProcess(config);
  if (overwrite) await rm(config.homeDir, { recursive: true, force: true });

  try {
    logger.info(`Checking existing chain configuration`);
    await stat(config.homeDir);
    logger.info(`Testnet already exists, using existing testnet`);
  } catch (e) {
    logger.info(`No existing chain configuration found`);
    await initialize(config);

    await client(["collect-gentxs"]).exited;

    if (customizeGenesis) {
      await updateJson<Genesis>(
        path.join(config.homeDir, "config/genesis.json"),
        customizeGenesis
      );
    }
  }
  logger.info(`Starting ${chainName} testnet node`);

  const startProc = client([
    "start",
    chainName === "evmos" ? "--json-rpc.enable" : "",
  ]);
  const tendermintBlockEvents = await listenToBlocks(config);
  return {
    config,
    ...startProc,
    ...tendermintBlockEvents,
  };
};

const watchProposals = async (config: Config, title: string) => {
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

const registerCoinTokenPair = async (
  evmosConfig: Config,
  counterpartyConfig: Config,
  {
    denom,
    symbol,
    exponent = 18,
    channelId,
  }: { denom: string; symbol: string; exponent?: number; channelId: string }
) => {
  const evmosClient = await getChainClient(evmosConfig);
  const counterpartyClient = await getChainClient(counterpartyConfig);
  const ERC_MODULE_ACCOUNT = "evmos10z9ephaxvz56jrz8gss9psha6sf96gdwqvuntw";
  const { logger } = evmosConfig;
  logger.info(
    "Before registering a token pair, we need to have some amount of the token in Evmos supply"
  );
  logger.info(
    `Transferring ${counterpartyConfig.baseDenom} to ${evmosConfig.chainName}`
  );

  await counterpartyClient([
    "tx",
    "ibc-transfer",
    "transfer",
    "transfer",
    "channel-0",
    ERC_MODULE_ACCOUNT,
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
    const resp = await (
      await fetch(
        `http://127.0.0.1:${evmosConfig.api.cosmos}/cosmos/bank/v1beta1/balances/${ERC_MODULE_ACCOUNT}/by_denom?denom=${ibcDenom}`
      )
    ).json();
    if (BigInt(get(resp, "balance.amount")) > 0n) {
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
    `${denom}-metadata.json`
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

  await watchProposals(evmosConfig, proposalTitle);
  await pool(async () => {
    const registeredTokenPairs = await getTokenPairs(evmosConfig);
    const isRegistered = registeredTokenPairs.token_pairs.some(
      ({ denom }) => denom === ibcDenom
    );
    if (isRegistered) {
      logger.info(`Token pair registered!`);
      return true;
    }
    logger.info(`Waiting for token pair to be registered...`);
    return false;
  });
};

const deployMulticallContract = async (config: Config) => {
  const url = `http://127.0.0.1:${config.api.jsonRpc}`;
  const clientParameters = {
    chain: {
      id: 9000,
      network: "evmos",
      nativeCurrency: {
        decimals: 18,
        name: config.baseDenom,
        symbol: "EVMOS",
      },
      name: "evmos",

      rpcUrls: {
        default: {
          http: [url],
        },
        public: {
          http: [url],
        },
      },
    },
    transport: http(url),
  } as const;
  const publicClient = createPublicClient(clientParameters);
  const walletClient = createWalletClient({
    ...clientParameters,
    account: mnemonicToAccount(TEST_ACCOUNTS.thevalidator.mneumonic),
  });
  const nonce = await pool(async () => {
    try {
      return await publicClient.getTransactionCount({
        address: walletClient.account.address,
      });
    } catch (e) {
      return false;
    }
  });

  const hash = await walletClient.deployContract({
    abi: multicall3Abi,

    bytecode: multicallBin,
  });

  const contractAddress = getContractAddress({
    from: walletClient.account.address,
    nonce: BigInt(nonce),
  });

  await pool(async () => {
    try {
      const newNonce = await publicClient.getTransactionCount({
        address: walletClient.account.address,
      });
      return newNonce !== nonce;
    } catch (e) {
      return false;
    }
  });
  console.log("contractAddress", contractAddress);
  return {
    hash,
    contractAddress,
  };
};
const deployERC20Contract = async (
  config: Config,
  {
    name,
    symbol,
  }: {
    name: string;
    symbol: string;
  }
) => {
  const url = `http://127.0.0.1:${config.api.jsonRpc}`;
  const clientParameters = {
    chain: {
      id: 9000,
      network: "evmos",
      nativeCurrency: {
        decimals: 18,
        name: config.baseDenom,
        symbol: "EVMOS",
      },
      name: "evmos",

      rpcUrls: {
        default: {
          http: [url],
        },
        public: {
          http: [url],
        },
      },
    },
    transport: http(url),
  } as const;
  const publicClient = createPublicClient(clientParameters);
  const walletClient = createWalletClient({
    ...clientParameters,
    account: mnemonicToAccount(TEST_ACCOUNTS.thevalidator.mneumonic),
  });

  const nonce = await pool(async () => {
    try {
      return await publicClient.getTransactionCount({
        address: walletClient.account.address,
      });
    } catch (e) {
      return false;
    }
  });

  const hash = await walletClient.deployContract({
    abi: ERC20_CONTRACT_ABI,
    args: [
      name,
      symbol,
      Object.values(TEST_ACCOUNTS).map((a) => ({
        accountAddress: a.hexAddress as Hex,
        initialBalance: a.initialBalance,
      })),
    ],
    bytecode: ercBinaries,
  });

  const contractAddress = getContractAddress({
    from: walletClient.account.address,
    nonce: BigInt(nonce),
  });

  const evmosClient = await getChainClient(config);

  await pool(async () => {
    try {
      const newNonce = await publicClient.getTransactionCount({
        address: walletClient.account.address,
      });
      return newNonce !== nonce;
    } catch (e) {
      return false;
    }
  });

  const proposalTitle = `register ${symbol} token pair`;
  await evmosClient([
    "tx",
    "gov",
    "submit-legacy-proposal",
    "register-erc20",
    contractAddress,
    "--from",
    TEST_ACCOUNTS.thevalidator.key,
    "--deposit",
    `10000000${config.baseDenom}`,
    "--title",
    proposalTitle,
    "--description",
    `register ${symbol} token pair`,
    "--gas-prices",
    `25000000000${config.baseDenom}`,

    "--gas",
    "3000000",
    "--yes",
  ]).exited;

  await watchProposals(config, proposalTitle);
  await pool(async () => {
    const registeredTokenPairs = await getTokenPairs(config);

    const isRegistered = registeredTokenPairs.token_pairs.some(
      ({ erc20_address }) => erc20_address === contractAddress
    );

    if (isRegistered) {
      logger.info(`Token pair registered!`);
      return true;
    }
    logger.info(`Waiting for token pair to be registered...`);
  });

  return {
    hash,
    contractAddress,
  };
};

const pool = async <T>(fn: () => Promise<T | false>) => {
  while (true) {
    const result = await fn();
    if (result === false) {
      await delay(1000);
    } else {
      return result;
    }
  }
};
const getTokenPairs = (config: Config) =>
  pool(async () => {
    try {
      const response = (await (
        await fetch(
          `http://127.0.0.1:${config.api.cosmos}/evmos/erc20/v1/token_pairs`
        )
      ).json()) as
        | {
            token_pairs: {
              erc20_address: string;
              denom: string;
              enabled: boolean;
              contract_owner: string;
            }[];
          }
        | {
            code: number;
            message: string;
          };
      if ("code" in response) {
        return false;
      }
      return response;
    } catch (e) {
      return false;
    }
  });

export const setupTestnet = async (
  options: {
    enableLogging?: boolean;
    overwrite?: boolean;
  } = {}
) => {
  const logger = createLogger({
    enabled: !!options.enableLogging,
    label: "Testnet",
    color: chalk.whiteBright,
  });
  const evmos = await create({
    chainName: "evmos",
    moniker: "evmos-testnode",
    chainId: "evmoslocal_9000-10",
    baseDenom: "aevmos",
    customizeGenesis: (genesis) => {
      genesis.app_state.gov.params.max_deposit_period = "10s";
      genesis.app_state.gov.params.voting_period = "20s";

      return genesis;
    },
    ...options,
  });

  const cosmoshub = await create({
    chainName: "cosmos",
    moniker: "cosmos-testnode",
    chainId: "cosmolocal-10",
    baseDenom: "uatom",
    index: 1,
    ...options,
  });

  const { enableLogging } = options;

  logger.info("Let's wait a few blocks to make sure everything is synced");

  await Promise.all([cosmoshub.waitNBlocks(1n), evmos.waitNBlocks(1n)]);

  logger.info(`${cosmoshub.config.chainId} height: ${cosmoshub.getHeight()}`);

  logger.info(`${evmos.config.chainId} height: ${evmos.getHeight()}`);

  try {
    await setupRelayer(evmos.config.chainId, cosmoshub.config.chainId, options);

    await startRelayer(options);
  } catch (e) {
    console.log(e);
  }

  logger.info("Checking if the token pairs are already registered");
  let registeredTokenPairs = await getTokenPairs(evmos.config);

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
  const registeredTokens = (await getTokenPairs(evmos.config)).token_pairs.map(
    ({ erc20_address }) => erc20_address
  );
  if (
    !(
      registeredTokens.includes("0x04f9faC55b24c53F39b2aDCbef6318Ee2d9A6B84") &&
      registeredTokens.includes("0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd")
    )
  ) {
    throw new Error(
      [
        "Something went wrong with the token registration",
        "please, restart the process by running the command with `--overwrite` flag",
      ].join("\n")
    );
  }

  if (enableLogging) {
    const log = () => {
      const table = new Table({
        head: ["Chain", "Height", ...Object.keys(cosmoshub.config.api)],

        style: {
          head: ["bold"],
        },
      });

      table.push(
        [
          cosmoshub.config.chainId,
          cosmoshub.getHeight().toString(),
          ...Object.values(cosmoshub.config.api).map((port) => `:${port}`),
        ],
        [
          evmos.config.chainId,
          evmos.getHeight().toString(),
          ...Object.values(evmos.config.api).map((port) => `:${port}`),
        ]
      );
      process.stdout.write("\x1Bc");
      logger.info("All set 🚀");
      console.log(table.toString());
    };
    evmos.subscribe(log);

    cosmoshub.subscribe(log);
  }
  return {
    cosmoshub,
    evmos,
  };
};
