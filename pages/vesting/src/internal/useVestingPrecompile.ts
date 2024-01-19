// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import VestingABI from "./abis/VestingABI.json";
import { Period } from "@evmos/transactions";
import { writeContract } from "wagmi/actions";
import { useSelector } from "react-redux";
import { StoreType } from "@evmosapps/evmos-wallet";
import { useConfig } from "wagmi";

const VESTING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000803";

export function useVestingPrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);
  const config = useConfig();

  async function createClawbackVestingAccount(
    funderAddress: string,
    vestingAddress: string,
    enableGovClawback: boolean
  ) {
    return await writeContract(config, {
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "createClawbackVestingAccount",
      value: 0n,
      account: address.evmosAddressEthFormat as `0x${string}`,
      args: [funderAddress, vestingAddress, enableGovClawback],
    });
  }

  async function fundVestingAccount(
    funderAddress: string,
    vestingAddress: string,
    startTime: number,
    lockupPeriods: Period[],
    vestingPeriods: Period[]
  ) {
    return await writeContract(config, {
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
    });
  }

  async function approveFunding(safeAddress: string) {
    return await writeContract(config, {
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "approve",
      value: 0n,
      account: address.evmosAddressEthFormat as `0x${string}`,
      args: [safeAddress, "/evmos.vesting.v2.MsgFundVestingAccount"],
    });
  }

  async function clawback(
    founderAddress: string,
    accountAddress: string,
    destinationAddress: string
  ) {
    return await writeContract(config, {
      address: VESTING_CONTRACT_ADDRESS,
      abi: VestingABI,
      functionName: "clawback",
      value: 0n,
      account: address.evmosAddressEthFormat as `0x${string}`,
      args: [founderAddress, accountAddress, destinationAddress],
    });
  }

  return {
    fundVestingAccount,
    clawback,
    createClawbackVestingAccount,
    approveFunding,
  } as const;
}
