import { Dispatch, useEffect, useRef, useState } from "react";
import { useActivateWalletConnect } from "../internal/wallet/functionality/walletconnect/walletconnect";
import { store } from "../redux/Store";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WalletExtension,
} from "../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import {
  GetProviderFromLocalStorage,
  GetWalletFromLocalStorage,
  RemoveProviderFromLocalStorage,
  SaveWalletToLocalStorage,
} from "../internal/wallet/functionality/localstorage";
import { Metamask } from "../internal/wallet/functionality/metamask/metamask";
import { Keplr } from "../internal/wallet/functionality/keplr/keplr";
import { SWITCH_BETWEEN_WALLETS, useTracker } from "tracker";
import { WalletConnectModal } from "./WalletConnectModal";
import { WalletProfileModal } from "./WalletProfileModal";
import { ButtonConnectWallet } from "../wallet/buttons/Button.ConnectWallet";
import { ButtonProfile } from "../wallet/buttons/Button.Profile";

export const WalletConnection = ({
  walletExtension,
  dispatch,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const [show, setShow] = useState(false);

  useActivateWalletConnect(store, true, walletExtension.extensionName);

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

  const { handlePreClickAction: trackChangeWallet } = useTracker(
    SWITCH_BETWEEN_WALLETS
  );

  useEffect(() => {
    function trackWallet() {
      const walletLocalStorage = GetWalletFromLocalStorage();
      // walletExtension is not set
      if (walletExtension.evmosAddressEthFormat === "") {
        return;
      }
      // walletLocalStorage is not set
      if (walletLocalStorage === null) {
        return;
      }
      // track the wallet change if the wallets are different
      if (walletExtension.evmosAddressEthFormat !== walletLocalStorage) {
        trackChangeWallet({
          provider: walletExtension.extensionName,
          wallet: walletExtension.evmosAddressEthFormat,
        });
        SaveWalletToLocalStorage(walletExtension.evmosAddressEthFormat);
      }
    }
    // tracking address changes
    if (METAMASK_KEY === GetProviderFromLocalStorage()) {
      trackWallet();
    }

    if (KEPLR_KEY === GetProviderFromLocalStorage()) {
      trackWallet();
    }
  }, [walletExtension]);

  useEffect(() => {
    const walletLocalStorage = GetWalletFromLocalStorage();
    // avoid saving the evmos address if it is empty or is already stored.
    if (walletExtension.evmosAddressEthFormat === "") {
      return;
    }
    if (walletLocalStorage === walletExtension.evmosAddressEthFormat) {
      return;
    }
    SaveWalletToLocalStorage(walletExtension.evmosAddressEthFormat);
  }, [walletExtension]);

  return walletExtension.active === true ? (
    <>
      {/* open profile modal */}
      <ButtonProfile setShow={setShow} walletExtension={walletExtension} />
      {/* display profile modal */}
      <WalletProfileModal
        walletExtension={walletExtension}
        dispatch={dispatch}
        show={show}
        setShow={setShow}
      />
    </>
  ) : (
    <div className="flex justify-center">
      {/* open connect modal */}
      <ButtonConnectWallet setShow={setShow} />
      {/* display connect modal */}
      <WalletConnectModal dispatch={dispatch} show={show} setShow={setShow} />
    </div>
  );
};
