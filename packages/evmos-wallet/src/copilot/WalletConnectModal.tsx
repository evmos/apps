import { Dispatch, SetStateAction } from "react";
import { ConnectToEvmos } from "./ConnectToEvmos";
import { ConnectToEvmosWallets } from "./ConnectToEvmosWallets";
import { AnyAction } from "redux";
import { ModalWithTransitions } from "ui-helpers";

export const WalletConnectModal = ({
  dispatch,
  show,
  setShow,
}: {
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const contentModal = (
    <div className="grid grid-rows-1 md:grid-rows-none md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DBD3D1] text-[#413836]">
      <ConnectToEvmos />
      <ConnectToEvmosWallets setShow={setShow} dispatch={dispatch} />
    </div>
  );

  return (
    <ModalWithTransitions
      show={show}
      setShow={setShow}
      content={contentModal}
    />
  );
};
