<!--
Guiding Principles:

Changelogs are for humans, not machines.
There should be an entry for every single version.
The same types of changes should be grouped.
Versions and sections should be linkable.
The latest version comes first.
The release date of each version is displayed.
Mention whether you follow Semantic Versioning.

Usage:

Change log entries are to be added to the Unreleased section under the
appropriate stanza (see below). Each entry should ideally include a tag and
the Github issue reference in the following format:

* (<tag>) \#<issue-number> | <app or package> <new app or package version> | message

The issue numbers will later be link-ified during the release process so you do
not have to worry about including a link manually, but you can if you wish.

Types of changes (Stanzas):

"Features" for new features.
"Improvements" for changes in existing functionality.
"Deprecated" for soon-to-be removed features.
"Bug Fixes" for any bug fixes.
"Client Breaking" for breaking CLI commands and REST routes used by end-users.
"API Breaking" for breaking exported APIs used by developers building on SDK.

Ref: https://keepachangelog.com/en/1.0.0/
-->

# Changelog

## Unreleased

-(fix) DAPP-22 | packages/ui 1.0.1 | storybooks: chips

## 2.0.13 - 2024-04-12

- (feat) pages/governance 1.1.4 | Read blocked proposals from notion
- (fix) dapp-58 | pages/dappstore | Update ecosystem section - show 8 dapps

## 2.0.12 - 2024-03-18

- (fix) xap-151 | packages/widgets 1.0.8 packages/instant-dapps 1.0.5 pages/dapp-store 1.1.8 | Add Leap Elements instant dapp
- (fix) fse-975 | packages/trpc 1.0.3 | Fix format address for staked endpoint

## 2.0.11 - 2024-03-13

- (fix) xap-153 | packages/instant-dapps 1.0.4 packages/widget 1.0.7 package/i18n 1.0.5 | Wormhole temporary banner
- (fix) xap-150 | apps/mission 1.0.34 package/instant-dapps 1.0.3 package/ widgets 1.0.6 pages 1.1.7 | add TFM instant dapp

## 2.0.10 - 2024-03-11

- (fix) xap-175 | packages/widget 1.0.5 package/copilot 1.0.14 package/icons 1.0.14 package/instant-dapps 1.0.2 pages/dappstore 1.1.7 apps/mission 1.0.34 | Remove c14 from copilot and instant dapps

## 2.0.9 - 2024-03-06

- (chore) | Enable new wallets

## 2.0.8 - 2024-03-06

- (chore) | packages/icons 1.0.13 | Fix icons for wallets
- (chore) | apps/mission 1.0.33 | Swap rpcs by the newly crated proxy

- (chore) | packages/evmos-wallet 1.0.31 | Fix provider request
- (chore) onb-4 | apps/mission 1.0.33 packages/constants-helpers 1.0.12 packages/config 1.0.2 packages/evmos-wallet 1.0.30 packages/helpers 1.0.13 packages/stateful-components 1.0.6 packages/trpc 1.0.2 packages/ui-helpers 1.0.23 pages/dappstore 1.1.6 pages/portfolio 1.1.11 | Add Leap Wallet
- (chore) onb-3 | packages/evmos-wallet 1.0.29 packages/stateful-components 1.0.5 pages/staking 1.1.4 pages/vesting 1.0.2 | Add Rabby Wallet

## 2.0.7 - 2024-03-05

## 2.0.6 - 2024-02-21

- (fix) apps/mission 1.0.32 | Adds error boundary to Evmos Price to prevent app crash in case of coingecko API failure
- (fix) xap-157 | packages/widgets 1.0.4 | forge widget temporary change

## 2.0.5 - 2024-02-21

- (chore) onb-8 | apps/mission 1.0.31 packages/evmos-wallet 1.0.28 packages/registry 1.0.7 packages/trpc 1.0.1 | List BERLIN token

## 2.0.4 - 2024-02-19

- (fix) xap-125 | apps 1.0.30 packages/copilot 1.0.13 packages/icons 1.0.12 packages/instantdapps 1.0.1 packages/widgets 1.0.3 pages/dappsstore 1.1.5 | Remove Cypher from instant dapps
- (chore) | packages/widgets 1.0.3 packages/tracker 1.0.10 | Track widget transactions

