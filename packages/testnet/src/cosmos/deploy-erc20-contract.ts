// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TEST_ACCOUNTS } from "../utils/test-accounts";
import { Config } from "./cosmos-config";

import {
  createPublicClient,
  createWalletClient,
  getContractAddress,
  http,
} from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { ERC20_CONTRACT_ABI, ercBinaries } from "../utils/erc20";
import { pool } from "../utils/pool";
import { getTokenPairsFromNetwork } from "./get-token-pairs-from-network";
import { watchProposalsByTitle } from "./watch-proposals-by-title";
import { getChainClient } from "../utils/get-chain-client";
import { logger } from "../utils/logger";
import { getAllAccounts } from "../utils/add-account";
import { getEvmId } from "./getEvmId";

export const deployERC20Contract = async (
  config: Config,
  {
    name,
    symbol,
  }: {
    name: string;
    symbol: string;
  },
) => {
  const url = `http://127.0.0.1:${config.api.jsonRpc}`;
  const clientParameters = {
    chain: {
      id: getEvmId(config.chainId),
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
    account: mnemonicToAccount(TEST_ACCOUNTS.thevalidator.mnemonic),
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
      (await getAllAccounts()).map((a) => ({
        accountAddress: a.hexAddress,
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

  await watchProposalsByTitle(config, proposalTitle);
  await pool(async () => {
    const registeredTokenPairs = await getTokenPairsFromNetwork(config);

    const isRegistered = registeredTokenPairs.token_pairs.some(
      ({ erc20_address }) => erc20_address === contractAddress,
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
