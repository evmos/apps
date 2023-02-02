import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../internal/asset/functionality/table/normalizeData";

export type DropdownProps = {
  placeholder: string;
  data: TableData;
  setToken: Dispatch<SetStateAction<TableDataElement | undefined>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<string>>;
};
