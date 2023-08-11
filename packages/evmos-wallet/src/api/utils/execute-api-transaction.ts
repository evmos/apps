import { ApiPresignTx } from "../../utils";
import { signApiPresignTx } from "./sign-api-presign-tx";

import { E } from "helpers";

export type ExecuteResponse = {
  error: boolean;
  message: string;
  title: string;
  txHash: string;
  explorerTxUrl: string;
};
export const mapExecuteResponse = (
  partial: Partial<ExecuteResponse>
): ExecuteResponse => ({
  error: false,
  message: "",
  title: "",
  txHash: "",
  explorerTxUrl: "",
  ...partial,
});

export const executeApiTransaction = async (
  fetchApi: () => Promise<ApiPresignTx>,
  signFn = signApiPresignTx
) => {
  const [apiError, apiResponse] = await E.try(() => fetchApi());
  const [signError, signed] = await E.try(
    () => apiResponse && signFn(apiResponse)
  );
  const [broadcastError, hash] = await E.try(
    () => signed && signed.broadcast()
  );
  const error = apiError || signError || broadcastError;
  if (error || !hash || !apiResponse) {
    return {
      error: error ?? new Error("Unknown error"),
      hash: null,
      apiResponse: apiResponse,
    } as const;
  }

  return {
    error: null,
    hash,
    apiResponse,
  } as const;
};
