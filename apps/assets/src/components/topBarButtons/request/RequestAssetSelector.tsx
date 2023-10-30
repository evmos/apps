import React, { PropsWithChildren, useEffect, useMemo } from "react";
import {
  AmountInput,
  CryptoSelectorBalanceBox,
  CryptoSelectorBalanceText,
  CryptoSelectorBox,
  CryptoSelectorDropdownBox,
} from "ui-helpers";
import { Prefix, TokenAmount } from "evmos-wallet/src/registry-actions/types";
import { CryptoSelector } from "ui-helpers";
import { Address, getChain, useTokenBalance } from "evmos-wallet";
import { CryptoSelectorTitle } from "ui-helpers";
import { useTranslation } from "next-i18next";
import { formatUnits } from "viem";
import { useTokenPrice } from "../hooks/useTokenPrice";
import { useTracker } from "tracker";
import {
  SELECT_FROM_NETWORK_SEND_FLOW,
  SELECT_TOKEN_SEND_FLOW,
} from "tracker/src/constants";
import { useAccount } from "wagmi";
import { getTokenByRef } from "evmos-wallet/src/registry-actions/get-token-by-ref";
import { useEffectEvent } from "helpers";
import { sortedTokens } from "../shared/sortedChains";

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

export const RequestAssetSelector = ({
  value,
  onChange,
  address,
}: PropsWithChildren<{
  value: Asset;
  onChange: (value: Asset) => void;
  address?: Address<Prefix>;
}>) => {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { isDisconnected } = useAccount();
  const selectedChain = getChain(value.networkPrefix);
  const onChangeEvent = useEffectEvent(
    (next: Asset | ((value: Asset) => Asset)) => {
      onChange(typeof next === "function" ? next(value) : next);
    }
  );
  const selectedToken = getTokenByRef(value.ref);

  const tokenOptions = sortedTokens;

  const networkOptions = useMemo(() => {
    return ["evmos"] as Prefix[];
  }, []);

  /**
   * When network changes, check if the selected token is available on the new network.
   * If not, set the first available token as the selected token.
   */
  useEffect(() => {
    if (tokenOptions.includes(selectedToken)) return;
    const [firstAvailableToken] = tokenOptions;
    onChangeEvent((next) => ({
      ...next,
      ref: firstAvailableToken.ref,
      networkPrefix: firstAvailableToken.sourcePrefix,
    }));
  }, [tokenOptions, selectedToken, onChangeEvent]);

  const price = useTokenPrice(value.ref);

  const { balance, isFetching: isFetchingBalance } = useTokenBalance(
    address,
    value.ref
  );

  const amountInUsd = price
    ? tokenToUSD(value.amount, Number(price), selectedToken.decimals)
    : null;

  return (
    <CryptoSelectorBox>
      <div className="flex justify-between">
        <CryptoSelectorDropdownBox>
          <CryptoSelectorTitle>
            {t("transfer.section.asset.token")}
          </CryptoSelectorTitle>
          <CryptoSelector
            value={selectedToken}
            onChange={(token) => {
              onChange({
                networkPrefix: token.sourcePrefix,
                ref: token.ref,
                amount: 0n,
              });
              sendEvent(SELECT_TOKEN_SEND_FLOW, {
                "token selected": token.name,
              });
              sendEvent(SELECT_FROM_NETWORK_SEND_FLOW, {
                network: token.sourcePrefix,
              });
            }}
          >
            <CryptoSelector.Button
              src={`/portfolio/tokens/${selectedToken?.denom}.png`}
              variant="black"
              data-testid="request-asset-selector-token-button"
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
            }}
          >
            <CryptoSelector.Button
              src={`/portfolio/chains/${value.networkPrefix}.png`}
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
              {t("transfer.section.asset.balance.loading")}
            </CryptoSelectorBalanceText>
          )}
          {balance && (
            <>
              <div>
                <CryptoSelectorBalanceText>
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
    </CryptoSelectorBox>
  );
};
