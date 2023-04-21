// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ethToEvmos } from "@evmos/address-converter";
import { generateEndpointAccount } from "@evmos/provider";
import { fetchWithTimeout } from "./fetch";

declare type EndpointAccountResponse = {
  code?: number;
  account?: {
    base_vesting_account?: {
      base_account: {
        pub_key?: {
          key?: string;
        };
      };
    };
    base_account?: {
      pub_key?: {
        key?: string;
      };
    };
  };
};

export async function queryPubKey(evmosEndpoint: string, address: string) {
  let converted = address;
  if (converted.startsWith("0x")) {
    converted = ethToEvmos(converted);
  }

  const get = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const addr = await fetchWithTimeout(
      `${evmosEndpoint}${generateEndpointAccount(converted)}`,
      get
    );
    // If error 400 wallet doesn't exists
    const resp = (await addr.json()) as EndpointAccountResponse;
    if (resp.code) {
      return null;
    }

    let base = null;
    if (resp.account) {
      if (resp.account.base_vesting_account) {
        base = resp.account.base_vesting_account.base_account;
      } else if (resp.account.base_account) {
        base = resp.account.base_account;
      }
    }

    if (base != null) {
      if (base.pub_key) {
        if (base.pub_key !== null) {
          return base.pub_key.key as string;
        }
      }
    }
  } catch (e) {
    return null;
  }

  return null;
}
