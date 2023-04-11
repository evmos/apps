import { ERC20BalanceResponse } from "../../../components/asset/table/types";
import { EVMOS_BACKEND, BALANCE_NOTIFICATIONS } from "evmos-wallet";

export const getAssets = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/ERC20ModuleBalance`);
  return res.json() as Promise<ERC20BalanceResponse>;
};

export const getAssetsForAddress = async (
  address: string,
  hexAddress: string
) => {
  // If not wallet selected return everything empty
  if (address === "" || hexAddress === "") {
    return getAssets();
  }

  const res = await fetch(
    `${EVMOS_BACKEND}/ERC20ModuleBalance/${address}/${hexAddress}`
  );
  return res.json() as Promise<ERC20BalanceResponse>;
};

export type BalanceResponse = {
  balance: {
    amount: string;
    denom: string;
  };
};

export const getBalance = async (
  address: string,
  network: string,
  token: string
) => {
  // If not wallet selected return everything empty
  if (address === "" || network === "" || token === "") {
    return {
      error: false,
      message: "",
      data: { balance: { amount: 0, denom: "" } },
    };
  }

  try {
    const res = await fetch(
      `${EVMOS_BACKEND}/BalanceByNetworkAndDenom/${network}/${token}/${address}`
    );
    const data = (await res.json()) as BalanceResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: BALANCE_NOTIFICATIONS.ErrorGetBalance,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: BALANCE_NOTIFICATIONS.ErrorGetBalance,
      data: null,
    };
  }
};

export const getEvmosBalanceForDeposit = async (
  address: string,
  network: string,
  token: string
) => {
  // If not wallet selected return everything empty
  if (address === "" || network === "" || token === "") {
    return {
      error: false,
      message: "",
      data: { balance: { amount: 0, denom: "" } },
    };
  }
  try {
    const res = await fetch(
      `${EVMOS_BACKEND}/EVMOSIBCBalance/${network}/${address}`
    );
    const data = (await res.json()) as BalanceResponse;
    if ("error" in data) {
      return {
        error: true,
        message: BALANCE_NOTIFICATIONS.ErrorGetBalance,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    return {
      error: true,
      message: BALANCE_NOTIFICATIONS.ErrorGetBalance,
      data: null,
    };
  }
};
