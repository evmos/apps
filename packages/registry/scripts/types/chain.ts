/**
 * Chain Registry via Evmos Governance
 */
export interface ChainRegistry {
  /**
   * Chain prefix i.e. evmos. This is the field whereby all the address will start off (i.e. evmos1ffttr...)
   */
  prefix: string;
  gasPriceStep: {
    /**
     * Amount of gas for Low
     */
    low: string;
    /**
     * Amount of gas for Average
     */
    average: string;
    /**
     * Amount of gas for High
     */
    high: string;
  };
  /**
   * Only applicable to EVMOS
   */
  feeMarket?: {
    /**
     * Enter appropriate gas cost
     */
    gas: string;
    /**
     * Enter appropriate amount cost
     */
    amount: string;
    /**
     * Enter appropriate convert cost
     */
    convert: string;
  };
  bip44: {
    /**
     * Cosmos-based chains should be 118 while EVM-based chains are coin type 60. If you are entering a coinType that is not 60 or 118, please reach out, we love to chat.
     */
    coinType: string;
  };
  configurations?: {
    /**
     * Chain ID should specific to the environment, i.e. Testnet and Mainnet are different
     */
    chainId: string;
    /**
     * Global identifier to be used by both client and backend as default reference for the chain
     */
    identifier: string;
    /**
     * Name of the chain specific to the environment, i.e. Evmos Testnet
     */
    chainName: string;
    /**
     * Query the 'evmosd query ibc channel client-state [port-id] [channel-id] [flags]' and copy over the client-id field
     */
    clientId: string;
    /**
     * RPC endpoint link, usually port 1317
     */
    rpc: string[];
    rest: [string, ...string[]];
    jrpc?: [string, ...string[]];
    web3?: string[];
    currencies: {
      /**
       * Unit of the coin or symbol, i.e. EVMOS
       */
      coinDenom?: string;
      /**
       * Smallest unit of the coin, i.e. aevmos
       */
      coinMinDenom?: string;
      /**
       * Chain minimum coin denomination, i.e. aevmos
       */
      coinDecimals?: string;
    }[];
    source: {
      /**
       * Source channel represents the third-party, i.e. Cosmos Hub side
       */
      sourceChannel: string;
      /**
       * The value is ibc/[sha256 of 'transfer/${sourceChannel}/aevmos' phrase]. This value is required to pull in EVMOS from source chain to Evmos chain.
       */
      sourceIBCDenomToEvmos: string;
      /**
       * Destination channel represents the main network side, i.e. EVMOS side
       */
      destinationChannel: string;
      /**
       * Tendermint endpoint link or using port 26657
       */
      jsonRPC: [string, ...string[]];
    };
    /**
     * Explorer is only necessary for EVMOS network. All other Cosmos chains do not require this array object to be filled out
     */
    explorer?: {
      /**
       * Add the correct explorer data type
       */
      type: "evm" | "cosmos";
      /**
       * Link to explorer
       */
      link: string;
    }[];
    /**
     * Must select either mainnet or testnet
     */
    configurationType: "mainnet" | "testnet" | "localtestnet";
    /**
     * Explorer tx URL for the chain, i.e https://www.mintscan.io/evmos/txs.
     */
    explorerTxUrl?: string;
  }[];
}
