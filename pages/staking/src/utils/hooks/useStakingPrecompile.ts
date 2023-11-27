import { writeContract } from "wagmi/actions";
import { useSelector } from "react-redux";
import { StoreType, getAbi } from "@evmosapps/evmos-wallet";
import { BigNumber } from "@ethersproject/bignumber";
import { Hex } from "viem";

const STAKING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000800";

export function useStakingPrecompile() {
  const address = useSelector((state: StoreType) => state.wallet.value);

  async function delegate(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: getAbi("staking"),
        functionName: "delegate",

        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [delegatorAddress as Hex, validatorAddress, amount.toBigInt()],
      },
    });
  }

  async function undelegate(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: getAbi("staking"),
        functionName: "undelegate",

        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [delegatorAddress as Hex, validatorAddress, amount.toBigInt()],
      },
    });
  }

  async function redelegate(
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    amount: BigNumber
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: getAbi("staking"),
        functionName: "redelegate",

        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [
          delegatorAddress as Hex,
          validatorSrcAddress,
          validatorDstAddress,
          amount.toBigInt(),
        ],
      },
    });
  }

  async function cancelUnbondingDelegation(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber,
    creationHeight: string
  ) {
    return await writeContract({
      mode: "prepared",
      request: {
        address: STAKING_CONTRACT_ADDRESS,
        abi: getAbi("staking"),
        functionName: "cancelUnbondingDelegation",

        account: address.evmosAddressEthFormat as `0x${string}`,
        args: [
          delegatorAddress as Hex,
          validatorAddress,
          amount.toBigInt(),
          BigInt(creationHeight),
        ],
      },
    });
  }

  return {
    delegate,
    undelegate,
    redelegate,
    cancelUnbondingDelegation,
  } as const;
}
