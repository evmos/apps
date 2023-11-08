// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, { Dispatch, SetStateAction } from "react";
import { PrimaryButton, Subtitle, TextInput, Title } from "ui-helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { BackArrowIcon, RequestIcon } from "icons";
import { TokenAmount, TokenRef } from "evmos-wallet/src/registry-actions/types";
import { RequestModalProps } from "./RequestModal";
import { CLICK_ON_GENERATE_PAYMENT_REQUEST, useTracker } from "tracker";
import { RequestAssetSelector } from "./RequestAssetSelector";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { StoreType, WalletConnection } from "evmos-wallet";
import { CopilotButton } from "copilot";

const MAX_MESSAGE_LENGTH = 140;

export const SetUpContent = ({
  setState,
  token,
  setMessage,
  message,
  amount,
}: {
  message: string;
  token: TokenRef;
  amount: bigint;
  setMessage: Dispatch<SetStateAction<string>>;
  setState: RequestModalProps["setState"];
}) => {
  const { t } = useTranslation("portfolio");
  const { sendEvent } = useTracker();
  const dispatch = useDispatch();
  const { isDisconnected } = useAccount();
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const tokenAmount: TokenAmount = {
    ref: token,
    amount: amount,
  };

  const { data } = useWalletAccountByPrefix("evmos");

  const sender = data?.bech32Address;

  const disabled = amount == 0n || message?.length === 0;

  return (
    <section className="space-y-8">
      <Title
        variant="modal-black"
        icon={<RequestIcon className="text-pink-300" />}
      >
        {t("request.title")}
      </Title>

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
                  step: "receive",
                }));
              }}
              className="text-pink-300"
            >
              <BackArrowIcon width={28} />
            </button>
            <div className="flex flex-col ">
              <Subtitle variant="modal-black">
                {t("transfer.section.asset")}
              </Subtitle>

              <RequestAssetSelector
                value={{
                  networkPrefix: "evmos",
                  ...tokenAmount,
                }}
                address={sender}
                onChange={(token) =>
                  setState((prev) => ({
                    ...prev,
                    token: token.ref,
                    amount: token.amount,
                  }))
                }
              />

              <div className="flex justify-between items-center">
                <Subtitle variant="modal-black">
                  {t("request.message.subtitle")}
                </Subtitle>
                <span className="text-xs md:text-sm text-pink-300 font-body tracking-wider">
                  {message.length} / {MAX_MESSAGE_LENGTH}
                </span>
              </div>

              <TextInput
                value={message}
                data-testid="receive-modal-message-input"
                onChange={(e) => {
                  if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                    setMessage(e.target.value);
                  }
                }}
                placeholder={t("request.message.input.placeholder")}
              />
            </div>
            {isDisconnected && (
              <WalletConnection
                copilotModal={({
                  beforeStartHook,
                }: {
                  beforeStartHook: Dispatch<SetStateAction<boolean>>;
                }) => <CopilotButton beforeStartHook={beforeStartHook} />}
                dispatch={dispatch}
                walletExtension={wallet}
                variant="primary-lg"
              />
            )}
            {!isDisconnected && (
              <PrimaryButton
                disabled={disabled}
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    step: "share",
                  }));
                  sendEvent(CLICK_ON_GENERATE_PAYMENT_REQUEST);
                }}
                variant="primary-lg"
                data-testid="receive-modal-generate-button"
              >
                {t("request.generate.button")}
              </PrimaryButton>
            )}
          </div>
        </section>
      </form>
    </section>
  );
};
