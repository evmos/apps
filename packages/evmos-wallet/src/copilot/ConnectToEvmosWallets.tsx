import { EvmosCopilotIcon } from "icons";
import { DividerWithLabel, Badge } from "ui-helpers";
import { ButtonWalletKeplr } from "../wallet/buttons/ButtonWallet.Keplr";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ButtonWalletMetaMask } from "../wallet/buttons/ButtonWallet.MetaMask";
import { ButtonWalletConnect } from "../wallet/buttons/ButtonWallet.WalletConnect";
import ButtonWallet from "../wallet/ButtonWallet";

export const ConnectToEvmosWallets = ({
  setShow,
  dispatch,
}: {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  // const [showCopilot, setShowCopilot] = useState(false);
  return (
    <div className="md:col-span-2 space-y-3 px-4 md:px-8 pb-4 pt-5 sm:p-6 bg-white">
      <div className="md:mt-5">
        <ButtonWallet
          onClick={() => {
            // setShowCopilot(true);
          }}
        >
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-3 text-left">
              <EvmosCopilotIcon />
              <div className="flex flex-col text-sm">
                <p className="font-bold">Evmos Copilot</p>
                <p className="normal-case">Recommended for first time users</p>
              </div>
            </div>
            <Badge text="New" />
          </div>
        </ButtonWallet>
      </div>
      <DividerWithLabel label="or" />

      <div className="flex flex-col space-y-3">
        <ButtonWalletKeplr setShow={setShow} dispatch={dispatch} />
        <ButtonWalletMetaMask setShow={setShow} dispatch={dispatch} />
        <ButtonWalletConnect setShow={setShow} />
      </div>
    </div>
  );
};
