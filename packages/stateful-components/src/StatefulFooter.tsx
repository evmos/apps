// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import { Footer, Modal, ConsentModal } from "ui-helpers";
import { useTracker, CLICK_FEEDBACK_FOOTER } from "tracker";
import getConfig from "next/config";
import { useState } from "react";

export const StatefulFooter = () => {
  const config = getConfig() as {
    publicRuntimeConfig?: {
      version?: string;
    };
  };

  const { handlePreClickAction } = useTracker(CLICK_FEEDBACK_FOOTER);

  const [showConsent, setShowConsent] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<></>);
  return (
    <>
      <Footer
        version={config?.publicRuntimeConfig?.version ?? ""}
        onClickFeedback={() => {
          handlePreClickAction();
        }}
        handleCookies={() => {
          setShowConsent(true);
          setModalContent(<ConsentModal setShow={setShowConsent} />);
        }}
      />
      <Modal
        show={showConsent}
        onClose={() => {
          setShowConsent(false);
        }}
      >
        {modalContent}
      </Modal>
    </>
  );
};