## 2.0.3 - 2024-02-08

- (chore) fse-971 | packages/ui-helpers 1.0.22 | Update Mava chat
- (fix) | Fix forge
- (fix) fse-967 | apps/mission 1.0.29 | Fix version
- (chore) fse-966 | pages/portfolio 1.1.10 packages/i18n 1.0.4 | Add error message on send modal
- (fix) fse-965 | packages/i18n 1.0.3 pages/vesting 1.0.1 | Fix vesting page translations
- (chore) fse-892 | pages/portfolio 1.1.9 | Allow sending axl based assets between evmos accounts
- (fix) fse-960 | pages/portfolio 1.1.8 | Fix pay modal images

## 2.0.2 - 2024-01-29

- (chore) packages/widgets 1.0.2 | Upgrade Foprge widget to 1.2.8

## 2.0.1 - 2024-01-24

- (fix) packages/helpers 1.0.12 | Adds absolute url to rpcs on wagmi config

## 2.0.0 - 2024-01-24

- (fix) fse-959 | packages/evmos-wallet 1.0.27 | Disconnect after switching connection on Send Modal
- (fix) fse-955 | packages/evmos-wallet 1.0.26 pages/portfolio 1.1.7 | Fix connect with Keplr on Send Modal
- (fix) fse-958 | packages/copilot 1.0.12 | Close copilot modal after clicking on Learn More
- (fix) fse-957 | packages/ui-helpers 1.0.21 | Avoid reloading the page after clicking on breadcrumbs
- (fix) fse-956 | packages/copilot 1.0.11 packages/i18n 1.0.2 | Update Stake URL
- (fix) fse-954 | packages/portfolio 1.1.6 | Update mixpanel props
- (fix) | pages/portfolio 1.1.5 apps/mission 1.0.28 | Fix images in Receive Modal
- (chore) | packages/constants-helper 1.0.11 | Change Feedback URL
- (chore) | packages/helpers 1.0.11 | Read proxy URL correctly for WAGMI
- (chore) | packages/widgets 1.0.1 packages/evmos-wallet 1.0.25 | migrate osmosis and stride outpost to ICS20 precompile
- (fix) fse-950 | packages/i18n 1.0.1 pages/dappstore 1.1.4 | Copilot Get Started Edits
- (fix) fse-949 | pages/portfolio 1.1.4 | Fix title in Receive Modal

## 1.3.15 - 2024-01-22

- (chore) | apps/mission 1.0.28 packages/stateful-components 1.0.4 packages/ui-helpers 1.0.21 | Updates preparing dappstore

## 1.3.14 - 2024-01-19

- (chore) add redirect from /assets to /portfolio

## 1.3.13 - 2024-01-18

- (chore) remove extra / on tx link
- (chore) add missing images
- (chore) remove incorrect text
- (chore) set vercel redirects

## 1.3.12 - 2023-12-12

- (chore) fse-896 | apps/staking 1.1.4 | add zero values to staking precompiles call

## 1.3.11 - 2023-12-01

- (chore) fse-882 | packages/registry 1.0.6 apps/assets 1.0.42 | add Wormhole tokens

## 1.3.10 - 2023-11-23

- (chore fse-880) | packages/registry 1.0.5 | add KAVA token
- (chore) fse-867 | apps/vesting 1.1.5 | approve step for funding vesting account

## 1.3.9 - 2023-11-14

