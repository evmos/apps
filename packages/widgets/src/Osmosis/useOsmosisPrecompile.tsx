"use client";
import OmosisABI from "./abi/OsmosisPrecompileABI.json";

import { normalizeToEvmos } from "@evmosapps/evmos-wallet";
import { useAccount, useConfig } from "wagmi";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";

import { useMutation } from "@tanstack/react-query";
import { writeContract } from "wagmi/actions";
import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";

const OSMOSIS_PRECOMPILE_ADDRESS = "0x0000000000000000000000000000000000000901";

const CHANNEL_ID = "channel-0";
const CXS_CONTRACT =
  // eslint-disable-next-line no-secrets/no-secrets
  "osmo18rj46qcpr57m3qncrj9cuzm0gn3km08w5jxxlnw002c9y7xex5xsu74ytz";
const TIMEOUT = 10;

export function useOsmosisPrecompile() {
  const { address } = useAccount();
  const config = useConfig();
  const { mutate, ...rest } = useMutation({
    mutationKey: ["osmosis-swap"],
    mutationFn: async function swap({
      input,
      output,
      amount,
      slippage_tolerance,
    }: {
      input: string;
      output: string;
      amount: bigint;
      slippage_tolerance: number;
    }) {
      if (!address) throw new Error("Not connected");

      await switchToEvmosChain();

      return writeContract(config, {
        address: OSMOSIS_PRECOMPILE_ADDRESS,
        chainId: getEvmosChainInfo().id,
        abi: OmosisABI,
        functionName: "swap",
        account: address,

        args: [
          [
            CHANNEL_ID,
            CXS_CONTRACT,
            address,
            input,
            output,
            amount,
            slippage_tolerance,
            TIMEOUT,
            normalizeToEvmos(address),
          ],
        ],
        gas: 1227440n,
      });
    },
  });

  return {
    swap: mutate,
    ...rest,
  };
}
