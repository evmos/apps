import { Octokit } from "octokit";
import download from "download";
import os from "os";
import path from "path";
import { stat, rm, readFile, writeFile } from "fs/promises";
import { spawn, exec, ChildProcess } from "node:child_process";
import process from "node:process";
import { Genesis } from "testnodes/genesis";
import toml from "toml";
import { BaseConfig } from "testnodes/config";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN ?? "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",
});

const downloadEvmosLatest = async () => {
  const releases = await octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    {
      owner: "evmos",
      repo: "evmos",
    }
  );

  const platform = os.platform().toLowerCase();
  const arch = os.arch().toLowerCase();
  const release = releases.data.assets.find(
    ({ name }) =>
      name.toLowerCase().includes(platform) && name.toLowerCase().includes(arch)
  );
  if (!release) {
    throw new Error(`No release found for ${platform} ${arch}`);
  }
  const dir = path.join(os.tmpdir(), release.name.replace(".tar.gz", ""));
  try {
    await stat(dir);
  } catch (e) {
    await download(release.browser_download_url, dir, { extract: true });
  }
  return dir;
};
const asyncExec = (command: string) =>
  new Promise<string>((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });

const getEvmosd = async () => {
  const releaseDir = await downloadEvmosLatest();
  const executable = path.join(releaseDir, "bin/evmosd");
  return executable;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};
interface Toml {
  [key: string]:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | Toml;
}

const serializeField = (
  value: number | boolean | string | (string | number | boolean)[]
) => {
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (typeof value === "boolean") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
};
const serializeToml = (obj: Toml): string => {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (isRecord(value)) {
        return `[${key}]\n${serializeToml(value)}`;
      }
      return `${key} = ${serializeField(value)}`;
    })
    .join("\n");
};
type Key = {
  key: string;
  mnemonic: string;
};
type EvmosNodeConfig = {
  chainId: string;
  moniker: string;

  keyring: string;
  keyAlgorithm: string;
  logLevel: string;
  baseDir: string;
  baseDenom: string;

  // validatorKey: Key;

  // userKeys: Key[];

  // rpcPort: number;
  // p2pPort: number;
  // restPort: number;
  // wsPort: number;
};

class Evmosd {
  config: EvmosNodeConfig;
  constructor(
    public executable: string,
    config: Partial<EvmosNodeConfig> = {}
  ) {
    this.config = {
      ...{
        chainId: "evmos_9000-1",
        moniker: "localtestnet",

        keyring: "test",
        keyAlgorithm: "eth_secp256k1",
        logLevel: "info",
        baseDir: os.tmpdir(),
        baseDenom: "aevmos",
      },
      ...config,
    };
  }

  static setup = async (config: Partial<EvmosNodeConfig> = {}) => {
    const executable = await getEvmosd();
    const evmosd = new Evmosd(executable, config);
    await evmosd.initialize();
    return evmosd;
  };

  get homedir() {
    return path.join(
      this.config.baseDir,
      this.config.chainId,
      this.config.moniker
    );
  }
  initialize = async () => {
    await rm(this.homedir, { recursive: true, force: true });
    await this.spawn(
      "config",
      "keyring-backend",
      this.config.keyring,
      "--home",
      this.homedir
    );
    await this.spawn(
      "config",
      "chain-id",
      this.config.chainId,
      "--home",
      this.homedir
    );

    // Set moniker and chain-id for Evmos (Moniker can be anything, chain-id must be an integer)

    await this.spawn(
      "init",
      this.config.moniker,
      "-o",
      "--chain-id",
      this.config.chainId,
      "--home",
      this.homedir
    );

    await this.setDenom(this.config.baseDenom);
    await this.setGasLimit(10000000);

    await this.setClaimsDecay(1000000);
    await this.updateGenesis((genesis) => {
      genesis.app_state.claims.params.airdrop_start_time =
        new Date().toISOString();

      return genesis;
    });
  };
  readGenesis = async () => {
    const genesis = await readFile(
      path.join(this.homedir, "config/genesis.json"),
      "utf-8"
    );

    return JSON.parse(genesis) as Genesis;
  };
  writeGenesis = async (genesis: Genesis) => {
    return await writeFile(
      path.join(this.homedir, "config/genesis.json"),
      JSON.stringify(genesis)
    );
  };

  setClaimsDecay = async (seconds: number) => {
    await this.updateGenesis((genesis) => {
      genesis.app_state.claims.params.duration_of_decay =
        seconds.toString() + "s";

      genesis.app_state.claims.params.duration_until_decay =
        Math.round(seconds / 10).toString() + "s";

      return genesis;
    });
  };
  setInitialClaimableAmount = async (address: string, amount: number) => {
    await this.updateGenesis((genesis) => {
      genesis.app_state.claims.claims_records = [
        {
          initial_claimable_amount: amount,
          actions_completed: [false, false, false, false],
          address,
        },
      ];

      return genesis;
    });
    const BANK_ADDRESS = "evmos15cvq3ljql6utxseh0zau9m8ve2j8erz89m5wkz";
    // add balance to claims module account https://docs.evmos.org/protocol/module-accounts
    await this.addBalanceToAddress(BANK_ADDRESS, {
      amount: amount.toString(),
      denom: this.config.baseDenom,
    });
  };

