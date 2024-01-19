// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  NotifyError,
  NotifySuccess,
} from "../../../internal/common/notifications/notifications";
import { SNACKBAR_CONTENT_TYPES } from "../../../notification/types";
import { store } from "../../../redux/Store";

// NOTIFICATIONS
export const METAMASK_NOTIFICATIONS = {
  ErrorTitle: "Error connecting with Metamask",
  SuccessTitle: "Connected with Metamask",
  PubkeySubtext:
    "Could not get the pubkey, please sign the generate_pubkey message!",
  ExtensionNotFoundSubtext:
    "The MetaMask extension could not be found. Try using Copilot to get started!",
  ChangeNetworkSubtext: "Could not change the network to EVMOS",
  AddressSubtext: "Could not get the user address from Metamask",
  DeniedSignatureSubtext: "Transaction was not signed",
  EipToSignSubtext:
    "There was a problem creating the transaction, please try again",
  ProvidedChainSubtext: "Please, connect to the EVMOS network",
  AddTokenTitle: "Token added successfully",
  ErrorAddToken: "Could not add token, please try again",
} as const;

export const KEPLR_NOTIFICATIONS = {
  ErrorTitle: "Error connecting with Keplr",
  SuccessTitle: "Connected with Keplr",
  ExtensionNotFoundSubtext:
    "The Keplr extension could not be found. Try using Copilot to get started!",
  LedgerNotInitSubtext: "Please initialize ethereum app on ledger first",
  RequestRejectedSubtext:
    "Please unlock the extension and allow the app to access your wallet address",
  RequestRejectedSignSubtext: "Transaction was not signed",
  WarningSubtext:
    "If you want to use Keplr with ledger in the EVMOS network, you need to install the ethereum app first",
} as const;

// NOTIFICATIONS
export const WALLET_NOTIFICATIONS = {
  ErrorTitle: "Error connecting with {walletName}",
  SuccessTitle: "Connected with {walletName}",
  PubkeySubtext:
    "Could not get the pubkey, please sign the generate_pubkey message!",
  ExtensionNotFoundSubtext:
    "The {walletName} extension could not be found. Try using Copilot to get started!",
  ChangeNetworkSubtext: "Could not change the network to EVMOS",
  AddressSubtext:
    "Could not get the user address from {walletName}. Make sure you logged in to {walletName} and try again",
  DeniedSignatureSubtext: "Transaction was not signed",
  EipToSignSubtext:
    "There was a problem creating the transaction, please try again",
  ProvidedChainSubtext: "Please, connect to the EVMOS network",
  AddTokenTitle: "Token added successfully",
  ErrorAddToken: "Could not add token, please try again",
} as const;

const formatNotification = (
  title: string,
  text: string,
  properties: Record<string, string> = {},
) => {
  return {
    title: replaceProperties(title, properties),
    text: replaceProperties(text, properties),
  };
};

export const notifyError = (
  title: string,
  text: string,
  properties: Record<string, string> = {},
) => {
  NotifyError(
    {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      ...formatNotification(title, text, properties),
    },
    store,
    true,
  );
};

export const notifySuccess = (
  title: string,
  text: string,
  properties: Record<string, string> = {},
) => {
  NotifySuccess(
    {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      ...formatNotification(title, text, properties),
    },
    store,
    true,
  );
};

const replaceProperties = (
  text: string,
  properties: Record<string, string>,
) => {
  return Object.entries(properties).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{${key}}`, "g"), value);
  }, text);
};
