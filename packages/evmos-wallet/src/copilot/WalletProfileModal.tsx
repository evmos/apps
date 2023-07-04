import { Tooltip, ViewExplorer } from "ui-helpers";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
  WalletExtension,
} from "../internal/wallet/functionality/wallet";
import { Dispatch, SetStateAction, useState } from "react";
import { AnyAction } from "redux";
import { CopyIcon, KeplrIcon, MetamaskIcon, WalletConnectIcon } from "icons";
import { truncateAddress } from "../internal/wallet/style/format";
import { ButtonDisconnect } from "../wallet/buttons/Button.Disconnect";
import { ModalWithTransitions } from "ui-helpers";
export const WalletProfileModal = ({
  walletExtension,
  dispatch,
  show,
  setShow,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const contentModal = (
    <div className="px-4 pr-2 pb-4 pt-5 sm:p-6">
      <h3 className="text-gray-900 text-base font-semibold leading-6">
        Wallet
      </h3>

      <div className="space-y-5">
        <div className="flex items-center space-x-5 justify-center">
          {walletExtension.extensionName === METAMASK_KEY && <MetamaskIcon />}
          {walletExtension.extensionName === KEPLR_KEY && <KeplrIcon />}
          {walletExtension.extensionName === WALLECT_CONNECT_KEY && (
            <WalletConnectIcon />
          )}
          {walletExtension.evmosAddressCosmosFormat !== "" && (
            <>
              <div className="flex flex-col font-bold ">
                <div className="flex items-center space-x-2">
                  <p>
                    {truncateAddress(walletExtension.evmosAddressCosmosFormat)}
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
                <p>{truncateAddress(walletExtension.evmosAddressEthFormat)}</p>
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

        <ButtonDisconnect
          walletExtension={walletExtension}
          dispatch={dispatch}
          setShow={setShow}
          setIsCopied={setIsCopied}
        />
      </div>
    </div>
  );
  return (
    <ModalWithTransitions
      show={show}
      setShow={setShow}
      content={contentModal}
    />
  );
};
