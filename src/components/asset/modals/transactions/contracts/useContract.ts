import { Contract, ContractInterface } from "@ethersproject/contracts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Signer } from "../../../../../internal/wallet/functionality/signing/genericSigner";
import { StoreType } from "../../../../../redux/Store";

export function useContract<T extends Contract = Contract>(
  address: string,
  ABI: ContractInterface
): T {
  const wallet = useSelector((state: StoreType) => state.wallet.value);
  return useMemo(() => {
    const signer = new Signer();

    if (!address || !ABI) return null;
    try {
      const provider = signer.getProvider(wallet.extensionName);
      if (!provider) {
        return null;
      }
      return new Contract(address, ABI, provider.getSigner(0));
    } catch (error) {
      if (address !== "0x0000000000000000000000000000000000000000") {
        console.error("Failed to get contract", error);
      }
      return null;
    }
  }, [ABI, address, wallet]) as T;
}
