import { useContext } from "react";
import { ConfirmButton } from "ui-helpers";
import { StepsContext } from "../../container/StepsContext";
export const SuccessTopUp = () => {
  // TODO: check that evmos balance is bigger than 0
  //   and the message that is in Figma
  const { updateStepsStatus } = useContext(StepsContext);
  return (
    <ConfirmButton
      text="Next Steps"
      onClick={() => {
        updateStepsStatus();
      }}
      className="w-auto font-normal normal-case"
    />
  );
};
