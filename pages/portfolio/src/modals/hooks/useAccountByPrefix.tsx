// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Prefix } from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { useAccount } from "wagmi";
import {
  CosmosAddress,
  getActiveProviderKey,
  getChain,
  getKeplrProvider,
  normalizeToCosmosAddress,
  wagmiConfig,
} from "@evmosapps/evmos-wallet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { E } from "helpers";
import { useId } from "react";
import { getAccount } from "wagmi/actions";
import { getSelectedNetworkMode } from "@evmosapps/ui-helpers/src/getSelectedNetworkMode";

const suggestChain = async (prefix: Prefix) => {
  const keplr = await getKeplrProvider();
  if (prefix === "cre") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/crescent.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "emoney") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/emoney.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "tori") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/teritori.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "comdex") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/comdex.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }

  if (prefix === "osmo" && getSelectedNetworkMode() === "testnet") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/osmo-test.json"
    );
    await keplr.experimentalSuggestChain(chainInfo);
  }

  if (prefix === "evmos" && getSelectedNetworkMode() === "testnet") {
    await keplr.experimentalSuggestChain(
      await import("@evmosapps/registry/src/keplr/evmostestnet.json")
    );
  }

  if (getSelectedNetworkMode() === "localtestnet") {
    if (prefix === "evmos") {
      await keplr.experimentalSuggestChain(
        await import("@evmosapps/registry/src/keplr/evmoslocal.json")
      );
    }
    if (prefix === "cosmos") {
      await keplr.experimentalSuggestChain(
        await import("@evmosapps/registry/src/keplr/cosmoshublocal.json")
      );
    }
  }

  // If not in this list, it's supported by keplr by default
};

export const useWalletAccountByPrefix = (prefix?: Prefix) => {
  const { address, connector } = useAccount();
  const chain = prefix ? getChain(prefix) : undefined;
  return useQuery({
    queryKey: ["wallet_account_request", prefix, connector?.id],
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!chain) {
        throw new Error("NETWORK_NOT_SUPPORTED_BY_WALLET");
      }
      const activeProvider = getActiveProviderKey();
      if (!activeProvider) return;
      if (activeProvider === "Keplr") {
        const keplr = await getKeplrProvider();

        const [suggestChainErr] = await E.try(() => suggestChain(chain.prefix));

        if (suggestChainErr) {
          throw new Error("USER_REJECTED_REQUEST", { cause: suggestChainErr });
        }

        const [err, account] = await E.try(() => keplr.getKey(chain.cosmosId));

        if (err) {
          throw new Error("USER_REJECTED_REQUEST", { cause: err });
        }

        const { bech32Address, isNanoLedger, pubKey } = account;
        return {
          prefix: chain.prefix,
          bech32Address: bech32Address as CosmosAddress<Prefix>,
          isNanoLedger,
          pubKey,
        };
      }
      if (prefix !== "evmos")
        throw new Error("NETWORK_NOT_SUPPORTED_BY_WALLET");
      if (!address) throw new Error("NOT_CONNECTED");
      return {
        prefix: chain.prefix,
        bech32Address: normalizeToCosmosAddress(address),
        evmAddress: address,
      };
    },

    enabled: !!address && !!prefix,
  });
};

const requestWalletAccount = async (prefix: Prefix) => {
  const activeProvider = getActiveProviderKey();
  if (!activeProvider) throw new Error("NO_ACTIVE_PROVIDER");
  const chain = getChain(prefix);
  if (activeProvider === "Keplr") {
    const keplr = await getKeplrProvider();
    const [suggestChainErr] = await E.try(() => suggestChain(prefix));
    if (suggestChainErr) {
      throw new Error("USER_REJECTED_REQUEST", { cause: suggestChainErr });
    }

    const [err, account] = await E.try(() => keplr.getKey(chain.cosmosId));

    if (err) {
      throw new Error("USER_REJECTED_REQUEST", { cause: err });
    }

    const { bech32Address, isNanoLedger, pubKey } = account;
    return {
      prefix,
      bech32Address: bech32Address as CosmosAddress<Prefix>,
      isNanoLedger,
      pubKey,
    };
  }

  if (prefix !== "evmos") throw new Error("NETWORK_NOT_SUPPORTED_BY_WALLET");

  const { address } = getAccount(wagmiConfig);
  if (!address) throw new Error("NOT_CONNECTED");
  return {
    prefix: prefix,
    bech32Address: normalizeToCosmosAddress(address),
    evmAddress: address,
  };
};

export const useRequestWalletAccount = () => {
  const id = useId();
  const { data, mutate, ...rest } = useMutation({
    mutationKey: ["wallet_address_request", id],
    mutationFn: requestWalletAccount,
  });
  return { ...rest, account: data, requestAccount: mutate };
};
