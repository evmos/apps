// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ConnetorId, wagmiConfig } from "../wagmi";

export function getActiveProviderKey(): ConnetorId | null {
  const connectionUuid = wagmiConfig.state.current;
  if (!connectionUuid) {
    return null;
  }
  const connection = wagmiConfig.state.connections.get(connectionUuid);
  if (!connection) {
    return null;
  }
  return connection.connector.name as ConnetorId;
}
