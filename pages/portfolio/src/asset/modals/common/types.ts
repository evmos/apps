// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../utils/table/normalizeData";
import { DropdownChainsProps } from "../../dropdown/types";
import { DepositElement } from "../transactions/DepositSTR";
import { BigNumber } from "@ethersproject/bignumber";

export type Fee = {
  fee: BigNumber;
  feeDenom: string;
  feeBalance: BigNumber;
  feeDecimals: number;
};

export type Balance = {
  denom: string;
  amount: BigNumber;
  decimals: number;
};

export type Input = {
  value: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
};

export type Style = {
  tokenTo: string;
  address: string;
  img: string;
  text: string;
};

export type FromProps = {
  fee: Fee;
  balance: Balance;
  input: Input;
  style: Style;
};

export type WithdrawReceiverProps = {
  token: TableDataElement | undefined;
  receiverAddress: string;
  setReceiverAddress: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
  dropChainProps: DropdownChainsProps;
};

export type AmountWithdrawProps = {
  data: TableData;
  setToken: Dispatch<SetStateAction<TableDataElement | undefined>>;
  token: TableDataElement | undefined;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
  setReceiverAddress: Dispatch<SetStateAction<string>>;
  setChain: Dispatch<SetStateAction<TableDataElement | undefined>>;
  chain: TableDataElement | undefined;
};

type FeeDeposit = {
  fee: BigNumber;
  feeDenom: string | undefined;
  feeBalance: BigNumber;
  feeDecimals: number | undefined;
};

export type AmountDepositProps = {
  data: TableDataElement[] | undefined;
  setToken: Dispatch<SetStateAction<TableDataElement | undefined>>;
  token: TableDataElement | undefined;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  confirmClicked: boolean;
  setReceiverAddress: Dispatch<SetStateAction<string>>;
  balance: BigNumber;
  fee: FeeDeposit;
  setChain: Dispatch<SetStateAction<DepositElement | undefined>>;
  chain: DepositElement | undefined;
};
