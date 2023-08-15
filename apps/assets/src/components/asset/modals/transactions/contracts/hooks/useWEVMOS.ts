import WETH_ABI from "../../contracts/abis/WEVMOS/WEVMOS.json";
import { WEVMOS_CONTRACT_ADDRESS } from "../../../constants";
import { prepareWriteContract, writeContract } from "@wagmi/core";

import { BigNumber } from "@ethersproject/bignumber";

export function useWEVMOS() {
  async function deposit(amount: BigNumber, hexAddress: string) {
    const { request } = await prepareWriteContract({
      address: WEVMOS_CONTRACT_ADDRESS,
      abi: WETH_ABI,
      functionName: "deposit",
      value: amount.toBigInt(),
      account: hexAddress as `0x${string}`,
    });
    return await writeContract(request);
  }

  async function withdraw(amount: BigNumber, hexAddress: string) {
    const { request } = await prepareWriteContract({
      address: WEVMOS_CONTRACT_ADDRESS,
      abi: WETH_ABI,
      functionName: "withdraw",
      value: 0n,
      args: [amount.toBigInt()],
      account: hexAddress as `0x${string}`,
    });
    return await writeContract(request);
  }

  return {
    deposit,
    withdraw,
  } as const;
}
