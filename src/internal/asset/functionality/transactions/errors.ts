export const EXECUTED_NOTIFICATIONS = {
  SuccessTitle: "Successfully included in a block",
  ErrorTitle: "Error including tx in a block",
  UnexpectedSubtext: "Unexpected error",
  WaitingTitle: "Waiting for the transaction to be included in a block",
} as const;

export const BROADCASTED_NOTIFICATIONS = {
  SuccessTitle: "Successfully broadcasted",
  ErrorTitle: "Error broadcasting tx",
} as const;
