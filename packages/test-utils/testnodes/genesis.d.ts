export interface Genesis {
  genesis_time: string;
  chain_id: string;
  initial_height: string;
  consensus_params: ConsensusParams;
  app_hash: string;
  app_state: AppState;
}
export interface ConsensusParams {
  block: Block;
  evidence: Evidence;
  validator: Validator;
  version: Version;
}
export interface Block {
  max_bytes: string;
  max_gas: string;
}
export interface Evidence {
  max_age_num_blocks: string;
  max_age_duration: string;
  max_bytes: string;
}
export interface Validator {
  pub_key_types?: string[] | null;
}
export interface Version {
  app: string;
}
export interface AppState {
  "07-tendermint"?: null;
  auth: Auth;
  authz: Authz;
  bank: Bank;
  capability: Capability;
  claims: Claims;
  consensus?: {
    consensus_params: {
      block: {
        max_bytes: "22020096";
        max_gas: "-1";
      };
      evidence: {
        max_age_num_blocks: "100000";
        max_age_duration: "172800000000000";
        max_bytes: "1048576";
      };
      validator: {
        pub_key_types: ["ed25519"];
      };
      version: {
        app: "0";
      };
    };
  };
  crisis: Crisis;
  distribution: Distribution;
  epochs: Epochs;
  erc20: Erc20;
  evidence: Evidence1;
  evm: Evm;
  feegrant: Feegrant;
  feemarket: Feemarket;
  genutil: Genutil;
  gov: Gov;
  ibc: Ibc;
  incentives: Incentives;
  inflation: Inflation;
  interchainaccounts: Interchainaccounts;
  params?: null;
  recovery: Recovery;
  revenue: Revenue;
  slashing: Slashing;
  staking: Staking;
  transfer: Transfer;
  upgrade: UpgradeOrVesting;
  vesting: UpgradeOrVesting;
}
export interface Auth {
  params: Params;
  accounts: {
    "@type": string;
    [key: string]: unknown;
  }[];
}
export interface Params {
  max_memo_characters: string;
  tx_sig_limit: string;
  tx_size_cost_per_byte: string;
  sig_verify_cost_ed25519: string;
  sig_verify_cost_secp256k1: string;
}
export interface Authz {
  authorization?: null[] | null;
}
export interface Bank {
  params: Params1;
  balances?: BankBalance[] | null;
  supply: {
    denom: string;
    amount: string;
  }[];

  denom_metadata?: null[] | null;
  send_enabled?: null[] | null;
}
export interface BankBalance {
  address: string;
  coins: {
    denom: string;
    amount: string;
  }[];
}
export interface Params1 {
  send_enabled?: null[] | null;
  default_send_enabled: boolean;
}
export interface Capability {
  index: string;
  owners?: null[] | null;
}
export interface Claims {
  params: Params2;
  claims_records?: ClaimRecord[];
}

