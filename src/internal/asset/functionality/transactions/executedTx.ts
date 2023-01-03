import { EVMOS_BACKEND } from "../../../wallet/functionality/networkConfig";
import { EXECUTED_NOTIFICATIONS } from "./errors";
import { executedTx } from "./types";

export async function checkIBCState(txHash: string, network: string) {
  try {
    const res = await fetch(
      `${EVMOS_BACKEND}/isIBCExecuted/${txHash}/${network}`
    );
    const data = (await res.json()) as executedTx;
    if (data.executed) {
      return {
        error: false,
        message: data.msg,
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
      console.error(e);
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
