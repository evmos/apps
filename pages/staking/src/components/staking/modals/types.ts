// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { Dispatch, SetStateAction } from "react";

import { WalletExtension } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/wallet";
import { ModalCancelUndelegations, ModalDelegate } from "../../../utils/types";

export type DelegateProps = {
  value: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  evmosBalance: BigNumber;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export type RedelegateProps = {
  value: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  validatorDst: string;
};

export type UndelegateProps = {
  value: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export type CancelUndelegationsProps = {
  value: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalCancelUndelegations;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};
