// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { generateEndpointAccount } from "@evmos/provider";
import { fetchWithTimeout } from "./fetch";
import { normalizeToEvmos } from "../../../wallet";

declare type EndpointAccountResponse = {
  code_hash?: number;
  account?: {
    base_vesting_account?: {
      base_account: {
        pub_key?: {
          key?: string;
        };
        sequence: string;
      };
    };
    base_account?: {
      pub_key?: {
        key?: string;
      };
      sequence: string;
    };
  };
};

type BaseAccount = {
  pub_key?: {
    key?: string;
  };
  sequence: string;
};

const getBaseAccountData = async (evmosEndpoint: string, address: string) => {
  const converted = normalizeToEvmos(address);
  const get = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const addr = await fetchWithTimeout(
      `${evmosEndpoint}${generateEndpointAccount(converted)}`,
      get,
    );
    // If error 400 wallet doesn't exists
    const resp = (await addr.json()) as EndpointAccountResponse;
    if (resp.code_hash) {
      return null;
    }

    let base: BaseAccount | null = null;

    if (resp.account) {
      if (resp.account.base_vesting_account) {
        base = resp.account.base_vesting_account.base_account;
      } else if (resp.account.base_account) {
        base = resp.account.base_account;
      }
    }
    return base;
  } catch (e) {
    return null;
  }
};

export async function queryPubKey(evmosEndpoint: string, address: string) {
  if (address === "") {
    return null;
  }
  const base = await getBaseAccountData(evmosEndpoint, address);
  if (base != null && base.pub_key && base.pub_key !== null) {
    return base.pub_key.key as string;
  }

  return null;
}
