// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { normalizeToEth, Address, wagmiConfig } from "../../wallet";
import { TokenAmount } from "../types";
import { estimateGas, writeContract } from "wagmi/actions";
import { buffGasEstimate } from "../utils/buff-gas-estimate";
import { getTokenByRef } from "../get-token-by-ref";
import { getAbi } from "../precompiles";

export const prepareContractERC20Transfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: TokenAmount;
}) => {
  const { erc20Address } = getTokenByRef(token.ref);
  if (!erc20Address) {
    throw new Error("Token is not an ERC20 token");
  }
  const args = {
    abi: getAbi("erc20"),
    functionName: "transfer",
    address: erc20Address,
    args: [normalizeToEth(receiver), token.amount],
    account: normalizeToEth(sender),
  } as const;

  const estimatedGas = buffGasEstimate(await estimateGas(wagmiConfig, args));

  return {
    tx: args,
    estimatedGas,
  };
};

export const writeContractERC20Transfer = async ({
  sender,
  receiver,
  token,
}: {
  sender: Address<"evmos">;
  receiver: Address<"evmos">;
  token: TokenAmount;
}) => {
  const prepared = await prepareContractERC20Transfer({
    sender,
    receiver,
    token,
  });
  return writeContract(wagmiConfig, prepared.tx);
};
