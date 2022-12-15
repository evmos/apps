import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { truncateAddress } from "../../internal/wallet/style/format";
import ButtonWallet from "./ButtonWallet";
import ContentModalConnect from "./ContentModalConnect";
import Modal from "../common/Modal";
import { useWalletContext } from "./WalletContext";
import { Metamask } from "../../internal/wallet/functionality/metamask/metamask";
import { METAMASK_KEY } from "../../internal/wallet/functionality/wallet";

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

  const { value, setValue } = useWalletContext();

  return value.active == true ? (
    <div className="flex items-center space-x-3">
      {value.extensionName === METAMASK_KEY ? <MetamaskIcon /> : <KeplrIcon />}
      <span className="text-lg font-bold">
        {truncateAddress(value.addressEthFormat)}
      </span>
    </div>
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
            onClick={() => {
              // TODO: implement function
              throw "Not implemented!";
            }}
            disabled
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
                value.disconnect();
              }
              const wallet = new Metamask();
              const connected = await wallet.connect();
              if (connected.result === true) {
                setValue(wallet);
              }
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
