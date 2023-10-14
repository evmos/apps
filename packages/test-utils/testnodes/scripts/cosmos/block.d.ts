export interface Block {
  type: string;
  value: Value;
}
export interface Value {
  block: Block1;
  result_begin_block: ResultBeginBlock;
  result_end_block: ResultEndBlock;
}
export interface Block1 {
  header: Header;
  data: Data;
  evidence: Evidence;
  last_commit: LastCommit;
}
export interface Header {
  version: Version;
  chain_id: string;
  height: string;
  time: string;
  last_block_id: LastBlockIdOrBlockId;
  last_commit_hash: string;
  data_hash: string;
  validators_hash: string;
  next_validators_hash: string;
  consensus_hash: string;
  app_hash: string;
  last_results_hash: string;
  evidence_hash: string;
  proposer_address: string;
}
export interface Version {
  block: string;
}
export interface LastBlockIdOrBlockId {
  hash: string;
  parts: Parts;
}
export interface Parts {
  total: number;
  hash: string;
}
export interface Data {
  txs?: unknown[];
}
export interface Evidence {
  evidence?: null[] | null;
}
export interface LastCommit {
  height: string;
  round: number;
  block_id: LastBlockIdOrBlockId;
  signatures?: null[] | null;
}
export interface ResultBeginBlock {
  events?: EventsEntity[] | null;
}
export interface EventsEntity {
  type: string;
  attributes?: AttributesEntity[] | null;
}
export interface AttributesEntity {
  key: string;
  value: string;
  index: boolean;
}
export interface ResultEndBlock {
  validator_updates?: null[] | null;
  consensus_param_updates: ConsensusParamUpdates;
  events?: EventsEntity[] | null;
}
export interface ConsensusParamUpdates {
  block: Block2;
  evidence: Evidence1;
  validator: Validator;
  version: Version1;
}
export interface Block2 {
  max_bytes: string;
  max_gas: string;
}
export interface Evidence1 {
  max_age_num_blocks: string;
  max_age_duration: string;
  max_bytes: string;
}
export interface Validator {
  pub_key_types?: string[] | null;
}
export interface Version1 {}
