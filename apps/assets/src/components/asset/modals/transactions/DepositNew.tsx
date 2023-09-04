import { useAccount } from "wagmi";
import { CryptoSelect } from "./components/CryptoSelect";
import { useAssets } from "../../table/useConnectedAccountAssets";
import {
  ComponentProps,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { groupBy, omit } from "lodash-es";
import { useQuery } from "@tanstack/react-query";
import { EVMOS_BACKEND, apiIBCTransfer, getKeplrProvider } from "evmos-wallet";
import { E, clamp, cn, toIBCDenom } from "helpers";
import { set, z } from "zod";
import { formatUnits, parseUnits } from "viem";
import { isUndefined } from "helpers/src/assertions";
import { AddressInput } from "ui-helpers";
import { Maybe } from "helpers/src/types";
import Image from "next/image";

type Nullable<T> = T | null;
const suggestChain = async (networkId: string) => {
  const keplr = await getKeplrProvider();

  if (networkId === "crescent-1") {
    await keplr.experimentalSuggestChain(
      await import("chainapsis-suggest-chain/cosmos/crescent.json")
    );
  }
  throw Error("CHAIN_NOT_SUPPORTED");
};
const useKeplrAccount = (networkId?: Nullable<string>) => {
  const { data, ...rest } = useQuery({
    queryKey: ["keplrKey", networkId],
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!networkId) {
        return;
      }
      const [keplrErr, keplr] = await E.try(() => getKeplrProvider());
      if (keplrErr) {
        throw Error("KEPLR_NOT_FOUND");
      }

      const [enableError] = await E.try(() => keplr.enable(networkId));

      if (E.match.byPattern(enableError, /no chain info for/gi)) {
        const [suggestChainError] = await E.try(() => suggestChain(networkId));
        if (suggestChainError) {
          if (E.match.byPattern(suggestChainError, /Request rejected/gi)) {
            throw Error("USER_REJECTED");
          }
          throw Error("CHAIN_NOT_SUPPORTED");
        }
      }

      const [keyError, key] = await E.try(() => keplr.getKey(networkId));

      if (keyError) {
        throw Error("USER_REJECTED");
      }
      return key;
    },
    enabled: !!networkId,
  });
  return { account: data, ...rest };
};

const { fromEntries, entries, values } = Object;

const useChains = () => {
  const { data, ...rest } = useAssets();
  const chains = useMemo(() => {
    if (!data) {
      return {};
    }
    const balancesByChain = groupBy(data.balance, (item) => item.prefix);
    return fromEntries(
      entries(balancesByChain).map(([prefix, balances]) => {
        const { chainIdentifier, chainId, handledByExternalUI, name } =
          balances[0];
        return [
          prefix,
          {
            name,
            chainId,
            chainIdentifier,
            prefix,
            handledByExternalUI,
            tokens: balances,
          },
        ];
      })
    );
  }, [data]);
  return { chains, ...rest };
};
const useTokens = () => {
  const { data, ...rest } = useAssets();
  console.log(data);
  const tokensMap = useMemo(() => {
    if (!data) return {};
    return fromEntries(data.balance.map((item) => [item.symbol, item]));
  }, [data]);
  return { tokens: tokensMap, ...rest };
};
const CHANNEL_PAIRS_MAP: Record<string, [string, string]> = {
  axelar: ["channel-22", "channel-21"],
  comdex: ["channel-35", "channel-26"],
  cosmos: ["channel-292", "channel-3"],
  cre: ["channel-7", "channel-11"],
  emoney: ["channel-28", "channel-24"],
  gravity: ["channel-65", "channel-8"],
  inj: ["channel-83", "channel-10"],
  juno: ["channel-70", "channel-5"],
  osmo: ["channel-204", "channel-0"],
  quick: ["channel-7", "channel-37"],
  regen: ["channel-44", "channel-20"],
  stars: ["channel-46", "channel-13"],
  stride: ["channel-9", "channel-25"],
  tori: ["channel-1", "channel-35"],
};

