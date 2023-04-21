// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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
