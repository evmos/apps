import { Dispatch, SetStateAction } from "react";
import { TableData } from "../../../../internal/asset/functionality/table/normalizeData";

export type TopBarProps = {
  totalAssets: string;
  evmosPrice: number;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
  tableData: TableData;
};

export type actionsProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
  tableData: TableData;
};
