// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { chains } from "@evmosapps/registry";
import { CosmosAddress } from "../wallet";

export type Chain = (typeof chains)[keyof typeof chains];
export type Prefix = Chain["prefix"];
export type Token = Chain["tokens"][number];
type TokenDenom = Token["denom"];
export type TokenMinDenom = Token["minCoinDenom"];

export type TokenRef = Token["ref"];
export type TokenByRef = Readonly<{
  [K in TokenRef]: Readonly<Extract<Token, { ref: K }>>;
}>;

export type TokenAmount = {
  ref: TokenRef;
  amount: bigint;
};
export type FormattedBalance = {
  /**
   * @description
   * The address that owns the balance
   */
  address: CosmosAddress;
  /**
   * @description
   * The decimal places of the token used for conversion
   */
  decimals: number;
  /**
   * @description
   * The formatted balance with 7 decimal places
   */
  formatted: string;
  /**
   * @description
   * The formatted balance with the full decimal places
   * Useful for displaying small balances
   * @example
   * // 1234567890000000000n
   * formatBalance(1234567890000000000n, 18)
   * // 1.23456789
   */
  formattedLong: string;
  symbol: Token["symbol"];
  tokenRef: TokenRef;
  denom: TokenDenom;
  tokenSourcePrefix: Prefix;
  minDenom: string;
  /**
   * @description The balance value in bigint format at the minimum denomination
   */
  value: bigint;
  /**
   * The type of token
   * @description
   * **ICS20** tokens are tokens created following IBC ICS20 standards
   * https://github.com/cosmos/ibc/blob/main/spec/app/ics-020-fungible-token-transfer/README.md
   *
   * **ERC20** tokens are:
   * - Tokens from other chains that were transferred to Evmos via IBC
   *   These are usually automatically converted to ERC20 tokens on Evmos.
   * - Tokens native to evmos that were created via ERC20 contracts on EVM
   * - wEvmos, which is the EVM version of Evmos' native token
   *   Learn more about that here: https://academy.evmos.org/articles/advanced/automated-coin-conversion/
   *
   * The main pratical difference is that you interact (transfer, query balances, etc) with ICS20 tokens via the Cosmos SDK API
   * And in the case of evmos, through the ICS20 precompiled contract https://github.com/evmos/extensions/blob/main/precompiles/stateful/ICS20.sol
   *
   * While you interact with ERC20 tokens via the EVM API through their deployed contracts
   *
   */
  type: "ICS20" | "ERC20";
};
