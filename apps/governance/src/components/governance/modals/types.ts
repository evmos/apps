import { Dispatch, SetStateAction } from "react";
import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";

export type VoteProps = {
  id: string;
  option: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  isVotingTimeWithinRange: boolean;
};
