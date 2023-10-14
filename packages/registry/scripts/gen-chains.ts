import { mkdir, writeFile } from "fs/promises";
import { ChainRegistry } from "./types/chain";
import { TokenRegistry } from "./types/token";
import { groupBy } from "lodash-es";
import { fileHeader } from "./constants";
import { lavaUrls } from "./lava-urls";
import { readFiles } from "./readFiles";
import { testnetConfigByChain, testnetTokensByIdentifiers } from "./testnets";

export const readRegistryChain = async () =>
  (
    await readFiles<ChainRegistry>(
      "node_modules/chain-token-registry/chainConfig/*.json"
    )
  )
    .map((chain) => {
      const { prefix } = chain;
      const testnets = testnetConfigByChain[prefix];
      if (testnets) {
        chain.configurations = [...(chain.configurations ?? []), ...testnets];
      }
      return chain;
    })
    .flatMap(({ configurations, ...rest }) =>
      configurations
        ? configurations.map((configuration) => ({
            ...rest,
            configuration,
          }))
        : []
    );

export const readRegistryToken = () =>
  readFiles<TokenRegistry>("node_modules/chain-token-registry/tokens/*.json");

const normalizeNetworkUrls = (urls?: (string | undefined)[]) => {
  if (!urls) {
    return null;
  }
  const http = urls.filter(Boolean);
  if (http.length === 0) {
    return null;
  }
  return http;
};
const normalizeIdentifier = (
  configuration: (ChainRegistry["configurations"] & {})[number]
) => {
  let identifier = configuration.identifier.toLowerCase();
  if (configuration.identifier === "gravity") {
    identifier = "gravitybridge";
  }

  return identifier;
};
const chains = await readRegistryChain();

const tokenByIdentifier = groupBy(
  await readRegistryToken(),
  ({ ibc, prefix }) => {
    const chain = chains.find(({ configuration }) => {
      return (
        configuration.identifier.toLowerCase() === ibc?.source?.toLowerCase()
      );
    });
    if (!chain) {
      return prefix;
    }

    return normalizeIdentifier(chain.configuration);
  }
);
Object.entries(testnetTokensByIdentifiers).forEach(([identifier, tokens]) => {
  tokenByIdentifier[identifier] = [
    ...(tokenByIdentifier[identifier] ?? []),
    ...tokens,
  ];
});

// tokenByIdentifier["evmostestnet"] = [
//   {
//     coinDenom: "EVMOS",
//     minCoinDenom: "atevmos",
//     imgSrc:
//       "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.svg",
//     pngSrc:
//       "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
//     type: "IBC",
//     exponent: "18",
//     cosmosDenom: "atevmos",
//     description: "EVMOS",
//     name: "EVMOS",
//     tokenRepresentation: "EVMOS",
//     channel: "",
//     isEnabled: true,
//     erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
//     ibc: {
//       sourceDenom: "atevmos",
//       source: "evmostestnet",
//     },
//     hideFromTestnet: false,
//     coingeckoId: "evmos",
//     category: "cosmos",
//     coinSourcePrefix: "evmos",
//   },
// {
//   coinDenom: "WIZZ",
//   minCoinDenom: "wizz",
//   imgSrc: "",
//   pngSrc: "",
//   type: "IBC",
//   exponent: "18",
//   cosmosDenom: "erc20/0xcf4e2cae6193f943c8f39b6012b735cad37d8f4a",
//   description: "Wizzard Coin",
//   name: "Wizzard Token",
//   tokenRepresentation: "WIZZ",
//   channel: "",
//   isEnabled: true,
//   erc20Address: "0xcf4e2cae6193f943c8f39b6012b735cad37d8f4a",
//   ibc: {
//     sourceDenom: "wizz",
//     source: "Evmos",
//   },
//   hideFromTestnet: false,
//   coingeckoId: "",
//   category: "cosmos",
//   coinSourcePrefix: "evmos",
// },
// ];

// tokenByIdentifier["osmosistestnet"] = [
// {
//   coinDenom: "OSMO",
//   minCoinDenom: "uosmo",
//   imgSrc:
//     "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
//   pngSrc:
//     "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
//   type: "IBC",
//   exponent: "6",
//   cosmosDenom:
//     "ibc/ED07A3391A112B175915CD8FAF43A2DA8E4790EDE12566649D0C2F97716B8518",
//   description: "The native token of Osmosis",
//   name: "Osmosis",
//   tokenRepresentation: "OSMO",
//   channel: "channel-0",
//   isEnabled: true,
//   erc20Address: "0xFA3C22C069B9556A4B2f7EcE1Ee3B467909f4864",
//   ibc: {
//     sourceDenom: "uosmo",
//     source: "Osmosis",
//   },
//   hideFromTestnet: false,
//   coingeckoId: "osmosis",
//   category: "cosmos",
//   coinSourcePrefix: "osmo",
// },
// ];
// This might be handy when we start supporting IBC between other chains
// const fetchChainOnCosmosRegistry = async (id: string) => {
//   if (id === "gravity") {
//     id = "gravitybridge";
//   }
//   const response = await fetch(
//     `https://raw.githubusercontent.com/cosmos/chain-registry/master/${id}/chain.json`
//   );
//   const json = await response.json();
//   return json as CosmosRegistryChain;
// };

