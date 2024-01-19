// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Config } from "../cosmos/cosmos-config";

export const createRelayerConfig = (configs: Config[]) => {
  return {
    global: {
      log_level: "trace",
    },
    mode: {
      channels: {
        enabled: false,
      },
      clients: {
        enabled: true,
        misbehaviour: true,
        refresh: true,
      },
      connections: {
        enabled: false,
      },
      packets: {
        clear_interval: 100,
        clear_on_start: true,
        enabled: true,
        tx_confirmation: true,
      },
    },
    rest: {
      enabled: true,
      host: "127.0.0.1",
      port: 3000,
    },
    telemetry: {
      enabled: true,
      host: "127.0.0.1",
      port: 3001,
    },
    chains: configs.map((config) => ({
      account_prefix: config.prefix,
      clock_drift: "15s",
      default_gas: 100000,
      gas_multiplier: 1.5,
      grpc_addr: `http://localhost:${config.api.grpc}`,
      id: config.chainId,
      key_name: config.moniker,
      max_block_time: "10s",
      max_gas: 3000000,
      rpc_addr: `http://localhost:${config.api.rpc}`,
      rpc_timeout: "10s",
      store_prefix: "ibc",
      trusting_period: "14days",

      address_type:
        config.prefix === "evmos"
          ? {
              derivation: "ethermint",
              proto_type: {
                pk_type: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
              },
            }
          : undefined,

      event_source: {
        interval: "1s",
        mode: "pull",
      },
      gas_price: {
        denom: config.baseDenom,
        price: 1000000000,
      },

      trust_threshold: {
        denominator: "3",
        numerator: "1",
      },
    })),
  };
};
