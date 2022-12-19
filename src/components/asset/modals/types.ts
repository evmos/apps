import { BigNumber } from "ethers";

export const EmptyDataModal = {
  token: "",
  address: "",
  amount: BigNumber.from("0"),
  title: "",
  network: "",
  decimals: 1,
  fee: BigNumber.from("0"),
  feeDenom: "",
  pubkey: "",
  erc20Balance: BigNumber.from("0"),
};

export type DataModal = {
  token: string;
  address: string;
  amount: BigNumber;
  title: string;
  network: string;
  decimals: number;
  fee: BigNumber;
  feeDenom: string;
  pubkey: string | null;
  erc20Balance: BigNumber;
};
