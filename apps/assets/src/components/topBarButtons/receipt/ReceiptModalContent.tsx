import { useTranslation } from "next-i18next";

import {
  PrimaryButton,
  ContainerConfirmation,
  ViewExplorer,
  ConfirmationTitle,
  ConfirmationMessage,
  Divider,
  ContainerItem,
  ConfirmationText,
  AddressDisplay,
} from "ui-helpers";

import { FetchTransactionResult, fetchTransaction } from "wagmi/actions";
import { Hex, decodeFunctionData, formatUnits } from "viem";
import {
  Address,
  ICS20_ADDRESS,
  MsgTransfer,
  apiCosmosBlockByHeight,
  apiCosmosTxByHash,
  getAbi,
  getTokens,
  normalizeToCosmosAddress,
} from "evmos-wallet";
import { FailTxIcon, SuccessTxIcon } from "icons";
import { Prefix, Token } from "evmos-wallet/src/registry-actions/types";
import { findToken } from "evmos-wallet/src/registry-actions/utils";
import { useQuery } from "@tanstack/react-query";
import { chains } from "@evmos-apps/registry";
import { SkeletonLoading } from "../shared/SkeletonLoading";
import { E, raise } from "helpers";
import { ReceiptModalProps } from "./ReceiptModal";

const generateReceipt = ({
  sender,
  receiver,
  amount,
  token,
  height,
}: {
  sender: string;
  receiver: string;
  amount: bigint | number | string;
  token: Token;
  height: string | number | bigint;
}) => ({
  sender: normalizeToCosmosAddress(sender as Address<Prefix>),
  receiver: normalizeToCosmosAddress(receiver as Address<Prefix>),
  formattedAmount: `${formatUnits(BigInt(amount), token.decimals)} ${
    token.denom
  }`,
  height: BigInt(height),
});

const generateICS20TransferReceipt = (result: FetchTransactionResult) => {
  const { args, functionName } = decodeFunctionData({
    abi: getAbi("ics20"),
    data: result.input,
  });
  if (!args || functionName !== "transfer") throw new Error("Missing args");

  const [, , denom, amount, sender, receiver] = args;
  if (!denom || !amount || !sender || !receiver)
    throw new Error("Missing args");

  return generateReceipt({
    sender,
    receiver,
    amount,
    token:
      findToken({
        denom,
      }) ?? raise("Token not found"),
    height: result.blockNumber,
  });
};

const generateERC20TransferReceipt = (result: FetchTransactionResult) => {
  const { args, functionName } = decodeFunctionData({
    abi: getAbi("erc20"),
    data: result.input,
  });
  if (!args || functionName !== "transfer") throw new Error("Missing args");

  const [receiver, amount] = args;

  if (!amount || !amount || !receiver) throw new Error("Missing args");
  const token =
    getTokens().find((token) => token.erc20Address === result.to) ??
    raise("Token not found");

  return generateReceipt({
    sender: result.from,
    receiver,
    amount,
    token,
    height: result.blockNumber,
  });
};

const isIBCMsgTransfer = (message: unknown): message is MsgTransfer => {
  return (
    typeof message === "object" &&
    message !== null &&
    "@type" in message &&
    message["@type"] === "/ibc.applications.transfer.v1.MsgTransfer"
  );
};

const useReceipt = (hash?: Hex, chainPrefix?: Prefix) => {
  const { data, ...rest } = useQuery({
    queryKey: ["receipt", hash],
    enabled: !!hash && !!chainPrefix,
    retry: 10,
    retryDelay: 3000,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!hash || !chainPrefix) throw new Error("Missing parameters");
      /**
       * All transactions originated on Evmos are sent through Precompiles, so we fetch the results as
       * ethereum transactions
       */
      if (chainPrefix === "evmos") {
        const result = await fetchTransaction({
          hash: hash,
        });
        if (result.to === ICS20_ADDRESS) {
          return generateICS20TransferReceipt(result);
        }
        return generateERC20TransferReceipt(result);
      }

      /**
       * All transactions originated on Cosmos are sent through the Cosmos SDK, so we fetch the results as
       * cosmos transactions
       */
      const chainConfig = chains[chainPrefix];

      const result = await apiCosmosTxByHash(chainConfig.cosmosRest, hash);
      const message = { ...result.tx.body.messages[0] } as const;

      if (result.tx_response.code !== 0) {
        throw new Error(`Transaction failed: ${result.tx_response.raw_log}`);
      }
      if (!isIBCMsgTransfer(message)) {
        throw new Error("Unsupported transaction type");
      }
      const token =
        findToken({
          denom: message.token.denom,
        }) ?? raise("Token not found");
      return generateReceipt({
        sender: message.sender,
        receiver: message.receiver,
        amount: message.token.amount,
        token,
        height: result.tx_response.height,
      });
    },
  });
  return {
    receipt: data,
    ...rest,
  };
};