await mkdir("src/chains", { recursive: true });

for (const chainRegistry of chains) {
  if (chainRegistry.prefix === "kujira") {
    // TODO: We need to add Kujira fee token to our registry
    continue;
  }
  const configuration = chainRegistry.configuration;

  const identifier = normalizeIdentifier(configuration);

  const tokens = tokenByIdentifier[identifier]?.map((token) => {
    return {
      name: token.name,
      ref: `${chainRegistry.prefix}:${token.coinDenom}`,
      description: token.description,
      symbol: token.coinDenom,
      denom: token.coinDenom,
      sourcePrefix: chainRegistry.prefix,
      sourceDenom:
        chainRegistry.prefix === "evmos"
          ? token.cosmosDenom
          : token.ibc.sourceDenom,
      // TODO: minCoinDenom for evmos is wrong in our registry, we should fix that there
      minCoinDenom:
        token.minCoinDenom === "EVMOS" ? "aevmos" : token.minCoinDenom,
      category: token.category === "none" ? null : token.category,
      tokenRepresentation: token.tokenRepresentation as string | null,
      type: token.type === "IBC" ? "IBC" : "ERC20",
      decimals: Number(token.exponent),
      erc20Address: token.erc20Address as string | null,
      handledByExternalUI: token.handledByExternalUI ?? null,
      listed: true,
    };
  });

  const isTestnet = configuration.configurationType === "testnet";
  const feeTokenFromChainConfig = configuration.currencies[0];
  let feeToken = tokens.find(
    (token) =>
      token.minCoinDenom === feeTokenFromChainConfig.coinMinDenom ||
      // @ts-expect-error TODO: Injective coinMinDenom key is wrong in our registry, we should fix that there
      token.minCoinDenom === feeTokenFromChainConfig.coinMinimalDenom
  );
  if (!feeToken) {
    feeToken = {
      category: "cosmos",
      decimals: parseInt(feeTokenFromChainConfig.coinDecimals!),
      denom: feeTokenFromChainConfig.coinDenom!,
      erc20Address: null,
      handledByExternalUI: null,
      description: "",
      listed: false,
      minCoinDenom: feeTokenFromChainConfig.coinMinDenom!,
      name: feeTokenFromChainConfig.coinDenom!,
      ref: `${chainRegistry.prefix}:${feeTokenFromChainConfig.coinDenom!}`,
      sourceDenom: feeTokenFromChainConfig.coinMinDenom!,
      sourcePrefix: chainRegistry.prefix,
      symbol: feeTokenFromChainConfig.coinDenom!,
      tokenRepresentation: null,
      type: "IBC",
    };
    tokens.push(feeToken);
  }

  const isMainnet = configuration.configurationType === "mainnet";

  const cosmosRest = normalizeNetworkUrls([
    lavaUrls[identifier]?.cosmosRest,
    isMainnet ? `https://rest.cosmos.directory/${identifier}` : "",
    ...configuration.rest,
  ]);
  const tendermintRest = normalizeNetworkUrls([
    lavaUrls[identifier]?.tendermintRest,
    isMainnet ? `https://rpc.cosmos.directory/${identifier}` : "",
    ...configuration.rpc,
  ]);
  const evmRest = normalizeNetworkUrls([
    lavaUrls[identifier]?.evmRest,
    ...(configuration.web3 ?? []),
  ]);

  const chain = {
    prefix: chainRegistry.prefix,
    name: configuration.chainName,
    cosmosId: configuration.chainId,
    identifier,
    gasPriceStep: chainRegistry.gasPriceStep,
    evmId: chainRegistry.prefix !== "evmos" ? null : isTestnet ? 9000 : 9001,
    channels:
      // TODO: When we start supporting IBC between other chains, we need to add the proper channels here
      chainRegistry.prefix !== "evmos" && configuration.source
        ? {
            evmos: {
              channelId: configuration.source.sourceChannel,
              counterpartyChannelId: configuration.source.destinationChannel,
            },
          }
        : null,

    // Naively assume the first token is the fee token, we should probably add this to our registry
    feeToken: feeToken.minCoinDenom,
    cosmosRest,
    tendermintRest,
    evmRest,
    cosmosGRPC: normalizeNetworkUrls(configuration.rpc),
    tokens,
    explorerUrl: configuration.explorerTxUrl,
    env: configuration.configurationType,
  };
  await writeFile(`src/chains/${chain.identifier}.ts`, [
    fileHeader,
    `export default ${JSON.stringify(chain, null, 2)} as const;`,
  ]);
}

await writeFile("src/chains/index.ts", [
  fileHeader,
  chains
    .filter(({ prefix }) => prefix !== "kujira")
    .map(
      ({ configuration }) =>
        `export { default as ${normalizeIdentifier(
          configuration
        )} } from "./${normalizeIdentifier(configuration)}";`
    )
    .join("\n"),
]);
