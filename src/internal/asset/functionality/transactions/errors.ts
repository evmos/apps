export const EXECUTED_NOTIFICATIONS = {
  SuccessTitle: "Successfully executed",
  ErrorTitle: "Error executing the transaction",
  UnexpectedSubtext: "Unexpected error",
  WaitingTitle:
    "Waiting for the ibc transaction to be executed in the destination chain",
} as const;

export const BROADCASTED_NOTIFICATIONS = {
  SuccessTitle: "Successfully broadcasted",
  ErrorTitle: "Error broadcasting tx",
} as const;
