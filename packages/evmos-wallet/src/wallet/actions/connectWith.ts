// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { connect } from "wagmi/actions";
import { ConnetorId, wagmiConfig } from "../wagmi";
import { raise } from "helpers";

export async function connectWith(provider: ConnetorId) {
  return connect(wagmiConfig, {
    connector:
      wagmiConfig.connectors.find((c) => c.name === provider) ??
      raise("Invalid provider"),
  });
}
