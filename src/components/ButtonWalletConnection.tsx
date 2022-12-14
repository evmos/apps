import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { truncateAddress } from "../internal/wallet/style/format";
import ButtonTertiary from "./ButtonTertiary";
import ContentModalConnect from "./ContentModalConnect";
import Modal from "./Modal";

// Images
const WalletIcon = dynamic(() => import("./images/icons/WalletIcon"));
const MetamaskIcon = dynamic(() => import("./images/icons/MetamaskIcon"));
const KeplrIcon = dynamic(() => import("./images/icons/KeplrIcon"));
const WalletConnectIcon = dynamic(
  () => import("./images/icons/WalletConnectIcon")
);

// Components
const Button = dynamic(() => import("./Button"));

const ButtonWalletConnection = () => {
  const address = "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak";
  const truncatedAddress = truncateAddress(address);
  const [show, setShow] = useState(false);

  const close = useCallback(() => setShow(false), []);
  const open = useCallback(() => setShow(true), []);

  return (
    // <div className="flex items-center space-x-3">
    //   <KeplrIcon />
    //   <span className="text-lg font-bold">{truncatedAddress}</span>
    // </div>
    <div>
      <Modal title="Connect Wallet" show={show} onClose={close}>
        <div className="flex flex-col space-y-3">
          <ButtonTertiary onClick={() => {}} disabled>
            <ContentModalConnect>
              <>
                <KeplrIcon /> <span>Keplr</span>
              </>
            </ContentModalConnect>
          </ButtonTertiary>
          <ButtonTertiary onClick={() => {}}>
            <ContentModalConnect>
              <>
                <MetamaskIcon /> <span>MetaMask</span>
              </>
            </ContentModalConnect>
          </ButtonTertiary>
          <ButtonTertiary onClick={() => {}}>
            <ContentModalConnect>
              <>
                <WalletConnectIcon /> <span>Wallet Connect</span>
              </>
            </ContentModalConnect>
          </ButtonTertiary>
        </div>
      </Modal>
      <Button onClick={open}>
        <div className="flex items-center space-x-2">
          <WalletIcon />
          <span>Connect wallet</span>
        </div>
      </Button>
    </div>
  );
};

export default ButtonWalletConnection;
