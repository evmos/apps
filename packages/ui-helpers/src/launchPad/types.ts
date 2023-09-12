// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export type dAppsProps = {
  icon: JSX.Element;
  text: string;
  href: string;
  mixpanelId: string;
};

export type LaunchPadProps = {
  dApps: dAppsProps[];
  title: string;
  badge: string;
  description: string;
  button: string;
};
