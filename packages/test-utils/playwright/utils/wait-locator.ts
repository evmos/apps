// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Locator } from "playwright";

export const waitLocator = (
  locator: Locator,
  ...args: Parameters<Locator["waitFor"]>
) => {
  const promise = locator.waitFor(...args);

  return {
    fill(...args: Parameters<Locator["fill"]>) {
      return promise.then(() => locator.fill(...args)).then(() => locator);
    },

    check(...args: Parameters<Locator["check"]>) {
      return promise.then(() => locator.check(...args)).then(() => locator);
    },

    click(...args: Parameters<Locator["click"]>) {
      return promise.then(() => locator.click(...args)).then(() => locator);
    },

    press(...args: Parameters<Locator["press"]>) {
      return promise.then(() => locator.press(...args)).then(() => locator);
    },
    pressSequentially(...args: Parameters<Locator["pressSequentially"]>) {
      return promise
        .then(() => locator.pressSequentially(...args))
        .then(() => locator);
    },
    focus(...args: Parameters<Locator["focus"]>) {
      return promise.then(() => locator.focus(...args)).then(() => locator);
    },
    getAttribute(...args: Parameters<Locator["getAttribute"]>) {
      return promise.then(() => locator.getAttribute(...args));
    },
  };
};
