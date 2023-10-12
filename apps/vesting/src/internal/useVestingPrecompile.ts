import VestingABI from "./abis/VestingABI.json";
import { Period } from "@evmos/transactions";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";

const VESTING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000803";

export function useVestingPrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);

  async function createClawbackVestingAccount(
    funderAddress: string,
    vestingAddress: string,
    enableGovClawback: boolean,
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: VESTING_CONTRACT_ADDRESS,
        abi: VestingABI,
        functionName: "createClawbackVestingAccount",
        value: 0n,
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [funderAddress, vestingAddress, enableGovClawback],
      },
    });
  }

  async function fundVestingAccount(
    funderAddress: string,
    vestingAddress: string,
    startTime: number,
    lockupPeriods: Period[],
    vestingPeriods: Period[],
  ) {

    console.log("here", funderAddress, vestingAddress)

    return await writeContract({
      mode: "prepared",
      request: {
        address: VESTING_CONTRACT_ADDRESS,
        abi: VestingABI,
        functionName: "fundVestingAccount",
        value: 0n,
        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [
          funderAddress,
          vestingAddress,
          startTime,
          lockupPeriods,
          vestingPeriods,
        ],
      },
    });
  }

  async function clawback(
    founderAddress: string,
    accountAddress: string,
    destinationAddress: string,
  ) {
    const { request } = await prepareWriteContract({
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "clawback",
      value: 0n,
      account: address.evmosAddressEthFormat as `0x${string}`,
      args: [founderAddress, accountAddress, destinationAddress],
    });
    return await writeContract(request);
  }

  return {
    fundVestingAccount,
    clawback,
    createClawbackVestingAccount,
  } as const;
}