- (chore) fse-815 | apps/assets 1.0.41 packages/evmos-wallet 1.0.24 packages/registry 1.0.4 | Enable Kujira network
- (chore) fse-864 | packages/evmos-wallet 1.0.24 | remove prepareTransaction for unwrapping wevmos
- (chore) fse-846 | apps/assets 1.0.40 apps/mission 1.0.27 packages/constants-helper 1.0.10 packages/tracker 1.0.9 packages/ui-helpers 1.0.20 | Get rid of broken links and create a reusable link component
- (chore) fse-819 | packages/constants-helper 1.0.9 packages/icons 1.0.11 packages/ui-helpers 1.0.19 | Add medium to footer
- (fix) fse-802 | packages/ui-helpers 1.0.18 | Center text in staking app
- (chore) fse-799 | packages/copilot 1.0.10 | Use wagmi value instead of redux value
- (fix) fse-816 | packages/ui-helpers 1.0.17 packages/icons 1.0.10 | Replace Twitter logo to X logo in the footer
- (fix) fse-831 | apps/assets 1.0.39 | Fix usdc.grv image
- (fix) fse-837 | apps/vesting 1.1.4 | Fix error in account details page for vesting
- (fix) fse-836 | apps/vesting 1.1.3 | Fix error on creating vesting account
- (fix) fse-834 | apps/assets 1.0.38 | Fix error generating txns appear twice in pay modal
- (fix) fse-800 | apps/assets 1.0.37 apps/governance 1.0.28 apps/staking 1.1.2 apps/vesting 1.1.2 packages/evmos-wallet 1.0.23 | Suggest changing network to evmos (MetaMask)

## 1.3.8 - 2023-11-02

- (fix) fse-832 | packages/registry 1.0.3 apps/assets 1.0.36 | Fix Noble USDC not showing up in send modal
- (fix) | packages/evmos-wallet 1.0.22 | hardcode estimation for ics transfers while core team fixes the issue with precompile gas estimation
- (chore) fse-794 | apps/mission 1.0.26 apps/assets 1.0.35 packages/stateful-components 1.0.3 | Update redirects: replace assets with portfolio
- (fix) fse-801 | packages/copilot 1.0.9 | Change LayerSwap to Layerswap

## 1.3.7 - 2023-10-31

- (chore) apps/assets 1.0.34 | Add noble USDC image

## 1.3.6 - 2023-10-27

- (fix) | packages packages/registry 1.0.2 | temporarily disable osmosis lava endpoint

## 1.3.5 - 2023-10-25

- (chore) | packages/copilot 1.0.8 packages/icons 1.0.9 packages/tracker 1.0.8 packages/registry 1.0.1 apps/mission 1.0.25 | Add squid and lawerswap iframes
- (chore) | packages/evmos-wallet 1.0.21 fix NaN price change
- (fix) | apps/governance 1.0.27 apps/staking 1.1.1 apps/vesting 1.1.1 packages/copilot 1.0.7 packages/evmos-wallet 1.0.20 packages/helpers 1.0.10 | Handle error in backend calls
- (chore) fse-772 apps/assets 1.0.33 apps/vesting 1.1.1 packages/constants-helper 1.0.7 packages/evmos-wallet 1.0.20 | Link out to escan
- (feat) packages/test-utils 1.0.4 | support for Keplr on E2E tests | E2E tests for transfer modals | Testnet support for E2E tests
- (feat) packages/testnet 1.0.0 | new testnet package with a CLI to start a local testnet environment
- (chore) fse-754 packages/stateful-components 1.0.2 packages/icons 1.0.8 packages/evmos-wallet 1.0.19
- (chore) apps/governance 1.0.26 | support v1 and v1beta1 prop title in detail page
- (chore) apps/staking 1.1.0 constants-helper 1.0.8 | use staking precompile

## 1.3.4 - 2023-10-17

- (fix) fse-754 | packages/ui-helpers 1.0.16 | Add attribution to Coingecko
- (fix) fse-778 | apps/assets 1.0.32 packages/helpers 1.0.9 | Update Timestamp for success transactions
- (chore) fse-740 | apps/assets 1.0.31 apps/mission 1.0.24 packages/stateful-components 1.0.1 | Update head component
- (fix) fse-784 | apps/assets 1.0.30 packages/icons 1.0.7 packages/ui-helpers 1.0.15 | Transaction failure message even if successful
- (chore) | packages/playwright-config-custom 1.0.3 packages/evmos-wallet 1.0.17 packages/copilot 1.0.6 | Using Lava RPCs as default ones
- (fix) | packages/evmos-wallet 1.0.18 | Gas estimation wasn't being used in contract calls | Fixes issue with getting the public key for some accounts

