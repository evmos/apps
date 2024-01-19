// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address, CosmosAddress, HexAddress } from "../../wallet";
import { getChainByAddress } from "../get-chain-by-account";
import { simulateTransfer } from "../transfers/prepare-transfer";
import { Prefix, TokenAmount, TokenRef } from "../types";
import { useQuery } from "@tanstack/react-query";
import { E, multiply } from "helpers";
import { bech32 } from "bech32";
import { useAccountExists } from "./use-account-exists";
import { getTokenByRef } from "../get-token-by-ref";
import { getFeeToken } from "../getFeeToken";

/**
 * this is used to simulate a transfer before the user has entered the receiver address
 * so we can show the estimated gas fee early on. THIS IS ONLY FOR THE SIMULATION
 */
const fakeWalletAddress = "0x0000000000000000000000000000000000000001";

export const ethToBech32 = <T extends Prefix>(
  address: HexAddress,
  prefix: T,
) => {
  const words = bech32.toWords(Buffer.from(address.slice(2), "hex"));
  return bech32.encode(prefix, words) as CosmosAddress<T>;
};

export const useFee = ({
  sender,
  receiverChainPrefix,
  tokenRef,
}: {
  sender?: Address<Prefix>;
  receiverChainPrefix?: Prefix;
  tokenRef?: TokenRef;
}) => {
  const { data: accountExists } = useAccountExists(sender);
  const { data, ...rest } = useQuery({
    staleTime: 1000 * 30,
    retry: false,
    queryKey: ["use-fee", sender, receiverChainPrefix, tokenRef],
    queryFn: async () => {
      if (!sender || !receiverChainPrefix || !tokenRef) {
        throw new Error("MISSING_PARAMS");
      }
      const token = getTokenByRef(tokenRef);

      const [err, prepared] = await E.try(() =>
        simulateTransfer({
          sender,
          receiver: ethToBech32(fakeWalletAddress, receiverChainPrefix),
          token: {
            ...token,
            amount: 1n,
          },
        }),
      );

      if (err) {
        if (E.match.byPattern(err, /NotFound/g)) {
          throw new Error("ACCOUNT_NOT_FOUND");
        }
        throw new Error("UNKNOWN_ERROR", { cause: err });
      }

      const { estimatedGas } = prepared;
      const feeToken = getFeeToken(sender);
      const senderChain = getChainByAddress(sender);

      return {
        gasLimit: estimatedGas,
        token: {
          ref: feeToken.ref,
          amount: multiply(estimatedGas, senderChain.gasPriceStep.average),
        } satisfies TokenAmount,
      };
    },
    enabled: !!sender && !!receiverChainPrefix && !!tokenRef && accountExists,
  });
  return {
    ...rest,
    fee: data,
  };
};
