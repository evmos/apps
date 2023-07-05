import { Dispatch } from "react";
import { disconnectWallets } from "../../internal/wallet/functionality/disconnect";
import { GetWalletFromLocalStorage } from "../../internal/wallet/functionality/localstorage";
import ButtonWallet from "../ButtonWallet";
import { MetamaskIcon } from "icons";
import { AnyAction } from "redux";
import { store } from "../../redux/Store";
import {
  useTracker,
  CLICK_CONNECTED_WITH,
  SUCCESSFUL_WALLET_CONNECTION,
  UNSUCCESSFUL_WALLET_CONNECTION,
} from "tracker";
import ContentModalConnect from "../ContentModalConnect";
import { Metamask } from "../../internal/wallet/functionality/metamask/metamask";
import { METAMASK_KEY } from "../../internal/wallet/functionality/wallet";

export const ButtonWalletMetaMask = ({
  setShow,
  dispatch,
}: {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { handlePreClickAction: trackConnectedWithWallet } =
    useTracker(CLICK_CONNECTED_WITH);

  const { handlePreClickAction: trackSuccessfulWalletConnection } = useTracker(
    SUCCESSFUL_WALLET_CONNECTION
  );

  const { handlePreClickAction: trackUnsuccessfulWalletConnection } =
    useTracker(UNSUCCESSFUL_WALLET_CONNECTION);

  return (
    <ButtonWallet
      onClick={async () => {
        setShow(false);
        disconnectWallets(dispatch);
        const metamask = new Metamask(store);
        const resultConnect = await metamask.connect();
        trackConnectedWithWallet({
          wallet: GetWalletFromLocalStorage(),
          provider: METAMASK_KEY,
        });
        if (resultConnect.result) {
          trackSuccessfulWalletConnection({
            provider: METAMASK_KEY,
          });
        } else {
          trackUnsuccessfulWalletConnection({
            message: resultConnect.message,
            provider: METAMASK_KEY,
          });
        }
      }}
    >
      <ContentModalConnect>
        <MetamaskIcon /> <span>MetaMask</span>
      </ContentModalConnect>
    </ButtonWallet>
  );
};
