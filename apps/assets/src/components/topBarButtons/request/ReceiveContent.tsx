// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ErrorMessage,
  Label,
  PrimaryButton,
  Subtitle,
  Tabs,
  TextInput,
  Title,
} from "ui-helpers";
import { Trans, useTranslation } from "next-i18next";
import { CryptoSelector } from "ui-helpers";
import QRCode from "react-qr-code";

import {
  StoreType,
  WalletConnection,
  getActiveProviderKey,
  getChain,
} from "evmos-wallet";
import { ReceiveIcon, ShareIcon } from "icons";
import { useWalletAccountByPrefix } from "../hooks/useAccountByPrefix";
import { CryptoSelectorDropdownBox } from "ui-helpers";
import { CryptoSelectorTitle } from "ui-helpers";
import { Prefix } from "evmos-wallet/src/registry-actions/types";
import { useDispatch, useSelector } from "react-redux";
import { RequestModalProps } from "./RequestModal";
import {
  CLICK_ON_COPY_ICON_RECEIVE_FLOW,
  CLICK_ON_DISPLAY_FORMAT,
  CLICK_ON_REQUEST_FUNDS,
  CLICK_ON_SHARE_QR_CODE,
  SELECT_NETWORK_RECEIVE_FLOW,
  useTracker,
} from "tracker";
import { CopilotButton } from "copilot";
import { useAccount } from "wagmi";
import { sortedChains } from "../shared/sortedChains";

export const ReceiveContent = ({
  setState,
}: {
  setState: RequestModalProps["setState"];
}) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const [walletFormat, setWalletFormat] = useState("0x");
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  const [selectedNetworkPrefix, setSelectedNetworkPrefix] =
    useState<Prefix>("evmos");
  const selectedChain = getChain(selectedNetworkPrefix);
  const { data } = useWalletAccountByPrefix(selectedNetworkPrefix);

  const sender =
    walletFormat === "0x" ? wallet.evmosAddressEthFormat : data?.bech32Address;

  const shareEnabled = navigator.share !== undefined;

  const activeProviderKey = getActiveProviderKey();
  const networkOptions = useMemo(() => {
    if (activeProviderKey == "metaMask") {
      return ["evmos"] as Prefix[];
    }
    return sortedChains;
  }, [activeProviderKey]);

  useEffect(() => {
    if (selectedNetworkPrefix !== "evmos") {
      setWalletFormat("IBC");
    }
  }, [selectedNetworkPrefix]);

  const addressProps = [
    {
      onClick: () => {
        {
          setWalletFormat("0x");
          sendEvent(CLICK_ON_DISPLAY_FORMAT, {
            type: "0x",
          });
        }
      },
      type: "0x",
      option: walletFormat,
      text: "0x",
      disabled:
        selectedChain.prefix !== "evmos" && selectedChain.prefix !== "kava",
    },
    {
      onClick: () => {
        setWalletFormat("IBC");
        sendEvent(CLICK_ON_DISPLAY_FORMAT, {
          type: "IBC",
        });
      },
      type: "IBC",
      option: walletFormat,
      text: "IBC",
    },
  ];

  const [showCopied, setShowCopied] = useState(false);
  const dispatch = useDispatch();
  const { isDisconnected } = useAccount();

  return (
    <section className="space-y-16">
      <Title
        variant="modal-black"
        icon={<ReceiveIcon className="text-pink-300" />}
      >
        {t("receive.title")}
      </Title>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <section className="space-y-8">
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 mb-6 flex-col">
              <div className="bg-white p-2 w-[250px] h-[250px] rounded-xl self-center">
                <QRCode
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={sender ?? ""}
                />
              </div>
              {shareEnabled && (
                <button
                  onClick={() => {
                    void navigator.share({
                      text: sender ?? "",
                      title: "Wallet Address",
                    });
                    sendEvent(CLICK_ON_SHARE_QR_CODE);
                  }}
                  className="flex items-center space-x-2 self-center"
                >
                  <span className="text-pink-300 text-xs md:text-sm">
                    {t("receive.share.qr")}
                  </span>
                  <ShareIcon className="w-3 h-4 md:w-5 md:h-4 relative -top-[1px]" />
                </button>
              )}
            </div>

            <div className="flex justify-between flex-row items-end">
              <div className="space-y-1">
                <Label> {t("receive.format.label")}</Label>
                <Tabs tabsProps={addressProps} variant="pink-small" />
              </div>
              <div className="flex justify-between">
                <CryptoSelectorDropdownBox>
                  <CryptoSelectorTitle>
                    {t("transfer.section.asset.network")}
                  </CryptoSelectorTitle>
                  <CryptoSelector
                    value={selectedNetworkPrefix}
                    onChange={(prefix) => {
                      setSelectedNetworkPrefix(prefix);
                      sendEvent(SELECT_NETWORK_RECEIVE_FLOW, {
                        network: prefix,
                      });
                    }}
                  >
                    <CryptoSelector.Button
                      src={`/portfolio/chains/${selectedNetworkPrefix}.png`}
                    >
                      {selectedChain.name}
                    </CryptoSelector.Button>
                    <CryptoSelector.Options
                      label={t("transfer.section.network.label")}
                      className="right-0"
                    >
                      {networkOptions.map((value) => {
                        const chain = getChain(value);
                        return (
                          <CryptoSelector.Option
                            src={`/portfolio/chains/${value}.png`}
                            key={value}
                            value={value}
                          >
                            {chain.name}
                          </CryptoSelector.Option>
                        );
                      })}
                    </CryptoSelector.Options>
                  </CryptoSelector>
                </CryptoSelectorDropdownBox>
              </div>
            </div>

            <div>
              <Subtitle variant="modal-black">
                {t("receive.address.label")}
              </Subtitle>
              <TextInput
                value={sender}
                disabled={true}
                showCopyIcon={true}
                onClickCopy={async () => {
                  await navigator.clipboard.writeText(sender ?? "");
                  sendEvent(CLICK_ON_COPY_ICON_RECEIVE_FLOW);
                  setShowCopied(true);
                }}
              />
              {showCopied && (
                <ErrorMessage
                  variant="info"
                  className="justify-center font-normal"
                  displayIcon={false}
                >
                  <Trans
                    i18nKey="receive.copied"
                    components={{
                      strong: <span className="text-pink-300" />,
                    }}
                  />
                </ErrorMessage>
              )}
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
                onClick={() => {
                  setState((prev) => ({
                    ...prev,
                    step: "setup",
                  }));
                  sendEvent(CLICK_ON_REQUEST_FUNDS);
                }}
                variant="outline-primary"
                data-testid="receive-modal-receive-button"
              >
                {t("receive.button")}
              </PrimaryButton>
            )}
          </div>
        </section>
      </form>
    </section>
  );
};
