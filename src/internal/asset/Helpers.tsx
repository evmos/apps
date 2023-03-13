export function getChainIdentifier(identifier: string) {
  if (identifier === "cosmoshub") {
    return "Cosmos Hub";
  }
  return identifier;
}

export const FEE = "250000000000000000";