const useTokenBalance = (
  tokenIdentifier?: Nullable<string>,
  address?: Nullable<string>,
  balanceType?: "ERC20" | "ICS20"
) => {
  const { tokens, ...tokensState } = useTokens();
  const { chains, ...chainsState } = useChains();

  const accountPrefix = address?.split("1")[0] ?? "";

  const token = tokenIdentifier ? tokens[tokenIdentifier] : null;
  const chain = accountPrefix in chains ? chains[accountPrefix] : null;

  console.log({
    tokenIdentifier,
    address,
  });
  const { data, ...balanceState } = useQuery({
    queryKey: ["tokenBalance", token?.tokenIdentifier, address],
    queryFn: async () => {
      if (!token || !address || !chain) return;

      /**
       * CASE: Any token in EVMOS Chain
       *
       * If the network is EVMOS, we already have the balances from the assets lists
       * but we need to specify which type, ERC20 or ICS20
       *
       * Unless specified, default to ERC20 tokens for EVMOS chain
       * Reason: most of them will be automatically converted to ERC20 representations
       * The main situation were we would want ICS20 is to get the evmos token balance itself for
       * paying for fees, in that case, that needs to be explicitly specified through the balanceType parameter
       */
      if (chain.prefix === "evmos") {
        if (balanceType === "ICS20") {
          return BigInt(token.cosmosBalance);
        }
        return BigInt(token.erc20Address);
      }
      const network = chains[chain.prefix].chainIdentifier.toUpperCase();
      /**
       * Lets start with the token identifier as denom, because our current api does the work of mapping that
       * to the correct denom for most cases
       * Exceptions will be covered below
       */
      let denom = tokenIdentifier;
      /**
       * CASE: EVMOS native Token in COSMOS Chain
       *
       * If it's an EVMOS token, held by a non-EVMOS chain, we need to get the IBC representation
       */

      if (token.prefix === "evmos" && chain.prefix !== "evmos") {
        const channelPair = CHANNEL_PAIRS_MAP[chain.prefix];
        const [channel] = channelPair;

        const ibcDenom = toIBCDenom(
          "transfer",
          channel,
          /**
           * If its evmos native token, we use the minCoinDenom (hardcoded here), otherwise we use the `erc/${contractAddress}` format
           */
          token.symbol === "EVMOS" ? "aevmos" : `erc20/${token.erc20Address}`
        );
        denom = encodeURIComponent(ibcDenom);
      }

      const response = await fetch(
        `${EVMOS_BACKEND}/BalanceByNetworkAndDenom/${network.toUpperCase()}/${denom}/${address}`
      );
      const json = (await response.json()) as unknown;

      return z
        .object({
          balance: z.object({
            denom: z.string(),
            amount: z.string().transform((val) => BigInt(val)),
          }),
        })
        .parse(json).balance.amount;
    },
    enabled: !!token && !!address && !!chain,
  });

  const queryState = {
    ...tokensState,
    isLoading: balanceState.isLoading && balanceState.fetchStatus !== "idle",
    error: balanceState.error,
  };

  if (typeof data === "undefined" || !token) {
    return {
      balance: undefined,
      formattedBalance: undefined,
      ...queryState,
    };
  }

  return {
    balance: data,
    formattedBalance: formatUnits(data, parseInt(token.decimals)),
    ...queryState,
  };
};
const getAddressPrefix = (address: string) => {
  if (address.startsWith("0x")) {
    return "evmos";
  }
  const [prefix, hash] = address.split("1");
  if (typeof hash === "undefined") {
    return null;
  }
  return prefix;
};
const usePrepareTransaction = ({
  sender = "",
  receiver = "",
  token,
}: {
  sender?: string;
  receiver?: string;
  token?: {
    denom: string;
    amount: bigint;
  };
}) => {
  // const { chains } = useChains();

  // const senderPrefix = getAddressPrefix(sender);
  // const receiverPrefix = getAddressPrefix(receiver);

  const senderChain = useAccountChain(sender);
  const receiverChain = useAccountChain(receiver);
  // const senderChain =
  //   senderPrefix && senderPrefix in chains ? chains[senderPrefix] : null;
  // const receiverChain =
  //   receiverPrefix && receiverPrefix in chains ? chains[receiverPrefix] : null;

  const { account: senderAccount } = useKeplrAccount(senderChain?.chainId);

  const { data, ...rest } = useQuery({
    queryKey: [
      "prepareTransaction",
      sender,
      receiver,
      token?.denom,
      token?.amount.toString(),
    ],
    enabled: !!senderAccount && !!senderChain && !!receiverChain && !!token,
    queryFn: async () => {
      if (!senderAccount || !senderChain || !receiverChain || !token) {
        return;
      }
      const { pubKey, bech32Address } = senderAccount;

      const prepared = await apiIBCTransfer({
        pubkey: Buffer.from(pubKey).toString("base64"),
        address: senderAccount.bech32Address,
        params: {
          amount: token.amount.toString(),
          token: token.denom,
          receiver: receiver,
          dstChain: receiverChain.chainIdentifier,
          srcChain: senderChain.chainIdentifier,
          sender: bech32Address,
        },
        useERC20Denom: false,
      });

      return {
        tx: prepared,
        fees: prepared.aminoSignDoc,
      };
    },
    // queryKey: ["prepareTransaction", token?.tokenIdentifier, address]
  });
  return {
    tx: data,
    ...rest,
  };
};

