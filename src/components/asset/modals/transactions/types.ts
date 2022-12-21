import { BigNumber } from "ethers";

export type ModalProps = {
  values: ModalValues;
};

export type ModalValues = {
  token: string;
  tokenTo: string;
  address: string;
  amount: BigNumber;
  title: string;
  network: string;
  imgFrom: string;
  imgTo: string;
  fee: BigNumber;
  feeDenom: string;
  decimals: number;
  erc20Balance: BigNumber;
  feeBalance: BigNumber;
  networkTo: string;
};