## 1.3.3 - 2023-10-03

- (fix) | fix scrolling issue on iOS modals
- (chore) | apps/vesting 1.1.0 | vesting mainnet app

## 1.3.2 - 2023-09-29

- (fix) | apps/assets 1.0.29 | fee error message was not being displayed when fee was not paid in Evmos

## 1.3.1 - 2023-09-28

- (fix) | 1.3.1 fix stride balance in send modal

## 1.3.0 - 2023-09-28

- (chore) | 1.3.0 new send/receive/request modals in assets page

## 1.2.3 - 2023-09-11

- (chore) | apps/assets 1.0.28 | adds neok support

## 1.2.2 - 2023-09-04

- (fix) | apps/assets 1.0.27 apps/vesting 1.0.20 apps/governance 1.0.25 apps/mission 1.0.23 apps/staking 1.0.22 | Remove semicolon
- (fix) apps/assets 1.0.26 | packages/evmos-wallet 1.0.16 | Fix erc20 convert issue
- (fix) apps/copilot 1.0.6 | Fixing copilot wallet connection issue

## 1.2.1 - 2023-08-23

- (fix) fse-738 | apps/governance 1.0.24 | Hide proposals: 160, 161, 162
- (ci) | Adding PR review template
- (chore) | packages/config 1.0.1 | Adding missing headers
- (chore) fse-735 | apps/assets 1.0.25 apps/governance 1.0.23 apps/mission 1.0.22 apps/staking 1.0.21 apps/vesting 1.0.19 packages/constants-helper 1.0.6 packages/ui-helpers 1.0.14 | Add Mava Widget to all apps.
- (feature) | packages/registry 1.0.0 | Creates typesafe registry package
- (refactor) | packages/config 1.0.0 packages/evmos-wallet 1.0.8 packages/evmos-wallet 1.0.15 | refactor wallet setup to use the latest Wagmi version, fixes Wallet Connect integration

## 1.2.0 - 2023-08-21

- (chore) | packages/copilot 1.0.4 packages/tracker 1.0.6 | Track card provider and crypto swap events
- (chore) | apps/governance 1.0.21 apps/assets 1.0.23 apps/mission 1.0.20 apps/staking 1.0.19 apps/vesting 1.0.17 packages/icons 1.0.5 packages/copilot 1.0.3 packages/eslint-config-custom 1.0.4 | Add c14 and cypherD support
- (chore) | apps/assets 1.0.24 apps/governance 1.0.22 apps/mission 1.0.21 apps/staking 1.0.20 apps/vesting 1.0.18 packages/constants-helper 1.0.5 packages/copilot 1.0.5 packages/evmos-wallet 1.0.14 packages/icons 1.0.6 packages/tracker 1.0.7 packages/ui-helpers 1.0.13 | Replace Mission control page for dAppStore. New navigation for all the apps. Remove mission control components.

## 1.1.4 - 2023-08-03

- (chore) | apps/governance 1.0.20 | remove proposal number 156

## 1.1.3 - 2023-08-01

- (refactor) | Multiple Packages | Reconfigure build pipeline and review dependency graph
  - apps/assets 1.0.22
  - apps/governance 1.0.19
  - apps/mission 1.0.19
  - apps/staking 1.0.18
  - apps/vesting 1.0.16
  - packages/constants-helper 1.0.4
  - packages/eslint-config-custom 1.0.3
  - packages/evmos-wallet 1.0.13
  - packages/helpers 1.0.7
  - packages/icons 1.0.4
  - packages/playwright-config-custom 1.0.2
  - packages/services 1.0.6
  - packages/tailwind-config 1.0.2
  - packages/tracker 1.0.5
  - packages/tsconfig 1.0.1
  - packages/ui-helpers 1.0.12
  - packages/vitest-config-custom 1.0.2
- (fix) | apps/governance 1.0.18 | replace playwright waitForSelector deprecated method
- (chore) #fse-705 | apps/assets 1.0.21 | Add support for crescent network and token

## 1.1.2 - 2023-07-31

