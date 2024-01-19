// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BrowserContext, Page } from "@playwright/test";

/**
 * Creates a listener for a new page in a given browser context.
 *
 * This is to facilitate the pattern of listening for a new page before actually triggering it
 * (e.g. clicking a button that opens a new page).
 * @example
 * ```ts
 * const popup = pageListener(context); // setup page listener
 * await currentPage.getByText('open new page').click(); // trigger new page
 * 
 * await popup.load; // wait for new page to load. Always await for this AFTER triggering the new page event, but BEFORE doing anything with the new page
 * 
 * await popup.page.getByText('new page') // do something with new page
 * ```
 * 
 * You don't need to use this helper though, but if you don't, make sure you setup the listener BEFORE triggering the new page event
 * ```ts
 * // ✅ DO THIS:
 * const newPagePromise = context.waitForEvent('page');
 * await currentPage.getByText('open new page').click();
 * const newPage = await newPagePromise;

 * //⛔ NOT THIS:
 * await page.getByText('open new page').click();
 * const newPage = await context.waitForEvent('page'); // <- by the point you set this listener, the event might already have been fired
 * ```
 * @param context - The browser context to listen for new pages.
 * @returns An object with a `load` property that resolves when a new page is created,
 * and a `page` property that returns the newly created page.
 * @throws An error if the page has not been loaded yet.
 */
export const pageListener = (context: BrowserContext) => {
  const promise = context.waitForEvent("page", {
    timeout: 10000,
  });
  let page: Page | null = null;

  void promise.then((p) => {
    page = p;
  });
  return {
    load: promise,
    get page() {
      if (!page) throw new Error("Page not loaded");
      return page;
    },
  };
};
