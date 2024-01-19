// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import path from "path";

import { Config } from "./cosmos-config";
import { updateToml } from "../utils/handletoml";

export const updateConfigFiles = async ({
  chainId,
  homeDir,
  baseDenom,
  api,
}: Config) => {
  await updateToml(path.join(homeDir, "config/client.toml"), {
    "chain-id": chainId,
    "keyring-backend": "test",
  });
  await updateToml(path.join(homeDir, "config/app.toml"), {
    "minimum-gas-prices": `0${baseDenom}`,
    api: {
      enable: true,
      address: `tcp://localhost:${api.cosmos}`,
      "enabled-unsafe-cors": true,
    },
    grpc: {
      enable: true,
      address: `localhost:${api.grpc}`,
    },
    "grpc-web": {
      enable: false,
      "enable-unsafe-cors": true,
    },

    "json-rpc": {
      enable: true,
      address: `localhost:${api.jsonRpc}`,
    },
  });
  await updateToml(path.join(homeDir, "config/config.toml"), {
    p2p: {
      laddr: `tcp://localhost:${api.p2p}`,
    },
    rpc: {
      laddr: `tcp://localhost:${api.rpc}`,
      cors_allowed_origins: ["*"],
    },
  });
};