- (fix) | packages/copilot 1.0.2 apps/mission 1.0.18 | Fixing ecosystem url

## 1.1.1 - 2023-07-31

- (fix) #fse-657 | packages/copilot 1.0.1 | Fix Transak url

## 1.1.0 - 2023-07-31

- (feat) #fse-657 | packages/evmos-wallet 1.0.12 packages/ui-helpers 1.0.11 packages/copilot 1.0.0 packages/tailwind-config 1.0.1 apps/assets 1.0.20 apps/governance 1.0.17 apps/mission 1.0.17 apps/staking 1.0.17 apps/vesting 1.0.15 | Add Evmos Copilot for onboarding new users

## 1.0.14 - 2023-07-26

- (feat) #fse-690 | packages/evmos-wallet 1.0.11 apps/assets 1.0.19 | Enable keplr smart contract interactions
- (fix) #fse-677 | apps/assets 1.0.19 apps/governance 1.0.16 apps/mission 1.0.16 apps/staking 1.0.16 apps/vesting 1.0.14 packages/constants-helper 1.0.3 packages/eslint-config-custom 1.0.2 packages/evmos-wallet 1.0.11 packages/helpers 1.0.6 packages/icons 1.0.3 packages/services 1.0.5 packages/tracker 1.0.4 packages/ui-helpers 1.0.10 | Updating eslint config to avoid Vscode errors

## 1.0.13 - 2023-07-18

- (chore) #fse-681 | packages/evmos-wallet 1.0.10 apps/governance 1.0.16 | move useEvmosBalance to evmos-wallet
- (feat) #fse-495 | packages/evmos-wallet 1.0.10 | Adding i18n with schummar library
- (ci) #fse-668 | turbo.json | Updating config to be able to do a quick build using --filter for examample `yarn  build --filter mission-page`
- (ci) #fse-675 | packages/playwright-config-custom 1.0.1 packages/vitest-config-custom 1.0.1 apps/assets 1.0.18 apps/governance 1.0.15 apps/mission 1.0.15 apps/staking 1.0.15 apps/vesting 1.0.13 packages/evmos-wallet 1.0.9 apps/helpers 1.0.5 packages/services 1.0.4 packages/tracker 1.0.3 packages/ui-helpers 1.0.9 | Refactoring playwright & vitest config
- (ci) #fse-676 | apps/assets 1.0.17 apps/governance 1.0.14 apps/mission 1.0.14 apps/staking 1.0.14 apps/vesting 1.0.12 | Removing linting from build process
- (ci) #fse-676 | .github | Refactoring and optimizing github actions

## 1.0.12 - 2023-07-10

- (tests) #fse-665 | .github | Adding playwright github action
- (tests) #fse-665 | apps/assets 1.0.16 apps/governance 1.0.13 apps/mission 1.0.13 apps/staking 1.0.13 apps/vesting 1.0.11 packages/playwright-custom-config 1.0.0 | Adding playwright everywhere
- (ci) #fse-673 | .github | Removing codeball from github actions

## 1.0.11 - 2023-07-03

- (chore) #fse-669 | apps/assets 1.0.15 | Add convert button for gravity assets
- (config) | .vscode | Adding default vscode formatting settings
- (tests) | apps/assets 1.0.14 apps/governance 1.0.12 apps/mission 1.0.12 apps/staking apps/vesting | Apps and packages migrated to vitest
- (tests) | packages/constants-helper 1.0.2 packages/evmos-wallet 1.0.8 packages/helpers 1.0.4 packages/icons 1.0.2 packages/services 1.0.3 packages/trackers 1.0.2 packages/ui-helpers 1.0.8 | Update package.json to make the tests work with vitest

## 1.0.10 - 2023-06-15

- (chore) #fse-566 | apps/assets 1.0.12 apps/governance 1.0.11 apps/mission 1.0.11 apps/staking 1.0.11 | Remove hackathon information banner

## 1.0.9 - 2023-06-09

- (chore) #fse-637 | apps/assets 1.0.11 apps/governance 1.0.10 apps/mission 1.0.10 apps/staking 1.0.10 packages/ui-helpers 1.0.7 | Remove system error banner for ledger + keplr

