// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";

export const EmptyDataModal = {
  token: "",
  address: "",
  amount: BigNumber.from(0),
  title: "",
  network: "",
  decimals: 1,
  fee: BigNumber.from(0),
  feeDenom: "",
  pubkey: "",
  erc20Balance: BigNumber.from(0),
  feeBalance: BigNumber.from(0),
  networkTo: "",
  chainId: "",
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
  chainId: string;
};
