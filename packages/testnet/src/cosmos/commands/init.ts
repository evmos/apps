import { spawn } from "child_process";
import path from "path";
import { updateJson } from "src/utils/handlejson";
import { Genesis } from "src/types/genesis";
import { makePromise } from "../../utils/makePromise";
import { Config } from "../cosmos-config";

export const init = ({
  executable,
  moniker,
  chainId,
  homeDir,
  baseDenom,
}: Config) => {
  const proc = spawn(
    executable,
    [
      "init",
      moniker,
      "--chain-id",
      chainId,
      "--home",
      homeDir,
      "--log_format",
      "json",

      "-o",
      // "--default-denom",
      // baseDenom,
    ],

    {
      stdio: "pipe",
    }
  );
  const { promise, resolve, reject } = makePromise<void>();
  proc.on("close", async (code) => {
    if (code !== 0) {
      reject();
    } else {
      await updateJson<Genesis>(
        path.join(homeDir, "config/genesis.json"),
        (genesis) => {
          // console.log("genesis", genesis);
          genesis = JSON.parse(
            JSON.stringify(genesis).replace(/"stake"/g, `"${baseDenom}"`)
          );

          return genesis;
          // console.log(JSON.stringify(genesis.app_state, null, 2));
          // genesis.app_state.staking.params.bond_denom = baseDenom;
          // genesis.app_state.crisis.constant_fee.denom = baseDenom;
          // genesis.app_state.gov.params.min_deposit?.map((deposit) => {
          //   deposit.denom = baseDenom;
          //   return deposit;
          // });
          // genesis.app_state.evm.params.evm_denom = baseDenom;
          // genesis.app_state.inflation.params.mint_denom = baseDenom;
          // genesis.app_state.claims.params.claims_denom = baseDenom;
          // return genesis;
        }
      );
      resolve();
    }
  });

  return {
    ...proc,
    exited: promise,
  };
};