## 1.0.8 - 2023-06-07

- (chore) #fse-624 | apps/assets 1.0.10 apps/governance 1.0.9 apps/mission 1.0.9 apps/staking 1.0.9 packages/ui-helpers 1.0.7 | Add system error banner for ledger + keplr

## 1.0.7 - 2023-06-01

- (fix) #fse-593 | apps/assets 1.0.9 apps/governance 1.0.8 apps/mission 1.0.8 apps/staking 1.0.8 packages/ui-helpers 1.0.6 | Fix consent modal to work in every browser
- (fix) #fse-592 | Remove Coslend from mission control

## 1.0.6 - 2023-06-01

- (chore) #fse-600 | apps/assets 1.0.8 apps/governance 1.0.7 apps/mission 1.0.7 apps/staking 1.0.7 | Updating dora hacks date
- (chore) #fse-601 | apps/assets 1.0.8 | Fix broken images

## 1.0.5 - 2023-05-24

- (workflow) #fse-511 | packages/tracker 1.0.1 | Adding lint
- (workflow) #fse-511 | packages/constants-helper 1.0.1 packages/eslint-config-custom 1.0.1 packages/evmos-wallet 1.0.5 packages/helpers 1.0.3 packages/icons 1.0.1 packages/services 1.0.2 packages/ui-helpers 1.0.2 | Deleting eslint related dependencies, setting new linting rules, fixing linting issues
- (workflow) #fse-511 | apps/assets 1.0.3 apps/governance 1.0.3 apps/staking 1.0.3 apps/mission 1.0.3 | Moving husky to the mono repo level
- (workflow) #fse-511 | husky, package | Updating husky so it can work again
- (workflow) #fse-511 | apps/mission 1.0.3 | Ignoring \_redirects from git
- (workflow) #fse-531 | script | Adding script to clear cache and fixing cache issue in the build process
- (refactor) #fse-514 | github actions | Removing unused folder
- (chore) #fse-551 | apps/assets 1.0.4 apps/governance 1.0.4 apps/staking 1.0.4 apps/mission 1.0.4 packages/ui-helpers 1.0.3 | add correct env and app version in footer
- (chore) #fse-581 | apps/assets 1.0.4 | add images for new assets & group quicksilver assets
- (chore) #fse-519 | apps/assets 1.0.5 apps/governance 1.0.4 apps/staking 1.0.4 apps/mission 1.0.4 | Set up a consent modal for users to opt-in/opt-out to tracking
- (chore) #fse-519 | packages/evmos-wallet 1.0.7 | Get, set and remove WALLET_KEY and use it for wallet connection tracking
- (chore) #fse-519 | packages/tracker 1.0.0 | Create tracker package
- (chore) #fse-519 | packages/ui-helpers 1.0.3 | Update jest configuration. Add onClick function to the components in order to track the events.
- (workflow) #fse-519 | turbo.json | Add tracker package and NEXT_PUBLIC_MIXPANEL_TOKEN variable
- (workflow) #fse-519 | package.json 1.0.4 | Add --force --no-cache to build script
- (chore) #fse-522 | apps/assets 1.0.6 apps/governance 1.0.5 apps/mission 1.0.5 apps/staking 1.0.5 | Add consent modal
- (chore) #fse-522 | packages/ui-helpers 1.0.4 | Add new constants for privacy policy, cookies policy and TOS version. Add consent modal for TOS.
- (chore) #fse-522 | packages/tracker 1.0.1 | Enable/disable tracking if DISABLE_TRACKER_LOCALSTORAGE is set
- (chore) #fse-521 | apps/assets 1.0.7 apps/governance 1.0.6 apps/mission 1.0.6 apps/staking 1.0.6 | Reuse consent modal on footer to allow users to change their opt-in/opt-out preferences
- (chore) #fse-521 | packages/ui-helpers 1.0.5 | Add Cookies settings button so the user can change their cookies preferences
- (workflow) #fse-521 | turbo.json | Add NEXT_PUBLIC_MIXPANEL_TOKEN, NEXT_PUBLIC_COOKIE_POLICY_ID_IUBENDA, NEXT_PUBLIC_SITE_ID_IUBENDA

