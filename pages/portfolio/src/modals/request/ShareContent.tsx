// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { useLayoutEffect, useState } from "react";
import {
  ErrorMessage,
  Label,
  Modal,
  PrimaryButton,
  TextInput,
  Title,
} from "@evmosapps/ui-helpers";
import { Trans } from "next-i18next";
import { BackArrowIcon } from "@evmosapps/icons/BackArrowIcon";
import { RequestIcon } from "@evmosapps/icons/RequestIcon";
import { ShareIcon } from "@evmosapps/icons/ShareIcon";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { AmountBox } from "../common/AmountBox";
import { TokenRef } from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { RequestModalProps } from "./RequestModal";
import {
  CLICK_ON_COPY_ICON_REQUEST_FLOW,
  CLICK_ON_SHARE_QR_CODE,
  CLICK_ON_SHARE_VIA_APP_REQUEST_FLOW,
  useTracker,
} from "tracker";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { useTranslation } from "@evmosapps/i18n/client";
import { ConnectToWalletWarning } from "../shared/ConnectToWalletWarning";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";

export const ShareContent = ({
  message,
  token,
  setState,
  amount,
}: {
  message: string;
  token: TokenRef;
  amount: bigint;
  setState: RequestModalProps["setState"];
}) => {
  const { t } = useTranslation("portfolio");
  const { sendEvent } = useTracker();

  const { data } = useWalletAccountByPrefix("evmos");

  const sender = data?.bech32Address;

  const shareEnabled = navigator.share !== undefined;

  const price = useTokenPrice(token);
  const selectedToken = getTokenByRef(token);
  const amountInUsd = price
    ? tokenToUSD(amount, Number(price), selectedToken.decimals)
    : null;

  const [origin, setOrigin] = React.useState("");
  useLayoutEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const shareURL = `${origin}/portfolio?action=pay&token=${token}&amount=${amount}&message=${encodeURIComponent(
    message,
  )}&requester=${sender}`;

  const [showCopied, setIsOpenCopied] = useState(false);

  const { isDisconnected } = useAccount();
  const activeProviderKey = getActiveProviderKey();
  return (
    <section className="space-y-8 text-pearl">
      <Modal.Header>
        <Title
          variant="modal-black"
          icon={<RequestIcon className="text-pink-300" />}
        >
          {t("request.title")}
        </Title>
      </Modal.Header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section>
          <div className="flex flex-col gap-8">
            <button
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  step: "setup",
                }));
              }}
              className="text-pink-300"
            >
              <BackArrowIcon width={28} />
            </button>
            <div className="flex gap-2 mb-6 flex-col">
              <div className="bg-white p-2 w-[250px] h-[250px] rounded-xl self-center">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={shareURL}
                />
              </div>
              {shareEnabled && (
                <button
                  onClick={async () => {
                    sendEvent(CLICK_ON_SHARE_QR_CODE, {
                      "Receive Modal Actions": "<Share Payment Request",
                      "Wallet Provider": activeProviderKey,
                    });
                    await navigator.share({
                      url: shareURL,
                      title: "Payment Link",
                    });
                  }}
                  className="flex items-center space-x-2 self-center"
                >
                  <span className="text-pink-300 text-xs md:text-sm ">
                    {t("request.share.payment.qr")}
                  </span>
                  <ShareIcon className="w-3 h-4 md:w-5 md:h-4" />
                </button>
              )}
            </div>

            <div>
              <TextInput
                readOnly={true}
                data-testid="request-modal-share-url-input"
                className="text-ellipsis whitespace-nowrap overflow-hidden"
                onFocus={(e) => {
                  e.target.select();
                }}
                value={shareURL}
                showCopyIcon={true}
                onClickCopy={async () => {
                  await navigator.clipboard.writeText(shareURL);
                  sendEvent(CLICK_ON_COPY_ICON_REQUEST_FLOW, {
                    "Wallet Provider": activeProviderKey,
                  });
                  setIsOpenCopied(true);
                }}
              />
              {showCopied && (
                <ErrorMessage
                  variant="info"
                  className="justify-center font-normal"
                  displayIcon={false}
                >
                  <Trans
                    t={t}
                    i18nKey="request.copied"
                    components={{
                      strong: <span className="text-pink-300" />,
                    }}
                  />
                </ErrorMessage>
              )}
            </div>
            <div className="flex flex-col">
              <Label>{t("request.label")}</Label>
              <AmountBox
                amount={amount}
                token={selectedToken}
                amountInUsd={amountInUsd}
              />
            </div>
            {isDisconnected && (
              <ConnectToWalletWarning modalType="Share Modal" />
            )}
            {!isDisconnected && (
              <PrimaryButton
                onClick={async () => {
                  sendEvent(CLICK_ON_SHARE_VIA_APP_REQUEST_FLOW, {
                    "Wallet Provider": activeProviderKey,
                  });
                  if (shareEnabled) {
                    await navigator.share({
                      url: shareURL,
                      title: "Payment Link",
                    });
                  } else {
                    await navigator.clipboard.writeText(
                      `Hi could you please transfer "${message}" using this payment link:\n\n${shareURL}}`,
                    );
                  }
                }}
                variant="primary-lg"
              >
                {shareEnabled
                  ? t("request.share.button")
                  : t("request.copy.button")}
              </PrimaryButton>
            )}
          </div>
        </section>
      </form>
    </section>
  );
};
