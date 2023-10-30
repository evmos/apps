import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  AmountInput,
  CryptoSelectorBalanceBox,
  CryptoSelectorBalanceText,
  CryptoSelectorBox,
  CryptoSelectorDropdownBox,
  ErrorMessage,
} from "ui-helpers";
import { Prefix, TokenAmount } from "evmos-wallet/src/registry-actions/types";
import { CryptoSelector } from "ui-helpers";
import { Address, getChain, useTokenBalance } from "evmos-wallet";
import { CryptoSelectorTitle } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { formatUnits } from "viem";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { max, useEffectEvent } from "helpers";
import { useTracker } from "tracker";
import {
  SELECT_FROM_NETWORK_SEND_FLOW,
  SELECT_TOKEN_SEND_FLOW,
} from "tracker/src/constants";
import { useAccount } from "wagmi";
import { getTokenByRef } from "evmos-wallet/src/registry-actions/get-token-by-ref";
import { sortedChains, sortedTokens } from "./sortedChains";

type Asset = {
  networkPrefix: Prefix;
} & TokenAmount;

const tokenToUSD = (amount: bigint, price: number, decimals: number) => {
  const unformmatedUsd = Number(
    formatUnits((amount * BigInt(~~(1000 * Number(price)))) / 1000n, decimals)
  );
  return unformmatedUsd.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const AssetSelector = ({
  fee,
  value,
  onChange,
  address,
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
  address?: Address<Prefix>;
  fee?: TokenAmount;
}>) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { isDisconnected } = useAccount();
  const selectedChain = getChain(value.networkPrefix);

  const selectedToken = getTokenByRef(value.ref);

  const tokenOptions = sortedTokens;

  const networkOptions = useMemo(() => {
    if (selectedToken === null) {
      return [];
    }
    if (selectedToken.sourcePrefix === "evmos") return sortedChains;
    return [selectedToken.sourcePrefix, "evmos"] as Prefix[];
  }, [selectedToken]);

  /**
   * When network changes, check if the selected token is available on the new network.
   * If not, set the first available token as the selected token.
   */
  const selectFirstNetworkOption = useEffectEvent(() => {
    const [firstAvailableToken] = tokenOptions;
    onChange({
      ...value,
      ref: firstAvailableToken.ref,
      networkPrefix: firstAvailableToken.sourcePrefix,
    });
  });
  useEffect(() => {
    if (tokenOptions.includes(selectedToken)) return;
    selectFirstNetworkOption();
  }, [tokenOptions, selectedToken, selectFirstNetworkOption]);

  const price = useTokenPrice(value.ref);

  const { balance, isLoading: isFetchingBalance } = useTokenBalance(
    address,
    value.ref
  );

  const amountInUsd = price
    ? tokenToUSD(value.amount, Number(price), selectedToken.decimals)
    : null;

  const isFeeTokenAndSelectedTokenEqual = fee && fee.ref === value.ref;
  const maxAllowedTransferAmount = useMemo(() => {
    if (!balance) return 0n;
    if (isFeeTokenAndSelectedTokenEqual) {
      return max(balance.value - fee.amount, 0n);
    }
    return balance.value;
  }, [balance, fee, isFeeTokenAndSelectedTokenEqual]);

  const insufficientBalance = useMemo(() => {
    if (isFetchingBalance) return false;
    return balance?.value === 0n || (balance?.value ?? 0n) < value.amount;
  }, [isFetchingBalance, balance, value.amount]);

  const [isMaxClicked, setIsMaxClicked] = useState(false);

  const updateAmount = useEffectEvent((amount: bigint) => {
    onChange({
      ...value,
      amount,
    });
  });
  useEffect(() => {
    if (balance && fee && value.amount > maxAllowedTransferAmount) {
      updateAmount(maxAllowedTransferAmount);
    }
  }, [maxAllowedTransferAmount, updateAmount, value.amount, balance, fee]);
  return (
    <CryptoSelectorBox>
      <div className="flex h-full justify-between items-stretch">
        <CryptoSelectorDropdownBox>
          <CryptoSelectorTitle>
            {t("transfer.section.asset.token")}
          </CryptoSelectorTitle>
          <CryptoSelector
            value={selectedToken}
            onChange={(token) => {
              onChange({
                networkPrefix:
                  value.networkPrefix === "evmos"
                    ? "evmos"
                    : token.sourcePrefix,

                ref: token.ref,
                amount: 0n,
              });
              sendEvent(SELECT_TOKEN_SEND_FLOW, {
                "token selected": token.name,
              });
              sendEvent(SELECT_FROM_NETWORK_SEND_FLOW, {
                network: token.sourcePrefix,
              });
              setIsMaxClicked(false);
            }}
          >
            <CryptoSelector.Button
              src={`/portfolio/tokens/${selectedToken?.denom}.png`}
              variant="black"
              data-testid="asset-selector-token-selector-button"
            >
              {selectedToken?.symbol}
            </CryptoSelector.Button>
            <CryptoSelector.Options
              variant="multiple"
              className="left-0"
              label={t("transfer.section.token.label")}
            >
              {tokenOptions.map((token) => {
                return (
                  <CryptoSelector.Option
                    src={`/portfolio/tokens/${token.denom}.png`}
                    key={`${token.sourcePrefix}-${token.minCoinDenom}`}
                    value={token}
                    data-testid={`asset-selector-token-selector-option-${token.denom}`}
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
            {t("transfer.section.asset.network")}
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
                network: value.networkPrefix,
              });
              setIsMaxClicked(false);
            }}
          >
            <CryptoSelector.Button
              src={`/portfolio/chains/${value.networkPrefix}.png`}
              data-testid="asset-selector-network-selector-button"
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
                    data-testid={`asset-selector-network-selector-option-${chain.identifier}`}
                  >
                    {chain.name}
                  </CryptoSelector.Option>
                );
              })}
            </CryptoSelector.Options>
          </CryptoSelector>
        </CryptoSelectorDropdownBox>
      </div>
      <div className="space-y-2">
        <AmountInput
          variant={
            insufficientBalance ? "error" : isMaxClicked ? "info" : "default"
          }
          data-testid="asset-selector-amount-input"
          value={value.amount}
          max={maxAllowedTransferAmount}
          onChange={(amount) => {
            onChange({
              ...value,
              amount,
            });
          }}
          decimals={selectedToken?.decimals}
          setIsMaxClicked={setIsMaxClicked}
        />
        <CryptoSelectorBalanceBox>
          <div>{amountInUsd !== null && `≈${amountInUsd}`}</div>
          <div>
            {!isDisconnected && !balance && isFetchingBalance && (
              <CryptoSelectorBalanceText>
                {t("transfer.section.asset.balance.loading")}
              </CryptoSelectorBalanceText>
            )}
            {balance && (
              <>
                <div>
                  <CryptoSelectorBalanceText data-testid="asset-selector-balance-display">
                    {t("transfer.section.asset.balance")}{" "}
                  </CryptoSelectorBalanceText>
                  {balance?.formatted ?? "0"}
                </div>
              </>
            )}

            {isDisconnected && (
              <CryptoSelectorBalanceText>
                {t("transfer.section.asset.balance")}{" "}
                {t("transfer.section.asset.balance.error")}
              </CryptoSelectorBalanceText>
            )}
          </div>
        </CryptoSelectorBalanceBox>
      </div>
      {isMaxClicked && (
        <ErrorMessage
          variant="info"
          className="font-normal"
          displayIcon={false}
        >
          {t("message.gas.fee.reserved.amount")}
        </ErrorMessage>
      )}
      {insufficientBalance && (
        <ErrorMessage displayIcon={false} className="font-normal">
          {t("message.insufficient.balance")}
        </ErrorMessage>
      )}
    </CryptoSelectorBox>
  );
};
