// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ConvertModalProps } from "./ConvertModal";

import { Suspense, useEffect } from "react";
import { useAccount, useConnectorClient } from "wagmi";
import { cn, raise } from "helpers";
import { AddressDisplay, Modal, PrimaryButton } from "@evmosapps/ui-helpers";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import { useConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";
import { RxExclamationTriangle } from "react-icons/rx";
import {
  MsgConvertERC20,
  MsgConvertCoin,
} from "@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/tx_pb";
import { Skeleton } from "./skeleton";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { useSignTypedDataMessage } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-sign-typed-message";
import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import { formatUnits } from "@evmosapps/evmos-wallet/src/registry-actions/utils/format-units";
import Image from "next/image";
import { watchAsset } from "viem/actions";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { Link } from "@evmosapps/i18n/client";
import { EXPLORER_URL } from "constants-helper";
import { UpRightArrowIcon } from "@evmosapps/icons/UpRightArrowIcon";
import { TokenAmountInput } from "./TokenAmountInput";
import { BalanceDisplay } from "./BalanceDisplay";
import { GAS } from "./constants";

export const ConvertModalContent = ({
  amount,
  token,
  type,
  setState,
}: ConvertModalProps) => {
  const { address, isConnected, isConnecting } = useAccount();

  const connectModal = useConnectModal();
  const chainRef = useEvmosChainRef();

  const { data: connectorClient } = useConnectorClient();

  const { data: tokenEntity } = useTrpcQuery((t) => t.token.byDenom(token));

  const signRequest = useSignTypedDataMessage();

  useEffect(() => {
    if (isConnected || isConnecting) return;
    connectModal.setIsOpen(true, undefined, true);
  }, [isConnected, isConnecting, connectModal]);

  const { data: feeBalance } = useTrpcQuery((t) =>
    t.account.balance.byDenom({
      denom: "EVMOS",
      address: address ?? raise("no address"),
      chainRef,
    }),
  );
  const hasFundsForFees = feeBalance && feeBalance.balance.cosmos >= GAS;

  const disabled =
    !hasFundsForFees || !isConnected || signRequest.isPending || amount === 0n;

  const hash = signRequest.data?.tx_response.txhash;
  return (
    <div className="flex flex-col gap-y-2">
      <Modal.Header>
        <h2 className={"font-bold"}>Convert {tokenEntity?.coinDenom}</h2>
      </Modal.Header>
      <form
        className="flex flex-col gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (disabled) return;
          if (!address) return;
          if (!tokenEntity?.erc20Address) return;
          signRequest.mutate({
            messages: [
              type === "ERC20"
                ? new MsgConvertERC20({
                    amount: amount.toString(),
                    contractAddress: tokenEntity.erc20Address,
                    receiver: normalizeToCosmos(address),
                    sender: address,
                  })
                : new MsgConvertCoin({
                    coin: {
                      amount: amount.toString(),
                      denom: tokenEntity.cosmosDenom,
                    },
                    receiver: address,
                    sender: normalizeToCosmos(address),
                  }),
            ],
            gasLimit: GAS,
          });
        }}
      >
        {hash && (
          <div
            style={{ height: "50px" }}
            className={`text-sm text-black border-2 border-green items-center flex-col justify-center relative overflow-hidden rounded-lg  px-4 transition-all duration-300 ease-inOutBack md:px-3 flex py-[10px]`}
          >
            <span className="">Transaction Submitted</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-xs transition-colors"
                  href={`${EXPLORER_URL}/tx/${hash}`}
                >
                  Track on Escan
                </Link>
                <UpRightArrowIcon className="text-[#262B30] h-1.5 w-1.5" />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 rounded-lg bg-skinTan px-4 py-4">
          <div className="flex flex-row justify-between items-center">
            <p className="flex items-center gap-2">
              From:{" "}
              {tokenEntity?.img?.png && (
                <Image
                  src={tokenEntity?.img.png}
                  width={30}
                  height={30}
                  alt={token}
                />
              )}
              {type === "ERC20" ? "ERC20" : "IBC"}
            </p>
            {address && <AddressDisplay address={normalizeToCosmos(address)} />}
          </div>
          <TokenAmountInput
            address={address}
            token={token}
            tokenType={type}
            value={amount}
            onChange={(value) => {
              setState((state) => ({ ...state, amount: value }));
            }}
          />
          <div className="">
            <ErrorBoundary errorComponent={() => "Failed to load balance"}>
              <Suspense fallback={<Skeleton />}>
                {address && (
                  <>
                    <span className={"opacity-60"}>{"Balance: "}</span>
                    <BalanceDisplay
                      className="font-bold"
                      address={address}
                      token={token}
                      tokenType={type}
                    />
                  </>
                )}
              </Suspense>
            </ErrorBoundary>
          </div>
          <div>
            <span className={"font-bold"}>
              Fee: ≈ {formatUnits(GAS, 18, "long")} EVMOS
            </span>
          </div>
          <div>
            <ErrorBoundary
              errorComponent={() => <span>Failed to load balance</span>}
            >
              <Suspense fallback={<Skeleton />}>
                <>
                  <span className={"opacity-60"}>{"Fee Balance: "}</span>
                  <strong className="text-bold">
                    {address && (
                      <BalanceDisplay address={address} token={"EVMOS"} />
                    )}
                  </strong>

                  {!hasFundsForFees && (
                    <span className="text-bold text-rose-600">
                      <RxExclamationTriangle className="inline-block mr-1" />
                      Insufficient funds for fee
                    </span>
                  )}
                </>
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className="grid grid-cols-2 relative ">
            <button
              className={cn(
                "flex flex-col items-center border py-2 border-darkGray1 rounded-l justify-stretch",
                {
                  "bg-darkGray1 text-pearl": type === "ERC20",
                },
              )}
              onClick={(e) => {
                e.preventDefault();
                setState((props) => ({
                  ...props,
                  amount: 0n,
                  type: "ERC20",
                }));
              }}
            >
              <span
                className={
                  "text-lg font-bold text-center font-display uppercase leading-none py-2"
                }
              >
                ERC20
              </span>
              <span className="text-xs">
                <ErrorBoundary errorComponent={() => "Failed to load balance"}>
                  <Suspense fallback={<Skeleton />}>
                    {address && (
                      <>
                        <BalanceDisplay
                          className="font-bold"
                          address={address}
                          token={token}
                          tokenType={"ERC20"}
                        />
                      </>
                    )}
                  </Suspense>
                </ErrorBoundary>
              </span>
            </button>

            <button
              className={cn(
                "flex flex-col items-center border  py-2  border-darkGray1 rounded-r justify-stretch",
                {
                  "bg-darkGray1 text-pearl": type === "ICS20",
                },
              )}
              onClick={(e) => {
                e.preventDefault();
                setState((props) => ({
                  ...props,
                  amount: 0n,
                  type: "ICS20",
                }));
              }}
            >
              <span
                className={
                  "text-lg font-bold text-center font-display uppercase leading-none py-2"
                }
              >
                IBC
              </span>

              <span className="text-xs">
                <ErrorBoundary errorComponent={() => "Failed to load balance"}>
                  <Suspense fallback={<Skeleton />}>
                    {address && (
                      <>
                        <BalanceDisplay
                          className="font-bold"
                          address={address}
                          token={token}
                          tokenType={"ICS20"}
                        />
                      </>
                    )}
                  </Suspense>
                </ErrorBoundary>
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center space-y-3 rounded-lg bg-skinTan px-4 py-4">
          <p className="flex items-center gap-2">
            To:{" "}
            {tokenEntity?.img?.png && (
              <Image
                src={tokenEntity?.img.png}
                width={30}
                height={30}
                alt={token}
              />
            )}
            {type === "ERC20" ? "IBC" : "ERC20"}
          </p>
          {getActiveProviderKey() !== "Keplr" ||
            (getActiveProviderKey() !== "Leap" && (
              <button
                className=" rounded border border-black px-3 py-0.5 text-xs font-bold text-black opacity-80 hover:opacity-50"
                onClick={(e) => {
                  e.preventDefault();
                  if (!connectorClient || !address || !tokenEntity) return;

                  void watchAsset(connectorClient, {
                    type: "ERC20",
                    options: {
                      address,
                      decimals: tokenEntity.exponent,
                      symbol: tokenEntity.coinDenom,
                      image: tokenEntity.img?.png,
                    },
                  });
                }}
              >
                Add {tokenEntity?.coinDenom} to wallet
              </button>
            ))}
        </div>
        <span className=" text-center text-xs">
          Since{" "}
          <a
            className="text-red"
            rel="noopener noreferrer"
            target="_blank"
            href="https://commonwealth.im/evmos/discussion/8501-evmos-software-upgrade-v10"
          >
            v10
          </a>{" "}
          upgrade, all withdraws will pull first from IBC token balance before
          ERC-20.
        </span>
        {signRequest.error && (
          <span className="text-rose-600 text-center">Transaction failed</span>
        )}
        <PrimaryButton className="w-full" disabled={disabled}>
          {"Convert"}
        </PrimaryButton>
      </form>
    </div>
  );
};
