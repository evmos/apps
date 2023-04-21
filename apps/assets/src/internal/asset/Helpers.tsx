// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export function getChainIdentifier(identifier: string) {
  if (identifier === "cosmoshub") {
    return "Cosmos Hub";
  }
  return identifier;
}
