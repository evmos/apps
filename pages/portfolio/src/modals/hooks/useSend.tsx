// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo } from "react";
import {
  Prefix,
  TokenAmount,
} from "@evmosapps/evmos-wallet/src/registry-actions/types";
import {
  Address,
  isValidCosmosAddress,
  isValidHexAddress,
  normalizeToCosmosAddress,
  useAccountExists,
  useFee,
  useTokenBalance,
  useTransfer,
} from "@evmosapps/evmos-wallet";
import {
  Prefixish,
  normalizeToPrefix,
} from "@evmosapps/evmos-wallet/src/registry-actions/utils/normalize-to-prefix";
import { getFeeToken } from "@evmosapps/evmos-wallet/src/registry-actions/getFeeToken";
import { E } from "helpers";

export const useSend = ({
  sender,
  receiver,
  token,
}: {
  sender?: Address<Prefix>;
  receiver?: Prefixish;
  token?: TokenAmount;
}) => {
  const receiverPrefix = receiver ? normalizeToPrefix(receiver) : "evmos";
  const receiverAddress =
    isValidHexAddress(receiver) || isValidCosmosAddress(receiver)
      ? receiver
      : undefined;
  const { data: accountExists } = useAccountExists(sender);
  const feeToken = sender ? getFeeToken(sender) : undefined;

  /**
   * Calculate Fee
   */
  const feeQuery = useFee({
    sender,
    receiverChainPrefix: receiverPrefix,
    tokenRef: token?.ref,
  });
  const { fee, isPending: isFeeLoading } = feeQuery;
  /**
   * Transfer
   */
  const transferQuery = useTransfer({
    sender,
    receiver: receiverAddress,
    token: token,
    fee,
  });
  const {
    error: transferError,
    transfer,

    isPending: isTransferring,
    data: transferResponse,
  } = transferQuery;

  /**
   * Balances
   */
  const balanceQuery = useTokenBalance(sender, token?.ref);
  const { balance, isFetching: isFetchingBalance } = balanceQuery;
  const feeBalanceQuery = useTokenBalance(sender, feeToken?.ref);
  const { balance: feeBalance, isFetching: isFetchingFeeBalance } =
    feeBalanceQuery;

  /**
   * Checks
   */
  /**
   * Full amount includes fee when necessary
   */
  const tokenRef = token?.ref;
  const tokenAmount = token?.amount;
  const feeTokenRef = fee?.token.ref;
  const feeTokenAmount = fee?.token.amount;
  const fullAmount = useMemo(() => {
    if (tokenRef && tokenRef === feeTokenRef) {
      return (tokenAmount ?? 0n) + (feeTokenAmount ?? 0n);
    }
    return tokenAmount ?? 0n;
  }, [tokenRef, tokenAmount, feeTokenRef, feeTokenAmount]);

  const hasSufficientBalance =
    accountExists === true && fullAmount <= (balance?.value ?? 0n);

  const hasSufficientBalanceForFee =
    (fee?.token.amount ?? 0) <= (feeBalance?.value ?? 0n);

  const hasValidReceiver =
    receiverAddress &&
    sender &&
    normalizeToCosmosAddress(sender) !==
      normalizeToCosmosAddress(receiverAddress);

  const hasValidAmount = token?.amount !== undefined && token?.amount > 0n;

  const hasLoadedFee = fee !== undefined && isFeeLoading === false;

  const hasTransferred = transferResponse !== undefined;
  const transferRejected = E.match.byPattern(
    transferError,
    /(Request rejected|User rejected the request)/g
  );
  const out = {
    transfer,
    isReady:
      hasSufficientBalance &&
      hasSufficientBalanceForFee &&
      hasValidReceiver &&
      hasValidAmount &&
      hasLoadedFee,

    isPreparing: isFeeLoading || isFetchingBalance || isFetchingFeeBalance,
    isFetchingBalance,
    isFetchingFeeBalance,
    isTransferring,
    hasTransferred,
    transferRejected,
    transferResponse,
    transferError,
    balance,
    fee,
    feeBalance,
    feeToken,

    validation: {
      hasSufficientBalance,
      hasSufficientBalanceForFee,
      hasValidReceiver,
      hasValidAmount,
      hasLoadedFee,
    },
  };

  return {
    ...out,
    __DEBUG__: {
      ...out,

      sender,
      receiver,
      token,
      feeQuery,
      transferQuery,
      balanceQuery,
      feeBalanceQuery,
    },
  };
};
