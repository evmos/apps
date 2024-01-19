// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { type BrowserContext } from "@playwright/test";
import { waitLocator } from "../wait-locator";

export class Keplr {
  constructor(
    private context: BrowserContext,
    private extensionId: string,
  ) {}
  signin = async () => {
    const keplrExt = await this.context.newPage();

    await keplrExt.goto(`chrome-extension://${this.extensionId}/popup.html`);

    await waitLocator(keplrExt.locator('input[type="password"]')).fill(
      "12345678",
    );

    await waitLocator(
      keplrExt.getByRole("button", { name: "Unlock", exact: true }),
    ).click();

    await keplrExt.getByText("Total Available").waitFor();
    await keplrExt.close();
  };
  setup = async () => {
    try {
      await this.context.waitForEvent("page", { timeout: 2000 });
    } catch (e) {}
    let keplrExt = this.context.pages().find((page) => {
      const url = page.url();

      if (url.includes("register.html")) {
        return true;
      }
    });
    if (!keplrExt) {
      keplrExt = await this.context.newPage();
      await keplrExt.goto(
        `chrome-extension://${this.extensionId}/register.html`,
      );
    }
    try {
      await keplrExt.waitForEvent("close", {
        timeout: 1000,
      });
    } catch (e) {}
    if (keplrExt.isClosed()) {
      await this.signin();
      return;
    }

    await waitLocator(
      keplrExt.getByRole("button", { name: "Import an existing wallet" }),
    ).click();

    await waitLocator(
      keplrExt.getByRole("button", {
        name: "Use recovery phrase or private key",
      }),
    ).click();
    const seedPhrase =
      process.env.E2E_TEST_SEED ||
      "upper recycle exhibit spin kit able pause donate region expire lumber absurd";

    const words = seedPhrase.split(" ");
    await keplrExt.waitForTimeout(1000);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (!word) continue;
      const inputLocator = keplrExt.locator(`input`).nth(i);
      await inputLocator.waitFor();
      await inputLocator.focus();
      await inputLocator.fill(word, { force: true });
    }

    await waitLocator(
      keplrExt.getByRole("button", { name: "Import", exact: true }),
    ).click();

    await waitLocator(keplrExt.locator('input[name="name"]')).fill("test");

    await waitLocator(keplrExt.locator('input[name="password"]')).fill(
      "12345678",
    );

    await waitLocator(keplrExt.locator('input[name="confirmPassword"]')).fill(
      "12345678",
    );

    await waitLocator(
      keplrExt.getByRole("button", { name: "Next", exact: true }),
    ).click();

    await waitLocator(
      keplrExt.getByRole("button", { name: "Save", exact: true }),
    ).click();

    await keplrExt.close();
  };

  approve = async (
    options: {
      timeout?: number;
    } = {},
  ) => {
    try {
      const extensionPage =
        this.context.pages().find((page) => {
          const url = page.url();

          if (url.includes(this.extensionId) && url.includes("popup.html")) {
            return true;
          }
        }) || (await this.context.waitForEvent("page", options));

      const approveButton = extensionPage.getByRole("button", {
        name: "Approve",
        disabled: false,
        exact: true,
      });
      await approveButton.waitFor();
      // await extensionPage.waitForTimeout(1000);
      await approveButton.click();
      try {
        await extensionPage.waitForEvent("close", {
          timeout: 500,
        });
      } catch (e) {
        await extensionPage.close();
      }
    } catch (e) {}
  };
}
