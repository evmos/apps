# Vesting Page

This repo contains the front-end for the vesting page: [https://vesting.evmos.org/](https://vesting.evmos.org/).

## Requirements

- Node v18.12.0+

## Current implementation

It uses the [dashboard-backend](https://github.com/tharsis/dashboard-backend) to fetch the information and to create the transactions.

The wallet extensions code is inside the `wallet` folders in `src/internal` and `src/components`, after releasing the v1 of the assets page, the wallet code must be moved to the `react-components` repo created in the `evmos` org in github.

## Run

```sh
git clone https://github.com/tharsis/vestingPage
cd vestingPage
yarn install
yarn run dev
```

## Configuration

The endpoints used by default are currently stored in `src/internal/wallet/functionality/networkConfig.ts`

It's using the default values that should work for most of the cases, but most of the methods that consume the endpoints can overwrite the configuration with optional parameters.

## Tests

The tests can be run using:

```sh
yarn run test
```
