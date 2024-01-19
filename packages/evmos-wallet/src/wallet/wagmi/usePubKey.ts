// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useAccount } from "wagmi";
import { hashMessage, fromHex } from "viem";
import { EVMOS_GRPC_URL } from "../../internal/wallet/functionality/networkConfig";
import { queryPubKey } from "../../internal/wallet/functionality/pubkey";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { signatureToPubkey } from "@hanchon/signature-to-pubkey";
import { assertIf, raise } from "helpers";

import { getActiveProviderKey } from "../actions";
import { getKeplrProvider, normalizeToEvmos } from "../utils";
import { getAccount, signMessage } from "wagmi/actions";
import { wagmiConfig } from "./config";
import { getEvmosChainInfo } from "./chains";
const recoveryMessage = "generate_pubkey";
const hashedMessage = Buffer.from(
  fromHex(hashMessage(recoveryMessage), "bytes")
);

const baseKey = "evmos/pubkey";
const evmos = getEvmosChainInfo();
const queryFn = async () => {
  const { address, connector } = getAccount(wagmiConfig);
  assertIf(address, "WALLET_ACCOUNT_NOT_AVAILABLE");
  let pubkey = window.localStorage.getItem([baseKey, address].join("/"));

  if (pubkey) return pubkey;

  if (connector?.name === "Keplr") {
    const keplr = await getKeplrProvider();
    const account = await keplr.getKey(evmos.cosmosId);

    return Buffer.from(account.pubKey).toString("base64");
  }

  pubkey = await queryPubKey(
    EVMOS_GRPC_URL,
    normalizeToEvmos(address ?? raise("WALLET_PROVIDER_NOT_AVAILABLE"))
  );

  if (pubkey) return pubkey;
  const signature = await signMessage(wagmiConfig, {
    message: recoveryMessage,
  });

  if (getActiveProviderKey() === "Safe") {
    return "";
  }

  pubkey = signatureToPubkey(signature, hashedMessage);
  if (pubkey) return pubkey;

  raise("WALLET_DID_NOT_SIGN_PUBKEY_MESSAGE");
};

export const usePubKey = () => {
  const { address, isConnected } = useAccount();

  const { data, ...rest } = useQuery({
    queryKey: [baseKey, address],
    gcTime: Infinity,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: address !== undefined && isConnected,
    initialData() {
      if (typeof window === "undefined") return;
      const cachedKey = window.localStorage.getItem(
        [baseKey, address].join("/")
      );
      if (cachedKey) return cachedKey;
    },
    queryFn,
  });

  useEffect(() => {
    if (!data || !address) return;
    window.localStorage.setItem([baseKey, address].join("/"), data);
  }, [data, address]);

  return {
    pubkey: data,
    ...rest,
  };
};
