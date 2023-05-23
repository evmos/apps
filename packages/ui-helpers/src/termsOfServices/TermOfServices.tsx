import { useEffect, useState } from "react";

import { ModalTOS } from "./Modal";
import { ConfirmButton } from "../ConfirmButton";
import Content from "./Content";
import CheckboxTOS from "./CheckboxTOS";

import { useTracker } from "tracker";
interface BrowserWindow {
  setAction: (consent: boolean) => void;
}

export const TermOfServices = () => {
  const [show, setShow] = useState<boolean>(false);
  const { disableMixpanel } = useTracker("DISABLE");
  useEffect(() => {
    // Execute the hook only once
    if (localStorage.getItem("evmos-TOS") === null) {
      setShow(true);
    }
  }, []);

  const acceptTOS = () => {
    localStorage.setItem("evmos-TOS", "true");
    setShow(false);

    if (!consent) {
      disableMixpanel();
    } else {
      localStorage.setItem("disableTracker", "false");
    }
  };

  const [acknowledgeTOS, setAcknowledgeTOS] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleConsentClick = () => {
    setConsent(!consent);
    document.cookie =
      "_iub_cs-69051412=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const browserWindow = window as unknown as BrowserWindow;
    browserWindow.setAction = setConsent;
    const htmlContent = `<div id="iubenda-cs-banner-tos" style="z-index:99999998 !important;" class="iubenda-cs-default-floating iubenda-cs-center 
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
    <button onclick="(function(){ _iub.cs.api.acceptAll(); setAction(true); var elem = document.querySelector('#iubenda-cs-banner');
    elem.parentNode.removeChild(elem); _iub.cs.api.resetCookies();})();" class="iubenda-cs-accept-btn iubenda-cs-btn-primary" tabindex="0" 
  role="button" aria-pressed="false">Accept</button>
    <button class="iubenda-cs-reject-btn iub-prevent-consent iubenda-cs-btn-primary" tabindex="0" role="button" aria-pressed="false" 
    onclick="(function(){setAction(false); _iub.cs.api.resetCookies();
    var elem = document.querySelector('#iubenda-cs-banner'); elem.parentNode.removeChild(elem);})();">Reject</button>
    
  </div></div></div></div></div></div></div>`;
    document
      .querySelector("body")
      ?.insertAdjacentHTML("beforeend", htmlContent);
  };

  return (
    <ModalTOS title="Evmos Terms of Service" show={show}>
      <div className="space-y-3">
        <div className="h-80 w-full space-y-3 overflow-y-auto border border-darkGray5 p-4 font-[IBM]">
          <Content />
        </div>

        <div className="space-y-3">
          <CheckboxTOS
            label="I acknowledge to the Terms of Service"
            onClick={() => {
              setAcknowledgeTOS(!acknowledgeTOS);
            }}
            action={acknowledgeTOS}
          />

          <CheckboxTOS
            label={
              <>
                I want to share usage data. <b>More information</b>
              </>
            }
            onClick={handleConsentClick}
            action={consent}
          />
          <ConfirmButton
            onClick={acceptTOS}
            text="accept and proceed"
            disabled={!acknowledgeTOS}
          />
        </div>
      </div>
    </ModalTOS>
  );
};
