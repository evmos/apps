// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getChainByAddress } from "../get-chain-by-account";
import { getPubkey } from "../../wallet";
import { apiCosmosAccountByAddress } from "../../api";
import * as secp256k1 from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/crypto/secp256k1/keys_pb";
import * as ethsecp256k1 from "@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { Address } from "helpers/src/crypto/addresses/types";

export const getChainAccountInfo = async (address: Address) => {
  const cosmosAddress = normalizeToCosmos(address);

  const chain = getChainByAddress(address);

  const { info } = await apiCosmosAccountByAddress(
    chain.cosmosRest,
    cosmosAddress,
  );

  let publicKeyObject: { key: Uint8Array; "@type": string } | null = info.pubKey
    ? {
      key: Uint8Array.from(Buffer.from(info.pubKey.key, "base64")),
      "@type": info.pubKey["@type"],
    }
    : null;

  if (!publicKeyObject) {
    try {
      publicKeyObject = {
        "@type":
          chain.prefix === "evmos"
            ? "/ethermint.crypto.v1.ethsecp256k1.PubKey"
            : "/cosmos.crypto.secp256k1.PubKey",
        key: await getPubkey({
          cosmosChainId: chain.cosmosId,
        }),
      };
    } catch (e) { }
  }

  switch (publicKeyObject?.["@type"]) {
    case "/cosmos.crypto.secp256k1.PubKey":
      return {
        address: info.address,
        accountNumber: info.accountNumber,
        sequence: info.sequence,
        publicKey: new secp256k1.PubKey({
          key: publicKeyObject.key,
        }),
      };
    case "/ethermint.crypto.v1.ethsecp256k1.PubKey":
      return {
        address: info.address,
        accountNumber: info.accountNumber,
        sequence: info.sequence,
        publicKey: new ethsecp256k1.PubKey({
          key: publicKeyObject.key,
        }),
      };

    default: {
      return {
        address: info.address,
        accountNumber: info.accountNumber,
        sequence: info.sequence,
        publicKey: null,
      };
    }
  }
};
