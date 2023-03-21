import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { addSnackbar } from "../../../components/notification/redux/notificationSlice";
import { BIG_ZERO } from "../../common/math/Bignumbers";
import {
  TableData,
  TableDataElement,
} from "../functionality/table/normalizeData";
import {
  EXECUTED_NOTIFICATIONS,
  INCLUDED_BLOCK_NOTIFICATIONS,
} from "../functionality/transactions/errors";
import {
  checkIBCExecutionStatus,
  checkTxInclusionInABlock,
} from "../functionality/transactions/executedTx";
import { TransactionStatus } from "../functionality/transactions/types";
import { EVMOS_SYMBOL } from "../../wallet/functionality/networkConfig";
import {
  SNACKBAR_CONTENT_TYPES,
  SNACKBAR_TYPES,
} from "../../../components/notification/types";
export function getReservedForFeeText(
  amount: BigNumber,
  token: string,
  network: string
) {
  return `${convertAndFormat(
    amount
  )} ${token} is reserved for transaction fees on the ${network} network.`;
}

export function safeSubstraction(amount: BigNumber, fee: BigNumber) {
  const substraction = amount.sub(fee);
  if (substraction.lte(0)) {
    return BIG_ZERO;
  }
  return substraction;
}

export function convertFromAtto(
  value: BigNumber | BigNumberish,
  exponent = 18
) {
  // Convert to string and truncate past decimal
  // for appropriate conversion
  if (!value) return "0";
  let valueAsString = value.toString();

  if (typeof value === "number") {
    // Strip scientific notation
    valueAsString = Number(value).toLocaleString("fullwide", {
      useGrouping: false,
    });
  }
  return formatUnits(valueAsString.split(".")[0], exponent);
}

export function formatNumber(
  value: string | number | undefined,
  options?: Intl.NumberFormatOptions,
  notation: "standard" | "compact" = "standard"
) {
  if (value === undefined) {
    return "--";
  }

  let valueAsNumber = value;

  if (typeof valueAsNumber === "string") {
    valueAsNumber = Number(valueAsNumber);
  }

  return new Intl.NumberFormat("en-US", {
    notation: notation,
    compactDisplay: "short",
    maximumFractionDigits: 2,
    ...options,
  }).format(valueAsNumber);
}

export function convertAndFormat(value: BigNumber, exponent = 18) {
  return formatNumber(convertFromAtto(value, exponent));
}

export function amountToDollars(
  value: BigNumber,
  decimals: number,
  coingeckoPrice: number
) {
  return (Number(convertFromAtto(value, decimals)) * coingeckoPrice).toFixed(2);
}

export function truncateNumber(number: string) {
  const index = number.indexOf(".");
  // if index is -1 return the string as float
  if (index !== -1) {
    let end = index + 6;
    if (end > number.length) {
      end = number.length;
    }
    return parseFloat(number.substring(0, end));
  } else {
    return parseFloat(number);
  }
}

export function createBigNumber(value: string) {
  // +: check the string by converting the string into a number
  if (!+value) {
    return BigNumber.from("0");
  }
  return BigNumber.from(value);
}

export function snackbarWaitingBroadcast() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: EXECUTED_NOTIFICATIONS.WaitingTitle,
    },
    type: SNACKBAR_TYPES.DEFAULT,
  });
}

export async function snackbarIncludedInBlock(
  txHash: string,
  chain: string,
  explorerTxUrl: string
) {
  const includedInBlock = await checkTxInclusionInABlock(txHash, chain);
  if (includedInBlock !== undefined) {
    if (includedInBlock === TransactionStatus.SUCCESS) {
      return addSnackbar({
        id: 0,
        content:
          explorerTxUrl === ""
            ? {
                type: SNACKBAR_CONTENT_TYPES.TEXT,
                title: INCLUDED_BLOCK_NOTIFICATIONS.SuccessTitle,
              }
            : {
                type: SNACKBAR_CONTENT_TYPES.LINK,
                title: INCLUDED_BLOCK_NOTIFICATIONS.SuccessTitle,
                hash: txHash,
                explorerTxUrl: explorerTxUrl,
              },

        type: SNACKBAR_TYPES.SUCCESS,
      });
    } else {
      return addSnackbar({
        id: 0,
        content: {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: INCLUDED_BLOCK_NOTIFICATIONS.ErrorTitle,
        },
        type: SNACKBAR_TYPES.ERROR,
      });
    }
  }
  // unconfirmed
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: INCLUDED_BLOCK_NOTIFICATIONS.WaitingTitle,
    },
    type: SNACKBAR_TYPES.DEFAULT,
  });
}

