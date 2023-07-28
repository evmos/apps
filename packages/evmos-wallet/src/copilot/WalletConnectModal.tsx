// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { ConnectToEvmos } from "./ConnectToEvmos";
import { ConnectToEvmosWallets } from "./ConnectToEvmosWallets";
import { AnyAction } from "redux";
import { ModalWithTransitions } from "ui-helpers";

export const WalletConnectModal = ({
  dispatch,
  show,
  setShow,
  copilotModal,
}: {
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  copilotModal?: JSX.Element;
}) => {
  const contentModal = (
    <div className="divide-strokeGrey text-gray1 grid grid-rows-1 divide-y md:grid-cols-3 md:grid-rows-none md:divide-x md:divide-y-0">
      <ConnectToEvmos />
      <ConnectToEvmosWallets
        copilotModal={copilotModal}
        setShow={setShow}
        dispatch={dispatch}
      />
    </div>
  );

  return (
    <ModalWithTransitions
      show={show}
      setShow={setShow}
      content={contentModal}
      propClose={true}
    />
  );
};
