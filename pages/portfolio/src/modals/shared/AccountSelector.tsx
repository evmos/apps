import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Address,
  getActiveProviderKey,
  getChain,
  useAddressInput,
} from "@evmosapps/evmos-wallet";
import {
  CryptoSelector,
  ErrorMessage,
  Tabs,
  TextInput,
} from "@evmosapps/ui-helpers";
import { Prefix } from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { useRequestWalletAccount } from "../hooks/useAccountByPrefix";
import { Trans } from "next-i18next";
import { SELECT_TO_NETWORK_SEND_FLOW, useTracker } from "tracker";
import { useEffectEvent } from "helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { useAccount } from "wagmi";

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
  const { t } = useTranslation("transfer-modal");
  const { sendEvent } = useTracker();
  const { address: addressConnected } = useAccount();
  const { address, inputProps, errors, setValue } = useAddressInput(value);
  const [selectedNetwork, setSelectedNetwork] = useState<Prefix>("evmos");
  const [selectedWalletTab, setSelectedWalletTab] =
    useState<WalletTabKey>("WALLET");
  const activeProviderKey = getActiveProviderKey();
  const disableWalletRequest =
    activeProviderKey !== "Keplr" || senderPrefix === selectedNetwork;

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
    activeProviderKey === "Keplr" && activeWalletTab === "WALLET";
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
    if (!networkOptions.includes(selectedNetwork) && networkOptions[0]) {
      setSelectedNetwork(networkOptions[0]);
    }
  });
  useEffect(() => {
    selectAvailableNetwork();
  }, [networkOptions, selectAvailableNetwork]);

  const inputPlaceholder = disableWalletRequest
    ? t("section.to.placeholder.mywalletdisabled")
    : t("section.to.placeholder.mywalletenabled");

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
                Network: value,
                "User Wallet Address": addressConnected,
                "Wallet Provider": activeProviderKey,
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
              t={t}
              i18nKey="warning.onlyEvmosSupported"
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
  const { t } = useTranslation("transfer-modal");
  return (
    <Tabs
      tabsProps={[
        {
          onClick: () => {
            onChange("WALLET");
          },
          type: "WALLET",
          option: mode,
          text: t("section.to.wallet.myAccount"),
          disabled: disableWalletRequest,
        },
        {
          onClick: () => onChange("OTHER"),
          type: "OTHER",
          option: mode,
          text: t("section.to.wallet.other"),
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
  const { t } = useTranslation("transfer-modal");
  const selectedChain = getChain(value);
  return (
    <CryptoSelector value={value} onChange={onChange}>
      <CryptoSelector.Button
        src={`/chains/${selectedChain.prefix}.png`}
        data-testid="account-selector-network-selector-button"
      >
        {selectedChain.name}
      </CryptoSelector.Button>
      <CryptoSelector.Options
        label={t("section.networkPickerTitle")}
        className="right-0"
      >
        {options.map((value) => {
          const chain = getChain(value);
          return (
            <CryptoSelector.Option
              src={`/chains/${value.toLowerCase()}.png`}
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
