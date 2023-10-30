import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Address,
  getActiveProviderKey,
  getChain,
  useAddressInput,
} from "evmos-wallet";
import { CryptoSelector, ErrorMessage, Tabs, TextInput } from "ui-helpers";
import { Prefix } from "evmos-wallet/src/registry-actions/types";
import { useRequestWalletAccount } from "../hooks/useAccountByPrefix";
import { Trans, useTranslation } from "next-i18next";
import { SELECT_TO_NETWORK_SEND_FLOW, useTracker } from "tracker";
import { useEffectEvent } from "helpers";

type WalletTabKey = "WALLET" | "OTHER";
export const AccountSelector = ({
  value,
  onChange,
  networkOptions,

  senderPrefix,
}: PropsWithChildren<{
  value?: Address<Prefix>;
  onChange: (value?: Address<Prefix>) => void;

  networkOptions: Prefix[];
  senderPrefix: Prefix;
}>) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { address, inputProps, errors, setValue } = useAddressInput(value);
  const [selectedNetwork, setSelectedNetwork] = useState<Prefix>("evmos");
  const [selectedWalletTab, setSelectedWalletTab] =
    useState<WalletTabKey>("WALLET");
  const activeProviderKey = getActiveProviderKey();
  const disableWalletRequest =
    activeProviderKey !== "keplr" || senderPrefix === selectedNetwork;

  const activeWalletTab = disableWalletRequest ? "OTHER" : selectedWalletTab;

  /**
   * Syncs internal address state with outside state
   */
  const syncOutsideState = useEffectEvent((address?: Address<Prefix>) => {
    if (address !== value) {
      onChange?.(address);
    }
  });
  useEffect(() => {
    syncOutsideState(address);
  }, [address, syncOutsideState]);

  /**
   * Requests wallet address when
   * - wallet tab is selected
   * - keplr is active
   * - selected network is not the sender network
   */

  const { requestAccount, account } = useRequestWalletAccount();
  const shouldRequestWalletState =
    activeProviderKey === "keplr" && activeWalletTab === "WALLET";
  useEffect(() => {
    if (!shouldRequestWalletState) return;
    requestAccount(selectedNetwork);
  }, [selectedNetwork, shouldRequestWalletState, requestAccount]);

  useEffect(() => {
    if (!account) return;
    setValue(account.bech32Address);
  }, [account, setValue]);

  /**
   * Clears wallet input when activeWallet tab switches to manual input
   */
  useEffect(() => {
    if (activeWalletTab === "OTHER") return setValue("");
  }, [activeWalletTab, setValue]);

  /**
   * When network options change,
   * We want to make sure that the selected network is available in the updated options
   * If not, we select the first available network
   */
  const selectAvailableNetwork = useEffectEvent(() => {
    if (!networkOptions.includes(selectedNetwork)) {
      setSelectedNetwork(networkOptions[0]);
    }
  });
  useEffect(() => {
    selectAvailableNetwork();
  }, [networkOptions, selectAvailableNetwork]);

  const inputPlaceholder = disableWalletRequest
    ? t("transfer.section.to.placeholder.mywalletdisabled")
    : t("transfer.section.to.placeholder.mywalletenabled");

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex justify-between flex-row">
        <ModeSelector
          mode={activeWalletTab}
          onChange={setSelectedWalletTab}
          disableWalletRequest={disableWalletRequest}
        />
        <div className="flex justify-end">
          <NetworkSelector
            value={selectedNetwork}
            options={networkOptions}
            onChange={(value) => {
              setSelectedNetwork?.(value);
              sendEvent(SELECT_TO_NETWORK_SEND_FLOW, {
                network: value,
                "account provider": getActiveProviderKey(),
                "user's address or other": activeWalletTab,
              });
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <TextInput
          data-testid="account-selector-input"
          placeholder={activeWalletTab != "WALLET" ? inputPlaceholder : ""}
          extensionIcon={
            activeWalletTab == "WALLET"
              ? getActiveProviderKey()?.toUpperCase()
              : undefined
          }
          disabled={activeWalletTab == "WALLET"}
          {...inputProps}
        />

        {networkOptions.length === 1 && networkOptions.includes("evmos") && (
          <ErrorMessage variant="info" className="justify-center font-normal">
            <Trans
              i18nKey="message.only.evmos.supported"
              components={{
                strong: <span className="text-pink-300" />,
              }}
            />
          </ErrorMessage>
        )}
        {errors?.map((error, index) => {
          return (
            <ErrorMessage key={index}>
              {error === "INVALID_ADDRESS" && <>Invalid Address</>}
              {error === "INVALID_PREFIX" && <>Network not supported</>}
            </ErrorMessage>
          );
        })}
      </div>
    </div>
  );
};

const ModeSelector = ({
  mode,
  onChange,
  disableWalletRequest,
}: {
  mode: WalletTabKey;
  onChange: (mode: WalletTabKey) => void;
  disableWalletRequest?: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <Tabs
      tabsProps={[
        {
          onClick: () => {
            onChange("WALLET");
          },
          type: "WALLET",
          option: mode,
          text: t("transfer.section.to.wallet"),
          disabled: disableWalletRequest,
        },
        {
          onClick: () => onChange("OTHER"),
          type: "OTHER",
          option: mode,
          text: t("transfer.section.to.wallet.other"),
        },
      ]}
      variant="pink"
    />
  );
};

const NetworkSelector = ({
  value,
  onChange,
  options,
}: {
  value: Prefix;
  onChange: (prefix: Prefix) => void;
  options: Prefix[];
}) => {
  const { t } = useTranslation();
  const selectedChain = getChain(value);
  return (
    <CryptoSelector value={value} onChange={onChange}>
      <CryptoSelector.Button
        src={`/portfolio/chains/${selectedChain.prefix}.png`}
        data-testid="account-selector-network-selector-button"
      >
        {selectedChain.name}
      </CryptoSelector.Button>
      <CryptoSelector.Options
        label={t("transfer.section.network.label")}
        className="right-0"
      >
        {options.map((value) => {
          const chain = getChain(value);
          return (
            <CryptoSelector.Option
              src={`/portfolio/chains/${value}.png`}
              key={value}
              value={value}
              data-testid={`account-selector-network-selector-option-${chain.identifier}`}
            >
              {chain.name}
            </CryptoSelector.Option>
          );
        })}
      </CryptoSelector.Options>
    </CryptoSelector>
  );
};
