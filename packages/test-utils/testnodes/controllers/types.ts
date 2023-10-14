type Amount = `${number}${string}`;
type CosmosAddress = `${string}1${string}`;
type AccountOptions = {
  address: `${string}1${string}`;
  balances?: Amount[];
  unclaimedRewards?: Amount[];
};

type ValidatorOptions = {
  key: string;
  passphrase: string;
  stakeAmount: Amount;
};
type GenesisOptions = {
  accounts: AccountOptions[];
  validators: [ValidatorOptions, ...ValidatorOptions[]];
};
type NodeOptions = {
  chainId: string;
  moniker: string;
  executable: string;
  keyring: {
    backend: "test" | "file" | "memory" | "os" | "kwallet" | "pass" | "test";
  };
};
type ChainOptions = {
  baseDenom: string;
  node: NodeOptions;
  genesis: GenesisOptions;
};
