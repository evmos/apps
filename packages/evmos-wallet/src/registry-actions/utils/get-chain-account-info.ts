// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getChainByAddress } from "../get-chain-by-account";
import { getPubkey } from "../../wallet";
import { apiCosmosAccountByAddress } from "../../api";
import * as secp256k1 from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/crypto/secp256k1/keys_pb";
import * as ethsecp256k1 from "@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb";
import { get } from "lodash-es";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { Address } from "helpers/src/crypto/addresses/types";

type BaseAccount = {
  address: string;
  sequence: string;
  account_number: string;
  pub_key: {
    "@type": string;
    key: string;
  } | null;
};

const isBaseAccount = (account: unknown): account is BaseAccount => {
  return (
    typeof account === "object" &&
    account !== null &&
    "address" in account &&
    "sequence" in account &&
    "account_number" in account &&
    "pub_key" in account
  );
};
export const getChainAccountInfo = async (address: Address) => {
  const cosmosAddress = normalizeToCosmos(address);

  const chain = getChainByAddress(address);

  const { account } = await apiCosmosAccountByAddress(
    chain.cosmosRest,
    cosmosAddress,
  );

  let baseAccount: BaseAccount | undefined = undefined;

  if (
    account["@type"] === "/cosmos.auth.v1beta1.BaseAccount" &&
    isBaseAccount(account)
  ) {
    baseAccount = account;
  } else if (
    account["@type"] === "/ethermint.types.v1.EthAccount" &&
    isBaseAccount(account.base_account)
  ) {
    baseAccount = account.base_account;
  } else {
    const possibleBaseAccountLocation: unknown =
      get(account, "base_account") ||
      get(account, "base_vesting_account.base_account");
    if (isBaseAccount(possibleBaseAccountLocation)) {
      baseAccount = possibleBaseAccountLocation;
    }
  }
  if (!baseAccount) {
    throw new Error(`Unsupported account type: ${account["@type"]}`);
  }

  let pubkey = baseAccount.pub_key
    ? Uint8Array.from(Buffer.from(baseAccount.pub_key.key, "base64"))
    : null;
  if (pubkey === null) {
    try {
      pubkey = await getPubkey({
        cosmosChainId: chain.cosmosId,
      });
    } catch (e) { }
  }
  return {
    address: cosmosAddress,
    sequence: BigInt(baseAccount.sequence),
    publicKey:
      chain.prefix === "evmos"
        ? new ethsecp256k1.PubKey({
          key: pubkey ?? new Uint8Array(),
        })
        : new secp256k1.PubKey({
          key: pubkey ?? new Uint8Array(),
        }),
    accountNumber: baseAccount.account_number,
  };
};
