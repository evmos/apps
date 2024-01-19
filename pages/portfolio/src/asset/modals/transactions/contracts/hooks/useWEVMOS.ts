// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import WETH_ABI from "../../contracts/abis/WEVMOS/WEVMOS.json";
import { WEVMOS_CONTRACT_ADDRESS } from "../../../constants";
import { sendTransaction, writeContract } from "wagmi/actions";

import { BigNumber } from "@ethersproject/bignumber";
import { encodeFunctionData } from "viem";
import { useConfig } from "wagmi";

export function useWEVMOS() {
  const config = useConfig();
  async function deposit(amount: BigNumber, hexAddress: string) {
    return await writeContract(config, {
      address: WEVMOS_CONTRACT_ADDRESS,
      abi: WETH_ABI,
      functionName: "deposit",
      value: amount.toBigInt(),
      account: hexAddress as `0x${string}`,
    });
  }

  async function withdraw(amount: BigNumber, hexAddress: string) {
    return await sendTransaction(config, {
      to: WEVMOS_CONTRACT_ADDRESS,
      account: hexAddress as `0x${string}`,
      value: 0n,
      data: encodeFunctionData({
        abi: WETH_ABI,
        functionName: "withdraw",
        args: [amount.toBigInt()],
      }),
    });
  }

  return {
    deposit,
    withdraw,
  } as const;
}
