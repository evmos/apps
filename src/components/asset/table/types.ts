import { BigNumber } from "ethers";

export type TableData = {
  name: string;
  cosmosBalance: BigNumber;
  decimals: number;
  description: string;
  erc20Balance: BigNumber;
  symbol: string;
  tokenName: string;
  chainId: string;
  chainIdentifier: string;
  handledByExternalUI: null | { handlingAction: string; url: string };
  coingeckoPrice: number;
};

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
};

export type ERC20BalanceResponse = {
  balance: ERC20Element[];
};
