# Assets Page

This repo contains the front-end for the assets page: [https://assets.evmos.org/](https://assets.evmos.org/).

## Requirements

- Node v18.12.0+

## Current implementation

It uses the [dashboard-backend](https://github.com/tharsis/dashboard-backend) to fetch the information and to create the transactions.

The wallet extensions code is inside the `wallet` folders in `src/internal` and `src/components`, after releasing the v1 of the assets page, the wallet code must be moved to the `react-components` repo created in the `evmos` org in github.

## Run

```sh
git clone https://github.com/tharsis/assetsPage
cd assetsPage
yarn install
yarn build
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

## Registering a new chain or token

Showing up on this list of Assets means that the app supports the technical functionalities of interacting with this chain / asset / token (sending, receiving, automatic conversions from ERC-20 to IBC and vice versa).

In order to get on this list, this is the following process:

1. Create a PR in our Chain Token Registry repo (https://github.com/evmos/chain-token-registry/).

2. Fill out the parameters as indicated in the PR, one of which includes submitting and ERC-20 address.
    1. Note: if there is no ERC-20 representation of the token, it is necessary to submit a governance proposal to register the token.

3. Once the PR is submitted, our internal team (typically Full-Stack) will manually review the PR.

4. Full-Stack will approve the PR once all parameters are filled out correctly.

5. It takes 24 hours to get the token to show up on our Assets list - in cases of absolute urgency, we can also manually enable Assets to show the token in a few seconds.
