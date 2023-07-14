// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export type ERC20Element = {
  name: string;
  cosmosBalance: string;
  decimals: string;
  description: string;
  erc20Balance: string;
  symbol: string;
  tokenName: string;
  chainId: string;
  chainIdentifier: string;
  // Currently only axelar assets are external actions
  handledByExternalUI: null | { handlingAction: string; url: string }[];
  coingeckoPrice: string;
  prefix: string;
  pngSrc: string;
  erc20Address: string;
  tokenIdentifier: string;
};

export type ERC20BalanceResponse = {
  balance: ERC20Element[];
};
