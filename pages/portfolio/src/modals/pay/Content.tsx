// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useEffect, useState } from "react";
import {
  CryptoSelector,
  CryptoSelectorDropdownBox,
  ErrorMessage,
  Modal,
  PrimaryButton,
  Spinner,
  Subtitle,
  Title,
} from "@evmosapps/ui-helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { FormattedBalance } from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { useAccount } from "wagmi";
import {
  getActiveProviderKey,
  getChain,
  normalizeToCosmosAddress,
  useTokenBalance,
} from "@evmosapps/evmos-wallet";

import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { formatUnits } from "viem";
import { tokenToUSD } from "../common/utils";
import { useTokenPrice } from "../hooks/useTokenPrice";

import { truncateAddress } from "@evmosapps/evmos-wallet/src/internal/wallet/style/format";
import { AmountBox } from "../common/AmountBox";
import { PayModalProps } from "./Modal";
import { getChainByAddress } from "@evmosapps/evmos-wallet/src/registry-actions/get-chain-by-account";
import { PayIcon } from "@evmosapps/icons/PayIcon";
import Image from "next/image";
import { PROMPTED_TO, SUCCESSFUL_PAY_TX, UNSUCESSFUL_PAY_TX } from "tracker";
import { useTracker } from "tracker";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";
import { useSend } from "../hooks/useSend";
import { useReceiptModal } from "../receipt/ReceiptModal";
import { normalizeToPrefix } from "@evmosapps/evmos-wallet/src/registry-actions/utils/normalize-to-prefix";
import { createPortal } from "react-dom";
import { TransactionInspector } from "../shared/TransactionInspector";
import { useWatch } from "helpers";
import { ConnectToWalletWarning } from "../shared/ConnectToWalletWarning";

