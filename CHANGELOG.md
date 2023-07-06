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

- (tests) #fse-665 | .github | Adding playwright github action
- (tests) #fse-665 | apps/assets 1.0.16 apps/governance 1.0.13 apps/mission 1.0.13 apps/staking 1.0.13 apps/vesting 1.0.11 packages/playwright-custom-config 1.0,.0 | Adding playwright everywhere
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