const useAccountChain = (address: Maybe<string>) => {
  const { chains } = useChains();
  const prefix = getAddressPrefix(address ?? "");
  return prefix && prefix in chains ? chains[prefix] : null;
};
export function DepositModal() {
  const { chains } = useChains();

  const [selectedChainId, setSelectedChain] = useState<Nullable<string>>(null);
  const [selectedTokenId, setSelectedToken] = useState<Nullable<string>>(null);
  const { tokens } = useTokens();
  const token = selectedTokenId ? tokens[selectedTokenId] : null;
  const [amount, setAmount] = useState<bigint>(0n);
  const [receiver, setReceiver] = useState<string>("");

  const {
    account: senderAccount,
    error: senderAccountError,
    refetch,
  } = useKeplrAccount(
    selectedChainId ? chains[selectedChainId]?.chainId : null
  );

  const senderChain = useAccountChain(senderAccount?.bech32Address);
  const receiverChain = useAccountChain(receiver);

  const tokenBalance = useTokenBalance(
    selectedTokenId,
    senderAccount?.bech32Address
  );
  const tokenOptions = useMemo(() => {
    if (!selectedChainId) {
      return [];
    }
    return [
      // native tokens for the selected chain
      ...chains[selectedChainId].tokens,
      // plus evmos tokens
      ...chains["evmos"].tokens,
    ].map(({ name, symbol, prefix }) => ({
      name: symbol,
      id: symbol,
      icon: `/assets/tokens/${symbol}.png`,
      networkPrefix: prefix,
    }));
  }, [selectedChainId, chains]);

  const test = usePrepareTransaction({
    sender: senderAccount?.bech32Address ?? "",
    receiver,
    token: {
      denom: token?.tokenIdentifier ?? "",
      amount: amount,
    },
  });
  console.log("test", test);
  return (
    <>
      <h1> Deposit modal</h1>
      <CryptoSelect
        options={
          entries(omit(chains, ["evmos"])).map(
            ([chainId, { name, chainIdentifier }]) => ({
              name,
              id: chainId,
              icon: `/assets/chains/${chainIdentifier}.png`,
            })
          ) ?? []
        }
        selected={selectedChainId}
        setSelected={setSelectedChain}
        placeholder="Select chain..."
      />
      {senderAccount && senderAccount.bech32Address}

      {!!senderAccountError &&
        E.match.byMessage(senderAccountError, "USER_REJECTED") && (
          <div className="flex flex-col items-center space-y-3 text-rose-600 text-sm bg-rose-100 rounded-lg p-2">
            <h2>
              Connection rejected. We need you to accept the connection to Keplr
            </h2>
            <button
              className="px-4 py-2 text-white bg-rose-600 rounded"
              onClick={() => refetch()}
            >
              Connect to Keplr
            </button>
          </div>
        )}

      <CryptoSelect
        options={tokenOptions}
        selected={selectedTokenId}
        setSelected={setSelectedToken}
        placeholder="Select token..."
        disabled={!tokenOptions.length}
      />
      {tokenBalance.isLoading && <p>Loading Balance...</p>}
      {tokenBalance.error && (
        <p>Could not load your balance for the selected token</p>
      )}
      {tokenBalance.formattedBalance && (
        <p>
          Balance: {tokenBalance.formattedBalance} ≈ $
          {(
            parseFloat(tokenBalance.formattedBalance) *
            parseFloat(token?.coingeckoPrice)
          ).toFixed(2)}
        </p>
      )}

      <AmountInput
        decimals={token?.decimals}
        disabled={!token}
        value={amount}
        onChange={setAmount}
        max={tokenBalance.balance}
      />

      <AddressInput value={receiver} onChange={setReceiver} />
      <h3 className="flex font-bold">Sending</h3>
      <div className="flex items-center">
        {senderChain && (
          <Image
            className="h-12 w-12"
            src={`/assets/chains/${senderChain.chainIdentifier}.png`}
            width={45}
            height={45}
            alt={senderChain.chainIdentifier}
          />
        )}
        <div className="grow px-4 justify-center flex flex-col items-center">
          <h3 className="text-lg font-bold flex justify-center  gap-x-2">
            <Image
              className="h-6 w-6"
              src={`/assets/tokens/${token?.tokenIdentifier}.png`}
              width={25}
              height={25}
            />
            {formatUnits(amount, parseInt(String(token?.decimals ?? 18)))}{" "}
            {token?.symbol}
          </h3>

          <hr
            className={cn(
              "relative h-1 bg-slate-500 overflow-visible border-0 w-full",
              // arrow
              "after:absolute after:block after:right-0",
              "after:h-4 after:w-4",
              "after:border-t-4 after:border-r-4",
              "after:border-slate-500",
              "after:rotate-45 after:top-1/2 after:-translate-y-1/2"
            )}
          />
          <p>Fee: </p>
        </div>
        {receiverChain && (
          <Image
            className="h-12 w-12"
            src={`/assets/chains/${receiverChain.chainIdentifier}.png`}
            width={25}
            height={25}
            alt={receiverChain.chainIdentifier}
          />
        )}
      </div>
    </>
  );
}

