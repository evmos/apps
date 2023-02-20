import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../internal/asset/functionality/table/normalizeData";
import { DepositElement } from "../modals/transactions/DepositSTR";

export type DropdownTokensProps = {
  placeholder: string;
  data: TableData;
  setToken: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<string>>;
  setChain: Dispatch<SetStateAction<TableDataElement | undefined>>;
};

export type DropdownChainsProps = {
  placeholder: string;
  data: TableData;
  token: TableDataElement | undefined;
  chain: TableDataElement | undefined;
  setChain: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddress: Dispatch<SetStateAction<string>>;
};

export type DropdownChainsDepositProps = {
  placeholder: string;
  data: DepositElement[];
  token: TableDataElement | undefined;
  chain: TableDataElement | undefined;
  setChain: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddress: Dispatch<SetStateAction<string>>;
};
