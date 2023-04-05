import { Contract, ContractInterface } from "@ethersproject/contracts";
import { Signer } from "evmos-wallet";

export async function createContract(
  address: string,
  ABI: ContractInterface,
  walletExtension: string
) {
  const signer = new Signer();
  if (!address || !ABI) return null;
  try {
    const provider = await signer.getProvider(walletExtension);
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
}
