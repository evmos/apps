import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../../../internal/asset/functionality/table/normalizeData";

export type ButtonActionsProps = {
  data: TableData;
  feeBalance: BigNumber;
  address: string;
  setShow: Dispatch<SetStateAction<boolean>>;
};
