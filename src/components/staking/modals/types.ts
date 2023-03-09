import { BigNumber } from "ethers";
import { Dispatch, SetStateAction } from "react";
import { ModalDelegate } from "../../../internal/staking/functionality/types";
import { WalletExtension } from "../../../internal/wallet/functionality/wallet";

export type DelegateProps = {
  value: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
  evmosBalance: BigNumber;
};

export type RedelegateProps = {
  value: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  item: ModalDelegate;
  setConfirmClicked: Dispatch<SetStateAction<boolean>>;
};
