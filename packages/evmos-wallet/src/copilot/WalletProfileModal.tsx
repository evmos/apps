// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Tooltip, ViewExplorer } from "@evmosapps/ui-helpers";
import { WalletExtension } from "../internal/wallet/functionality/wallet";
import { Dispatch, SetStateAction, useState } from "react";
import { AnyAction } from "redux";
import { CopyIcon } from "icons";
import { truncateAddress } from "../internal/wallet/style/format";
import { ButtonDisconnect } from "./buttons/Button.Disconnect";
import { Modal } from "@evmosapps/ui-helpers";
import { ProvidersIcons } from "./utils";
import { EXPLORER_URL } from "constants-helper";
export const WalletProfileModal = ({
  walletExtension,
  dispatch,
  isOpen,
  setIsOpen,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const contentModal = (
    <div className="px-4 pb-4 pr-2 pt-5 sm:p-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Wallet
      </h3>

      <div className="space-y-5">
        <div className="flex items-center justify-center space-x-5">
          {ProvidersIcons[walletExtension.extensionName]}

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
                explorerTxUrl={EXPLORER_URL + "/address"}
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
          setIsOpen={setIsOpen}
          setIsCopied={setIsCopied}
        />
      </div>
    </div>
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {contentModal}
    </Modal>
  );
};