const useBlock = (prefix?: Prefix, height?: bigint) => {
  return useQuery({
    queryKey: ["block", prefix, height?.toString()],

    queryFn: async () => {
      if (!height || !prefix) throw new Error("Missing parameters");
      const chainConfig = chains[prefix];
      const result = await apiCosmosBlockByHeight(
        chainConfig.cosmosRest,
        height,
      );
      return result;
    },
    enabled: !!height && !!prefix,
  });
};

export const ReceiptModalContent = ({
  hash,
  chainPrefix,
  setIsOpen,
}: ReceiptModalProps) => {
  const {
    receipt,
    isLoading: isReceiptLoading,
    error,
  } = useReceipt(hash, chainPrefix);

  const { t } = useTranslation();

  const { data: block, isLoading: isFetchingBlock } = useBlock(
    chainPrefix,
    receipt?.height,
  );
  const chain = chains[chainPrefix ?? "evmos"];
  const blockDate = block?.block?.header?.time
    ? new Date(block.block.header.time)
    : undefined;

  return (
    <>
      <ContainerConfirmation>
        {/* PaymentTxIcon FailTxIcon */}
        {!!error && <FailTxIcon />}
        {receipt && <SuccessTxIcon />}
        {isReceiptLoading && (
          <div className="animate-pulse bg-white/10 rounded-full h-56 w-56" />
        )}

        <ConfirmationTitle variant={error ? "error" : "success"}>
          <SkeletonLoading loading={isReceiptLoading}>
            {receipt && t("transfer.confirmation.message.successful")}
            {!!error && t("transfer.confirmation.message.unsuccessful")}
          </SkeletonLoading>
        </ConfirmationTitle>

        <ConfirmationMessage>
          <SkeletonLoading loading={isReceiptLoading}>
            {receipt && (
              <>
                {t("transfer.confirmation.message.successful.description")}
                <br />
                {t("transfer.confirmation.message.successful.description2")}
              </>
            )}
            {!!error && <>{E.ensureError(error).message}</>}
          </SkeletonLoading>
        </ConfirmationMessage>
        <Divider variant="info" className="w-full">
          <ViewExplorer
            txHash={chainPrefix !== "evmos" ? hash?.slice(2) ?? "" : hash ?? ""}
            explorerTxUrl={chain.explorerUrl}
            text={`Transaction ID: ${hash?.slice(0, 10)}...`}
          />
        </Divider>
        {!error && (
          <>
            <ContainerItem>
              <ConfirmationText>
                {t("transfer.confirmation.total.amount.sent")}
              </ConfirmationText>

              <p>
                <SkeletonLoading loading={isReceiptLoading}>
                  {receipt && receipt.formattedAmount}
                </SkeletonLoading>
              </p>
            </ContainerItem>
            <ContainerItem>
              <ConfirmationText>
                {t("transfer.confirmation.recipient.address")}
              </ConfirmationText>

              <p>
                <SkeletonLoading className="w-24" loading={isReceiptLoading}>
                  {receipt && <AddressDisplay address={receipt.receiver} />}
                </SkeletonLoading>
              </p>
            </ContainerItem>
            <ContainerItem>
              <ConfirmationText>
                {t("transfer.confirmation.date")}
              </ConfirmationText>

              <p>
                <SkeletonLoading loading={isReceiptLoading || isFetchingBlock}>
                  {blockDate && blockDate.toDateString()}
                </SkeletonLoading>
              </p>
            </ContainerItem>
          </>
        )}
      </ContainerConfirmation>

      <PrimaryButton
        onClick={() => setIsOpen(false)}
        className="w-full text-lg rounded-md capitalize mt-11"
      >
        {t("transfer.confirmation.button.text")}
      </PrimaryButton>
    </>
  );
};