// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import {
  formatProviderAddress,
  truncateAddress,
} from "../internal/wallet/style/format";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
  WalletExtension,
} from "../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import { store } from "../redux/Store";
import { Metamask } from "../internal/wallet/functionality/metamask/metamask";
import { Keplr } from "../internal/wallet/functionality/keplr/keplr";
import { disconnectWallets } from "../internal/wallet/functionality/disconnect";
import {
  GetProviderFromLocalStorage,
  GetProviderWalletConnectFromLocalStorage,
  GetWalletFromLocalStorage,
  RemoveProviderFromLocalStorage,
  RemoveProviderWalletConnectToLocalStorage,
  RemoveWalletFromLocalStorage,
  SaveWalletToLocalStorage,
} from "../internal/wallet/functionality/localstorage";
import {
  KeplrIcon,
  MetamaskIcon,
  WalletIcon,
  CopyIcon,
  WalletConnectIcon,
} from "icons";
import { Modal, ModalTitle } from "ui-helpers";
import { ViewExplorer } from "ui-helpers";
import ButtonWallet from "./ButtonWallet";
import ContentModalConnect from "./ContentModalConnect";
import {
  useActivateWalletConnect,
  useWalletConnect,
} from "../internal/wallet/functionality/walletconnect/walletconnect";
import { Tooltip } from "ui-helpers";
import {
  CLICK_WC_CONNECT_WALLET_BUTTON,
  CLICK_WC_DISCONNECT_WALLET_BUTTON,
  CLICK_WC_CONNECTED_WITH,
  SWITCH_BETWEEN_WALLETS,
  SUCCESSFUL_WALLET_CONNECTION,
  UNSUCCESSFUL_WALLET_CONNECTION,
  useTracker,
} from "tracker";
// Components
import { Button } from "ui-helpers";
import { TranslationContextProvider } from "schummar-translate/react";
import { t } from "../locales/translate";

export const ButtonWalletConnection = ({
  walletExtension,
  dispatch,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const [show, setShow] = useState(false);

  const useWC = useWalletConnect(store);

  const close = useCallback(() => setShow(false), []);
  const open = useCallback(() => setShow(true), []);

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

  const [isCopied, setIsCopied] = useState(false);

  const { handlePreClickAction: trackClickConnectWallet } = useTracker(
    CLICK_WC_CONNECT_WALLET_BUTTON
  );
  const { handlePreClickAction: trackClickDisconnectWallet } = useTracker(
    CLICK_WC_DISCONNECT_WALLET_BUTTON
  );

  const { handlePreClickAction: trackConnectedWithWallet } = useTracker(
    CLICK_WC_CONNECTED_WITH
  );

  const { handlePreClickAction: trackChangeWallet } = useTracker(
    SWITCH_BETWEEN_WALLETS
  );

  const { handlePreClickAction: trackSuccessfulWalletConnection } = useTracker(
    SUCCESSFUL_WALLET_CONNECTION
  );

  const { handlePreClickAction: trackUnsuccessfulWalletConnection } =
    useTracker(UNSUCCESSFUL_WALLET_CONNECTION);
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

  return (
    <TranslationContextProvider locale="en">
      {walletExtension.active === true ? (
        <>
          <button
            className="flex items-center space-x-3 justify-center"
            onClick={open}
          >
            {walletExtension.extensionName === METAMASK_KEY && <MetamaskIcon />}
            {walletExtension.extensionName === KEPLR_KEY && <KeplrIcon />}
            {walletExtension.extensionName === WALLECT_CONNECT_KEY && (
              <WalletConnectIcon />
            )}

            <span className="text-lg font-bold">
              {formatProviderAddress(walletExtension, true)}
            </span>
          </button>

          <Modal show={show} onClose={close}>
            <>
              <ModalTitle title="Wallet" />

              <div className="space-y-5">
                <div className="flex items-center space-x-5">
                  {walletExtension.extensionName === METAMASK_KEY && (
                    <MetamaskIcon />
                  )}
                  {walletExtension.extensionName === KEPLR_KEY && <KeplrIcon />}
                  {walletExtension.extensionName === WALLECT_CONNECT_KEY && (
                    <WalletConnectIcon />
                  )}
                  {walletExtension.evmosAddressCosmosFormat !== "" && (
                    <>
                      <div className="flex flex-col font-bold ">
                        <div className="flex items-center space-x-2">
                          <p>
                            {truncateAddress(
                              walletExtension.evmosAddressCosmosFormat
                            )}
                          </p>
                          <button
                            className="text-xs font-normal"
                            onClick={async () => {
                              await navigator.clipboard.writeText(
                                walletExtension.evmosAddressCosmosFormat
                              );
                              setIsCopied(true);
                            }}
                          >
                            <Tooltip
                              element={<CopyIcon width={14} height={14} />}
                              text={isCopied ? "Copied!" : "Copy"}
                            />
                          </button>
                        </div>
                        <p>
                          {truncateAddress(
                            walletExtension.evmosAddressEthFormat
                          )}
                        </p>
                      </div>
                      <ViewExplorer
                        explorerTxUrl="https://www.mintscan.io/evmos/account"
                        txHash={walletExtension.evmosAddressEthFormat}
                      />
                    </>
                  )}
                  {walletExtension.evmosAddressCosmosFormat === "" && (
                    <p className="font-bold"> Keplr without EVMOS ledger</p>
                  )}
                </div>

                <button
                  className="w-full rounded font-bold uppercase border border-darkPearl hover:bg-grayOpacity p-3 mt-3"
                  onClick={() => {
                    trackClickDisconnectWallet({
                      wallet: walletExtension?.evmosAddressEthFormat,
                      provider: walletExtension?.extensionName,
                    });
                    RemoveWalletFromLocalStorage();
                    RemoveProviderFromLocalStorage();
                    RemoveProviderWalletConnectToLocalStorage();
                    disconnectWallets(dispatch);
                    setShow(false);
                    setIsCopied(false);
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
          <Button
            onClick={() => {
              setShow(true);
              trackClickConnectWallet();
            }}
          >
            <div className="flex items-center space-x-2 ">
              <WalletIcon />
              <span>Connect wallet {t("hello")}</span>
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
                    <>
                      <MetamaskIcon /> <span>MetaMask</span>
                    </>
                  </ContentModalConnect>
                </ButtonWallet>
                <ButtonWallet
                  onClick={async () => {
                    setShow(false);
                    await useWC.connect();
                    trackConnectedWithWallet({
                      wallet: GetWalletFromLocalStorage(),
                      provider: WALLECT_CONNECT_KEY,
                      walletSelected:
                        GetProviderWalletConnectFromLocalStorage(),
                    });
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
      )}
    </TranslationContextProvider>
  );
};