export async function snackbarExecutedTx(txHash: string, chain: string) {
  const executed = await checkIBCExecutionStatus(txHash, chain);
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: executed.title,
      text: executed.message,
    },
    type:
      executed.error === true ? SNACKBAR_TYPES.ERROR : SNACKBAR_TYPES.SUCCESS,
  });
}

export type Staked = {
  total: string | undefined;
  decimals: number | undefined;
  coingeckoPrice: number | undefined;
};

export function getTotalAssets(
  normalizedAssetsData: TableData,
  staked: Staked
) {
  let totalAssets = 0;
  normalizedAssetsData?.table?.map((item) => {
    totalAssets =
      totalAssets +
      parseFloat(
        amountToDollars(item.cosmosBalance, item.decimals, item.coingeckoPrice)
      ) +
      parseFloat(
        amountToDollars(item.erc20Balance, item.decimals, item.coingeckoPrice)
      );
  });
  if (
    staked.total !== undefined &&
    staked.total !== "0" &&
    staked.decimals !== undefined &&
    staked.coingeckoPrice !== undefined
  ) {
    const val = parseFloat(
      amountToDollars(
        BigNumber.from(staked.total),
        staked.decimals,
        staked.coingeckoPrice
      )
    );
    totalAssets = totalAssets + val;
  }

  return totalAssets.toFixed(2);
}

export function checkFormatAddress(address: string, prefix: string) {
  if (address.startsWith(prefix.toLocaleLowerCase() + "1")) {
    return true;
  }
  return false;
}

export function checkMetaMaskFormatAddress(address: string) {
  if (address.startsWith("0x")) {
    return true;
  }
  return false;
}

export interface addDolarsAssetsType extends addAssetsType {
  coingeckoPrice: number;
}

export type addAssetsType = {
  cosmosBalance: BigNumber;
  decimals: number;
  erc20Balance: BigNumber;
};

// TODO: add test
export function addDolarAssets(assets: addDolarsAssetsType) {
  return (
    parseFloat(
      amountToDollars(
        assets.cosmosBalance,
        assets.decimals,
        assets.coingeckoPrice
      )
    ) +
    parseFloat(
      amountToDollars(
        assets.erc20Balance,
        assets.decimals,
        assets.coingeckoPrice
      )
    )
  );
}

export function NumberConvertAndFormat(balance: BigNumber, decimals: number) {
  return Number(convertAndFormat(balance, decimals));
}

// TODO: add test
export function addAssets(asset: addAssetsType) {
  return (
    Number(convertFromAtto(asset.cosmosBalance, asset.decimals)) +
    Number(convertFromAtto(asset.erc20Balance, asset.decimals))
  );
}

// TODO: add test
export const numericOnly = (value: string) => {
  const reg = /^[0-9.]+$/;
  const preval = value;
  if (value === "" || reg.test(value)) {
    return value;
  } else {
    value = preval.substring(0, preval.length - 1);
    return value;
  }
};

// TODO: add test
export const getSymbol = (
  token: TableDataElement | undefined,
  chain: TableDataElement | undefined
) => {
  let symbolTemp = token?.symbol;
  if (token?.symbol === EVMOS_SYMBOL) {
    if (chain !== undefined) {
      symbolTemp = chain?.symbol;
    }
  }
  return symbolTemp;
};

export const getChainIds = (
  token: TableDataElement | undefined,
  chain: TableDataElement | undefined
) => {
  let chainId = token?.chainId;
  let chainIdentifier = token?.chainIdentifier;
  if (token?.symbol === EVMOS_SYMBOL) {
    chainId = chain?.chainId;
    chainIdentifier = chain?.chainIdentifier;
  }

  return { chainId: chainId, chainIdentifier: chainIdentifier };
};

export const getPrefix = (
  token: TableDataElement | undefined,
  chain: TableDataElement | undefined,
  address: string
) => {
  let prefix = token?.prefix;
  if (chain !== undefined && address.startsWith(chain?.prefix)) {
    prefix = chain.prefix;
  }
  return prefix;
};

export function formatAttoNumber(
  // it applies the Millon letter for example
  value: BigNumberish,
  options?: Intl.NumberFormatOptions,
  notation: "standard" | "compact" = "compact"
) {
  const converted = convertFromAtto(value);
  return formatNumber(converted, options, notation);
}
