// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import {
  ModalCancelUndelegations,
  ModalDelegate,
} from "../../../internal/staking/functionality/types";
import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";

export type DelegateProps = {
  value: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  evmosBalance: BigNumber;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export type RedelegateProps = {
  value: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  validatorDst: string;
};

export type UndelegateProps = {
  value: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export type CancelUndelegationsProps = {
  value: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalCancelUndelegations;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};
