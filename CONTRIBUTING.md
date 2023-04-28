# Evmos Contributor Guidelines

<!-- markdown-link-check-disable -->

- [General Procedure](#general_procedure)
- [Testing](#testing)
- [Updating Documentation](#updating_doc)
- [Commit messages](#commit_messages)
  - [PR Targeting](#pr_targeting)
  - [Pull Requests](#pull_requests)
  - [Process for reviewing PRs](#reviewing_prs)
- [Branching](#branching)
- [Versioning](#versioning)
  - [Packages & Apps](#packages)
  - [Changelog](#changelog)
  <!-- markdown-link-check-enable -->

## <span id="general_procedure">General Procedure</span>

Thank you for considering making contributions to Evmos and related repositories!

Contributing to this repo can mean many things such as participating in discussion or proposing code changes.
To ensure a smooth workflow for all contributors,
the following general procedure for contributing has been established:

1. Either [open](https://github.com/evmos/apps/issues/new/choose)
   or [find](https://github.com/evmos/apps/issues) an issue you have identified and would like to contribute to
   resolving.
2. Participate in thoughtful discussion on that issue.
3. If you would like to contribute:
   1. If the issue is a proposal, ensure that the proposal has been accepted by the Evmos team.
   2. Ensure that nobody else has already begun working on the same issue. If someone already has, please make sure to
      contact the individual to collaborate.
   3. If nobody has been assigned the issue and you would like to work on it,
      make a comment on the issue to inform the
      community of your intentions to begin work.
      Ideally, wait for confirmation that no one has started it.
      However, if you are eager and do not get a prompt response, feel free to dive on in!
   4. Follow standard Github best practices:
      1. Fork the repo
      2. Branch from the HEAD of `main`(For core developers working within the evmos repo, to ensure a
         clear ownership of branches, branches must be named with the convention `{username}/{issue#}-branch-name`).
      3. Make commits
      4. Submit a PR to `main`
   5. Be sure to submit the PR in `Draft` mode.
      Submit your PR early, even if it's incomplete as this indicates to the community you're working on something
      and allows them to provide comments early in the development process.
   6. When the code is complete it can be marked `Ready for Review`.
   7. Be sure to include a relevant change log entry in the `Unreleased` section of `CHANGELOG.md`
      (see file for log format).
   8. Please make sure to run `yarn format` before every commit -
      the easiest way to do this is having your editor run it for you upon saving a file.
      Additionally, please ensure that your code is lint compliant by running `yarn lint`.
      There are CI tests built into the Evmos repository
      and all PR’s will require that these tests pass
      before they can be merged.

**Note**: for very small or blatantly obvious problems (such as typos),
it is not required to open an issue to submit a PR.
For more complex problems/features, if a PR is opened
before an adequate design discussion has taken place in a GitHub issue,
that PR runs a high likelihood of being rejected.

Looking for a good place to start contributing?
Check out our [good first issues](https://github.com/evmos/apps/issues?q=label%3A%22good+first+issue%22).

## <span id="testing">Testing</span>

Evmos uses [GitHub Actions](https://github.com/features/actions) for automated testing.

## <span id="updating_doc">Updating Documentation</span>

If you open a PR on the Evmos repo, it is mandatory to update the relevant documentation in `/docs`. Please refer to
the docs subdirectory and make changes accordingly. Prior to approval, the Code owners/approvers may request some
updates to specific docs.

## <span id="commit_messages">Commit messages</span>

Commit messages should be written in a short, descriptive manner
and be prefixed with tags for the change type and scope (if possible)
according to the [semantic commit](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) scheme.

For example, a new change to the `bank` module might have the following message:
`feat(bank): add balance query cli command`

### <span id="pr_targeting">PR Targeting</span>

Ensure that you base and target your PR on the `main` branch.

All feature additions should be targeted against `main`.
Bug fixes for an outstanding release candidate should be
targeted against the release candidate branch.

### <span id="pull_requests">Pull Requests</span>

To accommodate the review process, we suggest that PRs are categorically broken up. Ideally each PR addresses only a
single issue. Additionally, as much as possible code refactoring and cleanup should be submitted as separate PRs from
bug fixes/feature-additions.

### <span id="reviewing_prs">Process for reviewing PRs</span>

All PRs require two Reviews before merge. When reviewing PRs, please use the following review explanations:

1. `LGTM` without an explicit approval means that the changes look good,
   but you haven't pulled down the code, ran tests locally and thoroughly reviewed it.
2. `Approval` through the GH UI means that you understand the code,
   documentation/spec is updated in the right places,
   you have pulled down and tested the code locally.
   In addition:
   - You must think through whether any added code could be partially combined (DRYed) with existing code.
   - You must think through any potential security issues or incentive-compatibility flaws introduced by the changes.
   - Naming convention must be consistent with the rest of the codebase.
   - Code must live in a reasonable location, considering dependency structures
     (e.g. not importing testing modules in production code, or including example code modules in production code).
   - If you approve of the PR, you are responsible for fixing any of the issues mentioned here.
3. If you are only making "surface level" reviews, submit any notes as `Comments` without adding a review.

## <span id="branching">Branching</span>

This repository will follow the [GitLab Flow](https://about.gitlab.com/topics/version-control/what-is-gitlab-flow/) branching strategy:

- All the development will be merged to `main`
  - `main` will be deployed to the staging environment
- Once tested and ready to be deployed main will be merged to the branch `production`
  - `production` will be deployed to the production environment

Any development will be branched from main and be named `{username}/{issue#}-branch-name`

## <span id="versioning">Versioning</span>

The repository will use [semantic versioning](https://semver.org/), in short:

Given a version number MAJOR.MINOR.PATCH, increment the:

- MAJOR version when you make incompatible API changes
- MINOR version when you add functionality in a backwards compatible manner
- PATCH version when you make backwards compatible bug fixes

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

### <span id="packages">Packages & Apps</span>

Because of the mono repository structure each of the packages, and apps have its own `package.json` and own version. Therefore each package will have its own version and should also follow the semantic versioning.

### <span id="changelog">Changelog</span>

In order to track the updates each contributor will update the changelog and specify the version of each package.
Use `Unreleased` section to track changes that are not yet released.
