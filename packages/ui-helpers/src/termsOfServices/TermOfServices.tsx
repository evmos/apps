import { useEffect, useRef, useState } from "react";

import { LinkButton } from "./LinkButton";
import { ModalTOS } from "./Modal";
import { ConfirmButton } from "../ConfirmButton";
import Content from "./Content";
import CheckboxTOS from "./CheckboxTOS";
import ConsentModal from "./ConsentModal";
export const TermOfServices = () => {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    // Execute the hook only once
    if (localStorage.getItem("evmos-TOS") === null) {
      setShow(true);
    }
  }, []);

  const acceptTOS = () => {
    localStorage.setItem("evmos-TOS", "true");
    setShow(false);
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const termsRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (termsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
      // The scroll approximation is so close that 3 pixels difference should account all zoom ranges.
      const scrollHeightFewerThree = scrollHeight - 3;
      if (scrollTop + clientHeight >= scrollHeightFewerThree) {
        setIsDisabled(false);
      }
    }
  };

  // const [acknowledgeTOS, setAcknowledgeTOS] = useState(false);

  return (
    <ModalTOS title="Evmos Terms of Service" show={show}>
      <div className="space-y-3">
        <div
          className="h-80 w-full space-y-3 overflow-y-auto border border-darkGray5 p-4 font-[IBM]"
          ref={termsRef}
          onScroll={onScroll}
        >
          <Content />
        </div>
        <div className="space-y-3">
          <ConsentModal />
          <CheckboxTOS
            label="I acknowledge to the Terms of Service"
            disabled={isDisabled}
          />

          <CheckboxTOS
            label={
              <>
                I want to share usage data. <b>More information</b>
              </>
            }
            disabled={isDisabled}
          />

          <div className="inline-flex space-x-7">
            <ConfirmButton
              onClick={acceptTOS}
              text="accept"
              disabled={isDisabled}
            />
            <LinkButton href="https://www.evmos.org">
              <div className="uppercase">Decline</div>
            </LinkButton>
          </div>
        </div>
      </div>
    </ModalTOS>
  );
};
