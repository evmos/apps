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
  RemoveProviderFromLocalStorage,
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
  useTracker,
} from "tracker";
// Components
import { Button } from "ui-helpers";

export const ButtonWalletConnection = ({
  walletExtension,
  dispatch,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>;
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
    CLICK_WC_DISCONNECT_WALLET_BUTTON,
    { provider: walletExtension.extensionName }
  );

  const { handlePreClickAction: trackConnectedWithWallet } = useTracker(
    CLICK_WC_CONNECTED_WITH
  );
  return walletExtension.active === true ? (
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
                      {truncateAddress(walletExtension.evmosAddressEthFormat)}
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
                trackClickDisconnectWallet();
                RemoveProviderFromLocalStorage();
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
                // TODO: how do I pass the provider?
                trackConnectedWithWallet();
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
                // TODO: how do I pass the provider?
                trackConnectedWithWallet();
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
                // TODO: how do I pass the provider?
                trackConnectedWithWallet();
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
