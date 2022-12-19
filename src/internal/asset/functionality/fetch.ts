import { BalanceType } from "../../../components/asset/AssetsTable";
import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";

export const getAssets = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/ERC20ModuleBalance`);
  return res.json() as Promise<BalanceType>;
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
  return res.json() as Promise<BalanceType>;
};
