import { getChainByAddress } from "../get-chain-by-account";
import { Prefix } from "../types";
import { Address, getPubkey, normalizeToEvmos } from "../../wallet";
import { apiCosmosAccountByAddress } from "../../api";
import { isValidCosmosAddress } from "../../wallet/utils/addresses/is-valid-cosmos-address";
import * as secp256k1 from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/crypto/secp256k1/keys_pb";
import * as ethsecp256k1 from "@buf/evmos_evmos.bufbuild_es/ethermint/crypto/v1/ethsecp256k1/keys_pb";
import { get } from "lodash-es";
type BaseAccount = {
  address: string;
  sequence: string;
  account_number: string;
  pub_key: {
    "@type": string;
    key: string;
  } | null;
};
const isBaseAccount = (account: unknown): account is BaseAccount => {
  return (
    typeof account === "object" &&
    account !== null &&
    "address" in account &&
    "sequence" in account &&
    "account_number" in account &&
    "pub_key" in account
  );
};
export const getChainAccountInfo = async (address: Address<Prefix>) => {
  const cosmosAddress = isValidCosmosAddress(address)
    ? address
    : normalizeToEvmos(address);

  const chain = getChainByAddress(address);

  const { account } = await apiCosmosAccountByAddress(
    chain.cosmosRest,
    cosmosAddress
  );

  let baseAccount: BaseAccount | undefined = undefined;

  if (
    account["@type"] === "/cosmos.auth.v1beta1.BaseAccount" &&
    isBaseAccount(account)
  ) {
    baseAccount = account;
  } else if (
    account["@type"] === "/ethermint.types.v1.EthAccount" &&
    isBaseAccount(account.base_account)
  ) {
    baseAccount = account.base_account;
  } else {
    const possibleBaseAccountLocation: unknown =
      get(account, "base_account") ||
      get(account, "base_vesting_account.base_account");
    if (isBaseAccount(possibleBaseAccountLocation)) {
      baseAccount = possibleBaseAccountLocation;
    }
  }
  if (!baseAccount) {
    throw new Error(`Unsupported account type: ${account["@type"]}`);
  }

  const pubkey = baseAccount.pub_key
    ? Buffer.from(baseAccount.pub_key.key, "base64")
    : await getPubkey({
        cosmosChainId: chain.cosmosId,
      });

  return {
    address: cosmosAddress,
    sequence: BigInt(baseAccount.sequence),
    publicKey:
      chain.identifier === "evmos"
        ? new ethsecp256k1.PubKey({
            key: pubkey,
          })
        : new secp256k1.PubKey({
            key: pubkey,
          }),
    accountNumber: baseAccount.account_number,
  };
};
