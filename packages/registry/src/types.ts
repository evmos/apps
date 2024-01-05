import { ChainEntity } from "../autogen/chain-entity";

type NetworkUrls = {
  http: [string, ...string[]];
};
export type Token = {
  name: string;
  description: string;
  images: {
    png: string;
    svg?: string;
  };
  channel: string;
  decimals: number;
  denom: string;
  minCoinDenom: string;
  cosmosDenom: string;
  baseDenom: string;
  sourcePrefix: string;
  type: "IBC" | "ERC20";
  erc20Address: string;
  category: "bitcoin" | "ethereum" | "stablecoin" | "cosmos" | "polygon" | null;
  handledByExternalUI?: {
    /**
     * Link to the external UI site
     */
    url: string;
    /**
     * Specify if the external UI is for Deposit, Withdraw, Convert, or others.
     */
    handlingAction:
      | "Deposit"
      | "Withdraw"
      | "Convert"
      | "Deposit and Withdraw"
      | "All";
  }[];
};
export interface Chain {
  prefix: string;
  gasPriceStep: {
    low: string;
    average: string;
    high: string;
  };
  name: string;
  cosmosId: string;
  evmId: number | null;
  clientId: string | null;
  feeToken: string;

  currencies: [Token, ...Token[]];
  cosmosRest: NetworkUrls;
  cosmosGRPC: NetworkUrls | null;
  evmRest: NetworkUrls | null;

  tendermint: NetworkUrls | null;

  source: {
    sourceChannel: string;

    sourceIBCDenomToEvmos: string;

    destinationChannel: string;

    tendermintRest: NetworkUrls | null;
  } | null;
}

// v2

export type ChainEntityConfiguration = ChainEntity["configurations"][0];
export type ChainType = ChainEntityConfiguration["configurationType"];
