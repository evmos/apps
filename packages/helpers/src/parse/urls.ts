// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

type UrlMatches = {
  discord?: RegExpMatchArray | null;
  github?: RegExpMatchArray | null;
  twitter?: RegExpMatchArray | null;
  telegram?: RegExpMatchArray | null;
  domain?: RegExpMatchArray | null;
};

export const parseUrl = (url: string) => {
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
  const discordRegex = /discord\.(?:com|gg)\/(?:invite\/)?([^\/]+)/;
  const githubRegex = /github\.com\/([^\/]+)/;
  const twitterRegex = /twitter\.com\/([^\/]+)/;
  const telegramRegex = /t\.me\/([^\/]+)/;

  const matches = {
    discord: url.match(discordRegex),
    github: url.match(githubRegex),
    twitter: url.match(twitterRegex),
    telegram: url.match(telegramRegex),
    domain: url.match(domainRegex),
  };

  const matchedKey = Object.keys(matches).find(
    (key) => matches[key as keyof UrlMatches]
  );

  return matchedKey ? matches[matchedKey as keyof UrlMatches]?.[1] : url;
};
