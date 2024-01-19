// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TEST_ACCOUNTS } from "../utils/test-accounts";
import { Config } from "./cosmos-config";
import {
  createPublicClient,
  createWalletClient,
  getContractAddress,
  http,
  multicall3Abi,
} from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { multicallBin } from "../utils/multicallcontract";
import { pool } from "../utils/pool";

export const deployMulticallContract = async (config: Config) => {
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

  return {
    hash,
    contractAddress,
  };
};