export interface ClaimRecord {
  initial_claimable_amount: number;
  actions_completed: [boolean, boolean, boolean, boolean];
  address: string;
}
export interface Params2 {
  enable_claims: boolean;
  airdrop_start_time: string;
  duration_until_decay: string;
  duration_of_decay: string;
  claims_denom: string;
  authorized_channels?: string[] | null;
  evm_channels?: string[] | null;
}
export interface Crisis {
  constant_fee: ConstantFeeOrMinDepositEntity;
}
export interface ConstantFeeOrMinDepositEntity {
  denom: string;
  amount: string;
}
export interface Distribution {
  params: Params3;
  fee_pool: FeePool;
  delegator_withdraw_infos?: null[] | null;
  previous_proposer: string;
  outstanding_rewards?: null[] | null;
  validator_accumulated_commissions?: null[] | null;
  validator_historical_rewards?: null[] | null;
  validator_current_rewards?: null[] | null;
  delegator_starting_infos?: null[] | null;
  validator_slash_events?: null[] | null;
}
export interface Params3 {
  community_tax: string;
  base_proposer_reward: string;
  bonus_proposer_reward: string;
  withdraw_addr_enabled: boolean;
}
export interface FeePool {
  community_pool?: null[] | null;
}
export interface Epochs {
  epochs?: EpochsEntity[] | null;
}
export interface EpochsEntity {
  identifier: string;
  start_time: string;
  duration: string;
  current_epoch: string;
  current_epoch_start_time: string;
  epoch_counting_started: boolean;
  current_epoch_start_height: string;
}
export interface Erc20 {
  params: Params4;
  token_pairs?: null[] | null;
}
export interface Params4 {
  enable_erc20: boolean;
  enable_evm_hook: boolean;
}
export interface Evidence1 {
  evidence?: null[] | null;
}
export interface Evm {
  accounts?: null[] | null;
  params: Params5;
}
export interface Params5 {
  evm_denom: string;
  enable_create: boolean;
  enable_call: boolean;
  extra_eips?: null[] | null;
  chain_config: ChainConfig;
  allow_unprotected_txs: boolean;
  active_precompiles?: string[] | null;
}
export interface ChainConfig {
  homestead_block: string;
  dao_fork_block: string;
  dao_fork_support: boolean;
  eip150_block: string;
  eip150_hash: string;
  eip155_block: string;
  eip158_block: string;
  byzantium_block: string;
  constantinople_block: string;
  petersburg_block: string;
  istanbul_block: string;
  muir_glacier_block: string;
  berlin_block: string;
  london_block: string;
  arrow_glacier_block: string;
  gray_glacier_block: string;
  merge_netsplit_block: string;
  shanghai_block: string;
  cancun_block: string;
}
export interface Feegrant {
  allowances?: null[] | null;
}
export interface Feemarket {
  params: Params6;
  block_gas: string;
}
export interface Params6 {
  no_base_fee: boolean;
  base_fee_change_denominator: number;
  elasticity_multiplier: number;
  enable_height: string;
  base_fee: string;
  min_gas_price: string;
  min_gas_multiplier: string;
}
export interface Genutil {
  gen_txs?: null[] | null;
}
export interface Gov {
  starting_proposal_id: string;
  deposits?: null[] | null;
  votes?: null[] | null;
  proposals?: null[] | null;
  deposit_params?: null;
  voting_params?: null;
  tally_params?: null;
  params: Params7;
}
export interface Params7 {
  min_deposit?: ConstantFeeOrMinDepositEntity[] | null;
  max_deposit_period: string;
  voting_period: string;
  quorum: string;
  threshold: string;
  veto_threshold: string;
  min_initial_deposit_ratio: string;
  burn_vote_quorum: boolean;
  burn_proposal_deposit_prevote: boolean;
  burn_vote_veto: boolean;
}
export interface Ibc {
  client_genesis: ClientGenesis;
  connection_genesis: ConnectionGenesis;
  channel_genesis: ChannelGenesis;
}
export interface ClientGenesis {
  clients?: null[] | null;
  clients_consensus?: null[] | null;
  clients_metadata?: null[] | null;
  params: Params8;
  create_localhost: boolean;
  next_client_sequence: string;
}
export interface Params8 {
  allowed_clients?: string[] | null;
}
export interface ConnectionGenesis {
  connections?: null[] | null;
  client_connection_paths?: null[] | null;
  next_connection_sequence: string;
  params: Params9;
}
export interface Params9 {
  max_expected_time_per_block: string;
}
export interface ChannelGenesis {
  channels?: null[] | null;
  acknowledgements?: null[] | null;
  commitments?: null[] | null;
  receipts?: null[] | null;
  send_sequences?: null[] | null;
  recv_sequences?: null[] | null;
  ack_sequences?: null[] | null;
  next_channel_sequence: string;
}
export interface Incentives {
  params: Params10;
  incentives?: null[] | null;
  gas_meters?: null[] | null;
}
export interface Params10 {
  enable_incentives: boolean;
  allocation_limit: string;
  incentives_epoch_identifier: string;
  reward_scaler: string;
}
export interface Inflation {
  params: Params11;
  period: string;
  epoch_identifier: string;
  epochs_per_period: string;
  skipped_epochs: string;
}
export interface Params11 {
  mint_denom: string;
  exponential_calculation: ExponentialCalculation;
  inflation_distribution: InflationDistribution;
  enable_inflation: boolean;
}
export interface ExponentialCalculation {
  a: string;
  r: string;
  c: string;
  bonding_target: string;
  max_variance: string;
}
export interface InflationDistribution {
  staking_rewards: string;
  usage_incentives: string;
  community_pool: string;
}
export interface Interchainaccounts {
  controller_genesis_state: ControllerGenesisState;
  host_genesis_state: HostGenesisState;
}
export interface ControllerGenesisState {
  active_channels?: null[] | null;
  interchain_accounts?: null[] | null;
  ports?: null[] | null;
  params: Params12;
}
export interface Params12 {
  controller_enabled: boolean;
}
export interface HostGenesisState {
  active_channels?: null[] | null;
  interchain_accounts?: null[] | null;
  port: string;
  params: Params13;
}
export interface Params13 {
  host_enabled: boolean;
  allow_messages?: string[] | null;
}
export interface Recovery {
  params: Params14;
}
export interface Params14 {
  enable_recovery: boolean;
  packet_timeout_duration: string;
}
export interface Revenue {
  params: Params15;
  revenues?: null[] | null;
}
export interface Params15 {
  enable_revenue: boolean;
  developer_shares: string;
  addr_derivation_cost_create: string;
}
export interface Slashing {
  params: Params16;
  signing_infos?: null[] | null;
  missed_blocks?: null[] | null;
}
export interface Params16 {
  signed_blocks_window: string;
  min_signed_per_window: string;
  downtime_jail_duration: string;
  slash_fraction_double_sign: string;
  slash_fraction_downtime: string;
}
export interface Staking {
  params: Params17;
  last_total_power: string;
  last_validator_powers?: null[] | null;
  validators?: null[] | null;
  delegations?: null[] | null;
  unbonding_delegations?: null[] | null;
  redelegations?: null[] | null;
  exported: boolean;
}
export interface Params17 {
  unbonding_time: string;
  max_validators: number;
  max_entries: number;
  historical_entries: number;
  bond_denom: string;
  min_commission_rate: string;
}
export interface Transfer {
  port_id: string;
  denom_traces?: null[] | null;
  params: Params18;
  total_escrowed?: null[] | null;
}
export interface Params18 {
  send_enabled: boolean;
  receive_enabled: boolean;
}
export interface UpgradeOrVesting {}
