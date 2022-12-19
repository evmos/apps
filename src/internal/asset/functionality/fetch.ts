import { ERC20BalanceResponse } from "../../../components/asset/table/types";

const URL = "https://goapi.evmos.org";

export const getAssets = async () => {
  const res = await fetch(`${URL}/ERC20ModuleBalance`);
  return res.json() as Promise<ERC20BalanceResponse>;
};

export const getAssetsForAddress = async (
  address: string,
  hexAddress: string
) => {
  const res = await fetch(`${URL}/ERC20ModuleBalance/${address}/${hexAddress}`);
  return res.json() as Promise<ERC20BalanceResponse>;
};