  async addBalanceToAddress(
    address: string,
    {
      amount,
      denom,
    }: {
      amount: string;
      denom: string;
    }
  ) {
    await this.updateGenesis((genesis) => {
      if (!genesis.app_state.bank.balances) {
        genesis.app_state.bank.balances = [];
      }

      const account = genesis.app_state.bank.balances.find(
        (account) => account.address === address
      );

      if (!account) {
        genesis.app_state.bank.balances.push({
          address,
          coins: [{ amount, denom }],
        });
        return genesis;
      }
      const coin = account.coins.find((coin) => coin.denom === denom);
      if (!coin) {
        account.coins.push({ amount, denom });
      } else {
        coin.amount = String(BigInt(amount) + BigInt(coin.amount));
      }

      return genesis;
    });
  }
  /**
   * Set the gas limit in the genesis file
   */
  setGasLimit = async (gasLimit: number) => {
    await this.updateGenesis((genesis) => {
      genesis.consensus_params.block.max_gas = gasLimit.toString();
      return genesis;
    });
  };
  setDenom = async (denom: string) => {
    await this.updateGenesis((genesis) => {
      genesis.app_state.staking.params.bond_denom = denom;
      genesis.app_state.crisis.constant_fee.denom = denom;
      genesis.app_state.gov.params.min_deposit?.map((deposit) => {
        deposit.denom = denom;
        return deposit;
      });
      genesis.app_state.evm.params.evm_denom = denom;
      genesis.app_state.inflation.params.mint_denom = denom;
      genesis.app_state.claims.params.claims_denom = denom;
      return genesis;
    });
  };

  readConfig = async () => {
    const config = await readFile(
      path.join(this.homedir, "config/config.toml"),
      "utf-8"
    );

    return toml.parse(config) as BaseConfig;
  };

  writeConfig = async (config: BaseConfig) => {
    const serialized = serializeToml(config as Toml);
    console.log(serialized);
    return await writeFile(
      path.join(this.homedir, "config/config.toml"),
      serialized
    );
  };

  updateConfig = async (update: (config: BaseConfig) => BaseConfig) => {
    const config = await this.readConfig();

    return await this.writeConfig(update(config));
  };
  updateGenesis = async (update: (genesis: Genesis) => Genesis) => {
    const genesis = await this.readGenesis();
    await this.writeGenesis(update(genesis));
  };
  spawn = (...args: string[]) =>
    new Promise((resolve, reject) => {
      const child = spawn(this.executable, args, {
        stdio: "inherit",
      });

      child.on("error", reject);
      child.on("exit", resolve);
    });

  addKey = async ({ mnemonic, key }: Key) => {
    const response = await asyncExec(
      [
        "echo",
        `"${mnemonic}"`,
        "|",
        this.executable,
        "keys",
        "add",
        key,
        "--keyring-backend",
        this.config.keyring,
        "--algo",
        this.config.keyAlgorithm,
        "--home",
        this.homedir,
      ].join(" ")
    );

    return response.match(/(evmos1.+\b)/g)?.[0] as string;
  };
}

const evmosd = await Evmosd.setup();

const validatorAddress = await evmosd.addKey({
  key: "mykey",
  mnemonic:
    "gesture inject test cycle original hollow east ridge hen combine junk child bacon zero hope comfort vacuum milk pitch cage oppose unhappy lunar seat",
});

await evmosd.setInitialClaimableAmount(validatorAddress, 1000000000);

const accounts = await Promise.all(
  [
    {
      key: "dev0",
      mnemonic:
        "copper push brief egg scan entry inform record adjust fossil boss egg comic alien upon aspect dry avoid interest fury window hint race symptom",
    },

    {
      key: "dev1",
      mnemonic:
        "maximum display century economy unlock van census kite error heart snow filter midnight usage egg venture cash kick motor survey drastic edge muffin visual",
    },

    {
      key: "dev2",
      mnemonic:
        "will wear settle write dance topic tape sea glory hotel oppose rebel client problem era video gossip glide during yard balance cancel file rose",
    },

    {
      key: "dev3",
      mnemonic:
        "doll midnight silk carpet brush boring pluck office gown inquiry duck chief aim exit gain never tennis crime fragile ship cloud surface exotic patch",
    },
  ].map(async (key) => evmosd.addKey(key))
);

await evmosd.updateConfig((config) => {
  config.instrumentation.namespace = "hii";
  return config;
});
const genesis = await evmosd.readConfig();

console.log(genesis);
// console.log(await evmosd.addKey(defaulValidatorKeys));
