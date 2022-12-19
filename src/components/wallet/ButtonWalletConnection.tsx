import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { truncateAddress } from "../../internal/wallet/style/format";
import ButtonWallet from "./ButtonWallet";
import ContentModalConnect from "./ContentModalConnect";
import Modal from "../common/Modal";
import { METAMASK_KEY } from "../../internal/wallet/functionality/wallet";
import { useDispatch, useSelector } from "react-redux";
import { store, StoreType } from "../../redux/Store";
import { Metamask } from "../../internal/wallet/functionality/metamask/metamask";
import { unsubscribeToEvents } from "../../internal/wallet/functionality/metamask/metamaskHelpers";
import { resetWallet } from "./redux/WalletSlice";
import { Keplr } from "../../internal/wallet/functionality/keplr/keplr";
import { unsubscribeToKeplrEvents } from "../../internal/wallet/functionality/keplr/keplrHelpers";

// Images
const WalletIcon = dynamic(() => import("../common/images/icons/WalletIcon"));
const MetamaskIcon = dynamic(
  () => import("../common/images/icons/MetamaskIcon")
);
const KeplrIcon = dynamic(() => import("../common/images/icons/KeplrIcon"));
const WalletConnectIcon = dynamic(
  () => import("../common/images/icons/WalletConnectIcon")
);

// Components
const Button = dynamic(() => import("../common/Button"));

const ButtonWalletConnection = () => {
  const [show, setShow] = useState(false);

  const close = useCallback(() => setShow(false), []);
  const open = useCallback(() => setShow(true), []);

  const value = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  return value.active == true ? (
    <button className="flex items-center space-x-3 justify-center">
      {value.extensionName === METAMASK_KEY ? <MetamaskIcon /> : <KeplrIcon />}
      <span className="text-lg font-bold">
        {truncateAddress(value.evmosAddressEthFormat)}
      </span>
    </button>
  ) : (
    <div>
      <Button onClick={open}>
        <div className="flex items-center space-x-2">
          <WalletIcon />
          <span>Connect wallet</span>
        </div>
      </Button>

      <Modal title="Connect Wallet" show={show} onClose={close}>
        <div className="flex flex-col space-y-3">
          <ButtonWallet
            onClick={async () => {
              if (value.active) {
                unsubscribeToEvents();
                unsubscribeToKeplrEvents();
                dispatch(resetWallet());
              }
              const keplr = new Keplr(store);
              const connected = await keplr.connect();
              alert(connected.message);
            }}
          >
            <ContentModalConnect>
              <>
                <KeplrIcon /> <span>Keplr</span>
              </>
            </ContentModalConnect>
          </ButtonWallet>
          <ButtonWallet
            onClick={async () => {
              if (value.active) {
                unsubscribeToEvents();
                unsubscribeToKeplrEvents();
                dispatch(resetWallet());
              }
              const metamask = new Metamask(store);
              const connected = await metamask.connect();
              alert(connected.message);
            }}
          >
            <ContentModalConnect>
              <>
                <MetamaskIcon /> <span>MetaMask</span>
              </>
            </ContentModalConnect>
          </ButtonWallet>
          <ButtonWallet
            onClick={() => {
              // TODO: implement function
              throw "Not implemented!";
            }}
          >
            <ContentModalConnect>
              <>
                <WalletConnectIcon /> <span>Wallet Connect</span>
              </>
            </ContentModalConnect>
          </ButtonWallet>
        </div>
      </Modal>
    </div>
  );
};

export default ButtonWalletConnection;
