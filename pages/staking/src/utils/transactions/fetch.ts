// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  GENERATING_TX_NOTIFICATIONS,
  IBCTransferResponse,
  EVMOS_BACKEND,
} from "@evmosapps/evmos-wallet";

export async function delegateBackendCall(
  pubkey: string,
  address: string,
  valAddress: string,
  amount: string
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/delegate`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
        message: {
          amount: amount,
          validatorAddress: valAddress,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      data: null,
    };
  }
}

export async function undelegateBackendCall(
  pubkey: string,
  address: string,
  valAddress: string,
  amount: string
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/undelegate`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
        message: {
          amount: amount,
          validatorAddress: valAddress,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      data: null,
    };
  }
}

export async function redelegateBackendCall(
  pubkey: string,
  address: string,
  valAddress: string,
  amount: string,
  valDestAddress: string
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/redelegate`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
        message: {
          amount: amount,
          validatorAddress: valAddress,
          validatorDstAddress: valDestAddress,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      data: null,
    };
  }
}

export async function rewardsBackendCall(
  pubkey: string,
  address: string
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/rewards`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      data: null,
    };
  }
}

export async function cancelUndelegationsBackendCall(
  pubkey: string,
  address: string,
  amount: string,
  valAddress: string,
  creationHeight: string
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/cancelUndelegation`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
        message: {
          amount: amount,
          validatorAddress: valAddress,
          creationHeight: creationHeight,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      data: null,
    };
  }
}
