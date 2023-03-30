import { ERC20BalanceResponse } from "../../../../components/asset/table/types";
import { BalanceResponse } from "../../../asset/functionality/fetch";
import {
  EVMOS_BACKEND,
  EVMOS_MINIMAL_COIN_DENOM,
  EVMOS_SYMBOL,
} from "../../../wallet/functionality/networkConfig";

export const getEvmosBalance = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return { balance: { denom: "", amount: "" } };
  }
  const res = await fetch(
    `${EVMOS_BACKEND}/BalanceByDenom/${EVMOS_SYMBOL}/${address}/${EVMOS_MINIMAL_COIN_DENOM}`
  );
  return res.json() as Promise<BalanceResponse>;
};

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
