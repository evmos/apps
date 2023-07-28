// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ButtonWalletKeplr } from "../wallet/buttons/ButtonWallet.Keplr";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ButtonWalletMetaMask } from "../wallet/buttons/ButtonWallet.MetaMask";
import { ButtonWalletConnect } from "../wallet/buttons/ButtonWallet.WalletConnect";

export const ConnectToEvmosWallets = ({
  setShow,
  dispatch,
  copilotModal,
}: {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
  copilotModal?: React.ReactNode;
}) => {
  return (
    <div className="space-y-3 bg-white px-4 pb-4 pt-5 sm:p-6 md:col-span-2 md:px-8">
      {copilotModal !== undefined && copilotModal}
      <div className="flex flex-col space-y-3">
        <ButtonWalletKeplr setShow={setShow} dispatch={dispatch} />
        <ButtonWalletMetaMask setShow={setShow} dispatch={dispatch} />
        <ButtonWalletConnect setShow={setShow} />
      </div>
    </div>
  );
};
