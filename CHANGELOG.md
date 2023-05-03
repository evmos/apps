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

- (tests) #fse-509 | apps/assets 1.0.2 apps/governance 1.0.2 apps/staking 1.0.2 packages/evmos-wallet 1.0.4 packages/helpers 1.0.4 packages/services 1.0.1 packages/ui-helpers 1.0.1 | Adding shared package for jest related configuration
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




## 1.0.0 - 2023-04-28

- (chore) #fse-306 | apps/_ 1.0.0 packages/_ 1.0.0 | Adding changelog file, updating Licenses and versions in each packages
