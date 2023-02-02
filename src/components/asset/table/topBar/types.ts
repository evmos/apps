import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../../../internal/asset/functionality/table/normalizeData";

export type TopBarProps = {
  totalAssets: string;
  totalStaked: string;
  evmosPrice: number;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
  tableData: TableData;
};
