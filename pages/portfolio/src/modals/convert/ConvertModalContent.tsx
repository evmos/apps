// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ConvertModalProps } from "./ConvertModal";
import { RxArrowDown } from "react-icons/rx";

import { ComponentProps, Suspense, useEffect } from "react";
import { useAccount } from "wagmi";
import { cn } from "helpers";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";
import { Modal, PrimaryButton } from "@evmosapps/ui-helpers";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { formatUnits } from "viem";
import { tokenBalanceQueryOptions } from "./fetch-token-balance";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";
import { RxExclamationTriangle } from "react-icons/rx";
import {
  MsgConvertERC20,
  MsgConvertCoin,
} from "@buf/evmos_evmos.bufbuild_es/evmos/erc20/v1/tx_pb";
import {
  Address,
  normalizeToCosmosAddress,
  signTypedDataMessage,
} from "@evmosapps/evmos-wallet";
import { getIBCDenom } from "@evmosapps/evmos-wallet/src/registry-actions/utils/get-ibc-denom";
import type { Message } from "@bufbuild/protobuf";
import {
  broadcastTypedMessage,
  createTypedMessage,
} from "@evmosapps/evmos-wallet/src/registry-actions/transfers/prepare-typed-message";

import {
  Prefix,
  TokenRef,
} from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { Skeleton } from "./skeleton";
import { MoneyInput } from "@evmosapps/ui-helpers/src/MoneyInput";

const Card = ({ className, ...rest }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-white flex-col flex items-start rounded-lg p-3 shadow",
        className,
      )}
      {...rest}
    />
  );
};

export type TokenBalanceProps = {
  address: Address<Prefix>;
  token: TokenRef;
  tokenType?: "ERC20" | "ICS20";
};
const ERC20Balance = ({
  address,
  token,
  tokenType,
  hideSymbol = false,
  ...rest
}: TokenBalanceProps & {
  hideSymbol?: boolean;
} & ComponentProps<"span">) => {
  const { data } = useSuspenseQuery(
    tokenBalanceQueryOptions({ address, token, tokenType }),
  );
  return (
    <span {...rest}>
      {data.formatted}
      {!hideSymbol && ` ${data.symbol}`}
    </span>
  );
};

const TokenAmountInput = ({
  token,
  address,
  tokenType,
  value,
  onChange,
}: Partial<TokenBalanceProps> & {
  onChange?: (value: bigint) => void;
  value?: bigint;
}) => {
  const { data, isFetching, isLoading } = useQuery(
    tokenBalanceQueryOptions({
      address,
      token,
      tokenType,
    }),
  );
  return (
    <>
      {isFetching}
      <MoneyInput
        disabled={isLoading}
        decimals={data?.decimals}
        max={data?.value}
        min={0n}
        value={value}
        onChange={onChange}
      >
        <MoneyInput.Input />
        <MoneyInput.MaxButton />
      </MoneyInput>
    </>
  );
};
const useSignTypedDataMessage = () => {
  const { address } = useAccount();
  return useMutation({
    mutationFn: async ({
      messages,
      gasLimit,
    }: {
      messages: Message[];
      gasLimit: bigint;
    }) => {
      if (!address) throw new Error("No address");

      const typedMessage = await createTypedMessage({
        messages,
        sender: address,
        gasLimit,
      });
      const signature = await signTypedDataMessage(typedMessage.tx);
      return broadcastTypedMessage({
        ...typedMessage,
        signature,
      });
    },
  });
};
const GAS = 3000000n;

