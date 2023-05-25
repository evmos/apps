import Script from "next/script";
import { useEffect } from "react";
import { createHtmlContent } from "./helper";

interface BrowserWindow {
  siteId: number;
  cookiePolicyId: number;
  htmlContent: string;
}

export const Consent = () => {
  useEffect(() => {
    function displayConsentModal() {
      const iubendaScript = document.getElementById("iubenda-script");

      if (iubendaScript) {
        document.body.removeChild(iubendaScript);
      }

      const browserWindow = window as unknown as BrowserWindow;
      browserWindow.siteId =
        Number(process.env.NEXT_PUBLIC_SITE_ID_IUBENDA) ?? 0;
      browserWindow.cookiePolicyId =
        Number(process.env.NEXT_PUBLIC_COOKIE_POLICY_ID_IUBENDA) ?? 0;
      browserWindow.htmlContent = createHtmlContent(
        false,
        "iubenda-cs-banner-consent"
      );
      const script = document.createElement("script");
      script.id = "iubenda-script";
      script.type = "text/javascript";
      /* eslint-disable no-secrets/no-secrets */
      script.innerHTML = `var _iub = _iub || [];
        _iub.csConfiguration = {"callback":{"onReady":function(){document.getElementById('iubenda-cs-banner-consent').parentElement.remove();}},"askConsentAtCookiePolicyUpdate":true,"enableLgpd":true,"lang":"en","perPurposeConsent":true,"siteId":siteId,"whitelabel":false,"cookiePolicyId":cookiePolicyId,"banner":{"acceptButtonCaptionColor":"#000000","acceptButtonColor":"#E1DDD7","acceptButtonDisplay":true,"backgroundColor":"#FBF6EF","backgroundOverlay":true,"closeButtonDisplay":false,"explicitWithdrawal":true,"listPurposes":true,"logo":null,"position":"float-center","rejectButtonCaptionColor":"#000000","rejectButtonColor":"#E1DDD7","rejectButtonDisplay":true,"showPurposesToggles":true,"theme":"autumn-neutral","textColor":"#010436",
        "html": htmlContent}}
     `;
      /* eslint-enable no-secrets/no-secrets */
      script.async = true;
      if (document.body != null) document.body.appendChild(script);
    }

    // we had to add this code because iubenda adds a overflow-hidden
    // in the html and it disable the scroll of the page.
    const targetNode = document.querySelector("html");
    const observerOptions = {
      childList: true,
      attributes: true,

      // Omit (or set to false) to observe only changes to the parent node
      subtree: false,
    };

    const observer = new MutationObserver(() => {
      document
        .querySelector("html")
        ?.style.setProperty("overflow", "auto", "important");
    });
    if (targetNode !== null) {
      observer.observe(targetNode, observerOptions);
    }

    displayConsentModal();
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Script
        id="consent-modal"
        type="text/javascript"
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        async
      ></Script>
    </>
  );
};
