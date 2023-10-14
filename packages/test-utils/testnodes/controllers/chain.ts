import { ChainNode } from "./node";

export class Chain {
  constructor(
    public options: ChainOptions,
    public node: ChainNode
  ) {}

  static async init(
    options: ChainOptions,
    node: ChainNode = ChainNode.create(options.node)
  ) {
    const chain = new Chain(options, node);

    await chain.node.init();
    await chain.node.setupConfigFiles();
    await Promise.all(
      options.genesis.validators.map(async ({ key, passphrase }) =>
        chain.node.addAccountFromMnemonic(key, passphrase)
      )
    );
    // await chain.node
    //   .genesisTx

    //   // options.node.keyring.key,
    //   // options.genesis.stakeAmount,
    //   // options.node.keyring.keyring
    //   ();
    return chain;
  }
}
