import { StdSignDoc } from "@keplr-wallet/types";
import { getKeplrProvider } from "./getKeplrProvider";
import { raise } from "helpers";

export async function signKeplrAminoTransaction(transaction: StdSignDoc) {
  const keplr = await getKeplrProvider();
  const offlineSigner = keplr.getOfflineSignerOnlyAmino(transaction.chain_id);
  const [account = raise("ACCOUNT_NOT_FOUND")] =
    await offlineSigner.getAccounts();

  return await offlineSigner.signAmino(account.address, transaction);
}
