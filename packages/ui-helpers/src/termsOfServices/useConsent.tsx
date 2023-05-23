// this code is used when the user clicks on cookies settings on the footer
/* eslint-disable no-secrets/no-secrets */
const CONSENT_EVMOS = `<div id="iubenda-cs-banner-evmos" style="z-index:99999998 !important;" class="iubenda-cs-default-floating iubenda-cs-center 
iubenda-cs-overlay iubenda-cs-slidein iubenda-cs-visible" role="alertdialog" aria-labelledby="iubenda-cs-title" aria-describedby="iubenda-cs-paragraph">
<div id="iubenda-cs-banner" style="z-index:99999998 !important" class="iubenda-cs-default-floating iubenda-cs-center iubenda-cs-overlay iubenda-cs-slidein 
iubenda-cs-visible" role="alertdialog" aria-labelledby="iubenda-cs-title" aria-describedby="iubenda-cs-paragraph">
<div class="iubenda-cs-container iubenda-cs-themed"><div class="iubenda-cs-content" style="background-color: #FBF6EF !important;color: #010436 !important;
font-size: 14px !important;"><div class="iubenda-cs-rationale"><button type="button" class="iubenda-cs-close-btn" tabindex="0" role="button" aria-pressed="false"
style="display:none!important;">×</button>
<div class="iubenda-banner-content iubenda-custom-content" role="document"><div id="iubenda-cs-title">We value your privacy!</div><div id="iubenda-cs-paragraph">
<p class="iub-p">We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept All', you agree to our 
<a href="https://evmos.org/privacy-policy" class="iubenda-privacy-policy-link" target="_blank">privacy policy</a> and 
<a href="https://evmos.org/cookie-policy" class="iubenda-cs-cookie-policy-lnk" target="_blank" 
rel="noopener">cookie policy</a>.</p></div></div><div class="iubenda-cs-opt-group" style="color:#FBF6EF!important;">
<div class="iubenda-cs-opt-group-consent">
<button onclick="(function(){var elem = document.querySelector('#iubenda-cs-banner');
elem.parentNode.removeChild(elem); localStorage.setItem(disableTracker, 'false')})();" class="iubenda-cs-accept-btn iubenda-cs-btn-primary" tabindex="0" 
role="button" aria-pressed="false">Accept</button>
<button class="iubenda-cs-reject-btn iub-prevent-consent iubenda-cs-btn-primary" tabindex="0" role="button" aria-pressed="false" 
onclick="(function(){
var elem = document.querySelector('#iubenda-cs-banner'); elem.parentNode.removeChild(elem);  localStorage.setItem(disableTracker, 'true')})();">Reject</button>

</div></div></div></div></div></div></div>`;
/* eslint-enable no-secrets/no-secrets */

interface BrowserConsentWindow {
  disableTracker: string;
}
import { useEffect } from "react";
import { DISABLE_TRACKER_LOCALSTORAGE } from "tracker";
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
    const htmlContent = CONSENT_EVMOS;
    document
      .querySelector("body")
      ?.insertAdjacentHTML("beforeend", htmlContent);
  };
  return { showConsent };
};
