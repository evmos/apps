import { useEffect, useState } from "react";

import { ModalTOS } from "./Modal";
import { ConfirmButton } from "../ConfirmButton";
import Content from "./Content";
import CheckboxTOS from "./CheckboxTOS";

import {
  useTracker,
  DISABLE_MIXPANEL_TRACKER,
  ENABLE_MIXPANEL_TRACKER,
} from "tracker";
import { EVMOS_TOS_VERSION } from "constants-helper";
import { createHtmlContent } from "./helper";
interface BrowserWindow {
  setAction: (consent: boolean) => void;
}

export const TermOfServices = () => {
  const [show, setShow] = useState<boolean>(false);
  const { disableMixpanel } = useTracker(DISABLE_MIXPANEL_TRACKER);
  const { enableMixpanel } = useTracker(ENABLE_MIXPANEL_TRACKER);
  useEffect(() => {
    // Execute the hook only once
    if (localStorage.getItem(EVMOS_TOS_VERSION) === null) {
      setShow(true);
    }
  }, []);

  const acceptTOS = () => {
    localStorage.setItem(EVMOS_TOS_VERSION, "true");
    setShow(false);

    if (!consent) {
      disableMixpanel();
    } else {
      enableMixpanel();
    }
  };

  const [acknowledgeTOS, setAcknowledgeTOS] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleConsentClick = () => {
    setConsent(!consent);
    if (process.env.NEXT_PUBLIC_COOKIE_POLICY_ID_IUBENDA !== undefined) {
      const name = `_iub_cs-${process.env.NEXT_PUBLIC_COOKIE_POLICY_ID_IUBENDA}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    const browserWindow = window as unknown as BrowserWindow;
    browserWindow.setAction = setConsent;
    const htmlContent = createHtmlContent(true);
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
            label="I acknowledge to the Terms of Service."
            onClick={() => {
              setAcknowledgeTOS(!acknowledgeTOS);
            }}
            action={acknowledgeTOS}
          />

          <CheckboxTOS
            label={
              <>
                I want to share usage data. <b>More information</b>.
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
