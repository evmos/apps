"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useMemo } from "react";
import {
  ErrorMessage,
  IconContainer,
  Label,
  PrimaryButton,
  Subtitle,
  Title,
  InfoPanel,
  Spinner,
  Modal,
} from "@evmosapps/ui-helpers";
import { Trans } from "next-i18next";
import {
  Prefix,
  TokenAmount,
} from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { AssetSelector } from "../shared/AssetSelector";
import { useAccount } from "wagmi";
import {
  connectWith,
  getActiveProviderKey,
  getChain,
  getGlobalKeplrProvider,
} from "@evmosapps/evmos-wallet";
import { AccountSelector } from "../shared/AccountSelector";

import { TransferSummary } from "../shared/TransferSummary";
import { SendIcon, WizardIcon } from "icons";
import { E, useWatch } from "helpers";
import { useRequestWalletAccount } from "../hooks/useAccountByPrefix";
import { getChainByAddress } from "@evmosapps/evmos-wallet/src/registry-actions/get-chain-by-account";

import { ICONS_TYPES } from "constants-helper";
import { connectKeplr, installKeplr, reloadPage } from "./utils";

import {
  CLICK_ON_AXL_REDIRECT,
  CLICK_ON_TOP_UP_EVMOS,
  INSUFFICIENT_FEE_AMOUNT,
  useTracker,
  CLICK_ON_CONNECT_WITH_KEPLR_SEND_FLOW,
  SUCCESSFUL_SEND_TX,
  UNSUCCESSFUL_SEND_TX,
} from "tracker";

import { TransferModalProps } from "./TransferModal";
import { useReceiptModal } from "../receipt/ReceiptModal";

