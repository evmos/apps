export const EXECUTED_NOTIFICATIONS = {
  SuccessTitle: "Successfully executed",
  ErrorTitle: "Executing transaction",
  UnexpectedSubtext: "Unexpected error",
  WaitingTitle:
    "Waiting for ibc transaction to be executed in the destination chain",
  IBCTransferInformation: {
    text: "Note",
    subtext:
      "IBC transfer takes up to 15 mins in time of congestion. Please be patient before attempting to resend the transaction.",
  },
} as const;

export const BROADCASTED_NOTIFICATIONS = {
  SuccessTitle: "Successfully broadcasted",
  ErrorTitle: "Error broadcasting tx",
  SubmitTitle: "Transaction submit with hash:",
} as const;

export const MODAL_NOTIFICATIONS = {
  ErrorAmountTitle: "Amount error",
  ErrorZeroAmountSubtext: "Amount cannot be 0",
  ErrorInsufficientFeeSubtext:
    "Lack sufficient balance to carry forth action. Balance needs to be above reserved amount",
  ErrorsAmountGt: "Amount is bigger than the actual balance",
  ErrorAmountEmpty: "Amount can not be empty",
  ErrorAddressTitle: "Invalid address",
  ErrorAddressSubtext: "The address does not match with the chain",
  ErrorPositiveNumberSubtext: "Amount can only be a positive number",
  ErrorAddressEmpty: "Address can not be empty",
  ErrorTokenEmpty: "Please, select a token",
  ErrorWrongPrefix: "Incorrect address",
  ErrorValidatorEmpty: "Please, select a validator",
} as const;

export const BALANCE_NOTIFICATIONS = {
  ErrorGetBalance: "Error getting balance, please try again later",
  ErrorGetBalanceExtChain: "Error getting balance from external chain",
} as const;

export const GENERATING_TX_NOTIFICATIONS = {
  ErrorGeneratingTx: "Error generating transaction, please try again later",
};

export const SIGNING_NOTIFICATIONS = {
  ErrorTitle: "Error signing tx",
} as const;

export const INCLUDED_BLOCK_NOTIFICATIONS = {
  SuccessTitle: "Successfully included in a block",
  ErrorTitle: "Error including transaction in a block",
  WaitingTitle: "Waiting for the transaction to be included in a block",
} as const;

export const WALLET_NOTIFICATIONS = {
  ErrorTitle: "Wallet not connected",
};
