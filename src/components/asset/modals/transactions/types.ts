import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import {
  TableData,
  TableDataElement,
} from "../../../../internal/asset/functionality/table/normalizeData";

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
};

export type DepositProps = {
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  token: TableDataElement | undefined;
  inputValue: string;
  receiverAddress: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  balance: BigNumber;
};
