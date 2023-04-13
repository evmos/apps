import {
  checkIBCExecutionStatus,
  checkTxInclusionInABlock,
} from "../functionality/transactions/executedTx";

import {
  addSnackbar,
  EXECUTED_NOTIFICATIONS,
  INCLUDED_BLOCK_NOTIFICATIONS,
  TransactionStatus,
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
} from "evmos-wallet";

export function snackbarWaitingBroadcast() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: EXECUTED_NOTIFICATIONS.WaitingTitle,
    },
    type: SNACKBAR_TYPES.DEFAULT,
  });
}

export async function snackbarIncludedInBlock(
  txHash: string,
  chain: string,
  explorerTxUrl: string
) {
  const includedInBlock = await checkTxInclusionInABlock(txHash, chain);
  if (includedInBlock !== undefined) {
    if (includedInBlock === TransactionStatus.SUCCESS) {
      return addSnackbar({
        id: 0,
        content:
          explorerTxUrl === ""
            ? {
                type: SNACKBAR_CONTENT_TYPES.TEXT,
                title: INCLUDED_BLOCK_NOTIFICATIONS.SuccessTitle,
              }
            : {
                type: SNACKBAR_CONTENT_TYPES.LINK,
                title: INCLUDED_BLOCK_NOTIFICATIONS.SuccessTitle,
                hash: txHash,
                explorerTxUrl: explorerTxUrl,
              },

        type: SNACKBAR_TYPES.SUCCESS,
      });
    } else {
      return addSnackbar({
        id: 0,
        content: {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: INCLUDED_BLOCK_NOTIFICATIONS.ErrorTitle,
        },
        type: SNACKBAR_TYPES.ERROR,
      });
    }
  }
  // unconfirmed
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: INCLUDED_BLOCK_NOTIFICATIONS.WaitingTitle,
    },
    type: SNACKBAR_TYPES.DEFAULT,
  });
}

export async function snackbarExecutedTx(txHash: string, chain: string) {
  const executed = await checkIBCExecutionStatus(txHash, chain);
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: executed.title,
      text: executed.message,
    },
    type:
      executed.error === true ? SNACKBAR_TYPES.ERROR : SNACKBAR_TYPES.SUCCESS,
  });
}
