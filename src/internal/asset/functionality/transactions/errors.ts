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

export const MODAL_NOTIFICATIONS = {
  ErrorAmountTitle: "Amount error",
  ErrorZeroAmountSubtext: "Amount cannot be 0",
  ErrorInsufficientFeeSubtext:
    "Lack sufficient balance to carry forth action. Balance needs to be above reserved amount",
  ErrosAmountGt: "Amount is bigger than the actual balance",
  ErrorAmountEmpty: "Amount can not be empty",
  ErrorAddressTitle: "Invalid address",
  ErrorAddressSubtext: "The address does not match with the chain",
  ErrorPositiveNumberSubtext: "Amount can only be a positive number",
};
