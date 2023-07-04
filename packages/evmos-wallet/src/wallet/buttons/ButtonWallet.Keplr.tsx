import { Dispatch } from "react";
import { disconnectWallets } from "../../internal/wallet/functionality/disconnect";
import { Keplr } from "../../internal/wallet/functionality/keplr/keplr";
import { GetWalletFromLocalStorage } from "../../internal/wallet/functionality/localstorage";
import { KEPLR_KEY } from "../../internal/wallet/functionality/wallet";
import ButtonWallet from "../ButtonWallet";
import { KeplrIcon } from "icons";
import { AnyAction } from "redux";
import { store } from "../../redux/Store";
import {
  CLICK_WC_CONNECTED_WITH,
  SUCCESSFUL_WALLET_CONNECTION,
  UNSUCCESSFUL_WALLET_CONNECTION,
  useTracker,
} from "tracker";
import ContentModalConnect from "../ContentModalConnect";
export const ButtonWalletKeplr = ({
  setShow,
  dispatch,
}: {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { handlePreClickAction: trackConnectedWithWallet } = useTracker(
    CLICK_WC_CONNECTED_WITH
  );
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
        const keplr = new Keplr(store);
        const resultConnect = await keplr.connect();
        trackConnectedWithWallet({
          wallet: GetWalletFromLocalStorage(),
          provider: KEPLR_KEY,
        });
        if (resultConnect.result) {
          trackSuccessfulWalletConnection({
            provider: KEPLR_KEY,
          });
        } else {
          trackUnsuccessfulWalletConnection({
            message: resultConnect.message,
            provider: KEPLR_KEY,
          });
        }
      }}
    >
      <ContentModalConnect>
        <KeplrIcon /> <span>Keplr</span>
      </ContentModalConnect>
    </ButtonWallet>
  );
};
