// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { transfer } from "../transfers/prepare-transfer";
import { TokenAmount } from "../types";
import { useMutation } from "@tanstack/react-query";
import { Address } from "helpers/src/crypto/addresses/types";

import { switchToEvmosChain } from "../../wallet/actions/switchToEvmosChain";

export const useTransfer = ({
  sender,
  receiver,
  token,
  fee,
}: {
  sender?: Address;
  receiver?: Address;
  token?: TokenAmount;
  fee?: {
    gasLimit: bigint;
    token: TokenAmount;
  };
}) => {
  const isReady = sender && receiver && token && fee && token.amount > 0n;
  const { mutate, ...rest } = useMutation({
    mutationFn: async () => {
      if (!isReady) {
        throw new Error("NOT_READY_TO_TRANSFER");
      }

      await switchToEvmosChain();

      return transfer({
        sender,
        receiver,
        token,
        fee,
      });
    },
  });

  return {
    transfer: mutate,
    isReady,
    ...rest,
  };
};