const AmountInput = ({
  value,
  decimals,
  onChange,
  max,
  min = 0n,
  className,

  ...props
}: Omit<ComponentProps<"input">, "value" | "onChange" | "max" | "min"> & {
  decimals?: number | string;
  onChange?: (value: bigint) => void;
  value?: bigint;
  max?: bigint;
  min?: bigint;
}) => {
  const decimalsUnit = parseInt(String(decimals ?? 18));
  const formattedValue = formatUnits(value ?? 0n, decimalsUnit);
  const [internalValueState, setValue] = useState(formattedValue);

  useEffect(() => {
    // amount = clamp(amount, min ?? 0n, max ?? amount);
    setValue((prev) => {
      const parsed = parseUnits(prev, decimalsUnit);
      const amount = clamp(parsed, min, max ?? parsed);
      return formatUnits(amount, decimalsUnit);
    });
  }, [max, min, decimalsUnit]);

  return (
    <div>
      <input
        value={internalValueState}
        className={cn(
          "w-full font-bold border-none py-3 px-4 text-sm leading-5 text-gray-900 focus:ring-1 rounded",
          className
        )}
        onChange={(e) => {
          if (e.target.value.split(".").length > 2) {
            return;
          }

          const [error, parsed] = E.try(() =>
            parseUnits(e.target.value, decimalsUnit)
          );

          if (error) {
            return;
          }
          let amount = parsed;
          if (max || min) {
            amount = clamp(amount, min ?? 0n, max ?? amount);
          }
          setValue(e.target.value);
          if (amount !== value) {
            onChange?.(amount);
          }
        }}
        onBlur={() => {
          const normalizedValue = formatUnits(value ?? 0n, decimalsUnit);
          if (normalizedValue !== internalValueState) {
            setValue(normalizedValue);
          }
        }}
        inputMode="decimal"
        type="text"
        pattern="[0-9]*(.[0-9]+)?"
        role="spinbutton"
        autoComplete="off"
        autoCorrect="off"
        {...props}
        // aria-valuenow="1"
        // aria-valuetext="1"
        // aria-valuemin="0"
        // aria-valuemax="1.826"
      />
      <button
        className=""
        onClick={() => {
          setValue(formatUnits(max ?? 0n, decimalsUnit));
          onChange?.(max ?? 0n);
        }}
      >
        Max
      </button>
    </div>
  );
};
