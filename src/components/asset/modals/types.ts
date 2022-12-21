import { BigNumber } from "@ethersproject/bignumber";
import { BIG_ZERO } from "../../../internal/common/math/Bignumbers";

export const EmptyDataModal = {
  token: "",
  address: "",
  amount: BIG_ZERO,
  title: "",
  network: "",
  decimals: 1,
  fee: BIG_ZERO,
  feeDenom: "",
  pubkey: "",
  erc20Balance: BIG_ZERO,
  feeBalance: BIG_ZERO,
  networkTo: "",
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
  feeBalance: BigNumber;
  networkTo: string;
};