export const ConvertModalContent = ({
  amount,
  token,
  type,
  setState,
}: ConvertModalProps) => {
  const { address, isConnected, isConnecting } = useAccount();

  const connectModal = useConnectModal();

  const tokenEntity = getTokenByRef(token);

  const signRequest = useSignTypedDataMessage();

  useEffect(() => {
    if (isConnected || isConnecting) return;
    connectModal.setIsOpen(true, undefined, true);
  }, [isConnected, isConnecting, connectModal]);

  const { data: feeBalance } = useQuery(
    tokenBalanceQueryOptions({
      address,
      token: "evmos:EVMOS",
      tokenType: "ICS20",
    }),
  );

  const hasFundsForFees = feeBalance && feeBalance?.value >= GAS;

  const disabled = !hasFundsForFees || !isConnected || signRequest.isPending;

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (disabled) return;
        if (!address) return;
        if (!tokenEntity.erc20Address) return;
        signRequest.mutate({
          messages: [
            type === "ERC20"
              ? new MsgConvertERC20({
                  amount: amount.toString(),
                  contractAddress: tokenEntity.erc20Address,
                  receiver: normalizeToCosmosAddress(address),
                  sender: address,
                })
              : new MsgConvertCoin({
                  coin: {
                    amount: amount.toString(),
                    denom: getIBCDenom({
                      sender: tokenEntity.sourcePrefix,
                      receiver: "evmos",
                      token: tokenEntity,
                    }),
                  },
                  receiver: address,
                  sender: normalizeToCosmosAddress(address),
                }),
          ],
          gasLimit: GAS,
        });
      }}
    >
      <Modal.Header>
        <h2 className={"font-bold text-lg"}>Convert {tokenEntity.symbol} </h2>
      </Modal.Header>

      <TokenAmountInput
        address={address}
        token={token}
        tokenType={type}
        value={amount}
        onChange={(value) => {
          setState((state) => ({ ...state, amount: value }));
        }}
      />

      <div className="flex flex-col relative">
        <Card>
          <h3 className={"font-bold uppercase font-brand text-xs"}>From:</h3>
          <span
            className={
              "text-2xl font-bold text-center font-display uppercase leading-none py-2"
            }
          >
            {type !== "ERC20" ? "IBC Coin" : "ERC20"}
          </span>
          <span className="self-end text-xs">
            <ErrorBoundary errorComponent={() => "Failed to load balance"}>
              <Suspense fallback={<Skeleton />}>
                {address && (
                  <>
                    <span className={"opacity-60"}>{"Balance: "}</span>
                    <ERC20Balance
                      className="font-bold"
                      address={address}
                      token={token}
                      tokenType={type}
                    />
                  </>
                )}
              </Suspense>
            </ErrorBoundary>
          </span>
        </Card>
        <button
          className={
            "mx-auto bg-red font-display bold rounded-full text-white  p-2 aspect-square z-10 -mt-2 flex items-center justify-center  hover:-rotate-180 transition-transform duration-200 ease-in-out"
          }
          onClick={(e) => {
            e.preventDefault();
            setState(({ type, ...rest }) => ({
              ...rest,
              amount: 0n,
              type: type === "ERC20" ? "ICS20" : "ERC20",
            }));
          }}
        >
          <RxArrowDown className="h-5 w-5" />
        </button>
        <Card className="-mt-2">
          <h3 className={"font-bold uppercase font-brand text-xs "}>To:</h3>
          <span
            className={
              "text-2xl font-bold text-center font-display uppercase leading-none py-2"
            }
          >
            {type === "ERC20" ? "IBC Coin" : "ERC20"}
          </span>

          <span className="self-end text-xs">
            <ErrorBoundary errorComponent={() => "Failed to load balance"}>
              <Suspense fallback={<Skeleton />}>
                {address && (
                  <>
                    <span className={"opacity-60"}>{"Balance: "}</span>
                    <ERC20Balance
                      className="font-bold"
                      address={address}
                      token={token}
                      tokenType={type === "ERC20" ? "ICS20" : "ERC20"}
                    />
                  </>
                )}
              </Suspense>
            </ErrorBoundary>
          </span>
        </Card>
      </div>
      <Card
        className={cn("flex flex-row justify-between", {
          "ring ring-rose-400": !hasFundsForFees,
        })}
      >
        <span className={"font-bold"}>Fee: ≈ {formatUnits(GAS, 18)} EVMOS</span>
        <ErrorBoundary
          errorComponent={() => <span>Failed to load balance</span>}
        >
          <Suspense fallback={<Skeleton />}>
            <div className="text-right flex flex-col gap-y-1">
              <p className="text-xs">
                <span className={"opacity-60"}>{"Balance: "}</span>
                <strong className="text-bold">
                  {address && (
                    <ERC20Balance address={address} token={"evmos:EVMOS"} />
                  )}
                </strong>
              </p>
              {!hasFundsForFees && (
                <span className="text-bold text-rose-600">
                  <RxExclamationTriangle className="inline-block mr-1" />
                  Insufficient funds for fee
                </span>
              )}
            </div>
          </Suspense>
        </ErrorBoundary>
      </Card>
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
        <span className="text-rose-600">{signRequest.error.message}</span>
      )}
      <PrimaryButton className="w-full" disabled={disabled}>
        {"Convert"}
      </PrimaryButton>
    </form>
  );
};
