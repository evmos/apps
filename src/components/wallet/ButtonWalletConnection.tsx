import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { truncateAddress } from "../../internal/wallet/style/format";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
} from "../../internal/wallet/functionality/wallet";
import { useDispatch, useSelector } from "react-redux";
import { store, StoreType } from "../../redux/Store";
import { Metamask } from "../../internal/wallet/functionality/metamask/metamask";
import { Keplr } from "../../internal/wallet/functionality/keplr/keplr";
import { disconnectWallets } from "../../internal/wallet/functionality/disconnect";
import {
  GetProviderFromLocalStorage,
  RemoveProviderFromLocalStorage,
} from "../../internal/wallet/functionality/localstorage";
import MetamaskIcon from "../common/images/icons/MetamaskIcon";
import KeplrIcon from "../common/images/icons/KeplrIcon";
import Modal, { ModalTitle } from "../common/Modal";
import ViewExplorer from "../common/ViewExplorer";
import WalletIcon from "../common/images/icons/WalletIcon";
import ButtonWallet from "./ButtonWallet";
import ContentModalConnect from "./ContentModalConnect";
import WalletConnectIcon from "../common/images/icons/WalletConnectIcon";
import {
  useActivateWalletConnect,
  useWalletConnect,
} from "../../internal/wallet/functionality/walletconnect/walletconnect";

// Components
const Button = dynamic(() => import("../common/Button"));

const ButtonWalletConnection = () => {
  const [show, setShow] = useState(false);

  const useWC = useWalletConnect(store);

  const close = useCallback(() => setShow(false), []);
  const open = useCallback(() => setShow(true), []);

  const value = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  useActivateWalletConnect(store, true, value.extensionName);

  // Restore wallet connection on first load if exists
  const firstUpdate = useRef(true);

  useEffect(() => {
    // Execute the hook only once
    if (firstUpdate.current === false) {
      return;
    }

    // Read the localstorage info to reload the provider
    async function ReloadProvider() {
      const provider = GetProviderFromLocalStorage();
      if (provider === METAMASK_KEY) {
        const wallet = new Metamask(store);
        await wallet.connect();
      } else if (provider === KEPLR_KEY) {
        const wallet = new Keplr(store);
        await wallet.connect();
      } else {
        // Invalid provider is set, remove it
        RemoveProviderFromLocalStorage();
      }
    }

    // Execute the async function
    // Can not await inside a useEffect
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ReloadProvider();

    // Mark the ref as already executed
    firstUpdate.current = false;
  });

  return value.active === true ? (
    <>
      <button
        className="flex items-center space-x-3 justify-center"
        onClick={open}
      >
        {value.extensionName === METAMASK_KEY && <MetamaskIcon />}
        {value.extensionName === KEPLR_KEY && <KeplrIcon />}
        {value.extensionName === WALLECT_CONNECT_KEY && <WalletConnectIcon />}

        <span className="text-lg font-bold">
          {truncateAddress(value.evmosAddressEthFormat)}
        </span>
      </button>

      <Modal show={show} onClose={close}>
        <>
          <ModalTitle title="Wallet" />

          <div className="space-y-5">
            <div className="flex items-center space-x-5">
              {value.extensionName === METAMASK_KEY && <MetamaskIcon />}
              {value.extensionName === KEPLR_KEY && <KeplrIcon />}
              {value.extensionName === WALLECT_CONNECT_KEY && (
                <WalletConnectIcon />
              )}
              <div className="flex flex-col font-bold ">
                <div className="flex items-center space-x-2">
                  <p>{truncateAddress(value.evmosAddressCosmosFormat)}</p>
                  <button
                    className="text-xs font-normal"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        value.evmosAddressCosmosFormat
                      )
                    }
                  >
                    Copy
                  </button>
                </div>
                <p>{truncateAddress(value.evmosAddressEthFormat)}</p>
              </div>
              <ViewExplorer
                explorerTxUrl="https://www.mintscan.io/evmos/account"
                txHash={value.evmosAddressEthFormat}
              />
            </div>

            <button
              className="w-full rounded font-bold uppercase border border-darkPearl hover:bg-grayOpacity p-3 mt-3"
              onClick={() => {
                disconnectWallets(dispatch);
                setShow(false);
              }}
            >
              disconnect
            </button>
          </div>
        </>
      </Modal>
    </>
  ) : (
    <div className="flex justify-center">
      <Button onClick={open}>
        <div className="flex items-center space-x-2 ">
          <WalletIcon />
          <span>Connect wallet</span>
        </div>
      </Button>

      <Modal show={show} onClose={close}>
        <>
          <ModalTitle title="Connect Wallet" />

          <div className="flex flex-col space-y-3">
            <ButtonWallet
              onClick={async () => {
                setShow(false);
                disconnectWallets(dispatch);
                const keplr = new Keplr(store);
                await keplr.connect();
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
                setShow(false);
                disconnectWallets(dispatch);
                const metamask = new Metamask(store);
                await metamask.connect();
              }}
            >
              <ContentModalConnect>
                <>
                  <MetamaskIcon /> <span>MetaMask</span>
                </>
              </ContentModalConnect>
            </ButtonWallet>
            <ButtonWallet
              onClick={async () => {
                setShow(false);
                await useWC.connect();
              }}
            >
              <ContentModalConnect>
                <>
                  <WalletConnectIcon />
                  <span>Wallet Connect </span>
                </>
              </ContentModalConnect>
            </ButtonWallet>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default ButtonWalletConnection;
