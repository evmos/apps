// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Config } from "./cosmos-config";
import { pool } from "../utils/pool";

export const getTokenPairsFromNetwork = (config: Config) =>
  pool(async () => {
    try {
      const response = (await (
        await fetch(
          `http://127.0.0.1:${config.api.cosmos}/evmos/erc20/v1/token_pairs`,
        )
      ).json()) as
        | {
            token_pairs: {
              erc20_address: string;
              denom: string;
              enabled: boolean;
              contract_owner: string;
            }[];
          }
        | {
            code: number;
            message: string;
          };
      if ("code" in response) {
        return false;
      }
      return response;
    } catch (e) {
      return false;
    }
  });
