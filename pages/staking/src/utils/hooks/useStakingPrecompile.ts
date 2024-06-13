// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { signAndBroadcastTypedMessage } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-sign-typed-message";
import { useEvmosChainRef } from "@evmosapps/evmos-wallet/src/registry-actions/hooks/use-evmos-chain-ref";
import {
  MsgDelegate,
  MsgUndelegate,
  MsgBeginRedelegate,
  MsgCancelUnbondingDelegation,
} from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/staking/v1beta1/tx_pb";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

// TODO: Precompiles are being temporarily disabled
// in the meantime, we will use typed messages
// uncomment these once precompiles are enabled

// import { useConfig } from "wagmi";
// import { writeContract } from "wagmi/actions";
// import { useSelector } from "react-redux";
// import { StoreType, getAbi } from "@evmosapps/evmos-wallet";
// const STAKING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000800";

const STAKING_GAS_LIMIT = 500000n;
export function useStakingPrecompile() {
  // const config = useConfig();
  const chainRef = useEvmosChainRef();

  async function delegate(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber,
  ) {
    return await signAndBroadcastTypedMessage(chainRef, {
      messages: [
        new MsgDelegate({
          delegatorAddress: normalizeToCosmos(delegatorAddress),
          validatorAddress: validatorAddress,

          amount: {
            denom: "aevmos",
            amount: amount.toString(),
          },
        }),
      ],
      sender: normalizeToCosmos(delegatorAddress),
      gasLimit: STAKING_GAS_LIMIT,
    }).then((res) => res.tx_response.txhash);

    // return await writeContract(config, {
    //   address: STAKING_CONTRACT_ADDRESS,
    //   abi: getAbi("staking"),
    //   functionName: "delegate",
    //   account: normalizeToEth(delegatorAddress),
    //   args: [
    //     normalizeToEth(delegatorAddress),
    //     validatorAddress,
    //     amount.toBigInt(),
    //   ],
    // });
  }

  async function undelegate(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber,
  ) {
    return await signAndBroadcastTypedMessage(chainRef, {
      messages: [
        new MsgUndelegate({
          delegatorAddress: normalizeToCosmos(delegatorAddress),
          validatorAddress: validatorAddress,
          amount: {
            denom: "aevmos",
            amount: amount.toString(),
          },
        }),
      ],
      sender: normalizeToCosmos(delegatorAddress),
      gasLimit: STAKING_GAS_LIMIT,
    }).then((res) => res.tx_response.txhash);
    // return await writeContract(config, {
    //   address: STAKING_CONTRACT_ADDRESS,
    //   abi: getAbi("staking"),
    //   functionName: "undelegate",
    //   account: normalizeToEth(delegatorAddress),
    //   args: [
    //     normalizeToEth(delegatorAddress),
    //     validatorAddress,
    //     amount.toBigInt(),
    //   ],
    // });
  }

  async function redelegate(
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    amount: BigNumber,
  ) {
    return await signAndBroadcastTypedMessage(chainRef, {
      messages: [
        new MsgBeginRedelegate({
          delegatorAddress: normalizeToCosmos(delegatorAddress),
          validatorSrcAddress: validatorSrcAddress,
          validatorDstAddress: validatorDstAddress,
          amount: {
            denom: "aevmos",
            amount: amount.toString(),
          },
        }),
      ],
      sender: normalizeToCosmos(delegatorAddress),
      gasLimit: STAKING_GAS_LIMIT,
    }).then((res) => res.tx_response.txhash);
    // return await writeContract(config, {
    //   address: STAKING_CONTRACT_ADDRESS,
    //   abi: getAbi("staking"),
    //   functionName: "redelegate",
    //   account: normalizeToEth(delegatorAddress),
    //   args: [
    //     normalizeToEth(delegatorAddress),
    //     validatorSrcAddress,
    //     validatorDstAddress,
    //     amount.toBigInt(),
    //   ],
    // });
  }

  async function cancelUnbondingDelegation(
    delegatorAddress: string,
    validatorAddress: string,
    amount: BigNumber,
    creationHeight: string,
  ) {
    return await signAndBroadcastTypedMessage(chainRef, {
      messages: [
        new MsgCancelUnbondingDelegation({
          delegatorAddress: normalizeToCosmos(delegatorAddress),
          validatorAddress: validatorAddress,
          amount: {
            denom: "aevmos",
            amount: amount.toString(),
          },
          creationHeight: BigInt(creationHeight),
        }),
      ],
      sender: normalizeToCosmos(delegatorAddress),
      gasLimit: STAKING_GAS_LIMIT,
    }).then((res) => res.tx_response.txhash);
    // return await writeContract(config, {
    //   address: STAKING_CONTRACT_ADDRESS,
    //   abi: getAbi("staking"),
    //   functionName: "cancelUnbondingDelegation",
    //   account: normalizeToEth(delegatorAddress),
    //   args: [
    //     normalizeToEth(delegatorAddress),
    //     validatorAddress,
    //     amount.toBigInt(),
    //     BigInt(creationHeight),
    //   ],
    // });
  }

  return {
    delegate,
    undelegate,
    redelegate,
    cancelUnbondingDelegation,
  } as const;
}
