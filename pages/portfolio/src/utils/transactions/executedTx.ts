// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  fetchWithTimeout,
  EVMOS_BACKEND,
  EXECUTED_NOTIFICATIONS,
  executedTx,
  TransactionStatus,
  txStatusErrorResponse,
  txStatusResponse,
} from "@evmosapps/evmos-wallet";
import { Log } from "helpers";

export async function checkIBCState(txHash: string, network: string) {
  try {
    const res = await fetchWithTimeout(
      `${EVMOS_BACKEND}/isIBCExecuted/${txHash}/${network}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = (await res.json()) as executedTx;
    if (data.executed) {
      return {
        error: false,
        message: "",
        title: EXECUTED_NOTIFICATIONS.SuccessTitle,
      };
    } else {
      return {
        error: true,
        message: data.msg,
        title: EXECUTED_NOTIFICATIONS.ErrorTitle,
      };
    }
  } catch (e) {
    if (e instanceof TypeError) {
      return {
        error: true,
        message: e.message,
        title: EXECUTED_NOTIFICATIONS.ErrorTitle,
      };
    } else {
      Log().error(e);
      return {
        error: true,
        message: EXECUTED_NOTIFICATIONS.UnexpectedSubtext,
        title: EXECUTED_NOTIFICATIONS.ErrorTitle,
      };
    }
  }
}

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function checkIBCExecutionStatus(txHash: string, network: string) {
  let count = 0;
  while (count < 10) {
    const status = await checkIBCState(txHash, network);
    if (!status.error) {
      return status;
    }

    count += 1;
    await sleep(3000);

    if (count === 9) {
      return status;
    }
  }
  return {
    error: true,
    message: EXECUTED_NOTIFICATIONS.UnexpectedSubtext,
    title: EXECUTED_NOTIFICATIONS.ErrorTitle,
  };
}

export async function checkTx(txHash: string, network: string) {
  try {
    const rawRes = await fetchWithTimeout(
      `${EVMOS_BACKEND}/TxStatus/${network}/${txHash}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const res = (await rawRes.json()) as
      | txStatusErrorResponse
      | txStatusResponse;
    // Transaction not found (not included in a block)
    if ("error" in res) {
      if (res.error === "All Endpoints are failing") {
        return TransactionStatus.UNCONFIRMED;
      }
      if (typeof res.error !== "string") {
        if (res.error?.code === -32603) {
          return TransactionStatus.UNCONFIRMED;
        }
      }
    }
    // Success
    if ("result" in res) {
      if (res?.result?.tx_result?.code === 0) {
        return TransactionStatus.SUCCESS;
      }
    }
  } catch (e) {
    return TransactionStatus.ERROR;
  }

  // HTTP error or not code 0, is that the transaction failed
  // We probably shouldn't get here because the SYNC call should catch any transaction error
  return TransactionStatus.ERROR;
}

export async function checkTxInclusionInABlock(
  txHash: string,
  network: string
) {
  let count = 0;
  while (count < 10) {
    const status = await checkTx(txHash, network);
    if (status === TransactionStatus.UNCONFIRMED) {
      count += 1;
      await sleep(3000);
    } else {
      return status;
    }
  }
}
