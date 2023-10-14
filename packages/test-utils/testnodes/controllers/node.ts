import path from "path";
import os from "os";
import { rm } from "fs/promises";
import { exec } from "testnodes/utils/exec";

import { spawn } from "../utils/spawn";
import { TMP_DIR } from "testnodes/utils/constants";

export class ChainNode {
  constructor(public options: NodeOptions) {}
  get homedir() {
    return path.join(TMP_DIR, this.options.chainId, this.options.moniker);
  }
  static create(options: NodeOptions) {
    return new ChainNode(options);
  }
  async cleanup() {
    await rm(this.homedir, { recursive: true, force: true });
  }

  async genesisTx(validatorKey: string, stakeAmount: Amount) {
    return spawn(
      this.options.executable,
      [
        "genesis",
        "gentx",
        validatorKey,
        stakeAmount,
        "--chain-id",
        this.options.chainId,
        "--keyring-backend",
        this.options.keyring.backend,
      ],
      {
        stdio: "inherit",
      }
    );
  }
  async init() {
    await this.cleanup();
    await this.setupKeyring();

    await spawn(
      this.options.executable,
      [
        "init",
        this.options.moniker,
        "-o",
        "--chain-id",
        this.options.chainId,
        "--home",
        this.homedir,
      ],
      {
        // stdio: "inherit",
      }
    );
  }

  addAccountFromMnemonic = async (
    key: string,
    mneumonic?: string,
    algo = "eth_secp256k1"
  ) => {
    const stdout = await exec(
      [
        `echo "${mneumonic}" | "${this.options.executable}"`,
        `keys add ${key} `,
        `--home ${this.homedir}`,
        `--keyring-backend ${this.options.keyring.backend}`,
        `--algo ${algo}`,
        `--recover`,
      ].join(" ")
    );

    return {
      address: stdout.match(/address: (\w+)\b/g)?.[0]!,
      mnemonic: mneumonic,
    };
  };
  setupKeyring = () => {
    return spawn(
      this.options.executable,
      [
        "config",
        "keyring-backend",
        this.options.keyring.backend,
        "--home",
        this.homedir,
      ],
      {
        stdio: "inherit",
      }
    );
  };

  setupConfigFiles = () => {
    return spawn(
      this.options.executable,
      ["config", "chain-id", this.options.chainId, "--home", this.homedir],
      {
        stdio: "inherit",
      }
    );
  };
  start() {
    return spawn(this.options.executable, ["start", "--home", this.homedir], {
      stdio: "inherit",
    });
  }

  addGenesisAccount = async (address: CosmosAddress, stakeAmount: Amount) => {
    return spawn(
      this.options.executable,
      [
        "genesis",
        "add-genesis-account",
        address,
        stakeAmount,
        "--home",
        this.homedir,
      ],
      {
        stdio: "inherit",
      }
    );
  };
}
// const chain = new Chain({
//   baseDenom: "aevmos",
//   node: {
//     moniker: "testnode",
//     chainId: "evmos_9000-1",
//   },
//   genesis: {
//     accounts: [
//       {
//         address: `foo1bar`,
//         balances: ["1aevmos"],
//         unclaimedRewards: ["100aevmos"],
//       },
//     ],
//   },
// });
