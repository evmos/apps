/* tslint:disable */
/* eslint-disable */

export const VestingABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "destAddress",
        type: "address",
      },
    ],
    name: "Clawback",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
    ],
    name: "ConvertVestingAccount",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
    ],
    name: "CreateClawbackVestingAccount",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "int64",
            name: "length",
            type: "int64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Coin[]",
            name: "amount",
            type: "tuple[]",
          },
        ],
        indexed: false,
        internalType: "struct Period[]",
        name: "lockupPeriods",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "int64",
            name: "length",
            type: "int64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Coin[]",
            name: "amount",
            type: "tuple[]",
          },
        ],
        indexed: false,
        internalType: "struct Period[]",
        name: "vestingPeriods",
        type: "tuple[]",
      },
    ],
    name: "FundVestingAccount",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newFunderAddress",
        type: "address",
      },
    ],
    name: "UpdateVestingFunder",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Coin[]",
        name: "locked",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Coin[]",
        name: "unvested",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Coin[]",
        name: "vested",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "accountAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "destAddress",
        type: "address",
      },
    ],
    name: "clawback",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "denom",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Coin[]",
        name: "coins",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
    ],
    name: "convertVestingAccount",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "enableGovClawback",
        type: "bool",
      },
    ],
    name: "createClawbackVestingAccount",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "startTime",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "int64",
            name: "length",
            type: "int64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Coin[]",
            name: "amount",
            type: "tuple[]",
          },
        ],
        internalType: "struct Period[]",
        name: "lockupPeriods",
        type: "tuple[]",
      },
      {
        components: [
          {
            internalType: "int64",
            name: "length",
            type: "int64",
          },
          {
            components: [
              {
                internalType: "string",
                name: "denom",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Coin[]",
            name: "amount",
            type: "tuple[]",
          },
        ],
        internalType: "struct Period[]",
        name: "vestingPeriods",
        type: "tuple[]",
      },
    ],
    name: "fundVestingAccount",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "funderAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "newFunderAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "vestingAddress",
        type: "address",
      },
    ],
    name: "updateVestingFunder",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
