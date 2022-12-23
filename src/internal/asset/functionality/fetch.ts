import { ERC20BalanceResponse } from "../../../components/asset/table/types";
import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";

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
    return Promise.resolve({ balance: { amount: 0, denom: "" } });
  }

  const res = await fetch(
    `${EVMOS_BACKEND}/BalanceByNetworkAndDenom/${network}/${token}/${address}`
  );
  return res.json() as Promise<BalanceResponse>;
};
