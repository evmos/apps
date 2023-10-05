/**
 * Main Base Config Options
 */
export interface BaseConfig {
  /**
   * TCP or UNIX socket address of the ABCI application,
   * or the name of an ABCI application compiled in with the CometBFT binary.
   * @default "tcp://127.0.0.1:26658"
   */
  proxy_app: string;

  /**
   * A custom human readable name for this node.
   * @default "localtestnet"
   */
  moniker: string;

  /**
   * If this node is many blocks behind the tip of the chain, BlockSync
   * allows them to catch up quickly by downloading blocks in parallel
   * and verifying their commits. Deprecated: this key will be removed
   * and BlockSync will be enabled unconditionally in the next major release.
   * @default true
   */
  block_sync: boolean;

  /**
   * Database backend options:
   * - goleveldb (most popular implementation, pure go, stable)
   * - cleveldb (fast, requires gcc)
   * - boltdb (EXPERIMENTAL, may be faster in some use-cases)
   * - rocksdb (EXPERIMENTAL, requires gcc)
   * - badgerdb (EXPERIMENTAL)
   * @default "goleveldb"
   */
  db_backend: "goleveldb" | "cleveldb" | "boltdb" | "rocksdb" | "badgerdb";

  /**
   * Database directory.
   * @default "data"
   */
  db_dir: string;

  /**
   * Output level for logging, including package level options.
   * @default "info"
   */
  log_level: string;

  /**
   * Output format options: 'plain' (colored text) or 'json'.
   * @default "plain"
   */
  log_format: "plain" | "json";

  /**
   * Path to the JSON file containing the initial validator set and other meta data.
   * @default "config/genesis.json"
   */
  genesis_file: string;

  /**
   * Path to the JSON file containing the private key to use as a validator in the consensus protocol.
   * @default "config/priv_validator_key.json"
   */
  priv_validator_key_file: string;

  /**
   * Path to the JSON file containing the last sign state of a validator.
   * @default "data/priv_validator_state.json"
   */
  priv_validator_state_file: string;

  /**
   * TCP or UNIX socket address for CometBFT to listen on for
   * connections from an external PrivValidator process.
   * @default ""
   */
  priv_validator_laddr: string;

  /**
   * Path to the JSON file containing the private key to use for node authentication in the p2p protocol.
   * @default "config/node_key.json"
   */
  node_key_file: string;

  /**
   * Mechanism to connect to the ABCI application: socket | grpc.
   * @default "socket"
   */
  abci: "socket" | "grpc";

  /**
   * If true, query the ABCI app on connecting to a new peer
   * so the app can decide if we should keep the connection or not.
   * @default false
   */
  filter_peers: boolean;

  rpc: RpcServerConfig;

  p2p: P2PConfig;

  mempool: MempoolConfig;

  statesync: StateSyncConfig;

  blocksync: BlockSyncConfig;

  consensus: ConsensusConfig;

  storage: StorageConfig;

  tx_index: TxIndexConfig;

  instrumentation: InstrumentationConfig;
}
/**
 * RPC Server Configuration Options
 */
export interface RpcServerConfig {
  /**
   * TCP or UNIX socket address for the RPC server to listen on.
   * @default "tcp://127.0.0.1:26657"
   */
  laddr: string;

  /**
   * A list of origins a cross-domain request can be executed from.
   * Default value '[]' disables cors support.
   * Use '["*"]' to allow any origin.
   * @default []
   */
  cors_allowed_origins: string[];

  /**
   * A list of methods the client is allowed to use with cross-domain requests.
   * @default ["HEAD", "GET", "POST"]
   */
  cors_allowed_methods: ("HEAD" | "GET" | "POST")[];

  /**
   * A list of non-simple headers the client is allowed to use with cross-domain requests.
   * @default ["Origin", "Accept", "Content-Type", "X-Requested-With", "X-Server-Time"]
   */
  cors_allowed_headers: string[];

  /**
   * TCP or UNIX socket address for the gRPC server to listen on.
   * NOTE: This server only supports /broadcast_tx_commit.
   * @default ""
   */
  grpc_laddr: string;

