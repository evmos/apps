import * as z from "zod";

export const getEndDate = (
  date: string | undefined,
  vestingDuration: string
) => {
  const duration = Number(vestingDuration?.split(" ")[0]);
  const year = Number(date?.split("-")[0]);
  if (!isNaN(duration) && !isNaN(year)) {
    const total = duration + year;
    const day = date?.split("-")[2];
    const month = date?.split("-")[1];
    const finalDate = month + "/" + day + "/" + total;
    const isSet = month === undefined ? false : true;
    return [isSet, finalDate];
  }
  return [false, ""];
};

const VESTING_ACCOUNTS_NAMES_LOCALSTORAGE = "VESTING_ACCOUNTS_NAMES";

export function setVestingAccountNameLocalstorage(
  walletAddress: string,
  accountName: string
) {
  const storedData = localStorage.getItem(VESTING_ACCOUNTS_NAMES_LOCALSTORAGE);
  const accounts = storedData
    ? (JSON.parse(storedData) as {
        walletAddress: string;
        accountName: string;
      }[])
    : [];

  accounts.push({ walletAddress, accountName });
  localStorage.setItem(
    VESTING_ACCOUNTS_NAMES_LOCALSTORAGE,
    JSON.stringify(accounts)
  );
}

export const getVestingAccountNameLocalstorage = (address: string) => {
  const accounts = localStorage.getItem(VESTING_ACCOUNTS_NAMES_LOCALSTORAGE);
  let list: { walletAddress: string; accountName: string }[] = [];
  if (accounts !== null) {
    list = JSON.parse(accounts) as {
      walletAddress: string;
      accountName: string;
    }[];
  }
  const filtered = list.filter((e) => e.walletAddress === address);
  return filtered[0]?.accountName ?? "";
};

export enum Duration {
  OneYear = "1 YEAR",
  FourYears = "4 YEARS",
  None = "None",
  OneMonth = "1 MONTH",
  OneDay = "1 DAY",
  Monthly = "Monthly",
  Quarterly = "Quarterly",
}

export enum PlansType {
  Team = "Team",
  Grantee = "Grantee",
  Custom = "Custom",
}

export const plans = [
  PlansType.Custom,
  PlansType.Team,
  PlansType.Grantee,
] as const;
export const duration = [Duration.FourYears, Duration.OneYear] as const;
export const cliff = [
  Duration.None,
  Duration.OneYear,
  Duration.OneMonth,
  Duration.OneDay,
] as const;
export const schedule = [Duration.Monthly, Duration.Quarterly] as const;
export const lockup = [
  Duration.None,
  Duration.OneYear,
  Duration.OneMonth,
] as const;

export const dummyProps = {
  available: "2000450.52",
};

export const schema = z.object({
  address: z
    .string()
    .min(1, { message: "Required" })
    .and(
      z
        .string()
        .refine(
          (value) => value.startsWith("evmos") || value.startsWith("0x"),
          {
            message: "Address must start with 'evmos' or '0x'",
          }
        )
    ),
  accountName: z.string(),
  amount: z
    .number({ invalid_type_error: "Required" })
    .min(0)
    .max(Number(dummyProps.available)),
  planType: z.enum(plans),
  vestingDuration: z.enum(duration),
  vestingCliff: z.enum(cliff),
  vestingSchedule: z.enum(schedule),
  lockupDuration: z.enum(lockup),
  startDate: z.coerce.date(),
});

export const vestingSettingsConfig = {
  [PlansType.Team]: {
    duration: [Duration.FourYears],
    cliff: [Duration.OneYear],
    schedule: [Duration.Monthly],
    lockup: [Duration.OneYear],
    disabled: true,
  },
  [PlansType.Grantee]: {
    duration: [Duration.OneYear],
    cliff: [Duration.OneDay],
    schedule: [Duration.Monthly],
    lockup: [Duration.OneYear],
    disabled: true,
  },
  [PlansType.Custom]: {
    duration: [Duration.FourYears, Duration.OneYear],
    cliff: [
      Duration.None,
      Duration.OneYear,
      Duration.OneMonth,
      Duration.OneDay,
    ],
    schedule: [Duration.Monthly, Duration.Quarterly],
    lockup: [Duration.None, Duration.OneYear, Duration.OneMonth],
    disabled: false,
  },
};

export const DEFAULT_FORM_VALUES = {
  address: "",
  accountName: "",
  amount: "",
  planType: PlansType.Team,
  vestingDuration: Duration.FourYears,
  vestingCliff: Duration.OneYear,
  vestingSchedule: Duration.Monthly,
  lockupDuration: Duration.OneYear,
  startDate: " ",
};

export interface VestingProps {
  accountAddress: string;
  funderAddress: string;
  isVesting: boolean;
}

export const isEthereumAddressValid = (address: string): boolean => {
  const ethereumAddressRegex = /^0x[0-9a-fA-F]{40}$/;
  return ethereumAddressRegex.test(address);
};

export const isEvmosAddressValid = (address: string): boolean => {
  // TODO: are evmos wallet always 44 characters ?
  const evmosAddressRegex = /^evmos[0-9a-zA-Z]{39}$/;
  return evmosAddressRegex.test(address);
};