## 1.0.4 - 2023-05-19

- (chore) #fse-581 | apps/assets 1.0.4 | add images for new assets & group quicksilver assets
- (workflow) #fse-531 | script | Adding script to clear cache and fixing cache issue in the build process

## 1.0.3 - 2023-05-10

- (chore) #fse-142 | evmos-wallet 1.0.6 | Env vars prefixes
- (workflow) #fse-511 | packages/tracker 1.0.1 | Adding lint
- (workflow) #fse-511 | packages/constants-helper 1.0.1 packages/eslint-config-custom 1.0.1 packages/evmos-wallet 1.0.5 packages/helpers 1.0.3 packages/icons 1.0.1 packages/services 1.0.2 packages/ui-helpers 1.0.2 | Deleting eslint related dependencies, setting new linting rules, fixing linting issues
- (workflow) #fse-511 | apps/assets 1.0.3 apps/governance 1.0.3 apps/staking 1.0.3 apps/mission 1.0.3 | Moving husky to the mono repo level
- (workflow) #fse-511 | husky, package | Updating husky so it can work again
- (workflow) #fse-511 | apps/mission 1.0.3 | Ignoring \_redirects from git
- (refactor) #fse-514 | github actions | Removing unused folder

## 1.0.2 - 2023-05-10

- (workflow) #fse-510 | github actions | Removing unused legacy codeql workflow
- (chore) #fse-537 | packages/ui-helpers 1.0.2 | Add reusable dismissible announcement banner for DoraHacks
- (chore) #fse-498 | evmos-wallet 1.0.5 load constant in networkConfig.ts from environment variables & use default fallback values
- (fix) #fse-503 | (apps|mission) change environment variable to build \_redirects file

## 1.0.1 - 2023-05-09

- (workflow) #fse-512 | github/workflows | Adding codeball
- (tests) #fse-509 | apps/assets 1.0.2 apps/governance 1.0.2 apps/staking 1.0.2 packages/evmos-wallet 1.0.4 packages/helpers 1.0.2 packages/services 1.0.1 packages/ui-helpers 1.0.1 | Adding shared package for jest related configuration
- (design) #229 | apps/staking 1.0.1 apps/assets 1.0.1 | Making design fixes so we don't have extra scrollbars
- (improvements) #fse-487 | evmos-wallet 1.0.3 | Use preferNoSetFee while signing with Keplr and chain is Evmos
- (bug fixes) #fse-142 | apps/assets 1.0.1 | Change amount of decimals displayed: 6 instead of 2
- (bug fixes) #fse-142 | apps/mission 1.0.1 | Display tooltip on topBarMissionControl with 6 decimals amount if amount is bigger than 0
- (bug fixes) #fse-142 | apps/mission 1.0.1 | Change amount of decimals displayed: 6 instead of 2
- (bug fixes) #fse-142 | apps/staking 1.0.1 | Change amount of decimals displayed: 6 instead of 2
- (bug fixes) #fse-142 | apps/staking 1.0.1 | Display tooltip on topBarStaking with 6 decimals amount if amount is bigger than 0
- (bug fixes) #fse-142 | packages/helpers 1.0.1 | Create function for display TopBar Tooltip
- (chore) #fse-142 | evmos-wallet 1.0.2 | Export EVMOS_DECIMALS
- (bug) #fse-400 | root config | Updating the dev workflow to avoid errors when running `yarn dev`
- (bug fixes) #fse-481 | evmos-wallet 1.0.1 | Show connected snackbar only if the user clicks on Connect Wallet
- (ci) #fse-413 | (apps)/\_ 1.0.x | Adding CI/CD pipeline for apps
- (chore) #fse-503 | (/) Add production build script | (apps|mission) add script to copy \_redirects file depending on environment

## 1.0.0 - 2023-04-28

- (chore) #fse-306 | apps/_ 1.0.0 packages/_ 1.0.0 | Adding changelog file, updating Licenses and versions in each packages
