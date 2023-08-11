import {
  EthSignType,
  Keplr,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import { Chain, Connector } from "@wagmi/core";
import { getKeplrProvider } from "../utils/keplr";
import { evmos, evmosTestnet, getEvmosChainInfo } from "./chains";
import { assertIf, raise } from "helpers";

import { ethToEvmos, evmosToEth } from "@evmos/address-converter";
import { Address, createWalletClient, custom, toHex } from "viem";

const evmosInfo = getEvmosChainInfo();

// Right now this only supports evmos, but it'd be nice to figure out how to support
// other chains as well.
const COSMOS_ID_MAP = {
  [evmos.id]: evmos.cosmosId,
  [evmosTestnet.id]: evmosTestnet.cosmosId,
} as const;

const ADDRESS_ENCODERS: Record<
  keyof typeof COSMOS_ID_MAP,
  (address: string) => string
> = {
  [evmos.id]: ethToEvmos,
  [evmosTestnet.id]: ethToEvmos,
};

export class KeplrConnector extends Connector<Keplr, {}> {
  readonly id = "keplr";
  readonly name = "Keplr";
  readonly ready = true;
  provider: Keplr | null = null;
  offlineSigner: (OfflineAminoSigner & OfflineDirectSigner) | null = null;

  /**
   * Keplr deals with networks differently
   * In a way you're always connected
   * to all networks at once with your keystore wallet
   * so we handle the active chain here, and use that to know which
   * chain user actions should be applied to.
   */
  chainId: number = -1;

  constructor(config: { chains?: Chain[] }) {
    super({
      ...config,
      options: {},
    });
  }

  async getPubkey() {
    const signer = await this.getSigner();
    const [account] = await signer.getAccounts();
    assertIf(account, "ACCOUNT_NOT_FOUND");
    return account.pubkey;
  }
  async getProvider() {
    if (this.provider) return this.provider;
    const provider = await getKeplrProvider();
    provider.defaultOptions = {
      sign: {
        preferNoSetFee: true,
      },
    };
    this.provider = provider;

    return provider;
  }
  async getSigner() {
    if (this.offlineSigner) return this.offlineSigner;
    const provider = await this.getProvider();

    const cosmosId =
      this.chainId in COSMOS_ID_MAP
        ? COSMOS_ID_MAP[this.chainId as keyof typeof COSMOS_ID_MAP]
        : evmosInfo.cosmosId;

    assertIf(cosmosId, "UNSUPPORTED_NETWORK");

    const signer = provider.getOfflineSigner(cosmosId);
    this.offlineSigner = signer;
    return signer;
  }

  async getAccount() {
    const signer = await this.getSigner();
    const [account] = await signer.getAccounts();
    assertIf(account, "ACCOUNT_NOT_FOUND");
    return evmosToEth(account.address) as Address;
  }
  // This has to be a promise to conform to the interface
  // eslint-disable-next-line @typescript-eslint/require-await
  async getChainId(): Promise<number> {
    return this.chainId;
  }

  async connect(config?: { chainId?: number }) {
    // TODO: Add event listeners here
    const account = await this.getAccount();
    let chainId = config?.chainId;
    if (!chainId || !(chainId in COSMOS_ID_MAP)) {
      chainId = this.chains.find(({ id }) => id in COSMOS_ID_MAP)?.id;
      assertIf(chainId, "UNSUPPORTED_NETWORK");
    }
    this.chainId = chainId;
    return {
      account,
      chain: {
        id: chainId,
        unsupported: !(chainId in COSMOS_ID_MAP),
      },
    };
  }
  async disconnect() {
    // do nothing for now.. clear events events later
  }
  async isAuthorized() {
    if (this.storage?.getItem("wallet") !== this.id) return false;
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }
  protected isChainUnsupported(chainId: number) {
    return chainId in COSMOS_ID_MAP;
  }
  async getCosmosId(chainId?: number) {
    chainId ??= await this.getChainId();

    assertIf(this.isChainUnsupported(chainId), "UNSUPPORTED_NETWORK");

    const cosmosId =
      COSMOS_ID_MAP[chainId as keyof typeof COSMOS_ID_MAP] ??
      raise("UNSUPPORTED_NETWORK");
    return cosmosId;
  }
  async getWalletClient({ chainId }: { chainId?: number } = {}) {
    chainId ??= await this.getChainId();

    assertIf(this.isChainUnsupported(chainId), "UNSUPPORTED_NETWORK");

    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ]);
    const chain = this.chains.find((x) => x.id === chainId);

    const cosmosId = await this.getCosmosId(chainId);

    if (!provider || !cosmosId) throw new Error("provider is required.");
    const bech32Address =
      ADDRESS_ENCODERS[chainId as keyof typeof ADDRESS_ENCODERS](account);
    return createWalletClient({
      account,
      chain,
      transport: custom({
        async request({
          method,
          params,
        }: {
          method: string;
          params: string[];
        }) {
          switch (method) {
            case "personal_sign": {
              const signature = await provider.signEthereum(
                cosmosId,
                bech32Address,
                params[0],
                EthSignType.MESSAGE
              );
              return toHex(signature);
            }

            case "account_signTransaction": {
              const signature = await provider.signEthereum(
                cosmosId,
                bech32Address,
                params[0],
                EthSignType.TRANSACTION
              );
              return toHex(signature);
            }
            case "eth_signTypedData_v4": {
              const signature = await provider.signEthereum(
                cosmosId,
                bech32Address,
                params[1],
                EthSignType.EIP712
              );
              return toHex(signature);
            }
          }
          raise("UNSUPPORTED_SIGN_METHOD");
        },
      }),
    });
  }

  protected onAccountsChanged(): void {
    throw new Error("Method not implemented.");
  }
  protected onChainChanged(): void {
    throw new Error("Method not implemented.");
  }
  protected onDisconnect(): void {}
  // This has to be a promise to conform to the interface
  // eslint-disable-next-line @typescript-eslint/require-await
  async switchChain(chainId: number): Promise<Chain> {
    const chain = this.chains.find(({ id }) => id === chainId);
    assertIf(chain, "UNSUPPORTED_NETWORK");
    if (chainId === this.chainId) return chain;
    this.chainId = chainId;
    this.offlineSigner = null;
    return chain;
  }
}
