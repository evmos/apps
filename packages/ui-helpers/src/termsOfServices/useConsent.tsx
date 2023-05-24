interface BrowserConsentWindow {
  disableTracker: string;
}
import { useEffect } from "react";
import { DISABLE_TRACKER_LOCALSTORAGE } from "tracker";
import { createHtmlContent } from "./helper";
export const useConsent = () => {
  useEffect(() => {
    const browserWindow = window as unknown as BrowserConsentWindow;
    browserWindow.disableTracker = DISABLE_TRACKER_LOCALSTORAGE;
  }, []);

  const showConsent = () => {
    if (process.env.NEXT_PUBLIC_COOKIE_POLICY_ID_IUBENDA !== undefined) {
      const name = `_iub_cs-${process.env.NEXT_PUBLIC_COOKIE_POLICY_ID_IUBENDA}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    const htmlContent = createHtmlContent(false);
    document
      .querySelector("body")
      ?.insertAdjacentHTML("beforeend", htmlContent);
  };
  return { showConsent };
};