  /**
   * Maximum number of simultaneous connections.
   * Does not include RPC (HTTP&WebSocket) connections.
   * If you want to accept a larger number than the default, make sure you increase your OS limits.
   * @default 900
   */
  grpc_max_open_connections: number;

  /**
   * Activate unsafe RPC commands like /dial_seeds and /unsafe_flush_mempool.
   * @default false
   */
  unsafe: boolean;

  /**
   * Maximum number of simultaneous connections (including WebSocket).
   * Does not include gRPC connections.
   * If you want to accept a larger number than the default, make sure you increase your OS limits.
   * @default 900
   */
  max_open_connections: number;

  /**
   * Maximum number of unique clientIDs that can /subscribe.
   * If you're using /broadcast_tx_commit, set to the estimated maximum number of broadcast_tx_commit calls per block.
   * @default 100
   */
  max_subscription_clients: number;

  /**
   * Maximum number of unique queries a given client can /subscribe to.
   * If you're using GRPC (or Local RPC client) and /broadcast_tx_commit, set to the estimated maximum number of broadcast_tx_commit calls per block.
   * @default 5
   */
  max_subscriptions_per_client: number;

  /**
   * Experimental parameter to specify the maximum number of events a node will buffer, per subscription, before returning an error and closing the subscription.
   * @default 200
   */
  experimental_subscription_buffer_size: number;

  /**
   * Experimental parameter to specify the maximum number of RPC responses that can be buffered per WebSocket client.
   * @default 200
   */
  experimental_websocket_write_buffer_size: number;

  /**
   * If a WebSocket client cannot read fast enough, enabling this experimental parameter will cause the WebSocket connection to be closed.
   * @default false
   */
  experimental_close_on_slow_client: boolean;

  /**
   * How long to wait for a tx to be committed during /broadcast_tx_commit.
   * @default "10s"
   */
  timeout_broadcast_tx_commit: string;

  /**
   * Maximum size of request body, in bytes.
   * @default 1000000
   */
  max_body_bytes: number;

  /**
   * Maximum size of request header, in bytes.
   * @default 1048576
   */
  max_header_bytes: number;

  /**
   * The path to a file containing certificate that is used to create the HTTPS server.
   * @default ""
   */
  tls_cert_file: string;

  /**
   * The path to a file containing matching private key that is used to create the HTTPS server.
   * @default ""
   */
  tls_key_file: string;

  /**
   * pprof listen address (https://golang.org/pkg/net/http/pprof).
   * @default "localhost:6060"
   */
  pprof_laddr: string;
}

/**
 * P2P Configuration Options
 */
export interface P2PConfig {
  /**
   * Address to listen for incoming connections.
   * @default "tcp://0.0.0.0:26656"
   */
  laddr: string;

  /**
   * Address to advertise to peers for them to dial.
   * @default ""
   */
  external_address: string;

  /**
   * Comma separated list of seed nodes to connect to.
   * @default ""
   */
  seeds: string;

  /**
   * Comma separated list of nodes to keep persistent connections to.
   * @default ""
   */
  persistent_peers: string;

  /**
   * UPNP port forwarding.
   * @default false
   */
  upnp: boolean;

  /**
   * Path to address book.
   * @default "config/addrbook.json"
   */
  addr_book_file: string;

  /**
   * Set true for strict address routability rules, false for private or local networks.
   * @default true
   */
  addr_book_strict: boolean;

  /**
   * Maximum number of inbound peers.
   * @default 240
   */
  max_num_inbound_peers: number;

  /**
   * Maximum number of outbound peers to connect to, excluding persistent peers.
   * @default 30
   */
  max_num_outbound_peers: number;

  /**
   * List of node IDs, to which a connection will be (re)established ignoring any existing limits.
   * @default ""
   */
  unconditional_peer_ids: string;

  /**
   * Maximum pause when redialing a persistent peer.
   * @default "0s"
   */
  persistent_peers_max_dial_period: `${number}${"s" | "ms"}`;

  /**
   * Time to wait before flushing messages out on the connection.
   * @default "100ms"
   */
  flush_throttle_timeout: `${number}${"s" | "ms"}`;

  /**
   * Maximum size of a message packet payload, in bytes.
   * @default 1024
   */
  max_packet_msg_payload_size: number;

