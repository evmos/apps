// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { SignMode } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/tx/signing/v1beta1/signing_pb";
import { getActiveProviderKey } from "../../wallet";
import { TokenAmount } from "../types";
import {
  prepareContractERC20Transfer,
  writeContractERC20Transfer,
} from "./prepare-contract-erc20-transfer";
import {
  prepareContractIBCTransfer,
  writeContractIBCTransfer,
} from "./prepare-contract-ibc-transfer";
import {
  executeCosmosIBCTransfer,
  prepareCosmosIBCTransfer,
} from "./prepare-cosmos-ibc-transfer";
import { prepareEvmTransfer, writeEvmTransfer } from "./prepare-evm-transfer";
import { getChainByAddress } from "../get-chain-by-account";
import { Address } from "helpers/src/crypto/addresses/types";
import { isEvmosAddress } from "helpers/src/crypto/addresses/is-evmos-address";
import { providers } from "../../api/utils/cosmos-based";
import { COSMOS_BASED_WALLETS } from "helpers/src/crypto/wallets/is-cosmos-wallet";

export const simulateTransfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
}) => {
  const senderIsEvmos = isEvmosAddress(sender);
  const receiverIsEvmos = isEvmosAddress(receiver);

  /**
   * Evmos -> Evmos
   */

  if (senderIsEvmos && receiverIsEvmos) {
    if (token.ref === "evmos:EVMOS") {
      return {
        method: "evm-transfer",
        sender,
        receiver,
        token,
        ...(await prepareEvmTransfer({
          receiver,
          amount: token,
        })),
      } as const;
    }
    return {
      method: "erc20-extension-transfer",
      sender,
      receiver,
      token,
      ...(await prepareContractERC20Transfer({
        sender,
        receiver,
        token,
      })),
    } as const;
  }
  /**
   * Evmos -> Cosmos
   */
  if (senderIsEvmos && !receiverIsEvmos) {
    return {
      method: "ics20-extension-transfer",
      sender,
      receiver,
      token,
      ...(await prepareContractIBCTransfer({
        sender,
        receiver,
        token,
      })),
    } as const;
  }
  /**
   * Cosmos -> Evmos
   */
  if (!senderIsEvmos && receiverIsEvmos) {
    return {
      method: "ibc-transfer",
      sender,
      receiver,
      token,
      ...(await prepareCosmosIBCTransfer({
        sender,
        receiver,
        token,
      })),
    } as const;
  }
  /**
   * Cosmos -> Cosmos
   * Unsupported
   */
  throw new Error("UNSUPPORTED_TRANSFER_METHOD");
};

export const transfer = async ({
  sender,
  receiver,
  token,
  fee,
}: {
  sender: Address;
  receiver: Address;
  token: TokenAmount;
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
}) => {
  const senderIsEvmos = isEvmosAddress(sender);
  const receiverIsEvmos = isEvmosAddress(receiver);

  if (senderIsEvmos && receiverIsEvmos) {
    if (token.ref === "evmos:EVMOS") {
      return await writeEvmTransfer({
        receiver,
        amount: token,
      });
    }
    return await writeContractERC20Transfer({
      sender,
      receiver,
      token,
    });
  }
  if (senderIsEvmos && !receiverIsEvmos) {
    return await writeContractIBCTransfer({
      sender,
      receiver,
      token,
    });
  }
  if (!senderIsEvmos && receiverIsEvmos) {
    /**
     * Nano Ledger on keplr / leap doesn't support sign direct mode, so we have to use legacy amino json
     */
    let mode: keyof typeof SignMode = "DIRECT";

    const connectorCosmosBased =
      await providers[getActiveProviderKey() as COSMOS_BASED_WALLETS]();

    if (connectorCosmosBased) {
      const chain = getChainByAddress(sender);
      const { isNanoLedger } = await connectorCosmosBased.getKey(
        chain.cosmosId,
      );
      if (isNanoLedger) {
        mode = "LEGACY_AMINO_JSON";
      }
    }

    const result = await executeCosmosIBCTransfer({
      sender,
      receiver,
      token,
      fee,
      mode,
    });
    return result.hash;
  }

  throw new Error("UNSUPPORTED_TRANSFER_METHOD");
};
