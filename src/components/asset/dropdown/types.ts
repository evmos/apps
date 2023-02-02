import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../internal/asset/functionality/table/normalizeData";

export type DropdownProps = {
  placeholder: string;
  data: TableData;
  setTokenTo: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddressTo: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<string>>;
};
