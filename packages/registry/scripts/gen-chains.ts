// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { mkdir, writeFile } from "fs/promises";
import { ChainRegistry } from "./types/chain";
import { TokenRegistry } from "./types/token";
import { groupBy } from "lodash-es";
import { fileHeader } from "./constants";
import { overwrites } from "./rpc-overwrites";
import { readFiles } from "./readFiles";
import { testnetConfigByChain, testnetTokensByIdentifiers } from "./testnets";

const readRegistryChain = async () =>
  (
    await readFiles<ChainRegistry>(
      "node_modules/chain-token-registry/chainConfig/*.json",
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
        : [],
    );

const readRegistryToken = () =>
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
  configuration: (ChainRegistry["configurations"] & {})[number],
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
  },
);
Object.entries(testnetTokensByIdentifiers).forEach(([identifier, tokens]) => {
  tokenByIdentifier[identifier] = [
    ...(tokenByIdentifier[identifier] ?? []),
    ...tokens,
  ];
});

await mkdir("src/chains", { recursive: true });

for (const chainRegistry of chains) {
  const configuration = chainRegistry.configuration;

  const identifier = normalizeIdentifier(configuration);

  const tokens =
    tokenByIdentifier[identifier]?.map((token) => {
      return {
        name: token.name,
        ref: token.coinDenom,
        description: token.description,
        symbol: token.coinDenom,
        denom: token.coinDenom,
        sourcePrefix: chainRegistry.prefix,
        sourceDenom: token.ibc.sourceDenom,
        minCoinDenom: token.minCoinDenom,
        category: token.category === "none" ? null : token.category,
        tokenRepresentation: token.tokenRepresentation as string | null,
        type: token.type === "IBC" ? "IBC" : "ERC20",
        decimals: Number(token.exponent),
        erc20Address: token.erc20Address as string | null,
        handledByExternalUI: token.handledByExternalUI ?? null,
        listed: true,
        coingeckoId: (token.coingeckoId ?? null) as string | null,
      };
    }) ?? [];

  const isTestnet = configuration.configurationType === "testnet";
  const feeTokenFromChainConfig = configuration.currencies[0]!;
  let feeToken = tokens.find(
    (token) => token.minCoinDenom === feeTokenFromChainConfig.coinMinDenom,
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
      ref: feeTokenFromChainConfig.coinDenom!,
      sourceDenom: feeTokenFromChainConfig.coinMinDenom!,
      sourcePrefix: chainRegistry.prefix,
      symbol: feeTokenFromChainConfig.coinDenom!,
      tokenRepresentation: null,
      coingeckoId: null,
      type: "IBC",
    };
    tokens.push(feeToken);
  }

  const isMainnet = configuration.configurationType === "mainnet";

  const cosmosRest = normalizeNetworkUrls([
    overwrites[identifier]?.cosmosRest,
    isMainnet ? `https://rest.cosmos.directory/${identifier}` : "",
    ...configuration.rest,
  ]);
  const tendermintRest = normalizeNetworkUrls([
    overwrites[identifier]?.tendermintRest,
    isMainnet ? `https://rpc.cosmos.directory/${identifier}` : "",
    ...configuration.rpc,
  ]);
  const evmRest = normalizeNetworkUrls([
    overwrites[identifier]?.evmRest,
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
    .map(
      ({ configuration }) =>
        `export { default as ${normalizeIdentifier(
          configuration,
        )} } from "./${normalizeIdentifier(configuration)}";`,
    )
    .join("\n"),
]);
