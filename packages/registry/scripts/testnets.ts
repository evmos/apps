import { ChainRegistry } from "./types/chain";
import { TokenRegistry } from "./types/token";

export const testnetConfigByChain: Record<
  string,
  ChainRegistry["configurations"]
> = {
  evmos: [
    {
      chainId: "evmos_9000-4",
      chainName: "Evmos Testnet",
      clientId: "",
      configurationType: "testnet",
      currencies: [
        {
          coinDecimals: "18",
          coinDenom: "aevmos",
          coinMinDenom: "atevmos",
        },
      ],

      identifier: "evmostestnet",
      rpc: [
        // eslint-disable-next-line no-secrets/no-secrets
        "https://g.w.lavanet.xyz:443/gateway/evmost/tendermint-rpc-http/549a760ba95638964be1942980693d34",
        "https://tendermint.bd.evmos.dev:26657",
        "https://evmos.test.rpc.coldyvalidator.net",
        "https://evmos-testnet-rpc.polkachu.com",
        "https://evmos-testnet-rpc.qubelabs.io",
        "https://evmos-testnet-rpc.polkachu.com:443",
        "https://rpc-t.evmos.nodestake.top",
      ],
      rest: [
        "https://g.w.lavanet.xyz:443/gateway/evmost/rest/549a760ba95638964be1942980693d34",
        "https://rest.bd.evmos.dev:1317",
        "https://evmos.test.api.coldyvalidator.net",
        "https://evmos-testnet-api.polkachu.com",
        "https://api-t.evmos.nodestake.top",
        "https://evmos-testnet-lcd.qubelabs.io",
      ],
      web3: [
        // eslint-disable-next-line no-secrets/no-secrets
        "https://g.w.lavanet.xyz:443/gateway/evmost/json-rpc-http/549a760ba95638964be1942980693d34",
        "https://eth.bd.evmos.dev:8545",
        "https://jsonrpc-t.evmos.nodestake.top",
        "https://evmos-testnet-json.qubelabs.io",
      ],

      source: {
        sourceChannel: "",
        sourceIBCDenomToEvmos: "",
        destinationChannel: "",
        jsonRPC: [""],
      },
      explorerTxUrl: "https://testnet.escan.live/tx",
    },
    {
      chainId: "evmoslocal_9000-10",
      chainName: "Evmos Local",
      clientId: "",
      configurationType: "localtestnet",
      currencies: [
        {
          coinDecimals: "18",
          coinDenom: "aevmos",
          coinMinDenom: "aevmos",
        },
      ],

      identifier: "evmoslocal",
      rpc: ["http://localhost:26657"],
      rest: ["http://localhost:1317"],
      web3: ["http://localhost:8545"],

      source: {
        sourceChannel: "",
        sourceIBCDenomToEvmos: "",
        destinationChannel: "",
        jsonRPC: [""],
      },
      explorerTxUrl: "",
    },
  ],

  osmo: [
    {
      chainId: "osmo-test-5",
      chainName: "Osmosis Testnet",
      identifier: "osmosistestnet",
      clientId: "07-tendermint-0",

      rest: ["https://lcd.osmotest5.osmosis.zone"],

      jrpc: [
        "https://rpc.osmotest5.osmosis.zone",
        "https://rpc.testnet.osl.zone",
      ],
      rpc: [""],
      currencies: [
        {
          coinDenom: "OSMO",
          coinMinDenom: "uosmo",
          coinDecimals: "6",
        },
      ],
      source: {
        sourceChannel: "channel-1653",
        sourceIBCDenomToEvmos: "",
        destinationChannel: "channel-207",
        jsonRPC: ["https://rpc-osmosis.blockapsis.com/"],
      },
      configurationType: "testnet",
      explorerTxUrl: "https://testnet.mintscan.io/osmosis-testnet/txs",
    },
  ],

  cosmos: [
    {
      chainId: "cosmolocal-10",
      chainName: "Cosmos Hub Local",
      clientId: "",
      configurationType: "localtestnet",
      currencies: [
        {
          coinDecimals: "6",
          coinDenom: "ATOM",
          coinMinDenom: "uatom",
        },
      ],

      identifier: "cosmoshublocal",
      rpc: ["http://localhost:26667"],
      rest: ["http://localhost:1327"],

      source: {
        sourceChannel: "channel-0",
        sourceIBCDenomToEvmos: "",
        destinationChannel: "channel-0",
        jsonRPC: [""],
      },
      explorerTxUrl: "",
    },
  ],
};

