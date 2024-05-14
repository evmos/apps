// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Octokit } from "octokit";

export const github = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    fetch: (input: RequestInfo | URL, init: RequestInit = {}) =>
      fetch(input, {
        ...init,
        next: { revalidate: 60 * 60 * 24, tags: ["github-api"] },
      }),
  },
});
