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
import { Modal } from "../Modal";
import { ConsentModal } from "./ConsentModal";

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
  const [showConsent, setShowConsent] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  const handleConsentClick = () => {
    setConsent(!consent);
    setShowConsent(true);
    setModalContent(
      <ConsentModal setShow={setShowConsent} setConsent={setConsent} />
    );
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
        <Modal
          show={showConsent}
          onClose={() => {
            setShowConsent(false);
          }}
        >
          {modalContent}
        </Modal>
      </div>
    </ModalTOS>
  );
};
