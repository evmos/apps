// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { connect } from "wagmi/actions";
import { ConnetorId, wagmiConfig } from "../wagmi";
import { raise } from "helpers";

export function connectWith(provider: ConnetorId) {
  return connect(wagmiConfig, {
    connector:
      wagmiConfig.connectors.find((c) => c.id === provider) ??
      raise("Invalid provider"),
  });
}
