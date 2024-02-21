// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useAccount } from "wagmi";
import {
  getActiveProviderKey,
  getChain,
  wagmiConfig,
} from "@evmosapps/evmos-wallet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { E } from "helpers";
import { useId } from "react";
import { getAccount } from "wagmi/actions";
import { getSelectedNetworkMode } from "@evmosapps/ui-helpers/src/getSelectedNetworkMode";
import { CosmosAddress } from "helpers/src/crypto/addresses/types";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { providers } from "@evmosapps/evmos-wallet/src/api/utils/cosmos-based";
import {
  COSMOS_BASED_WALLETS,
  isCosmosBasedWallet,
} from "helpers/src/crypto/wallets/is-cosmos-wallet";

const suggestChain = async (prefix: string) => {
  const activeProvider = getActiveProviderKey();
  if (!activeProvider) return;
  if (!isCosmosBasedWallet(activeProvider)) {
    return;
  }
  const connector =
    await providers[getActiveProviderKey() as COSMOS_BASED_WALLETS]();

  if (prefix === "cre") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/crescent.json"
    );
    await connector.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "emoney") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/emoney.json"
    );
    await connector.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "tori") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/teritori.json"
    );
    await connector.experimentalSuggestChain(chainInfo);
  }
  if (prefix === "comdex") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/comdex.json"
    );
    await connector.experimentalSuggestChain(chainInfo);
  }

  if (prefix === "osmo" && getSelectedNetworkMode() === "testnet") {
    const chainInfo = await import(
      "chainapsis-suggest-chain/cosmos/osmo-test.json"
    );
    await connector.experimentalSuggestChain(chainInfo);
  }

  if (prefix === "evmos" && getSelectedNetworkMode() === "testnet") {
    await connector.experimentalSuggestChain(
      await import("@evmosapps/registry/src/keplr/evmostestnet.json"),
    );
  }

  if (getSelectedNetworkMode() === "localtestnet") {
    if (prefix === "evmos") {
      await connector.experimentalSuggestChain(
        await import("@evmosapps/registry/src/keplr/evmoslocal.json"),
      );
    }
    if (prefix === "cosmos") {
      await connector.experimentalSuggestChain(
        await import("@evmosapps/registry/src/keplr/cosmoshublocal.json"),
      );
    }
  }
  // is the same case for Leap ??????? How did you know that these ones were not supported by default ?
  // If not in this list, it's supported by keplr by default
};

export const useWalletAccountByPrefix = (prefix?: string) => {
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
      if (isCosmosBasedWallet(activeProvider)) {
        const connectorCosmosBased =
          await providers[activeProvider as COSMOS_BASED_WALLETS]();

        const [suggestChainErr] = await E.try(() => suggestChain(chain.prefix));

        if (suggestChainErr) {
          throw new Error("USER_REJECTED_REQUEST", { cause: suggestChainErr });
        }

        const [err, account] = await E.try(() =>
          connectorCosmosBased.getKey(chain.cosmosId),
        );

        if (err) {
          throw new Error("USER_REJECTED_REQUEST", { cause: err });
        }

        const { bech32Address, isNanoLedger, pubKey } = account;
        return {
          prefix: chain.prefix,
          bech32Address: bech32Address as CosmosAddress,
          isNanoLedger,
          pubKey,
        };
      }

      if (prefix !== "evmos")
        throw new Error("NETWORK_NOT_SUPPORTED_BY_WALLET");
      if (!address) throw new Error("NOT_CONNECTED");
      return {
        prefix: chain.prefix,
        bech32Address: normalizeToCosmos(address),
        evmAddress: address,
      };
    },

    enabled: !!address && !!prefix,
  });
};

const requestWalletAccount = async (prefix: string) => {
  const activeProvider = getActiveProviderKey();
  if (!activeProvider) throw new Error("NO_ACTIVE_PROVIDER");
  const chain = getChain(prefix);
  if (isCosmosBasedWallet(activeProvider)) {
    const connectorCosmosBased =
      await providers[activeProvider as COSMOS_BASED_WALLETS]();
    const [suggestChainErr] = await E.try(() => suggestChain(prefix));
    if (suggestChainErr) {
      throw new Error("USER_REJECTED_REQUEST", { cause: suggestChainErr });
    }

    const [err, account] = await E.try(() =>
      connectorCosmosBased.getKey(chain.cosmosId),
    );

    if (err) {
      throw new Error("USER_REJECTED_REQUEST", { cause: err });
    }

    const { bech32Address, isNanoLedger, pubKey } = account;
    return {
      prefix,
      bech32Address: bech32Address as CosmosAddress,
      isNanoLedger,
      pubKey,
    };
  }

  if (prefix !== "evmos") throw new Error("NETWORK_NOT_SUPPORTED_BY_WALLET");

  const { address } = getAccount(wagmiConfig);
  if (!address) throw new Error("NOT_CONNECTED");
  return {
    prefix: prefix,
    bech32Address: normalizeToCosmos(address),
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
