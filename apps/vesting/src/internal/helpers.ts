export const DEFAULT_VESTING_VALUES = {
  locked: [
    {
      denom: "",
      amount: "",
    },
  ],
  unvested: [
    {
      denom: "",
      amount: "",
    },
  ],
  vested: [],
  account: {
    "@type": "",
    base_vesting_account: {
      base_account: {
        address: "",
        pub_key: "",
        account_number: "",
        sequence: "",
      },
      original_vesting: [{ denom: "", amount: "" }],
      end_time: "",
    },
    funder_address: "",
    start_time: "",
    lockup_periods: [
      {
        length: "",
        amount: {
          denom: "",
          amount: "",
        },
      },
    ],
    vesting_periods: [
      {
        length: "",
        amount: {
          denom: "",
          amount: "",
        },
      },
    ],
  },
};
