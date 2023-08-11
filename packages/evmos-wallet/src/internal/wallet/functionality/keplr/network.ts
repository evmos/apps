// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export interface Configuration {
  chainId: string;
  clientId: string;
  chainName: string;
  rpc: string[];
  rest: string[];
  configurationType: "mainnet" | "testnet";
  currencies: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinMinDenom: string;
    coinDecimals: number;
  }[];
  source: {
    sourceChannel: string;
    destinationChannel: string;
    jsonRPC: string;
  };
  explorerTxUrl: string;
}

export interface NetworkChainConfig {
  configurations: Configuration[];
  bip44: {
    coinType: number;
  };
  gasPriceStep: {
    low: number;
    average: number;
    high: number;
  };
  prefix: string;
}

export interface NetworkChainConfigResponse {
  values: NetworkChainConfig;
}
