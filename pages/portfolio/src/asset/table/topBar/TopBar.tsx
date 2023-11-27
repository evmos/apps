"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PrimaryButton, TopBarItem } from "@evmosapps/ui-helpers";
import { TopBarProps } from "./types";

import { useAccount } from "wagmi";
import { ReceiveIcon, SendIcon } from "icons";
import { useTranslation } from "@evmosapps/i18n/client";
import { useTransferModal } from "../../../modals/transfer/TransferModal";
import { useRequestModal } from "../../../modals/request/RequestModal";
import {
  CLICK_ON_RECEIVE_BUTTON,
  CLICK_ON_SEND_BUTTON,
  useTracker,
} from "tracker";

const TopBar = ({ topProps }: { topProps: TopBarProps }) => {
  const { isDisconnected } = useAccount();
  const { t } = useTranslation("portfolio");

  const transferModal = useTransferModal();
  const requestModal = useRequestModal();
  const { sendEvent } = useTracker();
  return (
    <div className="grid bg-darkGray2 text-pearl rounded-2xl p-4 text-center gap-y-6 md:grid-cols-3">
      <TopBarItem text="Total Assets" value={`$${topProps.totalAssets}`} />
      <TopBarItem
        text="EVMOS Price"
        value={
          topProps.evmosPrice === undefined
            ? "--"
            : `$${topProps.evmosPrice.toString()}`
        }
      />
      <div className="flex items-center justify-center space-x-2 md:justify-end">
        <PrimaryButton
          className="py-2"
          disabled={isDisconnected}
          icon={<SendIcon />}
          data-testid="open-send-modal-button"
          onClick={() => {
            transferModal.setIsOpen(true);
            sendEvent(CLICK_ON_SEND_BUTTON);
          }}
        >
          <p>{t("transfer.button")}</p>
        </PrimaryButton>
        <PrimaryButton
          className="py-2"
          disabled={isDisconnected}
          icon={<ReceiveIcon />}
          data-testid="open-request-modal-button"
          onClick={() => {
            requestModal.setIsOpen(true);
            sendEvent(CLICK_ON_RECEIVE_BUTTON);
          }}
        >
          <p>{t("request.button")}</p>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TopBar;
