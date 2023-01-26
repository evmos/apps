import { ERC20BalanceResponse } from "../../../components/asset/table/types";
import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";
import { BALANCE_NOTIFICATIONS } from "./transactions/errors";

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

export type TotalStakedResponse = {
  value: string;
};

export const getTotalStaked = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return { value: "0" };
  }
  const res = await fetch(`${EVMOS_BACKEND}/totalStakedByAddress/${address}`);
  return res.json() as Promise<TotalStakedResponse>;
};

// TODO: we need to add sourceIBCDenomToEvmos to the
// BalanceByNetworkAndDenom endpoint in the backend
// We'll work on this once we start with single token
// representation
// This function only supports OSMOSIS - EVMOS case.
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
      `${EVMOS_BACKEND}/BalanceByDenom/${network}/${address}/ibc/6AE98883D4D5D5FF9E50D7130F1305DA2FFA0C652D1DD9C123657C6B4EB2DF8A`
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