  /**
   * Rate at which packets can be sent, in bytes/second.
   * @default 5120000
   */
  send_rate: number;

  /**
   * Rate at which packets can be received, in bytes/second.
   * @default 5120000
   */
  recv_rate: number;

  /**
   * Set true to enable the peer-exchange reactor.
   * @default true
   */
  pex: boolean;

  /**
   * Seed mode for crawling the network and looking for peers.
   * @default false
   */
  seed_mode: boolean;

  /**
   * Comma separated list of peer IDs to keep private.
   * @default ""
   */
  private_peer_ids: string;

  /**
   * Toggle to disable guard against peers connecting from the same ip.
   * @default false
   */
  allow_duplicate_ip: boolean;

  /**
   * Peer connection configuration: handshake timeout.
   * @default "20s"
   */
  handshake_timeout: `${number}${"s" | "ms"}`;

  /**
   * Peer connection configuration: dial timeout.
   * @default "3s"
   */
  dial_timeout: `${number}${"s" | "ms"}`;
}

/**
 * Mempool Configuration Options
 */
export interface MempoolConfig {
  /**
   * Mempool version to use.
   * - "v0" for FIFO mempool.
   * - "v1" for prioritized mempool.
   * @default "v0"
   */
  version: "v0" | "v1";

  /**
   * Recheck option.
   * @default true
   */
  recheck: boolean;

  /**
   * Broadcast option.
   * @default true
   */
  broadcast: boolean;

  /**
   * Directory for the Write-Ahead Log.
   * @default ""
   */
  wal_dir: string;

  /**
   * Maximum number of transactions in the mempool.
   * @default 10000
   */
  size: number;

  /**
   * Limit the total size of all txs in the mempool.
   * @default 1073741824
   */
  max_txs_bytes: number;

  /**
   * Size of the cache (used to filter transactions seen earlier) in transactions.
   * @default 10000
   */
  cache_size: number;

  /**
   * Do not remove invalid transactions from the cache.
   * @default false
   */
  keep_invalid_txs_in_cache: boolean;

  /**
   * Maximum size of a single transaction.
   * @default 1048576
   */
  max_tx_bytes: number;

  /**
   * Maximum size of a batch of transactions to send to a peer.
   * @default 0
   */
  max_batch_bytes: number;

  /**
   * ttl-duration, if non-zero, defines the maximum amount of time a transaction can exist for in the mempool.
   * @default  "0s"
   */
  ttl_duration: `${number}${"s" | "ms"}`;

  /**
   * ttl-num-blocks, if non-zero, defines the maximum number of blocks a transaction can exist for in the mempool.
   * @default 0
   */
  ttl_num_blocks: number;
}

/**
 * State Sync Configuration Options
 */
export interface StateSyncConfig {
  /**
   * State sync rapidly bootstraps a new node by discovering, fetching, and restoring a state machine snapshot.
   * @default false
   */
  enable: boolean;

  /**
   * RPC servers for light client verification of the synced state machine and retrieval of state data for node bootstrapping.
   * @default ""
   */
  rpc_servers: string;

  /**
   * A trusted block height.
   * @default 0
   */
  trust_height: number;

  /**
   * A corresponding header hash obtained from a trusted source.
   * @default ""
   */
  trust_hash: string;

  /**
   * Period during which validators can be trusted. For Cosmos SDK-based chains, should usually be about 2/3 of the unbonding time.
   * @default "112h0m0s"
   */
  trust_period: `${number}h${number}m${number}s`;

  /**
   * Time to spend discovering snapshots before initiating a restore.
   * @default "15s"
   */
  discovery_time: `${number}${"s" | "ms"}`;

  /**
   * Temporary directory for state sync snapshot chunks.
   * @default ""
   */
  temp_dir: string;

  /**
   * The timeout duration before re-requesting a chunk.
   * @default "10s"
   */
  chunk_request_timeout: `${number}${"s" | "ms"}`;

  /**
   * The number of concurrent chunk fetchers to run.
   * @default "4"
   */
  chunk_fetchers: string;
}

/**
 * Block Sync Configuration Options
 */