export const Content = ({
  requester,
  token,
  amount,
  message,
}: PayModalProps) => {
  const { t } = useTranslation("portfolio");
  const { sendEvent } = useTracker();

  const selectedToken = getTokenByRef(token);
  const { address, connector, isDisconnected } = useAccount();
  const { data } = useWalletAccountByPrefix(selectedToken.sourcePrefix);
  const { data: evmosData } = useWalletAccountByPrefix("evmos");
  const sender =
    connector?.id === "metaMask"
      ? address && normalizeToCosmosAddress(address)
      : data?.bech32Address;

  const receiptModal = useReceiptModal();
  const {
    transfer,

    isPreparing,
    isReady,
    isTransferring,
    hasTransferred,
    transferRejected,
    transferResponse,
    transferError,
    validation,
    __DEBUG__,
  } = useSend({
    sender: sender,
    receiver: requester,
    token: {
      ref: token,
      amount,
    },
  });

  useWatch(() => {
    if (!transferError) return;
    sendEvent(UNSUCESSFUL_PAY_TX, {
      "User Wallet Address": sender,
      "Wallet Provider": getActiveProviderKey(),
      Network: requester && getChainByAddress(requester).name,
      Token: getTokenByRef(token).symbol,
      "Error Message": transferError.message,
    });
    return;
  }, [transferError]);

  useWatch(() => {
    if (!transferResponse) return;
    if (!sender || !requester) return;

    sendEvent(SUCCESSFUL_PAY_TX, {
      "User Wallet Address": sender,
      "Wallet Provider": getActiveProviderKey(),
      Network: requester && getChainByAddress(requester).name,
      Token: getTokenByRef(token).symbol,
    });

    const chainPrefix = normalizeToPrefix(sender);
    // If the user is using the safe wallet, we don't show the receipt modal
    // because the transaction progress is handled by the safe UI
    if (getActiveProviderKey() === "Safe") return;
    receiptModal.setIsOpen(true, {
      hash: transferResponse,
      chainPrefix,
    });
  }, [transferResponse]);

  const [selectedBalance, setSelectedBalance] = useState<
    undefined | FormattedBalance
  >(undefined);

  const price = useTokenPrice(token);

  const amountInUsd = price
    ? tokenToUSD(amount, Number(price), selectedToken.decimals)
    : null;

  const selectedTokenUSD = selectedToken
    ? tokenToUSD(
        selectedBalance?.value ?? 0n,
        Number(price),
        selectedToken.decimals
      )
    : null;

  const { balance } = useTokenBalance(sender, token);
  const { balance: evmosBalance } = useTokenBalance(
    evmosData?.bech32Address,
    token
  );
  const balances =
    sender === evmosData?.bech32Address
      ? [evmosBalance].filter((b) => b !== undefined)
      : [balance, evmosBalance].filter((b) => b !== undefined);
  const chain = sender ? getChainByAddress(sender) : getChain("evmos");

  const insufficientBalance = selectedBalance?.value
    ? selectedBalance?.value < amount
      ? true
      : false
    : true;

  useEffect(() => {
    if (balances.length > 0 && selectedBalance === undefined) {
      setSelectedBalance(balances[0]);
    }
  }, [balances, selectedBalance]);

  const action =
    validation.hasSufficientBalance || isPreparing ? "PAY" : "SWAP";

  return (
    <section className="space-y-8 text-pearl">
      <Modal.Header>
        <Title
          variant="modal-black"
          icon={<PayIcon className="text-pink-300" />}
        >
          {t("pay.title")}
        </Title>
      </Modal.Header>

      <Subtitle variant="modal-black">{t("pay.subtitle")}</Subtitle>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (action === "PAY") {
            transfer();
          }
        }}
      >
        <section>
          <div className="flex gap-8 flex-col">
            <div className="flex gap-2 flex-col">
              <div className="flex h-28 rounded-md bg-gray-500 py-2 px-4 items-center justify-between text-xxs md:text-xs">
                {message}
              </div>
              <div className="tracking-wide flex text-xxs md:text-xs justify-end gap-1">
                <span className="text-gray-400">{t("pay.from")}</span>
                <span className="text-pink-300 font-semibold">
                  {truncateAddress(requester)}
                </span>
              </div>
            </div>
            <AmountBox
              amount={amount}
              token={selectedToken}
              amountInUsd={amountInUsd}
            />

            {isDisconnected && <ConnectToWalletWarning modalType="Pay Modal" />}

            {!isDisconnected && (
              <>
                <CryptoSelectorDropdownBox>
                  <CryptoSelector
                    value={selectedBalance?.type ?? ""}
                    onChange={(type) => {
                      setSelectedBalance(
                        balances?.find((b) => b?.type === type)
                      );
                    }}
                  >
                    <CryptoSelector.Button>
                      <div className="pl-2 items-center flex gap-1.5">
                        <Image
                          src={`/chains/${(selectedBalance
                            ? selectedBalance?.type === "ERC20"
                              ? "evmos"
                              : selectedBalance?.denom
                            : "evmos"
                          ).toLowerCase()}.png`}
                          className="rounded-full"
                          alt=""
                          width={24}
                          height={24}
                        />
                        {selectedBalance
                          ? selectedBalance?.type === "ERC20"
                            ? "Evmos"
                            : chain.name
                          : "evmos"}
                      </div>
                    </CryptoSelector.Button>

                    <CryptoSelector.Options
                      variant="wide"
                      className="left-0"
                      label={t("transfer.section.token.label")}
                    >
                      {balances.map((b) => {
                        return (
                          <CryptoSelector.Option
                            src={`/tokens/${
                              b?.type === "ERC20"
                                ? "evmos"
                                : selectedBalance?.denom
                            }.png`}
                            key={b?.address}
                            value={b?.type ?? ""}
                          >
                            {b?.type === "ERC20" ? "Evmos" : chain.name} -{" "}
                            {formatUnits(b?.value ?? 0n, b?.decimals ?? 0)}{" "}
                            {selectedToken?.denom}
                          </CryptoSelector.Option>
                        );
                      })}
                    </CryptoSelector.Options>
                  </CryptoSelector>
                </CryptoSelectorDropdownBox>
                {selectedBalance && (
                  <div className={`tracking-wider flex flex-col gap-2`}>
                    <span className="font-medium text-sm md:text-lg">
                      {t("pay.balance")}
                    </span>
                    <div className="rounded px-5 py-4 border border-pink-300">
                      <div
                        className={`flex justify-between items-center  ${
                          insufficientBalance ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm break-all">
                            {formatUnits(
                              selectedBalance?.value ?? 0n,
                              selectedBalance?.decimals ?? 0
                            )}{" "}
                            {selectedToken?.denom}
                          </span>
                          <span className="text-gray-300 text-xxs md:text-xs">
                            ≈ {selectedTokenUSD}
                          </span>
                        </div>
                        <span className="text-xxs md:text-xs text-gray-400">
                          {selectedBalance?.type === "ERC20"
                            ? "Evmos"
                            : chain.name}
                        </span>
                      </div>
                    </div>
                    {insufficientBalance && (
                      <ErrorMessage
                        displayIcon={false}
                        className="mt-0 font-normal"
                      >
                        {t("message.insufficient.balance")}
                      </ErrorMessage>
                    )}
                    {transferRejected && (
                      <ErrorMessage className="justify-center mt-0 pl-0">
                        {t("error.generating.transaction")}
                      </ErrorMessage>
                    )}
                  </div>
                )}

                {action === "PAY" && (
                  <PrimaryButton
                    type="submit"
                    disabled={!isReady || isTransferring || hasTransferred}
                    variant={false ? "outline-primary" : undefined}
                    className="w-full text-lg rounded-md capitalize"
                  >
                    {isTransferring || hasTransferred ? (
                      <>
                        <Spinner /> {t("transfer.send.button.processing.text")}
                      </>
                    ) : transferRejected ? (
                      t("message.try.again")
                    ) : (
                      t("pay.button")
                    )}
                  </PrimaryButton>
                )}

                {action === "SWAP" && (
                  <PrimaryButton
                    variant={"outline-primary"}
                    onClick={() => {
                      sendEvent(PROMPTED_TO, {
                        "Prompt To": "Forge",
                        Modal: "Pay Modal",
                      });
                      window.open("https://forge.trade/#/swap", "_blank");
                    }}
                  >
                    {t("pay.swap.button")}
                  </PrimaryButton>
                )}
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