export const testnetTokensByIdentifiers: Record<string, TokenRegistry[]> = {
  evmostestnet: [
    {
      coinDenom: "EVMOS",
      minCoinDenom: "atevmos",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.svg",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
      type: "IBC",
      exponent: "18",
      cosmosDenom: "atevmos",
      description: "EVMOS",
      name: "EVMOS",
      tokenRepresentation: "EVMOS",
      channel: "",
      isEnabled: true,
      erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      ibc: {
        sourceDenom: "atevmos",
        source: "evmostestnet",
      },
      hideFromTestnet: false,
      coingeckoId: "evmos",
      category: "cosmos",
      coinSourcePrefix: "evmos",
    },
    {
      coinDenom: "WIZZ",
      minCoinDenom: "wizz",
      imgSrc: "",
      pngSrc: "",
      type: "IBC",
      exponent: "18",
      cosmosDenom: "erc20/0xcf4e2cae6193f943c8f39b6012b735cad37d8f4a",
      description: "Wizzard Coin",
      name: "Wizzard Token",
      tokenRepresentation: "WIZZ",
      channel: "",
      isEnabled: true,
      erc20Address: "0xcf4e2cae6193f943c8f39b6012b735cad37d8f4a",
      ibc: {
        sourceDenom: "wizz",
        source: "Evmos",
      },
      hideFromTestnet: false,
      coingeckoId: "",
      category: "cosmos",
      coinSourcePrefix: "evmos",
    },
  ],
  evmoslocal: [
    {
      coinDenom: "EVMOS",
      minCoinDenom: "aevmos",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.svg",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
      type: "IBC",
      exponent: "18",
      cosmosDenom: "aevmos",
      description: "EVMOS",
      name: "EVMOS",
      tokenRepresentation: "EVMOS",
      channel: "",
      isEnabled: true,
      erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      ibc: {
        sourceDenom: "aevmos",
        source: "evmoslocal",
      },
      hideFromTestnet: false,
      coingeckoId: "evmos",
      category: "cosmos",
      coinSourcePrefix: "evmos",
    },
    {
      coinDenom: "WIZZ",
      minCoinDenom: "wizz",
      imgSrc: "",
      pngSrc: "",
      type: "IBC",
      exponent: "18",
      cosmosDenom: "erc20/0x04f9faC55b24c53F39b2aDCbef6318Ee2d9A6B84",
      description: "Wizzard Coin",
      name: "Wizzard Token",
      tokenRepresentation: "WIZZ",
      channel: "",
      isEnabled: true,
      erc20Address: "0x04f9faC55b24c53F39b2aDCbef6318Ee2d9A6B84",
      ibc: {
        sourceDenom: "wizz",
        source: "Evmos",
      },
      hideFromTestnet: false,
      coingeckoId: "",
      category: "cosmos",
      coinSourcePrefix: "evmos",
    },
  ],
  cosmoshublocal: [
    {
      coinDenom: "ATOM",
      minCoinDenom: "uatom",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.svg",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      type: "IBC",
      exponent: "6",
      cosmosDenom:
        "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
      description: "The native token of Cosmos Hub",
      name: "Cosmos Hub",
      tokenRepresentation: "ATOM",
      channel: "channel-0",
      isEnabled: true,
      erc20Address: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
      ibc: {
        sourceDenom: "uatom",
        source: "cosmoshub",
      },
      hideFromTestnet: false,
      coingeckoId: "cosmos",
      category: "cosmos",
      coinSourcePrefix: "cosmos",
    },
  ],

  osmosistestnet: [
    {
      coinDenom: "OSMO",
      minCoinDenom: "uosmo",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      type: "IBC",
      exponent: "6",
      cosmosDenom:
        "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",
      description: "The native token of Osmosis",
      name: "Osmosis",
      tokenRepresentation: "OSMO",
      channel: "channel-0",
      isEnabled: true,
      erc20Address: "0xFA3C22C069B9556A4B2f7EcE1Ee3B467909f4864",
      ibc: {
        sourceDenom: "uosmo",
        source: "Osmosis",
      },
      hideFromTestnet: false,
      coingeckoId: "osmosis",
      category: "cosmos",
      coinSourcePrefix: "osmo",
    },
  ],
};
