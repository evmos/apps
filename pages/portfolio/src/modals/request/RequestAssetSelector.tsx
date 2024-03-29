// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PropsWithChildren, useEffect, useMemo } from "react";
import {
  AmountInput,
  CryptoSelectorBalanceBox,
  CryptoSelectorBalanceText,
  CryptoSelectorBox,
  CryptoSelectorDropdownBox,
} from "@evmosapps/ui-helpers";
import { TokenAmount } from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { CryptoSelector } from "@evmosapps/ui-helpers";
import {
  getActiveProviderKey,
  getChain,
  useTokenBalance,
} from "@evmosapps/evmos-wallet";
import { CryptoSelectorTitle } from "@evmosapps/ui-helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { formatUnits } from "viem";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useTracker } from "tracker";
import { SELECT_FROM_NETWORK_SEND_FLOW, SELECT_TOKEN_SEND_FLOW } from "tracker";
import { useAccount } from "wagmi";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";
import { useEffectEvent } from "helpers";
import { sortedTokens } from "../shared/sortedChains";
import { Address } from "helpers/src/crypto/addresses/types";

type Asset = {
  networkPrefix: string;
} & TokenAmount;

const tokenToUSD = (amount: bigint, price: number, decimals: number) => {
  const unformmatedUsd = Number(
    formatUnits((amount * BigInt(~~(1000 * Number(price)))) / 1000n, decimals),
  );
  return unformmatedUsd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const RequestAssetSelector = ({
  value,
  onChange,
  address,
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
  address?: Address;
}>) => {
  const { t } = useTranslation("transfer-modal");
  const { sendEvent } = useTracker();
  const { isDisconnected, address: addressConnected } = useAccount();
  const activeProvider = getActiveProviderKey();
  const selectedChain = getChain(value.networkPrefix);
  const onChangeEvent = useEffectEvent(
    (next: Asset | ((value: Asset) => Asset)) => {
      onChange(typeof next === "function" ? next(value) : next);
    },
  );
  const selectedToken = getTokenByRef(value.ref);

  const tokenOptions = sortedTokens;

  const networkOptions = useMemo(() => {
    return ["evmos"];
  }, []);

  /**
   * When network changes, check if the selected token is available on the new network.
   * If not, set the first available token as the selected token.
   */
  useEffect(() => {
    if (tokenOptions.includes(selectedToken)) return;
    const [firstAvailableToken] = tokenOptions;
    if (!firstAvailableToken) return;
    onChangeEvent((next) => ({
      ...next,
      ref: firstAvailableToken.ref,
      networkPrefix: firstAvailableToken.sourcePrefix,
    }));
  }, [tokenOptions, selectedToken, onChangeEvent]);

  const price = useTokenPrice(value.ref);

  const { balance, isFetching: isFetchingBalance } = useTokenBalance(
    address,
    value.ref,
  );

  const amountInUsd = price
    ? tokenToUSD(value.amount, Number(price), selectedToken.decimals)
    : null;

  return (
    <CryptoSelectorBox>
      <div className="flex justify-between">
        <CryptoSelectorDropdownBox>
          <CryptoSelectorTitle>{t("section.asset.token")}</CryptoSelectorTitle>
          <CryptoSelector
            value={selectedToken}
            onChange={(token) => {
              onChange({
                networkPrefix: token.sourcePrefix,
                ref: token.ref,
                amount: 0n,
              });
              sendEvent(SELECT_TOKEN_SEND_FLOW, {
                Token: token.name,
                "User Wallet Address": addressConnected,
                "Wallet Provider": activeProvider,
              });
              sendEvent(SELECT_FROM_NETWORK_SEND_FLOW, {
                // TODO: when we add more networks, we should use token.sourcePrefix
                Network: networkOptions[0],
                "User Wallet Address": addressConnected,
                "Wallet Provider": activeProvider,
              });
            }}
          >
            <CryptoSelector.Button
              src={`/tokens/${selectedToken?.denom.toLowerCase()}.png`}
              variant="black"
              data-testid="request-asset-selector-token-button"
            >
              {selectedToken?.symbol}
            </CryptoSelector.Button>
            <CryptoSelector.Options
              variant="multiple"
              className="left-0"
              label={t("section.token.label")}
            >
              {tokenOptions.map((token) => {
                return (
                  <CryptoSelector.Option
                    src={`/tokens/${token.denom.toLowerCase()}.png`}
                    key={`${token.sourcePrefix}-${token.minCoinDenom}`}
                    value={token}
                    data-testid={`request-asset-selector-token-option-${token.denom}`}
                  >
                    {token.denom}
                  </CryptoSelector.Option>
                );
              })}
            </CryptoSelector.Options>
          </CryptoSelector>
        </CryptoSelectorDropdownBox>
        <CryptoSelectorDropdownBox>
          <CryptoSelectorTitle>
            {t("section.asset.network")}
          </CryptoSelectorTitle>
          <CryptoSelector
            value={value.networkPrefix}
            onChange={(prefix) => {
              onChange({
                ...value,
                amount: 0n,
                networkPrefix: prefix,
              });
              sendEvent(SELECT_FROM_NETWORK_SEND_FLOW, {
                Network: value.networkPrefix,
                "User Wallet Address": addressConnected,
                "Wallet Provider": activeProvider,
              });
            }}
          >
            <CryptoSelector.Button
              src={`/chain/${value.networkPrefix}.png`}
              data-testid="request-asset-selector-network-button"
            >
              {selectedChain.name}
            </CryptoSelector.Button>
            <CryptoSelector.Options
              label={t("section.network.label")}
              className="right-0"
            >
              {networkOptions.map((value) => {
                const chain = getChain(value);
                return (
                  <CryptoSelector.Option
                    src={`/chain/${value.toLowerCase()}.png`}
                    key={value}
                    value={value}
                    data-testid={`request-asset-selector-network-option-${value}`}
                  >
                    {chain.name}
                  </CryptoSelector.Option>
                );
              })}
            </CryptoSelector.Options>
          </CryptoSelector>
        </CryptoSelectorDropdownBox>
      </div>
      <AmountInput
        variant={"default"}
        value={value.amount}
        max={undefined}
        data-testid="request-asset-selector-amount-input"
        onChange={(amount) => {
          onChange({
            ...value,
            amount,
          });
        }}
        decimals={selectedToken?.decimals}
        setIsMaxClicked={() => {}}
      />
      <CryptoSelectorBalanceBox>
        <div>{amountInUsd !== null && `≈${amountInUsd}`}</div>
        <div>
          {!isDisconnected && !balance && isFetchingBalance && (
            <CryptoSelectorBalanceText>
              {t("section.asset.balance.loading")}
            </CryptoSelectorBalanceText>
          )}
          {balance && (
            <>
              <div>
                <CryptoSelectorBalanceText>
                  {t("section.asset.balance.label")}{" "}
                </CryptoSelectorBalanceText>
                {balance?.formatted ?? "0"}
              </div>
            </>
          )}

          {isDisconnected && (
            <CryptoSelectorBalanceText>
              {t("section.asset.balance.label")}{" "}
              {t("section.asset.balance.error")}
            </CryptoSelectorBalanceText>
          )}
        </div>
      </CryptoSelectorBalanceBox>
    </CryptoSelectorBox>
  );
};
