import { ethToEvmos } from "@evmos/address-converter";
import { generateEndpointAccount } from "@evmos/provider";

export async function queryPubKey(evmosEndpoint: string, address: string) {
  let converted = address;
  if (converted.startsWith("0x")) {
    converted = ethToEvmos(converted);
  }

  const get = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let resp: any;
  try {
    const addr = await fetch(
      `${evmosEndpoint}${generateEndpointAccount(converted)}`,
      get
    );
    // If error 400 wallet doesn't exists
    resp = await addr.json();
    if (resp.code) {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }

  let base = null;
  if ("account" in resp) {
    if ("base_vesting_account" in resp.account) {
      base = resp.account.base_vesting_account.base_account;
    } else {
      base = resp.account.base_account;
    }
  }

  if (base != null) {
    if ("pub_key" in base) {
      if (base.pub_key !== null) {
        return base.pub_key.key as string;
      }
    }
  }

  return undefined;
}
