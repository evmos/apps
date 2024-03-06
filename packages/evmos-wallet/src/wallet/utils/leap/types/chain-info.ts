// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Bech32Config } from "./bech32";
import { BIP44 } from "./bip44";
import { Currency } from "./currency";

export interface ChainInfo {
  readonly rpc: string;
  readonly rest: string;
  readonly chainId: string;
  readonly chainName: string;
  readonly stakeCurrency: Currency;
  readonly walletUrl?: string;
  readonly walletUrlForStaking?: string;
  readonly bip44: BIP44;
  readonly bech32Config: Bech32Config;
  readonly currencies: Currency[];
  readonly feeCurrencies: Currency[];
  readonly coinType?: number;
  readonly gasPriceStep?: {
    low: number;
    average: number;
    high: number;
  };
  readonly features?: string[];
  readonly beta?: boolean;
}