import { useTopupModal } from "stateful-components/src/modals/TopupModal/TopupModal";
import { useConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";
import { createPortal } from "react-dom";
import { useSend } from "../hooks/useSend";
import { getTokenValidDestinations } from "../shared/getTokenValidDestinations";
import { TransactionInspector } from "../shared/TransactionInspector";
import { useTranslation } from "@evmosapps/i18n/client";
import { ConnectToWalletWarning } from "../shared/ConnectToWalletWarning";

export const TransferModalContent = ({
  receiver,
  networkPrefix,
  token: tokenRef,
  amount,
  setState,
}: TransferModalProps) => {
  const { t } = useTranslation("transfer-modal");
  const { sendEvent } = useTracker();
  const { isDisconnected } = useAccount();

  const receiptModal = useReceiptModal();
  const topupModal = useTopupModal();
  const connectModal = useConnectModal();

  const tokenAmount: TokenAmount = {
    ref: tokenRef,
    amount: amount,
  };

  const {
    account,
    error: walletRequestError,
    requestAccount,
  } = useRequestWalletAccount();

  const { address } = useAccount();
  useEffect(() => {
    if (networkPrefix !== "evmos" && getActiveProviderKey() !== "keplr") return;
    requestAccount(networkPrefix);
  }, [networkPrefix, requestAccount, address]);

  const sender = account?.bech32Address;
  const {
    isTransferring,
    isReady: isReadyToTransfer,
    transfer,
    transferResponse,
    transferRejected,
    transferError,
    validation,
    fee,
    feeBalance,
    isPreparing,
    feeToken,
    hasTransferred,
    __DEBUG__,
  } = useSend({
    sender,
    receiver,
    token: tokenAmount,
  });

  const token = getTokenByRef(tokenRef);
  const senderChain = sender ? getChainByAddress(sender) : getChain("evmos");

  const destinationNetworkOptions = useMemo(
    (): Prefix[] => //
      getTokenValidDestinations(tokenAmount.ref, senderChain.prefix),
    [tokenAmount.ref, senderChain.prefix]
  );

  const activeProviderKey = getActiveProviderKey();

  const senderValidation = {
    userRejectedEnablingNetwork: E.match.byPattern(
      walletRequestError,
      /USER_REJECTED_REQUEST/
    ),
    networkNotSupportedByConnectedWallet:
      activeProviderKey &&
      activeProviderKey !== "keplr" &&
      networkPrefix !== "evmos",
  };

  useEffect(() => {
    installKeplr();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && reloadPage()) {
        installKeplr();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  /**
   * on tx failure
   */
  useWatch(() => {
    if (!transferError) return;
    sendEvent(UNSUCCESSFUL_SEND_TX, {
      token: getTokenByRef(tokenAmount.ref).symbol,
      "destination network": getChain(networkPrefix).name,
    });
  }, [transferError]);
  /**
   * on tx success
   */
  useWatch(() => {
    if (!transferResponse) return;
    sendEvent(SUCCESSFUL_SEND_TX, {
      token: getTokenByRef(tokenAmount.ref).symbol,
      "destination network": getChain(networkPrefix).name,
      "transaction ID": transferResponse.hash,
    });
    // If the user is using the safe wallet, we don't show the receipt modal
    // because the transaction progress is handled by the safe UI
    if (getActiveProviderKey() === "safe") return;
    receiptModal.setIsOpen(true, {
      hash: transferResponse.hash,
      chainPrefix: networkPrefix,
    });
  }, [transferResponse]);

  const action = useMemo(() => {
    if (isDisconnected) return "CONNECT";

    if (
      token.ref === "evmos:EVMOS" &&
      !validation.hasSufficientBalance &&
      !isPreparing
    )
      return "TOPUP";
    if (
      fee &&
      fee.token.ref === "evmos:EVMOS" &&
      !validation.hasSufficientBalanceForFee &&
      !isPreparing
    )
      return "TOPUP";

    if (token.handledByExternalUI !== null) return "BRIDGE";

    return "TRANSFER";
  }, [
    isDisconnected,
    token.ref,
    token.handledByExternalUI,
    validation.hasSufficientBalance,
    validation.hasSufficientBalanceForFee,
    isPreparing,
    fee,
  ]);

  useEffect(() => {
    if (!validation.hasSufficientBalanceForFee && !isPreparing)
      sendEvent(INSUFFICIENT_FEE_AMOUNT);
  }, [validation.hasSufficientBalanceForFee, isPreparing, sendEvent]);

  const showFeeErrorMessage =
    !validation.hasSufficientBalanceForFee &&
    (action === "TOPUP" || action === "TRANSFER");
  return (
    <section className="space-y-8 w-full">
      <Modal.Header className="text-pearl1">
        <Title
          variant="modal-black"
          icon={<SendIcon className="text-pink-300" />}
        >
          {t("title")}
        </Title>
      </Modal.Header>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (action === "TOPUP") {
            topupModal.setIsOpen(true);
            sendEvent(CLICK_ON_TOP_UP_EVMOS);
            return;
          }

          if (action === "BRIDGE") {
            const target = token.handledByExternalUI?.[0].url;
            if (!target) return;
            window.open(target, "_blank");
            sendEvent(CLICK_ON_AXL_REDIRECT);
            return;
          }

          if (action === "CONNECT") {
            connectModal.setIsOpen(true, {}, true);
            return;
          }

          transfer();
        }}
      >
        <section className="space-y-8">
          <div>
            <Subtitle variant="modal-black">
              {t("section.asset.title")}
            </Subtitle>
            <AssetSelector
              value={{
                networkPrefix,
                ...tokenAmount,
              }}
              address={sender}
              fee={fee?.token}
              onChange={(token) => {
                setState((prev) => ({
                  ...prev,
                  networkPrefix: token.networkPrefix,
                  amount: token.amount,
                  token: token.ref,
                }));
              }}
            />

            {/* TODO: Some error messages. This is not in the specs, so we need to check with Mian how to display those */}
            {senderValidation.userRejectedEnablingNetwork && (
              <InfoPanel icon={<WizardIcon className="shrink-0" />}>
                <div className="space-y-2 md:space-y-4">
                  <p>
                    <Trans
                      t={t}
                      i18nKey="error.rejected.title"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                    <span className="text-pink-300">
                      {getChain(networkPrefix).name}
                    </span>
                    <Trans
                      t={t}
                      i18nKey="error.rejected.title2"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>

                  <p>
                    <Trans
                      t={t}
                      i18nKey="error.rejected.subtitle"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>
                  <PrimaryButton
                    className="font-normal w-full py-2"
                    onClick={() => requestAccount(networkPrefix)}
                  >
                    {t("error.rejected.authorizeButtonLabel")}
                  </PrimaryButton>
                </div>
              </InfoPanel>
            )}
            {senderValidation.networkNotSupportedByConnectedWallet && (
              <InfoPanel icon={<IconContainer type={ICONS_TYPES.METAMASK} />}>
                <div className="space-y-2 md:space-y-4">
                  <p>
                    <Trans
                      t={t}
                      i18nKey="error.unsupported.title"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>
                  <p>
                    <Trans
                      t={t}
                      i18nKey="error.unsupported.subtitle"
                      components={{
                        strong: <span className="text-pink-300" />,
                      }}
                    />
                  </p>
                  <PrimaryButton
                    variant={
                      getGlobalKeplrProvider() === null
                        ? "outline-primary"
                        : "primary"
                    }
                    className="font-normal w-full py-2"
                    // TODO: If the user rejects the connection, it's connecting with MetaMask. Check why.
                    onClick={async () => {
                      if (getGlobalKeplrProvider() === null) {
                        connectKeplr();
                        return;
                      }
                      const [err] = await E.try(() => connectWith("keplr"));
                      sendEvent(CLICK_ON_CONNECT_WITH_KEPLR_SEND_FLOW);
                      // TODO: handle error when user rejects the connection
                      if (err) return false;
                    }}
                  >
                    {getGlobalKeplrProvider() === null
                      ? t("error.unsupported.installButtonLabel")
                      : t("error.unsupported.connectButtonLabel")}
                  </PrimaryButton>
                </div>
              </InfoPanel>
            )}
          </div>
          <div>
            <Subtitle variant="modal-black">{t("section.to.title")}</Subtitle>
            <AccountSelector
              value={receiver}
              onChange={(receiver) =>
                setState((prev) => ({ ...prev, receiver }))
              }
              networkOptions={destinationNetworkOptions}
              senderPrefix={senderChain.prefix}
            />
            {sender && receiver && amount !== 0n && (
              <div className="space-y-3 mt-8">
                <Label>{t("section.summary.title")}</Label>
                <TransferSummary
                  sender={sender}
                  receiver={receiver}
                  token={{
                    ...tokenAmount,
                    networkPrefix: senderChain.prefix,
                  }}
                  disabled={!isReadyToTransfer}
                />
              </div>
            )}

            {/*
             * Call to action Buttons
             */}
            {action === "CONNECT" && <ConnectToWalletWarning />}
            {showFeeErrorMessage && (
              <ErrorMessage className="justify-center pl-0">
                {t("error.insufficientFee")}
                {feeBalance?.formatted ?? 0} {feeToken?.symbol}
              </ErrorMessage>
            )}

            {action === "TOPUP" && (
              <PrimaryButton
                type="submit"
                variant={"outline-primary"}
                className="mt-8 text-pearl"
              >
                {t("topup.button")}
              </PrimaryButton>
            )}
            {action === "BRIDGE" && (
              <>
                <ErrorMessage className="justify-center pl-0" variant="info">
                  <Trans
                    t={t}
                    i18nKey="warning.axelar"
                    components={{
                      strong: <span className="text-pink-300" />,
                    }}
                  />
                </ErrorMessage>
                <PrimaryButton
                  type="submit"
                  variant={"outline-primary"}
                  className="w-full text-base md:text-lg rounded-md capitalize mt-8"
                >
                  {t("bridge.button.text")}
                </PrimaryButton>
              </>
            )}
            {action === "TRANSFER" && (
              <>
                {transferRejected && (
                  <ErrorMessage className="justify-center pl-0">
                    {t("error.transactionFailed")}
                  </ErrorMessage>
                )}
                <PrimaryButton
                  type="submit"
                  data-testid="transfer-send-button"
                  className="w-full text-base md:text-lg rounded-md capitalize mt-8"
                  disabled={
                    !isReadyToTransfer || isTransferring || hasTransferred
                  }
                >
                  {isTransferring || hasTransferred ? (
                    <>
                      <Spinner /> {t("send.button.processing.text")}
                    </>
                  ) : transferRejected ? (
                    t("tryAgain")
                  ) : (
                    t("send.button.text")
                  )}
                </PrimaryButton>
              </>
            )}
          </div>
        </section>
      </form>

      {typeof document !== "undefined" &&
        process.env.NODE_ENV === "development" &&
        createPortal(<TransactionInspector {...__DEBUG__} />, document.body)}
    </section>
  );
};