export interface BlockSyncConfig {
  /**
   * Block Sync version to use. In v0.37, v1 and v2 of the block sync protocols were deprecated.
   * Please use "v0" instead.
   * @default "v0"
   */
  version: "v0";
}

/**
 * Consensus Configuration Options
 */
export interface ConsensusConfig {
  /**
   * Path for the write-ahead log.
   * @default "data/cs.wal/wal"
   */
  wal_file: string;

  /**
   * How long to wait for a proposal block before prevoting nil.
   * @default "3s"
   */
  timeout_propose: `${number}${"s" | "ms"}`;

  /**
   * How much timeout_propose increases with each round.
   * @default "500ms"
   */
  timeout_propose_delta: `${number}${"s" | "ms"}`;

  /**
   * How long to wait after receiving +2/3 prevotes for any block.
   * @default "1s"
   */
  timeout_prevote: `${number}${"s" | "ms"}`;

  /**
   * How much the timeout_prevote increases with each round.
   * @default "500ms"
   */
  timeout_prevote_delta: `${number}${"s" | "ms"}`;

  /**
   * How long to wait after receiving +2/3 precommits for any block.
   * @default "1s"
   */
  timeout_precommit: `${number}${"s" | "ms"}`;

  /**
   * How much the timeout_precommit increases with each round.
   * @default "500ms"
   */
  timeout_precommit_delta: `${number}${"s" | "ms"}`;

  /**
   * How long to wait after committing a block, before starting on the new height.
   * @default "3s"
   */
  timeout_commit: `${number}${"s" | "ms"}`;

  /**
   * How many blocks to look back to check existence of the node's consensus votes before joining consensus.
   * @default 0
   */
  double_sign_check_height: number;

  /**
   * Make progress as soon as we have all the precommits.
   * @default false
   */
  skip_timeout_commit: boolean;

  /**
   * EmptyBlocks mode and possible interval between empty blocks.
   * @default true
   */
  create_empty_blocks: boolean;

  /**
   * Interval for creating empty blocks.
   * @default "0s"
   */
  create_empty_blocks_interval: `${number}${"s" | "ms"}`;

  /**
   * Reactor sleep duration parameters for gossip between peers.
   * @default "100ms"
   */
  peer_gossip_sleep_duration: `${number}${"s" | "ms"}`;

  /**
   * Reactor sleep duration parameters for querying majority of prevotes and precommits.
   * @default "2s"
   */
  peer_query_maj23_sleep_duration: `${number}${"s" | "ms"}`;
}

/**
 * Storage Configuration Options
 */
export interface StorageConfig {
  /**
   * Whether to discard ABCI responses from the state store. Setting this to true can save disk space.
   * However, setting it to false ensures ABCI responses are persisted, which are required for /block_results RPC queries
   * and to reindex events in the command-line tool.
   * @default false
   */
  discard_abci_responses: boolean;
}

/**
 * Transaction Indexer Configuration Options
 */
export interface TxIndexConfig {
  /**
   * The indexer to use for transactions. Options include:
   * - "null"
   * - "kv" - the simplest indexer, backed by key-value storage.
   * - "psql" - indexer services backed by PostgreSQL.
   * For "kv" and "psql", "tx.height" and "tx.hash" will always be indexed.
   * @default "kv"
   */
  indexer: "null" | "kv" | "psql";

  /**
   * The PostgreSQL connection configuration.
   * Format: postgresql://<user>:<password>@<host>:<port>/<db>?<opts>
   * @default ""
   */
  psql_conn: string;
}

/**
 * Instrumentation Configuration Options
 */
export interface InstrumentationConfig {
  /**
   * Whether to serve Prometheus metrics under /metrics on PrometheusListenAddr.
   * @default false
   */
  prometheus: boolean;

  /**
   * Address to listen for Prometheus collector(s) connections.
   * @default ":26660"
   */
  prometheus_listen_addr: string;

  /**
   * Maximum number of simultaneous connections. If you want to accept a larger number
   * than the default, ensure you increase your OS limits.
   * @default 3
   */
  max_open_connections: number;

  /**
   * Instrumentation namespace.
   * @default "cometbft"
   */
  namespace: string;
}
