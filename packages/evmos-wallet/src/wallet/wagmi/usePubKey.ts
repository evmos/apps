import { useAccount, useSignMessage } from "wagmi";
import { hashMessage, fromHex } from "viem";
import { EVMOS_GRPC_URL } from "../../internal/wallet/functionality/networkConfig";
import { queryPubKey } from "../../internal/wallet/functionality/pubkey";
import { useQuery } from "@tanstack/react-query";
import { ethToEvmos } from "@evmos/address-converter";
import { useEffect } from "react";
import { signatureToPubkey } from "@hanchon/signature-to-pubkey";
import { raise } from "helpers";
import { keplrConnector } from "./connectors";
import { getActiveProviderKey } from "../actions";
const recoveryMessage = "generate_pubkey";
const hashedMessage = Buffer.from(
  fromHex(hashMessage(recoveryMessage), "bytes"),
);
const baseKey = "evmos/pubkey";
export const usePubKey = () => {
  const { address, connector, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { data, ...rest } = useQuery({
    queryKey: [baseKey, address],
    cacheTime: Infinity,
    staleTime: Infinity,
    initialData() {
      if (typeof window === "undefined") return;
      const cachedKey = window.localStorage.getItem(
        [baseKey, address].join("/"),
      );
      if (cachedKey) return cachedKey;
    },
    queryFn: async () => {
      let pubkey = window.localStorage.getItem([baseKey, address].join("/"));

      if (pubkey) return pubkey;

      if (connector === keplrConnector) {
        const pubkey = await keplrConnector.getPubkey();
        return Buffer.from(pubkey).toString("base64");
      }

      pubkey = await queryPubKey(
        EVMOS_GRPC_URL,
        ethToEvmos(address ?? raise("WALLET_PROVIDER_NOT_AVAILABLE")),
      );

      if (pubkey) return pubkey;
      const signature = await signMessageAsync({
        message: recoveryMessage,
      });

      if(getActiveProviderKey() === "safe") {
        return ""
      }

      pubkey = signatureToPubkey(signature, hashedMessage);
      if (pubkey) return pubkey;

      raise("WALLET_DID_NOT_SIGN_PUBKEY_MESSAGE");
    },
    enabled: !!connector && isConnected,
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
