type LockedResponse = {
  denom: string;
  amount: string;
};

type UnvestedResponse = {
  denom: string;
  amount: string;
};

type AccountResponse = {
  "@type": string;
  base_vesting_account: {
    base_account: {
      address: string;
      pub_key: string;
      account_number: string;
      sequence: string;
    };
    original_vesting: {
      denom: string;
      amount: string;
    }[];
    end_time: string;
  };
  funder_address: string;
  start_time: string;
  lockup_periods: {
    length: string;
    amount: { denom: string; amount: string }[];
  }[];
  vesting_periods: {
    length: string;
    amount: { denom: string; amount: string }[];
  }[];
};

export interface VestingResponse {
  locked: LockedResponse[];
  unvested: UnvestedResponse[];
  vested: [];
  account: AccountResponse;
}

export type VestingAccountDetail = {
  accountAddress: VestingResponse["account"]["base_vesting_account"]["base_account"]["address"];
  funderAddress: VestingResponse["account"]["funder_address"];
  unvestedAmount: VestingResponse["unvested"][0]["amount"];
  originalVestingAmount: VestingResponse["account"]["base_vesting_account"]["original_vesting"][0]["amount"];
};
