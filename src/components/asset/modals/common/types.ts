import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";

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
