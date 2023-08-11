// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../../internal/asset/functionality/table/normalizeData";
import { DepositElement } from "./DepositSTR";

export type ButtonActionsProps = {
  data: TableData;
  feeBalance: BigNumber;
  address: string;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export type WithdrawProps = {
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  token: TableDataElement | undefined;
  inputValue: string;
  receiverAddress: string;
  address: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  feeBalance: BigNumber;
  chain: TableDataElement | undefined;
};

export type DepositProps = {
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  token: TableDataElement | undefined;
  inputValue: string;
  receiverAddress: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  balance: BigNumber;
  chain: DepositElement | undefined;
};

export type ConvertProps = {
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  inputValue: string;
  item: TableDataElement;
  balance: {
    balanceFrom: BigNumber;
    isIBCBalance: boolean;
  };
  setDisabled: Dispatch<SetStateAction<boolean>>;
};
