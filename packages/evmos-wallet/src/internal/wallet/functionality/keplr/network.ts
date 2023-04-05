export interface ChainConfig {
  chainId: string;
  chainName: string;
  rpc: string;
  rest: string;
  stakeCurrency: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  };
  bip44: {
    coinType: number;
  };
  bech32Config: {
    bech32PrefixAccAddr: string;
    bech32PrefixAccPub: string;
    bech32PrefixValAddr: string;
    bech32PrefixValPub: string;
    bech32PrefixConsAddr: string;
    bech32PrefixConsPub: string;
  };
  currencies: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }[];
  feeCurrencies: {
    coinDenom: string;
    coinMinimalDenom: string;
    coinDecimals: number;
  }[];
  coinType: number;
  gasPriceStep: {
    low: number;
    average: number;
    high: number;
  };
}

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
