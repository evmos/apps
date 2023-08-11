import WETH_ABI from "../../contracts/abis/WEVMOS/WEVMOS.json";
import { WEVMOS_CONTRACT_ADDRESS } from "../../../constants";
import { KEPLR_KEY } from "evmos-wallet";
import { useContractTransaction } from "evmos-wallet";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { Interface } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

export function useWEVMOS(provider: string) {
  const { executeKeplr } = useContractTransaction();

  const iWEVMOS = new Interface(WETH_ABI);

  async function deposit(amount: BigNumber, hexAddress: string) {
    if (provider === KEPLR_KEY) {
      const encodedData = iWEVMOS.encodeFunctionData("mint");
      return await executeKeplr(
        encodedData,
        amount,
        WEVMOS_CONTRACT_ADDRESS,
        hexAddress
      );
    } else {
      const contract = await prepareWriteContract({
        address: WEVMOS_CONTRACT_ADDRESS,
        abi: WETH_ABI,
        functionName: "deposit",
        value: amount.toBigInt(),
      });
      return await writeContract(contract);
    }
  }

  async function withdraw(amount: BigNumber, hexAddress: string) {
    if (provider === KEPLR_KEY) {
      const encodedData = iWEVMOS.encodeFunctionData("withdraw", [amount]);
      return await executeKeplr(
        encodedData,
        null,
        WEVMOS_CONTRACT_ADDRESS,
        hexAddress
      );
    } else {
      const contract = await prepareWriteContract({
        address: WEVMOS_CONTRACT_ADDRESS,
        abi: WETH_ABI,
        functionName: "withdraw",
        value: amount.toBigInt(),
      });
      return await writeContract(contract);
    }
  }

  return {
    deposit,
    withdraw,
  } as const;
}
