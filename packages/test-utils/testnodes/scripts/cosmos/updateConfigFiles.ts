import path from "path";
import { updateToml } from "testnodes/utils/handletoml";
import { Config } from "./cosmos-config";

export const updateConfigFiles = async (config: Config) => {
  const { portOffset = 0 } = config;
  const cosmosApi = 1317 + portOffset * 10;
  const grpc = 9090 + portOffset * 10;
  const jsonRpc = 8545 + portOffset * 10;
  const p2p = 26656 + portOffset * 10;
  const rpc = 26657 + portOffset * 10;

  await updateToml(path.join(config.homeDir, "config/client.toml"), {
    "chain-id": config.chainId,
    "keyring-backend": "test",
  });
  await updateToml(path.join(config.homeDir, "config/app.toml"), {
    "minimum-gas-prices": `0${config.baseDenom}`,
    api: {
      enable: true,
      address: `tcp://localhost:${cosmosApi}`,
      "enabled-unsafe-cors": true,
    },
    grpc: {
      enable: true,
      address: `localhost:${grpc}`,
    },
    "grpc-web": {
      enable: false,
    },

    "json-rpc": {
      enable: true,
      address: `localhost:${jsonRpc}`,
    },
  });
  await updateToml(path.join(config.homeDir, "config/config.toml"), {
    p2p: {
      laddr: `tcp://localhost:${p2p}`,
    },
    rpc: {
      laddr: `tcp://localhost:${rpc}`,
    },
  });

  return {
    cosmosApi,
    grpc,
    jsonRpc,
    p2p,
    rpc,
  };
};
